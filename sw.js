const CACHE_NAME="core-academico-github-v3";
const SHELL=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));
  }else{
    e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin){const x=r.clone();caches.open(CACHE_NAME).then(k=>k.put(e.request,x))}return r}).catch(()=>caches.match("./index.html"))));
  }
});