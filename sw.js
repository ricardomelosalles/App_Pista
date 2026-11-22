const C='pista-v3',SH=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','logo.png','splash.jpg'],LF='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all([c.addAll(SH),...['css','js'].map(x=>c.add(LF+x).catch(()=>{}))])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.origin===location.origin)e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
 else if(/cdnjs|fonts\.g/.test(u.hostname))e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x})));
});
