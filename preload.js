const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('coreAI', {
  askGemini: (payload) => ipcRenderer.invoke('gemini:ask', payload),
  getGeminiProxy: () => ipcRenderer.invoke('gemini:get-proxy'),
  setGeminiProxy: (url) => ipcRenderer.invoke('gemini:set-proxy', url),
  clearGeminiProxy: () => ipcRenderer.invoke('gemini:clear-proxy'),
  hasGeminiProxy: async () => Boolean(await ipcRenderer.invoke('gemini:get-proxy')),
  getGeminiUsage: () => ipcRenderer.invoke('gemini:get-usage'),
  resetGeminiUsage: () => ipcRenderer.invoke('gemini:reset-local-usage')
});
