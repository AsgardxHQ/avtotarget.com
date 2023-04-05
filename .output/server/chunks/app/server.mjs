import require$$0 from 'unenv/runtime/mock/proxy';
import { s as serverRenderer, r as require$$1 } from '../handlers/renderer.mjs';
import { $fetch as $fetch$1 } from 'ohmyfetch';
import { joinURL, hasProtocol, isEqual } from 'ufo';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { sendRedirect, createError as createError$1 } from 'h3';
import defu from 'defu';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'cookie-signature';
import '@prisma/client';

var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var vue_cjs_prod = {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject$1;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove$1;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var compilerDom = require$$0;
  var runtimeDom = require$$1;
  var shared = shared_cjs_prod;
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    var n = /* @__PURE__ */ Object.create(null);
    if (e) {
      Object.keys(e).forEach(function(k) {
        n[k] = e[k];
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var runtimeDom__namespace = /* @__PURE__ */ _interopNamespace(runtimeDom);
  const compileCache = /* @__PURE__ */ Object.create(null);
  function compileToFunction(template, options) {
    if (!shared.isString(template)) {
      if (template.nodeType) {
        template = template.innerHTML;
      } else {
        return shared.NOOP;
      }
    }
    const key = template;
    const cached = compileCache[key];
    if (cached) {
      return cached;
    }
    if (template[0] === "#") {
      const el = document.querySelector(template);
      template = el ? el.innerHTML : ``;
    }
    const opts = shared.extend({
      hoistStatic: true,
      onError: void 0,
      onWarn: shared.NOOP
    }, options);
    if (!opts.isCustomElement && typeof customElements !== "undefined") {
      opts.isCustomElement = (tag) => !!customElements.get(tag);
    }
    const { code } = compilerDom.compile(template, opts);
    const render2 = new Function("Vue", code)(runtimeDom__namespace);
    render2._rc = true;
    return compileCache[key] = render2;
  }
  runtimeDom.registerRuntimeCompiler(compileToFunction);
  Object.keys(runtimeDom).forEach(function(k) {
    if (k !== "default")
      exports[k] = runtimeDom[k];
  });
  exports.compile = compileToFunction;
})(vue_cjs_prod);
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide && typeof provide === "object") {
    for (const key in provide) {
      nuxtApp.provide(key, provide[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = vue_cjs_prod.getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
var vueRouter_cjs_prod = { exports: {} };
var vueRouter_prod = {};
/*!
  * vue-router v4.1.5
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var vue = vue_cjs_prod;
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === "Module";
  }
  const assign2 = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = isArray2(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop2 = () => {
  };
  const isArray2 = Array.isArray;
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const hashPos = location2.indexOf("#");
    let searchPos = location2.indexOf("?");
    if (hashPos < searchPos && hashPos >= 0) {
      searchPos = -1;
    }
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray2(a) ? isEquivalentArray(a, b) : isArray2(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return isArray2(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (segment === ".")
        continue;
      if (segment === "..") {
        if (position > 1)
          position--;
      } else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  const START = "";
  function normalizeBase(base) {
    if (!base) {
      {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
  });
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search: search2, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search2 + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index = listeners.indexOf(callback);
        if (index > -1)
          listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign2({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign2({}, history2.state, buildState(
        historyState.value.back,
        to,
        historyState.value.forward,
        true
      ), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign2(
        {},
        historyState.value,
        history2.state,
        {
          forward: to,
          scroll: computeScrollPosition()
        }
      );
      changeLocation(currentState.current, currentState, true);
      const state = assign2({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign2({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createMemoryHistory(base = "") {
    let listeners = [];
    let queue = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location2) {
      position++;
      if (position === queue.length) {
        queue.push(location2);
      } else {
        queue.splice(position);
        queue.push(location2);
      }
    }
    function triggerListeners(to, from, { direction, delta }) {
      const info = {
        direction,
        delta,
        type: NavigationType.pop
      };
      for (const callback of listeners) {
        callback(to, from, info);
      }
    }
    const routerHistory = {
      location: START,
      state: {},
      base,
      createHref: createHref.bind(null, base),
      replace(to) {
        queue.splice(position--, 1);
        setLocation(to);
      },
      push(to, data) {
        setLocation(to);
      },
      listen(callback) {
        listeners.push(callback);
        return () => {
          const index = listeners.indexOf(callback);
          if (index > -1)
            listeners.splice(index, 1);
        };
      },
      destroy() {
        listeners = [];
        queue = [START];
        position = 0;
      },
      go(delta, shouldTrigger = true) {
        const from = this.location;
        const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
        position = Math.max(0, Math.min(position + delta, queue.length - 1));
        if (shouldTrigger) {
          triggerListeners(this.location, from, {
            direction,
            delta
          });
        }
      }
    };
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => queue[position]
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#"))
      base += "#";
    return createWebHistory(base);
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  const NavigationFailureSymbol = Symbol("");
  exports.NavigationFailureType = void 0;
  (function(NavigationFailureType) {
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
  })(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
  const ErrorTypeMessages = {
    [1]({ location: location2, currentLocation }) {
      return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
    },
    [2]({ from, to }) {
      return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [4]({ from, to }) {
      return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [8]({ from, to }) {
      return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [16]({ from, to }) {
      return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    }
  };
  function createRouterError(type, params) {
    {
      return assign2(new Error(ErrorTypeMessages[type](params)), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const propertiesToLog = ["params", "query", "hash"];
  function stringifyRoute(to) {
    if (typeof to === "string")
      return to;
    if ("path" in to)
      return to.path;
    const location2 = {};
    for (const key of propertiesToLog) {
      if (key in to)
        location2[key] = to[key];
    }
    return JSON.stringify(location2, null, 2);
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign2({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [90];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict)
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (isArray2(param) && !repeatable) {
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            }
            const text = isArray2(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path || "/";
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore))
        return 1;
      if (isLastScoreNegative(bScore))
        return -1;
    }
    return bScore.length - aScore.length;
  }
  function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign2(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes2, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(assign2({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          }));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher))
            removeRoute(record.name);
        }
        if (mainNormalizedRecord.children) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
        insertMatcher(matcher);
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop2;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index = matchers.indexOf(matcherRef);
        if (index > -1) {
          matchers.splice(index, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      let i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
        i++;
      matchers.splice(i, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign2(
          paramsFromLocation(
            currentLocation.params,
            matcher.keys.filter((k) => !k.optional).map((k) => k.name)
          ),
          location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
        );
        path = matcher.stringify(params);
      } else if ("path" in location2) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign2({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes2.forEach((route) => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: void 0,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || null : record.component && { default: record.component }
    };
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "boolean" ? props : props[name];
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta2, record) => assign2(meta2, record.meta), {});
  }
  function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some((child) => child === record || isRecordChildOf(record, child));
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  function parseQuery(search2) {
    const query = {};
    if (search2 === "" || search2 === "?")
      return query;
    const hasLeadingIM = search2[0] === "?";
    const searchParams = (hasLeadingIM ? search2.slice(1) : search2).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!isArray2(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search2 = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search2 += (search2.length ? "&" : "") + key;
        }
        continue;
      }
      const values = isArray2(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search2 += (search2.length ? "&" : "") + key;
          if (value2 != null)
            search2 += "=" + value2;
        }
      });
    }
    return search2;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = isArray2(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  const matchedRouteKey = Symbol("");
  const viewDepthKey = Symbol("");
  const routerKey = Symbol("");
  const routeLocationKey = Symbol("");
  const routerViewLocationKey = Symbol("");
  function useCallbacks() {
    let handlers = [];
    function add(handler2) {
      handlers.push(handler2);
      return () => {
        const i = handlers.indexOf(handler2);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers,
      reset
    };
  }
  function registerGuard(record, name, guard) {
    const removeFromList = () => {
      record[name].delete(guard);
    };
    vue.onUnmounted(removeFromList);
    vue.onDeactivated(removeFromList);
    vue.onActivated(() => {
      record[name].add(guard);
    });
    record[name].add(guard);
  }
  function onBeforeRouteLeave(leaveGuard) {
    const activeRecord = vue.inject(
      matchedRouteKey,
      {}
    ).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "leaveGuards", leaveGuard);
  }
  function onBeforeRouteUpdate(updateGuard) {
    const activeRecord = vue.inject(
      matchedRouteKey,
      {}
    ).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "updateGuards", updateGuard);
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false) {
          reject(createRouterError(4, {
            from,
            to
          }));
        } else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
            enterCallbackArray.push(valid);
          }
          resolve();
        }
      };
      const guardReturn = guard.call(record && record.instances[name], to, from, next);
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name)();
          }));
        }
      }
    }
    return guards;
  }
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function loadRouteLocation(route) {
    return route.matched.every((record) => record.redirect) ? Promise.reject(new Error("Cannot load a route that redirects.")) : Promise.all(route.matched.map((record) => record.components && Promise.all(Object.keys(record.components).reduce((promises, name) => {
      const rawComponent = record.components[name];
      if (typeof rawComponent === "function" && !("displayName" in rawComponent)) {
        promises.push(rawComponent().then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          return;
        }));
      }
      return promises;
    }, [])))).then(() => route);
  }
  function useLink(props) {
    const router = vue.inject(routerKey);
    const currentRoute = vue.inject(routeLocationKey);
    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
    const activeRecordIndex = vue.computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1)
        return index;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
    });
    const isActive = vue.computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router[vue.unref(props.replace) ? "replace" : "push"](
          vue.unref(props.to)
        ).catch(noop2);
      }
      return Promise.resolve();
    }
    return {
      route,
      href: vue.computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = vue.reactive(useLink(props));
      const { options } = vue.inject(routerKey);
      const elClass = vue.computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : vue.h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!isArray2(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = vue.inject(routerViewLocationKey);
      const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
      const injectedDepth = vue.inject(viewDepthKey, 0);
      const depth = vue.computed(() => {
        let initialDepth = vue.unref(injectedDepth);
        const { matched } = routeToDisplay.value;
        let matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
          initialDepth++;
        }
        return initialDepth;
      });
      const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth.value]);
      vue.provide(viewDepthKey, vue.computed(() => depth.value + 1));
      vue.provide(matchedRouteKey, matchedRouteRef);
      vue.provide(routerViewLocationKey, routeToDisplay);
      const viewRef = vue.ref();
      vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const currentName = props.name;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[currentName];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = vue.h(ViewComponent, assign2({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, { Component: component, route }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot)
      return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign2({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign2(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if ("path" in rawLocation) {
        matcherLocation = assign2({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign2({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign2({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign2({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign2({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign2({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign2(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign2({
          query: to.query,
          hash: to.hash,
          params: "path" in newTargetLocation ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(
          assign2(locationAsObject(shouldRedirect), {
            state: typeof shouldRedirect === "object" ? assign2({}, data, shouldRedirect.state) : data,
            force,
            replace: replace2
          }),
          redirectedFrom || targetLocation
        );
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll();
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(
              assign2({
                replace: replace2
              }, locationAsObject(failure2.to), {
                state: typeof failure2.to === "object" ? assign2({}, data, failure2.to.state) : data,
                force
              }),
              redirectedFrom || toLocation
            );
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of to.matched) {
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (isArray2(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      for (const guard of afterGuards.list())
        guard(to, from, failure);
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = {};
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign2({
            scroll: isFirstNavigation && state && state.scroll
          }, data));
        else
          routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll();
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener)
        return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        if (!router.listening)
          return;
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign2(shouldRedirect, { replace: true }), toLocation).catch(noop2);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(
              error.to,
              toLocation
            ).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop2);
            return Promise.reject();
          }
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(
            toLocation,
            from,
            false
          );
          if (failure) {
            if (info.delta && !isNavigationFailure(failure, 8)) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop2);
      });
    }
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorHandlers.list();
      if (list.length) {
        list.forEach((handler2) => handler2(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve2, reject) => {
        readyHandlers.add([resolve2, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      return Promise.resolve();
    }
    const go = (delta) => routerHistory.go(delta);
    const installedApps = /* @__PURE__ */ new Set();
    const router = {
      currentRoute,
      listening: true,
      addRoute,
      removeRoute,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady,
      install(app) {
        const router2 = this;
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => vue.unref(currentRoute)
        });
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
        }
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, vue.reactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    return router;
  }
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter2() {
    return vue.inject(routerKey);
  }
  function useRoute2() {
    return vue.inject(routeLocationKey);
  }
  exports.RouterLink = RouterLink;
  exports.RouterView = RouterView;
  exports.START_LOCATION = START_LOCATION_NORMALIZED;
  exports.createMemoryHistory = createMemoryHistory;
  exports.createRouter = createRouter;
  exports.createRouterMatcher = createRouterMatcher;
  exports.createWebHashHistory = createWebHashHistory;
  exports.createWebHistory = createWebHistory;
  exports.isNavigationFailure = isNavigationFailure;
  exports.loadRouteLocation = loadRouteLocation;
  exports.matchedRouteKey = matchedRouteKey;
  exports.onBeforeRouteLeave = onBeforeRouteLeave;
  exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
  exports.parseQuery = parseQuery;
  exports.routeLocationKey = routeLocationKey;
  exports.routerKey = routerKey;
  exports.routerViewLocationKey = routerViewLocationKey;
  exports.stringifyQuery = stringifyQuery;
  exports.useLink = useLink;
  exports.useRoute = useRoute2;
  exports.useRouter = useRouter2;
  exports.viewDepthKey = viewDepthKey;
})(vueRouter_prod);
(function(module) {
  module.exports = vueRouter_prod;
})(vueRouter_cjs_prod);
const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler2, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler2 !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  const nuxt = useNuxtApp();
  const instance = vue_cjs_prod.getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      vue_cjs_prod.onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const useInitialCache = () => options.initialCache && nuxt.payload.data[key] !== void 0;
  const asyncData = {
    data: wrapInRef((_f = nuxt.payload.data[key]) != null ? _f : options.default()),
    pending: vue_cjs_prod.ref(!useInitialCache()),
    error: vue_cjs_prod.ref((_g = nuxt.payload._errors[key]) != null ? _g : null)
  };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler2(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = vue_cjs_prod.unref(options.default());
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    vue_cjs_prod.onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => vue_cjs_prod.toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || autoKey;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = "$f" + _key;
  const _request = vue_cjs_prod.computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return vue_cjs_prod.isRef(r) ? r.value : r;
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    initialCache,
    ...fetchOptions
  } = opts;
  const _fetchOptions = {
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  };
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    initialCache,
    watch: [
      _request,
      ...watch || []
    ]
  };
  const asyncData = useAsyncData(key, () => {
    return $fetch(_request.value, _fetchOptions);
  }, _asyncDataOptions, "$2Qpjr020wX");
  return asyncData;
}
function useRequestHeaders(include) {
  var _a, _b;
  const headers = (_b = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event.req.headers) != null ? _b : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (vue_cjs_prod.getCurrentInstance()) {
    return vue_cjs_prod.inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 302));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const abortNavigation = (err) => {
  if (err) {
    throw err instanceof Error ? err : new Error(err);
  }
  return false;
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(
            vue_cjs_prod.resolveComponent("RouterLink"),
            {
              to: to.value,
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(vue_cjs_prod.unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: item });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute("content", "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length));
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(vue_cjs_prod.shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => vue_cjs_prod.unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(vue_cjs_prod.unref(objs));
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index = i;
                  break;
                }
              }
              if (index !== -1) {
                deduped.splice(index, 1);
              }
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(titleTemplate, tag.props.children);
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script2) => ({
    script: [script2]
  }))
});
const NoScript = vue_cjs_prod.defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw({ title: "", ...metaConfig.globalMeta }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_cjs_prod.exports.RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          return _wrapIf(
            vue_cjs_prod.Transition,
            (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition,
            wrapInKeepAlive(
              routeProps.route.meta.keepalive,
              isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(Component, { key, routeProps, pageKey: key }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => vue_cjs_prod.h(Component, { key, routeProps, pageKey: key }) })
            )
          ).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const Component = vue_cjs_prod.defineComponent({
  props: ["routeProps", "pageKey"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = vue_cjs_prod.computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    vue_cjs_prod.provide("_route", vue_cjs_prod.reactive(route));
    return () => vue_cjs_prod.h(props.routeProps.Component);
  }
});
const _sfc_main$i = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  props: ["pagination", "refresh"],
  setup(__props) {
    const route = useRoute();
    const getPages = vue_cjs_prod.computed(() => {
      const page = +route.params.page;
      const obj = {
        min: 0,
        max: 0
      };
      if (page < 3) {
        obj.min = 0;
        obj.max = 6;
      } else {
        obj.min = page - 3;
        obj.max = page + 2;
      }
      return obj;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "pagination flex items-center justify-center" }, _attrs))}>`);
      if (+vue_cjs_prod.unref(route).params.page > 1) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: 1 }, query: vue_cjs_prod.unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-double-left"${_scopeId}></i>`);
            } else {
              return [
                vue_cjs_prod.createVNode("i", { class: "pi pi-angle-double-left" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-left"></i></span>`);
      }
      if (+vue_cjs_prod.unref(route).params.page > 1) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: +vue_cjs_prod.unref(route).params.page - 1 }, query: vue_cjs_prod.unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-left"${_scopeId}></i>`);
            } else {
              return [
                vue_cjs_prod.createVNode("i", { class: "pi pi-angle-left" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-left"></i></span>`);
      }
      _push(`<div class="pagination-pages overflow-hidden flex items-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(Math.ceil(__props.pagination.count / 20), (index) => {
        _push(`<!--[-->`);
        if (vue_cjs_prod.unref(getPages).min <= index && vue_cjs_prod.unref(getPages).max >= index) {
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: { params: { page: index }, query: vue_cjs_prod.unref(route).query },
            class: ["text-2xl py-2 px-4 mx-1 border border-slate-200", +vue_cjs_prod.unref(route).params.page === index ? "active" : ""]
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(index)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(index), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
      if (+vue_cjs_prod.unref(route).params.page < Math.ceil(__props.pagination.count / 20)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: +vue_cjs_prod.unref(route).params.page + 1 }, query: vue_cjs_prod.unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-right"${_scopeId}></i>`);
            } else {
              return [
                vue_cjs_prod.createVNode("i", { class: "pi pi-angle-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-right"></i></span>`);
      }
      if (+vue_cjs_prod.unref(route).params.page < Math.ceil(__props.pagination.count / 20)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: Math.ceil(__props.pagination.count / 20) }, query: vue_cjs_prod.unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-double-right"${_scopeId}></i>`);
            } else {
              return [
                vue_cjs_prod.createVNode("i", { class: "pi pi-angle-double-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-right"></i></span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/pagination.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "filter",
  __ssrInlineRender: true,
  props: ["refresh"],
  emits: ["changeQuery"],
  async setup(__props, { emit: emits }) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const { data: filters } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch("/api/v1/filters", "$5hdpGqCQFQ")), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch("/api/v1/categories", "$XqEDBpiu8X")), __temp = await __temp, __restore(), __temp);
    const filterData = vue_cjs_prod.reactive({
      category: +route.params.category || null,
      subcategory: +route.params.subcategory || null,
      model: +route.query.model || null,
      make: +route.query.make || null,
      supplier: +route.query.supplier || null
    });
    const modelsList = vue_cjs_prod.computed(() => {
      return filters.value.filter((f) => f.parent_id === filterData.make);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="px-2 pt-3"><h3 class="text-2xl text-slate-600 border-b-2 border-zinc-700">${serverRenderer.exports.ssrInterpolate(_ctx.$t("filter"))}</h3></div><div class="container py-3 items-end"><div class="wrapper mb-2"><div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</span><select class="w-full form-input px-4 py-3 outline-0"><option${serverRenderer.exports.ssrRenderAttr("value", null)}>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(categories), (category) => {
        _push(`<!--[-->`);
        if (category.parent_id === 0) {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", category.id)}>${serverRenderer.exports.ssrInterpolate(category[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div>`);
      if (filterData.category) {
        _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</span><select class="w-full form-input px-4 py-3 outline-0"><option${serverRenderer.exports.ssrRenderAttr("value", null)}>\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(categories), (category) => {
          _push(`<!--[-->`);
          if (category.parent_id === filterData.category) {
            _push(`<option${serverRenderer.exports.ssrRenderAttr("value", category.id)}>${serverRenderer.exports.ssrInterpolate(category[`name_${_ctx.$route.params.locale}`])}</option>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></select></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041C\u0430\u0440\u043A\u0430</span><select class="w-full form-input px-4 py-3 outline-0"><option${serverRenderer.exports.ssrRenderAttr("value", null)}>\u041C\u0430\u0440\u043A\u0430</option><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(filters), (filter2) => {
        _push(`<!--[-->`);
        if (filter2.parent_id === 3) {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", filter2.id)}>${serverRenderer.exports.ssrInterpolate(filter2[`name_${_ctx.$route.params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div>`);
      if (filterData.make && vue_cjs_prod.unref(modelsList).length > 0) {
        _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041C\u043E\u0434\u0435\u043B\u044C</span><select class="w-full form-input px-4 py-3 outline-0"><option${serverRenderer.exports.ssrRenderAttr("value", null)}>\u041C\u043E\u0434\u0435\u043B\u044C</option><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(filters), (filter2) => {
          _push(`<!--[-->`);
          if (filter2.parent_id === filterData.make) {
            _push(`<option${serverRenderer.exports.ssrRenderAttr("value", filter2.id)}>${serverRenderer.exports.ssrInterpolate(filter2[`name_${_ctx.$route.params.locale}`])}</option>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></select></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C</span><select class="w-full form-input px-4 py-3 outline-0"><option${serverRenderer.exports.ssrRenderAttr("value", null)}>\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C</option><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(filters), (filter2) => {
        _push(`<!--[-->`);
        if (filter2.parent_id === 2 && filter2[`name_${_ctx.$route.params.locale}`]) {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", filter2.id)}>${serverRenderer.exports.ssrInterpolate(filter2[`name_${_ctx.$route.params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div></div><button class="filter-btn mx-2 mb-2 h-11 bg-slate-600 text-gray-100">\u0417\u043D\u0430\u0439\u0442\u0438</button></div></div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/filter.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const isVue2 = false;
/*!
  * pinia v2.0.21
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol();
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = vue_cjs_prod.effectScope(true);
  const state = scope.run(() => vue_cjs_prod.ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = vue_cjs_prod.markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && vue_cjs_prod.getCurrentInstance()) {
    vue_cjs_prod.onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue_cjs_prod.isRef(subPatch) && !vue_cjs_prod.isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(vue_cjs_prod.isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = vue_cjs_prod.toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = vue_cjs_prod.markRaw(vue_cjs_prod.computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
  };
  let isListening;
  let isSyncListening;
  let subscriptions = vue_cjs_prod.markRaw([]);
  let actionSubscriptions = vue_cjs_prod.markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  vue_cjs_prod.ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    vue_cjs_prod.nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = noop;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => vue_cjs_prod.watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = vue_cjs_prod.reactive(assign(
    {},
    partialStore
  ));
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = vue_cjs_prod.effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (vue_cjs_prod.isRef(prop) && !isComputed(prop) || vue_cjs_prod.isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (vue_cjs_prod.isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(vue_cjs_prod.toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = vue_cjs_prod.getCurrentInstance();
    pinia = (pinia) || currentInstance && vue_cjs_prod.inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const getAllData = defineStore({
  id: "getAllData",
  state: () => {
    return {
      items: [],
      count_items: 0,
      firstLoad: true
    };
  },
  actions: {
    queryToString(query) {
      let str = "";
      for (let key in query) {
        if (query[key]) {
          str += `${key}=${query[key]}&`;
        }
      }
      return str;
    },
    setData(data) {
      if (Object.keys(data).length > 0) {
        const { items: items2, count } = data;
        this.count_items = count;
        this.items = items2;
      } else {
        this.items = [];
        this.count_items = 0;
      }
    },
    async filteringItems(query) {
      const data = await $fetch(`/api/items?${this.queryToString(query)}`, { method: "GET" });
      this.setData(data);
      return { items: this.items, count_items: this.count_items };
    },
    async getItems(params, query) {
      const { refresh, data } = await useAsyncData(
        "category",
        () => $fetch(`/api/v1/items?${this.queryToString(params)}&${this.queryToString(query)}`),
        "$xbL5jIdYpO"
      );
      await refresh();
      return data.value;
    },
    async getItem(id) {
      const { refresh, data } = await useAsyncData(
        "cart",
        () => $fetch(`/api/v1/${id}`, { method: "GET" }),
        "$kx9DuWN14F"
      );
      await refresh();
      return data.value;
    },
    async getCategories() {
      const { data } = await useFetch("/api/v1/categories", "$zgjEIUA1vG");
      return data.value;
    }
  }
});
let cart$2 = [];
const cartStore = defineStore({
  id: "cartStore",
  state: () => {
    return {
      cart: cart$2
    };
  },
  actions: {
    async set(id, count) {
      const isItem = this.cart.find((f) => f.id === id);
      if (isItem) {
        isItem.count += count;
      } else {
        const { item } = await getAllData().getItem(id);
        item.count = count;
        this.cart.push(item);
      }
      this.setToStorage();
    },
    get() {
      return this.cart;
    },
    delete(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.setToStorage();
    },
    setToStorage() {
    },
    initCart() {
    }
  }
});
const _sfc_main$g = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    items: Array
  },
  setup(__props) {
    vue_cjs_prod.ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[--><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.items, (item) => {
        _push(`<div class="group m-2 relative"><div class="transition ease-in-out group-hover:scale-110 group-hover:absolute group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          title: item[`name_${_ctx.$route.params.locale}`],
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          class: "block mb-2"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.images && item.images.length > 0) {
                _push2(`<img class="w-full h-40 object-cover"${serverRenderer.exports.ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${item.images[0]}`)}${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                item.images && item.images.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("img", {
                  key: 0,
                  class: "w-full h-40 object-cover",
                  src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                }, null, 8, ["src"])) : vue_cjs_prod.createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          title: item[`name_${_ctx.$route.params.locale}`],
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          class: "item-name block h-10 overflow-hidden text-sm text-slate-500 transition group-hover:text-slate-900 px-2 mb-2"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(item[`name_${_ctx.$route.params.locale}`])}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item[`name_${_ctx.$route.params.locale}`]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="h-12"><ul class="text-xs px-2 mb-2"><li class="font-bold"><span class="font-normal">\u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430: </span>${serverRenderer.exports.ssrInterpolate(item.code_vendor)}</li><li class="font-bold"><span class="font-normal">\u041A\u043E\u0434 \u043F\u0440\u043E-\u043B\u044F: </span>${serverRenderer.exports.ssrInterpolate(item.code_wholesale)}</li></ul></div><div class="flex items-center"><span class="block w-1/2 px-2 text-slate-600 text-sm font-bold whitespace-nowrap">${serverRenderer.exports.ssrInterpolate(item.price_retail / 100)} \u0433\u0440\u043D.</span><button type="button" class="w-1/2 text-sky-900 bg-inherit group-hover:bg-cyan-700 group-hover:text-sky-100 py-2 rounded-br-md">${serverRenderer.exports.ssrInterpolate(_ctx.$t("to_cart"))}</button></div></div></div>`);
      });
      _push(`<!--]--><div class="cart-notice"><span>\u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443!</span></div><!--]-->`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/item.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const currentItems = vue_cjs_prod.ref([]);
    const currentCategory = vue_cjs_prod.ref([]);
    const isLoader = vue_cjs_prod.ref(false);
    const pagination = vue_cjs_prod.ref({
      count: 0
    });
    const changeQuery = async (query) => {
      await getData(query);
    };
    const queryToString = (query) => {
      let str = "";
      for (let key in query) {
        if (key && query[key]) {
          str += `${key}=${query[key]}&`;
        }
      }
      return str;
    };
    const getData = async (query = route.query) => {
      const { data, refresh } = await useFetch(`/api/v1/items?${queryToString(route.params)}${queryToString(query)}&limit=21`, "$gfvq5tKCLR");
      await refresh({ dedupe: true });
      currentItems.value = data.value.items;
      pagination.value.count = +data.value.count;
    };
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getData()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "md:flex" }, _attrs))}><div class="sm:w-full md:w-3/12">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$h, {
        onChangeQuery: changeQuery,
        class: "product-page"
      }, null, _parent));
      _push(`</div><div class="sm:w-full md:w-9/12">`);
      if (currentCategory.value) {
        _push(`<div class="w-full text-xl text-center uppercase">${serverRenderer.exports.ssrInterpolate(currentCategory.value[`name_${vue_cjs_prod.unref(route).params.locale}`])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full px-2 py-3"><h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">${serverRenderer.exports.ssrInterpolate(_ctx.$t("new_supply"))}</h3></div>`);
      if (currentItems.value && currentItems.value.length > 0) {
        _push(`<!--[--><div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-12">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$g, { items: currentItems.value }, null, _parent));
        _push(`</div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$i, { pagination: pagination.value }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isLoader.value) {
        _push(`<div class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center"><span class="text-2xl text-slate-800">LOADING</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/products.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const meta$9 = void 0;
const meta$8 = void 0;
const __nuxt_component_0 = vue_cjs_prod.defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = vue_cjs_prod.ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return vue_cjs_prod.createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
const useAuthUser = () => {
  return useState("user", () => null, "$04xf6GwtWB");
};
const useAuth = () => {
  const authUser = useAuthUser();
  const setUser = (user) => {
    authUser.value = user;
  };
  const setCookie = (cookie) => {
    cookie.value = cookie;
  };
  const login = async (email, password2, rememberMe) => {
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email,
        password: password2,
        rememberMe
      }
    });
    setUser(data.user);
    return authUser;
  };
  const logout2 = async () => {
    const data = await $fetch("/api/auth/logout", {
      method: "POST"
    });
    setUser(data.user);
  };
  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch("/api/auth/me", {
          headers: useRequestHeaders(["cookie"])
        });
        setUser(data.user);
      } catch (error) {
        setCookie(null);
      }
    }
    return authUser;
  };
  return {
    login,
    logout: logout2,
    me
  };
};
const useAdmin = () => {
  const authUser = useAuthUser();
  return vue_cjs_prod.computed(() => {
    if (!authUser.value)
      return false;
    return authUser.value.access_level === 0;
  });
};
const meta$7 = void 0;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$e = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="slide flex justify-center items-center text-gray-400"><span>No image</span></div></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/slider.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$2]]);
const meta$6 = void 0;
const meta$5 = void 0;
const meta$4 = void 0;
const meta$3 = void 0;
const meta$2 = void 0;
const meta$1 = void 0;
const meta = void 0;
const routes = [
  {
    name: "locale-category-subcategory-page-page",
    path: "/:locale/:category/:subcategory/page-:page",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/[category]/[subcategory]/page-[page].vue",
    children: [],
    meta: meta$9,
    alias: [],
    component: () => import('./_nuxt/page-_page_.b0616872.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-category-page-page",
    path: "/:locale/:category/page-:page",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/[category]/page-[page].vue",
    children: [],
    meta: meta$8,
    alias: [],
    component: () => import('./_nuxt/page-_page_.05875d20.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-cart",
    path: "/:locale/cart",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/cart.vue",
    children: [],
    meta: meta$7,
    alias: [],
    component: () => import('./_nuxt/cart.f8bbb67c.mjs').then((m) => m.default || m)
  },
  {
    name: "locale",
    path: "/:locale",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/index.vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => import('./_nuxt/index.756e0482.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-pages-about_us",
    path: "/:locale/pages/about_us",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/pages/about_us.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => import('./_nuxt/about_us.95605dce.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-pages-contacts",
    path: "/:locale/pages/contacts",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/pages/contacts.vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => import('./_nuxt/contacts.53945e66.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-pages-delivery",
    path: "/:locale/pages/delivery",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/pages/delivery.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => import('./_nuxt/delivery.1e0f7ccf.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-product-productId",
    path: "/:locale/product/:productId",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/product/[productId].vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => import('./_nuxt/_productId_.554509cc.mjs').then((m) => m.default || m)
  },
  {
    name: "locale-search-request",
    path: "/:locale/search/:request",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/[locale]/search/[request].vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => import('./_nuxt/_request_.90ad14f2.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/mikhailchernysh/works/avtotarget/pages/index.vue",
    children: [],
    meta,
    alias: [],
    component: () => import('./_nuxt/index.1a2606d7.mjs').then((m) => m.default || m)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {
  "admin-only": () => import('./_nuxt/admin-only.3bb82397.mjs'),
  "guest-only": () => import('./_nuxt/guest-only.ca4f28a6.mjs'),
  redirect: () => import('./_nuxt/redirect.56e10c5c.mjs'),
  "user-only": () => import('./_nuxt/user-only.7d7a5de6.mjs')
};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_cjs_prod.exports.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_cjs_prod.exports.createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = vue_cjs_prod.computed(() => _route.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const plugins_auth_ts_vT9JWWT9pN = defineNuxtPlugin(async () => {
  let __temp, __restore;
  const { me } = useAuth();
  [__temp, __restore] = executeAsync(() => me()), await __temp, __restore();
});
const all$1 = "\u0412\u0441\u0456";
const mainPage$1 = "\u0413\u043E\u043B\u043E\u0432\u043D\u0430";
const language$1 = "\u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430";
const password$1 = "\u041F\u0430\u0440\u043E\u043B\u044C";
const close$1 = "\u0417\u0430\u043A\u0440\u0438\u0442\u0438";
const sign_in$1 = "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F";
const reg_in$1 = "\u0420\u0435\u0433\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044F";
const come_in$1 = "\u0423\u0432\u0456\u0439\u0442\u0438";
const logout$1 = "\u0412\u0438\u0439\u0442\u0438";
const search_pl$1 = "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443...";
const search_btn$1 = "\u041F\u043E\u0448\u0443\u043A";
const search_hl$1 = "\u041F\u043E\u0448\u0443\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D";
const found$1 = "\u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E";
const new_supply$1 = "\u041D\u043E\u0432\u0456 \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0438";
const search$1 = "\u0417\u043D\u0430\u0439\u0442\u0438";
const to_cart$1 = "\u0423 \u043A\u043E\u0448\u0438\u043A";
const cart$1 = "\u041A\u043E\u0448\u0438\u043A";
const choise_parts$1 = "\u0412\u0443\u0437\u043E\u043B";
const choise_cars$1 = "\u041C\u0430\u0440\u043A\u0430 \u0430\u0432\u0442\u043E";
const choise_suppliers$1 = "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u043A";
const choise_category$1 = "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F";
const filter$1 = "\u041F\u043E\u0448\u0443\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D";
const count_items$1 = "\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C";
const cars$1 = "\u041C\u0430\u0448\u0438\u043D\u0438";
const parts$1 = "\u0412\u0443\u0437\u043B\u0438";
const suppliers$1 = "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u043A\u0438";
const order$1 = "\u0417\u0430\u043C\u043E\u0432\u0438\u0442\u0438";
const show_more$1 = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0449\u0435";
const pages$1 = {
  about_us: "\u041F\u0440\u043E \u043D\u0430\u0441",
  delivery: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430",
  contacts: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438"
};
const items$1 = {
  code_wholesale: "\u041A\u043E\u0434 \u0432\u0438\u0440\u043E\u0431\u043D\u0438\u043A\u0430",
  code_vendor: "\u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430",
  supplier: "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u043A",
  part: "\u0412\u0443\u0437\u043E\u043B",
  car: "\u041C\u0430\u0440\u043A\u0430 \u043C\u0430\u0448\u0438\u043D\u0438",
  price: "\u0426\u0456\u043D\u0430",
  total_item: "\u0421\u0443\u043C\u0430",
  total: "\u0420\u0430\u0437\u043E\u043C"
};
const uk = {
  all: all$1,
  mainPage: mainPage$1,
  language: language$1,
  password: password$1,
  close: close$1,
  sign_in: sign_in$1,
  reg_in: reg_in$1,
  come_in: come_in$1,
  logout: logout$1,
  search_pl: search_pl$1,
  search_btn: search_btn$1,
  search_hl: search_hl$1,
  found: found$1,
  new_supply: new_supply$1,
  search: search$1,
  to_cart: to_cart$1,
  cart: cart$1,
  choise_parts: choise_parts$1,
  choise_cars: choise_cars$1,
  choise_suppliers: choise_suppliers$1,
  choise_category: choise_category$1,
  filter: filter$1,
  count_items: count_items$1,
  cars: cars$1,
  parts: parts$1,
  suppliers: suppliers$1,
  order: order$1,
  show_more: show_more$1,
  pages: pages$1,
  items: items$1
};
const all = "\u0412\u0441\u0435";
const mainPage = "\u0413\u043B\u0430\u0432\u043D\u0430\u044F";
const language = "\u0440\u0443\u0441\u0441\u043A\u0438\u0439";
const password = "\u041F\u0430\u0440\u043E\u043B\u044C";
const close = "\u0417\u0430\u043A\u0440\u044B\u0442\u044C";
const sign_in = "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F";
const reg_in = "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F";
const come_in = "\u0412\u043E\u0439\u0442\u0438";
const logout = "\u0412\u044B\u0439\u0442\u0438";
const search_pl = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430...";
const search_btn = "\u041F\u043E\u0438\u0441\u043A";
const search_hl = "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439";
const found = "\u043D\u0430\u0439\u0434\u0435\u043D\u043E";
const new_supply = "\u041D\u043E\u0432\u044B\u0435 \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0438";
const search = "\u041D\u0430\u0439\u0442\u0438";
const to_cart = "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443";
const cart = "\u041A\u043E\u0440\u0437\u0438\u043D\u0430";
const choise_parts = "\u0423\u0437\u0435\u043B";
const choise_cars = "\u041C\u0430\u0440\u043A\u0430 \u0430\u0432\u0442\u043E";
const choise_suppliers = "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C";
const choise_category = "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F";
const filter = "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439";
const count_items = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E";
const cars = "\u041C\u0430\u0448\u0438\u043D\u044B";
const parts = "\u0423\u0437\u043B\u044B";
const suppliers = "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0438";
const order = "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C";
const show_more = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435";
const pages = {
  about_us: "\u041E \u043D\u0430\u0441",
  delivery: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430",
  contacts: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
};
const items = {
  code_wholesale: "\u041A\u043E\u0434 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F",
  code_vendor: "\u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430",
  supplier: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F",
  part: "\u0423\u0437\u0435\u043B",
  car: "\u041C\u0430\u0440\u043A\u0430 \u043C\u0430\u0448\u0438\u043D\u044B",
  price: "\u0426\u0435\u043D\u0430",
  total_item: "\u0421\u0443\u043C\u043C\u0430",
  total: "\u0418\u0442\u043E\u0433\u043E"
};
const ru = {
  all,
  mainPage,
  language,
  password,
  close,
  sign_in,
  reg_in,
  come_in,
  logout,
  search_pl,
  search_btn,
  search_hl,
  found,
  new_supply,
  search,
  to_cart,
  cart,
  choise_parts,
  choise_cars,
  choise_suppliers,
  choise_category,
  filter,
  count_items,
  cars,
  parts,
  suppliers,
  order,
  show_more,
  pages,
  items
};
const localStrings = {
  uk,
  ru
};
const plugins_i18n_ts_VfGcjrvSkj = defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      t: (key) => {
        const lang = localStrings[nuxtApp._route.params.locale];
        if (!nuxtApp._route.params.locale || !lang)
          return null;
        if (key.indexOf(".") !== -1) {
          const [p1, p2] = key.split(".");
          return lang[p1] ? lang[p1][p2] || "" : "";
        } else {
          return lang[key] || "";
        }
      }
    }
  };
});
var DomHandler = {
  innerWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  width(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  getWindowScrollTop() {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft() {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth;
      if (margin) {
        let style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width;
    }
    return 0;
  },
  getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight(el, margin) {
    if (el) {
      let height = el.clientHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport() {
    let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
    return { width: w, height: h };
  },
  getOffset(el) {
    if (el) {
      let rect = el.getBoundingClientRect();
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index(element) {
    if (element) {
      let children = element.parentNode.childNodes;
      let num = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i] === element)
          return num;
        if (children[i].nodeType === 1)
          num++;
      }
    }
    return -1;
  },
  addMultipleClasses(element, className) {
    if (element && className) {
      if (element.classList) {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.classList.add(styles[i]);
        }
      } else {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.className += " " + styles[i];
        }
      }
    }
  },
  addClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += " " + className;
    }
  },
  removeClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass(element, className) {
    if (element) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  find(element, selector) {
    return element ? element.querySelectorAll(selector) : [];
  },
  findSingle(element, selector) {
    if (element) {
      return element.querySelector(selector);
    }
    return null;
  },
  getHeight(el) {
    if (el) {
      let height = el.offsetHeight;
      let style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width;
    }
    return 0;
  },
  absolutePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      let elementOuterHeight = elementDimensions.height;
      let elementOuterWidth = elementDimensions.width;
      let targetOuterHeight = target.offsetHeight;
      let targetOuterWidth = target.offsetWidth;
      let targetOffset = target.getBoundingClientRect();
      let windowScrollTop = this.getWindowScrollTop();
      let windowScrollLeft = this.getWindowScrollLeft();
      let viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        element.style.transformOrigin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = "top";
      }
      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else
        left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  relativePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        element.style.transformOrigin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
        element.style.transformOrigin = "top";
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  getParents(element, parents = []) {
    return element["parentNode"] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
  },
  getScrollableParents(element) {
    let scrollableParents = [];
    if (element) {
      let parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node) => {
        let styleDeclaration = window["getComputedStyle"](node, null);
        return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
      };
      for (let parent of parents) {
        let scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
        if (scrollSelectors) {
          let selectors = scrollSelectors.split(",");
          for (let selector of selectors) {
            let el = this.findSingle(parent, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          }
        }
        if (parent.nodeType !== 9 && overflowCheck(parent)) {
          scrollableParents.push(parent);
        }
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions(element) {
    if (element) {
      let dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      let last = +new Date();
      let opacity = 0;
      let tick = function() {
        opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date();
        if (+opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  },
  fadeOut(element, ms) {
    if (element) {
      let opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      let fading = setInterval(() => {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent() {
    return navigator.userAgent;
  },
  appendChild(element, target) {
    if (this.isElement(target))
      target.appendChild(element);
    else if (target.el && target.elElement)
      target.elElement.appendChild(element);
    else
      throw new Error("Cannot append " + target + " to " + element);
  },
  scrollInView(container, item) {
    let borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document["selection"] && document["selection"].empty) {
      try {
        document["selection"].empty();
      } catch (error) {
      }
    }
  },
  calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth;
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "p-scrollbar-measure";
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  getBrowser() {
    if (!this.browser) {
      let matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isClient() {
    return false;
  },
  getFocusableElements(element, selector = "") {
    let focusableElements = this.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`
    );
    let visibleFocusableElements = [];
    for (let focusableElement of focusableElements) {
      if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
        visibleFocusableElements.push(focusableElement);
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement(element, selector) {
    const focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  isClickable(element) {
    const targetNode = element.nodeName;
    const parentNode = element.parentElement && element.parentElement.nodeName;
    return targetNode == "INPUT" || targetNode == "BUTTON" || targetNode == "A" || parentNode == "INPUT" || parentNode == "BUTTON" || parentNode == "A" || this.hasClass(element, "p-button") || this.hasClass(element.parentElement, "p-button") || this.hasClass(element.parentElement, "p-checkbox") || this.hasClass(element.parentElement, "p-radiobutton");
  },
  applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (let prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
  },
  isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  exportCSV(csv, filename) {
    let blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      let link = document.createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        window.open(encodeURI(csv));
      }
    }
  }
};
class ConnectedOverlayScrollHandler {
  constructor(element, listener = () => {
  }) {
    this.element = element;
    this.listener = listener;
  }
  bindScrollListener() {
    this.scrollableParents = DomHandler.getScrollableParents(this.element);
    for (let i = 0; i < this.scrollableParents.length; i++) {
      this.scrollableParents[i].addEventListener("scroll", this.listener);
    }
  }
  unbindScrollListener() {
    if (this.scrollableParents) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].removeEventListener("scroll", this.listener);
      }
    }
  }
  destroy() {
    this.unbindScrollListener();
    this.element = null;
    this.listener = null;
    this.scrollableParents = null;
  }
}
var ObjectUtils = {
  equals(obj1, obj2, field) {
    if (field)
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else
      return this.deepEquals(obj1, obj2);
  },
  deepEquals(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!this.deepEquals(a[i], b[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData(data, field) {
    if (data && Object.keys(data).length && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        let fields = field.split(".");
        let value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  },
  isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  getItemValue(obj, ...params) {
    return this.isFunction(obj) ? obj(...params) : obj;
  },
  filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  },
  reorderArray(value, from, to) {
    let target;
    if (value && from !== to) {
      if (to >= value.length) {
        target = to - value.length;
        while (target-- + 1) {
          value.push(void 0);
        }
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList(value, list) {
    let index = -1;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  contains(value, list) {
    if (value != null && list && list.length) {
      for (let val of list) {
        if (this.equals(value, val))
          return true;
      }
    }
    return false;
  },
  insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      let injected = false;
      for (let i = 0; i < arr.length; i++) {
        let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp(vnode, prop) {
    let props = vnode.props;
    if (props) {
      let kebapProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      let propName = Object.prototype.hasOwnProperty.call(props, kebapProp) ? kebapProp : prop;
      return vnode.type.props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
    }
    return null;
  },
  isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && typeof value === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isPrintableCharacter(char = "") {
    return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
  },
  findLastIndex(arr, callback) {
    let index = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index = arr.findLastIndex(callback);
      } catch {
        index = arr.lastIndexOf([...arr].reverse().find(callback));
      }
    }
    return index;
  }
};
function handler() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex };
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({ key, value: newZIndex });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex()
  };
}
var ZIndexUtils = handler();
var lastId = 0;
function UniqueComponentId(prefix = "pv_id_") {
  lastId++;
  return `${prefix}${lastId}`;
}
function primebus() {
  const allHandlers = /* @__PURE__ */ new Map();
  return {
    on(type, handler2) {
      let handlers = allHandlers.get(type);
      if (!handlers)
        handlers = [handler2];
      else
        handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off(type, handler2) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit(type, evt) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map((handler2) => {
          handler2(evt);
        });
      }
    }
  };
}
const FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
const FilterOperator = {
  AND: "and",
  OR: "or"
};
const FilterService = {
  filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    let filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          let fieldValue = ObjectUtils.resolveFieldData(item, field);
          if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  },
  filters: {
    startsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || typeof filter2 === "string" && filter2.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || typeof filter2 === "string" && filter2.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || typeof filter2 === "string" && filter2.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() === filter2.getTime();
      else
        return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || typeof filter2 === "string" && filter2.trim() === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() !== filter2.getTime();
      else
        return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    in(value, filter2) {
      if (filter2 === void 0 || filter2 === null || filter2.length === 0) {
        return true;
      }
      for (let i = 0; i < filter2.length; i++) {
        if (ObjectUtils.equals(value, filter2[i])) {
          return true;
        }
      }
      return false;
    },
    between(value, filter2) {
      if (filter2 == null || filter2[0] == null || filter2[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime)
        return filter2[0].getTime() <= value.getTime() && value.getTime() <= filter2[1].getTime();
      else
        return filter2[0] <= value && value <= filter2[1];
    },
    lt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() < filter2.getTime();
      else
        return value < filter2;
    },
    lte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() <= filter2.getTime();
      else
        return value <= filter2;
    },
    gt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() > filter2.getTime();
      else
        return value > filter2;
    },
    gte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() >= filter2.getTime();
      else
        return value >= filter2;
    },
    dateIs(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter2.toDateString();
    },
    dateIsNot(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter2.toDateString();
    },
    dateBefore(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter2.getTime();
    },
    dateAfter(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter2.getTime();
    }
  },
  register(rule, fn) {
    this.filters[rule] = fn;
  }
};
const defaultOptions = {
  ripple: false,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close"
    }
  },
  filterMatchModeOptions: {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS
    ],
    numeric: [
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
    ],
    date: [
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER
    ]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  }
};
const PrimeVueSymbol = Symbol();
var PrimeVue = {
  install: (app, options) => {
    let configOptions = options ? { ...defaultOptions, ...options } : { ...defaultOptions };
    const PrimeVue2 = {
      config: vue_cjs_prod.reactive(configOptions)
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
function bindEvents(el) {
  el.addEventListener("mousedown", onMouseDown);
}
function unbindEvents(el) {
  el.removeEventListener("mousedown", onMouseDown);
}
function create(el) {
  let ink = document.createElement("span");
  ink.className = "p-ink";
  ink.setAttribute("role", "presentation");
  el.appendChild(ink);
  ink.addEventListener("animationend", onAnimationEnd);
}
function remove(el) {
  let ink = getInk(el);
  if (ink) {
    unbindEvents(el);
    ink.removeEventListener("animationend", onAnimationEnd);
    ink.remove();
  }
}
function onMouseDown(event2) {
  let target = event2.currentTarget;
  let ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === "none") {
    return;
  }
  DomHandler.removeClass(ink, "p-ink-active");
  if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
    let d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
    ink.style.height = d + "px";
    ink.style.width = d + "px";
  }
  let offset = DomHandler.getOffset(target);
  let x = event2.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
  let y = event2.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
  ink.style.top = y + "px";
  ink.style.left = x + "px";
  DomHandler.addClass(ink, "p-ink-active");
}
function onAnimationEnd(event2) {
  DomHandler.removeClass(event2.currentTarget, "p-ink-active");
}
function getInk(el) {
  for (let i = 0; i < el.children.length; i++) {
    if (typeof el.children[i].className === "string" && el.children[i].className.indexOf("p-ink") !== -1) {
      return el.children[i];
    }
  }
  return null;
}
const Ripple = {
  mounted(el, binding) {
    if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
      create(el);
      bindEvents(el);
    }
  },
  unmounted(el) {
    remove(el);
  }
};
var script$i = {
  name: "Button",
  props: {
    label: {
      type: String
    },
    icon: {
      type: String
    },
    iconPos: {
      type: String,
      default: "left"
    },
    badge: {
      type: String
    },
    badgeClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    }
  },
  computed: {
    buttonClass() {
      return {
        "p-button p-component": true,
        "p-button-icon-only": this.icon && !this.label,
        "p-button-vertical": (this.iconPos === "top" || this.iconPos === "bottom") && this.label,
        "p-disabled": this.$attrs.disabled || this.loading,
        "p-button-loading": this.loading,
        "p-button-loading-label-only": this.loading && !this.icon && this.label
      };
    },
    iconClass() {
      return [
        this.loading ? "p-button-loading-icon " + this.loadingIcon : this.icon,
        "p-button-icon",
        {
          "p-button-icon-left": this.iconPos === "left" && this.label,
          "p-button-icon-right": this.iconPos === "right" && this.label,
          "p-button-icon-top": this.iconPos === "top" && this.label,
          "p-button-icon-bottom": this.iconPos === "bottom" && this.label
        }
      ];
    },
    badgeStyleClass() {
      return [
        "p-badge p-component",
        this.badgeClass,
        {
          "p-badge-no-gutter": this.badge && String(this.badge).length === 1
        }
      ];
    },
    disabled() {
      return this.$attrs.disabled || this.loading;
    },
    defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs["aria-label"];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$h = ["aria-label", "disabled"];
const _hoisted_2$c = { class: "p-button-label" };
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
    class: vue_cjs_prod.normalizeClass($options.buttonClass),
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, [
    vue_cjs_prod.renderSlot(_ctx.$slots, "default", {}, () => [
      $props.loading && !$props.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
        key: 0,
        class: vue_cjs_prod.normalizeClass($options.iconClass)
      }, null, 2)) : vue_cjs_prod.createCommentVNode("", true),
      $props.icon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
        key: 1,
        class: vue_cjs_prod.normalizeClass($options.iconClass)
      }, null, 2)) : vue_cjs_prod.createCommentVNode("", true),
      vue_cjs_prod.createElementVNode("span", _hoisted_2$c, vue_cjs_prod.toDisplayString($props.label || "\xA0"), 1),
      $props.badge ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
        key: 2,
        class: vue_cjs_prod.normalizeClass($options.badgeStyleClass)
      }, vue_cjs_prod.toDisplayString($props.badge), 3)) : vue_cjs_prod.createCommentVNode("", true)
    ])
  ], 10, _hoisted_1$h)), [
    [_directive_ripple]
  ]);
}
script$i.render = render$i;
const plugins_primevue_ts_7rYYRZQLyx = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", script$i);
});
const _plugins = [
  preload,
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq,
  plugins_auth_ts_vT9JWWT9pN,
  plugins_i18n_ts_VfGcjrvSkj,
  plugins_primevue_ts_7rYYRZQLyx
];
const _sfc_main$d = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = vue_cjs_prod.defineAsyncComponent(() => import('./_nuxt/error-component.ff4b4abd.mjs'));
    const nuxtApp = useNuxtApp();
    vue_cjs_prod.provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorComponent), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__publicAssetsURL("images/logo-6.png");
const _sfc_main$c = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const storeCart = cartStore();
    const cart2 = vue_cjs_prod.computed(() => {
      return storeCart.cart;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative group" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "group-hover:bg-slate-200 rounded-md px-3 py-4 relative",
        to: vue_cjs_prod.unref(cart2).length === 0 ? `/${_ctx.$route.params.locale}` : `/${_ctx.$route.params.locale}/cart`,
        title: _ctx.$t("cart")
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="rounded-full bg-slate-300/75 w-4 h-4 flex justify-center items-center absolute text-xs top-2 right-1"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(cart2).length)}</span> ${serverRenderer.exports.ssrInterpolate(_ctx.$t("cart"))} <i class="pi pi-shopping-cart text-xl"${_scopeId}></i>`);
          } else {
            return [
              vue_cjs_prod.createVNode("span", { class: "rounded-full bg-slate-300/75 w-4 h-4 flex justify-center items-center absolute text-xs top-2 right-1" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(cart2).length), 1),
              vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(_ctx.$t("cart")) + " ", 1),
              vue_cjs_prod.createVNode("i", { class: "pi pi-shopping-cart text-xl" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-96 bg-gray-50 z-40 shadow-md rounded absolute right-0 top-8 hidden group-hover:block"><ul><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(cart2), (item) => {
        _push(`<li class="flex items-center p-2 text-xs relative border-b">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          class: "w-1/4",
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          title: item[`name_${_ctx.$route.params.locale}`]
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.images && item.images.length > 0) {
                _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${item.images[0]}`)}${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                item.images && item.images.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("img", {
                  key: 0,
                  src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                }, null, 8, ["src"])) : vue_cjs_prod.createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="w-2/4 px-2">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          title: item[`name_${_ctx.$route.params.locale}`]
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(item[`name_${_ctx.$route.params.locale}`])}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item[`name_${_ctx.$route.params.locale}`]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="w-1/4 text-center"><span>\u041A\u043E\u043B-\u0432\u043E: </span>${serverRenderer.exports.ssrInterpolate(item.count)}</div><a class="absolute right-1 top-1 opacity-25 hover:opacity-100" href="javascript:void"><i class="pi pi-times"></i></a></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/cart.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  props: {
    openSignIn: Function
  },
  setup(__props) {
    const typeAuth = vue_cjs_prod.ref(0);
    const error = vue_cjs_prod.ref({
      email: null,
      password: null,
      password_confirm: null
    });
    const form = vue_cjs_prod.ref({
      email: "",
      password: "",
      password_confirm: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "fixed top-0 left-0 w-full h-full bg-slate-800/50 flex items-center justify-center" }, _attrs))}><div class="rounded w-96 p-8 bg-white shadow-2xl"><div class="relative pt-6 flex"><a class="absolute -right-2 -top-2 text-gray-400 hover:text-gray-700" href=""><i class="pi pi-times"></i></a><div class="${serverRenderer.exports.ssrRenderClass([typeAuth.value === 0 ? "bg-gray-200" : "", "w-1/2 text-center rounded-t py-2 cursor-pointer hover:bg-gray-200"])}"><h3 class="uppercase">${serverRenderer.exports.ssrInterpolate(_ctx.$t("sign_in"))}</h3></div><div class="${serverRenderer.exports.ssrRenderClass([typeAuth.value === 1 ? "bg-gray-200" : "", "w-1/2 text-center rounded-t py-2 cursor-pointer hover:bg-gray-200"])}"><h3 class="uppercase">${serverRenderer.exports.ssrInterpolate(_ctx.$t("reg_in"))}</h3></div></div>`);
      if (typeAuth.value === 0) {
        _push(`<!--[--><div class="border-y py-4"><div class="py-2 flex items-center"><input class="w-full form-input px-4 py-3 rounded outline-0 border" type="email" placeholder="Email"${serverRenderer.exports.ssrRenderAttr("value", form.value.email)}> ${serverRenderer.exports.ssrInterpolate(error.value.email)}</div><div class="py-2 flex items-center"><input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password" placeholder="\u041F\u0430\u0440\u043E\u043B\u044C"${serverRenderer.exports.ssrRenderAttr("value", form.value.password)}> ${serverRenderer.exports.ssrInterpolate(error.value.password)}</div></div><div class="pt-4 flex justify-end"><button class="bg-green-700 hover:bg-green-900 mt-2 py-3 px-6 rounded text-white uppercase text-xs font-bold">${serverRenderer.exports.ssrInterpolate(_ctx.$t("come_in"))}</button></div><!--]-->`);
      } else {
        _push(`<!--[--><div class="border-y py-4"><div class="py-2 flex items-center"><input class="w-full form-input px-4 py-3 rounded outline-0 border" type="email" placeholder="Email"${serverRenderer.exports.ssrRenderAttr("value", form.value.email)}> ${serverRenderer.exports.ssrInterpolate(error.value.email)}</div><div class="py-2 flex items-center"><input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password" placeholder="\u041F\u0430\u0440\u043E\u043B\u044C"${serverRenderer.exports.ssrRenderAttr("value", form.value.password)}> ${serverRenderer.exports.ssrInterpolate(error.value.password)}</div><div class="py-2 flex items-center"><input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password" placeholder="\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C"${serverRenderer.exports.ssrRenderAttr("value", form.value.password_confirm)}> ${serverRenderer.exports.ssrInterpolate(error.value.password_confirm)}</div></div><div class="pt-4 flex justify-end"><button class="bg-green-700 hover:bg-green-900 mt-2 py-3 px-6 rounded text-white uppercase text-xs font-bold">${serverRenderer.exports.ssrInterpolate(_ctx.$t("come_in"))}</button></div><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/auth.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var OverlayEventBus = primebus();
var script$h = {
  name: "VirtualScroller",
  emits: ["update:numToleratedItems", "scroll", "scroll-index-change", "lazy-load"],
  props: {
    id: {
      type: String,
      default: null
    },
    style: null,
    class: null,
    items: {
      type: Array,
      default: null
    },
    itemSize: {
      type: [Number, Array],
      default: 0
    },
    scrollHeight: null,
    scrollWidth: null,
    orientation: {
      type: String,
      default: "vertical"
    },
    numToleratedItems: {
      type: Number,
      default: null
    },
    delay: {
      type: Number,
      default: 0
    },
    lazy: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loaderDisabled: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    showSpacer: {
      type: Boolean,
      default: true
    },
    showLoader: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      first: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      last: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      numItemsInViewport: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      lastScrollPos: this.isBoth() ? { top: 0, left: 0 } : 0,
      d_numToleratedItems: this.numToleratedItems,
      d_loading: this.loading,
      loaderArr: [],
      spacerStyle: {},
      contentStyle: {}
    };
  },
  element: null,
  content: null,
  lastScrollPos: null,
  scrollTimeout: null,
  mounted() {
    this.init();
    this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
  },
  watch: {
    numToleratedItems(newValue) {
      this.d_numToleratedItems = newValue;
    },
    loading(newValue) {
      this.d_loading = newValue;
    },
    items(newValue, oldValue) {
      if (!oldValue || oldValue.length !== (newValue || []).length) {
        this.init();
      }
    },
    orientation() {
      this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
    }
  },
  methods: {
    init() {
      this.setSize();
      this.calculateOptions();
      this.setSpacerSize();
    },
    isVertical() {
      return this.orientation === "vertical";
    },
    isHorizontal() {
      return this.orientation === "horizontal";
    },
    isBoth() {
      return this.orientation === "both";
    },
    scrollTo(options) {
      this.element && this.element.scrollTo(options);
    },
    scrollToIndex(index, behavior = "auto") {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const first = this.first;
      const { numToleratedItems } = this.calculateNumItems();
      const itemSize = this.itemSize;
      const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
      const calculateCoord = (_first, _size) => _first * _size;
      const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
      if (both) {
        const newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
        if (newFirst.rows !== first.rows || newFirst.cols !== first.cols) {
          scrollTo(calculateCoord(newFirst.cols, itemSize[1]), calculateCoord(newFirst.rows, itemSize[0]));
        }
      } else {
        const newFirst = calculateFirst(index, numToleratedItems);
        if (newFirst !== first) {
          horizontal ? scrollTo(calculateCoord(newFirst, itemSize), 0) : scrollTo(0, calculateCoord(newFirst, itemSize));
        }
      }
    },
    scrollInView(index, to, behavior = "auto") {
      if (to) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const { first, viewport } = this.getRenderedRange();
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        const isToStart = to === "to-start";
        const isToEnd = to === "to-end";
        if (isToStart) {
          if (both) {
            if (viewport.first.rows - first.rows > index[0]) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
            } else if (viewport.first.cols - first.cols > index[1]) {
              scrollTo((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.first - first > index) {
              const pos = (viewport.first - 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        } else if (isToEnd) {
          if (both) {
            if (viewport.last.rows - first.rows <= index[0] + 1) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
            } else if (viewport.last.cols - first.cols <= index[1] + 1) {
              scrollTo((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.last - first <= index + 1) {
              const pos = (viewport.first + 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        }
      } else {
        this.scrollToIndex(index, behavior);
      }
    },
    getRenderedRange() {
      const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      let firstInViewport = this.first;
      let lastInViewport = 0;
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const scrollTop = this.element.scrollTop;
        const scrollLeft = this.element.scrollLeft;
        if (both) {
          firstInViewport = { rows: calculateFirstInViewport(scrollTop, this.itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this.itemSize[1]) };
          lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
        } else {
          const scrollPos = horizontal ? scrollLeft : scrollTop;
          firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
          lastInViewport = firstInViewport + this.numItemsInViewport;
        }
      }
      return {
        first: this.first,
        last: this.last,
        viewport: {
          first: firstInViewport,
          last: lastInViewport
        }
      };
    },
    calculateNumItems() {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const itemSize = this.itemSize;
      const contentPos = this.getContentPosition();
      const contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
      const contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
      const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
      const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
      const numItemsInViewport = both ? { rows: calculateNumItemsInViewport(contentHeight, itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, itemSize[1]) } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize);
      const numToleratedItems = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
      return { numItemsInViewport, numToleratedItems };
    },
    calculateOptions() {
      const both = this.isBoth();
      const first = this.first;
      const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
      const calculateLast = (_first, _num, _numT, _isCols) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
      const last = both ? { rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true) } : calculateLast(first, numItemsInViewport, numToleratedItems);
      this.last = last;
      this.numItemsInViewport = numItemsInViewport;
      this.d_numToleratedItems = numToleratedItems;
      this.$emit("update:numToleratedItems", this.d_numToleratedItems);
      if (this.showLoader) {
        this.loaderArr = both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
      }
      if (this.lazy) {
        this.$emit("lazy-load", { first, last });
      }
    },
    getLast(last = 0, isCols) {
      if (this.items) {
        return Math.min(isCols ? (this.columns || this.items[0]).length : this.items.length, last);
      }
      return 0;
    },
    getContentPosition() {
      if (this.content) {
        const style = getComputedStyle(this.content);
        const left = parseInt(style.paddingLeft, 10) + Math.max(parseInt(style.left, 10), 0);
        const right = parseInt(style.paddingRight, 10) + Math.max(parseInt(style.right, 10), 0);
        const top = parseInt(style.paddingTop, 10) + Math.max(parseInt(style.top, 10), 0);
        const bottom = parseInt(style.paddingBottom, 10) + Math.max(parseInt(style.bottom, 10), 0);
        return { left, right, top, bottom, x: left + right, y: top + bottom };
      }
      return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    },
    setSize() {
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const parentElement = this.element.parentElement;
        const width = this.scrollWidth || `${this.element.offsetWidth || parentElement.offsetWidth}px`;
        const height = this.scrollHeight || `${this.element.offsetHeight || parentElement.offsetHeight}px`;
        const setProp = (_name, _value) => this.element.style[_name] = _value;
        if (both || horizontal) {
          setProp("height", height);
          setProp("width", width);
        } else {
          setProp("height", height);
        }
      }
    },
    setSpacerSize() {
      const items2 = this.items;
      if (items2) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const contentPos = this.getContentPosition();
        const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + "px" } };
        if (both) {
          setProp("height", items2, this.itemSize[0], contentPos.y);
          setProp("width", this.columns || items2[1], this.itemSize[1], contentPos.x);
        } else {
          horizontal ? setProp("width", this.columns || items2, this.itemSize, contentPos.x) : setProp("height", items2, this.itemSize, contentPos.y);
        }
      }
    },
    setContentPosition(pos) {
      if (this.content) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const first = pos ? pos.first : this.first;
        const calculateTranslateVal = (_first, _size) => _first * _size;
        const setTransform = (_x = 0, _y = 0) => {
          this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } };
        };
        if (both) {
          setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
        } else {
          const translateVal = calculateTranslateVal(first, this.itemSize);
          horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
        }
      }
    },
    onScrollPositionChange(event2) {
      const target = event2.target;
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const contentPos = this.getContentPosition();
      const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
      const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
      };
      const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        if (_currentIndex <= _numT)
          return 0;
        else
          return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
      };
      const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols) => {
        let lastValue = _first + _num + 2 * _numT;
        if (_currentIndex >= _numT) {
          lastValue += _numT + 1;
        }
        return this.getLast(lastValue, _isCols);
      };
      const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
      const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
      let newFirst = both ? { rows: 0, cols: 0 } : 0;
      let newLast = this.last;
      let isRangeChanged = false;
      let newScrollPos = this.lastScrollPos;
      if (both) {
        const isScrollDown = this.lastScrollPos.top <= scrollTop;
        const isScrollRight = this.lastScrollPos.left <= scrollLeft;
        const currentIndex = { rows: calculateCurrentIndex(scrollTop, this.itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this.itemSize[1]) };
        const triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
        };
        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || (newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols);
        newScrollPos = { top: scrollTop, left: scrollLeft };
      } else {
        const scrollPos = horizontal ? scrollLeft : scrollTop;
        const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
        const currentIndex = calculateCurrentIndex(scrollPos, this.itemSize);
        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
        isRangeChanged = newFirst !== this.first || newLast !== this.last;
        newScrollPos = scrollPos;
      }
      return {
        first: newFirst,
        last: newLast,
        isRangeChanged,
        scrollPos: newScrollPos
      };
    },
    onScrollChange(event2) {
      const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event2);
      if (isRangeChanged) {
        const newState = { first, last };
        this.setContentPosition(newState);
        this.first = first;
        this.last = last;
        this.lastScrollPos = scrollPos;
        this.$emit("scroll-index-change", newState);
        if (this.lazy) {
          this.$emit("lazy-load", newState);
        }
      }
    },
    onScroll(event2) {
      this.$emit("scroll", event2);
      if (this.delay) {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        if (!this.d_loading && this.showLoader) {
          const { isRangeChanged: changed } = this.onScrollPositionChange(event2);
          changed && (this.d_loading = true);
        }
        this.scrollTimeout = setTimeout(() => {
          this.onScrollChange(event2);
          if (this.d_loading && this.showLoader && !this.lazy) {
            this.d_loading = false;
          }
        }, this.delay);
      } else {
        this.onScrollChange(event2);
      }
    },
    getOptions(renderedIndex) {
      const count = (this.items || []).length;
      const index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0
      };
    },
    getLoaderOptions(index, extOptions) {
      let count = this.loaderArr.length;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
        ...extOptions
      };
    },
    elementRef(el) {
      this.element = el;
    },
    contentRef(el) {
      this.content = el;
    }
  },
  computed: {
    containerClass() {
      return ["p-virtualscroller", {
        "p-both-scroll": this.isBoth(),
        "p-horizontal-scroll": this.isHorizontal()
      }, this.class];
    },
    contentClass() {
      return ["p-virtualscroller-content", {
        "p-virtualscroller-loading": this.d_loading
      }];
    },
    loaderClass() {
      return ["p-virtualscroller-loader", {
        "p-component-overlay": !this.$slots.loader
      }];
    },
    loadedItems() {
      const items2 = this.items;
      if (items2 && !this.d_loading) {
        if (this.isBoth()) {
          return items2.slice(this.first.rows, this.last.rows).map((item) => this.columns ? item : item.slice(this.first.cols, this.last.cols));
        } else if (this.isHorizontal() && this.columns)
          return items2;
        else
          return items2.slice(this.first, this.last);
      }
      return [];
    },
    loadedRows() {
      return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
    },
    loadedColumns() {
      if (this.columns) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        if (both || horizontal) {
          return this.d_loading && this.loaderDisabled ? both ? this.loaderArr[0] : this.loaderArr : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
        }
      }
      return this.columns;
    }
  }
};
const _hoisted_1$g = ["tabindex"];
const _hoisted_2$b = {
  key: 1,
  class: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
};
function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return !$props.disabled ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    key: 0,
    ref: $options.elementRef,
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    tabindex: $props.tabindex,
    style: vue_cjs_prod.normalizeStyle($props.style),
    onScroll: _cache[0] || (_cache[0] = (...args) => $options.onScroll && $options.onScroll(...args))
  }, [
    vue_cjs_prod.renderSlot(_ctx.$slots, "content", {
      styleClass: $options.contentClass,
      items: $options.loadedItems,
      getItemOptions: $options.getOptions,
      loading: $data.d_loading,
      getLoaderOptions: $options.getLoaderOptions,
      itemSize: $props.itemSize,
      rows: $options.loadedRows,
      columns: $options.loadedColumns,
      contentRef: $options.contentRef,
      spacerStyle: $data.spacerStyle,
      contentStyle: $data.contentStyle,
      vertical: $options.isVertical(),
      horizontal: $options.isHorizontal(),
      both: $options.isBoth()
    }, () => [
      vue_cjs_prod.createElementVNode("div", {
        ref: $options.contentRef,
        class: vue_cjs_prod.normalizeClass($options.contentClass),
        style: vue_cjs_prod.normalizeStyle($data.contentStyle)
      }, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.loadedItems, (item, index) => {
          return vue_cjs_prod.renderSlot(_ctx.$slots, "item", {
            key: index,
            item,
            options: $options.getOptions(index)
          });
        }), 128))
      ], 6)
    ]),
    $props.showSpacer ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
      key: 0,
      class: "p-virtualscroller-spacer",
      style: vue_cjs_prod.normalizeStyle($data.spacerStyle)
    }, null, 4)) : vue_cjs_prod.createCommentVNode("", true),
    !$props.loaderDisabled && $props.showLoader && $data.d_loading ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
      key: 1,
      class: vue_cjs_prod.normalizeClass($options.loaderClass)
    }, [
      _ctx.$slots && _ctx.$slots.loader ? (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 0 }, vue_cjs_prod.renderList($data.loaderArr, (_, index) => {
        return vue_cjs_prod.renderSlot(_ctx.$slots, "loader", {
          key: index,
          options: $options.getLoaderOptions(index, $options.isBoth() && { numCols: _ctx.d_numItemsInViewport.cols })
        });
      }), 128)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("i", _hoisted_2$b))
    ], 2)) : vue_cjs_prod.createCommentVNode("", true)
  ], 46, _hoisted_1$g)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 1 }, [
    vue_cjs_prod.renderSlot(_ctx.$slots, "default"),
    vue_cjs_prod.renderSlot(_ctx.$slots, "content", {
      items: $props.items,
      rows: $props.items,
      columns: $options.loadedColumns
    })
  ], 64));
}
function styleInject$8(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$8 = "\n.p-virtualscroller {\n    position: relative;\n    overflow: auto;\n    contain: strict;\n    -webkit-transform: translateZ(0);\n            transform: translateZ(0);\n    will-change: scroll-position;\n    outline: 0 none;\n}\n.p-virtualscroller-content {\n    position: absolute;\n    top: 0;\n    left: 0;\n    contain: content;\n    min-height: 100%;\n    min-width: 100%;\n    will-change: transform;\n}\n.p-virtualscroller-spacer {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 1px;\n    width: 1px;\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    pointer-events: none;\n}\n.p-virtualscroller .p-virtualscroller-loader {\n    position: sticky;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.p-virtualscroller-loader.p-component-overlay {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n";
styleInject$8(css_248z$8);
script$h.render = render$h;
var script$g = {
  name: "Portal",
  props: {
    appendTo: {
      type: String,
      default: "body"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mounted: false
    };
  },
  mounted() {
    this.mounted = DomHandler.isClient();
  },
  computed: {
    inline() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.inline ? vue_cjs_prod.renderSlot(_ctx.$slots, "default", { key: 0 }) : $data.mounted ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Teleport, {
    key: 1,
    to: $props.appendTo
  }, [
    vue_cjs_prod.renderSlot(_ctx.$slots, "default")
  ], 8, ["to"])) : vue_cjs_prod.createCommentVNode("", true);
}
script$g.render = render$g;
var script$f = {
  name: "Dropdown",
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter"],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "200px"
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    editable: Boolean,
    placeholder: String,
    disabled: Boolean,
    dataKey: null,
    showClear: Boolean,
    inputId: String,
    inputStyle: null,
    inputClass: null,
    inputProps: null,
    panelStyle: null,
    panelClass: null,
    panelProps: null,
    filterInputProps: null,
    clearIconProps: null,
    appendTo: {
      type: String,
      default: "body"
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: true
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    "aria-label": {
      type: String,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  searchTimeout: null,
  searchValue: null,
  isModelValueChanged: false,
  selectOnFocus: false,
  focusOnHover: false,
  data() {
    return {
      id: UniqueComponentId(),
      focused: false,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: false
    };
  },
  watch: {
    modelValue() {
      this.isModelValueChanged = true;
    },
    options() {
      this.autoUpdateModel();
    }
  },
  mounted() {
    this.id = this.$attrs.id || this.id;
    this.autoUpdateModel();
  },
  updated() {
    if (this.overlayVisible && this.isModelValueChanged) {
      this.scrollInView(this.findSelectedOptionIndex());
    }
    this.isModelValueChanged = false;
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset(index) {
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
    },
    show(isFocus) {
      this.$emit("before-show");
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && this.$refs.focusInput.focus();
    },
    hide(isFocus) {
      const _hide = () => {
        this.$emit("before-hide");
        this.overlayVisible = false;
        this.focusedOptionIndex = -1;
        this.searchValue = "";
        isFocus && this.$refs.focusInput.focus();
      };
      setTimeout(() => {
        _hide();
      }, 0);
    },
    onFocus(event2) {
      this.focused = true;
      this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event2);
    },
    onBlur(event2) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.$emit("blur", event2);
    },
    onKeyDown(event2) {
      switch (event2.code) {
        case "ArrowDown":
          this.onArrowDownKey(event2);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event2, this.editable);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event2, this.editable);
          break;
        case "Home":
          this.onHomeKey(event2, this.editable);
          break;
        case "End":
          this.onEndKey(event2, this.editable);
          break;
        case "PageDown":
          this.onPageDownKey(event2);
          break;
        case "PageUp":
          this.onPageUpKey(event2);
          break;
        case "Space":
          this.onSpaceKey(event2, this.editable);
          break;
        case "Enter":
          this.onEnterKey(event2);
          break;
        case "Escape":
          this.onEscapeKey(event2);
          break;
        case "Tab":
          this.onTabKey(event2);
          break;
        case "Backspace":
          this.onBackspaceKey(event2, this.editable);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          if (ObjectUtils.isPrintableCharacter(event2.key)) {
            !this.overlayVisible && this.show();
            !this.editable && this.searchOptions(event2, event2.key);
          }
          break;
      }
    },
    onEditableInput(event2) {
      const value = event2.target.value;
      this.searchValue = "";
      const matched = this.searchOptions(event2, value);
      !matched && (this.focusedOptionIndex = -1);
      this.$emit("update:modelValue", value);
    },
    onContainerClick(event2) {
      if (this.disabled || this.loading) {
        return;
      }
      if (DomHandler.hasClass(event2.target, "p-dropdown-clear-icon") || event2.target.tagName === "INPUT") {
        return;
      } else if (!this.overlay || !this.overlay.contains(event2.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
    },
    onClearClick(event2) {
      this.updateModel(event2, null);
    },
    onFirstHiddenFocus(event2) {
      const relatedTarget = event2.relatedTarget;
      if (relatedTarget === this.$refs.focusInput) {
        const firstFocusableEl = DomHandler.getFirstFocusableElement(this.overlay, ":not(.p-hidden-focusable)");
        firstFocusableEl && firstFocusableEl.focus();
      } else {
        this.$refs.focusInput.focus();
      }
    },
    onLastHiddenFocus() {
      this.$refs.firstHiddenFocusableElementOnOverlay.focus();
    },
    onOptionSelect(event2, option) {
      const value = this.getOptionValue(option);
      this.updateModel(event2, value);
      this.hide(true);
    },
    onOptionMouseMove(event2, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event2, index);
      }
    },
    onFilterChange(event2) {
      const value = event2.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit("filter", { originalEvent: event2, value });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown(event2) {
      switch (event2.code) {
        case "ArrowDown":
          this.onArrowDownKey(event2);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event2, true);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event2, true);
          break;
        case "Home":
          this.onHomeKey(event2, true);
          break;
        case "End":
          this.onEndKey(event2, true);
          break;
        case "Enter":
          this.onEnterKey(event2);
          break;
        case "Escape":
          this.onEscapeKey(event2);
          break;
        case "Tab":
          this.onTabKey(event2, true);
          break;
      }
    },
    onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick(event2) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event2,
        target: this.$el
      });
    },
    onOverlayKeyDown(event2) {
      switch (event2.code) {
        case "Escape":
          this.onEscapeKey(event2);
          break;
      }
    },
    onArrowDownKey(event2) {
      const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event2, optionIndex);
      !this.overlayVisible && this.show();
      event2.preventDefault();
    },
    onArrowUpKey(event2, pressedInInputText = false) {
      if (event2.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event2.preventDefault();
      } else {
        const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event2, optionIndex);
        !this.overlayVisible && this.show();
        event2.preventDefault();
      }
    },
    onArrowLeftKey(event2, pressedInInputText = false) {
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey(event2, pressedInInputText = false) {
      if (pressedInInputText) {
        event2.currentTarget.setSelectionRange(0, 0);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event2, this.findFirstOptionIndex());
        !this.overlayVisible && this.show();
      }
      event2.preventDefault();
    },
    onEndKey(event2, pressedInInputText = false) {
      if (pressedInInputText) {
        const target = event2.currentTarget;
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event2, this.findLastOptionIndex());
        !this.overlayVisible && this.show();
      }
      event2.preventDefault();
    },
    onPageUpKey(event2) {
      this.scrollInView(0);
      event2.preventDefault();
    },
    onPageDownKey(event2) {
      this.scrollInView(this.visibleOptions.length - 1);
      event2.preventDefault();
    },
    onEnterKey(event2) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event2);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event2.preventDefault();
    },
    onSpaceKey(event2, pressedInInputText = false) {
      !pressedInInputText && this.onEnterKey(event2);
    },
    onEscapeKey(event2) {
      this.overlayVisible && this.hide(true);
      event2.preventDefault();
    },
    onTabKey(event2, pressedInInputText = false) {
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          this.$refs.firstHiddenFocusableElementOnOverlay.focus();
          event2.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onBackspaceKey(event2, pressedInInputText = false) {
      if (pressedInInputText) {
        !this.overlayVisible && this.show();
      }
    },
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.scrollInView();
    },
    onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event2) => {
          if (this.overlayVisible && this.overlay && !this.$el.contains(event2.target) && !this.overlay.contains(event2.target)) {
            this.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ":not(.p-hidden-focusable)").length > 0;
    },
    isOptionMatched(option) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    },
    isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected(option) {
      return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex() {
      return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    },
    findLastOptionIndex() {
      return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    },
    findNextOptionIndex(index) {
      const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex(index) {
      const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex() {
      return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    },
    findFirstFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions(event2, char) {
      this.searchValue = (this.searchValue || "") + char;
      let optionIndex = -1;
      let matched = false;
      if (this.focusedOptionIndex !== -1) {
        optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option));
        optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
      } else {
        optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
      }
      if (optionIndex !== -1) {
        matched = true;
      }
      if (optionIndex === -1 && this.focusedOptionIndex === -1) {
        optionIndex = this.findFirstFocusedOptionIndex();
      }
      if (optionIndex !== -1) {
        this.changeFocusedOptionIndex(event2, optionIndex);
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchValue = "";
        this.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedOptionIndex(event2, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.updateModel(event2, this.getOptionValue(this.visibleOptions[index]));
        }
      }
    },
    scrollInView(index = -1) {
      const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
      const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({ block: "nearest", inline: "start" });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
        }, 0);
      }
    },
    autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        const value = this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);
        this.updateModel(null, value);
      }
    },
    updateModel(event2, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", { originalEvent: event2, value });
    },
    flatOptions(options) {
      return (options || []).reduce((result, option, index) => {
        result.push({ optionGroup: option, group: true, index });
        const optionGroupChildren = this.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
        return result;
      }, []);
    },
    overlayRef(el) {
      this.overlay = el;
    },
    listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    containerClass() {
      return ["p-dropdown p-component p-inputwrapper", {
        "p-disabled": this.disabled,
        "p-dropdown-clearable": this.showClear && !this.disabled,
        "p-focus": this.focused,
        "p-inputwrapper-filled": this.modelValue,
        "p-inputwrapper-focus": this.focused || this.overlayVisible,
        "p-overlay-open": this.overlayVisible
      }];
    },
    inputStyleClass() {
      return ["p-dropdown-label p-inputtext", this.inputClass, {
        "p-placeholder": !this.editable && this.label === this.placeholder,
        "p-dropdown-label-empty": !this.editable && !this.$slots["value"] && (this.label === "p-emptylabel" || this.label.length === 0)
      }];
    },
    panelStyleClass() {
      return ["p-dropdown-panel p-component", this.panelClass, {
        "p-input-filled": this.$primevue.config.inputStyle === "filled",
        "p-ripple-disabled": this.$primevue.config.ripple === false
      }];
    },
    dropdownIconClass() {
      return ["p-dropdown-trigger-icon", this.loading ? this.loadingIcon : "pi pi-chevron-down"];
    },
    visibleOptions() {
      const options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      return this.filterValue ? FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale) : options;
    },
    hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    label() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || "p-emptylabel";
    },
    editableInputValue() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || "";
    },
    equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
    },
    focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
    },
    ariaSetSize() {
      return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    "ripple": Ripple
  },
  components: {
    "VirtualScroller": script$h,
    "Portal": script$g
  }
};
const _hoisted_1$f = ["id"];
const _hoisted_2$a = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_3$9 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
const _hoisted_4$6 = { class: "p-dropdown-trigger" };
const _hoisted_5$5 = {
  key: 0,
  class: "p-dropdown-header"
};
const _hoisted_6$5 = { class: "p-dropdown-filter-container" };
const _hoisted_7$3 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
const _hoisted_8$3 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-dropdown-filter-icon pi pi-search" }, null, -1);
const _hoisted_9$3 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_10$3 = ["id"];
const _hoisted_11$3 = ["id"];
const _hoisted_12$2 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_13$2 = {
  key: 0,
  class: "p-dropdown-empty-message",
  role: "option"
};
const _hoisted_14$1 = {
  key: 1,
  class: "p-dropdown-empty-message",
  role: "option"
};
const _hoisted_15$1 = {
  key: 0,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_16$1 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VirtualScroller = vue_cjs_prod.resolveComponent("VirtualScroller");
  const _component_Portal = vue_cjs_prod.resolveComponent("Portal");
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    ref: "container",
    id: $data.id,
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    onClick: _cache[16] || (_cache[16] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
  }, [
    $props.editable ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("input", vue_cjs_prod.mergeProps({
      key: 0,
      ref: "focusInput",
      id: $props.inputId,
      type: "text",
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      value: $options.editableInputValue,
      placeholder: $props.placeholder,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      disabled: $props.disabled,
      autocomplete: "off",
      role: "combobox",
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $data.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
      onInput: _cache[3] || (_cache[3] = (...args) => $options.onEditableInput && $options.onEditableInput(...args))
    }, $props.inputProps), null, 16, _hoisted_2$a)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", vue_cjs_prod.mergeProps({
      key: 1,
      ref: "focusInput",
      id: $props.inputId,
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      role: "combobox",
      "aria-label": _ctx.ariaLabel || ($options.label === "p-emptylabel" ? void 0 : $options.label),
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $data.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      "aria-disabled": $props.disabled,
      onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[5] || (_cache[5] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[6] || (_cache[6] = (...args) => $options.onKeyDown && $options.onKeyDown(...args))
    }, $props.inputProps), [
      vue_cjs_prod.renderSlot(_ctx.$slots, "value", {
        value: $props.modelValue,
        placeholder: $props.placeholder
      }, () => [
        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.label === "p-emptylabel" ? "\xA0" : $options.label || "empty"), 1)
      ])
    ], 16, _hoisted_3$9)),
    $props.showClear && $props.modelValue != null ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("i", vue_cjs_prod.mergeProps({
      key: 2,
      class: "p-dropdown-clear-icon pi pi-times",
      onClick: _cache[7] || (_cache[7] = (...args) => $options.onClearClick && $options.onClearClick(...args))
    }, $props.clearIconProps), null, 16)) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createElementVNode("div", _hoisted_4$6, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "indicator", {}, () => [
        vue_cjs_prod.createElementVNode("span", {
          class: vue_cjs_prod.normalizeClass($options.dropdownIconClass),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ]),
    vue_cjs_prod.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: vue_cjs_prod.withCtx(() => [
        vue_cjs_prod.createVNode(vue_cjs_prod.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue_cjs_prod.withCtx(() => [
            $data.overlayVisible ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", vue_cjs_prod.mergeProps({
              key: 0,
              ref: $options.overlayRef,
              style: $props.panelStyle,
              class: $options.panelStyleClass,
              onClick: _cache[14] || (_cache[14] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[15] || (_cache[15] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args))
            }, $props.panelProps), [
              vue_cjs_prod.createElementVNode("span", {
                ref: "firstHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[8] || (_cache[8] = (...args) => $options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args))
              }, null, 544),
              vue_cjs_prod.renderSlot(_ctx.$slots, "header", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              $props.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_5$5, [
                vue_cjs_prod.createElementVNode("div", _hoisted_6$5, [
                  vue_cjs_prod.createElementVNode("input", vue_cjs_prod.mergeProps({
                    type: "text",
                    ref: "filterInput",
                    value: $data.filterValue,
                    onVnodeUpdated: _cache[9] || (_cache[9] = (...args) => $options.onFilterUpdated && $options.onFilterUpdated(...args)),
                    class: "p-dropdown-filter p-inputtext p-component",
                    placeholder: $props.filterPlaceholder,
                    role: "searchbox",
                    autocomplete: "off",
                    "aria-owns": $data.id + "_list",
                    "aria-activedescendant": $options.focusedOptionId,
                    onKeydown: _cache[10] || (_cache[10] = (...args) => $options.onFilterKeyDown && $options.onFilterKeyDown(...args)),
                    onBlur: _cache[11] || (_cache[11] = (...args) => $options.onFilterBlur && $options.onFilterBlur(...args)),
                    onInput: _cache[12] || (_cache[12] = (...args) => $options.onFilterChange && $options.onFilterChange(...args))
                  }, $props.filterInputProps), null, 16, _hoisted_7$3),
                  _hoisted_8$3
                ]),
                vue_cjs_prod.createElementVNode("span", _hoisted_9$3, vue_cjs_prod.toDisplayString($options.filterResultMessageText), 1)
              ])) : vue_cjs_prod.createCommentVNode("", true),
              vue_cjs_prod.createElementVNode("div", {
                class: "p-dropdown-items-wrapper",
                style: vue_cjs_prod.normalizeStyle({ "max-height": $options.virtualScrollerDisabled ? $props.scrollHeight : "" })
              }, [
                vue_cjs_prod.createVNode(_component_VirtualScroller, vue_cjs_prod.mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                  items: $options.visibleOptions,
                  style: { "height": $props.scrollHeight },
                  tabindex: -1,
                  disabled: $options.virtualScrollerDisabled
                }), vue_cjs_prod.createSlots({
                  content: vue_cjs_prod.withCtx(({ styleClass, contentRef, items: items2, getItemOptions, contentStyle, itemSize }) => [
                    vue_cjs_prod.createElementVNode("ul", {
                      ref: (el) => $options.listRef(el, contentRef),
                      id: $data.id + "_list",
                      class: vue_cjs_prod.normalizeClass(["p-dropdown-items", styleClass]),
                      style: vue_cjs_prod.normalizeStyle(contentStyle),
                      role: "listbox"
                    }, [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(items2, (option, i) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
                          key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                        }, [
                          $options.isOptionGroup(option) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", {
                            key: 0,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: vue_cjs_prod.normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: "p-dropdown-item-group",
                            role: "option"
                          }, [
                            vue_cjs_prod.renderSlot(_ctx.$slots, "optiongroup", {
                              option: option.optionGroup,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                            ])
                          ], 12, _hoisted_11$3)) : vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", {
                            key: 1,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: vue_cjs_prod.normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: vue_cjs_prod.normalizeClass(["p-dropdown-item", { "p-highlight": $options.isSelected(option), "p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), "p-disabled": $options.isOptionDisabled(option) }]),
                            role: "option",
                            "aria-label": $options.getOptionLabel(option),
                            "aria-selected": $options.isSelected(option),
                            "aria-disabled": $options.isOptionDisabled(option),
                            "aria-setsize": $options.ariaSetSize,
                            "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                            onClick: ($event) => $options.onOptionSelect($event, option),
                            onMousemove: ($event) => $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))
                          }, [
                            vue_cjs_prod.renderSlot(_ctx.$slots, "option", {
                              option,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.getOptionLabel(option)), 1)
                            ])
                          ], 46, _hoisted_12$2)), [
                            [_directive_ripple]
                          ])
                        ], 64);
                      }), 128)),
                      $data.filterValue && (!items2 || items2 && items2.length === 0) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", _hoisted_13$2, [
                        vue_cjs_prod.renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.emptyFilterMessageText), 1)
                        ])
                      ])) : !$props.options || $props.options && $props.options.length === 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", _hoisted_14$1, [
                        vue_cjs_prod.renderSlot(_ctx.$slots, "empty", {}, () => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.emptyMessageText), 1)
                        ])
                      ])) : vue_cjs_prod.createCommentVNode("", true)
                    ], 14, _hoisted_10$3),
                    !$props.options || $props.options && $props.options.length === 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_15$1, vue_cjs_prod.toDisplayString($options.emptyMessageText), 1)) : vue_cjs_prod.createCommentVNode("", true),
                    vue_cjs_prod.createElementVNode("span", _hoisted_16$1, vue_cjs_prod.toDisplayString($options.selectedMessageText), 1)
                  ]),
                  _: 2
                }, [
                  _ctx.$slots.loader ? {
                    name: "loader",
                    fn: vue_cjs_prod.withCtx(({ options }) => [
                      vue_cjs_prod.renderSlot(_ctx.$slots, "loader", { options })
                    ])
                  } : void 0
                ]), 1040, ["items", "style", "disabled"])
              ], 4),
              vue_cjs_prod.renderSlot(_ctx.$slots, "footer", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              vue_cjs_prod.createElementVNode("span", {
                ref: "lastHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[13] || (_cache[13] = (...args) => $options.onLastHiddenFocus && $options.onLastHiddenFocus(...args))
              }, null, 544)
            ], 16)) : vue_cjs_prod.createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 10, _hoisted_1$f);
}
function styleInject$7(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$7 = "\n.p-dropdown {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.p-dropdown-clear-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-dropdown-trigger {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-dropdown-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n.p-dropdown-label-empty {\n    overflow: hidden;\n    opacity: 0;\n}\ninput.p-dropdown-label  {\n    cursor: default;\n}\n.p-dropdown .p-dropdown-panel {\n    min-width: 100%;\n}\n.p-dropdown-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-dropdown-items-wrapper {\n    overflow: auto;\n}\n.p-dropdown-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-dropdown-item-group {\n    cursor: auto;\n}\n.p-dropdown-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-dropdown-filter {\n    width: 100%;\n}\n.p-dropdown-filter-container {\n    position: relative;\n}\n.p-dropdown-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-fluid .p-dropdown {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-dropdown .p-dropdown-label {\n    width: 1%;\n}\n";
styleInject$7(css_248z$7);
script$f.render = render$f;
var script$e = {
  name: "InputText",
  emits: ["update:modelValue"],
  props: {
    modelValue: null
  },
  methods: {
    onInput(event2) {
      this.$emit("update:modelValue", event2.target.value);
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
const _hoisted_1$e = ["value"];
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("input", {
    class: vue_cjs_prod.normalizeClass(["p-inputtext p-component", { "p-filled": $options.filled }]),
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 42, _hoisted_1$e);
}
script$e.render = render$e;
var script$d = {
  name: "InputNumber",
  emits: ["update:modelValue", "input", "focus", "blur"],
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    format: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    buttonLayout: {
      type: String,
      default: "stacked"
    },
    incrementButtonClass: {
      type: String,
      default: null
    },
    decrementButtonClass: {
      type: String,
      default: null
    },
    incrementButtonIcon: {
      type: String,
      default: "pi pi-angle-up"
    },
    decrementButtonIcon: {
      type: String,
      default: "pi pi-angle-down"
    },
    locale: {
      type: String,
      default: void 0
    },
    localeMatcher: {
      type: String,
      default: void 0
    },
    mode: {
      type: String,
      default: "decimal"
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: void 0
    },
    currencyDisplay: {
      type: String,
      default: void 0
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    minFractionDigits: {
      type: Number,
      default: void 0
    },
    maxFractionDigits: {
      type: Number,
      default: void 0
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    allowEmpty: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    inputId: null,
    inputClass: null,
    inputStyle: null,
    inputProps: null,
    incrementButtonProps: null,
    decrementButtonProps: null,
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  numberFormat: null,
  _numeral: null,
  _decimal: null,
  _group: null,
  _minusSign: null,
  _currency: null,
  _suffix: null,
  _prefix: null,
  _index: null,
  groupChar: "",
  isSpecialChar: null,
  prefixChar: null,
  suffixChar: null,
  timer: null,
  data() {
    return {
      d_modelValue: this.modelValue,
      focused: false
    };
  },
  watch: {
    modelValue(newValue) {
      this.d_modelValue = newValue;
    },
    locale(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    localeMatcher(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    mode(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    currency(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    currencyDisplay(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    useGrouping(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    minFractionDigits(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    maxFractionDigits(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    suffix(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    },
    prefix(newValue, oldValue) {
      this.updateConstructParser(newValue, oldValue);
    }
  },
  created() {
    this.constructParser();
  },
  methods: {
    getOptions() {
      return {
        localeMatcher: this.localeMatcher,
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        useGrouping: this.useGrouping,
        minimumFractionDigits: this.minFractionDigits,
        maximumFractionDigits: this.maxFractionDigits
      };
    },
    constructParser() {
      this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
      const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
      const index = new Map(numerals.map((d, i) => [d, i]));
      this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
      this._group = this.getGroupingExpression();
      this._minusSign = this.getMinusSignExpression();
      this._currency = this.getCurrencyExpression();
      this._decimal = this.getDecimalExpression();
      this._suffix = this.getSuffixExpression();
      this._prefix = this.getPrefixExpression();
      this._index = (d) => index.get(d);
    },
    updateConstructParser(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.constructParser();
      }
    },
    escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    getDecimalExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { ...this.getOptions(), useGrouping: false });
      return new RegExp(`[${formatter.format(1.1).replace(this._currency, "").trim().replace(this._numeral, "")}]`, "g");
    },
    getGroupingExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
      this.groupChar = formatter.format(1e6).trim().replace(this._numeral, "").charAt(0);
      return new RegExp(`[${this.groupChar}]`, "g");
    },
    getMinusSignExpression() {
      const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
      return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, "")}]`, "g");
    },
    getCurrencyExpression() {
      if (this.currency) {
        const formatter = new Intl.NumberFormat(this.locale, {
          style: "currency",
          currency: this.currency,
          currencyDisplay: this.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        return new RegExp(`[${formatter.format(1).replace(/\s/g, "").replace(this._numeral, "").replace(this._group, "")}]`, "g");
      }
      return new RegExp(`[]`, "g");
    },
    getPrefixExpression() {
      if (this.prefix) {
        this.prefixChar = this.prefix;
      } else {
        const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
        this.prefixChar = formatter.format(1).split("1")[0];
      }
      return new RegExp(`${this.escapeRegExp(this.prefixChar || "")}`, "g");
    },
    getSuffixExpression() {
      if (this.suffix) {
        this.suffixChar = this.suffix;
      } else {
        const formatter = new Intl.NumberFormat(this.locale, {
          style: this.mode,
          currency: this.currency,
          currencyDisplay: this.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        this.suffixChar = formatter.format(1).split("1")[1];
      }
      return new RegExp(`${this.escapeRegExp(this.suffixChar || "")}`, "g");
    },
    formatValue(value) {
      if (value != null) {
        if (value === "-") {
          return value;
        }
        if (this.format) {
          let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
          let formattedValue = formatter.format(value);
          if (this.prefix) {
            formattedValue = this.prefix + formattedValue;
          }
          if (this.suffix) {
            formattedValue = formattedValue + this.suffix;
          }
          return formattedValue;
        }
        return value.toString();
      }
      return "";
    },
    parseValue(text) {
      let filteredText = text.replace(this._suffix, "").replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "").replace(this._group, "").replace(this._minusSign, "-").replace(this._decimal, ".").replace(this._numeral, this._index);
      if (filteredText) {
        if (filteredText === "-")
          return filteredText;
        let parsedValue = +filteredText;
        return isNaN(parsedValue) ? null : parsedValue;
      }
      return null;
    },
    repeat(event2, interval, dir) {
      if (this.readonly) {
        return;
      }
      let i = interval || 500;
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.repeat(event2, 40, dir);
      }, i);
      this.spin(event2, dir);
    },
    spin(event2, dir) {
      if (this.$refs.input) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.$refs.input.$el.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        this.updateInput(newValue, null, "spin");
        this.updateModel(event2, newValue);
        this.handleOnInput(event2, currentValue, newValue);
      }
    },
    onUpButtonMouseDown(event2) {
      if (!this.disabled) {
        this.$refs.input.$el.focus();
        this.repeat(event2, null, 1);
        event2.preventDefault();
      }
    },
    onUpButtonMouseUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonMouseLeave() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonKeyUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onUpButtonKeyDown(event2) {
      if (event2.keyCode === 32 || event2.keyCode === 13) {
        this.repeat(event2, null, 1);
      }
    },
    onDownButtonMouseDown(event2) {
      if (!this.disabled) {
        this.$refs.input.$el.focus();
        this.repeat(event2, null, -1);
        event2.preventDefault();
      }
    },
    onDownButtonMouseUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonMouseLeave() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonKeyUp() {
      if (!this.disabled) {
        this.clearTimer();
      }
    },
    onDownButtonKeyDown(event2) {
      if (event2.keyCode === 32 || event2.keyCode === 13) {
        this.repeat(event2, null, -1);
      }
    },
    onUserInput() {
      if (this.isSpecialChar) {
        this.$refs.input.$el.value = this.lastValue;
      }
      this.isSpecialChar = false;
    },
    onInputKeyDown(event2) {
      if (this.readonly) {
        return;
      }
      this.lastValue = event2.target.value;
      if (event2.shiftKey || event2.altKey) {
        this.isSpecialChar = true;
        return;
      }
      let selectionStart = event2.target.selectionStart;
      let selectionEnd = event2.target.selectionEnd;
      let inputValue = event2.target.value;
      let newValueStr = null;
      if (event2.altKey) {
        event2.preventDefault();
      }
      switch (event2.which) {
        case 38:
          this.spin(event2, 1);
          event2.preventDefault();
          break;
        case 40:
          this.spin(event2, -1);
          event2.preventDefault();
          break;
        case 37:
          if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
            event2.preventDefault();
          }
          break;
        case 39:
          if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
            event2.preventDefault();
          }
          break;
        case 9:
        case 13:
          newValueStr = this.validateValue(this.parseValue(inputValue));
          this.$refs.input.$el.value = this.formatValue(newValueStr);
          this.$refs.input.$el.setAttribute("aria-valuenow", newValueStr);
          this.updateModel(event2, newValueStr);
          break;
        case 8: {
          event2.preventDefault();
          if (selectionStart === selectionEnd) {
            const deleteChar = inputValue.charAt(selectionStart - 1);
            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
            if (this.isNumeralChar(deleteChar)) {
              const decimalLength = this.getDecimalLength(inputValue);
              if (this._group.test(deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
              } else if (this._decimal.test(deleteChar)) {
                this._decimal.lastIndex = 0;
                if (decimalLength) {
                  this.$refs.input.$el.setSelectionRange(selectionStart - 1, selectionStart - 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
                newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + "0" + inputValue.slice(selectionStart);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            }
            this.updateValue(event2, newValueStr, null, "delete-single");
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event2, newValueStr, null, "delete-range");
          }
          break;
        }
        case 46:
          event2.preventDefault();
          if (selectionStart === selectionEnd) {
            const deleteChar = inputValue.charAt(selectionStart);
            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
            if (this.isNumeralChar(deleteChar)) {
              const decimalLength = this.getDecimalLength(inputValue);
              if (this._group.test(deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
              } else if (this._decimal.test(deleteChar)) {
                this._decimal.lastIndex = 0;
                if (decimalLength) {
                  this.$refs.input.$el.setSelectionRange(selectionStart + 1, selectionStart + 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
                newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart) + "0" + inputValue.slice(selectionStart + 1);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            }
            this.updateValue(event2, newValueStr, null, "delete-back-single");
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event2, newValueStr, null, "delete-range");
          }
          break;
        case 36:
          if (this.min) {
            this.updateModel(event2, this.min);
            event2.preventDefault();
          }
          break;
        case 35:
          if (this.max) {
            this.updateModel(event2, this.max);
            event2.preventDefault();
          }
          break;
      }
    },
    onInputKeyPress(event2) {
      if (this.readonly) {
        return;
      }
      event2.preventDefault();
      let code = event2.which || event2.keyCode;
      let char = String.fromCharCode(code);
      const isDecimalSign = this.isDecimalSign(char);
      const isMinusSign = this.isMinusSign(char);
      if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
        this.insert(event2, char, { isDecimalSign, isMinusSign });
      }
    },
    onPaste(event2) {
      event2.preventDefault();
      let data = (event2.clipboardData || window["clipboardData"]).getData("Text");
      if (data) {
        let filteredData = this.parseValue(data);
        if (filteredData != null) {
          this.insert(event2, filteredData.toString());
        }
      }
    },
    allowMinusSign() {
      return this.min === null || this.min < 0;
    },
    isMinusSign(char) {
      if (this._minusSign.test(char) || char === "-") {
        this._minusSign.lastIndex = 0;
        return true;
      }
      return false;
    },
    isDecimalSign(char) {
      if (this._decimal.test(char)) {
        this._decimal.lastIndex = 0;
        return true;
      }
      return false;
    },
    isDecimalMode() {
      return this.mode === "decimal";
    },
    getDecimalCharIndexes(val) {
      let decimalCharIndex = val.search(this._decimal);
      this._decimal.lastIndex = 0;
      const filteredVal = val.replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "");
      const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
      this._decimal.lastIndex = 0;
      return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    },
    getCharIndexes(val) {
      const decimalCharIndex = val.search(this._decimal);
      this._decimal.lastIndex = 0;
      const minusCharIndex = val.search(this._minusSign);
      this._minusSign.lastIndex = 0;
      const suffixCharIndex = val.search(this._suffix);
      this._suffix.lastIndex = 0;
      const currencyCharIndex = val.search(this._currency);
      this._currency.lastIndex = 0;
      return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    },
    insert(event2, text, sign = { isDecimalSign: false, isMinusSign: false }) {
      const minusCharIndexOnText = text.search(this._minusSign);
      this._minusSign.lastIndex = 0;
      if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
        return;
      }
      const selectionStart = this.$refs.input.$el.selectionStart;
      const selectionEnd = this.$refs.input.$el.selectionEnd;
      let inputValue = this.$refs.input.$el.value.trim();
      const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
      let newValueStr;
      if (sign.isMinusSign) {
        if (selectionStart === 0) {
          newValueStr = inputValue;
          if (minusCharIndex === -1 || selectionEnd !== 0) {
            newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
          }
          this.updateValue(event2, newValueStr, text, "insert");
        }
      } else if (sign.isDecimalSign) {
        if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
          this.updateValue(event2, inputValue, text, "insert");
        } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event2, newValueStr, text, "insert");
        } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event2, newValueStr, text, "insert");
        }
      } else {
        const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
          if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
            const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
            this.updateValue(event2, newValueStr, text, operation);
          }
        } else {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event2, newValueStr, text, operation);
        }
      }
    },
    insertText(value, text, start, end) {
      let textSplit = text === "." ? text : text.split(".");
      if (textSplit.length === 2) {
        const decimalCharIndex = value.slice(start, end).search(this._decimal);
        this._decimal.lastIndex = 0;
        return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
      } else if (end - start === value.length) {
        return this.formatValue(text);
      } else if (start === 0) {
        return text + value.slice(end);
      } else if (end === value.length) {
        return value.slice(0, start) + text;
      } else {
        return value.slice(0, start) + text + value.slice(end);
      }
    },
    deleteRange(value, start, end) {
      let newValueStr;
      if (end - start === value.length)
        newValueStr = "";
      else if (start === 0)
        newValueStr = value.slice(end);
      else if (end === value.length)
        newValueStr = value.slice(0, start);
      else
        newValueStr = value.slice(0, start) + value.slice(end);
      return newValueStr;
    },
    initCursor() {
      let selectionStart = this.$refs.input.$el.selectionStart;
      let inputValue = this.$refs.input.$el.value;
      let valueLength = inputValue.length;
      let index = null;
      let prefixLength = (this.prefixChar || "").length;
      inputValue = inputValue.replace(this._prefix, "");
      selectionStart = selectionStart - prefixLength;
      let char = inputValue.charAt(selectionStart);
      if (this.isNumeralChar(char)) {
        return selectionStart + prefixLength;
      }
      let i = selectionStart - 1;
      while (i >= 0) {
        char = inputValue.charAt(i);
        if (this.isNumeralChar(char)) {
          index = i + prefixLength;
          break;
        } else {
          i--;
        }
      }
      if (index !== null) {
        this.$refs.input.$el.setSelectionRange(index + 1, index + 1);
      } else {
        i = selectionStart;
        while (i < valueLength) {
          char = inputValue.charAt(i);
          if (this.isNumeralChar(char)) {
            index = i + prefixLength;
            break;
          } else {
            i++;
          }
        }
        if (index !== null) {
          this.$refs.input.$el.setSelectionRange(index, index);
        }
      }
      return index || 0;
    },
    onInputClick() {
      if (!this.readonly) {
        this.initCursor();
      }
    },
    isNumeralChar(char) {
      if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
        this.resetRegex();
        return true;
      }
      return false;
    },
    resetRegex() {
      this._numeral.lastIndex = 0;
      this._decimal.lastIndex = 0;
      this._group.lastIndex = 0;
      this._minusSign.lastIndex = 0;
    },
    updateValue(event2, valueStr, insertedValueStr, operation) {
      let currentValue = this.$refs.input.$el.value;
      let newValue = null;
      if (valueStr != null) {
        newValue = this.parseValue(valueStr);
        newValue = !newValue && !this.allowEmpty ? 0 : newValue;
        this.updateInput(newValue, insertedValueStr, operation, valueStr);
        this.handleOnInput(event2, currentValue, newValue);
      }
    },
    handleOnInput(event2, currentValue, newValue) {
      if (this.isValueChanged(currentValue, newValue)) {
        this.$emit("input", { originalEvent: event2, value: newValue });
      }
    },
    isValueChanged(currentValue, newValue) {
      if (newValue === null && currentValue !== null) {
        return true;
      }
      if (newValue != null) {
        let parsedCurrentValue = typeof currentValue === "string" ? this.parseValue(currentValue) : currentValue;
        return newValue !== parsedCurrentValue;
      }
      return false;
    },
    validateValue(value) {
      if (value === "-" || value == null) {
        return null;
      }
      if (this.min != null && value < this.min) {
        return this.min;
      }
      if (this.max != null && value > this.max) {
        return this.max;
      }
      return value;
    },
    updateInput(value, insertedValueStr, operation, valueStr) {
      insertedValueStr = insertedValueStr || "";
      let inputValue = this.$refs.input.$el.value;
      let newValue = this.formatValue(value);
      let currentLength = inputValue.length;
      if (newValue !== valueStr) {
        newValue = this.concatValues(newValue, valueStr);
      }
      if (currentLength === 0) {
        this.$refs.input.$el.value = newValue;
        this.$refs.input.$el.setSelectionRange(0, 0);
        const index = this.initCursor();
        const selectionEnd = index + insertedValueStr.length;
        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
      } else {
        let selectionStart = this.$refs.input.$el.selectionStart;
        let selectionEnd = this.$refs.input.$el.selectionEnd;
        this.$refs.input.$el.value = newValue;
        let newLength = newValue.length;
        if (operation === "range-insert") {
          const startValue = this.parseValue((inputValue || "").slice(0, selectionStart));
          const startValueStr = startValue !== null ? startValue.toString() : "";
          const startExpr = startValueStr.split("").join(`(${this.groupChar})?`);
          const sRegex = new RegExp(startExpr, "g");
          sRegex.test(newValue);
          const tExpr = insertedValueStr.split("").join(`(${this.groupChar})?`);
          const tRegex = new RegExp(tExpr, "g");
          tRegex.test(newValue.slice(sRegex.lastIndex));
          selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (newLength === currentLength) {
          if (operation === "insert" || operation === "delete-back-single")
            this.$refs.input.$el.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
          else if (operation === "delete-single")
            this.$refs.input.$el.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
          else if (operation === "delete-range" || operation === "spin")
            this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (operation === "delete-back-single") {
          let prevChar = inputValue.charAt(selectionEnd - 1);
          let nextChar = inputValue.charAt(selectionEnd);
          let diff = currentLength - newLength;
          let isGroupChar = this._group.test(nextChar);
          if (isGroupChar && diff === 1) {
            selectionEnd += 1;
          } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
            selectionEnd += -1 * diff + 1;
          }
          this._group.lastIndex = 0;
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        } else if (inputValue === "-" && operation === "insert") {
          this.$refs.input.$el.setSelectionRange(0, 0);
          const index = this.initCursor();
          const selectionEnd2 = index + insertedValueStr.length + 1;
          this.$refs.input.$el.setSelectionRange(selectionEnd2, selectionEnd2);
        } else {
          selectionEnd = selectionEnd + (newLength - currentLength);
          this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
        }
      }
      this.$refs.input.$el.setAttribute("aria-valuenow", value);
    },
    concatValues(val1, val2) {
      if (val1 && val2) {
        let decimalCharIndex = val2.search(this._decimal);
        this._decimal.lastIndex = 0;
        return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
      }
      return val1;
    },
    getDecimalLength(value) {
      if (value) {
        const valueSplit = value.split(this._decimal);
        if (valueSplit.length === 2) {
          return valueSplit[1].replace(this._suffix, "").trim().replace(/\s/g, "").replace(this._currency, "").length;
        }
      }
      return 0;
    },
    updateModel(event2, value) {
      this.d_modelValue = value;
      this.$emit("update:modelValue", value);
    },
    onInputFocus(event2) {
      this.focused = true;
      this.$emit("focus", event2);
    },
    onInputBlur(event2) {
      this.focused = false;
      let input = event2.target;
      let newValue = this.validateValue(this.parseValue(input.value));
      this.$emit("blur", { originalEvent: event2, value: input.value });
      input.value = this.formatValue(newValue);
      input.setAttribute("aria-valuenow", newValue);
      this.updateModel(event2, newValue);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    maxBoundry() {
      return this.d_modelValue >= this.max;
    },
    minBoundry() {
      return this.d_modelValue <= this.min;
    }
  },
  computed: {
    containerClass() {
      return ["p-inputnumber p-component p-inputwrapper", {
        "p-inputwrapper-filled": this.filled,
        "p-inputwrapper-focus": this.focused,
        "p-inputnumber-buttons-stacked": this.showButtons && this.buttonLayout === "stacked",
        "p-inputnumber-buttons-horizontal": this.showButtons && this.buttonLayout === "horizontal",
        "p-inputnumber-buttons-vertical": this.showButtons && this.buttonLayout === "vertical"
      }];
    },
    upButtonClass() {
      return ["p-inputnumber-button p-inputnumber-button-up", this.incrementButtonClass, {
        "p-disabled": this.showButtons && this.max !== null && this.maxBoundry()
      }];
    },
    downButtonClass() {
      return ["p-inputnumber-button p-inputnumber-button-down", this.decrementButtonClass, {
        "p-disabled": this.showButtons && this.min !== null && this.minBoundry()
      }];
    },
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    upButtonListeners() {
      return {
        mousedown: (event2) => this.onUpButtonMouseDown(event2),
        mouseup: (event2) => this.onUpButtonMouseUp(event2),
        mouseleave: (event2) => this.onUpButtonMouseLeave(event2),
        keydown: (event2) => this.onUpButtonKeyDown(event2),
        keyup: (event2) => this.onUpButtonKeyUp(event2)
      };
    },
    downButtonListeners() {
      return {
        mousedown: (event2) => this.onDownButtonMouseDown(event2),
        mouseup: (event2) => this.onDownButtonMouseUp(event2),
        mouseleave: (event2) => this.onDownButtonMouseLeave(event2),
        keydown: (event2) => this.onDownButtonKeyDown(event2),
        keyup: (event2) => this.onDownButtonKeyUp(event2)
      };
    },
    formattedValue() {
      const val = !this.modelValue && !this.allowEmpty ? 0 : this.modelValue;
      return this.formatValue(val);
    },
    getFormatter() {
      return this.numberFormat;
    }
  },
  components: {
    "INInputText": script$e,
    "INButton": script$i
  }
};
const _hoisted_1$d = {
  key: 0,
  class: "p-inputnumber-button-group"
};
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_INInputText = vue_cjs_prod.resolveComponent("INInputText");
  const _component_INButton = vue_cjs_prod.resolveComponent("INButton");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
    class: vue_cjs_prod.normalizeClass($options.containerClass)
  }, [
    vue_cjs_prod.createVNode(_component_INInputText, vue_cjs_prod.mergeProps({
      ref: "input",
      class: ["p-inputnumber-input", $props.inputClass],
      role: "spinbutton",
      id: $props.inputId,
      style: $props.inputStyle,
      value: $options.formattedValue,
      "aria-valuemin": $props.min,
      "aria-valuemax": $props.max,
      "aria-valuenow": $props.modelValue,
      disabled: $props.disabled,
      readonly: $props.readonly,
      placeholder: $props.placeholder,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      onInput: $options.onUserInput,
      onKeydown: $options.onInputKeyDown,
      onKeypress: $options.onInputKeyPress,
      onPaste: $options.onPaste,
      onClick: $options.onInputClick,
      onFocus: $options.onInputFocus,
      onBlur: $options.onInputBlur
    }, $props.inputProps), null, 16, ["id", "class", "style", "value", "aria-valuemin", "aria-valuemax", "aria-valuenow", "disabled", "readonly", "placeholder", "aria-labelledby", "aria-label", "onInput", "onKeydown", "onKeypress", "onPaste", "onClick", "onFocus", "onBlur"]),
    $props.showButtons && $props.buttonLayout === "stacked" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_1$d, [
      vue_cjs_prod.createVNode(_component_INButton, vue_cjs_prod.mergeProps({
        class: $options.upButtonClass,
        icon: $props.incrementButtonIcon
      }, vue_cjs_prod.toHandlers($options.upButtonListeners), {
        disabled: $props.disabled,
        tabindex: -1,
        "aria-hidden": "true"
      }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"]),
      vue_cjs_prod.createVNode(_component_INButton, vue_cjs_prod.mergeProps({
        class: $options.downButtonClass,
        icon: $props.decrementButtonIcon
      }, vue_cjs_prod.toHandlers($options.downButtonListeners), {
        disabled: $props.disabled,
        tabindex: -1,
        "aria-hidden": "true"
      }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"])
    ])) : vue_cjs_prod.createCommentVNode("", true),
    $props.showButtons && $props.buttonLayout !== "stacked" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_INButton, vue_cjs_prod.mergeProps({
      key: 1,
      class: $options.upButtonClass,
      icon: $props.incrementButtonIcon
    }, vue_cjs_prod.toHandlers($options.upButtonListeners), {
      disabled: $props.disabled,
      tabindex: -1,
      "aria-hidden": "true"
    }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"])) : vue_cjs_prod.createCommentVNode("", true),
    $props.showButtons && $props.buttonLayout !== "stacked" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_INButton, vue_cjs_prod.mergeProps({
      key: 2,
      class: $options.downButtonClass,
      icon: $props.decrementButtonIcon
    }, vue_cjs_prod.toHandlers($options.downButtonListeners), {
      disabled: $props.disabled,
      tabindex: -1,
      "aria-hidden": "true"
    }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"])) : vue_cjs_prod.createCommentVNode("", true)
  ], 2);
}
function styleInject$6(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$6 = "\n.p-inputnumber {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.p-inputnumber-button {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label {\n    display: none;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    padding: 0;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-input {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-left-radius: 0;\n    padding: 0;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-button-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n}\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.p-inputnumber-buttons-horizontal .p-inputnumber-input {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n    border-radius: 0;\n}\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-inputnumber-buttons-vertical {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    width: 100%;\n}\n.p-inputnumber-buttons-vertical .p-inputnumber-input {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n    border-radius: 0;\n    text-align: center;\n}\n.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    width: 100%;\n}\n.p-inputnumber-input {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n}\n.p-fluid .p-inputnumber {\n    width: 100%;\n}\n.p-fluid .p-inputnumber .p-inputnumber-input {\n    width: 1%;\n}\n.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input {\n    width: 100%;\n}\n";
styleInject$6(css_248z$6);
script$d.render = render$d;
var script$9$1 = {
  name: "CurrentPageReport",
  inheritAttrs: false,
  props: {
    pageCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    first: {
      type: Number,
      default: 0
    },
    rows: {
      type: Number,
      default: 0
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    template: {
      type: String,
      default: "({currentPage} of {totalPages})"
    }
  },
  computed: {
    text() {
      let text = this.template.replace("{currentPage}", this.currentPage).replace("{totalPages}", this.pageCount).replace("{first}", this.pageCount > 0 ? this.first + 1 : 0).replace("{last}", Math.min(this.first + this.rows, this.totalRecords)).replace("{rows}", this.rows).replace("{totalRecords}", this.totalRecords);
      return text;
    }
  }
};
const _hoisted_1$6$1 = { class: "p-paginator-current" };
function render$9$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_1$6$1, vue_cjs_prod.toDisplayString($options.text), 1);
}
script$9$1.render = render$9$1;
var script$8$1 = {
  name: "FirstPageLink",
  computed: {
    containerClass() {
      return ["p-paginator-first p-paginator-element p-link", {
        "p-disabled": this.$attrs.disabled
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$5$1 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-double-left" }, null, -1);
const _hoisted_2$5$1 = [
  _hoisted_1$5$1
];
function render$8$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    type: "button"
  }, _hoisted_2$5$1, 2)), [
    [_directive_ripple]
  ]);
}
script$8$1.render = render$8$1;
var script$7$1 = {
  name: "LastPageLink",
  computed: {
    containerClass() {
      return ["p-paginator-last p-paginator-element p-link", {
        "p-disabled": this.$attrs.disabled
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$4$1 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-double-right" }, null, -1);
const _hoisted_2$4$1 = [
  _hoisted_1$4$1
];
function render$7$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    type: "button"
  }, _hoisted_2$4$1, 2)), [
    [_directive_ripple]
  ]);
}
script$7$1.render = render$7$1;
var script$6$1 = {
  name: "NextPageLink",
  computed: {
    containerClass() {
      return ["p-paginator-next p-paginator-element p-link", {
        "p-disabled": this.$attrs.disabled
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$3$2 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-right" }, null, -1);
const _hoisted_2$3$2 = [
  _hoisted_1$3$2
];
function render$6$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    type: "button"
  }, _hoisted_2$3$2, 2)), [
    [_directive_ripple]
  ]);
}
script$6$1.render = render$6$1;
var script$5$1 = {
  name: "PageLinks",
  inheritAttrs: false,
  emits: ["click"],
  props: {
    value: Array,
    page: Number
  },
  methods: {
    onPageLinkClick(event2, pageLink) {
      this.$emit("click", {
        originalEvent: event2,
        value: pageLink
      });
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$2$2 = { class: "p-paginator-pages" };
const _hoisted_2$2$2 = ["onClick"];
function render$5$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_1$2$2, [
    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.value, (pageLink) => {
      return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
        key: pageLink,
        class: vue_cjs_prod.normalizeClass(["p-paginator-page p-paginator-element p-link", { "p-highlight": pageLink - 1 === $props.page }]),
        type: "button",
        onClick: ($event) => $options.onPageLinkClick($event, pageLink)
      }, [
        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(pageLink), 1)
      ], 10, _hoisted_2$2$2)), [
        [_directive_ripple]
      ]);
    }), 128))
  ]);
}
script$5$1.render = render$5$1;
var script$4$2 = {
  name: "PrevPageLink",
  computed: {
    containerClass() {
      return ["p-paginator-prev p-paginator-element p-link", {
        "p-disabled": this.$attrs.disabled
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$1$2 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-left" }, null, -1);
const _hoisted_2$1$2 = [
  _hoisted_1$1$2
];
function render$4$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    type: "button"
  }, _hoisted_2$1$2, 2)), [
    [_directive_ripple]
  ]);
}
script$4$2.render = render$4$1;
var script$3$2 = {
  name: "RowsPerPageDropdown",
  inheritAttrs: false,
  emits: ["rows-change"],
  props: {
    options: Array,
    rows: Number,
    disabled: Boolean
  },
  methods: {
    onChange(value) {
      this.$emit("rows-change", value);
    }
  },
  computed: {
    rowsOptions() {
      let opts = [];
      if (this.options) {
        for (let i = 0; i < this.options.length; i++) {
          opts.push({ label: String(this.options[i]), value: this.options[i] });
        }
      }
      return opts;
    }
  },
  components: {
    "RPPDropdown": script$f
  }
};
function render$3$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RPPDropdown = vue_cjs_prod.resolveComponent("RPPDropdown");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_RPPDropdown, {
    modelValue: $props.rows,
    options: $options.rowsOptions,
    optionLabel: "label",
    optionValue: "value",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.onChange($event)),
    class: "p-paginator-rpp-options",
    disabled: $props.disabled
  }, null, 8, ["modelValue", "options", "disabled"]);
}
script$3$2.render = render$3$2;
var script$2$2 = {
  name: "JumpToPageDropdown",
  inheritAttrs: false,
  emits: ["page-change"],
  props: {
    page: Number,
    pageCount: Number,
    disabled: Boolean
  },
  methods: {
    onChange(value) {
      this.$emit("page-change", value);
    }
  },
  computed: {
    pageOptions() {
      let opts = [];
      for (let i = 0; i < this.pageCount; i++) {
        opts.push({ label: String(i + 1), value: i });
      }
      return opts;
    }
  },
  components: {
    "JTPDropdown": script$f
  }
};
function render$2$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_JTPDropdown = vue_cjs_prod.resolveComponent("JTPDropdown");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_JTPDropdown, {
    modelValue: $props.page,
    options: $options.pageOptions,
    optionLabel: "label",
    optionValue: "value",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.onChange($event)),
    class: "p-paginator-page-options",
    disabled: $props.disabled
  }, null, 8, ["modelValue", "options", "disabled"]);
}
script$2$2.render = render$2$2;
var script$1$2 = {
  name: "JumpToPageInput",
  inheritAttrs: false,
  emits: ["page-change"],
  props: {
    page: Number,
    pageCount: Number,
    disabled: Boolean
  },
  methods: {
    onChange(value) {
      this.$emit("page-change", value - 1);
    }
  },
  components: {
    "JTPInput": script$d
  }
};
function render$1$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_JTPInput = vue_cjs_prod.resolveComponent("JTPInput");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_JTPInput, {
    modelValue: $props.page,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.onChange($event)),
    class: "p-paginator-page-input",
    disabled: $props.disabled
  }, null, 8, ["modelValue", "disabled"]);
}
script$1$2.render = render$1$2;
var script$c = {
  name: "Paginator",
  emits: ["update:first", "update:rows", "page"],
  props: {
    totalRecords: {
      type: Number,
      default: 0
    },
    rows: {
      type: Number,
      default: 0
    },
    first: {
      type: Number,
      default: 0
    },
    pageLinkSize: {
      type: Number,
      default: 5
    },
    rowsPerPageOptions: {
      type: Array,
      default: null
    },
    template: {
      type: String,
      default: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    },
    currentPageReportTemplate: {
      type: null,
      default: "({currentPage} of {totalPages})"
    },
    alwaysShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      d_first: this.first,
      d_rows: this.rows
    };
  },
  watch: {
    first(newValue) {
      this.d_first = newValue;
    },
    rows(newValue) {
      this.d_rows = newValue;
    },
    totalRecords(newValue) {
      if (this.page > 0 && newValue && this.d_first >= newValue) {
        this.changePage(this.pageCount - 1);
      }
    }
  },
  methods: {
    changePage(p) {
      const pc = this.pageCount;
      if (p >= 0 && p < pc) {
        this.d_first = this.d_rows * p;
        const state = {
          page: p,
          first: this.d_first,
          rows: this.d_rows,
          pageCount: pc
        };
        this.$emit("update:first", this.d_first);
        this.$emit("update:rows", this.d_rows);
        this.$emit("page", state);
      }
    },
    changePageToFirst(event2) {
      if (!this.isFirstPage) {
        this.changePage(0);
      }
      event2.preventDefault();
    },
    changePageToPrev(event2) {
      this.changePage(this.page - 1);
      event2.preventDefault();
    },
    changePageLink(event2) {
      this.changePage(event2.value - 1);
      event2.originalEvent.preventDefault();
    },
    changePageToNext(event2) {
      this.changePage(this.page + 1);
      event2.preventDefault();
    },
    changePageToLast(event2) {
      if (!this.isLastPage) {
        this.changePage(this.pageCount - 1);
      }
      event2.preventDefault();
    },
    onRowChange(value) {
      this.d_rows = value;
      this.changePage(this.page);
    }
  },
  computed: {
    templateItems() {
      let keys = [];
      this.template.split(" ").map((value) => {
        keys.push(value.trim());
      });
      return keys;
    },
    page() {
      return Math.floor(this.d_first / this.d_rows);
    },
    pageCount() {
      return Math.ceil(this.totalRecords / this.d_rows);
    },
    isFirstPage() {
      return this.page === 0;
    },
    isLastPage() {
      return this.page === this.pageCount - 1;
    },
    calculatePageLinkBoundaries() {
      const numberOfPages = this.pageCount;
      const visiblePages = Math.min(this.pageLinkSize, numberOfPages);
      let start = Math.max(0, Math.ceil(this.page - visiblePages / 2));
      let end = Math.min(numberOfPages - 1, start + visiblePages - 1);
      const delta = this.pageLinkSize - (end - start + 1);
      start = Math.max(0, start - delta);
      return [start, end];
    },
    pageLinks() {
      let pageLinks = [];
      let boundaries = this.calculatePageLinkBoundaries;
      let start = boundaries[0];
      let end = boundaries[1];
      for (var i = start; i <= end; i++) {
        pageLinks.push(i + 1);
      }
      return pageLinks;
    },
    currentState() {
      return {
        page: this.page,
        first: this.d_first,
        rows: this.d_rows
      };
    },
    empty() {
      return this.pageCount === 0;
    },
    currentPage() {
      return this.pageCount > 0 ? this.page + 1 : 0;
    }
  },
  components: {
    "CurrentPageReport": script$9$1,
    "FirstPageLink": script$8$1,
    "LastPageLink": script$7$1,
    "NextPageLink": script$6$1,
    "PageLinks": script$5$1,
    "PrevPageLink": script$4$2,
    "RowsPerPageDropdown": script$3$2,
    "JumpToPageDropdown": script$2$2,
    "JumpToPageInput": script$1$2
  }
};
const _hoisted_1$c = {
  key: 0,
  class: "p-paginator p-component"
};
const _hoisted_2$9 = {
  key: 0,
  class: "p-paginator-left-content"
};
const _hoisted_3$8 = {
  key: 1,
  class: "p-paginator-right-content"
};
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FirstPageLink = vue_cjs_prod.resolveComponent("FirstPageLink");
  const _component_PrevPageLink = vue_cjs_prod.resolveComponent("PrevPageLink");
  const _component_NextPageLink = vue_cjs_prod.resolveComponent("NextPageLink");
  const _component_LastPageLink = vue_cjs_prod.resolveComponent("LastPageLink");
  const _component_PageLinks = vue_cjs_prod.resolveComponent("PageLinks");
  const _component_CurrentPageReport = vue_cjs_prod.resolveComponent("CurrentPageReport");
  const _component_RowsPerPageDropdown = vue_cjs_prod.resolveComponent("RowsPerPageDropdown");
  const _component_JumpToPageDropdown = vue_cjs_prod.resolveComponent("JumpToPageDropdown");
  const _component_JumpToPageInput = vue_cjs_prod.resolveComponent("JumpToPageInput");
  return ($props.alwaysShow ? true : $options.pageLinks && $options.pageLinks.length > 1) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_1$c, [
    _ctx.$slots.start ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_2$9, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "start", { state: $options.currentState })
    ])) : vue_cjs_prod.createCommentVNode("", true),
    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.templateItems, (item) => {
      return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: item }, [
        item === "FirstPageLink" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FirstPageLink, {
          key: 0,
          onClick: _cache[0] || (_cache[0] = ($event) => $options.changePageToFirst($event)),
          disabled: $options.isFirstPage || $options.empty
        }, null, 8, ["disabled"])) : item === "PrevPageLink" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_PrevPageLink, {
          key: 1,
          onClick: _cache[1] || (_cache[1] = ($event) => $options.changePageToPrev($event)),
          disabled: $options.isFirstPage || $options.empty
        }, null, 8, ["disabled"])) : item === "NextPageLink" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_NextPageLink, {
          key: 2,
          onClick: _cache[2] || (_cache[2] = ($event) => $options.changePageToNext($event)),
          disabled: $options.isLastPage || $options.empty
        }, null, 8, ["disabled"])) : item === "LastPageLink" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_LastPageLink, {
          key: 3,
          onClick: _cache[3] || (_cache[3] = ($event) => $options.changePageToLast($event)),
          disabled: $options.isLastPage || $options.empty
        }, null, 8, ["disabled"])) : item === "PageLinks" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_PageLinks, {
          key: 4,
          value: $options.pageLinks,
          page: $options.page,
          onClick: _cache[4] || (_cache[4] = ($event) => $options.changePageLink($event))
        }, null, 8, ["value", "page"])) : item === "CurrentPageReport" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_CurrentPageReport, {
          key: 5,
          template: $props.currentPageReportTemplate,
          currentPage: $options.currentPage,
          page: $options.page,
          pageCount: $options.pageCount,
          first: $data.d_first,
          rows: $data.d_rows,
          totalRecords: $props.totalRecords
        }, null, 8, ["template", "currentPage", "page", "pageCount", "first", "rows", "totalRecords"])) : item === "RowsPerPageDropdown" && $props.rowsPerPageOptions ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_RowsPerPageDropdown, {
          key: 6,
          rows: $data.d_rows,
          options: $props.rowsPerPageOptions,
          onRowsChange: _cache[5] || (_cache[5] = ($event) => $options.onRowChange($event)),
          disabled: $options.empty
        }, null, 8, ["rows", "options", "disabled"])) : item === "JumpToPageDropdown" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_JumpToPageDropdown, {
          key: 7,
          page: $options.page,
          pageCount: $options.pageCount,
          onPageChange: _cache[6] || (_cache[6] = ($event) => $options.changePage($event)),
          disabled: $options.empty
        }, null, 8, ["page", "pageCount", "disabled"])) : item === "JumpToPageInput" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_JumpToPageInput, {
          key: 8,
          page: $options.currentPage,
          onPageChange: _cache[7] || (_cache[7] = ($event) => $options.changePage($event)),
          disabled: $options.empty
        }, null, 8, ["page", "disabled"])) : vue_cjs_prod.createCommentVNode("", true)
      ], 64);
    }), 128)),
    _ctx.$slots.end ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_3$8, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "end", { state: $options.currentState })
    ])) : vue_cjs_prod.createCommentVNode("", true)
  ])) : vue_cjs_prod.createCommentVNode("", true);
}
function styleInject$5(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$5 = "\n.p-paginator {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.p-paginator-left-content {\n	margin-right: auto;\n}\n.p-paginator-right-content {\n	margin-left: auto;\n}\n.p-paginator-page,\n.p-paginator-next,\n.p-paginator-last,\n.p-paginator-first,\n.p-paginator-prev,\n.p-paginator-current {\n    cursor: pointer;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    line-height: 1;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-paginator-element:focus {\n    z-index: 1;\n    position: relative;\n}\n";
styleInject$5(css_248z$5);
script$c.render = render$c;
var script$a = {
  name: "HeaderCheckbox",
  inheritAttrs: false,
  emits: ["change"],
  props: {
    checked: null
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick(event2) {
      if (!this.$attrs.disabled) {
        this.focused = true;
        this.$emit("change", {
          originalEvent: event2,
          checked: !this.checked
        });
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
};
const _hoisted_1$a = ["aria-checked", "tabindex"];
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    class: vue_cjs_prod.normalizeClass(["p-checkbox p-component", { "p-checkbox-focused": $data.focused, "p-disabled": _ctx.$attrs.disabled }]),
    onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
    onKeydown: _cache[3] || (_cache[3] = vue_cjs_prod.withKeys(vue_cjs_prod.withModifiers((...args) => $options.onClick && $options.onClick(...args), ["prevent"]), ["space"]))
  }, [
    vue_cjs_prod.createElementVNode("div", {
      ref: "box",
      class: vue_cjs_prod.normalizeClass(["p-checkbox-box p-component", { "p-highlight": $props.checked, "p-disabled": _ctx.$attrs.disabled, "p-focus": $data.focused }]),
      role: "checkbox",
      "aria-checked": $props.checked,
      tabindex: _ctx.$attrs.disabled ? null : "0",
      onFocus: _cache[0] || (_cache[0] = ($event) => $options.onFocus($event)),
      onBlur: _cache[1] || (_cache[1] = ($event) => $options.onBlur($event))
    }, [
      vue_cjs_prod.createElementVNode("span", {
        class: vue_cjs_prod.normalizeClass(["p-checkbox-icon", { "pi pi-check": $props.checked }])
      }, null, 2)
    ], 42, _hoisted_1$a)
  ], 34);
}
script$a.render = render$a;
var script$9 = {
  name: "ColumnFilter",
  emits: ["filter-change", "filter-apply", "operator-change", "matchmode-change", "constraint-add", "constraint-remove", "filter-clear", "apply-click"],
  props: {
    field: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    display: {
      type: String,
      default: null
    },
    showMenu: {
      type: Boolean,
      default: true
    },
    matchMode: {
      type: String,
      default: null
    },
    showOperator: {
      type: Boolean,
      default: true
    },
    showClearButton: {
      type: Boolean,
      default: true
    },
    showApplyButton: {
      type: Boolean,
      default: true
    },
    showMatchModes: {
      type: Boolean,
      default: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    matchModeOptions: {
      type: Array,
      default: null
    },
    maxConstraints: {
      type: Number,
      default: 2
    },
    filterElement: null,
    filterHeaderTemplate: null,
    filterFooterTemplate: null,
    filterClearTemplate: null,
    filterApplyTemplate: null,
    filters: {
      type: Object,
      default: null
    },
    filtersStore: {
      type: Object,
      default: null
    },
    filterMenuClass: {
      type: String,
      default: null
    },
    filterMenuStyle: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      overlayVisible: false,
      defaultMatchMode: null,
      defaultOperator: null
    };
  },
  overlay: null,
  selfClick: false,
  overlayEventListener: null,
  beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus.off("overlay-click", this.overlayEventListener);
      this.overlayEventListener = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.onOverlayHide();
    }
  },
  mounted() {
    if (this.filters && this.filters[this.field]) {
      let fieldFilters = this.filters[this.field];
      if (fieldFilters.operator) {
        this.defaultMatchMode = fieldFilters.constraints[0].matchMode;
        this.defaultOperator = fieldFilters.operator;
      } else {
        this.defaultMatchMode = this.filters[this.field].matchMode;
      }
    }
  },
  methods: {
    clearFilter() {
      let _filters = { ...this.filters };
      if (_filters[this.field].operator) {
        _filters[this.field].constraints.splice(1);
        _filters[this.field].operator = this.defaultOperator;
        _filters[this.field].constraints[0] = { value: null, matchMode: this.defaultMatchMode };
      } else {
        _filters[this.field].value = null;
        _filters[this.field].matchMode = this.defaultMatchMode;
      }
      this.$emit("filter-clear");
      this.$emit("filter-change", _filters);
      this.$emit("filter-apply");
      this.hide();
    },
    applyFilter() {
      this.$emit("apply-click", { field: this.field, constraints: this.filters[this.field] });
      this.$emit("filter-apply");
      this.hide();
    },
    hasFilter() {
      if (this.filtersStore) {
        let fieldFilter = this.filtersStore[this.field];
        if (fieldFilter) {
          if (fieldFilter.operator)
            return !this.isFilterBlank(fieldFilter.constraints[0].value);
          else
            return !this.isFilterBlank(fieldFilter.value);
        }
      }
      return false;
    },
    hasRowFilter() {
      return this.filters[this.field] && !this.isFilterBlank(this.filters[this.field].value);
    },
    isFilterBlank(filter2) {
      if (filter2 !== null && filter2 !== void 0) {
        if (typeof filter2 === "string" && filter2.trim().length == 0 || filter2 instanceof Array && filter2.length == 0)
          return true;
        else
          return false;
      }
      return true;
    },
    toggleMenu() {
      this.overlayVisible = !this.overlayVisible;
    },
    onToggleButtonKeyDown(event2) {
      switch (event2.key) {
        case "Escape":
        case "Tab":
          this.overlayVisible = false;
          break;
        case "ArrowDown":
          if (this.overlayVisible) {
            let focusable = DomHandler.getFocusableElements(this.overlay);
            if (focusable) {
              focusable[0].focus();
            }
            event2.preventDefault();
          } else if (event2.altKey) {
            this.overlayVisible = true;
            event2.preventDefault();
          }
          break;
      }
    },
    onEscape() {
      this.overlayVisible = false;
      if (this.$refs.icon) {
        this.$refs.icon.focus();
      }
    },
    onRowMatchModeChange(matchMode) {
      let _filters = { ...this.filters };
      _filters[this.field].matchMode = matchMode;
      this.$emit("matchmode-change", { field: this.field, matchMode });
      this.$emit("filter-change", _filters);
      this.$emit("filter-apply");
      this.hide();
    },
    onRowMatchModeKeyDown(event2) {
      let item = event2.target;
      switch (event2.key) {
        case "ArrowDown":
          var nextItem = this.findNextItem(item);
          if (nextItem) {
            item.removeAttribute("tabindex");
            nextItem.tabIndex = "0";
            nextItem.focus();
          }
          event2.preventDefault();
          break;
        case "ArrowUp":
          var prevItem = this.findPrevItem(item);
          if (prevItem) {
            item.removeAttribute("tabindex");
            prevItem.tabIndex = "0";
            prevItem.focus();
          }
          event2.preventDefault();
          break;
      }
    },
    isRowMatchModeSelected(matchMode) {
      return this.filters[this.field].matchMode === matchMode;
    },
    onOperatorChange(value) {
      let _filters = { ...this.filters };
      _filters[this.field].operator = value;
      this.$emit("filter-change", _filters);
      this.$emit("operator-change", { field: this.field, operator: value });
      if (!this.showApplyButton) {
        this.$emit("filter-apply");
      }
    },
    onMenuMatchModeChange(value, index) {
      let _filters = { ...this.filters };
      _filters[this.field].constraints[index].matchMode = value;
      this.$emit("matchmode-change", { field: this.field, matchMode: value, index });
      if (!this.showApplyButton) {
        this.$emit("filter-apply");
      }
    },
    addConstraint() {
      let _filters = { ...this.filters };
      let newConstraint = { value: null, matchMode: this.defaultMatchMode };
      _filters[this.field].constraints.push(newConstraint);
      this.$emit("constraint-add", { field: this.field, constraing: newConstraint });
      this.$emit("filter-change", _filters);
      if (!this.showApplyButton) {
        this.$emit("filter-apply");
      }
    },
    removeConstraint(index) {
      let _filters = { ...this.filters };
      let removedConstraint = _filters[this.field].constraints.splice(index, 1);
      this.$emit("constraint-remove", { field: this.field, constraing: removedConstraint });
      this.$emit("filter-change", _filters);
      if (!this.showApplyButton) {
        this.$emit("filter-apply");
      }
    },
    filterCallback() {
      this.$emit("filter-apply");
    },
    findNextItem(item) {
      let nextItem = item.nextElementSibling;
      if (nextItem)
        return DomHandler.hasClass(nextItem, "p-column-filter-separator") ? this.findNextItem(nextItem) : nextItem;
      else
        return item.parentElement.firstElementChild;
    },
    findPrevItem(item) {
      let prevItem = item.previousElementSibling;
      if (prevItem)
        DomHandler.hasClass(prevItem, "p-column-filter-separator") ? this.findPrevItem(prevItem) : prevItem;
      else
        return item.parentElement.lastElementChild;
    },
    hide() {
      this.overlayVisible = false;
    },
    onContentClick(event2) {
      this.selfClick = true;
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event2,
        target: this.overlay
      });
    },
    onContentMouseDown() {
      this.selfClick = true;
    },
    onOverlayEnter(el) {
      if (this.filterMenuStyle) {
        DomHandler.applyStyle(this.overlay, this.filterMenuStyle);
      }
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      DomHandler.absolutePosition(this.overlay, this.$refs.icon);
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.overlayEventListener = (e) => {
        if (!this.isOutsideClicked(e.target)) {
          this.selfClick = true;
        }
      };
      OverlayEventBus.on("overlay-click", this.overlayEventListener);
    },
    onOverlayLeave() {
      this.onOverlayHide();
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    onOverlayHide() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      this.overlay = null;
      OverlayEventBus.off("overlay-click", this.overlayEventListener);
      this.overlayEventListener = null;
    },
    overlayRef(el) {
      this.overlay = el;
    },
    isOutsideClicked(target) {
      return !this.isTargetClicked(target) && this.overlay && !(this.overlay.isSameNode(target) || this.overlay.contains(target));
    },
    isTargetClicked(target) {
      return this.$refs.icon && (this.$refs.icon.isSameNode(target) || this.$refs.icon.contains(target));
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event2) => {
          if (this.overlayVisible && !this.selfClick && this.isOutsideClicked(event2.target)) {
            this.overlayVisible = false;
          }
          this.selfClick = false;
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
        this.selfClick = false;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.icon, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    }
  },
  computed: {
    containerClass() {
      return ["p-column-filter p-fluid", {
        "p-column-filter-row": this.display === "row",
        "p-column-filter-menu": this.display === "menu"
      }];
    },
    overlayClass() {
      return [this.filterMenuClass, {
        "p-column-filter-overlay p-component p-fluid": true,
        "p-column-filter-overlay-menu": this.display === "menu",
        "p-input-filled": this.$primevue.config.inputStyle === "filled",
        "p-ripple-disabled": this.$primevue.config.ripple === false
      }];
    },
    showMenuButton() {
      return this.showMenu && (this.display === "row" ? this.type !== "boolean" : true);
    },
    matchModes() {
      return this.matchModeOptions || this.$primevue.config.filterMatchModeOptions[this.type].map((key) => {
        return { label: this.$primevue.config.locale[key], value: key };
      });
    },
    isShowMatchModes() {
      return this.type !== "boolean" && this.showMatchModes && this.matchModes;
    },
    operatorOptions() {
      return [
        { label: this.$primevue.config.locale.matchAll, value: FilterOperator.AND },
        { label: this.$primevue.config.locale.matchAny, value: FilterOperator.OR }
      ];
    },
    noFilterLabel() {
      return this.$primevue.config.locale.noFilter;
    },
    isShowOperator() {
      return this.showOperator && this.filters[this.field].operator;
    },
    operator() {
      return this.filters[this.field].operator;
    },
    fieldConstraints() {
      return this.filters[this.field].constraints || [this.filters[this.field]];
    },
    showRemoveIcon() {
      return this.fieldConstraints.length > 1;
    },
    removeRuleButtonLabel() {
      return this.$primevue.config.locale.removeRule;
    },
    addRuleButtonLabel() {
      return this.$primevue.config.locale.addRule;
    },
    isShowAddConstraint() {
      return this.showAddButton && this.filters[this.field].operator && (this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints);
    },
    clearButtonLabel() {
      return this.$primevue.config.locale.clear;
    },
    applyButtonLabel() {
      return this.$primevue.config.locale.apply;
    }
  },
  components: {
    "CFDropdown": script$f,
    "CFButton": script$i,
    "Portal": script$g
  }
};
const _hoisted_1$9 = {
  key: 0,
  class: "p-fluid p-column-filter-element"
};
const _hoisted_2$7 = ["aria-expanded"];
const _hoisted_3$6 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "pi pi-filter-icon pi-filter" }, null, -1);
const _hoisted_4$4 = [
  _hoisted_3$6
];
const _hoisted_5$3 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "pi pi-filter-slash" }, null, -1);
const _hoisted_6$3 = [
  _hoisted_5$3
];
const _hoisted_7$1$1 = {
  key: 0,
  class: "p-column-filter-row-items"
};
const _hoisted_8$2 = ["onClick", "onKeydown", "tabindex"];
const _hoisted_9$2 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("li", { class: "p-column-filter-separator" }, null, -1);
const _hoisted_10$2 = {
  key: 0,
  class: "p-column-filter-operator"
};
const _hoisted_11$2 = { class: "p-column-filter-constraints" };
const _hoisted_12$1 = {
  key: 1,
  class: "p-column-filter-add-rule"
};
const _hoisted_13$1 = { class: "p-column-filter-buttonbar" };
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CFDropdown = vue_cjs_prod.resolveComponent("CFDropdown");
  const _component_CFButton = vue_cjs_prod.resolveComponent("CFButton");
  const _component_Portal = vue_cjs_prod.resolveComponent("Portal");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    class: vue_cjs_prod.normalizeClass($options.containerClass)
  }, [
    $props.display === "row" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_1$9, [
      (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterElement), {
        field: $props.field,
        filterModel: $props.filters[$props.field],
        filterCallback: $options.filterCallback
      }, null, 8, ["field", "filterModel", "filterCallback"]))
    ])) : vue_cjs_prod.createCommentVNode("", true),
    $options.showMenuButton ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
      key: 1,
      ref: "icon",
      type: "button",
      class: vue_cjs_prod.normalizeClass(["p-column-filter-menu-button p-link", { "p-column-filter-menu-button-open": $data.overlayVisible, "p-column-filter-menu-button-active": $options.hasFilter() }]),
      "aria-haspopup": "true",
      "aria-expanded": $data.overlayVisible,
      onClick: _cache[0] || (_cache[0] = ($event) => $options.toggleMenu()),
      onKeydown: _cache[1] || (_cache[1] = ($event) => $options.onToggleButtonKeyDown($event))
    }, _hoisted_4$4, 42, _hoisted_2$7)) : vue_cjs_prod.createCommentVNode("", true),
    $props.showClearButton && $props.display === "row" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
      key: 2,
      class: vue_cjs_prod.normalizeClass([{ "p-hidden-space": !$options.hasRowFilter() }, "p-column-filter-clear-button p-link"]),
      type: "button",
      onClick: _cache[2] || (_cache[2] = ($event) => $options.clearFilter())
    }, _hoisted_6$3, 2)) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createVNode(_component_Portal, null, {
      default: vue_cjs_prod.withCtx(() => [
        vue_cjs_prod.createVNode(vue_cjs_prod.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue_cjs_prod.withCtx(() => [
            $data.overlayVisible ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
              key: 0,
              ref: $options.overlayRef,
              class: vue_cjs_prod.normalizeClass($options.overlayClass),
              onKeydown: _cache[11] || (_cache[11] = vue_cjs_prod.withKeys((...args) => $options.onEscape && $options.onEscape(...args), ["escape"])),
              onClick: _cache[12] || (_cache[12] = (...args) => $options.onContentClick && $options.onContentClick(...args)),
              onMousedown: _cache[13] || (_cache[13] = (...args) => $options.onContentMouseDown && $options.onContentMouseDown(...args))
            }, [
              (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterHeaderTemplate), {
                field: $props.field,
                filterModel: $props.filters[$props.field],
                filterCallback: $options.filterCallback
              }, null, 8, ["field", "filterModel", "filterCallback"])),
              $props.display === "row" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("ul", _hoisted_7$1$1, [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.matchModes, (matchMode, i) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", {
                    class: vue_cjs_prod.normalizeClass(["p-column-filter-row-item", { "p-highlight": $options.isRowMatchModeSelected(matchMode.value) }]),
                    key: matchMode.label,
                    onClick: ($event) => $options.onRowMatchModeChange(matchMode.value),
                    onKeydown: [
                      _cache[3] || (_cache[3] = ($event) => $options.onRowMatchModeKeyDown($event)),
                      vue_cjs_prod.withKeys(vue_cjs_prod.withModifiers(($event) => $options.onRowMatchModeChange(matchMode.value), ["prevent"]), ["enter"])
                    ],
                    tabindex: i === 0 ? "0" : null
                  }, vue_cjs_prod.toDisplayString(matchMode.label), 43, _hoisted_8$2);
                }), 128)),
                _hoisted_9$2,
                vue_cjs_prod.createElementVNode("li", {
                  class: "p-column-filter-row-item",
                  onClick: _cache[4] || (_cache[4] = ($event) => $options.clearFilter()),
                  onKeydown: [
                    _cache[5] || (_cache[5] = ($event) => $options.onRowMatchModeKeyDown($event)),
                    _cache[6] || (_cache[6] = vue_cjs_prod.withKeys(($event) => _ctx.onRowClearItemClick(), ["enter"]))
                  ]
                }, vue_cjs_prod.toDisplayString($options.noFilterLabel), 33)
              ])) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 1 }, [
                $options.isShowOperator ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_10$2, [
                  vue_cjs_prod.createVNode(_component_CFDropdown, {
                    options: $options.operatorOptions,
                    modelValue: $options.operator,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $options.onOperatorChange($event)),
                    class: "p-column-filter-operator-dropdown",
                    optionLabel: "label",
                    optionValue: "value"
                  }, null, 8, ["options", "modelValue"])
                ])) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.createElementVNode("div", _hoisted_11$2, [
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.fieldConstraints, (fieldConstraint, i) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
                      key: i,
                      class: "p-column-filter-constraint"
                    }, [
                      $options.isShowMatchModes ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_CFDropdown, {
                        key: 0,
                        options: $options.matchModes,
                        modelValue: fieldConstraint.matchMode,
                        optionLabel: "label",
                        optionValue: "value",
                        "onUpdate:modelValue": ($event) => $options.onMenuMatchModeChange($event, i),
                        class: "p-column-filter-matchmode-dropdown"
                      }, null, 8, ["options", "modelValue", "onUpdate:modelValue"])) : vue_cjs_prod.createCommentVNode("", true),
                      $props.display === "menu" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterElement), {
                        key: 1,
                        field: $props.field,
                        filterModel: fieldConstraint,
                        filterCallback: $options.filterCallback
                      }, null, 8, ["field", "filterModel", "filterCallback"])) : vue_cjs_prod.createCommentVNode("", true),
                      vue_cjs_prod.createElementVNode("div", null, [
                        $options.showRemoveIcon ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_CFButton, {
                          key: 0,
                          type: "button",
                          icon: "pi pi-trash",
                          class: "p-column-filter-remove-button p-button-text p-button-danger p-button-sm",
                          onClick: ($event) => $options.removeConstraint(i),
                          label: $options.removeRuleButtonLabel
                        }, null, 8, ["onClick", "label"])) : vue_cjs_prod.createCommentVNode("", true)
                      ])
                    ]);
                  }), 128))
                ]),
                $options.isShowAddConstraint ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_12$1, [
                  vue_cjs_prod.createVNode(_component_CFButton, {
                    type: "button",
                    label: $options.addRuleButtonLabel,
                    icon: "pi pi-plus",
                    class: "p-column-filter-add-button p-button-text p-button-sm",
                    onClick: _cache[8] || (_cache[8] = ($event) => $options.addConstraint())
                  }, null, 8, ["label"])
                ])) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.createElementVNode("div", _hoisted_13$1, [
                  !$props.filterClearTemplate && $props.showClearButton ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_CFButton, {
                    key: 0,
                    type: "button",
                    class: "p-button-outlined p-button-sm",
                    onClick: _cache[9] || (_cache[9] = ($event) => $options.clearFilter()),
                    label: $options.clearButtonLabel
                  }, null, 8, ["label"])) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterClearTemplate), {
                    key: 1,
                    field: $props.field,
                    filterModel: $props.filters[$props.field],
                    filterCallback: $options.clearFilter
                  }, null, 8, ["field", "filterModel", "filterCallback"])),
                  $props.showApplyButton ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 2 }, [
                    !$props.filterApplyTemplate ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_CFButton, {
                      key: 0,
                      type: "button",
                      class: "p-button-sm",
                      onClick: _cache[10] || (_cache[10] = ($event) => $options.applyFilter()),
                      label: $options.applyButtonLabel
                    }, null, 8, ["label"])) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterApplyTemplate), {
                      key: 1,
                      field: $props.field,
                      filterModel: $props.filters[$props.field],
                      filterCallback: $options.applyFilter
                    }, null, 8, ["field", "filterModel", "filterCallback"]))
                  ], 64)) : vue_cjs_prod.createCommentVNode("", true)
                ])
              ], 64)),
              (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.filterFooterTemplate), {
                field: $props.field,
                filterModel: $props.filters[$props.field],
                filterCallback: $options.filterCallback
              }, null, 8, ["field", "filterModel", "filterCallback"]))
            ], 34)) : vue_cjs_prod.createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 1
    })
  ], 2);
}
script$9.render = render$9;
var script$8 = {
  name: "HeaderCell",
  emits: [
    "column-click",
    "column-mousedown",
    "column-dragstart",
    "column-dragover",
    "column-dragleave",
    "column-drop",
    "column-resizestart",
    "checkbox-change",
    "filter-change",
    "filter-apply",
    "operator-change",
    "matchmode-change",
    "constraint-add",
    "constraint-remove",
    "filter-clear",
    "apply-click"
  ],
  props: {
    column: {
      type: Object,
      default: null
    },
    resizableColumns: {
      type: Boolean,
      default: false
    },
    groupRowsBy: {
      type: [Array, String],
      default: null
    },
    sortMode: {
      type: String,
      default: "single"
    },
    groupRowSortField: {
      type: [String, Function],
      default: null
    },
    sortField: {
      type: [String, Function],
      default: null
    },
    sortOrder: {
      type: Number,
      default: null
    },
    multiSortMeta: {
      type: Array,
      default: null
    },
    allRowsSelected: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    filterDisplay: {
      type: String,
      default: null
    },
    filters: {
      type: Object,
      default: null
    },
    filtersStore: {
      type: Object,
      default: null
    },
    filterColumn: {
      type: Boolean,
      default: false
    },
    reorderableColumns: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObject: {}
    };
  },
  mounted() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    onClick(event2) {
      this.$emit("column-click", { originalEvent: event2, column: this.column });
    },
    onKeyDown(event2) {
      if (event2.which === 13 && event2.currentTarget.nodeName === "TH" && DomHandler.hasClass(event2.currentTarget, "p-sortable-column")) {
        this.$emit("column-click", { originalEvent: event2, column: this.column });
      }
    },
    onMouseDown(event2) {
      this.$emit("column-mousedown", { originalEvent: event2, column: this.column });
    },
    onDragStart(event2) {
      this.$emit("column-dragstart", event2);
    },
    onDragOver(event2) {
      this.$emit("column-dragover", event2);
    },
    onDragLeave(event2) {
      this.$emit("column-dragleave", event2);
    },
    onDrop(event2) {
      this.$emit("column-drop", event2);
    },
    onResizeStart(event2) {
      this.$emit("column-resizestart", event2);
    },
    getMultiSortMetaIndex() {
      return this.multiSortMeta.findIndex((meta2) => meta2.field === this.columnProp("field") || meta2.field === this.columnProp("sortField"));
    },
    getBadgeValue() {
      let index = this.getMultiSortMetaIndex();
      return this.groupRowsBy && this.groupRowsBy === this.groupRowSortField && index > -1 ? index : index + 1;
    },
    isMultiSorted() {
      return this.sortMode === "multiple" && this.columnProp("sortable") && this.getMultiSortMetaIndex() > -1;
    },
    isColumnSorted() {
      return this.sortMode === "single" ? this.sortField && (this.sortField === this.columnProp("field") || this.sortField === this.columnProp("sortField")) : this.isMultiSorted();
    },
    updateStickyPosition() {
      if (this.columnProp("frozen")) {
        let align = this.columnProp("alignFrozen");
        if (align === "right") {
          let right = 0;
          let next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + "px";
        } else {
          let left = 0;
          let prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + "px";
        }
        let filterRow = this.$el.parentElement.nextElementSibling;
        if (filterRow) {
          let index = DomHandler.index(this.$el);
          filterRow.children[index].style.left = this.styleObject.left;
          filterRow.children[index].style.right = this.styleObject.right;
        }
      }
    },
    onHeaderCheckboxChange(event2) {
      this.$emit("checkbox-change", event2);
    }
  },
  computed: {
    containerClass() {
      return [this.filterColumn ? this.columnProp("filterHeaderClass") : this.columnProp("headerClass"), this.columnProp("class"), {
        "p-sortable-column": this.columnProp("sortable"),
        "p-resizable-column": this.resizableColumns,
        "p-highlight": this.isColumnSorted(),
        "p-filter-column": this.filterColumn,
        "p-frozen-column": this.columnProp("frozen"),
        "p-reorderable-column": this.reorderableColumns
      }];
    },
    containerStyle() {
      let headerStyle = this.filterColumn ? this.columnProp("filterHeaderStyle") : this.columnProp("headerStyle");
      let columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, headerStyle, this.styleObject] : [columnStyle, headerStyle];
    },
    sortableColumnIcon() {
      let sorted = false;
      let sortOrder = null;
      if (this.sortMode === "single") {
        sorted = this.sortField && (this.sortField === this.columnProp("field") || this.sortField === this.columnProp("sortField"));
        sortOrder = sorted ? this.sortOrder : 0;
      } else if (this.sortMode === "multiple") {
        let metaIndex = this.getMultiSortMetaIndex();
        if (metaIndex > -1) {
          sorted = true;
          sortOrder = this.multiSortMeta[metaIndex].order;
        }
      }
      return [
        "p-sortable-column-icon pi pi-fw",
        {
          "pi-sort-alt": !sorted,
          "pi-sort-amount-up-alt": sorted && sortOrder > 0,
          "pi-sort-amount-down": sorted && sortOrder < 0
        }
      ];
    },
    ariaSort() {
      if (this.columnProp("sortable")) {
        const sortIcon = this.sortableColumnIcon;
        if (sortIcon[1]["pi-sort-amount-down"])
          return "descending";
        else if (sortIcon[1]["pi-sort-amount-up-alt"])
          return "ascending";
        else
          return "none";
      } else {
        return null;
      }
    }
  },
  components: {
    "DTHeaderCheckbox": script$a,
    "DTColumnFilter": script$9
  }
};
const _hoisted_1$8 = ["tabindex", "colspan", "rowspan", "aria-sort"];
const _hoisted_2$6 = { class: "p-column-header-content" };
const _hoisted_3$5 = {
  key: 1,
  class: "p-column-title"
};
const _hoisted_4$3$1 = {
  key: 3,
  class: "p-sortable-column-badge"
};
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTHeaderCheckbox = vue_cjs_prod.resolveComponent("DTHeaderCheckbox");
  const _component_DTColumnFilter = vue_cjs_prod.resolveComponent("DTColumnFilter");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("th", {
    style: vue_cjs_prod.normalizeStyle($options.containerStyle),
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    tabindex: $options.columnProp("sortable") ? "0" : null,
    role: "cell",
    onClick: _cache[8] || (_cache[8] = (...args) => $options.onClick && $options.onClick(...args)),
    onKeydown: _cache[9] || (_cache[9] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
    onMousedown: _cache[10] || (_cache[10] = (...args) => $options.onMouseDown && $options.onMouseDown(...args)),
    onDragstart: _cache[11] || (_cache[11] = (...args) => $options.onDragStart && $options.onDragStart(...args)),
    onDragover: _cache[12] || (_cache[12] = (...args) => $options.onDragOver && $options.onDragOver(...args)),
    onDragleave: _cache[13] || (_cache[13] = (...args) => $options.onDragLeave && $options.onDragLeave(...args)),
    onDrop: _cache[14] || (_cache[14] = (...args) => $options.onDrop && $options.onDrop(...args)),
    colspan: $options.columnProp("colspan"),
    rowspan: $options.columnProp("rowspan"),
    "aria-sort": $options.ariaSort
  }, [
    $props.resizableColumns && !$options.columnProp("frozen") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
      key: 0,
      class: "p-column-resizer",
      onMousedown: _cache[0] || (_cache[0] = (...args) => $options.onResizeStart && $options.onResizeStart(...args))
    }, null, 32)) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createElementVNode("div", _hoisted_2$6, [
      $props.column.children && $props.column.children.header ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.header), {
        key: 0,
        column: $props.column
      }, null, 8, ["column"])) : vue_cjs_prod.createCommentVNode("", true),
      $options.columnProp("header") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_3$5, vue_cjs_prod.toDisplayString($options.columnProp("header")), 1)) : vue_cjs_prod.createCommentVNode("", true),
      $options.columnProp("sortable") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
        key: 2,
        class: vue_cjs_prod.normalizeClass($options.sortableColumnIcon)
      }, null, 2)) : vue_cjs_prod.createCommentVNode("", true),
      $options.isMultiSorted() ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_4$3$1, vue_cjs_prod.toDisplayString($options.getBadgeValue()), 1)) : vue_cjs_prod.createCommentVNode("", true),
      $options.columnProp("selectionMode") === "multiple" && $props.filterDisplay !== "row" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTHeaderCheckbox, {
        key: 4,
        checked: $props.allRowsSelected,
        onChange: $options.onHeaderCheckboxChange,
        disabled: $props.empty
      }, null, 8, ["checked", "onChange", "disabled"])) : vue_cjs_prod.createCommentVNode("", true),
      $props.filterDisplay === "menu" && $props.column.children && $props.column.children.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTColumnFilter, {
        key: 5,
        field: $options.columnProp("filterField") || $options.columnProp("field"),
        type: $options.columnProp("dataType"),
        display: "menu",
        showMenu: $options.columnProp("showFilterMenu"),
        filterElement: $props.column.children && $props.column.children.filter,
        filterHeaderTemplate: $props.column.children && $props.column.children.filterheader,
        filterFooterTemplate: $props.column.children && $props.column.children.filterfooter,
        filterClearTemplate: $props.column.children && $props.column.children.filterclear,
        filterApplyTemplate: $props.column.children && $props.column.children.filterapply,
        filters: $props.filters,
        filtersStore: $props.filtersStore,
        onFilterChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("filter-change", $event)),
        onFilterApply: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("filter-apply")),
        filterMenuStyle: $options.columnProp("filterMenuStyle"),
        filterMenuClass: $options.columnProp("filterMenuClass"),
        showOperator: $options.columnProp("showFilterOperator"),
        showClearButton: $options.columnProp("showClearButton"),
        showApplyButton: $options.columnProp("showApplyButton"),
        showMatchModes: $options.columnProp("showFilterMatchModes"),
        showAddButton: $options.columnProp("showAddButton"),
        matchModeOptions: $options.columnProp("filterMatchModeOptions"),
        maxConstraints: $options.columnProp("maxConstraints"),
        onOperatorChange: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("operator-change", $event)),
        onMatchmodeChange: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("matchmode-change", $event)),
        onConstraintAdd: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("constraint-add", $event)),
        onConstraintRemove: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("constraint-remove", $event)),
        onApplyClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("apply-click", $event))
      }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filters", "filtersStore", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints"])) : vue_cjs_prod.createCommentVNode("", true)
    ])
  ], 46, _hoisted_1$8);
}
script$8.render = render$8;
var script$7 = {
  name: "TableHeader",
  emits: [
    "column-click",
    "column-mousedown",
    "column-dragstart",
    "column-dragover",
    "column-dragleave",
    "column-drop",
    "column-resizestart",
    "checkbox-change",
    "filter-change",
    "filter-apply",
    "operator-change",
    "matchmode-change",
    "constraint-add",
    "constraint-remove",
    "filter-clear",
    "apply-click"
  ],
  props: {
    columnGroup: {
      type: null,
      default: null
    },
    columns: {
      type: null,
      default: null
    },
    rowGroupMode: {
      type: String,
      default: null
    },
    groupRowsBy: {
      type: [Array, String],
      default: null
    },
    resizableColumns: {
      type: Boolean,
      default: false
    },
    allRowsSelected: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    sortMode: {
      type: String,
      default: "single"
    },
    groupRowSortField: {
      type: [String, Function],
      default: null
    },
    sortField: {
      type: [String, Function],
      default: null
    },
    sortOrder: {
      type: Number,
      default: null
    },
    multiSortMeta: {
      type: Array,
      default: null
    },
    filterDisplay: {
      type: String,
      default: null
    },
    filters: {
      type: Object,
      default: null
    },
    filtersStore: {
      type: Object,
      default: null
    },
    reorderableColumns: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    getFilterColumnHeaderClass(column) {
      return ["p-filter-column", this.columnProp(column, "filterHeaderClass"), this.columnProp(column, "class"), {
        "p-frozen-column": this.columnProp(column, "frozen")
      }];
    },
    getFilterColumnHeaderStyle(column) {
      return [this.columnProp(column, "filterHeaderStyle"), this.columnProp(column, "style")];
    },
    getHeaderRows() {
      let rows = [];
      let columnGroup = this.columnGroup;
      if (columnGroup.children && columnGroup.children.default) {
        for (let child of columnGroup.children.default()) {
          if (child.type.name === "Row") {
            rows.push(child);
          } else if (child.children && child.children instanceof Array) {
            rows = child.children;
          }
        }
        return rows;
      }
    },
    getHeaderColumns(row) {
      let cols = [];
      if (row.children && row.children.default) {
        row.children.default().forEach((child) => {
          if (child.children && child.children instanceof Array)
            cols = [...cols, ...child.children];
          else if (child.type.name === "Column")
            cols.push(child);
        });
        return cols;
      }
    }
  },
  components: {
    "DTHeaderCell": script$8,
    "DTHeaderCheckbox": script$a,
    "DTColumnFilter": script$9
  }
};
const _hoisted_1$7 = {
  class: "p-datatable-thead",
  role: "rowgroup"
};
const _hoisted_2$5 = { role: "row" };
const _hoisted_3$4 = {
  key: 0,
  role: "row"
};
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTHeaderCell = vue_cjs_prod.resolveComponent("DTHeaderCell");
  const _component_DTHeaderCheckbox = vue_cjs_prod.resolveComponent("DTHeaderCheckbox");
  const _component_DTColumnFilter = vue_cjs_prod.resolveComponent("DTColumnFilter");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("thead", _hoisted_1$7, [
    !$props.columnGroup ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 0 }, [
      vue_cjs_prod.createElementVNode("tr", _hoisted_2$5, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.columns, (col, i) => {
          return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
            key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
          }, [
            !$options.columnProp(col, "hidden") && ($props.rowGroupMode !== "subheader" || $props.groupRowsBy !== $options.columnProp(col, "field")) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTHeaderCell, {
              key: 0,
              column: col,
              onColumnClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("column-click", $event)),
              onColumnMousedown: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("column-mousedown", $event)),
              onColumnDragstart: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("column-dragstart", $event)),
              onColumnDragover: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("column-dragover", $event)),
              onColumnDragleave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("column-dragleave", $event)),
              onColumnDrop: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("column-drop", $event)),
              groupRowsBy: $props.groupRowsBy,
              groupRowSortField: $props.groupRowSortField,
              reorderableColumns: $props.reorderableColumns,
              resizableColumns: $props.resizableColumns,
              onColumnResizestart: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("column-resizestart", $event)),
              sortMode: $props.sortMode,
              sortField: $props.sortField,
              sortOrder: $props.sortOrder,
              multiSortMeta: $props.multiSortMeta,
              allRowsSelected: $props.allRowsSelected,
              empty: $props.empty,
              onCheckboxChange: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("checkbox-change", $event)),
              filters: $props.filters,
              filterDisplay: $props.filterDisplay,
              filtersStore: $props.filtersStore,
              onFilterChange: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("filter-change", $event)),
              onFilterApply: _cache[9] || (_cache[9] = ($event) => _ctx.$emit("filter-apply")),
              onOperatorChange: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("operator-change", $event)),
              onMatchmodeChange: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("matchmode-change", $event)),
              onConstraintAdd: _cache[12] || (_cache[12] = ($event) => _ctx.$emit("constraint-add", $event)),
              onConstraintRemove: _cache[13] || (_cache[13] = ($event) => _ctx.$emit("constraint-remove", $event)),
              onApplyClick: _cache[14] || (_cache[14] = ($event) => _ctx.$emit("apply-click", $event))
            }, null, 8, ["column", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore"])) : vue_cjs_prod.createCommentVNode("", true)
          ], 64);
        }), 128))
      ]),
      $props.filterDisplay === "row" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", _hoisted_3$4, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.columns, (col, i) => {
          return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
            key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
          }, [
            !$options.columnProp(col, "hidden") && ($props.rowGroupMode !== "subheader" || $props.groupRowsBy !== $options.columnProp(col, "field")) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("th", {
              key: 0,
              style: vue_cjs_prod.normalizeStyle($options.getFilterColumnHeaderStyle(col)),
              class: vue_cjs_prod.normalizeClass($options.getFilterColumnHeaderClass(col))
            }, [
              $options.columnProp(col, "selectionMode") === "multiple" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTHeaderCheckbox, {
                key: 0,
                checked: $props.allRowsSelected,
                onChange: _cache[15] || (_cache[15] = ($event) => _ctx.$emit("checkbox-change", $event)),
                disabled: $props.empty
              }, null, 8, ["checked", "disabled"])) : vue_cjs_prod.createCommentVNode("", true),
              col.children && col.children.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTColumnFilter, {
                key: 1,
                field: $options.columnProp(col, "filterField") || $options.columnProp(col, "field"),
                type: $options.columnProp(col, "dataType"),
                display: "row",
                showMenu: $options.columnProp(col, "showFilterMenu"),
                filterElement: col.children && col.children.filter,
                filterHeaderTemplate: col.children && col.children.filterheader,
                filterFooterTemplate: col.children && col.children.filterfooter,
                filterClearTemplate: col.children && col.children.filterclear,
                filterApplyTemplate: col.children && col.children.filterapply,
                filters: $props.filters,
                filtersStore: $props.filtersStore,
                onFilterChange: _cache[16] || (_cache[16] = ($event) => _ctx.$emit("filter-change", $event)),
                onFilterApply: _cache[17] || (_cache[17] = ($event) => _ctx.$emit("filter-apply")),
                filterMenuStyle: $options.columnProp(col, "filterMenuStyle"),
                filterMenuClass: $options.columnProp(col, "filterMenuClass"),
                showOperator: $options.columnProp(col, "showFilterOperator"),
                showClearButton: $options.columnProp(col, "showClearButton"),
                showApplyButton: $options.columnProp(col, "showApplyButton"),
                showMatchModes: $options.columnProp(col, "showFilterMatchModes"),
                showAddButton: $options.columnProp(col, "showAddButton"),
                matchModeOptions: $options.columnProp(col, "filterMatchModeOptions"),
                maxConstraints: $options.columnProp(col, "maxConstraints"),
                onOperatorChange: _cache[18] || (_cache[18] = ($event) => _ctx.$emit("operator-change", $event)),
                onMatchmodeChange: _cache[19] || (_cache[19] = ($event) => _ctx.$emit("matchmode-change", $event)),
                onConstraintAdd: _cache[20] || (_cache[20] = ($event) => _ctx.$emit("constraint-add", $event)),
                onConstraintRemove: _cache[21] || (_cache[21] = ($event) => _ctx.$emit("constraint-remove", $event)),
                onApplyClick: _cache[22] || (_cache[22] = ($event) => _ctx.$emit("apply-click", $event))
              }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filters", "filtersStore", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints"])) : vue_cjs_prod.createCommentVNode("", true)
            ], 6)) : vue_cjs_prod.createCommentVNode("", true)
          ], 64);
        }), 128))
      ])) : vue_cjs_prod.createCommentVNode("", true)
    ], 64)) : (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 1 }, vue_cjs_prod.renderList($options.getHeaderRows(), (row, i) => {
      return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
        key: i,
        role: "row"
      }, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.getHeaderColumns(row), (col, j) => {
          return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
            key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || j
          }, [
            !$options.columnProp(col, "hidden") && ($props.rowGroupMode !== "subheader" || $props.groupRowsBy !== $options.columnProp(col, "field")) && typeof col.children !== "string" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTHeaderCell, {
              key: 0,
              column: col,
              onColumnClick: _cache[23] || (_cache[23] = ($event) => _ctx.$emit("column-click", $event)),
              onColumnMousedown: _cache[24] || (_cache[24] = ($event) => _ctx.$emit("column-mousedown", $event)),
              groupRowsBy: $props.groupRowsBy,
              groupRowSortField: $props.groupRowSortField,
              sortMode: $props.sortMode,
              sortField: $props.sortField,
              sortOrder: $props.sortOrder,
              multiSortMeta: $props.multiSortMeta,
              allRowsSelected: $props.allRowsSelected,
              empty: $props.empty,
              onCheckboxChange: _cache[25] || (_cache[25] = ($event) => _ctx.$emit("checkbox-change", $event)),
              filters: $props.filters,
              filterDisplay: $props.filterDisplay,
              filtersStore: $props.filtersStore,
              onFilterChange: _cache[26] || (_cache[26] = ($event) => _ctx.$emit("filter-change", $event)),
              onFilterApply: _cache[27] || (_cache[27] = ($event) => _ctx.$emit("filter-apply")),
              onOperatorChange: _cache[28] || (_cache[28] = ($event) => _ctx.$emit("operator-change", $event)),
              onMatchmodeChange: _cache[29] || (_cache[29] = ($event) => _ctx.$emit("matchmode-change", $event)),
              onConstraintAdd: _cache[30] || (_cache[30] = ($event) => _ctx.$emit("constraint-add", $event)),
              onConstraintRemove: _cache[31] || (_cache[31] = ($event) => _ctx.$emit("constraint-remove", $event)),
              onApplyClick: _cache[32] || (_cache[32] = ($event) => _ctx.$emit("apply-click", $event))
            }, null, 8, ["column", "groupRowsBy", "groupRowSortField", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore"])) : vue_cjs_prod.createCommentVNode("", true)
          ], 64);
        }), 128))
      ]);
    }), 128))
  ]);
}
script$7.render = render$7;
var script$6 = {
  name: "RowRadioButton",
  inheritAttrs: false,
  emits: ["change"],
  props: {
    value: null,
    checked: null
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick(event2) {
      if (!this.disabled) {
        if (!this.checked) {
          this.$emit("change", {
            originalEvent: event2,
            data: this.value
          });
        }
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
};
const _hoisted_1$6 = ["aria-checked"];
const _hoisted_2$4 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("div", { class: "p-radiobutton-icon" }, null, -1);
const _hoisted_3$3$1 = [
  _hoisted_2$4
];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    class: vue_cjs_prod.normalizeClass(["p-radiobutton p-component", { "p-radiobutton-focused": $data.focused }]),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
    tabindex: "0",
    onFocus: _cache[1] || (_cache[1] = ($event) => $options.onFocus($event)),
    onBlur: _cache[2] || (_cache[2] = ($event) => $options.onBlur($event)),
    onKeydown: _cache[3] || (_cache[3] = vue_cjs_prod.withKeys(vue_cjs_prod.withModifiers((...args) => $options.onClick && $options.onClick(...args), ["prevent"]), ["space"]))
  }, [
    vue_cjs_prod.createElementVNode("div", {
      ref: "box",
      class: vue_cjs_prod.normalizeClass(["p-radiobutton-box p-component", { "p-highlight": $props.checked, "p-disabled": _ctx.$attrs.disabled, "p-focus": $data.focused }]),
      role: "radio",
      "aria-checked": $props.checked
    }, _hoisted_3$3$1, 10, _hoisted_1$6)
  ], 34);
}
script$6.render = render$6;
var script$5 = {
  name: "RowCheckbox",
  inheritAttrs: false,
  emits: ["change"],
  props: {
    value: null,
    checked: null
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick(event2) {
      if (!this.$attrs.disabled) {
        this.focused = true;
        this.$emit("change", {
          originalEvent: event2,
          data: this.value
        });
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
};
const _hoisted_1$5 = ["aria-checked", "tabindex"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    class: vue_cjs_prod.normalizeClass(["p-checkbox p-component", { "p-checkbox-focused": $data.focused }]),
    onClick: _cache[3] || (_cache[3] = vue_cjs_prod.withModifiers((...args) => $options.onClick && $options.onClick(...args), ["stop", "prevent"]))
  }, [
    vue_cjs_prod.createElementVNode("div", {
      ref: "box",
      class: vue_cjs_prod.normalizeClass(["p-checkbox-box p-component", { "p-highlight": $props.checked, "p-disabled": _ctx.$attrs.disabled, "p-focus": $data.focused }]),
      role: "checkbox",
      "aria-checked": $props.checked,
      tabindex: _ctx.$attrs.disabled ? null : "0",
      onKeydown: _cache[0] || (_cache[0] = vue_cjs_prod.withKeys(vue_cjs_prod.withModifiers((...args) => $options.onClick && $options.onClick(...args), ["prevent"]), ["space"])),
      onFocus: _cache[1] || (_cache[1] = ($event) => $options.onFocus($event)),
      onBlur: _cache[2] || (_cache[2] = ($event) => $options.onBlur($event))
    }, [
      vue_cjs_prod.createElementVNode("span", {
        class: vue_cjs_prod.normalizeClass(["p-checkbox-icon", { "pi pi-check": $props.checked }])
      }, null, 2)
    ], 42, _hoisted_1$5)
  ], 2);
}
script$5.render = render$5;
var script$4$1 = {
  name: "BodyCell",
  emits: [
    "cell-edit-init",
    "cell-edit-complete",
    "cell-edit-cancel",
    "row-edit-init",
    "row-edit-save",
    "row-edit-cancel",
    "row-toggle",
    "radio-change",
    "checkbox-change",
    "editing-meta-change"
  ],
  props: {
    rowData: {
      type: Object,
      default: null
    },
    column: {
      type: Object,
      default: null
    },
    frozenRow: {
      type: Boolean,
      default: false
    },
    rowIndex: {
      type: Number,
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    rowTogglerIcon: {
      type: Array,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    editing: {
      type: Boolean,
      default: false
    },
    editingMeta: {
      type: Object,
      default: null
    },
    editMode: {
      type: String,
      default: null
    },
    responsiveLayout: {
      type: String,
      default: "stack"
    },
    virtualScrollerContentProps: {
      type: Object,
      default: null
    }
  },
  documentEditListener: null,
  selfClick: false,
  overlayEventListener: null,
  data() {
    return {
      d_editing: this.editing,
      styleObject: {}
    };
  },
  watch: {
    editing(newValue) {
      this.d_editing = newValue;
    },
    "$data.d_editing": function(newValue) {
      this.$emit("editing-meta-change", { data: this.rowData, field: this.field || `field_${this.index}`, index: this.rowIndex, editing: newValue });
    }
  },
  mounted() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
    if (this.d_editing && (this.editMode === "cell" || this.editMode === "row" && this.columnProp("rowEditor"))) {
      const focusableEl = DomHandler.getFirstFocusableElement(this.$el);
      focusableEl && focusableEl.focus();
    }
  },
  beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus.off("overlay-click", this.overlayEventListener);
      this.overlayEventListener = null;
    }
  },
  methods: {
    columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    resolveFieldData() {
      return ObjectUtils.resolveFieldData(this.rowData, this.field);
    },
    toggleRow(event2) {
      this.$emit("row-toggle", {
        originalEvent: event2,
        data: this.rowData
      });
    },
    toggleRowWithRadio(event2, index) {
      this.$emit("radio-change", { originalEvent: event2.originalEvent, index, data: event2.data });
    },
    toggleRowWithCheckbox(event2, index) {
      this.$emit("checkbox-change", { originalEvent: event2.originalEvent, index, data: event2.data });
    },
    isEditable() {
      return this.column.children && this.column.children.editor != null;
    },
    bindDocumentEditListener() {
      if (!this.documentEditListener) {
        this.documentEditListener = (event2) => {
          if (!this.selfClick) {
            this.completeEdit(event2, "outside");
          }
          this.selfClick = false;
        };
        document.addEventListener("click", this.documentEditListener);
      }
    },
    unbindDocumentEditListener() {
      if (this.documentEditListener) {
        document.removeEventListener("click", this.documentEditListener);
        this.documentEditListener = null;
        this.selfClick = false;
      }
    },
    switchCellToViewMode() {
      this.d_editing = false;
      this.unbindDocumentEditListener();
      OverlayEventBus.off("overlay-click", this.overlayEventListener);
      this.overlayEventListener = null;
    },
    onClick(event2) {
      if (this.editMode === "cell" && this.isEditable()) {
        this.selfClick = true;
        if (!this.d_editing) {
          this.d_editing = true;
          this.bindDocumentEditListener();
          this.$emit("cell-edit-init", { originalEvent: event2, data: this.rowData, field: this.field, index: this.rowIndex });
          this.overlayEventListener = (e) => {
            if (this.$el && this.$el.contains(e.target)) {
              this.selfClick = true;
            }
          };
          OverlayEventBus.on("overlay-click", this.overlayEventListener);
        }
      }
    },
    completeEdit(event2, type) {
      const completeEvent = {
        originalEvent: event2,
        data: this.rowData,
        newData: this.editingRowData,
        value: this.rowData[this.field],
        newValue: this.editingRowData[this.field],
        field: this.field,
        index: this.rowIndex,
        type,
        defaultPrevented: false,
        preventDefault: function() {
          this.defaultPrevented = true;
        }
      };
      this.$emit("cell-edit-complete", completeEvent);
      if (!completeEvent.defaultPrevented) {
        this.switchCellToViewMode();
      }
    },
    onKeyDown(event2) {
      if (this.editMode === "cell") {
        switch (event2.which) {
          case 13:
            this.completeEdit(event2, "enter");
            break;
          case 27:
            this.switchCellToViewMode();
            this.$emit("cell-edit-cancel", { originalEvent: event2, data: this.rowData, field: this.field, index: this.rowIndex });
            break;
          case 9:
            this.completeEdit(event2, "tab");
            if (event2.shiftKey)
              this.moveToPreviousCell(event2);
            else
              this.moveToNextCell(event2);
            break;
        }
      }
    },
    moveToPreviousCell(event2) {
      let currentCell = this.findCell(event2.target);
      let targetCell = this.findPreviousEditableColumn(currentCell);
      if (targetCell) {
        DomHandler.invokeElementMethod(targetCell, "click");
        event2.preventDefault();
      }
    },
    moveToNextCell(event2) {
      let currentCell = this.findCell(event2.target);
      let targetCell = this.findNextEditableColumn(currentCell);
      if (targetCell) {
        DomHandler.invokeElementMethod(targetCell, "click");
        event2.preventDefault();
      }
    },
    findCell(element) {
      if (element) {
        let cell = element;
        while (cell && !DomHandler.hasClass(cell, "p-cell-editing")) {
          cell = cell.parentElement;
        }
        return cell;
      } else {
        return null;
      }
    },
    findPreviousEditableColumn(cell) {
      let prevCell = cell.previousElementSibling;
      if (!prevCell) {
        let previousRow = cell.parentElement.previousElementSibling;
        if (previousRow) {
          prevCell = previousRow.lastElementChild;
        }
      }
      if (prevCell) {
        if (DomHandler.hasClass(prevCell, "p-editable-column"))
          return prevCell;
        else
          return this.findPreviousEditableColumn(prevCell);
      } else {
        return null;
      }
    },
    findNextEditableColumn(cell) {
      let nextCell = cell.nextElementSibling;
      if (!nextCell) {
        let nextRow = cell.parentElement.nextElementSibling;
        if (nextRow) {
          nextCell = nextRow.firstElementChild;
        }
      }
      if (nextCell) {
        if (DomHandler.hasClass(nextCell, "p-editable-column"))
          return nextCell;
        else
          return this.findNextEditableColumn(nextCell);
      } else {
        return null;
      }
    },
    isEditingCellValid() {
      return DomHandler.find(this.$el, ".p-invalid").length === 0;
    },
    onRowEditInit(event2) {
      this.$emit("row-edit-init", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
    },
    onRowEditSave(event2) {
      this.$emit("row-edit-save", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
    },
    onRowEditCancel(event2) {
      this.$emit("row-edit-cancel", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
    },
    editorInitCallback(event2) {
      this.$emit("row-edit-init", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
    },
    editorSaveCallback(event2) {
      if (this.editMode === "row") {
        this.$emit("row-edit-save", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
      } else {
        this.completeEdit(event2, "enter");
      }
    },
    editorCancelCallback(event2) {
      if (this.editMode === "row") {
        this.$emit("row-edit-cancel", { originalEvent: event2, data: this.rowData, newData: this.editingRowData, field: this.field, index: this.rowIndex });
      } else {
        this.switchCellToViewMode();
        this.$emit("cell-edit-cancel", { originalEvent: event2, data: this.rowData, field: this.field, index: this.rowIndex });
      }
    },
    updateStickyPosition() {
      if (this.columnProp("frozen")) {
        let align = this.columnProp("alignFrozen");
        if (align === "right") {
          let right = 0;
          let next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + "px";
        } else {
          let left = 0;
          let prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + "px";
        }
      }
    },
    getVirtualScrollerProp(option) {
      return this.virtualScrollerContentProps ? this.virtualScrollerContentProps[option] : null;
    }
  },
  computed: {
    editingRowData() {
      return this.editingMeta[this.rowIndex] ? this.editingMeta[this.rowIndex].data : this.rowData;
    },
    field() {
      return this.columnProp("field");
    },
    containerClass() {
      return [this.columnProp("bodyClass"), this.columnProp("class"), {
        "p-selection-column": this.columnProp("selectionMode") != null,
        "p-editable-column": this.isEditable(),
        "p-cell-editing": this.d_editing,
        "p-frozen-column": this.columnProp("frozen")
      }];
    },
    containerStyle() {
      let bodyStyle = this.columnProp("bodyStyle");
      let columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    },
    loading() {
      return this.getVirtualScrollerProp("loading");
    },
    loadingOptions() {
      const getLoaderOptions = this.getVirtualScrollerProp("getLoaderOptions");
      return getLoaderOptions && getLoaderOptions(this.rowIndex, {
        cellIndex: this.index,
        cellFirst: this.index === 0,
        cellLast: this.index === this.getVirtualScrollerProp("columns").length - 1,
        cellEven: this.index % 2 === 0,
        cellOdd: this.index % 2 !== 0,
        column: this.column,
        field: this.field
      });
    }
  },
  components: {
    "DTRadioButton": script$6,
    "DTCheckbox": script$5
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "p-column-title"
};
const _hoisted_2$3$1 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-row-editor-init-icon pi pi-fw pi-pencil" }, null, -1);
const _hoisted_3$2$1 = [
  _hoisted_2$3$1
];
const _hoisted_4$2$1 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-row-editor-save-icon pi pi-fw pi-check" }, null, -1);
const _hoisted_5$2$1 = [
  _hoisted_4$2$1
];
const _hoisted_6$2 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-row-editor-cancel-icon pi pi-fw pi-times" }, null, -1);
const _hoisted_7$2 = [
  _hoisted_6$2
];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTRadioButton = vue_cjs_prod.resolveComponent("DTRadioButton");
  const _component_DTCheckbox = vue_cjs_prod.resolveComponent("DTCheckbox");
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return $options.loading ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("td", {
    key: 0,
    style: vue_cjs_prod.normalizeStyle($options.containerStyle),
    class: vue_cjs_prod.normalizeClass($options.containerClass)
  }, [
    (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.loading), {
      data: $props.rowData,
      column: $props.column,
      field: $options.field,
      index: $props.rowIndex,
      frozenRow: $props.frozenRow,
      loadingOptions: $options.loadingOptions
    }, null, 8, ["data", "column", "field", "index", "frozenRow", "loadingOptions"]))
  ], 6)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("td", {
    key: 1,
    style: vue_cjs_prod.normalizeStyle($options.containerStyle),
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    onClick: _cache[6] || (_cache[6] = (...args) => $options.onClick && $options.onClick(...args)),
    onKeydown: _cache[7] || (_cache[7] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
    role: "cell"
  }, [
    $props.responsiveLayout === "stack" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_1$4, vue_cjs_prod.toDisplayString($options.columnProp("header")), 1)) : vue_cjs_prod.createCommentVNode("", true),
    $props.column.children && $props.column.children.body && !$data.d_editing ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.body), {
      key: 1,
      data: $props.rowData,
      column: $props.column,
      field: $options.field,
      index: $props.rowIndex,
      frozenRow: $props.frozenRow,
      editorInitCallback: $options.editorInitCallback
    }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorInitCallback"])) : $props.column.children && $props.column.children.editor && $data.d_editing ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.editor), {
      key: 2,
      data: $options.editingRowData,
      column: $props.column,
      field: $options.field,
      index: $props.rowIndex,
      frozenRow: $props.frozenRow,
      editorSaveCallback: $options.editorSaveCallback,
      editorCancelCallback: $options.editorCancelCallback
    }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorSaveCallback", "editorCancelCallback"])) : $props.column.children && $props.column.children.body && !$props.column.children.editor && $data.d_editing ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.body), {
      key: 3,
      data: $options.editingRowData,
      column: $props.column,
      field: $options.field,
      index: $props.rowIndex,
      frozenRow: $props.frozenRow
    }, null, 8, ["data", "column", "field", "index", "frozenRow"])) : $options.columnProp("selectionMode") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 4 }, [
      $options.columnProp("selectionMode") === "single" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTRadioButton, {
        key: 0,
        value: $props.rowData,
        checked: $props.selected,
        onChange: _cache[0] || (_cache[0] = ($event) => $options.toggleRowWithRadio($event, $props.rowIndex))
      }, null, 8, ["value", "checked"])) : $options.columnProp("selectionMode") === "multiple" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTCheckbox, {
        key: 1,
        value: $props.rowData,
        checked: $props.selected,
        onChange: _cache[1] || (_cache[1] = ($event) => $options.toggleRowWithCheckbox($event, $props.rowIndex))
      }, null, 8, ["value", "checked"])) : vue_cjs_prod.createCommentVNode("", true)
    ], 64)) : $options.columnProp("rowReorder") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("i", {
      key: 5,
      class: vue_cjs_prod.normalizeClass(["p-datatable-reorderablerow-handle", $options.columnProp("rowReorderIcon") || "pi pi-bars"])
    }, null, 2)) : $options.columnProp("expander") ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
      key: 6,
      class: "p-row-toggler p-link",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleRow && $options.toggleRow(...args)),
      type: "button"
    }, [
      vue_cjs_prod.createElementVNode("span", {
        class: vue_cjs_prod.normalizeClass($props.rowTogglerIcon)
      }, null, 2)
    ])), [
      [_directive_ripple]
    ]) : $props.editMode === "row" && $options.columnProp("rowEditor") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 7 }, [
      !$data.d_editing ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
        key: 0,
        class: "p-row-editor-init p-link",
        onClick: _cache[3] || (_cache[3] = (...args) => $options.onRowEditInit && $options.onRowEditInit(...args)),
        type: "button"
      }, _hoisted_3$2$1)), [
        [_directive_ripple]
      ]) : vue_cjs_prod.createCommentVNode("", true),
      $data.d_editing ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
        key: 1,
        class: "p-row-editor-save p-link",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.onRowEditSave && $options.onRowEditSave(...args)),
        type: "button"
      }, _hoisted_5$2$1)), [
        [_directive_ripple]
      ]) : vue_cjs_prod.createCommentVNode("", true),
      $data.d_editing ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
        key: 2,
        class: "p-row-editor-cancel p-link",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.onRowEditCancel && $options.onRowEditCancel(...args)),
        type: "button"
      }, _hoisted_7$2)), [
        [_directive_ripple]
      ]) : vue_cjs_prod.createCommentVNode("", true)
    ], 64)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 8 }, [
      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.resolveFieldData()), 1)
    ], 64))
  ], 38));
}
script$4$1.render = render$4;
var script$3$1 = {
  name: "TableBody",
  emits: [
    "rowgroup-toggle",
    "row-click",
    "row-dblclick",
    "row-rightclick",
    "row-touchend",
    "row-keydown",
    "row-mousedown",
    "row-dragstart",
    "row-dragover",
    "row-dragleave",
    "row-dragend",
    "row-drop",
    "row-toggle",
    "radio-change",
    "checkbox-change",
    "cell-edit-init",
    "cell-edit-complete",
    "cell-edit-cancel",
    "row-edit-init",
    "row-edit-save",
    "row-edit-cancel",
    "editing-meta-change"
  ],
  props: {
    value: {
      type: Array,
      default: null
    },
    columns: {
      type: null,
      default: null
    },
    frozenRow: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    rowGroupMode: {
      type: String,
      default: null
    },
    groupRowsBy: {
      type: [Array, String],
      default: null
    },
    expandableRowGroups: {
      type: Boolean,
      default: false
    },
    expandedRowGroups: {
      type: Array,
      default: null
    },
    dataKey: {
      type: String,
      default: null
    },
    expandedRowIcon: {
      type: String,
      default: null
    },
    collapsedRowIcon: {
      type: String,
      default: null
    },
    expandedRows: {
      type: Array,
      default: null
    },
    expandedRowKeys: {
      type: null,
      default: null
    },
    selection: {
      type: [Array, Object],
      default: null
    },
    selectionKeys: {
      type: null,
      default: null
    },
    selectionMode: {
      type: String,
      default: null
    },
    contextMenu: {
      type: Boolean,
      default: false
    },
    contextMenuSelection: {
      type: Object,
      default: null
    },
    rowClass: {
      type: null,
      default: null
    },
    rowStyle: {
      type: null,
      default: null
    },
    editMode: {
      type: String,
      default: null
    },
    compareSelectionBy: {
      type: String,
      default: "deepEquals"
    },
    editingRows: {
      type: Array,
      default: null
    },
    editingRowKeys: {
      type: null,
      default: null
    },
    editingMeta: {
      type: Object,
      default: null
    },
    templates: {
      type: null,
      default: null
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    responsiveLayout: {
      type: String,
      default: "stack"
    },
    virtualScrollerContentProps: {
      type: Object,
      default: null
    },
    isVirtualScrollerDisabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    virtualScrollerContentProps(newValue, oldValue) {
      if (!this.isVirtualScrollerDisabled && this.getVirtualScrollerProp("vertical") && this.getVirtualScrollerProp("itemSize", oldValue) !== this.getVirtualScrollerProp("itemSize", newValue)) {
        this.updateVirtualScrollerPosition();
      }
    }
  },
  mounted() {
    if (this.frozenRow) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.scrollable && this.rowGroupMode === "subheader") {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
    if (!this.isVirtualScrollerDisabled && this.getVirtualScrollerProp("vertical")) {
      this.updateVirtualScrollerPosition();
    }
  },
  updated() {
    if (this.frozenRow) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.scrollable && this.rowGroupMode === "subheader") {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
  },
  data() {
    return {
      rowGroupHeaderStyleObject: {}
    };
  },
  methods: {
    columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    shouldRenderRowGroupHeader(value, rowData, i) {
      let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
      let prevRowData = value[i - 1];
      if (prevRowData) {
        let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.groupRowsBy);
        return currentRowFieldData !== previousRowFieldData;
      } else {
        return true;
      }
    },
    getRowKey(rowData, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(rowData, this.dataKey) : index;
    },
    getRowIndex(index) {
      const getItemOptions = this.getVirtualScrollerProp("getItemOptions");
      return getItemOptions ? getItemOptions(index).index : index;
    },
    getRowClass(rowData) {
      let rowStyleClass = [];
      if (this.selectionMode) {
        rowStyleClass.push("p-selectable-row");
      }
      if (this.selection) {
        rowStyleClass.push({
          "p-highlight": this.isSelected(rowData)
        });
      }
      if (this.contextMenuSelection) {
        rowStyleClass.push({
          "p-highlight-contextmenu": this.isSelectedWithContextMenu(rowData)
        });
      }
      if (this.rowClass) {
        let rowClassValue = this.rowClass(rowData);
        if (rowClassValue) {
          rowStyleClass.push(rowClassValue);
        }
      }
      return rowStyleClass;
    },
    shouldRenderRowGroupFooter(value, rowData, i) {
      if (this.expandableRowGroups && !this.isRowGroupExpanded(rowData)) {
        return false;
      } else {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        let nextRowData = value[i + 1];
        if (nextRowData) {
          let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.groupRowsBy);
          return currentRowFieldData !== nextRowFieldData;
        } else {
          return true;
        }
      }
    },
    shouldRenderBodyCell(value, column, i) {
      if (this.rowGroupMode) {
        if (this.rowGroupMode === "subheader") {
          return this.groupRowsBy !== this.columnProp(column, "field");
        } else if (this.rowGroupMode === "rowspan") {
          if (this.isGrouped(column)) {
            let prevRowData = value[i - 1];
            if (prevRowData) {
              let currentRowFieldData = ObjectUtils.resolveFieldData(value[i], this.columnProp(column, "field"));
              let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.columnProp(column, "field"));
              return currentRowFieldData !== previousRowFieldData;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        return !this.columnProp(column, "hidden");
      }
    },
    calculateRowGroupSize(value, column, index) {
      if (this.isGrouped(column)) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(value[index], this.columnProp(column, "field"));
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
          groupRowSpan++;
          let nextRowData = value[++index];
          if (nextRowData) {
            nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.columnProp(column, "field"));
          } else {
            break;
          }
        }
        return groupRowSpan === 1 ? null : groupRowSpan;
      } else {
        return null;
      }
    },
    rowTogglerIcon(rowData) {
      const icon = this.isRowExpanded(rowData) ? this.expandedRowIcon : this.collapsedRowIcon;
      return ["p-row-toggler-icon pi", icon];
    },
    rowGroupTogglerIcon(rowData) {
      const icon = this.isRowGroupExpanded(rowData) ? this.expandedRowIcon : this.collapsedRowIcon;
      return ["p-row-toggler-icon pi", icon];
    },
    isGrouped(column) {
      if (this.groupRowsBy && this.columnProp(column, "field")) {
        if (Array.isArray(this.groupRowsBy))
          return this.groupRowsBy.indexOf(column.props.field) > -1;
        else
          return this.groupRowsBy === column.props.field;
      } else {
        return false;
      }
    },
    isRowEditing(rowData) {
      if (rowData && this.editingRows) {
        if (this.dataKey)
          return this.editingRowKeys ? this.editingRowKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0 : false;
        else
          return this.findIndex(rowData, this.editingRows) > -1;
      }
      return false;
    },
    isRowExpanded(rowData) {
      if (rowData && this.expandedRows) {
        if (this.dataKey)
          return this.expandedRowKeys ? this.expandedRowKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0 : false;
        else
          return this.findIndex(rowData, this.expandedRows) > -1;
      }
      return false;
    },
    isRowGroupExpanded(rowData) {
      if (this.expandableRowGroups && this.expandedRowGroups) {
        let groupFieldValue = ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
      }
      return false;
    },
    isSelected(rowData) {
      if (rowData && this.selection) {
        if (this.dataKey) {
          return this.selectionKeys ? this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0 : false;
        } else {
          if (this.selection instanceof Array)
            return this.findIndexInSelection(rowData) > -1;
          else
            return this.equals(rowData, this.selection);
        }
      }
      return false;
    },
    isSelectedWithContextMenu(rowData) {
      if (rowData && this.contextMenuSelection) {
        return this.equals(rowData, this.contextMenuSelection, this.dataKey);
      }
      return false;
    },
    findIndexInSelection(rowData) {
      return this.findIndex(rowData, this.selection);
    },
    findIndex(rowData, collection) {
      let index = -1;
      if (collection && collection.length) {
        for (let i = 0; i < collection.length; i++) {
          if (this.equals(rowData, collection[i])) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    equals(data1, data2) {
      return this.compareSelectionBy === "equals" ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
    },
    onRowGroupToggle(event2, data) {
      this.$emit("rowgroup-toggle", { originalEvent: event2, data });
    },
    onRowClick(event2, rowData, rowIndex) {
      this.$emit("row-click", { originalEvent: event2, data: rowData, index: rowIndex });
    },
    onRowDblClick(event2, rowData, rowIndex) {
      this.$emit("row-dblclick", { originalEvent: event2, data: rowData, index: rowIndex });
    },
    onRowRightClick(event2, rowData, rowIndex) {
      this.$emit("row-rightclick", { originalEvent: event2, data: rowData, index: rowIndex });
    },
    onRowTouchEnd(event2) {
      this.$emit("row-touchend", event2);
    },
    onRowKeyDown(event2, rowData, rowIndex) {
      this.$emit("row-keydown", { originalEvent: event2, data: rowData, index: rowIndex });
    },
    onRowMouseDown(event2) {
      this.$emit("row-mousedown", event2);
    },
    onRowDragStart(event2, rowIndex) {
      this.$emit("row-dragstart", { originalEvent: event2, index: rowIndex });
    },
    onRowDragOver(event2, rowIndex) {
      this.$emit("row-dragover", { originalEvent: event2, index: rowIndex });
    },
    onRowDragLeave(event2) {
      this.$emit("row-dragleave", event2);
    },
    onRowDragEnd(event2) {
      this.$emit("row-dragend", event2);
    },
    onRowDrop(event2) {
      this.$emit("row-drop", event2);
    },
    onRowToggle(event2) {
      this.$emit("row-toggle", event2);
    },
    onRadioChange(event2) {
      this.$emit("radio-change", event2);
    },
    onCheckboxChange(event2) {
      this.$emit("checkbox-change", event2);
    },
    onCellEditInit(event2) {
      this.$emit("cell-edit-init", event2);
    },
    onCellEditComplete(event2) {
      this.$emit("cell-edit-complete", event2);
    },
    onCellEditCancel(event2) {
      this.$emit("cell-edit-cancel", event2);
    },
    onRowEditInit(event2) {
      this.$emit("row-edit-init", event2);
    },
    onRowEditSave(event2) {
      this.$emit("row-edit-save", event2);
    },
    onRowEditCancel(event2) {
      this.$emit("row-edit-cancel", event2);
    },
    onEditingMetaChange(event2) {
      this.$emit("editing-meta-change", event2);
    },
    updateFrozenRowStickyPosition() {
      this.$el.style.top = DomHandler.getOuterHeight(this.$el.previousElementSibling) + "px";
    },
    updateFrozenRowGroupHeaderStickyPosition() {
      let tableHeaderHeight = DomHandler.getOuterHeight(this.$el.previousElementSibling);
      this.rowGroupHeaderStyleObject.top = tableHeaderHeight + "px";
    },
    updateVirtualScrollerPosition() {
      const tableHeaderHeight = DomHandler.getOuterHeight(this.$el.previousElementSibling);
      this.$el.style.top = (this.$el.style.top || 0) + tableHeaderHeight + "px";
    },
    getVirtualScrollerProp(option, options) {
      options = options || this.virtualScrollerContentProps;
      return options ? options[option] : null;
    },
    bodyRef(el) {
      const contentRef = this.getVirtualScrollerProp("contentRef");
      contentRef && contentRef(el);
    }
  },
  computed: {
    columnsLength() {
      let hiddenColLength = 0;
      this.columns.forEach((column) => {
        if (this.columnProp(column, "hidden"))
          hiddenColLength++;
      });
      return this.columns ? this.columns.length - hiddenColLength : 0;
    },
    rowGroupHeaderStyle() {
      if (this.scrollable) {
        return { top: this.rowGroupHeaderStyleObject.top };
      }
      return null;
    },
    bodyStyle() {
      return this.getVirtualScrollerProp("contentStyle");
    }
  },
  components: {
    "DTBodyCell": script$4$1
  }
};
const _hoisted_1$3$1 = ["colspan"];
const _hoisted_2$2$1 = ["onClick"];
const _hoisted_3$1$1 = ["onClick", "onDblclick", "onContextmenu", "onKeydown", "tabindex", "onDragstart", "onDragover"];
const _hoisted_4$1$1 = ["colspan"];
const _hoisted_5$1$1 = {
  key: 1,
  class: "p-datatable-emptymessage",
  role: "row"
};
const _hoisted_6$1$1 = ["colspan"];
function render$3$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTBodyCell = vue_cjs_prod.resolveComponent("DTBodyCell");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tbody", {
    ref: $options.bodyRef,
    class: "p-datatable-tbody",
    role: "rowgroup",
    style: vue_cjs_prod.normalizeStyle($options.bodyStyle)
  }, [
    !$props.empty ? (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 0 }, vue_cjs_prod.renderList($props.value, (rowData, index) => {
      return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
        key: $options.getRowKey(rowData, $options.getRowIndex(index)) + "_subheader"
      }, [
        $props.templates["groupheader"] && $props.rowGroupMode === "subheader" && $options.shouldRenderRowGroupHeader($props.value, rowData, $options.getRowIndex(index)) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
          key: 0,
          class: "p-rowgroup-header",
          style: vue_cjs_prod.normalizeStyle($options.rowGroupHeaderStyle),
          role: "row"
        }, [
          vue_cjs_prod.createElementVNode("td", {
            colspan: $options.columnsLength - 1
          }, [
            $props.expandableRowGroups ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
              key: 0,
              class: "p-row-toggler p-link",
              onClick: ($event) => $options.onRowGroupToggle($event, rowData),
              type: "button"
            }, [
              vue_cjs_prod.createElementVNode("span", {
                class: vue_cjs_prod.normalizeClass($options.rowGroupTogglerIcon(rowData))
              }, null, 2)
            ], 8, _hoisted_2$2$1)) : vue_cjs_prod.createCommentVNode("", true),
            (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.templates["groupheader"]), {
              data: rowData,
              index: $options.getRowIndex(index)
            }, null, 8, ["data", "index"]))
          ], 8, _hoisted_1$3$1)
        ], 4)) : vue_cjs_prod.createCommentVNode("", true),
        ($props.expandableRowGroups ? $options.isRowGroupExpanded(rowData) : true) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
          class: vue_cjs_prod.normalizeClass($options.getRowClass(rowData)),
          style: vue_cjs_prod.normalizeStyle($props.rowStyle),
          key: $options.getRowKey(rowData, $options.getRowIndex(index)),
          onClick: ($event) => $options.onRowClick($event, rowData, $options.getRowIndex(index)),
          onDblclick: ($event) => $options.onRowDblClick($event, rowData, $options.getRowIndex(index)),
          onContextmenu: ($event) => $options.onRowRightClick($event, rowData, $options.getRowIndex(index)),
          onTouchend: _cache[9] || (_cache[9] = ($event) => $options.onRowTouchEnd($event)),
          onKeydown: ($event) => $options.onRowKeyDown($event, rowData, $options.getRowIndex(index)),
          tabindex: $props.selectionMode || $props.contextMenu ? "0" : null,
          onMousedown: _cache[10] || (_cache[10] = ($event) => $options.onRowMouseDown($event)),
          onDragstart: ($event) => $options.onRowDragStart($event, $options.getRowIndex(index)),
          onDragover: ($event) => $options.onRowDragOver($event, $options.getRowIndex(index)),
          onDragleave: _cache[11] || (_cache[11] = ($event) => $options.onRowDragLeave($event)),
          onDragend: _cache[12] || (_cache[12] = ($event) => $options.onRowDragEnd($event)),
          onDrop: _cache[13] || (_cache[13] = ($event) => $options.onRowDrop($event)),
          role: "row"
        }, [
          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.columns, (col, i) => {
            return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
              key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
            }, [
              $options.shouldRenderBodyCell($props.value, col, $options.getRowIndex(index)) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTBodyCell, {
                key: 0,
                rowData,
                column: col,
                rowIndex: $options.getRowIndex(index),
                index: i,
                selected: $options.isSelected(rowData),
                rowTogglerIcon: $options.columnProp(col, "expander") ? $options.rowTogglerIcon(rowData) : null,
                frozenRow: $props.frozenRow,
                rowspan: $props.rowGroupMode === "rowspan" ? $options.calculateRowGroupSize($props.value, col, $options.getRowIndex(index)) : null,
                editMode: $props.editMode,
                editing: $props.editMode === "row" && $options.isRowEditing(rowData),
                responsiveLayout: $props.responsiveLayout,
                onRadioChange: _cache[0] || (_cache[0] = ($event) => $options.onRadioChange($event)),
                onCheckboxChange: _cache[1] || (_cache[1] = ($event) => $options.onCheckboxChange($event)),
                onRowToggle: _cache[2] || (_cache[2] = ($event) => $options.onRowToggle($event)),
                onCellEditInit: _cache[3] || (_cache[3] = ($event) => $options.onCellEditInit($event)),
                onCellEditComplete: _cache[4] || (_cache[4] = ($event) => $options.onCellEditComplete($event)),
                onCellEditCancel: _cache[5] || (_cache[5] = ($event) => $options.onCellEditCancel($event)),
                onRowEditInit: _cache[6] || (_cache[6] = ($event) => $options.onRowEditInit($event)),
                onRowEditSave: _cache[7] || (_cache[7] = ($event) => $options.onRowEditSave($event)),
                onRowEditCancel: _cache[8] || (_cache[8] = ($event) => $options.onRowEditCancel($event)),
                editingMeta: $props.editingMeta,
                onEditingMetaChange: $options.onEditingMetaChange,
                virtualScrollerContentProps: $props.virtualScrollerContentProps
              }, null, 8, ["rowData", "column", "rowIndex", "index", "selected", "rowTogglerIcon", "frozenRow", "rowspan", "editMode", "editing", "responsiveLayout", "editingMeta", "onEditingMetaChange", "virtualScrollerContentProps"])) : vue_cjs_prod.createCommentVNode("", true)
            ], 64);
          }), 128))
        ], 46, _hoisted_3$1$1)) : vue_cjs_prod.createCommentVNode("", true),
        $props.templates["expansion"] && $props.expandedRows && $options.isRowExpanded(rowData) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
          class: "p-datatable-row-expansion",
          key: $options.getRowKey(rowData, $options.getRowIndex(index)) + "_expansion",
          role: "row"
        }, [
          vue_cjs_prod.createElementVNode("td", { colspan: $options.columnsLength }, [
            (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.templates["expansion"]), {
              data: rowData,
              index: $options.getRowIndex(index)
            }, null, 8, ["data", "index"]))
          ], 8, _hoisted_4$1$1)
        ])) : vue_cjs_prod.createCommentVNode("", true),
        $props.templates["groupfooter"] && $props.rowGroupMode === "subheader" && $options.shouldRenderRowGroupFooter($props.value, rowData, $options.getRowIndex(index)) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
          class: "p-rowgroup-footer",
          key: $options.getRowKey(rowData, $options.getRowIndex(index)) + "_subfooter",
          role: "row"
        }, [
          (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.templates["groupfooter"]), {
            data: rowData,
            index: $options.getRowIndex(index)
          }, null, 8, ["data", "index"]))
        ])) : vue_cjs_prod.createCommentVNode("", true)
      ], 64);
    }), 128)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", _hoisted_5$1$1, [
      vue_cjs_prod.createElementVNode("td", { colspan: $options.columnsLength }, [
        $props.templates.empty ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.templates.empty), { key: 0 })) : vue_cjs_prod.createCommentVNode("", true)
      ], 8, _hoisted_6$1$1)
    ]))
  ], 4);
}
script$3$1.render = render$3$1;
var script$2$1 = {
  name: "FooterCell",
  props: {
    column: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      styleObject: {}
    };
  },
  mounted() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    updateStickyPosition() {
      if (this.columnProp("frozen")) {
        let align = this.columnProp("alignFrozen");
        if (align === "right") {
          let right = 0;
          let next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.left);
          }
          this.styleObject.right = right + "px";
        } else {
          let left = 0;
          let prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left);
          }
          this.styleObject.left = left + "px";
        }
      }
    }
  },
  computed: {
    containerClass() {
      return [this.columnProp("footerClass"), this.columnProp("class"), {
        "p-frozen-column": this.columnProp("frozen")
      }];
    },
    containerStyle() {
      let bodyStyle = this.columnProp("footerStyle");
      let columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    }
  }
};
const _hoisted_1$2$1 = ["colspan", "rowspan"];
function render$2$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("td", {
    style: vue_cjs_prod.normalizeStyle($options.containerStyle),
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    role: "cell",
    colspan: $options.columnProp("colspan"),
    rowspan: $options.columnProp("rowspan")
  }, [
    $props.column.children && $props.column.children.footer ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent($props.column.children.footer), {
      key: 0,
      column: $props.column
    }, null, 8, ["column"])) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString($options.columnProp("footer")), 1)
  ], 14, _hoisted_1$2$1);
}
script$2$1.render = render$2$1;
var script$1$1 = {
  name: "TableFooter",
  props: {
    columnGroup: {
      type: null,
      default: null
    },
    columns: {
      type: null,
      default: null
    }
  },
  methods: {
    columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    getFooterRows() {
      let rows = [];
      let columnGroup = this.columnGroup;
      if (columnGroup.children && columnGroup.children.default) {
        for (let child of columnGroup.children.default()) {
          if (child.type.name === "Row") {
            rows.push(child);
          } else if (child.children && child.children instanceof Array) {
            rows = child.children;
          }
        }
        return rows;
      }
    },
    getFooterColumns(row) {
      let cols = [];
      if (row.children && row.children.default) {
        row.children.default().forEach((child) => {
          if (child.children && child.children instanceof Array)
            cols = [...cols, ...child.children];
          else if (child.type.name === "Column")
            cols.push(child);
        });
        return cols;
      }
    }
  },
  computed: {
    hasFooter() {
      let hasFooter = false;
      if (this.columnGroup) {
        hasFooter = true;
      } else if (this.columns) {
        for (let col of this.columns) {
          if (this.columnProp(col, "footer") || col.children && col.children.footer) {
            hasFooter = true;
            break;
          }
        }
      }
      return hasFooter;
    }
  },
  components: {
    "DTFooterCell": script$2$1
  }
};
const _hoisted_1$1$1 = {
  key: 0,
  class: "p-datatable-tfoot",
  role: "rowgroup"
};
const _hoisted_2$1$1 = {
  key: 0,
  role: "row"
};
function render$1$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTFooterCell = vue_cjs_prod.resolveComponent("DTFooterCell");
  return $options.hasFooter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tfoot", _hoisted_1$1$1, [
    !$props.columnGroup ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", _hoisted_2$1$1, [
      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.columns, (col, i) => {
        return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
          key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
        }, [
          !$options.columnProp(col, "hidden") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTFooterCell, {
            key: 0,
            column: col
          }, null, 8, ["column"])) : vue_cjs_prod.createCommentVNode("", true)
        ], 64);
      }), 128))
    ])) : (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 1 }, vue_cjs_prod.renderList($options.getFooterRows(), (row, i) => {
      return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("tr", {
        key: i,
        role: "row"
      }, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($options.getFooterColumns(row), (col, j) => {
          return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
            key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || j
          }, [
            !$options.columnProp(col, "hidden") ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTFooterCell, {
              key: 0,
              column: col
            }, null, 8, ["column"])) : vue_cjs_prod.createCommentVNode("", true)
          ], 64);
        }), 128))
      ]);
    }), 128))
  ])) : vue_cjs_prod.createCommentVNode("", true);
}
script$1$1.render = render$1$1;
var script$b = {
  name: "DataTable",
  emits: [
    "value-change",
    "update:first",
    "update:rows",
    "page",
    "update:sortField",
    "update:sortOrder",
    "update:multiSortMeta",
    "sort",
    "filter",
    "row-click",
    "row-dblclick",
    "update:selection",
    "row-select",
    "row-unselect",
    "update:contextMenuSelection",
    "row-contextmenu",
    "row-unselect-all",
    "row-select-all",
    "select-all-change",
    "column-resize-end",
    "column-reorder",
    "row-reorder",
    "update:expandedRows",
    "row-collapse",
    "row-expand",
    "update:expandedRowGroups",
    "rowgroup-collapse",
    "rowgroup-expand",
    "update:filters",
    "state-restore",
    "state-save",
    "cell-edit-init",
    "cell-edit-complete",
    "cell-edit-cancel",
    "update:editingRows",
    "row-edit-init",
    "row-edit-save",
    "row-edit-cancel"
  ],
  props: {
    value: {
      type: Array,
      default: null
    },
    dataKey: {
      type: [String, Function],
      default: null
    },
    rows: {
      type: Number,
      default: 0
    },
    first: {
      type: Number,
      default: 0
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    paginator: {
      type: Boolean,
      default: false
    },
    paginatorPosition: {
      type: String,
      default: "bottom"
    },
    alwaysShowPaginator: {
      type: Boolean,
      default: true
    },
    paginatorTemplate: {
      type: String,
      default: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    },
    pageLinkSize: {
      type: Number,
      default: 5
    },
    rowsPerPageOptions: {
      type: Array,
      default: null
    },
    currentPageReportTemplate: {
      type: String,
      default: "({currentPage} of {totalPages})"
    },
    lazy: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner"
    },
    sortField: {
      type: [String, Function],
      default: null
    },
    sortOrder: {
      type: Number,
      default: null
    },
    defaultSortOrder: {
      type: Number,
      default: 1
    },
    multiSortMeta: {
      type: Array,
      default: null
    },
    sortMode: {
      type: String,
      default: "single"
    },
    removableSort: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Object,
      default: null
    },
    filterDisplay: {
      type: String,
      default: null
    },
    globalFilterFields: {
      type: Array,
      default: null
    },
    filterLocale: {
      type: String,
      default: void 0
    },
    selection: {
      type: [Array, Object],
      default: null
    },
    selectionMode: {
      type: String,
      default: null
    },
    compareSelectionBy: {
      type: String,
      default: "deepEquals"
    },
    metaKeySelection: {
      type: Boolean,
      default: true
    },
    contextMenu: {
      type: Boolean,
      default: false
    },
    contextMenuSelection: {
      type: Object,
      default: null
    },
    selectAll: {
      type: Boolean,
      default: null
    },
    rowHover: {
      type: Boolean,
      default: false
    },
    csvSeparator: {
      type: String,
      default: ","
    },
    exportFilename: {
      type: String,
      default: "download"
    },
    exportFunction: {
      type: Function,
      default: null
    },
    autoLayout: {
      type: Boolean,
      default: false
    },
    resizableColumns: {
      type: Boolean,
      default: false
    },
    columnResizeMode: {
      type: String,
      default: "fit"
    },
    reorderableColumns: {
      type: Boolean,
      default: false
    },
    expandedRows: {
      type: Array,
      default: null
    },
    expandedRowIcon: {
      type: String,
      default: "pi-chevron-down"
    },
    collapsedRowIcon: {
      type: String,
      default: "pi-chevron-right"
    },
    rowGroupMode: {
      type: String,
      default: null
    },
    groupRowsBy: {
      type: [Array, String],
      default: null
    },
    expandableRowGroups: {
      type: Boolean,
      default: false
    },
    expandedRowGroups: {
      type: Array,
      default: null
    },
    stateStorage: {
      type: String,
      default: "session"
    },
    stateKey: {
      type: String,
      default: null
    },
    editMode: {
      type: String,
      default: null
    },
    editingRows: {
      type: Array,
      default: null
    },
    rowClass: {
      type: null,
      default: null
    },
    rowStyle: {
      type: null,
      default: null
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    scrollDirection: {
      type: String,
      default: "vertical"
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    scrollHeight: {
      type: String,
      default: null
    },
    frozenValue: {
      type: Array,
      default: null
    },
    responsiveLayout: {
      type: String,
      default: "stack"
    },
    breakpoint: {
      type: String,
      default: "960px"
    },
    showGridlines: {
      type: Boolean,
      default: false
    },
    stripedRows: {
      type: Boolean,
      default: false
    },
    tableStyle: {
      type: null,
      default: null
    },
    tableClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      d_first: this.first,
      d_rows: this.rows,
      d_sortField: this.sortField,
      d_sortOrder: this.sortOrder,
      d_multiSortMeta: this.multiSortMeta ? [...this.multiSortMeta] : [],
      d_groupRowsSortMeta: null,
      d_selectionKeys: null,
      d_expandedRowKeys: null,
      d_columnOrder: null,
      d_editingRowKeys: null,
      d_editingMeta: {},
      d_filters: this.cloneFilters(this.filters)
    };
  },
  rowTouched: false,
  anchorRowIndex: null,
  rangeRowIndex: null,
  documentColumnResizeListener: null,
  documentColumnResizeEndListener: null,
  lastResizeHelperX: null,
  resizeColumnElement: null,
  columnResizing: false,
  colReorderIconWidth: null,
  colReorderIconHeight: null,
  draggedColumn: null,
  draggedRowIndex: null,
  droppedRowIndex: null,
  rowDragging: null,
  columnWidthsState: null,
  tableWidthState: null,
  columnWidthsRestored: false,
  watch: {
    first(newValue) {
      this.d_first = newValue;
    },
    rows(newValue) {
      this.d_rows = newValue;
    },
    sortField(newValue) {
      this.d_sortField = newValue;
    },
    sortOrder(newValue) {
      this.d_sortOrder = newValue;
    },
    multiSortMeta(newValue) {
      this.d_multiSortMeta = newValue;
    },
    selection: {
      immediate: true,
      handler(newValue) {
        if (this.dataKey) {
          this.updateSelectionKeys(newValue);
        }
      }
    },
    expandedRows(newValue) {
      if (this.dataKey) {
        this.updateExpandedRowKeys(newValue);
      }
    },
    editingRows(newValue) {
      if (this.dataKey) {
        this.updateEditingRowKeys(newValue);
      }
    },
    filters: {
      deep: true,
      handler: function(newValue) {
        this.d_filters = this.cloneFilters(newValue);
      }
    }
  },
  beforeMount() {
    if (this.isStateful()) {
      this.restoreState();
    }
  },
  mounted() {
    this.$el.setAttribute(this.attributeSelector, "");
    if (this.responsiveLayout === "stack" && !this.scrollable) {
      this.createResponsiveStyle();
    }
    if (this.isStateful() && this.resizableColumns) {
      this.restoreColumnWidths();
    }
    if (this.editMode === "row" && this.dataKey && !this.d_editingRowKeys) {
      this.updateEditingRowKeys(this.editingRows);
    }
  },
  beforeUnmount() {
    this.unbindColumnResizeEvents();
    this.destroyStyleElement();
    this.destroyResponsiveStyle();
  },
  updated() {
    if (this.isStateful()) {
      this.saveState();
    }
    if (this.editMode === "row" && this.dataKey && !this.d_editingRowKeys) {
      this.updateEditingRowKeys(this.editingRows);
    }
  },
  methods: {
    columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    onPage(event2) {
      this.clearEditingMetaData();
      this.d_first = event2.first;
      this.d_rows = event2.rows;
      let pageEvent = this.createLazyLoadEvent(event2);
      pageEvent.pageCount = event2.pageCount;
      pageEvent.page = event2.page;
      this.$emit("update:first", this.d_first);
      this.$emit("update:rows", this.d_rows);
      this.$emit("page", pageEvent);
      this.$emit("value-change", this.processedData);
    },
    onColumnHeaderClick(e) {
      const event2 = e.originalEvent;
      const column = e.column;
      if (this.columnProp(column, "sortable")) {
        const targetNode = event2.target;
        const columnField = this.columnProp(column, "sortField") || this.columnProp(column, "field");
        if (DomHandler.hasClass(targetNode, "p-sortable-column") || DomHandler.hasClass(targetNode, "p-column-title") || DomHandler.hasClass(targetNode, "p-column-header-content") || DomHandler.hasClass(targetNode, "p-sortable-column-icon") || DomHandler.hasClass(targetNode.parentElement, "p-sortable-column-icon")) {
          DomHandler.clearSelection();
          if (this.sortMode === "single") {
            if (this.d_sortField === columnField) {
              if (this.removableSort && this.d_sortOrder * -1 === this.defaultSortOrder) {
                this.d_sortOrder = null;
                this.d_sortField = null;
              } else {
                this.d_sortOrder = this.d_sortOrder * -1;
              }
            } else {
              this.d_sortOrder = this.defaultSortOrder;
              this.d_sortField = columnField;
            }
            this.$emit("update:sortField", this.d_sortField);
            this.$emit("update:sortOrder", this.d_sortOrder);
            this.resetPage();
          } else if (this.sortMode === "multiple") {
            let metaKey = event2.metaKey || event2.ctrlKey;
            if (!metaKey) {
              this.d_multiSortMeta = this.d_multiSortMeta.filter((meta2) => meta2.field === columnField);
            }
            this.addMultiSortField(columnField);
            this.$emit("update:multiSortMeta", this.d_multiSortMeta);
          }
          this.$emit("sort", this.createLazyLoadEvent(event2));
          this.$emit("value-change", this.processedData);
        }
      }
    },
    sortSingle(value) {
      this.clearEditingMetaData();
      if (this.groupRowsBy && this.groupRowsBy === this.sortField) {
        this.d_multiSortMeta = [
          { field: this.sortField, order: this.sortOrder || this.defaultSortOrder },
          { field: this.d_sortField, order: this.d_sortOrder }
        ];
        return this.sortMultiple(value);
      }
      let data = [...value];
      data.sort((data1, data2) => {
        let value1 = ObjectUtils.resolveFieldData(data1, this.d_sortField);
        let value2 = ObjectUtils.resolveFieldData(data2, this.d_sortField);
        let result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === "string" && typeof value2 === "string")
          result = value1.localeCompare(value2, void 0, { numeric: true });
        else
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return this.d_sortOrder * result;
      });
      return data;
    },
    sortMultiple(value) {
      this.clearEditingMetaData();
      if (this.groupRowsBy && (this.d_groupRowsSortMeta || this.d_multiSortMeta.length && this.groupRowsBy === this.d_multiSortMeta[0].field)) {
        const firstSortMeta = this.d_multiSortMeta[0];
        !this.d_groupRowsSortMeta && (this.d_groupRowsSortMeta = firstSortMeta);
        if (firstSortMeta.field !== this.d_groupRowsSortMeta.field) {
          this.d_multiSortMeta = [this.d_groupRowsSortMeta, ...this.d_multiSortMeta];
        }
      }
      let data = [...value];
      data.sort((data1, data2) => {
        return this.multisortField(data1, data2, 0);
      });
      return data;
    },
    multisortField(data1, data2, index) {
      const value1 = ObjectUtils.resolveFieldData(data1, this.d_multiSortMeta[index].field);
      const value2 = ObjectUtils.resolveFieldData(data2, this.d_multiSortMeta[index].field);
      let result = null;
      if (typeof value1 === "string" || value1 instanceof String) {
        if (value1.localeCompare && value1 !== value2) {
          return this.d_multiSortMeta[index].order * value1.localeCompare(value2, void 0, { numeric: true });
        }
      } else {
        result = value1 < value2 ? -1 : 1;
      }
      if (value1 === value2) {
        return this.d_multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, index + 1) : 0;
      }
      return this.d_multiSortMeta[index].order * result;
    },
    addMultiSortField(field) {
      let index = this.d_multiSortMeta.findIndex((meta2) => meta2.field === field);
      if (index >= 0) {
        if (this.removableSort && this.d_multiSortMeta[index].order * -1 === this.defaultSortOrder)
          this.d_multiSortMeta.splice(index, 1);
        else
          this.d_multiSortMeta[index] = { field, order: this.d_multiSortMeta[index].order * -1 };
      } else {
        this.d_multiSortMeta.push({ field, order: this.defaultSortOrder });
      }
      this.d_multiSortMeta = [...this.d_multiSortMeta];
    },
    filter(data) {
      if (!data) {
        return;
      }
      this.clearEditingMetaData();
      let globalFilterFieldsArray;
      if (this.filters["global"]) {
        globalFilterFieldsArray = this.globalFilterFields || this.columns.map((col) => this.columnProp(col, "filterField") || this.columnProp(col, "field"));
      }
      let filteredValue = [];
      for (let i = 0; i < data.length; i++) {
        let localMatch = true;
        let globalMatch = false;
        let localFiltered = false;
        for (let prop in this.filters) {
          if (Object.prototype.hasOwnProperty.call(this.filters, prop) && prop !== "global") {
            localFiltered = true;
            let filterField = prop;
            let filterMeta = this.filters[filterField];
            if (filterMeta.operator) {
              for (let filterConstraint of filterMeta.constraints) {
                localMatch = this.executeLocalFilter(filterField, data[i], filterConstraint);
                if (filterMeta.operator === FilterOperator.OR && localMatch || filterMeta.operator === FilterOperator.AND && !localMatch) {
                  break;
                }
              }
            } else {
              localMatch = this.executeLocalFilter(filterField, data[i], filterMeta);
            }
            if (!localMatch) {
              break;
            }
          }
        }
        if (this.filters["global"] && !globalMatch && globalFilterFieldsArray) {
          for (let j = 0; j < globalFilterFieldsArray.length; j++) {
            let globalFilterField = globalFilterFieldsArray[j];
            globalMatch = FilterService.filters[this.filters["global"].matchMode || FilterMatchMode.CONTAINS](ObjectUtils.resolveFieldData(data[i], globalFilterField), this.filters["global"].value, this.filterLocale);
            if (globalMatch) {
              break;
            }
          }
        }
        let matches;
        if (this.filters["global"]) {
          matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
        } else {
          matches = localFiltered && localMatch;
        }
        if (matches) {
          filteredValue.push(data[i]);
        }
      }
      if (filteredValue.length === this.value.length) {
        filteredValue = data;
      }
      let filterEvent = this.createLazyLoadEvent();
      filterEvent.filteredValue = filteredValue;
      this.$emit("filter", filterEvent);
      this.$emit("value-change", filteredValue);
      return filteredValue;
    },
    executeLocalFilter(field, rowData, filterMeta) {
      let filterValue = filterMeta.value;
      let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
      let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
      let filterConstraint = FilterService.filters[filterMatchMode];
      return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    },
    onRowClick(e) {
      const event2 = e.originalEvent;
      if (DomHandler.isClickable(event2.target)) {
        return;
      }
      this.$emit("row-click", e);
      if (this.selectionMode) {
        const rowData = e.data;
        const rowIndex = this.d_first + e.index;
        if (this.isMultipleSelectionMode() && event2.shiftKey && this.anchorRowIndex != null) {
          DomHandler.clearSelection();
          this.rangeRowIndex = rowIndex;
          this.selectRange(event2);
        } else {
          const selected = this.isSelected(rowData);
          const metaSelection = this.rowTouched ? false : this.metaKeySelection;
          this.anchorRowIndex = rowIndex;
          this.rangeRowIndex = rowIndex;
          if (metaSelection) {
            let metaKey = event2.metaKey || event2.ctrlKey;
            if (selected && metaKey) {
              if (this.isSingleSelectionMode()) {
                this.$emit("update:selection", null);
              } else {
                const selectionIndex = this.findIndexInSelection(rowData);
                const _selection = this.selection.filter((val, i) => i != selectionIndex);
                this.$emit("update:selection", _selection);
              }
              this.$emit("row-unselect", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
            } else {
              if (this.isSingleSelectionMode()) {
                this.$emit("update:selection", rowData);
              } else if (this.isMultipleSelectionMode()) {
                let _selection = metaKey ? this.selection || [] : [];
                _selection = [..._selection, rowData];
                this.$emit("update:selection", _selection);
              }
              this.$emit("row-select", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
            }
          } else {
            if (this.selectionMode === "single") {
              if (selected) {
                this.$emit("update:selection", null);
                this.$emit("row-unselect", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
              } else {
                this.$emit("update:selection", rowData);
                this.$emit("row-select", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
              }
            } else if (this.selectionMode === "multiple") {
              if (selected) {
                const selectionIndex = this.findIndexInSelection(rowData);
                const _selection = this.selection.filter((val, i) => i != selectionIndex);
                this.$emit("update:selection", _selection);
                this.$emit("row-unselect", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
              } else {
                const _selection = this.selection ? [...this.selection, rowData] : [rowData];
                this.$emit("update:selection", _selection);
                this.$emit("row-select", { originalEvent: event2, data: rowData, index: rowIndex, type: "row" });
              }
            }
          }
        }
      }
      this.rowTouched = false;
    },
    onRowDblClick(e) {
      const event2 = e.originalEvent;
      if (DomHandler.isClickable(event2.target)) {
        return;
      }
      this.$emit("row-dblclick", e);
    },
    onRowRightClick(event2) {
      DomHandler.clearSelection();
      event2.originalEvent.target.focus();
      this.$emit("update:contextMenuSelection", event2.data);
      this.$emit("row-contextmenu", event2);
    },
    onRowTouchEnd() {
      this.rowTouched = true;
    },
    onRowKeyDown(e) {
      const event2 = e.originalEvent;
      const rowData = e.data;
      const rowIndex = e.index;
      if (this.selectionMode) {
        const row = event2.target;
        switch (event2.which) {
          case 40:
            var nextRow = this.findNextSelectableRow(row);
            if (nextRow) {
              nextRow.focus();
            }
            event2.preventDefault();
            break;
          case 38:
            var prevRow = this.findPrevSelectableRow(row);
            if (prevRow) {
              prevRow.focus();
            }
            event2.preventDefault();
            break;
          case 13:
            this.onRowClick({ originalEvent: event2, data: rowData, index: rowIndex });
            break;
        }
      }
    },
    findNextSelectableRow(row) {
      let nextRow = row.nextElementSibling;
      if (nextRow) {
        if (DomHandler.hasClass(nextRow, "p-selectable-row"))
          return nextRow;
        else
          return this.findNextSelectableRow(nextRow);
      } else {
        return null;
      }
    },
    findPrevSelectableRow(row) {
      let prevRow = row.previousElementSibling;
      if (prevRow) {
        if (DomHandler.hasClass(prevRow, "p-selectable-row"))
          return prevRow;
        else
          return this.findPrevSelectableRow(prevRow);
      } else {
        return null;
      }
    },
    toggleRowWithRadio(event2) {
      const rowData = event2.data;
      if (this.isSelected(rowData)) {
        this.$emit("update:selection", null);
        this.$emit("row-unselect", { originalEvent: event2.originalEvent, data: rowData, index: event2.index, type: "radiobutton" });
      } else {
        this.$emit("update:selection", rowData);
        this.$emit("row-select", { originalEvent: event2.originalEvent, data: rowData, index: event2.index, type: "radiobutton" });
      }
    },
    toggleRowWithCheckbox(event2) {
      const rowData = event2.data;
      if (this.isSelected(rowData)) {
        const selectionIndex = this.findIndexInSelection(rowData);
        const _selection = this.selection.filter((val, i) => i != selectionIndex);
        this.$emit("update:selection", _selection);
        this.$emit("row-unselect", { originalEvent: event2.originalEvent, data: rowData, index: event2.index, type: "checkbox" });
      } else {
        let _selection = this.selection ? [...this.selection] : [];
        _selection = [..._selection, rowData];
        this.$emit("update:selection", _selection);
        this.$emit("row-select", { originalEvent: event2.originalEvent, data: rowData, index: event2.index, type: "checkbox" });
      }
    },
    toggleRowsWithCheckbox(event2) {
      if (this.selectAll !== null) {
        this.$emit("select-all-change", event2);
      } else {
        const { originalEvent, checked } = event2;
        let _selection = [];
        if (checked) {
          _selection = this.frozenValue ? [...this.frozenValue, ...this.processedData] : this.processedData;
          this.$emit("row-select-all", { originalEvent, data: _selection });
        } else {
          this.$emit("row-unselect-all", { originalEvent });
        }
        this.$emit("update:selection", _selection);
      }
    },
    isSingleSelectionMode() {
      return this.selectionMode === "single";
    },
    isMultipleSelectionMode() {
      return this.selectionMode === "multiple";
    },
    isSelected(rowData) {
      if (rowData && this.selection) {
        if (this.dataKey) {
          return this.d_selectionKeys ? this.d_selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0 : false;
        } else {
          if (this.selection instanceof Array)
            return this.findIndexInSelection(rowData) > -1;
          else
            return this.equals(rowData, this.selection);
        }
      }
      return false;
    },
    findIndexInSelection(rowData) {
      return this.findIndex(rowData, this.selection);
    },
    findIndex(rowData, collection) {
      let index = -1;
      if (collection && collection.length) {
        for (let i = 0; i < collection.length; i++) {
          if (this.equals(rowData, collection[i])) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    updateSelectionKeys(selection) {
      this.d_selectionKeys = {};
      if (Array.isArray(selection)) {
        for (let data of selection) {
          this.d_selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
        }
      } else {
        this.d_selectionKeys[String(ObjectUtils.resolveFieldData(selection, this.dataKey))] = 1;
      }
    },
    updateExpandedRowKeys(expandedRows) {
      if (expandedRows && expandedRows.length) {
        this.d_expandedRowKeys = {};
        for (let data of expandedRows) {
          this.d_expandedRowKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
        }
      } else {
        this.d_expandedRowKeys = null;
      }
    },
    updateEditingRowKeys(editingRows) {
      if (editingRows && editingRows.length) {
        this.d_editingRowKeys = {};
        for (let data of editingRows) {
          this.d_editingRowKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
        }
      } else {
        this.d_editingRowKeys = null;
      }
    },
    equals(data1, data2) {
      return this.compareSelectionBy === "equals" ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
    },
    selectRange(event2) {
      let rangeStart, rangeEnd;
      if (this.rangeRowIndex > this.anchorRowIndex) {
        rangeStart = this.anchorRowIndex;
        rangeEnd = this.rangeRowIndex;
      } else if (this.rangeRowIndex < this.anchorRowIndex) {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.anchorRowIndex;
      } else {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.rangeRowIndex;
      }
      if (this.lazy && this.paginator) {
        rangeStart -= this.first;
        rangeEnd -= this.first;
      }
      const value = this.processedData;
      let _selection = [];
      for (let i = rangeStart; i <= rangeEnd; i++) {
        let rangeRowData = value[i];
        _selection.push(rangeRowData);
        this.$emit("row-select", { originalEvent: event2, data: rangeRowData, type: "row" });
      }
      this.$emit("update:selection", _selection);
    },
    exportCSV(options, data) {
      let csv = "\uFEFF";
      if (!data) {
        data = this.processedData;
        if (options && options.selectionOnly)
          data = this.selection || [];
        else if (this.frozenValue)
          data = data ? [...this.frozenValue, ...data] : this.frozenValue;
      }
      let headerInitiated = false;
      for (let i = 0; i < this.columns.length; i++) {
        let column = this.columns[i];
        if (this.columnProp(column, "exportable") !== false && this.columnProp(column, "field")) {
          if (headerInitiated)
            csv += this.csvSeparator;
          else
            headerInitiated = true;
          csv += '"' + (this.columnProp(column, "exportHeader") || this.columnProp(column, "header") || this.columnProp(column, "field")) + '"';
        }
      }
      if (data) {
        data.forEach((record) => {
          csv += "\n";
          let rowInitiated = false;
          for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            if (this.columnProp(column, "exportable") !== false && this.columnProp(column, "field")) {
              if (rowInitiated)
                csv += this.csvSeparator;
              else
                rowInitiated = true;
              let cellData = ObjectUtils.resolveFieldData(record, this.columnProp(column, "field"));
              if (cellData != null) {
                if (this.exportFunction) {
                  cellData = this.exportFunction({
                    data: cellData,
                    field: this.columnProp(column, "field")
                  });
                } else
                  cellData = String(cellData).replace(/"/g, '""');
              } else
                cellData = "";
              csv += '"' + cellData + '"';
            }
          }
        });
      }
      let footerInitiated = false;
      for (let i = 0; i < this.columns.length; i++) {
        let column = this.columns[i];
        if (i === 0)
          csv += "\n";
        if (this.columnProp(column, "exportable") !== false && this.columnProp(column, "field")) {
          if (footerInitiated)
            csv += this.csvSeparator;
          else
            footerInitiated = true;
          csv += '"' + (this.columnProp(column, "exportFooter") || this.columnProp(column, "footer") || this.columnProp(column, "field")) + '"';
        }
      }
      DomHandler.exportCSV(csv, this.exportFilename);
    },
    resetPage() {
      this.d_first = 0;
      this.$emit("update:first", this.d_first);
    },
    onColumnResizeStart(event2) {
      let containerLeft = DomHandler.getOffset(this.$el).left;
      this.resizeColumnElement = event2.target.parentElement;
      this.columnResizing = true;
      this.lastResizeHelperX = event2.pageX - containerLeft + this.$el.scrollLeft;
      this.bindColumnResizeEvents();
    },
    onColumnResize(event2) {
      let containerLeft = DomHandler.getOffset(this.$el).left;
      DomHandler.addClass(this.$el, "p-unselectable-text");
      this.$refs.resizeHelper.style.height = this.$el.offsetHeight + "px";
      this.$refs.resizeHelper.style.top = 0 + "px";
      this.$refs.resizeHelper.style.left = event2.pageX - containerLeft + this.$el.scrollLeft + "px";
      this.$refs.resizeHelper.style.display = "block";
    },
    onColumnResizeEnd() {
      let delta = this.$refs.resizeHelper.offsetLeft - this.lastResizeHelperX;
      let columnWidth = this.resizeColumnElement.offsetWidth;
      let newColumnWidth = columnWidth + delta;
      let minWidth = this.resizeColumnElement.style.minWidth || 15;
      if (columnWidth + delta > parseInt(minWidth, 10)) {
        if (this.columnResizeMode === "fit") {
          let nextColumn = this.resizeColumnElement.nextElementSibling;
          let nextColumnWidth = nextColumn.offsetWidth - delta;
          if (newColumnWidth > 15 && nextColumnWidth > 15) {
            this.resizeTableCells(newColumnWidth, nextColumnWidth);
          }
        } else if (this.columnResizeMode === "expand") {
          const tableWidth = this.$refs.table.offsetWidth + delta + "px";
          const updateTableWidth = (el) => {
            !!el && (el.style.width = el.style.minWidth = tableWidth);
          };
          updateTableWidth(this.$refs.table);
          if (!this.virtualScrollerDisabled) {
            const body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
            const frozenBody = this.$refs.frozenBodyRef && this.$refs.frozenBodyRef.$el;
            updateTableWidth(body);
            updateTableWidth(frozenBody);
          }
          this.resizeTableCells(newColumnWidth);
        }
        this.$emit("column-resize-end", {
          element: this.resizeColumnElement,
          delta
        });
      }
      this.$refs.resizeHelper.style.display = "none";
      this.resizeColumn = null;
      DomHandler.removeClass(this.$el, "p-unselectable-text");
      this.unbindColumnResizeEvents();
      if (this.isStateful()) {
        this.saveState();
      }
    },
    resizeTableCells(newColumnWidth, nextColumnWidth) {
      let colIndex = DomHandler.index(this.resizeColumnElement);
      let widths = [];
      let headers = DomHandler.find(this.$refs.table, ".p-datatable-thead > tr > th");
      headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
      this.destroyStyleElement();
      this.createStyleElement();
      let innerHTML = "";
      widths.forEach((width, index) => {
        let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
        let style = this.scrollable ? `flex: 1 1 ${colWidth}px !important` : `width: ${colWidth}px !important`;
        innerHTML += `
                    .p-datatable[${this.attributeSelector}] .p-datatable-thead > tr > th:nth-child(${index + 1}),
                    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                    .p-datatable[${this.attributeSelector}] .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                        ${style}
                    }
                `;
      });
      this.styleElement.innerHTML = innerHTML;
    },
    bindColumnResizeEvents() {
      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener("mousemove", () => {
          if (this.columnResizing) {
            this.onColumnResize(event);
          }
        });
      }
      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener("mouseup", () => {
          if (this.columnResizing) {
            this.columnResizing = false;
            this.onColumnResizeEnd();
          }
        });
      }
    },
    unbindColumnResizeEvents() {
      if (this.documentColumnResizeListener) {
        document.removeEventListener("document", this.documentColumnResizeListener);
        this.documentColumnResizeListener = null;
      }
      if (this.documentColumnResizeEndListener) {
        document.removeEventListener("document", this.documentColumnResizeEndListener);
        this.documentColumnResizeEndListener = null;
      }
    },
    onColumnHeaderMouseDown(e) {
      const event2 = e.originalEvent;
      const column = e.column;
      if (this.reorderableColumns && this.columnProp(column, "reorderableColumn") !== false) {
        if (event2.target.nodeName === "INPUT" || event2.target.nodeName === "TEXTAREA" || DomHandler.hasClass(event2.target, "p-column-resizer"))
          event2.currentTarget.draggable = false;
        else
          event2.currentTarget.draggable = true;
      }
    },
    onColumnHeaderDragStart(event2) {
      if (this.columnResizing) {
        event2.preventDefault();
        return;
      }
      this.colReorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.$refs.reorderIndicatorUp);
      this.colReorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.$refs.reorderIndicatorUp);
      this.draggedColumn = this.findParentHeader(event2.target);
      event2.dataTransfer.setData("text", "b");
    },
    onColumnHeaderDragOver(event2) {
      let dropHeader = this.findParentHeader(event2.target);
      if (this.reorderableColumns && this.draggedColumn && dropHeader) {
        event2.preventDefault();
        let containerOffset = DomHandler.getOffset(this.$el);
        let dropHeaderOffset = DomHandler.getOffset(dropHeader);
        if (this.draggedColumn !== dropHeader) {
          let targetLeft = dropHeaderOffset.left - containerOffset.left;
          let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
          this.$refs.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.colReorderIconHeight - 1) + "px";
          this.$refs.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + "px";
          if (event2.pageX > columnCenter) {
            this.$refs.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + "px";
            this.$refs.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + "px";
            this.dropPosition = 1;
          } else {
            this.$refs.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + "px";
            this.$refs.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + "px";
            this.dropPosition = -1;
          }
          this.$refs.reorderIndicatorUp.style.display = "block";
          this.$refs.reorderIndicatorDown.style.display = "block";
        }
      }
    },
    onColumnHeaderDragLeave(event2) {
      if (this.reorderableColumns && this.draggedColumn) {
        event2.preventDefault();
        this.$refs.reorderIndicatorUp.style.display = "none";
        this.$refs.reorderIndicatorDown.style.display = "none";
      }
    },
    onColumnHeaderDrop(event2) {
      event2.preventDefault();
      if (this.draggedColumn) {
        let dragIndex = DomHandler.index(this.draggedColumn);
        let dropIndex = DomHandler.index(this.findParentHeader(event2.target));
        let allowDrop = dragIndex !== dropIndex;
        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
          allowDrop = false;
        }
        if (allowDrop) {
          ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
          this.updateReorderableColumns();
          this.$emit("column-reorder", {
            originalEvent: event2,
            dragIndex,
            dropIndex
          });
        }
        this.$refs.reorderIndicatorUp.style.display = "none";
        this.$refs.reorderIndicatorDown.style.display = "none";
        this.draggedColumn.draggable = false;
        this.draggedColumn = null;
        this.dropPosition = null;
      }
    },
    findParentHeader(element) {
      if (element.nodeName === "TH") {
        return element;
      } else {
        let parent = element.parentElement;
        while (parent.nodeName !== "TH") {
          parent = parent.parentElement;
          if (!parent)
            break;
        }
        return parent;
      }
    },
    findColumnByKey(columns, key) {
      if (columns && columns.length) {
        for (let i = 0; i < columns.length; i++) {
          let column = columns[i];
          if (this.columnProp(column, "columnKey") === key || this.columnProp(column, "field") === key) {
            return column;
          }
        }
      }
      return null;
    },
    onRowMouseDown(event2) {
      if (DomHandler.hasClass(event2.target, "p-datatable-reorderablerow-handle"))
        event2.currentTarget.draggable = true;
      else
        event2.currentTarget.draggable = false;
    },
    onRowDragStart(e) {
      const event2 = e.originalEvent;
      const index = e.index;
      this.rowDragging = true;
      this.draggedRowIndex = index;
      event2.dataTransfer.setData("text", "b");
    },
    onRowDragOver(e) {
      const event2 = e.originalEvent;
      const index = e.index;
      if (this.rowDragging && this.draggedRowIndex !== index) {
        let rowElement = event2.currentTarget;
        let rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
        let pageY = event2.pageY;
        let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
        let prevRowElement = rowElement.previousElementSibling;
        if (pageY < rowMidY) {
          DomHandler.removeClass(rowElement, "p-datatable-dragpoint-bottom");
          this.droppedRowIndex = index;
          if (prevRowElement)
            DomHandler.addClass(prevRowElement, "p-datatable-dragpoint-bottom");
          else
            DomHandler.addClass(rowElement, "p-datatable-dragpoint-top");
        } else {
          if (prevRowElement)
            DomHandler.removeClass(prevRowElement, "p-datatable-dragpoint-bottom");
          else
            DomHandler.addClass(rowElement, "p-datatable-dragpoint-top");
          this.droppedRowIndex = index + 1;
          DomHandler.addClass(rowElement, "p-datatable-dragpoint-bottom");
        }
        event2.preventDefault();
      }
    },
    onRowDragLeave(event2) {
      let rowElement = event2.currentTarget;
      let prevRowElement = rowElement.previousElementSibling;
      if (prevRowElement) {
        DomHandler.removeClass(prevRowElement, "p-datatable-dragpoint-bottom");
      }
      DomHandler.removeClass(rowElement, "p-datatable-dragpoint-bottom");
      DomHandler.removeClass(rowElement, "p-datatable-dragpoint-top");
    },
    onRowDragEnd(event2) {
      this.rowDragging = false;
      this.draggedRowIndex = null;
      this.droppedRowIndex = null;
      event2.currentTarget.draggable = false;
    },
    onRowDrop(event2) {
      if (this.droppedRowIndex != null) {
        let dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
        let processedData = [...this.processedData];
        ObjectUtils.reorderArray(processedData, this.draggedRowIndex, dropIndex);
        this.$emit("row-reorder", {
          originalEvent: event2,
          dragIndex: this.draggedRowIndex,
          dropIndex,
          value: processedData
        });
      }
      this.onRowDragLeave(event2);
      this.onRowDragEnd(event2);
      event2.preventDefault();
    },
    toggleRow(event2) {
      let rowData = event2.data;
      let expanded;
      let expandedRowIndex;
      let _expandedRows = this.expandedRows ? [...this.expandedRows] : [];
      if (this.dataKey) {
        expanded = this.d_expandedRowKeys ? this.d_expandedRowKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0 : false;
      } else {
        expandedRowIndex = this.findIndex(rowData, this.expandedRows);
        expanded = expandedRowIndex > -1;
      }
      if (expanded) {
        if (expandedRowIndex == null) {
          expandedRowIndex = this.findIndex(rowData, this.expandedRows);
        }
        _expandedRows.splice(expandedRowIndex, 1);
        this.$emit("update:expandedRows", _expandedRows);
        this.$emit("row-collapse", event2);
      } else {
        _expandedRows.push(rowData);
        this.$emit("update:expandedRows", _expandedRows);
        this.$emit("row-expand", event2);
      }
    },
    toggleRowGroup(e) {
      const event2 = e.originalEvent;
      const data = e.data;
      const groupFieldValue = ObjectUtils.resolveFieldData(data, this.groupRowsBy);
      let _expandedRowGroups = this.expandedRowGroups ? [...this.expandedRowGroups] : [];
      if (this.isRowGroupExpanded(data)) {
        _expandedRowGroups = _expandedRowGroups.filter((group) => group !== groupFieldValue);
        this.$emit("update:expandedRowGroups", _expandedRowGroups);
        this.$emit("rowgroup-collapse", { originalEvent: event2, data: groupFieldValue });
      } else {
        _expandedRowGroups.push(groupFieldValue);
        this.$emit("update:expandedRowGroups", _expandedRowGroups);
        this.$emit("rowgroup-expand", { originalEvent: event2, data: groupFieldValue });
      }
    },
    isRowGroupExpanded(rowData) {
      if (this.expandableRowGroups && this.expandedRowGroups) {
        let groupFieldValue = ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
      }
      return false;
    },
    isStateful() {
      return this.stateKey != null;
    },
    getStorage() {
      switch (this.stateStorage) {
        case "local":
          return window.localStorage;
        case "session":
          return window.sessionStorage;
        default:
          throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
    },
    saveState() {
      const storage = this.getStorage();
      let state = {};
      if (this.paginator) {
        state.first = this.d_first;
        state.rows = this.d_rows;
      }
      if (this.d_sortField) {
        state.sortField = this.d_sortField;
        state.sortOrder = this.d_sortOrder;
      }
      if (this.d_multiSortMeta) {
        state.multiSortMeta = this.d_multiSortMeta;
      }
      if (this.hasFilters) {
        state.filters = this.filters;
      }
      if (this.resizableColumns) {
        this.saveColumnWidths(state);
      }
      if (this.reorderableColumns) {
        state.columnOrder = this.d_columnOrder;
      }
      if (this.expandedRows) {
        state.expandedRows = this.expandedRows;
        state.expandedRowKeys = this.d_expandedRowKeys;
      }
      if (this.expandedRowGroups) {
        state.expandedRowGroups = this.expandedRowGroups;
      }
      if (this.selection) {
        state.selection = this.selection;
        state.selectionKeys = this.d_selectionKeys;
      }
      if (Object.keys(state).length) {
        storage.setItem(this.stateKey, JSON.stringify(state));
      }
      this.$emit("state-save", state);
    },
    restoreState() {
      const storage = this.getStorage();
      const stateString = storage.getItem(this.stateKey);
      const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
      const reviver = function(key, value) {
        if (typeof value === "string" && dateFormat.test(value)) {
          return new Date(value);
        }
        return value;
      };
      if (stateString) {
        let restoredState = JSON.parse(stateString, reviver);
        if (this.paginator) {
          this.d_first = restoredState.first;
          this.d_rows = restoredState.rows;
        }
        if (restoredState.sortField) {
          this.d_sortField = restoredState.sortField;
          this.d_sortOrder = restoredState.sortOrder;
        }
        if (restoredState.multiSortMeta) {
          this.d_multiSortMeta = restoredState.multiSortMeta;
        }
        if (restoredState.filters) {
          this.$emit("update:filters", restoredState.filters);
        }
        if (this.resizableColumns) {
          this.columnWidthsState = restoredState.columnWidths;
          this.tableWidthState = restoredState.tableWidth;
        }
        if (this.reorderableColumns) {
          this.d_columnOrder = restoredState.columnOrder;
        }
        if (restoredState.expandedRows) {
          this.d_expandedRowKeys = restoredState.expandedRowKeys;
          this.$emit("update:expandedRows", restoredState.expandedRows);
        }
        if (restoredState.expandedRowGroups) {
          this.$emit("update:expandedRowGroups", restoredState.expandedRowGroups);
        }
        if (restoredState.selection) {
          this.d_selectionKeys = restoredState.d_selectionKeys;
          this.$emit("update:selection", restoredState.selection);
        }
        this.$emit("state-restore", restoredState);
      }
    },
    saveColumnWidths(state) {
      let widths = [];
      let headers = DomHandler.find(this.$el, ".p-datatable-thead > tr > th");
      headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
      state.columnWidths = widths.join(",");
      if (this.columnResizeMode === "expand") {
        state.tableWidth = DomHandler.getOuterWidth(this.$refs.table) + "px";
      }
    },
    restoreColumnWidths() {
      if (this.columnWidthsState) {
        let widths = this.columnWidthsState.split(",");
        if (this.columnResizeMode === "expand" && this.tableWidthState) {
          this.$refs.table.style.width = this.tableWidthState;
          this.$refs.table.style.minWidth = this.tableWidthState;
          this.$el.style.width = this.tableWidthState;
        }
        if (ObjectUtils.isNotEmpty(widths)) {
          this.createStyleElement();
          let innerHTML = "";
          widths.forEach((width, index) => {
            let style = this.scrollable ? `flex: 1 1 ${width}px !important` : `width: ${width}px !important`;
            innerHTML += `
                            .p-datatable[${this.attributeSelector}] .p-datatable-thead > tr > th:nth-child(${index + 1}),
                            .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                            .p-datatable[${this.attributeSelector}] .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                                ${style}
                            }
                        `;
          });
          this.styleElement.innerHTML = innerHTML;
        }
      }
    },
    onCellEditInit(event2) {
      this.$emit("cell-edit-init", event2);
    },
    onCellEditComplete(event2) {
      this.$emit("cell-edit-complete", event2);
    },
    onCellEditCancel(event2) {
      this.$emit("cell-edit-cancel", event2);
    },
    onRowEditInit(event2) {
      let _editingRows = this.editingRows ? [...this.editingRows] : [];
      _editingRows.push(event2.data);
      this.$emit("update:editingRows", _editingRows);
      this.$emit("row-edit-init", event2);
    },
    onRowEditSave(event2) {
      let _editingRows = [...this.editingRows];
      _editingRows.splice(this.findIndex(event2.data, _editingRows), 1);
      this.$emit("update:editingRows", _editingRows);
      this.$emit("row-edit-save", event2);
    },
    onRowEditCancel(event2) {
      let _editingRows = [...this.editingRows];
      _editingRows.splice(this.findIndex(event2.data, _editingRows), 1);
      this.$emit("update:editingRows", _editingRows);
      this.$emit("row-edit-cancel", event2);
    },
    onEditingMetaChange(event2) {
      let { data, field, index, editing } = event2;
      let editingMeta = { ...this.d_editingMeta };
      let meta2 = editingMeta[index];
      if (editing) {
        !meta2 && (meta2 = editingMeta[index] = { data: { ...data }, fields: [] });
        meta2["fields"].push(field);
      } else if (meta2) {
        const fields = meta2["fields"].filter((f) => f !== field);
        !fields.length ? delete editingMeta[index] : meta2["fields"] = fields;
      }
      this.d_editingMeta = editingMeta;
    },
    clearEditingMetaData() {
      if (this.editMode) {
        this.d_editingMeta = {};
      }
    },
    createLazyLoadEvent(event2) {
      return {
        originalEvent: event2,
        first: this.d_first,
        rows: this.d_rows,
        sortField: this.d_sortField,
        sortOrder: this.d_sortOrder,
        multiSortMeta: this.d_multiSortMeta,
        filters: this.d_filters
      };
    },
    hasGlobalFilter() {
      return this.filters && Object.prototype.hasOwnProperty.call(this.filters, "global");
    },
    getChildren() {
      return this.$slots.default ? this.$slots.default() : null;
    },
    onFilterChange(filters) {
      this.d_filters = filters;
    },
    onFilterApply() {
      this.d_first = 0;
      this.$emit("update:first", this.d_first);
      this.$emit("update:filters", this.d_filters);
      if (this.lazy) {
        this.$emit("filter", this.createLazyLoadEvent());
      }
    },
    cloneFilters() {
      let cloned = {};
      if (this.filters) {
        Object.entries(this.filters).forEach(([prop, value]) => {
          cloned[prop] = value.operator ? { operator: value.operator, constraints: value.constraints.map((constraint) => {
            return { ...constraint };
          }) } : { ...value };
        });
      }
      return cloned;
    },
    updateReorderableColumns() {
      let columnOrder = [];
      this.columns.forEach((col) => columnOrder.push(this.columnProp(col, "columnKey") || this.columnProp(col, "field")));
      this.d_columnOrder = columnOrder;
    },
    createStyleElement() {
      this.styleElement = document.createElement("style");
      this.styleElement.type = "text/css";
      document.head.appendChild(this.styleElement);
    },
    createResponsiveStyle() {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = document.createElement("style");
        this.responsiveStyleElement.type = "text/css";
        document.head.appendChild(this.responsiveStyleElement);
        let innerHTML = `
@media screen and (max-width: ${this.breakpoint}) {
    .p-datatable[${this.attributeSelector}] .p-datatable-thead > tr > th,
    .p-datatable[${this.attributeSelector}] .p-datatable-tfoot > tr > td {
        display: none !important;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td {
        display: flex;
        width: 100% !important;
        align-items: center;
        justify-content: space-between;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td:not(:last-child) {
        border: 0 none;
    }

    .p-datatable[${this.attributeSelector}].p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-top: 0;
        border-right: 0;
        border-left: 0;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td > .p-column-title {
        display: block;
    }
}
`;
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    },
    destroyResponsiveStyle() {
      if (this.responsiveStyleElement) {
        document.head.removeChild(this.responsiveStyleElement);
        this.responsiveStyleElement = null;
      }
    },
    destroyStyleElement() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    recursiveGetChildren(children, results) {
      if (!results) {
        results = [];
      }
      if (children && children.length) {
        children.forEach((child) => {
          if (child.children instanceof Array) {
            results.concat(this.recursiveGetChildren(child.children, results));
          } else if (child.type.name == "Column") {
            results.push(child);
          }
        });
      }
      return results;
    },
    dataToRender(data) {
      const _data = data || this.processedData;
      if (_data && this.paginator) {
        const first = this.lazy ? 0 : this.d_first;
        return _data.slice(first, first + this.d_rows);
      }
      return _data;
    },
    getVirtualScrollerRef() {
      return this.$refs.virtualScroller;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-datatable p-component",
        {
          "p-datatable-hoverable-rows": this.rowHover || this.selectionMode,
          "p-datatable-auto-layout": this.autoLayout,
          "p-datatable-resizable": this.resizableColumns,
          "p-datatable-resizable-fit": this.resizableColumns && this.columnResizeMode === "fit",
          "p-datatable-scrollable": this.scrollable,
          "p-datatable-scrollable-vertical": this.scrollable && this.scrollDirection === "vertical",
          "p-datatable-scrollable-horizontal": this.scrollable && this.scrollDirection === "horizontal",
          "p-datatable-scrollable-both": this.scrollable && this.scrollDirection === "both",
          "p-datatable-flex-scrollable": this.scrollable && this.scrollHeight === "flex",
          "p-datatable-responsive-stack": this.responsiveLayout === "stack",
          "p-datatable-responsive-scroll": this.responsiveLayout === "scroll",
          "p-datatable-striped": this.stripedRows,
          "p-datatable-gridlines": this.showGridlines,
          "p-datatable-grouped-header": this.headerColumnGroup != null,
          "p-datatable-grouped-footer": this.footerColumnGroup != null
        }
      ];
    },
    columns() {
      let children = this.getChildren();
      if (!children) {
        return;
      }
      const cols = this.recursiveGetChildren(children, []);
      if (this.reorderableColumns && this.d_columnOrder) {
        let orderedColumns = [];
        for (let columnKey of this.d_columnOrder) {
          let column = this.findColumnByKey(cols, columnKey);
          if (column && !this.columnProp(column, "hidden")) {
            orderedColumns.push(column);
          }
        }
        return [...orderedColumns, ...cols.filter((item) => orderedColumns.indexOf(item) < 0)];
      }
      return cols;
    },
    headerColumnGroup() {
      const children = this.getChildren();
      if (children) {
        for (let child of children) {
          if (child.type.name === "ColumnGroup" && this.columnProp(child, "type") === "header") {
            return child;
          }
        }
      }
      return null;
    },
    footerColumnGroup() {
      const children = this.getChildren();
      if (children) {
        for (let child of children) {
          if (child.type.name === "ColumnGroup" && this.columnProp(child, "type") === "footer") {
            return child;
          }
        }
      }
      return null;
    },
    hasFilters() {
      return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
    },
    processedData() {
      let data = this.value || [];
      if (!this.lazy) {
        if (data && data.length) {
          if (this.hasFilters) {
            data = this.filter(data);
          }
          if (this.sorted) {
            if (this.sortMode === "single")
              data = this.sortSingle(data);
            else if (this.sortMode === "multiple")
              data = this.sortMultiple(data);
          }
        }
      }
      return data;
    },
    totalRecordsLength() {
      if (this.lazy) {
        return this.totalRecords;
      } else {
        const data = this.processedData;
        return data ? data.length : 0;
      }
    },
    empty() {
      const data = this.processedData;
      return !data || data.length === 0;
    },
    paginatorTop() {
      return this.paginator && (this.paginatorPosition !== "bottom" || this.paginatorPosition === "both");
    },
    paginatorBottom() {
      return this.paginator && (this.paginatorPosition !== "top" || this.paginatorPosition === "both");
    },
    sorted() {
      return this.d_sortField || this.d_multiSortMeta && this.d_multiSortMeta.length > 0;
    },
    loadingIconClass() {
      return ["p-datatable-loading-icon pi-spin", this.loadingIcon];
    },
    allRowsSelected() {
      if (this.selectAll !== null) {
        return this.selectAll;
      } else {
        const val = this.frozenValue ? [...this.frozenValue, ...this.processedData] : this.processedData;
        return ObjectUtils.isNotEmpty(val) && this.selection && Array.isArray(this.selection) && val.every((v) => this.selection.some((s) => this.equals(s, v)));
      }
    },
    attributeSelector() {
      return UniqueComponentId();
    },
    groupRowSortField() {
      return this.sortMode === "single" ? this.sortField : this.d_groupRowsSortMeta ? this.d_groupRowsSortMeta.field : null;
    },
    virtualScrollerDisabled() {
      return ObjectUtils.isEmpty(this.virtualScrollerOptions) || !this.scrollable;
    }
  },
  components: {
    "DTPaginator": script$c,
    "DTTableHeader": script$7,
    "DTTableBody": script$3$1,
    "DTTableFooter": script$1$1,
    "DTVirtualScroller": script$h
  }
};
const _hoisted_1$b = {
  key: 0,
  class: "p-datatable-loading-overlay p-component-overlay"
};
const _hoisted_2$8 = {
  key: 1,
  class: "p-datatable-header"
};
const _hoisted_3$7 = {
  key: 4,
  class: "p-datatable-footer"
};
const _hoisted_4$5 = {
  ref: "resizeHelper",
  class: "p-column-resizer-helper",
  style: { "display": "none" }
};
const _hoisted_5$4 = {
  key: 5,
  ref: "reorderIndicatorUp",
  class: "pi pi-arrow-down p-datatable-reorder-indicator-up",
  style: { "position": "absolute", "display": "none" }
};
const _hoisted_6$4 = {
  key: 6,
  ref: "reorderIndicatorDown",
  class: "pi pi-arrow-up p-datatable-reorder-indicator-down",
  style: { "position": "absolute", "display": "none" }
};
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DTPaginator = vue_cjs_prod.resolveComponent("DTPaginator");
  const _component_DTTableHeader = vue_cjs_prod.resolveComponent("DTTableHeader");
  const _component_DTTableBody = vue_cjs_prod.resolveComponent("DTTableBody");
  const _component_DTTableFooter = vue_cjs_prod.resolveComponent("DTTableFooter");
  const _component_DTVirtualScroller = vue_cjs_prod.resolveComponent("DTVirtualScroller");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    "data-scrollselectors": ".p-datatable-wrapper"
  }, [
    vue_cjs_prod.renderSlot(_ctx.$slots, "default"),
    $props.loading ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_1$b, [
      _ctx.$slots.loading ? vue_cjs_prod.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("i", {
        key: 1,
        class: vue_cjs_prod.normalizeClass($options.loadingIconClass)
      }, null, 2))
    ])) : vue_cjs_prod.createCommentVNode("", true),
    _ctx.$slots.header ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_2$8, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "header")
    ])) : vue_cjs_prod.createCommentVNode("", true),
    $options.paginatorTop ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTPaginator, {
      key: 2,
      rows: $data.d_rows,
      first: $data.d_first,
      totalRecords: $options.totalRecordsLength,
      pageLinkSize: $props.pageLinkSize,
      template: $props.paginatorTemplate,
      rowsPerPageOptions: $props.rowsPerPageOptions,
      currentPageReportTemplate: $props.currentPageReportTemplate,
      class: "p-paginator-top",
      onPage: _cache[0] || (_cache[0] = ($event) => $options.onPage($event)),
      alwaysShow: $props.alwaysShowPaginator
    }, vue_cjs_prod.createSlots({ _: 2 }, [
      _ctx.$slots.paginatorstart ? {
        name: "start",
        fn: vue_cjs_prod.withCtx(() => [
          vue_cjs_prod.renderSlot(_ctx.$slots, "paginatorstart")
        ])
      } : void 0,
      _ctx.$slots.paginatorend ? {
        name: "end",
        fn: vue_cjs_prod.withCtx(() => [
          vue_cjs_prod.renderSlot(_ctx.$slots, "paginatorend")
        ])
      } : void 0
    ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "alwaysShow"])) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createElementVNode("div", {
      class: "p-datatable-wrapper",
      style: vue_cjs_prod.normalizeStyle({ maxHeight: $options.virtualScrollerDisabled ? $props.scrollHeight : "" })
    }, [
      vue_cjs_prod.createVNode(_component_DTVirtualScroller, vue_cjs_prod.mergeProps({ ref: "virtualScroller" }, $props.virtualScrollerOptions, {
        items: $options.processedData,
        columns: $options.columns,
        style: { height: $props.scrollHeight },
        disabled: $options.virtualScrollerDisabled,
        loaderDisabled: "",
        showSpacer: false
      }), {
        content: vue_cjs_prod.withCtx((slotProps) => [
          vue_cjs_prod.createElementVNode("table", {
            ref: "table",
            role: "table",
            class: vue_cjs_prod.normalizeClass([$props.tableClass, "p-datatable-table"]),
            style: vue_cjs_prod.normalizeStyle([$props.tableStyle, slotProps.spacerStyle])
          }, [
            vue_cjs_prod.createVNode(_component_DTTableHeader, {
              columnGroup: $options.headerColumnGroup,
              columns: slotProps.columns,
              rowGroupMode: $props.rowGroupMode,
              groupRowsBy: $props.groupRowsBy,
              groupRowSortField: $options.groupRowSortField,
              reorderableColumns: $props.reorderableColumns,
              resizableColumns: $props.resizableColumns,
              allRowsSelected: $options.allRowsSelected,
              empty: $options.empty,
              sortMode: $props.sortMode,
              sortField: $data.d_sortField,
              sortOrder: $data.d_sortOrder,
              multiSortMeta: $data.d_multiSortMeta,
              filters: $data.d_filters,
              filtersStore: $props.filters,
              filterDisplay: $props.filterDisplay,
              onColumnClick: _cache[1] || (_cache[1] = ($event) => $options.onColumnHeaderClick($event)),
              onColumnMousedown: _cache[2] || (_cache[2] = ($event) => $options.onColumnHeaderMouseDown($event)),
              onFilterChange: $options.onFilterChange,
              onFilterApply: $options.onFilterApply,
              onColumnDragstart: _cache[3] || (_cache[3] = ($event) => $options.onColumnHeaderDragStart($event)),
              onColumnDragover: _cache[4] || (_cache[4] = ($event) => $options.onColumnHeaderDragOver($event)),
              onColumnDragleave: _cache[5] || (_cache[5] = ($event) => $options.onColumnHeaderDragLeave($event)),
              onColumnDrop: _cache[6] || (_cache[6] = ($event) => $options.onColumnHeaderDrop($event)),
              onColumnResizestart: _cache[7] || (_cache[7] = ($event) => $options.onColumnResizeStart($event)),
              onCheckboxChange: _cache[8] || (_cache[8] = ($event) => $options.toggleRowsWithCheckbox($event))
            }, null, 8, ["columnGroup", "columns", "rowGroupMode", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "allRowsSelected", "empty", "sortMode", "sortField", "sortOrder", "multiSortMeta", "filters", "filtersStore", "filterDisplay", "onFilterChange", "onFilterApply"]),
            $props.frozenValue ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTTableBody, {
              key: 0,
              ref: "frozenBodyRef",
              value: $props.frozenValue,
              frozenRow: true,
              class: "p-datatable-frozen-tbody",
              columns: slotProps.columns,
              dataKey: $props.dataKey,
              selection: $props.selection,
              selectionKeys: $data.d_selectionKeys,
              selectionMode: $props.selectionMode,
              contextMenu: $props.contextMenu,
              contextMenuSelection: $props.contextMenuSelection,
              rowGroupMode: $props.rowGroupMode,
              groupRowsBy: $props.groupRowsBy,
              expandableRowGroups: $props.expandableRowGroups,
              rowClass: $props.rowClass,
              rowStyle: $props.rowStyle,
              editMode: $props.editMode,
              compareSelectionBy: $props.compareSelectionBy,
              scrollable: $props.scrollable,
              expandedRowIcon: $props.expandedRowIcon,
              collapsedRowIcon: $props.collapsedRowIcon,
              expandedRows: $props.expandedRows,
              expandedRowKeys: $data.d_expandedRowKeys,
              expandedRowGroups: $props.expandedRowGroups,
              editingRows: $props.editingRows,
              editingRowKeys: $data.d_editingRowKeys,
              templates: _ctx.$slots,
              responsiveLayout: $props.responsiveLayout,
              onRowgroupToggle: $options.toggleRowGroup,
              onRowClick: _cache[9] || (_cache[9] = ($event) => $options.onRowClick($event)),
              onRowDblclick: _cache[10] || (_cache[10] = ($event) => $options.onRowDblClick($event)),
              onRowRightclick: _cache[11] || (_cache[11] = ($event) => $options.onRowRightClick($event)),
              onRowTouchend: $options.onRowTouchEnd,
              onRowKeydown: $options.onRowKeyDown,
              onRowMousedown: $options.onRowMouseDown,
              onRowDragstart: _cache[12] || (_cache[12] = ($event) => $options.onRowDragStart($event)),
              onRowDragover: _cache[13] || (_cache[13] = ($event) => $options.onRowDragOver($event)),
              onRowDragleave: _cache[14] || (_cache[14] = ($event) => $options.onRowDragLeave($event)),
              onRowDragend: _cache[15] || (_cache[15] = ($event) => $options.onRowDragEnd($event)),
              onRowDrop: _cache[16] || (_cache[16] = ($event) => $options.onRowDrop($event)),
              onRowToggle: _cache[17] || (_cache[17] = ($event) => $options.toggleRow($event)),
              onRadioChange: _cache[18] || (_cache[18] = ($event) => $options.toggleRowWithRadio($event)),
              onCheckboxChange: _cache[19] || (_cache[19] = ($event) => $options.toggleRowWithCheckbox($event)),
              onCellEditInit: _cache[20] || (_cache[20] = ($event) => $options.onCellEditInit($event)),
              onCellEditComplete: _cache[21] || (_cache[21] = ($event) => $options.onCellEditComplete($event)),
              onCellEditCancel: _cache[22] || (_cache[22] = ($event) => $options.onCellEditCancel($event)),
              onRowEditInit: _cache[23] || (_cache[23] = ($event) => $options.onRowEditInit($event)),
              onRowEditSave: _cache[24] || (_cache[24] = ($event) => $options.onRowEditSave($event)),
              onRowEditCancel: _cache[25] || (_cache[25] = ($event) => $options.onRowEditCancel($event)),
              editingMeta: $data.d_editingMeta,
              onEditingMetaChange: $options.onEditingMetaChange,
              isVirtualScrollerDisabled: true
            }, null, 8, ["value", "columns", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowKeys", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange"])) : vue_cjs_prod.createCommentVNode("", true),
            vue_cjs_prod.createVNode(_component_DTTableBody, {
              ref: "bodyRef",
              value: $options.dataToRender(slotProps.rows),
              class: vue_cjs_prod.normalizeClass(slotProps.styleClass),
              columns: slotProps.columns,
              empty: $options.empty,
              dataKey: $props.dataKey,
              selection: $props.selection,
              selectionKeys: $data.d_selectionKeys,
              selectionMode: $props.selectionMode,
              contextMenu: $props.contextMenu,
              contextMenuSelection: $props.contextMenuSelection,
              rowGroupMode: $props.rowGroupMode,
              groupRowsBy: $props.groupRowsBy,
              expandableRowGroups: $props.expandableRowGroups,
              rowClass: $props.rowClass,
              rowStyle: $props.rowStyle,
              editMode: $props.editMode,
              compareSelectionBy: $props.compareSelectionBy,
              scrollable: $props.scrollable,
              expandedRowIcon: $props.expandedRowIcon,
              collapsedRowIcon: $props.collapsedRowIcon,
              expandedRows: $props.expandedRows,
              expandedRowKeys: $data.d_expandedRowKeys,
              expandedRowGroups: $props.expandedRowGroups,
              editingRows: $props.editingRows,
              editingRowKeys: $data.d_editingRowKeys,
              templates: _ctx.$slots,
              responsiveLayout: $props.responsiveLayout,
              onRowgroupToggle: $options.toggleRowGroup,
              onRowClick: _cache[26] || (_cache[26] = ($event) => $options.onRowClick($event)),
              onRowDblclick: _cache[27] || (_cache[27] = ($event) => $options.onRowDblClick($event)),
              onRowRightclick: _cache[28] || (_cache[28] = ($event) => $options.onRowRightClick($event)),
              onRowTouchend: $options.onRowTouchEnd,
              onRowKeydown: $options.onRowKeyDown,
              onRowMousedown: $options.onRowMouseDown,
              onRowDragstart: _cache[29] || (_cache[29] = ($event) => $options.onRowDragStart($event)),
              onRowDragover: _cache[30] || (_cache[30] = ($event) => $options.onRowDragOver($event)),
              onRowDragleave: _cache[31] || (_cache[31] = ($event) => $options.onRowDragLeave($event)),
              onRowDragend: _cache[32] || (_cache[32] = ($event) => $options.onRowDragEnd($event)),
              onRowDrop: _cache[33] || (_cache[33] = ($event) => $options.onRowDrop($event)),
              onRowToggle: _cache[34] || (_cache[34] = ($event) => $options.toggleRow($event)),
              onRadioChange: _cache[35] || (_cache[35] = ($event) => $options.toggleRowWithRadio($event)),
              onCheckboxChange: _cache[36] || (_cache[36] = ($event) => $options.toggleRowWithCheckbox($event)),
              onCellEditInit: _cache[37] || (_cache[37] = ($event) => $options.onCellEditInit($event)),
              onCellEditComplete: _cache[38] || (_cache[38] = ($event) => $options.onCellEditComplete($event)),
              onCellEditCancel: _cache[39] || (_cache[39] = ($event) => $options.onCellEditCancel($event)),
              onRowEditInit: _cache[40] || (_cache[40] = ($event) => $options.onRowEditInit($event)),
              onRowEditSave: _cache[41] || (_cache[41] = ($event) => $options.onRowEditSave($event)),
              onRowEditCancel: _cache[42] || (_cache[42] = ($event) => $options.onRowEditCancel($event)),
              editingMeta: $data.d_editingMeta,
              onEditingMetaChange: $options.onEditingMetaChange,
              virtualScrollerContentProps: slotProps,
              isVirtualScrollerDisabled: $options.virtualScrollerDisabled
            }, null, 8, ["value", "class", "columns", "empty", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowKeys", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange", "virtualScrollerContentProps", "isVirtualScrollerDisabled"]),
            vue_cjs_prod.createVNode(_component_DTTableFooter, {
              columnGroup: $options.footerColumnGroup,
              columns: slotProps.columns
            }, null, 8, ["columnGroup", "columns"])
          ], 6)
        ]),
        _: 1
      }, 16, ["items", "columns", "style", "disabled"])
    ], 4),
    $options.paginatorBottom ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DTPaginator, {
      key: 3,
      rows: $data.d_rows,
      first: $data.d_first,
      totalRecords: $options.totalRecordsLength,
      pageLinkSize: $props.pageLinkSize,
      template: $props.paginatorTemplate,
      rowsPerPageOptions: $props.rowsPerPageOptions,
      currentPageReportTemplate: $props.currentPageReportTemplate,
      class: "p-paginator-bottom",
      onPage: _cache[43] || (_cache[43] = ($event) => $options.onPage($event)),
      alwaysShow: $props.alwaysShowPaginator
    }, vue_cjs_prod.createSlots({ _: 2 }, [
      _ctx.$slots.paginatorstart ? {
        name: "start",
        fn: vue_cjs_prod.withCtx(() => [
          vue_cjs_prod.renderSlot(_ctx.$slots, "paginatorstart")
        ])
      } : void 0,
      _ctx.$slots.paginatorend ? {
        name: "end",
        fn: vue_cjs_prod.withCtx(() => [
          vue_cjs_prod.renderSlot(_ctx.$slots, "paginatorend")
        ])
      } : void 0
    ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "alwaysShow"])) : vue_cjs_prod.createCommentVNode("", true),
    _ctx.$slots.footer ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_3$7, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "footer")
    ])) : vue_cjs_prod.createCommentVNode("", true),
    vue_cjs_prod.createElementVNode("div", _hoisted_4$5, null, 512),
    $props.reorderableColumns ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_5$4, null, 512)) : vue_cjs_prod.createCommentVNode("", true),
    $props.reorderableColumns ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_6$4, null, 512)) : vue_cjs_prod.createCommentVNode("", true)
  ], 2);
}
function styleInject$4(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$4 = "\n.p-datatable {\n    position: relative;\n}\n.p-datatable table {\n    border-collapse: collapse;\n    min-width: 100%;\n    table-layout: fixed;\n}\n.p-datatable .p-sortable-column {\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.p-datatable .p-sortable-column .p-column-title,\n.p-datatable .p-sortable-column .p-sortable-column-icon,\n.p-datatable .p-sortable-column .p-sortable-column-badge {\n    vertical-align: middle;\n}\n.p-datatable .p-sortable-column .p-sortable-column-badge {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-datatable-responsive-scroll > .p-datatable-wrapper {\n    overflow-x: auto;\n}\n.p-datatable-responsive-scroll > .p-datatable-wrapper > table,\n.p-datatable-auto-layout > .p-datatable-wrapper > table {\n    table-layout: auto;\n}\n.p-datatable-hoverable-rows .p-selectable-row {\n    cursor: pointer;\n}\n\n/* Scrollable */\n.p-datatable-scrollable .p-datatable-wrapper {\n    position: relative;\n    overflow: auto;\n}\n.p-datatable-scrollable .p-datatable-thead,\n.p-datatable-scrollable .p-datatable-tbody,\n.p-datatable-scrollable .p-datatable-tfoot {\n    display: block;\n}\n.p-datatable-scrollable .p-datatable-thead > tr,\n.p-datatable-scrollable .p-datatable-tbody > tr,\n.p-datatable-scrollable .p-datatable-tfoot > tr {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    width: 100%;\n}\n.p-datatable-scrollable .p-datatable-thead > tr > th,\n.p-datatable-scrollable .p-datatable-tbody > tr > td,\n.p-datatable-scrollable .p-datatable-tfoot > tr > td {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-datatable-scrollable .p-datatable-thead {\n    position: sticky;\n    top: 0;\n    z-index: 1;\n}\n.p-datatable-scrollable .p-datatable-frozen-tbody {\n    position: sticky;\n    z-index: 1;\n}\n.p-datatable-scrollable .p-datatable-tfoot {\n    position: sticky;\n    bottom: 0;\n    z-index: 1;\n}\n.p-datatable-scrollable .p-frozen-column {\n    position: sticky;\n    background: inherit;\n}\n.p-datatable-scrollable th.p-frozen-column {\n    z-index: 1;\n}\n.p-datatable-scrollable-both .p-datatable-thead > tr > th,\n.p-datatable-scrollable-both .p-datatable-tbody > tr > td,\n.p-datatable-scrollable-both .p-datatable-tfoot > tr > td,\n.p-datatable-scrollable-horizontal .p-datatable-thead > tr > th\n.p-datatable-scrollable-horizontal .p-datatable-tbody > tr > td,\n.p-datatable-scrollable-horizontal .p-datatable-tfoot > tr > td {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n}\n.p-datatable-flex-scrollable {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%;\n}\n.p-datatable-flex-scrollable .p-datatable-wrapper {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    height: 100%;\n}\n.p-datatable-scrollable .p-rowgroup-header {\n    position: sticky;\n    z-index: 1;\n}\n.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead,\n.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot {\n    display: table;\n    border-collapse: collapse;\n    width: 100%;\n    table-layout: fixed;\n}\n.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead > tr,\n.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot > tr {\n    display: table-row;\n}\n.p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead > tr > th,\n.p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot > tr > td {\n    display: table-cell;\n}\n.p-datatable-scrollable .p-virtualscroller > .p-datatable-table {\n    display: inline-block; /* For Safari */\n}\n\n/* Resizable */\n.p-datatable-resizable > .p-datatable-wrapper {\n    overflow-x: auto;\n}\n.p-datatable-resizable .p-datatable-thead > tr > th,\n.p-datatable-resizable .p-datatable-tfoot > tr > td,\n.p-datatable-resizable .p-datatable-tbody > tr > td {\n    overflow: hidden;\n    white-space: nowrap;\n}\n.p-datatable-resizable .p-resizable-column:not(.p-frozen-column) {\n    background-clip: padding-box;\n    position: relative;\n}\n.p-datatable-resizable-fit .p-resizable-column:last-child .p-column-resizer {\n    display: none;\n}\n.p-datatable .p-column-resizer {\n    display: block;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: .5rem;\n    height: 100%;\n    padding: 0px;\n    cursor:col-resize;\n    border: 1px solid transparent;\n}\n.p-datatable .p-column-header-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-datatable .p-column-resizer-helper {\n    width: 1px;\n    position: absolute;\n    z-index: 10;\n    display: none;\n}\n.p-datatable .p-row-editor-init,\n.p-datatable .p-row-editor-save,\n.p-datatable .p-row-editor-cancel {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Expand */\n.p-datatable .p-row-toggler {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Reorder */\n.p-datatable-reorder-indicator-up,\n.p-datatable-reorder-indicator-down {\n    position: absolute;\n    display: none;\n}\n.p-reorderable-column,\n.p-datatable-reorderablerow-handle {\n    cursor: move;\n}\n\n/* Loader */\n.p-datatable .p-datatable-loading-overlay {\n    position: absolute;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    z-index: 2;\n}\n\n/* Filter */\n.p-column-filter-row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n}\n.p-column-filter-menu {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    margin-left: auto;\n}\n.p-column-filter-row .p-column-filter-element {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n}\n.p-column-filter-menu-button,\n.p-column-filter-clear-button {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-column-filter-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-column-filter-row-items {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-column-filter-row-item {\n    cursor: pointer;\n}\n.p-column-filter-add-button,\n.p-column-filter-remove-button {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-column-filter-add-button .p-button-label,\n.p-column-filter-remove-button .p-button-label {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n.p-column-filter-buttonbar {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {\n    width: auto;\n}\n\n/* Responsive */\n.p-datatable .p-datatable-tbody > tr > td > .p-column-title {\n    display: none;\n}\n\n/* VirtualScroller */\n.p-datatable .p-virtualscroller-loading {\n    -webkit-transform: none !important;\n            transform: none !important;\n    min-height: 0;\n    position: sticky;\n    top: 0;\n    left: 0;\n}\n";
styleInject$4(css_248z$4);
script$b.render = render$b;
var script$4 = {
  name: "Column",
  props: {
    columnKey: {
      type: null,
      default: null
    },
    field: {
      type: [String, Function],
      default: null
    },
    sortField: {
      type: [String, Function],
      default: null
    },
    filterField: {
      type: [String, Function],
      default: null
    },
    dataType: {
      type: String,
      default: "text"
    },
    sortable: {
      type: Boolean,
      default: false
    },
    header: {
      type: null,
      default: null
    },
    footer: {
      type: null,
      default: null
    },
    style: {
      type: null,
      default: null
    },
    class: {
      type: String,
      default: null
    },
    headerStyle: {
      type: null,
      default: null
    },
    headerClass: {
      type: String,
      default: null
    },
    bodyStyle: {
      type: null,
      default: null
    },
    bodyClass: {
      type: String,
      default: null
    },
    footerStyle: {
      type: null,
      default: null
    },
    footerClass: {
      type: String,
      default: null
    },
    showFilterMenu: {
      type: Boolean,
      default: true
    },
    showFilterOperator: {
      type: Boolean,
      default: true
    },
    showClearButton: {
      type: Boolean,
      default: true
    },
    showApplyButton: {
      type: Boolean,
      default: true
    },
    showFilterMatchModes: {
      type: Boolean,
      default: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    filterMatchModeOptions: {
      type: Array,
      default: null
    },
    maxConstraints: {
      type: Number,
      default: 2
    },
    excludeGlobalFilter: {
      type: Boolean,
      default: false
    },
    filterHeaderClass: {
      type: String,
      default: null
    },
    filterHeaderStyle: {
      type: null,
      default: null
    },
    filterMenuClass: {
      type: String,
      default: null
    },
    filterMenuStyle: {
      type: null,
      default: null
    },
    selectionMode: {
      type: String,
      default: null
    },
    expander: {
      type: Boolean,
      default: false
    },
    colspan: {
      type: Number,
      default: null
    },
    rowspan: {
      type: Number,
      default: null
    },
    rowReorder: {
      type: Boolean,
      default: false
    },
    rowReorderIcon: {
      type: String,
      default: "pi pi-bars"
    },
    reorderableColumn: {
      type: Boolean,
      default: true
    },
    rowEditor: {
      type: Boolean,
      default: false
    },
    frozen: {
      type: Boolean,
      default: false
    },
    alignFrozen: {
      type: String,
      default: "left"
    },
    exportable: {
      type: Boolean,
      default: true
    },
    exportHeader: {
      type: String,
      default: null
    },
    exportFooter: {
      type: String,
      default: null
    },
    filterMatchMode: {
      type: String,
      default: null
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return null;
  }
};
var script$3 = {
  name: "MultiSelect",
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter", "selectall-change"],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "200px"
    },
    placeholder: String,
    disabled: Boolean,
    inputId: String,
    inputProps: null,
    panelStyle: null,
    panelClass: null,
    panelProps: null,
    filterInputProps: null,
    closeButtonProps: null,
    dataKey: null,
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    appendTo: {
      type: String,
      default: "body"
    },
    display: {
      type: String,
      default: "comma"
    },
    selectedItemsLabel: {
      type: String,
      default: "{0} items selected"
    },
    maxSelectedLabels: {
      type: Number,
      default: null
    },
    selectionLimit: {
      type: Number,
      default: null
    },
    showToggleAll: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    },
    selectAll: {
      type: Boolean,
      default: null
    },
    resetFilterOnHide: {
      type: Boolean,
      default: false
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: true
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    "aria-label": {
      type: String,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  startRangeIndex: -1,
  searchTimeout: null,
  searchValue: "",
  selectOnFocus: false,
  focusOnHover: false,
  data() {
    return {
      id: UniqueComponentId(),
      focused: false,
      focusedOptionIndex: -1,
      headerCheckboxFocused: false,
      filterValue: null,
      overlayVisible: false
    };
  },
  watch: {
    options() {
      this.autoUpdateModel();
    }
  },
  mounted() {
    this.id = this.$attrs.id || this.id;
    this.autoUpdateModel();
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey(option) {
      return this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
    },
    isOptionDisabled(option) {
      if (this.maxSelectionLimitReached && !this.isSelected(option)) {
        return true;
      }
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset(index) {
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
    },
    show(isFocus) {
      this.$emit("before-show");
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && this.$refs.focusInput.focus();
    },
    hide(isFocus) {
      this.$emit("before-hide");
      this.overlayVisible = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.resetFilterOnHide && (this.filterValue = null);
      isFocus && this.$refs.focusInput.focus();
    },
    onFocus(event2) {
      this.focused = true;
      this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event2);
    },
    onBlur(event2) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.$emit("blur", event2);
    },
    onKeyDown(event2) {
      switch (event2.code) {
        case "ArrowDown":
          this.onArrowDownKey(event2);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event2);
          break;
        case "Home":
          this.onHomeKey(event2);
          break;
        case "End":
          this.onEndKey(event2);
          break;
        case "PageDown":
          this.onPageDownKey(event2);
          break;
        case "PageUp":
          this.onPageUpKey(event2);
          break;
        case "Enter":
        case "Space":
          this.onEnterKey(event2);
          break;
        case "Escape":
          this.onEscapeKey(event2);
          break;
        case "Tab":
          this.onTabKey(event2);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          this.onShiftKey(event2);
          break;
        default:
          if (event2.code === "KeyA" && (event2.metaKey || event2.ctrlKey)) {
            const value = this.visibleOptions.filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
            this.updateModel(event2, value);
            event2.preventDefault();
            break;
          }
          if (ObjectUtils.isPrintableCharacter(event2.key)) {
            !this.overlayVisible && this.show();
            this.searchOptions(event2);
            event2.preventDefault();
          }
          break;
      }
    },
    onContainerClick(event2) {
      if (this.disabled || this.loading) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event2.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
    },
    onFirstHiddenFocus(event2) {
      const relatedTarget = event2.relatedTarget;
      if (relatedTarget === this.$refs.focusInput) {
        const firstFocusableEl = DomHandler.getFirstFocusableElement(this.overlay, ":not(.p-hidden-focusable)");
        firstFocusableEl && firstFocusableEl.focus();
      } else {
        this.$refs.focusInput.focus();
      }
    },
    onLastHiddenFocus() {
      this.$refs.firstHiddenFocusableElementOnOverlay.focus();
    },
    onCloseClick() {
      this.hide(true);
    },
    onHeaderCheckboxFocus() {
      this.headerCheckboxFocused = true;
    },
    onHeaderCheckboxBlur() {
      this.headerCheckboxFocused = false;
    },
    onOptionSelect(event2, option, index = -1, isFocus = false) {
      if (this.disabled || this.isOptionDisabled(option)) {
        return;
      }
      let selected = this.isSelected(option);
      let value = null;
      if (selected)
        value = this.modelValue.filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey));
      else
        value = [...this.modelValue || [], this.getOptionValue(option)];
      this.updateModel(event2, value);
      isFocus && this.$refs.focusInput.focus();
      index !== -1 && (this.focusedOptionIndex = index);
    },
    onOptionMouseMove(event2, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event2, index);
      }
    },
    onOptionSelectRange(event2, start = -1, end = -1) {
      start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
      end === -1 && (end = this.findNearestSelectedOptionIndex(start));
      if (start !== -1 && end !== -1) {
        const rangeStart = Math.min(start, end);
        const rangeEnd = Math.max(start, end);
        const value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
        this.updateModel(event2, value);
      }
    },
    onFilterChange(event2) {
      const value = event2.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit("filter", { originalEvent: event2, value });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown(event2) {
      switch (event2.code) {
        case "ArrowDown":
          this.onArrowDownKey(event2);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event2, true);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event2, true);
          break;
        case "Home":
          this.onHomeKey(event2, true);
          break;
        case "End":
          this.onEndKey(event2, true);
          break;
        case "Enter":
          this.onEnterKey(event2);
          break;
        case "Escape":
          this.onEscapeKey(event2);
          break;
        case "Tab":
          this.onTabKey(event2, true);
          break;
      }
    },
    onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick(event2) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event2,
        target: this.$el
      });
    },
    onOverlayKeyDown(event2) {
      switch (event2.code) {
        case "Escape":
          this.onEscapeKey(event2);
          break;
      }
    },
    onArrowDownKey(event2) {
      const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      if (event2.shiftKey) {
        this.onOptionSelectRange(event2, this.startRangeIndex, optionIndex);
      }
      this.changeFocusedOptionIndex(event2, optionIndex);
      !this.overlayVisible && this.show();
      event2.preventDefault();
    },
    onArrowUpKey(event2, pressedInInputText = false) {
      if (event2.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event2.preventDefault();
      } else {
        const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        if (event2.shiftKey) {
          this.onOptionSelectRange(event2, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event2, optionIndex);
        !this.overlayVisible && this.show();
        event2.preventDefault();
      }
    },
    onArrowLeftKey(event2, pressedInInputText = false) {
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey(event2, pressedInInputText = false) {
      if (pressedInInputText) {
        event2.currentTarget.setSelectionRange(0, 0);
        this.focusedOptionIndex = -1;
      } else {
        let metaKey = event2.metaKey || event2.ctrlKey;
        let optionIndex = this.findFirstOptionIndex();
        if (event2.shiftKey && metaKey) {
          this.onOptionSelectRange(event2, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event2, optionIndex);
        !this.overlayVisible && this.show();
      }
      event2.preventDefault();
    },
    onEndKey(event2, pressedInInputText = false) {
      if (pressedInInputText) {
        const target = event2.currentTarget;
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex = -1;
      } else {
        let metaKey = event2.metaKey || event2.ctrlKey;
        let optionIndex = this.findLastOptionIndex();
        if (event2.shiftKey && metaKey) {
          this.onOptionSelectRange(event2, this.startRangeIndex, optionIndex);
        }
        this.changeFocusedOptionIndex(event2, optionIndex);
        !this.overlayVisible && this.show();
      }
      event2.preventDefault();
    },
    onPageUpKey(event2) {
      this.scrollInView(0);
      event2.preventDefault();
    },
    onPageDownKey(event2) {
      this.scrollInView(this.visibleOptions.length - 1);
      event2.preventDefault();
    },
    onEnterKey(event2) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event2);
      } else {
        if (this.focusedOptionIndex !== -1) {
          if (event2.shiftKey)
            this.onOptionSelectRange(event2, this.focusedOptionIndex);
          else
            this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
        }
      }
      event2.preventDefault();
    },
    onEscapeKey(event2) {
      this.overlayVisible && this.hide(true);
      event2.preventDefault();
    },
    onTabKey(event2, pressedInInputText = false) {
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          this.$refs.firstHiddenFocusableElementOnOverlay.focus();
          event2.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event2, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onShiftKey() {
      this.startRangeIndex = this.focusedOptionIndex;
    },
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.scrollInView();
    },
    onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event2) => {
          if (this.overlayVisible && this.isOutsideClicked(event2)) {
            this.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    isOutsideClicked(event2) {
      return !(this.$el.isSameNode(event2.target) || this.$el.contains(event2.target) || this.overlay && this.overlay.contains(event2.target));
    },
    getLabelByValue(value) {
      const matchedOption = this.visibleOptions.find((option) => !this.isOptionGroup(option) && ObjectUtils.equals(this.getOptionValue(option), value, this.equalityKey));
      return matchedOption ? this.getOptionLabel(matchedOption) : null;
    },
    getSelectedItemsLabel() {
      let pattern = /{(.*?)}/;
      if (pattern.test(this.selectedItemsLabel)) {
        return this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.modelValue.length + "");
      }
      return this.selectedItemsLabel;
    },
    onToggleAll(event2) {
      if (this.selectAll !== null) {
        this.$emit("selectall-change", { originalEvent: event2, checked: !this.allSelected });
      } else {
        const value = this.allSelected ? [] : this.visibleOptions.filter((option) => !this.isOptionGroup(option)).map((option) => this.getOptionValue(option));
        this.updateModel(event2, value);
      }
      this.headerCheckboxFocused = true;
    },
    removeOption(event2, optionValue) {
      let value = this.modelValue.filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey));
      this.updateModel(event2, value);
    },
    clearFilter() {
      this.filterValue = null;
    },
    hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ":not(.p-hidden-focusable)").length > 0;
    },
    isOptionMatched(option) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    },
    isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected(option) {
      const optionValue = this.getOptionValue(option);
      return (this.modelValue || []).some((value) => ObjectUtils.equals(value, optionValue, this.equalityKey));
    },
    findFirstOptionIndex() {
      return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    },
    findLastOptionIndex() {
      return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    },
    findNextOptionIndex(index) {
      const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex(index) {
      const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findFirstSelectedOptionIndex() {
      return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    },
    findLastSelectedOptionIndex() {
      return this.hasSelectedOption ? ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidSelectedOption(option)) : -1;
    },
    findNextSelectedOptionIndex(index) {
      const matchedOptionIndex = this.hasSelectedOption && index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidSelectedOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    },
    findPrevSelectedOptionIndex(index) {
      const matchedOptionIndex = this.hasSelectedOption && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    },
    findNearestSelectedOptionIndex(index, firstCheckUp = false) {
      let matchedOptionIndex = -1;
      if (this.hasSelectedOption) {
        if (firstCheckUp) {
          matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
        } else {
          matchedOptionIndex = this.findNextSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
        }
      }
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findFirstFocusedOptionIndex() {
      const selectedIndex = this.findFirstSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex() {
      const selectedIndex = this.findLastSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions(event2) {
      this.searchValue = (this.searchValue || "") + event2.key;
      let optionIndex = -1;
      if (this.focusedOptionIndex !== -1) {
        optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option));
        optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
      } else {
        optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
      }
      if (optionIndex === -1 && this.focusedOptionIndex === -1) {
        const selectedIndex = this.findSelectedOptionIndex();
        optionIndex = selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
      }
      if (optionIndex !== -1) {
        this.changeFocusedOptionIndex(event2, optionIndex);
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchValue = "";
        this.searchTimeout = null;
      }, 500);
    },
    changeFocusedOptionIndex(event2, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
      }
    },
    scrollInView(index = -1) {
      const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
      const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({ block: "nearest", inline: "nearest" });
      } else if (!this.virtualScrollerDisabled) {
        this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
      }
    },
    autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        const value = this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);
        this.updateModel(null, [value]);
      }
    },
    updateModel(event2, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", { originalEvent: event2, value });
    },
    flatOptions(options) {
      return (options || []).reduce((result, option, index) => {
        result.push({ optionGroup: option, group: true, index });
        const optionGroupChildren = this.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
        return result;
      }, []);
    },
    overlayRef(el) {
      this.overlay = el;
    },
    listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    containerClass() {
      return ["p-multiselect p-component p-inputwrapper", {
        "p-multiselect-chip": this.display === "chip",
        "p-disabled": this.disabled,
        "p-focus": this.focused,
        "p-inputwrapper-filled": this.modelValue && this.modelValue.length,
        "p-inputwrapper-focus": this.focused || this.overlayVisible,
        "p-overlay-open": this.overlayVisible
      }];
    },
    labelClass() {
      return ["p-multiselect-label", {
        "p-placeholder": this.label === this.placeholder,
        "p-multiselect-label-empty": !this.placeholder && (!this.modelValue || this.modelValue.length === 0)
      }];
    },
    dropdownIconClass() {
      return ["p-multiselect-trigger-icon", this.loading ? this.loadingIcon : "pi pi-chevron-down"];
    },
    panelStyleClass() {
      return ["p-multiselect-panel p-component", this.panelClass, {
        "p-input-filled": this.$primevue.config.inputStyle === "filled",
        "p-ripple-disabled": this.$primevue.config.ripple === false
      }];
    },
    headerCheckboxClass() {
      return ["p-checkbox p-component", {
        "p-checkbox-checked": this.allSelected,
        "p-checkbox-focused": this.headerCheckboxFocused
      }];
    },
    visibleOptions() {
      const options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      return this.filterValue ? FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale) : options;
    },
    label() {
      let label;
      if (this.modelValue && this.modelValue.length) {
        if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue.length > this.maxSelectedLabels) {
          return this.getSelectedItemsLabel();
        } else {
          label = "";
          for (let i = 0; i < this.modelValue.length; i++) {
            if (i !== 0) {
              label += ", ";
            }
            label += this.getLabelByValue(this.modelValue[i]);
          }
        }
      } else {
        label = this.placeholder;
      }
      return label;
    },
    allSelected() {
      return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions) && this.visibleOptions.every((option) => this.isOptionGroup(option) || this.isValidSelectedOption(option));
    },
    hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    maxSelectionLimitReached() {
      return this.selectionLimit && (this.modelValue && this.modelValue.length === this.selectionLimit);
    },
    filterResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", this.modelValue.length) : this.emptySelectionMessageText;
    },
    focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
    },
    ariaSetSize() {
      return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    },
    toggleAllAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[this.allSelected ? "selectAll" : "unselectAll"] : void 0;
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    "ripple": Ripple
  },
  components: {
    "VirtualScroller": script$h,
    "Portal": script$g
  }
};
const _hoisted_1$3 = { class: "p-hidden-accessible" };
const _hoisted_2$3 = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_3$3 = { class: "p-multiselect-label-container" };
const _hoisted_4$3 = { class: "p-multiselect-token-label" };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$1 = { class: "p-multiselect-trigger" };
const _hoisted_7$1 = {
  key: 0,
  class: "p-multiselect-header"
};
const _hoisted_8$1 = { class: "p-hidden-accessible" };
const _hoisted_9$1 = ["checked", "aria-label"];
const _hoisted_10$1 = {
  key: 1,
  class: "p-multiselect-filter-container"
};
const _hoisted_11$1 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
const _hoisted_12 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-multiselect-filter-icon pi pi-search" }, null, -1);
const _hoisted_13 = {
  key: 2,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_14 = ["aria-label"];
const _hoisted_15 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("span", { class: "p-multiselect-close-icon pi pi-times" }, null, -1);
const _hoisted_16 = [
  _hoisted_15
];
const _hoisted_17 = ["id"];
const _hoisted_18 = ["id"];
const _hoisted_19 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_20 = { class: "p-checkbox p-component" };
const _hoisted_21 = {
  key: 0,
  class: "p-multiselect-empty-message",
  role: "option"
};
const _hoisted_22 = {
  key: 1,
  class: "p-multiselect-empty-message",
  role: "option"
};
const _hoisted_23 = {
  key: 0,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_24 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VirtualScroller = vue_cjs_prod.resolveComponent("VirtualScroller");
  const _component_Portal = vue_cjs_prod.resolveComponent("Portal");
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    ref: "container",
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    onClick: _cache[15] || (_cache[15] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
  }, [
    vue_cjs_prod.createElementVNode("div", _hoisted_1$3, [
      vue_cjs_prod.createElementVNode("input", vue_cjs_prod.mergeProps({
        ref: "focusInput",
        id: $props.inputId,
        type: "text",
        readonly: "",
        disabled: $props.disabled,
        placeholder: $props.placeholder,
        tabindex: !$props.disabled ? $props.tabindex : -1,
        role: "combobox",
        "aria-label": _ctx.ariaLabel,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-haspopup": "listbox",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $data.id + "_list",
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
        onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
        onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onKeyDown && $options.onKeyDown(...args))
      }, $props.inputProps), null, 16, _hoisted_2$3)
    ]),
    vue_cjs_prod.createElementVNode("div", _hoisted_3$3, [
      vue_cjs_prod.createElementVNode("div", {
        class: vue_cjs_prod.normalizeClass($options.labelClass)
      }, [
        vue_cjs_prod.renderSlot(_ctx.$slots, "value", {
          value: $props.modelValue,
          placeholder: $props.placeholder
        }, () => [
          $props.display === "comma" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 0 }, [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.label || "empty"), 1)
          ], 64)) : $props.display === "chip" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 1 }, [
            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($props.modelValue, (item) => {
              return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
                class: "p-multiselect-token",
                key: $options.getLabelByValue(item)
              }, [
                vue_cjs_prod.renderSlot(_ctx.$slots, "chip", { value: item }, () => [
                  vue_cjs_prod.createElementVNode("span", _hoisted_4$3, vue_cjs_prod.toDisplayString($options.getLabelByValue(item)), 1)
                ]),
                !$props.disabled ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
                  key: 0,
                  class: "p-multiselect-token-icon pi pi-times-circle",
                  onClick: ($event) => $options.removeOption($event, item)
                }, null, 8, _hoisted_5$2)) : vue_cjs_prod.createCommentVNode("", true)
              ]);
            }), 128)),
            !$props.modelValue || $props.modelValue.length === 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, { key: 0 }, [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($props.placeholder || "empty"), 1)
            ], 64)) : vue_cjs_prod.createCommentVNode("", true)
          ], 64)) : vue_cjs_prod.createCommentVNode("", true)
        ])
      ], 2)
    ]),
    vue_cjs_prod.createElementVNode("div", _hoisted_6$1, [
      vue_cjs_prod.renderSlot(_ctx.$slots, "indicator", {}, () => [
        vue_cjs_prod.createElementVNode("span", {
          class: vue_cjs_prod.normalizeClass($options.dropdownIconClass),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ]),
    vue_cjs_prod.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: vue_cjs_prod.withCtx(() => [
        vue_cjs_prod.createVNode(vue_cjs_prod.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue_cjs_prod.withCtx(() => [
            $data.overlayVisible ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", vue_cjs_prod.mergeProps({
              key: 0,
              ref: $options.overlayRef,
              style: $props.panelStyle,
              class: $options.panelStyleClass,
              onClick: _cache[13] || (_cache[13] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[14] || (_cache[14] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args))
            }, $props.panelProps), [
              vue_cjs_prod.createElementVNode("span", {
                ref: "firstHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[3] || (_cache[3] = (...args) => $options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args))
              }, null, 544),
              vue_cjs_prod.renderSlot(_ctx.$slots, "header", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              $props.showToggleAll && $props.selectionLimit == null || $props.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_7$1, [
                $props.showToggleAll && $props.selectionLimit == null ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
                  key: 0,
                  class: vue_cjs_prod.normalizeClass($options.headerCheckboxClass),
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.onToggleAll && $options.onToggleAll(...args))
                }, [
                  vue_cjs_prod.createElementVNode("div", _hoisted_8$1, [
                    vue_cjs_prod.createElementVNode("input", {
                      type: "checkbox",
                      readonly: "",
                      checked: $options.allSelected,
                      "aria-label": $options.toggleAllAriaLabel,
                      onFocus: _cache[4] || (_cache[4] = (...args) => $options.onHeaderCheckboxFocus && $options.onHeaderCheckboxFocus(...args)),
                      onBlur: _cache[5] || (_cache[5] = (...args) => $options.onHeaderCheckboxBlur && $options.onHeaderCheckboxBlur(...args))
                    }, null, 40, _hoisted_9$1)
                  ]),
                  vue_cjs_prod.createElementVNode("div", {
                    class: vue_cjs_prod.normalizeClass(["p-checkbox-box", { "p-highlight": $options.allSelected, "p-focus": $data.headerCheckboxFocused }])
                  }, [
                    vue_cjs_prod.createElementVNode("span", {
                      class: vue_cjs_prod.normalizeClass(["p-checkbox-icon", { "pi pi-check": $options.allSelected }])
                    }, null, 2)
                  ], 2)
                ], 2)) : vue_cjs_prod.createCommentVNode("", true),
                $props.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_10$1, [
                  vue_cjs_prod.createElementVNode("input", vue_cjs_prod.mergeProps({
                    type: "text",
                    ref: "filterInput",
                    value: $data.filterValue,
                    onVnodeUpdated: _cache[7] || (_cache[7] = (...args) => $options.onFilterUpdated && $options.onFilterUpdated(...args)),
                    class: "p-multiselect-filter p-inputtext p-component",
                    placeholder: $props.filterPlaceholder,
                    role: "searchbox",
                    autocomplete: "off",
                    "aria-owns": $data.id + "_list",
                    "aria-activedescendant": $options.focusedOptionId,
                    onKeydown: _cache[8] || (_cache[8] = (...args) => $options.onFilterKeyDown && $options.onFilterKeyDown(...args)),
                    onBlur: _cache[9] || (_cache[9] = (...args) => $options.onFilterBlur && $options.onFilterBlur(...args)),
                    onInput: _cache[10] || (_cache[10] = (...args) => $options.onFilterChange && $options.onFilterChange(...args))
                  }, $props.filterInputProps), null, 16, _hoisted_11$1),
                  _hoisted_12
                ])) : vue_cjs_prod.createCommentVNode("", true),
                $props.filter ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_13, vue_cjs_prod.toDisplayString($options.filterResultMessageText), 1)) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", vue_cjs_prod.mergeProps({
                  class: "p-multiselect-close p-link",
                  "aria-label": $options.closeAriaLabel,
                  onClick: _cache[11] || (_cache[11] = (...args) => $options.onCloseClick && $options.onCloseClick(...args)),
                  type: "button"
                }, $props.closeButtonProps), _hoisted_16, 16, _hoisted_14)), [
                  [_directive_ripple]
                ])
              ])) : vue_cjs_prod.createCommentVNode("", true),
              vue_cjs_prod.createElementVNode("div", {
                class: "p-multiselect-items-wrapper",
                style: vue_cjs_prod.normalizeStyle({ "max-height": $options.virtualScrollerDisabled ? $props.scrollHeight : "" })
              }, [
                vue_cjs_prod.createVNode(_component_VirtualScroller, vue_cjs_prod.mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                  items: $options.visibleOptions,
                  style: { "height": $props.scrollHeight },
                  tabindex: -1,
                  disabled: $options.virtualScrollerDisabled
                }), vue_cjs_prod.createSlots({
                  content: vue_cjs_prod.withCtx(({ styleClass, contentRef, items: items2, getItemOptions, contentStyle, itemSize }) => [
                    vue_cjs_prod.createElementVNode("ul", {
                      ref: (el) => $options.listRef(el, contentRef),
                      id: $data.id + "_list",
                      class: vue_cjs_prod.normalizeClass(["p-multiselect-items p-component", styleClass]),
                      style: vue_cjs_prod.normalizeStyle(contentStyle),
                      role: "listbox",
                      "aria-multiselectable": "true"
                    }, [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(items2, (option, i) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, {
                          key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                        }, [
                          $options.isOptionGroup(option) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", {
                            key: 0,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: vue_cjs_prod.normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: "p-multiselect-item-group",
                            role: "option"
                          }, [
                            vue_cjs_prod.renderSlot(_ctx.$slots, "optiongroup", {
                              option: option.optionGroup,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                            ])
                          ], 12, _hoisted_18)) : vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", {
                            key: 1,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: vue_cjs_prod.normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: vue_cjs_prod.normalizeClass(["p-multiselect-item", { "p-highlight": $options.isSelected(option), "p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), "p-disabled": $options.isOptionDisabled(option) }]),
                            role: "option",
                            "aria-label": $options.getOptionLabel(option),
                            "aria-selected": $options.isSelected(option),
                            "aria-disabled": $options.isOptionDisabled(option),
                            "aria-setsize": $options.ariaSetSize,
                            "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                            onClick: ($event) => $options.onOptionSelect($event, option, $options.getOptionIndex(i, getItemOptions), true),
                            onMousemove: ($event) => $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))
                          }, [
                            vue_cjs_prod.createElementVNode("div", _hoisted_20, [
                              vue_cjs_prod.createElementVNode("div", {
                                class: vue_cjs_prod.normalizeClass(["p-checkbox-box", { "p-highlight": $options.isSelected(option) }])
                              }, [
                                vue_cjs_prod.createElementVNode("span", {
                                  class: vue_cjs_prod.normalizeClass(["p-checkbox-icon", { "pi pi-check": $options.isSelected(option) }])
                                }, null, 2)
                              ], 2)
                            ]),
                            vue_cjs_prod.renderSlot(_ctx.$slots, "option", {
                              option,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              vue_cjs_prod.createElementVNode("span", null, vue_cjs_prod.toDisplayString($options.getOptionLabel(option)), 1)
                            ])
                          ], 46, _hoisted_19)), [
                            [_directive_ripple]
                          ])
                        ], 64);
                      }), 128)),
                      $data.filterValue && (!items2 || items2 && items2.length === 0) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", _hoisted_21, [
                        vue_cjs_prod.renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.emptyFilterMessageText), 1)
                        ])
                      ])) : !$props.options || $props.options && $props.options.length === 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("li", _hoisted_22, [
                        vue_cjs_prod.renderSlot(_ctx.$slots, "empty", {}, () => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($options.emptyMessageText), 1)
                        ])
                      ])) : vue_cjs_prod.createCommentVNode("", true)
                    ], 14, _hoisted_17),
                    !$props.options || $props.options && $props.options.length === 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", _hoisted_23, vue_cjs_prod.toDisplayString($options.emptyMessageText), 1)) : vue_cjs_prod.createCommentVNode("", true),
                    vue_cjs_prod.createElementVNode("span", _hoisted_24, vue_cjs_prod.toDisplayString($options.selectedMessageText), 1)
                  ]),
                  _: 2
                }, [
                  _ctx.$slots.loader ? {
                    name: "loader",
                    fn: vue_cjs_prod.withCtx(({ options }) => [
                      vue_cjs_prod.renderSlot(_ctx.$slots, "loader", { options })
                    ])
                  } : void 0
                ]), 1040, ["items", "style", "disabled"])
              ], 4),
              vue_cjs_prod.renderSlot(_ctx.$slots, "footer", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              vue_cjs_prod.createElementVNode("span", {
                ref: "lastHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[12] || (_cache[12] = (...args) => $options.onLastHiddenFocus && $options.onLastHiddenFocus(...args))
              }, null, 544)
            ], 16)) : vue_cjs_prod.createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 2);
}
function styleInject$3(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$3 = "\n.p-multiselect {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.p-multiselect-trigger {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-multiselect-label-container {\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    cursor: pointer;\n}\n.p-multiselect-label  {\n    display: block;\n    white-space: nowrap;\n    cursor: pointer;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.p-multiselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n.p-multiselect-token {\n    cursor: default;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n.p-multiselect-token-icon {\n    cursor: pointer;\n}\n.p-multiselect .p-multiselect-panel {\n    min-width: 100%;\n}\n.p-multiselect-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-multiselect-items-wrapper {\n    overflow: auto;\n}\n.p-multiselect-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-multiselect-item {\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-multiselect-item-group {\n    cursor: auto;\n}\n.p-multiselect-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.p-multiselect-filter-container {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n}\n.p-multiselect-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-multiselect-filter-container .p-inputtext {\n    width: 100%;\n}\n.p-multiselect-close {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    overflow: hidden;\n    position: relative;\n    margin-left: auto;\n}\n.p-fluid .p-multiselect {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n";
styleInject$3(css_248z$3);
script$3.render = render$3;
const settings = defineStore({
  id: "settings",
  state: () => {
    return {
      uploader: {
        error: null,
        success: null
      }
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    filters: Array,
    showComponent: Object
  },
  setup(__props) {
    const { categories, filters, showComponent } = __props;
    const route = useRoute();
    const cats = vue_cjs_prod.reactive(categories);
    for (let i = 0; i < cats.length; i++) {
      cats[i].filters = filters.filter((f) => cats[i].filter_id.indexOf(f.id) !== -1);
    }
    const filterCategories = vue_cjs_prod.computed(() => {
      return cats.filter((f) => {
        if (showComponent.id && f.parent_id === showComponent.id)
          return f;
        else if (!showComponent.id && f.parent_id === 0)
          return f;
      });
    });
    const showCreateItem = vue_cjs_prod.ref(false);
    const expandedRows = vue_cjs_prod.ref([]);
    settings().uploader.error;
    const successMessage = settings().uploader.success;
    const newData = vue_cjs_prod.reactive({
      name_uk: "",
      name_ru: "",
      status: 1,
      url: "",
      image: "",
      parent_id: 0,
      position: 0,
      fields: {
        description_uk: "",
        description_ru: ""
      },
      filter_id: [],
      filters: []
    });
    const status = [
      "\u0423\u0434\u0430\u043B\u0435\u043D",
      "\u0410\u043A\u0442\u0438\u0432\u0435\u043D"
    ];
    const save = async (payload) => {
      const selectedFilters = payload.filters;
      const filterIds = [];
      for (let i = 0; i < selectedFilters.length; i++) {
        filterIds.push(selectedFilters[i].id);
      }
      payload.filter_id = filterIds;
      delete payload.filters;
      await $fetch("/api/v1/update/category", { method: "POST", body: payload });
      cats.map((f) => {
        if (f.id === payload.id) {
          f = payload;
        }
      });
      expandedRows.value = [];
    };
    const onRowExpand = ($event) => {
      if (!$event.data.fields) {
        $event.data.fields = {
          description_uk: "",
          description_ru: ""
        };
      }
      clearMSG();
    };
    const onRowCollapse = () => {
      clearMSG();
    };
    const clearMSG = () => {
      settings().uploader.error = "";
      settings().uploader.success = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="w-full"><div class="flex justify-end"><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E</button></div>`);
      if (showCreateItem.value) {
        _push(`<div class="max-w-3xl mx-auto"><h3 class="text-md text-center border-b pb-4 mb-4">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</h3><div class="flex"><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", newData.name_uk)}></div><div class="text-sm mb-4"> URL: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", newData.url)}></div><div class="text-sm mb-4"> \u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043A: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"><option value="0">\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.categories, (category) => {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", category.id)}>${serverRenderer.exports.ssrInterpolate(category[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", newData.name_ru)}></div><div class="text-sm mb-4"> \u0424\u0438\u043B\u044C\u0442\u0440: `);
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$3), {
          modelValue: newData.filters,
          "onUpdate:modelValue": ($event) => newData.filters = $event,
          options: __props.filters,
          optionLabel: `name_${vue_cjs_prod.unref(route).params.locale}`,
          class: "w-full bg-slate-50 mt-1 rounded border border-slate-400"
        }, {
          value: vue_cjs_prod.withCtx((filtersSelected, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              serverRenderer.exports.ssrRenderList(filtersSelected.value, (option) => {
                _push2(`<div class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded"${_scopeId}><span${_scopeId}>${serverRenderer.exports.ssrInterpolate(option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
              });
              _push2(`<!--]-->`);
              if (!filtersSelected) {
                _push2(`<!--[--> \u0412\u044B\u0431\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432 <!--]-->`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(filtersSelected.value, (option) => {
                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                    class: "p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded",
                    key: option.id
                  }, [
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                  ]);
                }), 128)),
                !filtersSelected ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                  vue_cjs_prod.createTextVNode(" \u0412\u044B\u0431\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432 ")
                ], 64)) : vue_cjs_prod.createCommentVNode("", true)
              ];
            }
          }),
          option: vue_cjs_prod.withCtx((filtersOptions, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-multiselect-car-option"${_scopeId}><span${_scopeId}>${serverRenderer.exports.ssrInterpolate(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", { class: "p-multiselect-car-option" }, [
                  vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="text-sm mb-4"> \u0421\u0442\u0430\u0442\u0443\u0441: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"><!--[-->`);
        serverRenderer.exports.ssrRenderList(status, (value, index) => {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", index)}>${serverRenderer.exports.ssrInterpolate(value)}</option>`);
        });
        _push(`<!--]--></select></div></div></div><div class="flex"><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400">${serverRenderer.exports.ssrInterpolate(newData.fields.description_uk)}</textarea></div></div><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400">${serverRenderer.exports.ssrInterpolate(newData.fields.description_ru)}</textarea></div></div></div><div class="flex justify-end pt-4 px-2 mt-4 border-t border-slate-200"><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></div>`);
        if (vue_cjs_prod.unref(successMessage)) {
          _push(`<div class="flex justify-center"><span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(successMessage))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vue_cjs_prod.unref(filterCategories).length > 0) {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$b), {
          value: vue_cjs_prod.unref(filterCategories),
          paginator: true,
          rows: 10,
          dataKey: "id",
          stripedRows: "",
          showGridlines: "",
          responsiveLayout: "scroll",
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
          onRowExpand,
          onRowCollapse
        }, {
          expansion: vue_cjs_prod.withCtx((slotProps, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="max-w-3xl mx-auto"${_scopeId}><h3 class="text-md text-center border-b pb-4 mb-4"${_scopeId}>\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439</h3><div class="flex"${_scopeId}><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_uk)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> URL: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.url)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u0412\u0445\u043E\u0434\u0438\u0442 \u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}><option value="0"${_scopeId}>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
              serverRenderer.exports.ssrRenderList(__props.categories, (category) => {
                _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", category.id)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(category[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
              });
              _push2(`<!--]--></select></div></div><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_ru)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u0424\u0438\u043B\u044C\u0442\u0440: `);
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$3), {
                modelValue: slotProps.data.filters,
                "onUpdate:modelValue": ($event) => slotProps.data.filters = $event,
                options: __props.filters,
                optionLabel: `name_${vue_cjs_prod.unref(route).params.locale}`,
                class: "w-full bg-slate-50 mt-1 rounded border border-slate-400"
              }, {
                value: vue_cjs_prod.withCtx((filtersSelected, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    serverRenderer.exports.ssrRenderList(filtersSelected.value, (option) => {
                      _push3(`<div class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded"${_scopeId2}><span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
                    });
                    _push3(`<!--]-->`);
                    if (!filtersSelected) {
                      _push3(`<!--[--> \u0412\u044B\u0431\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432 <!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(filtersSelected.value, (option) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                          class: "p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded",
                          key: option.id
                        }, [
                          vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                        ]);
                      }), 128)),
                      !filtersSelected ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                        vue_cjs_prod.createTextVNode(" \u0412\u044B\u0431\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432 ")
                      ], 64)) : vue_cjs_prod.createCommentVNode("", true)
                    ];
                  }
                }),
                option: vue_cjs_prod.withCtx((filtersOptions, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-multiselect-car-option"${_scopeId2}><span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
                  } else {
                    return [
                      vue_cjs_prod.createVNode("div", { class: "p-multiselect-car-option" }, [
                        vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="text-sm mb-4"${_scopeId}> \u0421\u0442\u0430\u0442\u0443\u0441: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}><!--[-->`);
              serverRenderer.exports.ssrRenderList(status, (value, index) => {
                _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", index)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(value)}</option>`);
              });
              _push2(`<!--]--></select></div></div></div><div class="flex"${_scopeId}><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}>${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.description_uk)}</textarea></div></div><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}>${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.description_ru)}</textarea></div></div></div><div class="flex justify-between pt-4 px-2 mt-4 border-t border-slate-200"${_scopeId}><button type="button" class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"${_scopeId}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white"${_scopeId}>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></div>`);
              if (vue_cjs_prod.unref(successMessage)) {
                _push2(`<div class="flex justify-center"${_scopeId}><span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(successMessage))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", { class: "max-w-3xl mx-auto" }, [
                  vue_cjs_prod.createVNode("h3", { class: "text-md text-center border-b pb-4 mb-4" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439"),
                  vue_cjs_prod.createVNode("div", { class: "flex" }, [
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          type: "text",
                          "onUpdate:modelValue": ($event) => slotProps.data.name_uk = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.name_uk]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" URL: "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          type: "text",
                          "onUpdate:modelValue": ($event) => slotProps.data.url = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.url]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u0412\u0445\u043E\u0434\u0438\u0442 \u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E: "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          "onUpdate:modelValue": ($event) => slotProps.data.parent_id = $event
                        }, [
                          vue_cjs_prod.createVNode("option", { value: "0" }, "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"),
                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.categories, (category) => {
                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, vue_cjs_prod.toDisplayString(category[`name_${vue_cjs_prod.unref(route).params.locale}`]), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelSelect, slotProps.data.parent_id]
                        ])
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          type: "text",
                          "onUpdate:modelValue": ($event) => slotProps.data.name_ru = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.name_ru]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u0424\u0438\u043B\u044C\u0442\u0440: "),
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$3), {
                          modelValue: slotProps.data.filters,
                          "onUpdate:modelValue": ($event) => slotProps.data.filters = $event,
                          options: __props.filters,
                          optionLabel: `name_${vue_cjs_prod.unref(route).params.locale}`,
                          class: "w-full bg-slate-50 mt-1 rounded border border-slate-400"
                        }, {
                          value: vue_cjs_prod.withCtx((filtersSelected) => [
                            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(filtersSelected.value, (option) => {
                              return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                                class: "p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded",
                                key: option.id
                              }, [
                                vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                              ]);
                            }), 128)),
                            !filtersSelected ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                              vue_cjs_prod.createTextVNode(" \u0412\u044B\u0431\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432 ")
                            ], 64)) : vue_cjs_prod.createCommentVNode("", true)
                          ]),
                          option: vue_cjs_prod.withCtx((filtersOptions) => [
                            vue_cjs_prod.createVNode("div", { class: "p-multiselect-car-option" }, [
                              vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "options", "optionLabel"])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u0421\u0442\u0430\u0442\u0443\u0441: "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          "onUpdate:modelValue": ($event) => slotProps.data.status = $event
                        }, [
                          (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(status, (value, index) => {
                            return vue_cjs_prod.createVNode("option", {
                              key: index,
                              value: index
                            }, vue_cjs_prod.toDisplayString(value), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelSelect, slotProps.data.status]
                        ])
                      ])
                    ])
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "flex" }, [
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("textarea", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          "onUpdate:modelValue": ($event) => slotProps.data.fields.description_uk = $event
                        }, "\n              ", 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.fields.description_uk]
                        ])
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("textarea", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          "onUpdate:modelValue": ($event) => slotProps.data.fields.description_ru = $event
                        }, "\n              ", 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.fields.description_ru]
                        ])
                      ])
                    ])
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "flex justify-between pt-4 px-2 mt-4 border-t border-slate-200" }, [
                    vue_cjs_prod.createVNode("button", {
                      type: "button",
                      class: "px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                    }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"),
                    vue_cjs_prod.createVNode("button", {
                      type: "button",
                      class: "px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white",
                      onClick: ($event) => save(slotProps.data)
                    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", 8, ["onClick"])
                  ]),
                  vue_cjs_prod.unref(successMessage) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                    key: 0,
                    class: "flex justify-center"
                  }, [
                    vue_cjs_prod.createVNode("span", { class: "mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(successMessage)), 1)
                  ])) : vue_cjs_prod.createCommentVNode("", true)
                ])
              ];
            }
          }),
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                expander: true,
                headerStyle: "width: 3rem"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "id",
                header: "ID",
                sortable: true
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "name_uk",
                header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440)"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "name_ru",
                header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441)"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "filters",
                header: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"
              }, {
                body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="mr-2"${_scopeId2}>${serverRenderer.exports.ssrInterpolate(slotProps.data.filters.length)}</span>`);
                  } else {
                    return [
                      vue_cjs_prod.createVNode("span", { class: "mr-2" }, vue_cjs_prod.toDisplayString(slotProps.data.filters.length), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  expander: true,
                  headerStyle: "width: 3rem"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "id",
                  header: "ID",
                  sortable: true
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "name_uk",
                  header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440)"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "name_ru",
                  header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441)"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "filters",
                  header: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"
                }, {
                  body: vue_cjs_prod.withCtx((slotProps) => [
                    vue_cjs_prod.createVNode("span", { class: "mr-2" }, vue_cjs_prod.toDisplayString(slotProps.data.filters.length), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/categories.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "filters",
  __ssrInlineRender: true,
  props: {
    filters: Array,
    showComponent: Object
  },
  setup(__props) {
    const { filters, showComponent } = __props;
    const route = useRoute();
    const filterFilters = vue_cjs_prod.computed(() => {
      return filters.filter((f) => {
        if (showComponent.id && f.parent_id === showComponent.id)
          return f;
        else if (!showComponent.id && f.parent_id === 0)
          return f;
      });
    });
    const showCreateItem = vue_cjs_prod.ref(false);
    const expandedRows = vue_cjs_prod.ref([]);
    settings().uploader.error;
    const successMessage = settings().uploader.success;
    const newData = vue_cjs_prod.reactive({
      name_uk: "",
      name_ru: "",
      status: 1,
      image: "",
      parent_id: 0,
      fields: {}
    });
    const save = (payload) => {
      console.log(payload);
    };
    const onRowExpand = () => {
      clearMSG();
    };
    const onRowCollapse = () => {
      clearMSG();
    };
    const clearMSG = () => {
      settings().uploader.error = "";
      settings().uploader.success = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="w-full"><div class="flex justify-end"><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">\u0421\u043E\u0437\u0434\u0430\u0442\u044C</button></div>`);
      if (showCreateItem.value) {
        _push(`<div class="max-w-3xl mx-auto"><h3 class="text-md text-center border-b pb-4 mb-4">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</h3><div class="flex"><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", newData.name_uk)}></div><div class="text-sm mb-4"> \u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043A: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"><option value="0">\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u0438\u043B\u044C\u0442\u0440</option><!--[-->`);
        serverRenderer.exports.ssrRenderList(__props.filters, (filter2) => {
          _push(`<option${serverRenderer.exports.ssrRenderAttr("value", filter2.id)}>${serverRenderer.exports.ssrInterpolate(filter2[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="md:w-1/2 sm:w-full px-2"><div class="text-sm mb-4"> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", newData.name_ru)}></div></div></div><div class="flex justify-end pt-4 px-2 mt-4 border-t border-slate-200"><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></div>`);
        if (vue_cjs_prod.unref(successMessage)) {
          _push(`<div class="flex justify-center"><span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(successMessage))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vue_cjs_prod.unref(filterFilters).length > 0) {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$b), {
          value: vue_cjs_prod.unref(filterFilters),
          paginator: true,
          rows: 10,
          dataKey: "id",
          stripedRows: "",
          showGridlines: "",
          responsiveLayout: "scroll",
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
          onRowExpand,
          onRowCollapse
        }, {
          expansion: vue_cjs_prod.withCtx((slotProps, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="max-w-3xl mx-auto"${_scopeId}><h3 class="text-md text-center border-b pb-4 mb-4"${_scopeId}>\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0424\u0438\u043B\u044C\u0442\u0440\u0430</h3><div class="flex"${_scopeId}><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_uk)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043A: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}><option value="0"${_scopeId}>\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u0438\u043B\u044C\u0442\u0440</option><!--[-->`);
              serverRenderer.exports.ssrRenderList(__props.filters, (filter2) => {
                _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", filter2.id)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(filter2[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
              });
              _push2(`<!--]--></select></div></div><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_ru)}${_scopeId}></div></div></div><div class="flex justify-between pt-4 px-2 mt-4 border-t border-slate-200"${_scopeId}><button type="button" class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"${_scopeId}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white"${_scopeId}>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></div>`);
              if (vue_cjs_prod.unref(successMessage)) {
                _push2(`<div class="flex justify-center"${_scopeId}><span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(successMessage))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", { class: "max-w-3xl mx-auto" }, [
                  vue_cjs_prod.createVNode("h3", { class: "text-md text-center border-b pb-4 mb-4" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0424\u0438\u043B\u044C\u0442\u0440\u0430"),
                  vue_cjs_prod.createVNode("div", { class: "flex" }, [
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          type: "text",
                          "onUpdate:modelValue": ($event) => slotProps.data.name_uk = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.name_uk]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043A: "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          "onUpdate:modelValue": ($event) => slotProps.data.parent_id = $event
                        }, [
                          vue_cjs_prod.createVNode("option", { value: "0" }, "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u0438\u043B\u044C\u0442\u0440"),
                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.filters, (filter2) => {
                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                              key: filter2.id,
                              value: filter2.id
                            }, vue_cjs_prod.toDisplayString(filter2[`name_${vue_cjs_prod.unref(route).params.locale}`]), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelSelect, slotProps.data.parent_id]
                        ])
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                        vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): "),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                          type: "text",
                          "onUpdate:modelValue": ($event) => slotProps.data.name_ru = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, slotProps.data.name_ru]
                        ])
                      ])
                    ])
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "flex justify-between pt-4 px-2 mt-4 border-t border-slate-200" }, [
                    vue_cjs_prod.createVNode("button", {
                      type: "button",
                      class: "px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                    }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"),
                    vue_cjs_prod.createVNode("button", {
                      type: "button",
                      class: "px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white",
                      onClick: ($event) => save(slotProps.data)
                    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", 8, ["onClick"])
                  ]),
                  vue_cjs_prod.unref(successMessage) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                    key: 0,
                    class: "flex justify-center"
                  }, [
                    vue_cjs_prod.createVNode("span", { class: "mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(successMessage)), 1)
                  ])) : vue_cjs_prod.createCommentVNode("", true)
                ])
              ];
            }
          }),
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                expander: true,
                headerStyle: "width: 3rem"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "id",
                header: "ID",
                sortable: true
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "parent_id",
                header: "\u0412\u0445\u043E\u0434\u0438\u0442 \u0432"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "name_uk",
                header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440)"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "name_ru",
                header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441)"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "status",
                header: "\u0421\u0442\u0430\u0442\u0443\u0441"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  expander: true,
                  headerStyle: "width: 3rem"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "id",
                  header: "ID",
                  sortable: true
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "parent_id",
                  header: "\u0412\u0445\u043E\u0434\u0438\u0442 \u0432"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "name_uk",
                  header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440)"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "name_ru",
                  header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441)"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "status",
                  header: "\u0421\u0442\u0430\u0442\u0443\u0441"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/filters.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var script$2 = {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: "determinate"
    },
    showValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    containerClass() {
      return [
        "p-progressbar p-component",
        {
          "p-progressbar-determinate": this.determinate,
          "p-progressbar-indeterminate": this.indeterminate
        }
      ];
    },
    progressStyle() {
      return {
        width: this.value + "%",
        display: "flex"
      };
    },
    indeterminate() {
      return this.mode === "indeterminate";
    },
    determinate() {
      return this.mode === "determinate";
    }
  }
};
const _hoisted_1$2 = ["aria-valuenow"];
const _hoisted_2$2 = {
  key: 0,
  class: "p-progressbar-label"
};
const _hoisted_3$2 = {
  key: 1,
  class: "p-progressbar-indeterminate-container"
};
const _hoisted_4$2 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("div", { class: "p-progressbar-value p-progressbar-value-animate" }, null, -1);
const _hoisted_5$1 = [
  _hoisted_4$2
];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
    role: "progressbar",
    class: vue_cjs_prod.normalizeClass($options.containerClass),
    "aria-valuemin": "0",
    "aria-valuenow": $props.value,
    "aria-valuemax": "100"
  }, [
    $options.determinate ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
      key: 0,
      class: "p-progressbar-value p-progressbar-value-animate",
      style: vue_cjs_prod.normalizeStyle($options.progressStyle)
    }, [
      $props.value != null && $props.value !== 0 && $props.showValue ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_2$2, [
        vue_cjs_prod.renderSlot(_ctx.$slots, "default", {}, () => [
          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString($props.value + "%"), 1)
        ])
      ])) : vue_cjs_prod.createCommentVNode("", true)
    ], 4)) : vue_cjs_prod.createCommentVNode("", true),
    $options.indeterminate ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_3$2, _hoisted_5$1)) : vue_cjs_prod.createCommentVNode("", true)
  ], 10, _hoisted_1$2);
}
function styleInject$2(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$2 = "\n.p-progressbar {\n    position: relative;\n    overflow: hidden;\n}\n.p-progressbar-determinate .p-progressbar-value {\n    height: 100%;\n    width: 0%;\n    position: absolute;\n    display: none;\n    border: 0 none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n}\n.p-progressbar-determinate .p-progressbar-label {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.p-progressbar-determinate .p-progressbar-value-animate {\n    -webkit-transition: width 1s ease-in-out;\n    transition: width 1s ease-in-out;\n}\n.p-progressbar-indeterminate .p-progressbar-value::before {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n              animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n.p-progressbar-indeterminate .p-progressbar-value::after {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n            animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    -webkit-animation-delay: 1.15s;\n            animation-delay: 1.15s;\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim {\n0% {\n    left: -35%;\n    right: 100%;\n}\n60% {\n    left: 100%;\n    right: -90%;\n}\n100% {\n    left: 100%;\n    right: -90%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim {\n0% {\n    left: -35%;\n    right: 100%;\n}\n60% {\n    left: 100%;\n    right: -90%;\n}\n100% {\n    left: 100%;\n    right: -90%;\n}\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim-short {\n0% {\n    left: -200%;\n    right: 100%;\n}\n60% {\n    left: 107%;\n    right: -8%;\n}\n100% {\n    left: 107%;\n    right: -8%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim-short {\n0% {\n    left: -200%;\n    right: 100%;\n}\n60% {\n    left: 107%;\n    right: -8%;\n}\n100% {\n    left: 107%;\n    right: -8%;\n}\n}\n";
styleInject$2(css_248z$2);
script$2.render = render$2;
var script$1 = {
  name: "Message",
  emits: ["close"],
  props: {
    severity: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: true
    },
    life: {
      type: Number,
      default: 3e3
    },
    icon: {
      type: String,
      default: null
    }
  },
  timeout: null,
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    if (!this.sticky) {
      setTimeout(() => {
        this.visible = false;
      }, this.life);
    }
  },
  methods: {
    close(event2) {
      this.visible = false;
      this.$emit("close", event2);
    }
  },
  computed: {
    containerClass() {
      return "p-message p-component p-message-" + this.severity;
    },
    iconClass() {
      return ["p-message-icon pi", this.icon ? this.icon : {
        "pi-info-circle": this.severity === "info",
        "pi-check": this.severity === "success",
        "pi-exclamation-triangle": this.severity === "warn",
        "pi-times-circle": this.severity === "error"
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$1 = { class: "p-message-wrapper" };
const _hoisted_2$1 = { class: "p-message-text" };
const _hoisted_3$1 = /* @__PURE__ */ vue_cjs_prod.createElementVNode("i", { class: "p-message-close-icon pi pi-times" }, null, -1);
const _hoisted_4$1 = [
  _hoisted_3$1
];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Transition, {
    name: "p-message",
    appear: ""
  }, {
    default: vue_cjs_prod.withCtx(() => [
      vue_cjs_prod.withDirectives(vue_cjs_prod.createElementVNode("div", {
        class: vue_cjs_prod.normalizeClass($options.containerClass),
        role: "alert"
      }, [
        vue_cjs_prod.createElementVNode("div", _hoisted_1$1, [
          vue_cjs_prod.createElementVNode("span", {
            class: vue_cjs_prod.normalizeClass($options.iconClass)
          }, null, 2),
          vue_cjs_prod.createElementVNode("div", _hoisted_2$1, [
            vue_cjs_prod.renderSlot(_ctx.$slots, "default")
          ]),
          $props.closable ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("button", {
            key: 0,
            class: "p-message-close p-link",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.close($event)),
            type: "button"
          }, _hoisted_4$1)), [
            [_directive_ripple]
          ]) : vue_cjs_prod.createCommentVNode("", true)
        ])
      ], 2), [
        [vue_cjs_prod.vShow, $data.visible]
      ])
    ]),
    _: 3
  });
}
function styleInject$1(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$1 = "\n.p-message-wrapper {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-message-close {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n.p-message-enter-from {\n    opacity: 0;\n}\n.p-message-enter-active {\n    -webkit-transition: opacity .3s;\n    transition: opacity .3s;\n}\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n.p-message-leave-active {\n    overflow: hidden;\n    -webkit-transition: max-height .3s cubic-bezier(0, 1, 0, 1), opacity .3s, margin .15s;\n    transition: max-height .3s cubic-bezier(0, 1, 0, 1), opacity .3s, margin .15s;\n}\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
styleInject$1(css_248z$1);
script$1.render = render$1;
var script = {
  name: "FileUpload",
  emits: ["select", "uploader", "before-upload", "progress", "upload", "error", "before-send", "clear", "remove"],
  props: {
    name: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      default: "advanced"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number,
      default: null
    },
    invalidFileSizeMessage: {
      type: String,
      default: "{0}: Invalid file size, file size should be smaller than {1}."
    },
    invalidFileTypeMessage: {
      type: String,
      default: "{0}: Invalid file type, allowed file types: {1}."
    },
    fileLimit: {
      type: Number,
      default: null
    },
    invalidFileLimitMessage: {
      type: String,
      default: "Maximum number of files exceeded, limit is {0} at most."
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    previewWidth: {
      type: Number,
      default: 50
    },
    chooseLabel: {
      type: String,
      default: null
    },
    uploadLabel: {
      type: String,
      default: null
    },
    cancelLabel: {
      type: String,
      default: null
    },
    customUpload: {
      type: Boolean,
      default: false
    },
    showUploadButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    chooseIcon: {
      type: String,
      default: "pi pi-plus"
    },
    uploadIcon: {
      type: String,
      default: "pi pi-upload"
    },
    cancelIcon: {
      type: String,
      default: "pi pi-times"
    },
    style: null,
    class: null
  },
  duplicateIEEvent: false,
  data() {
    return {
      uploadedFileCount: 0,
      files: [],
      messages: [],
      focused: false,
      progress: null
    };
  },
  methods: {
    onFileSelect(event2) {
      if (event2.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = false;
        return;
      }
      this.messages = [];
      this.files = this.files || [];
      let files = event2.dataTransfer ? event2.dataTransfer.files : event2.target.files;
      for (let file of files) {
        if (!this.isFileSelected(file)) {
          if (this.validate(file)) {
            if (this.isImage(file)) {
              file.objectURL = window.URL.createObjectURL(file);
            }
            this.files.push(file);
          }
        }
      }
      this.$emit("select", { originalEvent: event2, files: this.files });
      if (this.fileLimit) {
        this.checkFileLimit();
      }
      if (this.auto && this.hasFiles && !this.isFileLimitExceeded()) {
        this.upload();
      }
      if (event2.type !== "drop" && this.isIE11()) {
        this.clearIEInput();
      } else {
        this.clearInputElement();
      }
    },
    choose() {
      this.$refs.fileInput.click();
    },
    upload() {
      if (this.customUpload) {
        if (this.fileLimit) {
          this.uploadedFileCount += this.files.length;
        }
        this.$emit("uploader", { files: this.files });
        this.clear();
      } else {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        this.$emit("before-upload", {
          "xhr": xhr,
          "formData": formData
        });
        for (let file of this.files) {
          formData.append(this.name, file, file.name);
        }
        xhr.upload.addEventListener("progress", (event2) => {
          if (event2.lengthComputable) {
            this.progress = Math.round(event2.loaded * 100 / event2.total);
          }
          this.$emit("progress", {
            originalEvent: event2,
            progress: this.progress
          });
        });
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            this.progress = 0;
            if (xhr.status >= 200 && xhr.status < 300) {
              if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
              }
              this.$emit("upload", {
                xhr,
                files: this.files
              });
            } else {
              this.$emit("error", {
                xhr,
                files: this.files
              });
            }
            this.clear();
          }
        };
        xhr.open("POST", this.url, true);
        this.$emit("before-send", {
          "xhr": xhr,
          "formData": formData
        });
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
      }
    },
    clear() {
      this.files = [];
      this.messages = null;
      this.$emit("clear");
      if (this.isAdvanced) {
        this.clearInputElement();
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    isFileSelected(file) {
      if (this.files && this.files.length) {
        for (let sFile of this.files) {
          if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size)
            return true;
        }
      }
      return false;
    },
    isIE11() {
      return !!window["MSInputMethodContext"] && !!document["documentMode"];
    },
    validate(file) {
      if (this.accept && !this.isFileTypeValid(file)) {
        this.messages.push(this.invalidFileTypeMessage.replace("{0}", file.name).replace("{1}", this.accept));
        return false;
      }
      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.messages.push(this.invalidFileSizeMessage.replace("{0}", file.name).replace("{1}", this.formatSize(this.maxFileSize)));
        return false;
      }
      return true;
    },
    isFileTypeValid(file) {
      let acceptableTypes = this.accept.split(",").map((type) => type.trim());
      for (let type of acceptableTypes) {
        let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
        if (acceptable) {
          return true;
        }
      }
      return false;
    },
    getTypeClass(fileType) {
      return fileType.substring(0, fileType.indexOf("/"));
    },
    isWildcard(fileType) {
      return fileType.indexOf("*") !== -1;
    },
    getFileExtension(file) {
      return "." + file.name.split(".").pop();
    },
    isImage(file) {
      return /^image\//.test(file.type);
    },
    onDragEnter(event2) {
      if (!this.disabled) {
        event2.stopPropagation();
        event2.preventDefault();
      }
    },
    onDragOver(event2) {
      if (!this.disabled) {
        DomHandler.addClass(this.$refs.content, "p-fileupload-highlight");
        event2.stopPropagation();
        event2.preventDefault();
      }
    },
    onDragLeave() {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
      }
    },
    onDrop(event2) {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
        event2.stopPropagation();
        event2.preventDefault();
        const files = event2.dataTransfer ? event2.dataTransfer.files : event2.target.files;
        const allowDrop = this.multiple || files && files.length === 1;
        if (allowDrop) {
          this.onFileSelect(event2);
        }
      }
    },
    onBasicUploaderClick() {
      if (this.hasFiles)
        this.upload();
      else
        this.$refs.fileInput.click();
    },
    remove(index) {
      this.clearInputElement();
      let removedFile = this.files.splice(index, 1)[0];
      this.files = [...this.files];
      this.$emit("remove", {
        file: removedFile,
        files: this.files
      });
    },
    clearInputElement() {
      this.$refs.fileInput.value = "";
    },
    clearIEInput() {
      if (this.$refs.fileInput) {
        this.duplicateIEEvent = true;
        this.$refs.fileInput.value = "";
      }
    },
    formatSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1e3, dm = 3, sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    isFileLimitExceeded() {
      if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused) {
        this.focused = false;
      }
      return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    },
    checkFileLimit() {
      if (this.isFileLimitExceeded()) {
        this.messages.push(this.invalidFileLimitMessage.replace("{0}", this.fileLimit.toString()));
      }
    },
    onMessageClose() {
      this.messages = null;
    }
  },
  computed: {
    isAdvanced() {
      return this.mode === "advanced";
    },
    isBasic() {
      return this.mode === "basic";
    },
    advancedChooseButtonClass() {
      return [
        "p-button p-component p-fileupload-choose",
        this.class,
        {
          "p-disabled": this.disabled,
          "p-focus": this.focused
        }
      ];
    },
    basicChooseButtonClass() {
      return ["p-button p-component p-fileupload-choose", this.class, {
        "p-fileupload-choose-selected": this.hasFiles,
        "p-disabled": this.disabled,
        "p-focus": this.focused
      }];
    },
    advancedChooseIconClass() {
      return ["p-button-icon p-button-icon-left pi-fw", this.chooseIcon];
    },
    basicChooseButtonIconClass() {
      return [
        "p-button-icon p-button-icon-left",
        !this.hasFiles || this.auto ? this.uploadIcon : this.chooseIcon
      ];
    },
    basicChooseButtonLabel() {
      return this.auto ? this.chooseButtonLabel : this.hasFiles ? this.files.map((f) => f.name).join(", ") : this.chooseButtonLabel;
    },
    hasFiles() {
      return this.files && this.files.length > 0;
    },
    chooseDisabled() {
      return this.disabled || this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    },
    uploadDisabled() {
      return this.disabled || !this.hasFiles || this.fileLimit && this.fileLimit < this.files.length;
    },
    cancelDisabled() {
      return this.disabled || !this.hasFiles;
    },
    chooseButtonLabel() {
      return this.chooseLabel || this.$primevue.config.locale.choose;
    },
    uploadButtonLabel() {
      return this.uploadLabel || this.$primevue.config.locale.upload;
    },
    cancelButtonLabel() {
      return this.cancelLabel || this.$primevue.config.locale.cancel;
    }
  },
  components: {
    "FileUploadButton": script$i,
    "FileUploadProgressBar": script$2,
    "FileUploadMessage": script$1
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1 = {
  key: 0,
  class: "p-fileupload p-fileupload-advanced p-component"
};
const _hoisted_2 = { class: "p-fileupload-buttonbar" };
const _hoisted_3 = ["multiple", "accept", "disabled"];
const _hoisted_4 = { class: "p-button-label" };
const _hoisted_5 = {
  key: 1,
  class: "p-fileupload-files"
};
const _hoisted_6 = ["alt", "src", "width"];
const _hoisted_7 = { class: "p-fileupload-filename" };
const _hoisted_8 = {
  key: 2,
  class: "p-fileupload-empty"
};
const _hoisted_9 = {
  key: 1,
  class: "p-fileupload p-fileupload-basic p-component"
};
const _hoisted_10 = { class: "p-button-label" };
const _hoisted_11 = ["accept", "disabled", "multiple"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadButton = vue_cjs_prod.resolveComponent("FileUploadButton");
  const _component_FileUploadProgressBar = vue_cjs_prod.resolveComponent("FileUploadProgressBar");
  const _component_FileUploadMessage = vue_cjs_prod.resolveComponent("FileUploadMessage");
  const _directive_ripple = vue_cjs_prod.resolveDirective("ripple");
  return $options.isAdvanced ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_1, [
    vue_cjs_prod.createElementVNode("div", _hoisted_2, [
      vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
        class: vue_cjs_prod.normalizeClass($options.advancedChooseButtonClass),
        style: vue_cjs_prod.normalizeStyle($props.style),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.choose && $options.choose(...args)),
        onKeydown: _cache[2] || (_cache[2] = vue_cjs_prod.withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
        onFocus: _cache[3] || (_cache[3] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => $options.onBlur && $options.onBlur(...args)),
        tabindex: "0"
      }, [
        vue_cjs_prod.createElementVNode("input", {
          ref: "fileInput",
          type: "file",
          onChange: _cache[0] || (_cache[0] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
          multiple: $props.multiple,
          accept: $props.accept,
          disabled: $options.chooseDisabled
        }, null, 40, _hoisted_3),
        vue_cjs_prod.createElementVNode("span", {
          class: vue_cjs_prod.normalizeClass($options.advancedChooseIconClass)
        }, null, 2),
        vue_cjs_prod.createElementVNode("span", _hoisted_4, vue_cjs_prod.toDisplayString($options.chooseButtonLabel), 1)
      ], 38)), [
        [_directive_ripple]
      ]),
      $props.showUploadButton ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FileUploadButton, {
        key: 0,
        label: $options.uploadButtonLabel,
        icon: $props.uploadIcon,
        onClick: $options.upload,
        disabled: $options.uploadDisabled
      }, null, 8, ["label", "icon", "onClick", "disabled"])) : vue_cjs_prod.createCommentVNode("", true),
      $props.showCancelButton ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FileUploadButton, {
        key: 1,
        label: $options.cancelButtonLabel,
        icon: $props.cancelIcon,
        onClick: $options.clear,
        disabled: $options.cancelDisabled
      }, null, 8, ["label", "icon", "onClick", "disabled"])) : vue_cjs_prod.createCommentVNode("", true)
    ]),
    vue_cjs_prod.createElementVNode("div", {
      ref: "content",
      class: "p-fileupload-content",
      onDragenter: _cache[5] || (_cache[5] = (...args) => $options.onDragEnter && $options.onDragEnter(...args)),
      onDragover: _cache[6] || (_cache[6] = (...args) => $options.onDragOver && $options.onDragOver(...args)),
      onDragleave: _cache[7] || (_cache[7] = (...args) => $options.onDragLeave && $options.onDragLeave(...args)),
      onDrop: _cache[8] || (_cache[8] = (...args) => $options.onDrop && $options.onDrop(...args))
    }, [
      $options.hasFiles ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FileUploadProgressBar, {
        key: 0,
        value: $data.progress
      }, null, 8, ["value"])) : vue_cjs_prod.createCommentVNode("", true),
      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.messages, (msg) => {
        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FileUploadMessage, {
          severity: "error",
          key: msg,
          onClose: $options.onMessageClose
        }, {
          default: vue_cjs_prod.withCtx(() => [
            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(msg), 1)
          ]),
          _: 2
        }, 1032, ["onClose"]);
      }), 128)),
      $options.hasFiles ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_5, [
        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.files, (file, index) => {
          return vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", {
            class: "p-fileupload-row",
            key: file.name + file.type + file.size
          }, [
            vue_cjs_prod.createElementVNode("div", null, [
              $options.isImage(file) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("img", {
                key: 0,
                role: "presentation",
                alt: file.name,
                src: file.objectURL,
                width: $props.previewWidth
              }, null, 8, _hoisted_6)) : vue_cjs_prod.createCommentVNode("", true)
            ]),
            vue_cjs_prod.createElementVNode("div", _hoisted_7, vue_cjs_prod.toDisplayString(file.name), 1),
            vue_cjs_prod.createElementVNode("div", null, vue_cjs_prod.toDisplayString($options.formatSize(file.size)), 1),
            vue_cjs_prod.createElementVNode("div", null, [
              vue_cjs_prod.createVNode(_component_FileUploadButton, {
                type: "button",
                icon: "pi pi-times",
                onClick: ($event) => $options.remove(index)
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128))
      ])) : vue_cjs_prod.createCommentVNode("", true),
      _ctx.$slots.empty && !$options.hasFiles ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_8, [
        vue_cjs_prod.renderSlot(_ctx.$slots, "empty")
      ])) : vue_cjs_prod.createCommentVNode("", true)
    ], 544)
  ])) : $options.isBasic ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("div", _hoisted_9, [
    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createElementBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList($data.messages, (msg) => {
      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_FileUploadMessage, {
        severity: "error",
        key: msg,
        onClose: $options.onMessageClose
      }, {
        default: vue_cjs_prod.withCtx(() => [
          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(msg), 1)
        ]),
        _: 2
      }, 1032, ["onClose"]);
    }), 128)),
    vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("span", {
      class: vue_cjs_prod.normalizeClass($options.basicChooseButtonClass),
      style: vue_cjs_prod.normalizeStyle($props.style),
      onMouseup: _cache[12] || (_cache[12] = (...args) => $options.onBasicUploaderClick && $options.onBasicUploaderClick(...args)),
      onKeydown: _cache[13] || (_cache[13] = vue_cjs_prod.withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
      onFocus: _cache[14] || (_cache[14] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[15] || (_cache[15] = (...args) => $options.onBlur && $options.onBlur(...args)),
      tabindex: "0"
    }, [
      vue_cjs_prod.createElementVNode("span", {
        class: vue_cjs_prod.normalizeClass($options.basicChooseButtonIconClass)
      }, null, 2),
      vue_cjs_prod.createElementVNode("span", _hoisted_10, vue_cjs_prod.toDisplayString($options.basicChooseButtonLabel), 1),
      !$options.hasFiles ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createElementBlock("input", {
        key: 0,
        ref: "fileInput",
        type: "file",
        accept: $props.accept,
        disabled: $props.disabled,
        multiple: $props.multiple,
        onChange: _cache[9] || (_cache[9] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
        onFocus: _cache[10] || (_cache[10] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[11] || (_cache[11] = (...args) => $options.onBlur && $options.onBlur(...args))
      }, null, 40, _hoisted_11)) : vue_cjs_prod.createCommentVNode("", true)
    ], 38)), [
      [_directive_ripple]
    ])
  ])) : vue_cjs_prod.createCommentVNode("", true);
}
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || true) {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = "\n.p-fileupload-content {\n    position: relative;\n}\n.p-fileupload-row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-fileupload-row > div {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 25%;\n}\n.p-fileupload-row > div:last-child {\n    text-align: right;\n}\n.p-fileupload-content .p-progressbar {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-button.p-fileupload-choose {\n    position: relative;\n    overflow: hidden;\n}\n.p-button.p-fileupload-choose input[type=file] {\n    display: none;\n}\n.p-fileupload-choose.p-fileupload-choose-selected input[type=file] {\n    display: none;\n}\n.p-fileupload-filename {\n    word-break: break-all;\n}\n.p-fluid .p-fileupload .p-button {\n    width: auto;\n}\n";
styleInject(css_248z);
script.render = render;
const _sfc_main$8 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  props: ["pagination"],
  emits: ["changePage"],
  setup(__props, { emit }) {
    const currentPage = vue_cjs_prod.ref(1);
    const getPages = vue_cjs_prod.computed(() => {
      const obj = {
        min: 0,
        max: 0
      };
      if (currentPage.value < 3) {
        obj.min = 0;
        obj.max = 6;
      } else {
        obj.min = currentPage.value - 3;
        obj.max = currentPage.value + 2;
      }
      return obj;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "pagination flex items-center justify-center" }, _attrs))}>`);
      if (currentPage.value > 1) {
        _push(`<button type="button" class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"><i class="pi pi-angle-double-left"></i></button>`);
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-left"></i></span>`);
      }
      if (currentPage.value > 1) {
        _push(`<button class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"><i class="pi pi-angle-left"></i></button>`);
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-left"></i></span>`);
      }
      _push(`<div class="pagination-pages overflow-hidden flex items-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(Math.ceil(__props.pagination.count / 20), (index) => {
        _push(`<!--[-->`);
        if (vue_cjs_prod.unref(getPages).min <= index && vue_cjs_prod.unref(getPages).max >= index) {
          _push(`<button class="${serverRenderer.exports.ssrRenderClass([currentPage.value === index ? "active" : "", "text-2xl py-2 px-4 mx-1 border border-slate-200"])}">${serverRenderer.exports.ssrInterpolate(index)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
      if (currentPage.value < Math.ceil(__props.pagination.count / 20)) {
        _push(`<button class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"><i class="pi pi-angle-right"></i></button>`);
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-right"></i></span>`);
      }
      if (currentPage.value < Math.ceil(__props.pagination.count / 20)) {
        _push(`<button class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"><i class="pi pi-angle-double-right"></i></button>`);
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-right"></i></span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/pagination.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const uploadImg = async (e, data, path, key) => {
  const store = settings();
  let rawImg;
  const reader = new FileReader();
  reader.onloadend = () => {
    rawImg = reader.result;
    data.temporaryImg = rawImg;
  };
  const file = e.files[0];
  data.file = file;
  if (file.size / 1024 > 512) {
    store.uploader.error = "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 512kb.";
  }
  reader.readAsDataURL(e.files[0]);
  const formData = new FormData();
  formData.append("file", file);
  const res = await useAsyncData(
    "file-upload",
    () => $fetch(path, { method: "POST", body: formData }),
    "$jpTAwvCtnF"
  );
  if (typeof data[key] !== "string") {
    data[key].push(res.data.value.response);
  } else {
    data[key] = res.data.value.response;
  }
  store.uploader.success = "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u0430!";
};
const _sfc_main$7 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    filters: Array
  },
  setup(__props) {
    const { categories, filters } = __props;
    const route = useRoute();
    const items2 = vue_cjs_prod.ref([]);
    const mainFilter = filters.filter((f) => f.parent_id === 0);
    const childFiters = [];
    mainFilter.forEach((mf) => {
      childFiters.push(filters.filter((f) => f.parent_id === mf.id));
    });
    let sortedFilters = [];
    for (let i = 0; i < mainFilter.length; i++) {
      sortedFilters = [...sortedFilters, mainFilter[i], ...childFiters[i]];
    }
    const count = vue_cjs_prod.ref(0);
    const status = [
      "\u0423\u0434\u0430\u043B\u0435\u043D",
      "\u0412 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435",
      "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435"
    ];
    const expandedRows = vue_cjs_prod.ref([]);
    const errorMessage = settings().uploader.error;
    const successMessage = settings().uploader.success;
    const onRowExpand = () => {
      clearMSG();
    };
    const onRowCollapse = () => {
      clearMSG();
    };
    const clearMSG = () => {
      settings().uploader.error = "";
      settings().uploader.success = "";
    };
    const save = (payload) => {
      const data = payload;
      data.filters_id = [];
      data.filters.map((f) => {
        data.filters_id.push(f.id);
      });
      delete data.filters;
      delete data.category;
      delete data.formatedPrice;
      $fetch("/api/v1/update/product", {
        method: "POST",
        body: data
      }).then(() => {
        clearMSG();
        successMessage.value = "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E!";
        setTimeout(() => {
          clearMSG();
        }, 1e3);
      }).catch((err) => {
        console.log(err);
      });
    };
    const getData = async (page = 1) => {
      const data = await $fetch(`/api/v1/items?limit=20&page=${page}`);
      data.items.map((item) => {
        item.formatedPrice = item.price_retail / 100;
        item.category = categories.find((cat) => cat.id === item.category_id);
        item.filters = filters.filter((f) => item.filters_id.indexOf(f.id) !== -1);
      });
      items2.value = data.items;
      count.value = data.count;
    };
    const changePage = (page) => {
      getData(page);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="my-2 flex justify-between"><span>\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B (\u043A\u043E\u043B-\u0432\u043E: ${serverRenderer.exports.ssrInterpolate(count.value)})</span></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$b), {
        value: items2.value,
        paginator: false,
        rows: 10,
        dataKey: "id",
        stripedRows: "",
        showGridlines: "",
        responsiveLayout: "scroll",
        expandedRows: expandedRows.value,
        "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
        onRowExpand,
        onRowCollapse
      }, {
        expansion: vue_cjs_prod.withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto"${_scopeId}><h3 class="text-md text-center border-b pb-4 mb-4"${_scopeId}>\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430</h3><div class="w-full px-2 text-center mb-4"${_scopeId}>`);
            if (slotProps.data.temporaryImg || slotProps.data.image) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", slotProps.data.temporaryImg || `/images/cars/${slotProps.data.image}`)} class="border-slate-200 border rounded shadow-md p-2 w-auto mx-auto mb-4"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script), {
              mode: "basic",
              name: "product",
              auto: true,
              customUpload: true,
              onUploader: ($event) => vue_cjs_prod.unref(uploadImg)($event, slotProps.data, "/api/upload?itemType=assets&fileType=products", "images"),
              chooseLabel: slotProps.data.image ? "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"
            }, null, _parent2, _scopeId));
            if (vue_cjs_prod.unref(errorMessage)) {
              _push2(`<span class="inline-block mt-4 text-center bg-red-600/75 text-sm p-2 rounded text-white"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(errorMessage))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex"${_scopeId}><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_uk)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.code_vendor)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u041A\u043E\u0434 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.code_wholesale)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u0426\u0435\u043D\u0430: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.formatedPrice)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A: <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.fields.provider)}${_scopeId}></div></div><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text"${serverRenderer.exports.ssrRenderAttr("value", slotProps.data.name_ru)}${_scopeId}></div><div class="text-sm mb-4"${_scopeId}> \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}><option${serverRenderer.exports.ssrRenderAttr("value", 0)} disabled${_scopeId}>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</option><!--[-->`);
            serverRenderer.exports.ssrRenderList(__props.categories, (cat) => {
              _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", cat.id)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(cat[`name_${vue_cjs_prod.unref(route).params.locale}`])}</option>`);
            });
            _push2(`<!--]--></select></div><div class="text-sm mb-4"${_scopeId}> \u0410\u0442\u0440\u0438\u0431\u0443\u0442\u044B: `);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$3), {
              modelValue: slotProps.data.filters,
              "onUpdate:modelValue": ($event) => slotProps.data.filters = $event,
              options: vue_cjs_prod.unref(sortedFilters),
              optionLabel: `name_${vue_cjs_prod.unref(route).params.locale}`,
              display: "chip",
              filter: true,
              class: "w-full bg-slate-50 mt-1 rounded border border-slate-400"
            }, {
              value: vue_cjs_prod.withCtx((filtersSelected, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  serverRenderer.exports.ssrRenderList(filtersSelected.value, (option) => {
                    _push3(`<div class="p-multiselect-token"${_scopeId2}><span class="p-multiselect-token-label"${_scopeId2}>${serverRenderer.exports.ssrInterpolate(option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(filtersSelected.value, (option) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                        class: "p-multiselect-token",
                        key: option.id
                      }, [
                        vue_cjs_prod.createVNode("span", { class: "p-multiselect-token-label" }, vue_cjs_prod.toDisplayString(option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                      ]);
                    }), 128))
                  ];
                }
              }),
              option: vue_cjs_prod.withCtx((filtersOptions, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${serverRenderer.exports.ssrRenderClass(filtersOptions.option.parent_id !== 0 ? "pl-4" : "")}"${_scopeId2}><span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`])}</span></div>`);
                } else {
                  return [
                    vue_cjs_prod.createVNode("div", {
                      class: filtersOptions.option.parent_id !== 0 ? "pl-4" : ""
                    }, [
                      vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                    ], 2)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-sm mb-4"${_scopeId}> \u0421\u0442\u0430\u0442\u0443\u0441: <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}><!--[-->`);
            serverRenderer.exports.ssrRenderList(status, (value, index) => {
              _push2(`<option${serverRenderer.exports.ssrRenderAttr("value", index)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(value)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="flex"${_scopeId}><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}>${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.description_uk)}</textarea></div></div><div class="md:w-1/2 sm:w-full px-2"${_scopeId}><div class="text-sm mb-4"${_scopeId}> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400"${_scopeId}>${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.description_ru)}</textarea></div></div></div><div class="flex justify-between pt-4 px-2 mt-4 border-t border-slate-200"${_scopeId}><button type="button" class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"${_scopeId}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button><button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white"${_scopeId}>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button></div>`);
            if (vue_cjs_prod.unref(successMessage)) {
              _push2(`<div class="flex justify-center"${_scopeId}><span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(successMessage))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "max-w-3xl mx-auto" }, [
                vue_cjs_prod.createVNode("h3", { class: "text-md text-center border-b pb-4 mb-4" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430"),
                vue_cjs_prod.createVNode("div", { class: "w-full px-2 text-center mb-4" }, [
                  slotProps.data.temporaryImg || slotProps.data.image ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("img", {
                    key: 0,
                    src: slotProps.data.temporaryImg || `/images/cars/${slotProps.data.image}`,
                    class: "border-slate-200 border rounded shadow-md p-2 w-auto mx-auto mb-4"
                  }, null, 8, ["src"])) : vue_cjs_prod.createCommentVNode("", true),
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(script), {
                    mode: "basic",
                    name: "product",
                    auto: true,
                    customUpload: true,
                    onUploader: ($event) => vue_cjs_prod.unref(uploadImg)($event, slotProps.data, "/api/upload?itemType=assets&fileType=products", "images"),
                    chooseLabel: slotProps.data.image ? "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"
                  }, null, 8, ["onUploader", "chooseLabel"]),
                  vue_cjs_prod.unref(errorMessage) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("span", {
                    key: 1,
                    class: "inline-block mt-4 text-center bg-red-600/75 text-sm p-2 rounded text-white"
                  }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(errorMessage)), 1)) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                vue_cjs_prod.createVNode("div", { class: "flex" }, [
                  vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.name_uk = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.name_uk]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.code_vendor = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.code_vendor]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041A\u043E\u0434 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.code_wholesale = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.code_wholesale]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u0426\u0435\u043D\u0430: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.formatedPrice = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.formatedPrice]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.fields.provider = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.fields.provider]
                      ])
                    ])
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        type: "text",
                        "onUpdate:modelValue": ($event) => slotProps.data.name_ru = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.name_ru]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        "onUpdate:modelValue": ($event) => slotProps.data.category_id = $event
                      }, [
                        vue_cjs_prod.createVNode("option", {
                          value: 0,
                          disabled: ""
                        }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.categories, (cat) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("option", {
                            key: cat.id,
                            value: cat.id
                          }, vue_cjs_prod.toDisplayString(cat[`name_${vue_cjs_prod.unref(route).params.locale}`]), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelSelect, slotProps.data.category_id]
                      ])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u0410\u0442\u0440\u0438\u0431\u0443\u0442\u044B: "),
                      vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$3), {
                        modelValue: slotProps.data.filters,
                        "onUpdate:modelValue": ($event) => slotProps.data.filters = $event,
                        options: vue_cjs_prod.unref(sortedFilters),
                        optionLabel: `name_${vue_cjs_prod.unref(route).params.locale}`,
                        display: "chip",
                        filter: true,
                        class: "w-full bg-slate-50 mt-1 rounded border border-slate-400"
                      }, {
                        value: vue_cjs_prod.withCtx((filtersSelected) => [
                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(filtersSelected.value, (option) => {
                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                              class: "p-multiselect-token",
                              key: option.id
                            }, [
                              vue_cjs_prod.createVNode("span", { class: "p-multiselect-token-label" }, vue_cjs_prod.toDisplayString(option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                            ]);
                          }), 128))
                        ]),
                        option: vue_cjs_prod.withCtx((filtersOptions) => [
                          vue_cjs_prod.createVNode("div", {
                            class: filtersOptions.option.parent_id !== 0 ? "pl-4" : ""
                          }, [
                            vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(filtersOptions.option[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "options", "optionLabel"])
                    ]),
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u0421\u0442\u0430\u0442\u0443\u0441: "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        "onUpdate:modelValue": ($event) => slotProps.data.status = $event
                      }, [
                        (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(status, (value, index) => {
                          return vue_cjs_prod.createVNode("option", {
                            key: index,
                            value: index
                          }, vue_cjs_prod.toDisplayString(value), 9, ["value"]);
                        }), 64))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelSelect, slotProps.data.status]
                      ])
                    ])
                  ])
                ]),
                vue_cjs_prod.createVNode("div", { class: "flex" }, [
                  vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u043A\u0440): "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("textarea", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        "onUpdate:modelValue": ($event) => slotProps.data.fields.description_uk = $event
                      }, "\r\n              ", 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.fields.description_uk]
                      ])
                    ])
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "md:w-1/2 sm:w-full px-2" }, [
                    vue_cjs_prod.createVNode("div", { class: "text-sm mb-4" }, [
                      vue_cjs_prod.createTextVNode(" \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0440\u0443\u0441): "),
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("textarea", {
                        class: "w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400",
                        "onUpdate:modelValue": ($event) => slotProps.data.fields.description_ru = $event
                      }, "\r\n              ", 8, ["onUpdate:modelValue"]), [
                        [vue_cjs_prod.vModelText, slotProps.data.fields.description_ru]
                      ])
                    ])
                  ])
                ]),
                vue_cjs_prod.createVNode("div", { class: "flex justify-between pt-4 px-2 mt-4 border-t border-slate-200" }, [
                  vue_cjs_prod.createVNode("button", {
                    type: "button",
                    class: "px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"),
                  vue_cjs_prod.createVNode("button", {
                    type: "button",
                    class: "px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white",
                    onClick: ($event) => save(slotProps.data)
                  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", 8, ["onClick"])
                ]),
                vue_cjs_prod.unref(successMessage) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                  key: 0,
                  class: "flex justify-center"
                }, [
                  vue_cjs_prod.createVNode("span", { class: "mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(successMessage)), 1)
                ])) : vue_cjs_prod.createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              expander: true,
              headerStyle: "width: 3rem"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "id",
              header: "ID",
              sortable: true
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "code_vendor",
              header: "\u041A\u043E\u0434"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "code_wholesale",
              header: "\u041A\u043E\u0434 \u043F\u0440."
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "name_uk",
              header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "price_retail",
              header: "\u0426\u0435\u043D\u0430",
              sortable: true
            }, {
              body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${serverRenderer.exports.ssrInterpolate(slotProps.data.price_retail / 100)}`);
                } else {
                  return [
                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(slotProps.data.price_retail / 100), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "category",
              header: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
              sortable: true
            }, {
              body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (slotProps.data.category) {
                    _push3(`<!--[-->${serverRenderer.exports.ssrInterpolate(slotProps.data.category[`name_${vue_cjs_prod.unref(route).params.locale}`])}<!--]-->`);
                  } else {
                    _push3(`<span class="text-red-600"${_scopeId2}>\u041D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</span>`);
                  }
                } else {
                  return [
                    slotProps.data.category ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(slotProps.data.category[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                    ], 64)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("span", {
                      key: 1,
                      class: "text-red-600"
                    }, "\u041D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
              field: "status",
              header: "\u0421\u0442\u0430\u0442\u0443\u0441",
              sortable: true
            }, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                expander: true,
                headerStyle: "width: 3rem"
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "id",
                header: "ID",
                sortable: true
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "code_vendor",
                header: "\u041A\u043E\u0434"
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "code_wholesale",
                header: "\u041A\u043E\u0434 \u043F\u0440."
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "name_uk",
                header: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "price_retail",
                header: "\u0426\u0435\u043D\u0430",
                sortable: true
              }, {
                body: vue_cjs_prod.withCtx((slotProps) => [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(slotProps.data.price_retail / 100), 1)
                ]),
                _: 1
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "category",
                header: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
                sortable: true
              }, {
                body: vue_cjs_prod.withCtx((slotProps) => [
                  slotProps.data.category ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(slotProps.data.category[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                  ], 64)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("span", {
                    key: 1,
                    class: "text-red-600"
                  }, "\u041D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"))
                ]),
                _: 1
              }),
              vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                field: "status",
                header: "\u0421\u0442\u0430\u0442\u0443\u0441",
                sortable: true
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$8, {
        pagination: { count: count.value },
        onChangePage: changePage
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/products.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const expandedRows = vue_cjs_prod.ref([]);
    const orders = vue_cjs_prod.ref(([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => $fetch("/api/v1/orders", { method: "GET" })), __temp = await __temp, __restore(), __temp));
    const setStatus = (status) => {
      let s = "";
      switch (status) {
        case 0:
          s = "\u0423\u0434\u0430\u043B\u0435\u043D";
          break;
        case 1:
          s = "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B\u0439";
          break;
        case 2:
          s = "\u0412 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435";
          break;
        case 3:
          s = "\u041D\u043E\u0432\u044B\u0439";
          break;
      }
      return s;
    };
    const convertData = (ts) => {
      const date = new Date(ts);
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()) + ":" + (date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds());
    };
    const calcTotal = (data) => {
      let total = 0;
      data.fullItems.map((item) => {
        total += item.price_retail * data.items[item.id] / 100;
      });
      return total;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (orders.value.length > 0) {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$b), vue_cjs_prod.mergeProps({
          value: orders.value,
          paginator: true,
          rows: 10,
          dataKey: "id",
          stripedRows: "",
          showGridlines: "",
          responsiveLayout: "scroll",
          class: "pt-4",
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": ($event) => expandedRows.value = $event
        }, _attrs), {
          expansion: vue_cjs_prod.withCtx((slotProps, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="max-w-3xl mx-auto"${_scopeId}><h3 class="text-md text-center border-b pb-4 mb-4"${_scopeId}>\u0417\u0430\u043A\u0430\u0437 - \u2116${serverRenderer.exports.ssrInterpolate(slotProps.data.id)}</h3></div><div class="w-full"${_scopeId}><h4${_scopeId}>\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h4><ul${_scopeId}><li${_scopeId}><span${_scopeId}>\u0424.\u0418.\u041E: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.fullname)}</li><li${_scopeId}><span${_scopeId}>Email: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.email)}</li><li${_scopeId}><span${_scopeId}>\u0422\u0435\u043B\u0435\u0444\u043E\u043D: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.phone)}</li><li${_scopeId}><span${_scopeId}>\u0413\u043E\u0440\u043E\u0434: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.city)}</li><li${_scopeId}><span${_scopeId}>\u0422\u0438\u043F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.delivery)}</li>`);
              if (slotProps.data.fields.post_office) {
                _push2(`<li${_scopeId}><span${_scopeId}>\u041F\u043E\u0447\u0442\u043E\u0432\u043E\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.post_office)}</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<li${_scopeId}><span${_scopeId}>\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.fields.description)}</li><li${_scopeId}><span${_scopeId}>\u0414\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430: </span> ${serverRenderer.exports.ssrInterpolate(convertData(slotProps.data.ts))}</li></ul></div><div class="w-full"${_scopeId}><!--[-->`);
              serverRenderer.exports.ssrRenderList(slotProps.data.fullItems, (item) => {
                _push2(`<div class="flex pt-4 bg-white"${_scopeId}><div class="w-1/4"${_scopeId}><img${serverRenderer.exports.ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${item.images[0]}`)}${_scopeId}></div><div class="w-3/4"${_scopeId}><div${_scopeId}><p${_scopeId}>${serverRenderer.exports.ssrInterpolate(item[`name_${vue_cjs_prod.unref(route).params.locale}`])}</p><small class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.code_vendor)}</small></div><div class="flex"${_scopeId}><div class="w-1/3"${_scopeId}><span class="font-bold"${_scopeId}>\u0426\u0435\u043D\u0430: </span> ${serverRenderer.exports.ssrInterpolate(item.price_retail / 100)} \u0433\u0440\u043D. </div><div class="w-1/3"${_scopeId}><span class="font-bold"${_scopeId}>\u041A\u043E\u043B-\u0432\u043E: </span> ${serverRenderer.exports.ssrInterpolate(slotProps.data.items[item.id])} \u0448\u0442. </div><div class="w-1/3"${_scopeId}><span class="font-bold"${_scopeId}>\u0418\u0442\u043E\u0433\u043E: </span> ${serverRenderer.exports.ssrInterpolate(item.price_retail * slotProps.data.items[item.id] / 100)} \u0433\u0440\u043D. </div></div></div></div>`);
              });
              _push2(`<!--]--><div class="flex justify-end"${_scopeId}><span class="font-bold"${_scopeId}>\u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430: </span> ${serverRenderer.exports.ssrInterpolate(calcTotal(slotProps.data))} \u0433\u0440\u043D. </div></div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", { class: "max-w-3xl mx-auto" }, [
                  vue_cjs_prod.createVNode("h3", { class: "text-md text-center border-b pb-4 mb-4" }, "\u0417\u0430\u043A\u0430\u0437 - \u2116" + vue_cjs_prod.toDisplayString(slotProps.data.id), 1)
                ]),
                vue_cjs_prod.createVNode("div", { class: "w-full" }, [
                  vue_cjs_prod.createVNode("h4", null, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"),
                  vue_cjs_prod.createVNode("ul", null, [
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u0424.\u0418.\u041E: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.fullname), 1)
                    ]),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "Email: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.email), 1)
                    ]),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.phone), 1)
                    ]),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u0413\u043E\u0440\u043E\u0434: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.city), 1)
                    ]),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u0422\u0438\u043F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.delivery), 1)
                    ]),
                    slotProps.data.fields.post_office ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("li", { key: 0 }, [
                      vue_cjs_prod.createVNode("span", null, "\u041F\u043E\u0447\u0442\u043E\u0432\u043E\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.post_office), 1)
                    ])) : vue_cjs_prod.createCommentVNode("", true),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.fields.description), 1)
                    ]),
                    vue_cjs_prod.createVNode("li", null, [
                      vue_cjs_prod.createVNode("span", null, "\u0414\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430: "),
                      vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(convertData(slotProps.data.ts)), 1)
                    ])
                  ])
                ]),
                vue_cjs_prod.createVNode("div", { class: "w-full" }, [
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(slotProps.data.fullItems, (item) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                      class: "flex pt-4 bg-white",
                      key: item.id
                    }, [
                      vue_cjs_prod.createVNode("div", { class: "w-1/4" }, [
                        vue_cjs_prod.createVNode("img", {
                          src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                        }, null, 8, ["src"])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "w-3/4" }, [
                        vue_cjs_prod.createVNode("div", null, [
                          vue_cjs_prod.createVNode("p", null, vue_cjs_prod.toDisplayString(item[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1),
                          vue_cjs_prod.createVNode("small", { class: "font-bold" }, vue_cjs_prod.toDisplayString(item.code_vendor), 1)
                        ]),
                        vue_cjs_prod.createVNode("div", { class: "flex" }, [
                          vue_cjs_prod.createVNode("div", { class: "w-1/3" }, [
                            vue_cjs_prod.createVNode("span", { class: "font-bold" }, "\u0426\u0435\u043D\u0430: "),
                            vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(item.price_retail / 100) + " \u0433\u0440\u043D. ", 1)
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "w-1/3" }, [
                            vue_cjs_prod.createVNode("span", { class: "font-bold" }, "\u041A\u043E\u043B-\u0432\u043E: "),
                            vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(slotProps.data.items[item.id]) + " \u0448\u0442. ", 1)
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "w-1/3" }, [
                            vue_cjs_prod.createVNode("span", { class: "font-bold" }, "\u0418\u0442\u043E\u0433\u043E: "),
                            vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(item.price_retail * slotProps.data.items[item.id] / 100) + " \u0433\u0440\u043D. ", 1)
                          ])
                        ])
                      ])
                    ]);
                  }), 128)),
                  vue_cjs_prod.createVNode("div", { class: "flex justify-end" }, [
                    vue_cjs_prod.createVNode("span", { class: "font-bold" }, "\u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430: "),
                    vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(calcTotal(slotProps.data)) + " \u0433\u0440\u043D. ", 1)
                  ])
                ])
              ];
            }
          }),
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                expander: true,
                headerStyle: "width: 3rem"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "id",
                header: "ID",
                sortable: true
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "fullItems",
                header: "\u0422\u043E\u0432\u0430\u0440"
              }, {
                body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    serverRenderer.exports.ssrRenderList(slotProps.data.fullItems, (item) => {
                      _push3(`<div${_scopeId2}><span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(item.code_vendor)} - ${serverRenderer.exports.ssrInterpolate(slotProps.data.items[item.id])} \u0448\u0442.</span></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(slotProps.data.fullItems, (item) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                          key: item.id
                        }, [
                          vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.code_vendor) + " - " + vue_cjs_prod.toDisplayString(slotProps.data.items[item.id]) + " \u0448\u0442.", 1)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "status",
                header: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430",
                sortable: true
              }, {
                body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(setStatus(slotProps.data.status))}</span>`);
                  } else {
                    return [
                      vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(setStatus(slotProps.data.status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "ts",
                header: "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
                sortable: true
              }, {
                body: vue_cjs_prod.withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${serverRenderer.exports.ssrInterpolate(convertData(slotProps.data.ts))}</span>`);
                  } else {
                    return [
                      vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(convertData(slotProps.data.ts)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  expander: true,
                  headerStyle: "width: 3rem"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "id",
                  header: "ID",
                  sortable: true
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "fullItems",
                  header: "\u0422\u043E\u0432\u0430\u0440"
                }, {
                  body: vue_cjs_prod.withCtx((slotProps) => [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(slotProps.data.fullItems, (item) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                        key: item.id
                      }, [
                        vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(item.code_vendor) + " - " + vue_cjs_prod.toDisplayString(slotProps.data.items[item.id]) + " \u0448\u0442.", 1)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "status",
                  header: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430",
                  sortable: true
                }, {
                  body: vue_cjs_prod.withCtx((slotProps) => [
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(setStatus(slotProps.data.status)), 1)
                  ]),
                  _: 1
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "ts",
                  header: "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
                  sortable: true
                }, {
                  body: vue_cjs_prod.withCtx((slotProps) => [
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(convertData(slotProps.data.ts)), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/orders.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const users = vue_cjs_prod.ref(([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => $fetch("/api/v1/users", { method: "GET" })), __temp = await __temp, __restore(), __temp));
    return (_ctx, _push, _parent, _attrs) => {
      if (users.value.length > 0) {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$b), vue_cjs_prod.mergeProps({
          value: users.value,
          paginator: true,
          rows: 10,
          dataKey: "id",
          stripedRows: "",
          showGridlines: "",
          responsiveLayout: "scroll",
          class: "pt-4"
        }, _attrs), {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                expander: true,
                headerStyle: "width: 3rem"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "id",
                header: "ID",
                sortable: true
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "email",
                header: "Email"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "access_level",
                header: "\u041F\u0440\u0430\u0432\u0430"
              }, null, _parent2, _scopeId));
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(script$4), {
                field: "ts",
                header: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  expander: true,
                  headerStyle: "width: 3rem"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "id",
                  header: "ID",
                  sortable: true
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "email",
                  header: "Email"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "access_level",
                  header: "\u041F\u0440\u0430\u0432\u0430"
                }),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(script$4), {
                  field: "ts",
                  header: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/users.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const categories = vue_cjs_prod.ref([]);
    const filters = vue_cjs_prod.ref([]);
    const filterSupp = vue_cjs_prod.ref([]);
    const filterCars = vue_cjs_prod.ref([]);
    const getCockpitData = async () => {
      categories.value = await $fetch("/api/v1/categories");
      filters.value = await $fetch("/api/v1/filters");
      filterSupp.value = filters.value.filter((f) => f.parent_id === 2);
      filterCars.value = filters.value.filter((f) => f.parent_id !== 2);
    };
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getCockpitData()), await __temp, __restore();
    const menu = [
      { name: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", url: "main" },
      { name: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B", url: "products" },
      { name: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", url: "categories", child: categories.value },
      { name: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B", url: "filters", child: filters.value },
      { name: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438", url: "users" },
      { name: "\u0417\u0430\u043A\u0430\u0437\u044B", url: "orders" }
    ];
    useAuthUser();
    const showComponent = vue_cjs_prod.ref({
      name: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
      url: "main",
      id: null
    });
    const xmlCategories = vue_cjs_prod.ref([]);
    let xmlData = "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "cockpit fixed top-0 left-0 bg-white w-full h-full overflow-auto" }, _attrs))}><a href="#" class="absolute right-2 top-2"><i class="pi pi-times"></i></a><div class="flex"><div class="w-64 border-r shadow-md"><h1 class="px-3 py-2 text-sm border-b">\u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B\u044C</h1><ul><!--[-->`);
      serverRenderer.exports.ssrRenderList(menu, (elem, index) => {
        _push(`<li><a class="nav-link" href="#">${serverRenderer.exports.ssrInterpolate(elem.name)}</a>`);
        if (elem.child) {
          _push(`<ul class="max-h-80 overflow-auto border-y shadow-inner"><!--[-->`);
          serverRenderer.exports.ssrRenderList(elem.child, (subelem, subindex) => {
            _push(`<!--[-->`);
            if (subelem && subelem.parent_id === 0) {
              _push(`<li><a class="nav-link" href="#">${serverRenderer.exports.ssrInterpolate(subelem[`name_${vue_cjs_prod.unref(route).params.locale}`] || subelem.name)}</a></li>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="w-full p-6"><h1>${serverRenderer.exports.ssrInterpolate(showComponent.value.name)}</h1>`);
      if (showComponent.value.url === "main") {
        _push(`<div><label class="block"><span class="sr-only">\u0418\u043C\u043F\u043E\u0440\u0442 \u0442\u043E\u0432\u0430\u0440\u0430</span><input type="file" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" multiple="true"></label></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "main") {
        _push(`<!--[--><ul class="border-b mb-4 py-2"><!--[-->`);
        serverRenderer.exports.ssrRenderList(xmlCategories.value, (cat) => {
          _push(`<li><span${serverRenderer.exports.ssrRenderAttr("data-id", cat.id)}${serverRenderer.exports.ssrRenderAttr("data", cat.parent_id)}>${serverRenderer.exports.ssrInterpolate(cat)}</span></li>`);
        });
        _push(`<!--]--></ul><div>${vue_cjs_prod.unref(xmlData)}</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "categories") {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$a, {
          filters: filters.value,
          categories: categories.value,
          showComponent: showComponent.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "filters") {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$9, {
          filters: filters.value,
          showComponent: showComponent.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "products") {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$7, {
          showComponent: showComponent.value,
          filters: filters.value,
          categories: categories.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "users") {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$5, { showComponent: showComponent.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showComponent.value.url === "orders") {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$6, { showComponent: showComponent.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cockpit/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "top",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout: logout2 } = useAuth();
    const route = useRoute();
    useRouter();
    const currentuser = useAuthUser();
    const isAdmin = useAdmin();
    const isOpen = vue_cjs_prod.ref(false);
    const showModal = vue_cjs_prod.ref(false);
    const searchText = vue_cjs_prod.ref(route.params.request || "");
    const openSignIn = () => {
      showModal.value = !showModal.value;
    };
    const openCockpit = async () => {
      document.body.classList.add("overflow-hidden");
      isOpen.value = true;
    };
    const closeCockpit = () => {
      document.body.classList.remove("overflow-hidden");
      isOpen.value = false;
    };
    const clikLogout = async () => {
      await logout2();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_client_only = __nuxt_component_0;
      _push(`<!--[--><div class="w-full flex justify-between bg-slate-600 px-5 py-1"><div class="flex item-center text-xs text-slate-100">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-900",
        to: `/${_ctx.$route.params.locale}`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(_ctx.$t("mainPage"))}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(_ctx.$t("mainPage")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-900",
        to: `/${_ctx.$route.params.locale}/pages/about_us`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(_ctx.$t("pages.about_us"))}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(_ctx.$t("pages.about_us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-900",
        to: `/${_ctx.$route.params.locale}/pages/delivery`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(_ctx.$t("pages.delivery"))}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(_ctx.$t("pages.delivery")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-900",
        to: `/${_ctx.$route.params.locale}/pages/contacts`
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(_ctx.$t("pages.contacts"))}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(_ctx.$t("pages.contacts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="block-lang text-xs text-slate-100">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!vue_cjs_prod.unref(currentuser)) {
              _push2(`<button type="button" class="py-1 px-2 hover:text-slate-100"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("come_in"))}</button>`);
            } else {
              _push2(`<!--[-->`);
              if (vue_cjs_prod.unref(isAdmin)) {
                _push2(`<button type="button" class="py-1 px-2"${_scopeId}><i class="pi pi-cog"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button type="button" class="py-1 px-2 hover:text-slate-100"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("logout"))}</button><!--]-->`);
            }
          } else {
            return [
              !vue_cjs_prod.unref(currentuser) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("button", {
                key: 0,
                type: "button",
                class: "py-1 px-2 hover:text-slate-100",
                onClick: ($event) => openSignIn()
              }, vue_cjs_prod.toDisplayString(_ctx.$t("come_in")), 9, ["onClick"])) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 1 }, [
                vue_cjs_prod.unref(isAdmin) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "py-1 px-2",
                  onClick: vue_cjs_prod.withModifiers(($event) => openCockpit(), ["prevent"])
                }, [
                  vue_cjs_prod.createVNode("i", { class: "pi pi-cog" })
                ], 8, ["onClick"])) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.createVNode("button", {
                  type: "button",
                  class: "py-1 px-2 hover:text-slate-100",
                  onClick: ($event) => clikLogout()
                }, vue_cjs_prod.toDisplayString(_ctx.$t("logout")), 9, ["onClick"])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-100 active:bg-slate-100",
        to: { params: { locale: "uk" } }
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`UK`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("UK")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        class: "py-1 px-2 hover:text-slate-100",
        to: { params: { locale: "ru" } }
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`RU`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("RU")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="w-full bg-slate-0 mb-5 px-5 border-t border-b border-gray-200 shadow-md"><div class="h-32 flex items-center justify-between">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `/${_ctx.$route.params.locale}`,
        class: "w-1/4 px-8"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0)} class="w-full"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0,
                class: "w-full"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<form class="md:w-2/4 sm:w-2/3 px-5"><div class="flex w-full shadow-md"><input type="text" name="search"${serverRenderer.exports.ssrRenderAttr("value", searchText.value)} class="w-full form-input px-4 py-3 rounded-l-md outline-0"${serverRenderer.exports.ssrRenderAttr("placeholder", _ctx.$t("search_pl"))}><button type="submit" class="w-20 px-4 py-3 bg-slate-600 text-gray-100 rounded-r-md outline-0 transition-all hover:bg-slate-400">${serverRenderer.exports.ssrInterpolate(_ctx.$t("search_btn"))}</button></div></form><div class="w-1/4 flex justify-end">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$c, null, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$c)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (showModal.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$b, { openSignIn }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vue_cjs_prod.unref(isAdmin) && isOpen.value) {
              _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$4, {
                onCloseCockpit: ($event) => closeCockpit()
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue_cjs_prod.unref(isAdmin) && isOpen.value ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_sfc_main$4, {
                key: 0,
                onCloseCockpit: ($event) => closeCockpit()
              }, null, 8, ["onCloseCockpit"])) : vue_cjs_prod.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/top.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "NuxtLoadingBar",
  __ssrInlineRender: true,
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 10
    }
  },
  setup(__props) {
    const props = __props;
    const data = vue_cjs_prod.reactive({
      percent: 0,
      show: false,
      canSucceed: true
    });
    let _timer = null;
    let _throttle = null;
    let _cut;
    const clear = () => {
      _timer && clearInterval(_timer);
      _throttle && clearTimeout(_throttle);
      _timer = null;
    };
    const start = () => {
      clear();
      data.percent = 0;
      data.canSucceed = true;
      if (props.throttle) {
        _throttle = setTimeout(startTimer, props.throttle);
      } else {
        startTimer();
      }
    };
    const increase = (num) => {
      data.percent = Math.min(100, Math.floor(data.percent + num));
    };
    const finish = () => {
      data.percent = 100;
      hide();
    };
    const hide = () => {
      clear();
      setTimeout(() => {
        data.show = false;
        setTimeout(() => {
          data.percent = 0;
        }, 400);
      }, 500);
    };
    const startTimer = () => {
      data.show = true;
      _cut = 1e4 / Math.floor(props.duration);
      _timer = setInterval(() => {
        increase(_cut);
      }, 100);
    };
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", start);
    nuxtApp.hook("page:finish", () => {
      window.scrollTo(0, 0);
      finish();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["nuxt-progress", {
          "nuxt-progress-failed": !data.canSucceed
        }],
        style: {
          width: data.percent + "%",
          left: data.left,
          height: props.height + "px",
          opacity: data.show ? 1 : 0,
          backgroundSize: 100 / data.percent * 100 + "% auto"
        }
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/NuxtLoadingBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "h-64 flex justify-center items-center bg-slate-500 mt-8" }, _attrs))}><span>Footer</span></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  data() {
    return {};
  },
  head() {
    return {
      bodyAttrs: {
        class: "bg-slate-100"
      }
    };
  },
  components: {
    Top: _sfc_main$3,
    NuxtLoadingBar: _sfc_main$2,
    Footer
  },
  created() {
    if (!this.$route.params.locale) {
      this.$router.replace("/uk");
    }
  },
  mounted() {
    cartStore().initCart();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Top = vue_cjs_prod.resolveComponent("Top");
  const _component_NuxtLoadingBar = vue_cjs_prod.resolveComponent("NuxtLoadingBar");
  const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
  const _component_Footer = vue_cjs_prod.resolveComponent("Footer");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "max-w-screen-xl mx-auto" }, _attrs))}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_Top, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLoadingBar, { duration: 3e3 }, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, { class: "m-auto md:w-full md:px-4 md:w-full xl:max-w-5xl" }, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$d);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { Slider as S, _sfc_main$f as _, useRouter as a, useAuthUser as b, cartStore as c, __nuxt_component_0 as d, entry$1 as default, __nuxt_component_0$1 as e, useAsyncData as f, _sfc_main$h as g, _sfc_main$g as h, _export_sfc as i, useNuxtApp as j, defineNuxtRouteMiddleware as k, useAdmin as l, abortNavigation as m, navigateTo as n, useHead as o, useRoute as u, vue_cjs_prod as v };
//# sourceMappingURL=server.mjs.map
