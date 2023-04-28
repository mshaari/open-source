// Disable a linting rule that would prevent the use of certain global variables and functions
/* eslint-disable no-restricted-globals */

// Import the necessary functions and classes from the Workbox libraries
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Ensure that the service worker takes control of all clients as soon as it is activated
clientsClaim();

// Precache the app's static assets and create a route for each of them
precacheAndRoute(self.__WB_MANIFEST);

// Create a regular expression that matches file extensions in URLs
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');

// Register a custom route for navigation requests that should be handled by the service worker
registerRoute(
  // Define the matching function for the route
  ({ request, url }) => {
    // If this isn't a navigation request, skip this route
    if (request.mode !== 'navigate') {
      return false;
    }
    // If this is a URL that starts with "/_", skip this route
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    // If this URL contains a file extension, skip this route
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    // Otherwise, handle the request with this route
    return true;
  },
  // Define the handler for requests that match this route
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Register a custom route for requests for images with a "stale-while-revalidate" strategy
registerRoute(
  // Define the matching function for the route
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Use a "stale-while-revalidate" strategy to serve cached responses and update the cache in the background
  new StaleWhileRevalidate({
    cacheName: 'images', // Use a cache with the name "images"
    plugins: [
      // Use an "ExpirationPlugin" to automatically remove cached responses that have exceeded their expiration date
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Allow the web app to trigger the service worker to skip waiting for updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
