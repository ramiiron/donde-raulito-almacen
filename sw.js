var CACHE = "club-raulito-v17";
var BASE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/logo.png", "./icons/icon-512.png"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(BASE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(function(r){
    var copia = r.clone();
    caches.open(CACHE).then(function(c){ c.put(e.request, copia); });
    return r;
  }).catch(function(){ return caches.match(e.request); }));
});
