const { app, BrowserWindow, Menu, shell, ipcMain, safeStorage } = require('electron');
const path = require('path');
const fs = require('fs');

const GEMINI_KEY_FILE = path.join(app.getPath('userData'), 'gemini-key.bin');
function readGeminiKey(){
  try{ if(!fs.existsSync(GEMINI_KEY_FILE)) return ''; const raw=fs.readFileSync(GEMINI_KEY_FILE); return safeStorage.isEncryptionAvailable()?safeStorage.decryptString(raw):raw.toString('utf8'); }catch{return ''}
}
function writeGeminiKey(key){ fs.mkdirSync(path.dirname(GEMINI_KEY_FILE),{recursive:true}); const data=safeStorage.isEncryptionAvailable()?safeStorage.encryptString(key):Buffer.from(key,'utf8'); fs.writeFileSync(GEMINI_KEY_FILE,data); }
function clearGeminiKey(){try{if(fs.existsSync(GEMINI_KEY_FILE))fs.unlinkSync(GEMINI_KEY_FILE)}catch{}}


ipcMain.handle('gemini:has-key',()=>Boolean(readGeminiKey()));
ipcMain.handle('gemini:set-key',(_,key)=>{key=String(key||'').trim();if(!key)return {ok:false,error:'API key de Gemini vacía.'};writeGeminiKey(key);return {ok:true}});
ipcMain.handle('gemini:clear-key',()=>{clearGeminiKey();return {ok:true}});
const GEMINI_USAGE_FILE = path.join(app.getPath('userData'), 'gemini-usage.json');
function readGeminiUsage(){
  try { return JSON.parse(fs.readFileSync(GEMINI_USAGE_FILE,'utf8')); } catch { return {month:'',requests:0,tokens:0,lastError:'',lastAt:null}; }
}
function writeGeminiUsage(u){ fs.mkdirSync(path.dirname(GEMINI_USAGE_FILE),{recursive:true}); fs.writeFileSync(GEMINI_USAGE_FILE,JSON.stringify(u,null,2)); }
function currentMonth(){ return new Date().toISOString().slice(0,7); }
function normalizedUsage(){ const u=readGeminiUsage(); if(u.month!==currentMonth()) return {month:currentMonth(),requests:0,tokens:0,lastError:'',lastAt:null}; return u; }
ipcMain.handle('gemini:get-usage',()=>normalizedUsage());
ipcMain.handle('gemini:reset-local-usage',()=>{ const u={month:currentMonth(),requests:0,tokens:0,lastError:'',lastAt:null}; writeGeminiUsage(u); return u; });
ipcMain.handle('gemini:ask',async(_,payload={})=>{
  const apiKey=readGeminiKey(); if(!apiKey)return {ok:false,error:'Configura tu clave de Gemini.'};
  const usage=normalizedUsage();
  try{
    const model=payload.model||'gemini-3.7-flash';
    const parts=[]; const prompt=String(payload.prompt||'').trim(); if(prompt) parts.push({text:prompt});
    for(const img of (Array.isArray(payload.images)?payload.images:[])){ if(img?.dataUrl){ const m=String(img.dataUrl).match(/^data:([^;]+);base64,(.*)$/s); if(m) parts.push({inlineData:{mimeType:m[1],data:m[2]}}); }}
    if(!parts.length)return {ok:false,error:'No se recibió texto ni imagen.'};
    const url=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify({systemInstruction:{parts:[{text:'Eres el tutor de Core Académico. Responde en español. En matemáticas resuelve paso a paso, verifica el resultado y sigue exactamente el método indicado o mostrado en las imágenes. No inventes datos.'}]},contents:[{role:'user',parts}]})});
    const data=await res.json();
    if(!res.ok){ usage.lastError=data?.error?.message||`HTTP ${res.status}`; usage.lastAt=new Date().toISOString(); writeGeminiUsage(usage); return {ok:false,error:usage.lastError,quotaLikely:(res.status===429 || /quota|rate.?limit|resource.?exhaust/i.test(usage.lastError))}; }
    const text=data?.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('')||'';
    usage.requests += 1;
    usage.tokens += Number(data?.usageMetadata?.totalTokenCount||0);
    usage.lastError=''; usage.lastAt=new Date().toISOString(); writeGeminiUsage(usage);
    return {ok:true,text:text||'Gemini no devolvió texto.',usage:{requests:usage.requests,tokens:usage.tokens},quotaInfoAvailable:false};
  }catch(err){ usage.lastError=err?.message||String(err); usage.lastAt=new Date().toISOString(); writeGeminiUsage(usage); return {ok:false,error:usage.lastError}; }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1050, minHeight: 700,
    title: 'Core Académico', icon: path.join(__dirname, 'icons', 'icon-512.png'),
    backgroundColor: '#f8f5ff',
    webPreferences: { contextIsolation:true, nodeIntegration:false, sandbox:true, preload:path.join(__dirname,'preload.js') }
  });
  win.loadFile(path.join(__dirname,'index.html'));
  win.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/i.test(url)) shell.openExternal(url);return {action:'deny'}});
  const menu=Menu.buildFromTemplate([
    {label:'Core Académico',submenu:[{role:'about',label:'Acerca de Core Académico'},{type:'separator'},{role:'quit',label:'Salir'}]},
    {label:'Vista',submenu:[{role:'reload',label:'Recargar'},{role:'togglefullscreen',label:'Pantalla completa'},{role:'toggledevtools',label:'Herramientas de desarrollador'}]}
  ]); Menu.setApplicationMenu(menu);
}
app.whenReady().then(()=>{createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
