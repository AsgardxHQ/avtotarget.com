globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/":{"redirect":{"to":"/uk","statusCode":307}},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
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

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
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

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
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
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
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
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
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

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
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
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
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
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-05-05T16:54:56.598Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/app/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"254-zHLkCfOthyJ8c2zl0J6mMFT2pJI\"",
    "mtime": "2023-05-05T16:54:56.605Z",
    "size": 596,
    "path": "../public/app/style.css"
  },
  "/_nuxt/_productId_.ca0a1224.js": {
    "type": "application/javascript",
    "etag": "\"9fc-HVhhEi0c1gmlUYAte7Rv38PRlTI\"",
    "mtime": "2023-05-05T16:54:56.554Z",
    "size": 2556,
    "path": "../public/_nuxt/_productId_.ca0a1224.js"
  },
  "/_nuxt/_request_.25cb51f8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-d/+6TnH9cnJE2nlmTt+r8QYYPzA\"",
    "mtime": "2023-05-05T16:54:56.553Z",
    "size": 60,
    "path": "../public/_nuxt/_request_.25cb51f8.css"
  },
  "/_nuxt/_request_.56448712.js": {
    "type": "application/javascript",
    "etag": "\"668-Bwh6nD7dM9HUcxG3rNXkSSPu+WE\"",
    "mtime": "2023-05-05T16:54:56.551Z",
    "size": 1640,
    "path": "../public/_nuxt/_request_.56448712.js"
  },
  "/_nuxt/about_us.58d5e746.js": {
    "type": "application/javascript",
    "etag": "\"a7-9EBDWnZ1izPYzg/DJby/SfNCEfM\"",
    "mtime": "2023-05-05T16:54:56.550Z",
    "size": 167,
    "path": "../public/_nuxt/about_us.58d5e746.js"
  },
  "/_nuxt/cart.e0bd590d.js": {
    "type": "application/javascript",
    "etag": "\"1f4e-uYPYh8M0wWS5xlFIZSsLzKN7Oyc\"",
    "mtime": "2023-05-05T16:54:56.549Z",
    "size": 8014,
    "path": "../public/_nuxt/cart.e0bd590d.js"
  },
  "/_nuxt/color.473bc8ca.png": {
    "type": "image/png",
    "etag": "\"2873-/0xLyyIHiRspL1RO202p0t9dRc8\"",
    "mtime": "2023-05-05T16:54:56.548Z",
    "size": 10355,
    "path": "../public/_nuxt/color.473bc8ca.png"
  },
  "/_nuxt/contacts.6a52ead7.js": {
    "type": "application/javascript",
    "etag": "\"a7-wCMqcNqHG+dydweoUyHMIhaqp1o\"",
    "mtime": "2023-05-05T16:54:56.546Z",
    "size": 167,
    "path": "../public/_nuxt/contacts.6a52ead7.js"
  },
  "/_nuxt/delivery.7984af8f.js": {
    "type": "application/javascript",
    "etag": "\"a7-eoOX2r4+weGnCGFec0zQYA1VuII\"",
    "mtime": "2023-05-05T16:54:56.545Z",
    "size": 167,
    "path": "../public/_nuxt/delivery.7984af8f.js"
  },
  "/_nuxt/entry.1ab00ab0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2de7d-DV1hfp4d8djfh7s8TC67p+Qf+ms\"",
    "mtime": "2023-05-05T16:54:56.543Z",
    "size": 188029,
    "path": "../public/_nuxt/entry.1ab00ab0.css"
  },
  "/_nuxt/entry.d2fb6768.js": {
    "type": "application/javascript",
    "etag": "\"75ed3-pI0AbaJNI4rFZnpqaAlA7njNCpA\"",
    "mtime": "2023-05-05T16:54:56.541Z",
    "size": 483027,
    "path": "../public/_nuxt/entry.d2fb6768.js"
  },
  "/_nuxt/error-404.236017d1.js": {
    "type": "application/javascript",
    "etag": "\"8ad-nGiTNsaQ6rbiNJYfOF2YYLGiUjM\"",
    "mtime": "2023-05-05T16:54:56.538Z",
    "size": 2221,
    "path": "../public/_nuxt/error-404.236017d1.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-05-05T16:54:56.537Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-500.492de173.js": {
    "type": "application/javascript",
    "etag": "\"756-ZOAxePiSBREA3pRQH+7ffDXATDU\"",
    "mtime": "2023-05-05T16:54:56.536Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.492de173.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-05-05T16:54:56.533Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.11cd5a97.js": {
    "type": "application/javascript",
    "etag": "\"45e-w/HQC/F2X3Wx20r+IVXUMIuXK0k\"",
    "mtime": "2023-05-05T16:54:56.532Z",
    "size": 1118,
    "path": "../public/_nuxt/error-component.11cd5a97.js"
  },
  "/_nuxt/filter.162e6194.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48ab-7dcKfiHmVbqZa6kec7k3nR0KvfY\"",
    "mtime": "2023-05-05T16:54:56.530Z",
    "size": 18603,
    "path": "../public/_nuxt/filter.162e6194.css"
  },
  "/_nuxt/filter.vue.09099431.js": {
    "type": "application/javascript",
    "etag": "\"f3b-dx3oTcoDgSmxBy5aK7VlD4QGsoE\"",
    "mtime": "2023-05-05T16:54:56.528Z",
    "size": 3899,
    "path": "../public/_nuxt/filter.vue.09099431.js"
  },
  "/_nuxt/index.c71d9b9d.js": {
    "type": "application/javascript",
    "etag": "\"386-IaoDQr98QOXMJE0unGhKa/JViIg\"",
    "mtime": "2023-05-05T16:54:56.528Z",
    "size": 902,
    "path": "../public/_nuxt/index.c71d9b9d.js"
  },
  "/_nuxt/index.e081ae78.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"92-MXqef0P5NPXNxoLOS9CX5yd0lyE\"",
    "mtime": "2023-05-05T16:54:56.527Z",
    "size": 146,
    "path": "../public/_nuxt/index.e081ae78.css"
  },
  "/_nuxt/item.vue.526a41c7.js": {
    "type": "application/javascript",
    "etag": "\"80e-Yun7hqgPVhwS3SbMHRHhbiC475U\"",
    "mtime": "2023-05-05T16:54:56.525Z",
    "size": 2062,
    "path": "../public/_nuxt/item.vue.526a41c7.js"
  },
  "/_nuxt/page-_page_.d83200d6.js": {
    "type": "application/javascript",
    "etag": "\"ff-E92MCV7t8v4DOdHf1aQDd7HGx6Y\"",
    "mtime": "2023-05-05T16:54:56.523Z",
    "size": 255,
    "path": "../public/_nuxt/page-_page_.d83200d6.js"
  },
  "/_nuxt/page-_page_.dcf08012.js": {
    "type": "application/javascript",
    "etag": "\"ff-E92MCV7t8v4DOdHf1aQDd7HGx6Y\"",
    "mtime": "2023-05-05T16:54:56.522Z",
    "size": 255,
    "path": "../public/_nuxt/page-_page_.dcf08012.js"
  },
  "/_nuxt/primeicons.131bc3bf.ttf": {
    "type": "font/ttf",
    "etag": "\"11a0c-zutG1ZT95cxQfN+LcOOOeP5HZTw\"",
    "mtime": "2023-05-05T16:54:56.520Z",
    "size": 72204,
    "path": "../public/_nuxt/primeicons.131bc3bf.ttf"
  },
  "/_nuxt/primeicons.3824be50.woff2": {
    "type": "font/woff2",
    "etag": "\"75e4-VaSypfAuNiQF2Nh0kDrwtfamwV0\"",
    "mtime": "2023-05-05T16:54:56.518Z",
    "size": 30180,
    "path": "../public/_nuxt/primeicons.3824be50.woff2"
  },
  "/_nuxt/primeicons.5e10f102.svg": {
    "type": "image/svg+xml",
    "etag": "\"4727e-0zMqRSQrj27b8/PHF2ooDn7c2WE\"",
    "mtime": "2023-05-05T16:54:56.515Z",
    "size": 291454,
    "path": "../public/_nuxt/primeicons.5e10f102.svg"
  },
  "/_nuxt/primeicons.90a58d3a.woff": {
    "type": "font/woff",
    "etag": "\"11a58-sWSLUL4TNQ/ei12ab+eDVN3MQ+Q\"",
    "mtime": "2023-05-05T16:54:56.507Z",
    "size": 72280,
    "path": "../public/_nuxt/primeicons.90a58d3a.woff"
  },
  "/_nuxt/primeicons.ce852338.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"11abc-5N8jVcQFzTiq2jbtqQFagQ/quUw\"",
    "mtime": "2023-05-05T16:54:56.505Z",
    "size": 72380,
    "path": "../public/_nuxt/primeicons.ce852338.eot"
  },
  "/_nuxt/products.05e1227c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a7-aH2F0EUWY7VR5ETNV8z5+ZFrmzs\"",
    "mtime": "2023-05-05T16:54:56.501Z",
    "size": 167,
    "path": "../public/_nuxt/products.05e1227c.css"
  },
  "/_nuxt/products.vue.2f801fa3.js": {
    "type": "application/javascript",
    "etag": "\"f42-CuCc66yTllUqp2FEGQO/7roX7jw\"",
    "mtime": "2023-05-05T16:54:56.499Z",
    "size": 3906,
    "path": "../public/_nuxt/products.vue.2f801fa3.js"
  },
  "/cockpit/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b9-TDi6Nbdqt0Ki/cHLn2hGvuXdYmw\"",
    "mtime": "2023-05-05T16:54:56.601Z",
    "size": 185,
    "path": "../public/cockpit/style.css"
  },
  "/images/logo-1.png": {
    "type": "image/png",
    "etag": "\"72f7-qvkQ4QUr2fB+iSET/8C6HLEFm68\"",
    "mtime": "2023-05-05T16:54:56.572Z",
    "size": 29431,
    "path": "../public/images/logo-1.png"
  },
  "/images/logo-2.png": {
    "type": "image/png",
    "etag": "\"95c2-RABL14+7QHjICQFoNzSvim9mH7g\"",
    "mtime": "2023-05-05T16:54:56.570Z",
    "size": 38338,
    "path": "../public/images/logo-2.png"
  },
  "/images/logo-3.png": {
    "type": "image/png",
    "etag": "\"77c1-hqNDj5k9Xu7HFw4KxGqQ+zFg3Ys\"",
    "mtime": "2023-05-05T16:54:56.568Z",
    "size": 30657,
    "path": "../public/images/logo-3.png"
  },
  "/images/logo-4.png": {
    "type": "image/png",
    "etag": "\"8391-tZAsaeDFg1ele/rXO2DeC06rT+0\"",
    "mtime": "2023-05-05T16:54:56.565Z",
    "size": 33681,
    "path": "../public/images/logo-4.png"
  },
  "/images/logo-5.png": {
    "type": "image/png",
    "etag": "\"73b2-dBtpYh8wZ3DPpZgWHiFn0yJ8OXM\"",
    "mtime": "2023-05-05T16:54:56.562Z",
    "size": 29618,
    "path": "../public/images/logo-5.png"
  },
  "/images/logo-6.png": {
    "type": "image/png",
    "etag": "\"7fd3-7pZmvHyz33N7N9pHib+3l7TJjMo\"",
    "mtime": "2023-05-05T16:54:56.560Z",
    "size": 32723,
    "path": "../public/images/logo-6.png"
  },
  "/images/no_image.png": {
    "type": "image/png",
    "etag": "\"3c3d-sfq5TQd2LavzZpXwhE+XztDm/A4\"",
    "mtime": "2023-05-05T16:54:56.557Z",
    "size": 15421,
    "path": "../public/images/no_image.png"
  },
  "/images/cars/logo-27160.png": {
    "type": "image/png",
    "etag": "\"114b-UD0IBKCMV2E8y48bUk4SsVwzBr4\"",
    "mtime": "2023-05-05T16:54:56.596Z",
    "size": 4427,
    "path": "../public/images/cars/logo-27160.png"
  },
  "/images/cars/logo_2x-1e23c.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.594Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-1e23c.png"
  },
  "/images/cars/logo_2x-31eeb.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.593Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-31eeb.png"
  },
  "/images/cars/logo_2x-67343.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.591Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-67343.png"
  },
  "/images/cars/logo_2x-7383a.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.589Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-7383a.png"
  },
  "/images/cars/logo_2x-86076.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.587Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-86076.png"
  },
  "/images/cars/logo_2x-b3ae9.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.585Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-b3ae9.png"
  },
  "/images/cars/logo_2x-b9e31.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.583Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-b9e31.png"
  },
  "/images/cars/logo_2x-dbf8d.png": {
    "type": "image/png",
    "etag": "\"2a0c-rOed2R5FWz5853U8G445JenIFlI\"",
    "mtime": "2023-05-05T16:54:56.582Z",
    "size": 10764,
    "path": "../public/images/cars/logo_2x-dbf8d.png"
  },
  "/images/description/car.png": {
    "type": "image/png",
    "etag": "\"12c1-fd7dfDmE4ALiIJeUs11/Ul+X1w4\"",
    "mtime": "2023-05-05T16:54:56.580Z",
    "size": 4801,
    "path": "../public/images/description/car.png"
  },
  "/images/description/code.png": {
    "type": "image/png",
    "etag": "\"c92-hosuX5TuwJbUfFc/ZULId8WWGwo\"",
    "mtime": "2023-05-05T16:54:56.578Z",
    "size": 3218,
    "path": "../public/images/description/code.png"
  },
  "/images/description/gear.png": {
    "type": "image/png",
    "etag": "\"1d84-4CbqQH4HqW/Or1WJqZO6k752aJw\"",
    "mtime": "2023-05-05T16:54:56.576Z",
    "size": 7556,
    "path": "../public/images/description/gear.png"
  },
  "/images/description/manufacturer.png": {
    "type": "image/png",
    "etag": "\"14cf-sLuAVyYWsjHTZxiPzxOKgrrnZoo\"",
    "mtime": "2023-05-05T16:54:56.575Z",
    "size": 5327,
    "path": "../public/images/description/manufacturer.png"
  },
  "/images/description/piston.png": {
    "type": "image/png",
    "etag": "\"3f00-5s/Y3rnPvyxB30gkP3uN8ZhPacE\"",
    "mtime": "2023-05-05T16:54:56.574Z",
    "size": 16128,
    "path": "../public/images/description/piston.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_AG9lrN = () => import('../all.get.mjs');
const _lazy_kce0ek = () => import('../cars.get.mjs');
const _lazy_TRnaP1 = () => import('../createUser.post.mjs');
const _lazy_brSHvC = () => import('../export-products.get.mjs');
const _lazy_PdwawE = () => import('../import.mjs');
const _lazy_4SQK5U = () => import('../items_create.post.mjs');
const _lazy_wKMYXW = () => import('../items.get.mjs');
const _lazy_oDrmeD = () => import('../parts_create.post.mjs');
const _lazy_pRJ9TG = () => import('../suppliers_create.post.mjs');
const _lazy_dQLzbm = () => import('../suppliers.get.mjs');
const _lazy_a4YNIx = () => import('../car.post.mjs');
const _lazy_P20BKY = () => import('../product.post.mjs');
const _lazy_ePTk0V = () => import('../updateItems.post.mjs');
const _lazy_HUj5cA = () => import('../_id_.mjs');
const _lazy_JWNBL7 = () => import('../sign_in.post.mjs');
const _lazy_kNli07 = () => import('../categories.get.mjs');
const _lazy_UqWm1v = () => import('../category.post.mjs');
const _lazy_dgMZhh = () => import('../filter.post.mjs');
const _lazy_tTfzbd = () => import('../filters.get.mjs');
const _lazy_HFVIyH = () => import('../import_xml.get.mjs');
const _lazy_f3k2wH = () => import('../import.post.mjs');
const _lazy_9HxDNF = () => import('../categories.post.mjs');
const _lazy_7tLTze = () => import('../filters.post.mjs');
const _lazy_df5baP = () => import('../items.post.mjs');
const _lazy_Xz56yd = () => import('../items.get2.mjs');
const _lazy_JORmPJ = () => import('../order.post.mjs');
const _lazy_CXeC0k = () => import('../orders.get.mjs');
const _lazy_c7iMby = () => import('../_request_.mjs');
const _lazy_iLrePV = () => import('../category.post2.mjs');
const _lazy_m5XHWB = () => import('../product.post2.mjs');
const _lazy_dFlGXX = () => import('../users.get.mjs');
const _lazy_XNSt6F = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/all', handler: _lazy_AG9lrN, lazy: true, middleware: false, method: "get" },
  { route: '/api/cars', handler: _lazy_kce0ek, lazy: true, middleware: false, method: "get" },
  { route: '/api/createUser', handler: _lazy_TRnaP1, lazy: true, middleware: false, method: "post" },
  { route: '/api/export-products', handler: _lazy_brSHvC, lazy: true, middleware: false, method: "get" },
  { route: '/api/import', handler: _lazy_PdwawE, lazy: true, middleware: false, method: undefined },
  { route: '/api/items_create', handler: _lazy_4SQK5U, lazy: true, middleware: false, method: "post" },
  { route: '/api/items', handler: _lazy_wKMYXW, lazy: true, middleware: false, method: "get" },
  { route: '/api/parts_create', handler: _lazy_oDrmeD, lazy: true, middleware: false, method: "post" },
  { route: '/api/suppliers_create', handler: _lazy_pRJ9TG, lazy: true, middleware: false, method: "post" },
  { route: '/api/suppliers', handler: _lazy_dQLzbm, lazy: true, middleware: false, method: "get" },
  { route: '/api/update/car', handler: _lazy_a4YNIx, lazy: true, middleware: false, method: "post" },
  { route: '/api/update/product', handler: _lazy_P20BKY, lazy: true, middleware: false, method: "post" },
  { route: '/api/updateItems', handler: _lazy_ePTk0V, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/:id', handler: _lazy_HUj5cA, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/auth/sign_in', handler: _lazy_JWNBL7, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/categories', handler: _lazy_kNli07, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/create/category', handler: _lazy_UqWm1v, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/create/filter', handler: _lazy_dgMZhh, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/filters', handler: _lazy_tTfzbd, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/import_xml', handler: _lazy_HFVIyH, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/import', handler: _lazy_f3k2wH, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import/categories', handler: _lazy_9HxDNF, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import/filters', handler: _lazy_7tLTze, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/import/items', handler: _lazy_df5baP, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/items', handler: _lazy_Xz56yd, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/order', handler: _lazy_JORmPJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/orders', handler: _lazy_CXeC0k, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/search/:request', handler: _lazy_c7iMby, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/update/category', handler: _lazy_iLrePV, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/update/product', handler: _lazy_m5XHWB, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/users', handler: _lazy_dFlGXX, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_XNSt6F, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_XNSt6F, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
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
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
