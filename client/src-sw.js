const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
//this part needs work 
//  TODO: impliment asset caching
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'OG-cache',
    plugins: [
      new ExpirationPlugin({
        //  Cache requests for a day
        maxAgeSeconds:  24 * 60 * 60,
        // Cache 25 requests.
        maxEntries: 25,
      }),
    ],
  })
);
registerRoute();
