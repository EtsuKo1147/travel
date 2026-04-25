const CACHE_NAME = "travel-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js"
];

// 安装
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 请求拦截（离线优先）
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});