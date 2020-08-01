const CACHE_NAME = "version-2"
const urlsToCache = [
                    "index.html", 
                    "offline.html", 
                    "fonts/picto.eot",
                    "fonts/picto.svg",
                    "fonts/picto.ttf",
                    "fonts/picto.woff",
                    "fonts/riffic-bold.eot",
                    "fonts/riffic-bold.svg",
                    "fonts/riffic-bold.ttf",
                    "fonts/riffic-bold.woff",
                    "fonts/riffic-bold.woff2",
                ]

const self = this

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache")
                return cache.addAll(urlsToCache)
            })
            .catch((error) => {
                return console.log(error)
            })
    )
})


// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                            .catch(() => {
                                return caches.match("offline.html")
                            })
            })
            .catch((error) => {
                return console.log(error)
            })
    )
})


// Activate for requests
self.addEventListener('activate', (event) => {
    
})