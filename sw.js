const CACHE_NAME = "grilled-burger-v3";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./images/logo.png",
  "./images/burger-header.png",

  "./images/beef-cheese-burger.png",
  "./images/beef-cheese-burger-meal.png",
  "./images/double-beef-cheese-burger.png",
  "./images/double-beef-cheese-burger-meal.png",
  "./images/triple-beef-cheese-burger-meal.png",

  "./images/Chicken Cheese Burger.png",
  "./images/Chicken Cheese Burger Meal.png",
  "./images/double-chicken-cheese-burger.png",
  "./images/double-chicken-cheese-burger-meal.png",
  "./images/triple-chicken-cheese-burger-meal.png",

  "./images/fried-chicken-cheese-burger.jpg",

  "./images/zinger-cheese-burger.png",
  "./images/zinger-cheese-burger-meal.png",
  "./images/double-zinger-cheese-burger-meal.png",
  "./images/zinger-cheese-roll.png",
  "./images/zinger-cheese-roll-meal.png",

  "./images/grilled-chicken-cheese-tortilla.png",
  "./images/chicken-cheese-tortilla-meal.png",

  "./images/regular-fries.png",
  "./images/regular-fries-7.png",
  "./images/cheese-fries.png",
  "./images/crispy-fries.png",
  "./images/crispy-cheese-fries.png",
  "./images/potato-wedges.png",
  "./images/cheese-potato-wedges.png",

  "./images/onion-rings.png",
  "./images/Regular Nuggets.png",
  "./images/Cheese Chicken Strips.png",

  "./images/shrimp.png",
  "./images/Cheese Shrimp.png",
  "./images/kids-meal.png",

  "./images/cheese-sauce.png",
  "./images/ranch-sauce.png",
  "./images/spicy-sauce.png",
  "./images/pepsi.png",
  "./images/water.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
