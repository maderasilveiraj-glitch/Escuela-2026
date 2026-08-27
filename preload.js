const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('coreAI', {
  askGemini: (payload) => ipcRenderer.invoke('gemini:ask', payload),
  setGeminiKey: (key) => ipcRenderer.invoke('gemini:set-key', key),
  hasGeminiKey: () => ipcRenderer.invoke('gemini:has-key'),
  clearGeminiKey: () => ipcRenderer.invoke('gemini:clear-key'),
  getGeminiUsage: () => ipcRenderer.invoke('gemini:get-usage'),
  resetGeminiUsage: () => ipcRenderer.invoke('gemini:reset-local-usage')
});
