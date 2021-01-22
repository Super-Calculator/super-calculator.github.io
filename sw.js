const staticCacheName = "Super Calculator";
const assets = [
  "83a9787d4cb6f3b7632b4ddfebf74367.wav",
  "83c36d806dc92327b9e7049a565c6bff.wav',
  "f4e72630956bfb140ed09d1ce0106c31.svg",
  "cd21514d0531fdffb22204e0ec5ed84a.svg",
  "/",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets...");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
