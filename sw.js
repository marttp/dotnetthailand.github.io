/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-5159101bc08a7c29de5d.js"
  },
  {
    "url": "framework-5fece46f6a13a0b172e9.js"
  },
  {
    "url": "styles.2194967c9612af4e256d.css"
  },
  {
    "url": "styles-876046b6071408fa0a81.js"
  },
  {
    "url": "app-1778d356549b3f29095e.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "c5f833fdd7a4fcee576d7a5d03b27426"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-54ddec5792f412e2e9c0.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "7b8062db821356a39555074775f7c520"
  },
  {
    "url": "page-data/sq/d/12478684.json",
    "revision": "29b1ef7377112df609c157e2b0e625d0"
  },
  {
    "url": "page-data/sq/d/2882937274.json",
    "revision": "bbcab21484d4e20aca874d8e25fb7900"
  },
  {
    "url": "page-data/sq/d/353167761.json",
    "revision": "e51dfc4b71780f38b4cc0e97c432c541"
  },
  {
    "url": "page-data/sq/d/3812332637.json",
    "revision": "6f652ba5fbd56f6202d63791279dbbe8"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "939ee5c8a4bac6f7e7b9c6d9f5529e01"
  },
  {
    "url": "polyfill-e045046490ebff3471dd.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "339756be9c48726e94782616dc45da57"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-1778d356549b3f29095e.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)

/* eslint-disable no-undef */
workbox.routing.registerRoute(
  new RegExp('https:.*min.(css|js)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cdn-cache',
  })
);
