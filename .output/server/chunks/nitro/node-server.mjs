globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, useCookies, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';
import cookieSignature from 'cookie-signature';
import { PrismaClient } from '@prisma/client';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{},"databaseUrl":"postgresql://postgres:67b35a8ce1978000@46.101.136.211:5432/avto-parts","cookieName":"__session","cookieSecret":"superdupersecret","cookieExpires":604800000,"cookieRememberMeExpires":604800000};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error2) => {
    console.error("[nitro] Error while generating error response", error2);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-VwhTsH1oUBNg8lUNpTVC0yzOR4s\"",
    "mtime": "2023-04-10T12:41:12.045Z",
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"57e-bTDjcWN11V3N1s0VW5eb40UjlM4\"",
    "mtime": "2023-04-10T12:41:12.040Z",
    "path": "../public/favicon.ico"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"2072-wJy2xsDvutakcfU3+wSmgC57h28\"",
    "mtime": "2023-04-10T12:41:11.895Z",
    "path": "../public/manifest.json"
  },
  "/_nuxt/[request].25cb51f8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-d/+6TnH9cnJE2nlmTt+r8QYYPzA\"",
    "mtime": "2023-04-10T12:41:11.999Z",
    "path": "../public/_nuxt/[request].25cb51f8.css"
  },
  "/_nuxt/_productId_.69c66d27.mjs": {
    "type": "application/javascript",
    "etag": "\"a79-Jv1YJrewes9fVhVKWBi3DPrU9UM\"",
    "mtime": "2023-04-10T12:41:11.998Z",
    "path": "../public/_nuxt/_productId_.69c66d27.mjs"
  },
  "/_nuxt/_request_.fe53c71e.mjs": {
    "type": "application/javascript",
    "etag": "\"6a7-w5bcNYcIHHxfZ72J8LeO1AmIn6k\"",
    "mtime": "2023-04-10T12:41:11.997Z",
    "path": "../public/_nuxt/_request_.fe53c71e.mjs"
  },
  "/_nuxt/about_us.94cfc0b1.mjs": {
    "type": "application/javascript",
    "etag": "\"a3-WeUkqa+PHRzxtHBQluNpsvfdqqo\"",
    "mtime": "2023-04-10T12:41:11.995Z",
    "path": "../public/_nuxt/about_us.94cfc0b1.mjs"
  },
  "/_nuxt/admin-only.5cf4f423.mjs": {
    "type": "application/javascript",
    "etag": "\"8d-t6rFbOVQCg7fZAx2zfVn2mc2+Iw\"",
    "mtime": "2023-04-10T12:41:11.992Z",
    "path": "../public/_nuxt/admin-only.5cf4f423.mjs"
  },
  "/_nuxt/cart.e49ab597.mjs": {
    "type": "application/javascript",
    "etag": "\"228f-Pqc2MMkXQnTmpa/98cB1CXcgYP4\"",
    "mtime": "2023-04-10T12:41:11.992Z",
    "path": "../public/_nuxt/cart.e49ab597.mjs"
  },
  "/_nuxt/color.473bc8ca.png": {
    "type": "image/png",
    "etag": "\"2873-/0xLyyIHiRspL1RO202p0t9dRc8\"",
    "mtime": "2023-04-10T12:41:11.990Z",
    "path": "../public/_nuxt/color.473bc8ca.png"
  },
  "/_nuxt/contacts.7ca70887.mjs": {
    "type": "application/javascript",
    "etag": "\"a8-Xd9hHJqCNo+wYeji2ADoQDiKLfs\"",
    "mtime": "2023-04-10T12:41:11.988Z",
    "path": "../public/_nuxt/contacts.7ca70887.mjs"
  },
  "/_nuxt/delivery.9a2b0712.mjs": {
    "type": "application/javascript",
    "etag": "\"a8-8THnjzFYB3E0boE6yYP1vrnhHlE\"",
    "mtime": "2023-04-10T12:41:11.987Z",
    "path": "../public/_nuxt/delivery.9a2b0712.mjs"
  },
  "/_nuxt/entry.4c70dc6d.mjs": {
    "type": "application/javascript",
    "etag": "\"6d953-QsBwvpDM39GJQOOCUQgv4R2Hm9o\"",
    "mtime": "2023-04-10T12:41:11.986Z",
    "path": "../public/_nuxt/entry.4c70dc6d.mjs"
  },
  "/_nuxt/entry.ae766a7e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c2ea-oWMVZrE7h476U13QVc1UHidGsxQ\"",
    "mtime": "2023-04-10T12:41:11.982Z",
    "path": "../public/_nuxt/entry.ae766a7e.css"
  },
  "/_nuxt/error-404.7729cee9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e34-qomFKLEnDzFbIPwCfuxqIb18mQU\"",
    "mtime": "2023-04-10T12:41:11.980Z",
    "path": "../public/_nuxt/error-404.7729cee9.css"
  },
  "/_nuxt/error-404.f3824280.mjs": {
    "type": "application/javascript",
    "etag": "\"8ae-5jO5tJLGrU72Ar5mNMte7TF0CNw\"",
    "mtime": "2023-04-10T12:41:11.978Z",
    "path": "../public/_nuxt/error-404.f3824280.mjs"
  },
  "/_nuxt/error-500.08851880.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a4-PsPGHWWrltFH34P9Q5DnkUTUhRE\"",
    "mtime": "2023-04-10T12:41:11.975Z",
    "path": "../public/_nuxt/error-500.08851880.css"
  },
  "/_nuxt/error-500.fee9ef9f.mjs": {
    "type": "application/javascript",
    "etag": "\"757-kfIYVOdDI3yL6VQxj7h2EqFQeBs\"",
    "mtime": "2023-04-10T12:41:11.974Z",
    "path": "../public/_nuxt/error-500.fee9ef9f.mjs"
  },
  "/_nuxt/error-component.07a6e780.mjs": {
    "type": "application/javascript",
    "etag": "\"44f-2NAj+yzAkA68CVef4dLxQsCCBpQ\"",
    "mtime": "2023-04-10T12:41:11.972Z",
    "path": "../public/_nuxt/error-component.07a6e780.mjs"
  },
  "/_nuxt/filter.vue_vue_type_script_setup_true_lang.0fbc6f3e.mjs": {
    "type": "application/javascript",
    "etag": "\"1097-iSz2cmSivA2PYv68a6Zj0jBGmK4\"",
    "mtime": "2023-04-10T12:41:11.971Z",
    "path": "../public/_nuxt/filter.vue_vue_type_script_setup_true_lang.0fbc6f3e.mjs"
  },
  "/_nuxt/guest-only.3d21d8f9.mjs": {
    "type": "application/javascript",
    "etag": "\"a7-aCfbP/OE5b7GJWKmH1ALDKVyU7s\"",
    "mtime": "2023-04-10T12:41:11.970Z",
    "path": "../public/_nuxt/guest-only.3d21d8f9.mjs"
  },
  "/_nuxt/index.d1c07d03.mjs": {
    "type": "application/javascript",
    "etag": "\"3d7-Pwa3FrjJa3KXtlvAFUdRk9NlZ4A\"",
    "mtime": "2023-04-10T12:41:11.968Z",
    "path": "../public/_nuxt/index.d1c07d03.mjs"
  },
  "/_nuxt/index.e66cded8.mjs": {
    "type": "application/javascript",
    "etag": "\"8a-JzZelVIRVbodl9My4z9Kf9Krhzs\"",
    "mtime": "2023-04-10T12:41:11.967Z",
    "path": "../public/_nuxt/index.e66cded8.mjs"
  },
  "/_nuxt/item.vue_vue_type_script_setup_true_lang.b5f3bad1.mjs": {
    "type": "application/javascript",
    "etag": "\"8b3-F9QUIzCqvqH9pozqwRO8RVBp+bM\"",
    "mtime": "2023-04-10T12:41:11.966Z",
    "path": "../public/_nuxt/item.vue_vue_type_script_setup_true_lang.b5f3bad1.mjs"
  },
  "/_nuxt/page-_page_.8734fa46.mjs": {
    "type": "application/javascript",
    "etag": "\"163-i+VRl96VqWOlbK1OXLxSRjFmmzg\"",
    "mtime": "2023-04-10T12:41:11.964Z",
    "path": "../public/_nuxt/page-_page_.8734fa46.mjs"
  },
  "/_nuxt/page-_page_.b5130937.mjs": {
    "type": "application/javascript",
    "etag": "\"163-i+VRl96VqWOlbK1OXLxSRjFmmzg\"",
    "mtime": "2023-04-10T12:41:11.963Z",
    "path": "../public/_nuxt/page-_page_.b5130937.mjs"
  },
  "/_nuxt/primeicons.2ab98f70.svg": {
    "type": "image/svg+xml",
    "etag": "\"42564-Yhd1suxVX9LdFSokOQz23+7haLE\"",
    "mtime": "2023-04-10T12:41:11.962Z",
    "path": "../public/_nuxt/primeicons.2ab98f70.svg"
  },
  "/_nuxt/primeicons.788dba0a.ttf": {
    "type": "font/ttf",
    "etag": "\"10454-5shsqQqftCgvs1Uj1W/eAOeKFBY\"",
    "mtime": "2023-04-10T12:41:11.957Z",
    "path": "../public/_nuxt/primeicons.788dba0a.ttf"
  },
  "/_nuxt/primeicons.c9eaf535.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"10504-zPZeQGgLDt5qtGk51CHIMa5q/PQ\"",
    "mtime": "2023-04-10T12:41:11.956Z",
    "path": "../public/_nuxt/primeicons.c9eaf535.eot"
  },
  "/_nuxt/primeicons.feb68bf6.woff": {
    "type": "font/woff",
    "etag": "\"104a0-IeR36hnhW2Y0S8wjs/uyFhCSpwc\"",
    "mtime": "2023-04-10T12:41:11.954Z",
    "path": "../public/_nuxt/primeicons.feb68bf6.woff"
  },
  "/_nuxt/products.vue_vue_type_script_setup_true_lang.4597d717.mjs": {
    "type": "application/javascript",
    "etag": "\"f94-FBue5eF2BNbcYzpgm6he+EkThfo\"",
    "mtime": "2023-04-10T12:41:11.950Z",
    "path": "../public/_nuxt/products.vue_vue_type_script_setup_true_lang.4597d717.mjs"
  },
  "/_nuxt/redirect.aa1e83c9.mjs": {
    "type": "application/javascript",
    "etag": "\"7a-8hbs2Kj8586WIQQpPCJ1tYVuhXY\"",
    "mtime": "2023-04-10T12:41:11.949Z",
    "path": "../public/_nuxt/redirect.aa1e83c9.mjs"
  },
  "/_nuxt/user-only.f8bafef6.mjs": {
    "type": "application/javascript",
    "etag": "\"8d-cPE83aGRU1YLbR1Q+NGbQ0NrYbU\"",
    "mtime": "2023-04-10T12:41:11.947Z",
    "path": "../public/_nuxt/user-only.f8bafef6.mjs"
  },
  "/app/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"218-+dEyC/bJJMBIuT33PtHHUu8mBYs\"",
    "mtime": "2023-04-10T12:41:12.044Z",
    "path": "../public/app/style.css"
  },
  "/cockpit/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-vS9zVhtxKJxcrlYyRg9fX5382dc\"",
    "mtime": "2023-04-10T12:41:12.043Z",
    "path": "../public/cockpit/.DS_Store"
  },
  "/cockpit/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b9-TDi6Nbdqt0Ki/cHLn2hGvuXdYmw\"",
    "mtime": "2023-04-10T12:41:12.042Z",
    "path": "../public/cockpit/style.css"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-DJztbNQQZQsEkKbsTcQ7dDGuJPY\"",
    "mtime": "2023-04-10T12:41:12.039Z",
    "path": "../public/images/.DS_Store"
  },
  "/images/logo-1.png": {
    "type": "image/png",
    "etag": "\"72f7-qvkQ4QUr2fB+iSET/8C6HLEFm68\"",
    "mtime": "2023-04-10T12:41:12.017Z",
    "path": "../public/images/logo-1.png"
  },
  "/images/logo-2.png": {
    "type": "image/png",
    "etag": "\"95c2-RABL14+7QHjICQFoNzSvim9mH7g\"",
    "mtime": "2023-04-10T12:41:12.016Z",
    "path": "../public/images/logo-2.png"
  },
  "/images/logo-3.png": {
    "type": "image/png",
    "etag": "\"77c1-hqNDj5k9Xu7HFw4KxGqQ+zFg3Ys\"",
    "mtime": "2023-04-10T12:41:12.014Z",
    "path": "../public/images/logo-3.png"
  },
  "/images/logo-4.png": {
    "type": "image/png",
    "etag": "\"8391-tZAsaeDFg1ele/rXO2DeC06rT+0\"",
    "mtime": "2023-04-10T12:41:12.012Z",
    "path": "../public/images/logo-4.png"
  },
  "/images/logo-5.png": {
    "type": "image/png",
    "etag": "\"73b2-dBtpYh8wZ3DPpZgWHiFn0yJ8OXM\"",
    "mtime": "2023-04-10T12:41:12.010Z",
    "path": "../public/images/logo-5.png"
  },
  "/images/logo-6.png": {
    "type": "image/png",
    "etag": "\"7fd3-7pZmvHyz33N7N9pHib+3l7TJjMo\"",
    "mtime": "2023-04-10T12:41:12.008Z",
    "path": "../public/images/logo-6.png"
  },
  "/images/no_image.png": {
    "type": "image/png",
    "etag": "\"3c3d-sfq5TQd2LavzZpXwhE+XztDm/A4\"",
    "mtime": "2023-04-10T12:41:12.007Z",
    "path": "../public/images/no_image.png"
  },
  "/images/cars/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-9bLn4QNu/VqHw99KHVREbLiLLu8\"",
    "mtime": "2023-04-10T12:41:12.038Z",
    "path": "../public/images/cars/.DS_Store"
  },
  "/images/cars/logo-27160.png": {
    "type": "image/png",
    "etag": "\"114b-UD0IBKCMV2E8y48bUk4SsVwzBr4\"",
    "mtime": "2023-04-10T12:41:12.036Z",
    "path": "../public/images/cars/logo-27160.png"
  },
  "/images/cars/logo_2x-1e23c.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.035Z",
    "path": "../public/images/cars/logo_2x-1e23c.png"
  },
  "/images/cars/logo_2x-31eeb.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.034Z",
    "path": "../public/images/cars/logo_2x-31eeb.png"
  },
  "/images/cars/logo_2x-67343.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.032Z",
    "path": "../public/images/cars/logo_2x-67343.png"
  },
  "/images/cars/logo_2x-7383a.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.031Z",
    "path": "../public/images/cars/logo_2x-7383a.png"
  },
  "/images/cars/logo_2x-86076.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.029Z",
    "path": "../public/images/cars/logo_2x-86076.png"
  },
  "/images/cars/logo_2x-b3ae9.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.028Z",
    "path": "../public/images/cars/logo_2x-b3ae9.png"
  },
  "/images/cars/logo_2x-b9e31.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.026Z",
    "path": "../public/images/cars/logo_2x-b9e31.png"
  },
  "/images/cars/logo_2x-dbf8d.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-04-10T12:41:12.025Z",
    "path": "../public/images/cars/logo_2x-dbf8d.png"
  },
  "/images/description/car.png": {
    "type": "image/png",
    "etag": "\"12c1-fd7dfDmE4ALiIJeUs11/Ul+X1w4\"",
    "mtime": "2023-04-10T12:41:12.023Z",
    "path": "../public/images/description/car.png"
  },
  "/images/description/code.png": {
    "type": "image/png",
    "etag": "\"c92-hosuX5TuwJbUfFc/ZULId8WWGwo\"",
    "mtime": "2023-04-10T12:41:12.022Z",
    "path": "../public/images/description/code.png"
  },
  "/images/description/gear.png": {
    "type": "image/png",
    "etag": "\"1d84-4CbqQH4HqW/Or1WJqZO6k752aJw\"",
    "mtime": "2023-04-10T12:41:12.021Z",
    "path": "../public/images/description/gear.png"
  },
  "/images/description/manufacturer.png": {
    "type": "image/png",
    "etag": "\"14cf-sLuAVyYWsjHTZxiPzxOKgrrnZoo\"",
    "mtime": "2023-04-10T12:41:12.020Z",
    "path": "../public/images/description/manufacturer.png"
  },
  "/images/description/piston.png": {
    "type": "image/png",
    "etag": "\"3f00-5s/Y3rnPvyxB30gkP3uN8ZhPacE\"",
    "mtime": "2023-04-10T12:41:12.019Z",
    "path": "../public/images/description/piston.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const prisma = new PrismaClient();
async function getUsers() {
  return await prisma.users.findMany();
}
async function getUserByEmail(email) {
  return await prisma.users.findUnique({
    where: {
      email
    }
  });
}
async function getUserById(id) {
  return await prisma.users.findUnique({
    where: {
      id
    }
  });
}
async function isAdmin(user) {
  return user && user.access_level === 0;
}

function serialize(obj) {
  const value = Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");
  const length = Buffer.byteLength(value);
  if (length > 4096)
    throw new Error("Session value is too long");
  return value;
}
function deserialize(value) {
  return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
}
function sign(value, secret) {
  return cookieSignature.sign(value, secret);
}
function unsign(value, secret) {
  return cookieSignature.unsign(value, secret);
}
async function getSession(event) {
  const config = useRuntimeConfig();
  const cookie = useCookies(event)[config.cookieName];
  if (!cookie)
    return null;
  const unsignedSession = unsign(cookie, config.cookieSecret);
  if (!unsignedSession)
    return null;
  const session = deserialize(unsignedSession);
  return getUserById(session.userId);
}

const _SEsJlD = defineEventHandler(async (event) => {
  const user = await getSession(event);
  if (user)
    event.context.user = user;
});

const _zGGebC = (req, res, next) => {
  if (req.url === "/") {
    redirect(res, "/uk");
  } else {
    next();
  }
};
function redirect(res, location) {
  res.writeHead(301, {
    location
  });
  res.end();
}

const _lazy_IsLaZq = () => import('../users.get.mjs');
const _lazy_QDNIzX = () => import('../product.post.mjs');
const _lazy_yuwK5d = () => import('../category.post.mjs');
const _lazy_jYnNLZ = () => import('../_request_.mjs');
const _lazy_w5hes4 = () => import('../orders.get.mjs');
const _lazy_yNNXTw = () => import('../order.post.mjs');
const _lazy_ivBIw8 = () => import('../items.get.mjs');
const _lazy_DsFsks = () => import('../items.post.mjs');
const _lazy_ysLZKP = () => import('../filters.post.mjs');
const _lazy_tjTOIr = () => import('../categories.post.mjs');
const _lazy_zG1iFv = () => import('../import.post.mjs');
const _lazy_pUzgU1 = () => import('../import_xml.get.mjs');
const _lazy_TxxcUJ = () => import('../filters.get.mjs');
const _lazy_XLXLsM = () => import('../filter.post.mjs');
const _lazy_aFcuk3 = () => import('../category.post2.mjs');
const _lazy_EqypEG = () => import('../categories.get.mjs');
const _lazy_BVrtSL = () => import('../_id_.mjs');
const _lazy_WqNdAy = () => import('../index.get.mjs');
const _lazy_PlO1Yn = () => import('../index.mjs');
const _lazy_zPlPT9 = () => import('../updateItems.post.mjs');
const _lazy_Zq7Wzx = () => import('../product.post2.mjs');
const _lazy_BEVED9 = () => import('../car.post.mjs');
const _lazy_OGiSWE = () => import('../suppliers.get.mjs');
const _lazy_FS8qbD = () => import('../suppliers_create.post.mjs');
const _lazy_RHPeJP = () => import('../parts_create.post.mjs');
const _lazy_mwAhaW = () => import('../items.get2.mjs');
const _lazy_dC7GuC = () => import('../items_create.post.mjs');
const _lazy_nyjWpc = () => import('../import.mjs');
const _lazy_4FMcL1 = () => import('../export-products.get.mjs');
const _lazy_8BcX1N = () => import('../createUser.post.mjs');
const _lazy_ofZA6u = () => import('../cars.get.mjs');
const _lazy_6cj4cL = () => import('../registration.post.mjs');
const _lazy_1ZkXM6 = () => import('../me.get.mjs');
const _lazy_XsZJfe = () => import('../logout.post.mjs');
const _lazy_QdchIi = () => import('../login.post.mjs');
const _lazy_G1eV7E = () => import('../all.get.mjs');
const _lazy_2ls46h = () => import('../_id_2.mjs');
const _lazy_F1Vak6 = () => import('../handlers/renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _SEsJlD, lazy: false, middleware: true, method: undefined },
  { route: '/api/v1/users', handler: _lazy_IsLaZq, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/update/product', handler: _lazy_QDNIzX, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/update/category', handler: _lazy_yuwK5d, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/search/:request', handler: _lazy_jYnNLZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/orders', handler: _lazy_w5hes4, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/order', handler: _lazy_yNNXTw, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/items', handler: _lazy_ivBIw8, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/import/items', handler: _lazy_DsFsks, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import/filters', handler: _lazy_ysLZKP, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import/categories', handler: _lazy_tjTOIr, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import', handler: _lazy_zG1iFv, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import_xml', handler: _lazy_pUzgU1, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/filters', handler: _lazy_TxxcUJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/create/filter', handler: _lazy_XLXLsM, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/create/category', handler: _lazy_aFcuk3, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/categories', handler: _lazy_EqypEG, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/:id', handler: _lazy_BVrtSL, lazy: true, middleware: false, method: undefined },
  { route: '/api/users', handler: _lazy_WqNdAy, lazy: true, middleware: false, method: "get" },
  { route: '/api/upload', handler: _lazy_PlO1Yn, lazy: true, middleware: false, method: undefined },
  { route: '/api/updateItems', handler: _lazy_zPlPT9, lazy: true, middleware: false, method: "post" },
  { route: '/api/update/product', handler: _lazy_Zq7Wzx, lazy: true, middleware: false, method: "post" },
  { route: '/api/update/car', handler: _lazy_BEVED9, lazy: true, middleware: false, method: "post" },
  { route: '/api/suppliers', handler: _lazy_OGiSWE, lazy: true, middleware: false, method: "get" },
  { route: '/api/suppliers_create', handler: _lazy_FS8qbD, lazy: true, middleware: false, method: "post" },
  { route: '/api/parts_create', handler: _lazy_RHPeJP, lazy: true, middleware: false, method: "post" },
  { route: '/api/items', handler: _lazy_mwAhaW, lazy: true, middleware: false, method: "get" },
  { route: '/api/items_create', handler: _lazy_dC7GuC, lazy: true, middleware: false, method: "post" },
  { route: '/api/import', handler: _lazy_nyjWpc, lazy: true, middleware: false, method: undefined },
  { route: '/api/export-products', handler: _lazy_4FMcL1, lazy: true, middleware: false, method: "get" },
  { route: '/api/createUser', handler: _lazy_8BcX1N, lazy: true, middleware: false, method: "post" },
  { route: '/api/cars', handler: _lazy_ofZA6u, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/registration', handler: _lazy_6cj4cL, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/me', handler: _lazy_1ZkXM6, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/logout', handler: _lazy_XsZJfe, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_QdchIi, lazy: true, middleware: false, method: "post" },
  { route: '/api/all', handler: _lazy_G1eV7E, lazy: true, middleware: false, method: "get" },
  { route: '/api/:id', handler: _lazy_2ls46h, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_F1Vak6, lazy: true, middleware: false, method: undefined },
  { route: '/', handler: _zGGebC, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_F1Vak6, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { getUserByEmail as a, sign as b, useNitroApp as c, getUsers as g, isAdmin as i, nodeServer as n, serialize as s, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
