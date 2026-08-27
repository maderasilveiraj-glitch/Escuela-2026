const { app, BrowserWindow, Menu, shell, ipcMain, safeStorage } = require('electron');
const path = require('path');
const fs = require('fs');

const GEMINI_PROXY_FILE = path.join(app.getPath('userData'), 'gemini-proxy.json');
function readGeminiProxy(){
  try { return JSON.parse(fs.readFileSync(GEMINI_PROXY_FILE,'utf8')); } catch { return {url:''}; }
}
function writeGeminiProxy(url){ fs.mkdirSync(path.dirname(GEMINI_PROXY_FILE),{recursive:true}); fs.writeFileSync(GEMINI_PROXY_FILE, JSON.stringify({url:String(url||'').trim()},null,2)); }
function clearGeminiProxy(){try{if(fs.existsSync(GEMINI_PROXY_FILE))fs.unlinkSync(GEMINI_PROXY_FILE)}catch{}}

ipcMain.handle('gemini:get-proxy',()=>readGeminiProxy().url||'');
ipcMain.handle('gemini:set-proxy',(_,url)=>{url=String(url||'').trim(); if(!/^https:\/\//i.test(url)) return {ok:false,error:'La URL del proxy debe usar HTTPS.'}; writeGeminiProxy(url); return {ok:true};});
ipcMain.handle('gemini:clear-proxy',()=>{clearGeminiProxy();return {ok:true}});

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
  const proxyUrl=readGeminiProxy().url; if(!proxyUrl)return {ok:false,error:'Configura primero la URL del proxy seguro de Gemini.'};
  const usage=normalizedUsage();
  try{
    const model=payload.model||'gemini-3.7-flash';
    const body={model,prompt:String(payload.prompt||''),images:Array.isArray(payload.images)?payload.images:[]};
    if(!body.prompt && !body.images.length)return {ok:false,error:'No se recibió texto ni imagen.'};
    const res=await fetch(proxyUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Core-App':'core-academico'},body:JSON.stringify(body)});
    const data=await res.json();
    if(!res.ok){ usage.lastError=data?.error?.message||data?.error||`HTTP ${res.status}`; usage.lastAt=new Date().toISOString(); writeGeminiUsage(usage); return {ok:false,error:usage.lastError,quotaLikely:(res.status===429 || /quota|rate.?limit|resource.?exhaust/i.test(usage.lastError))}; }
    const text=data?.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('')||'';
    usage.requests += 1; usage.tokens += Number(data?.usageMetadata?.totalTokenCount||0); usage.lastError=''; usage.lastAt=new Date().toISOString(); writeGeminiUsage(usage);
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
