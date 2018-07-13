
// //polyfill
// ;(function () {
//   (function() {
// 'use strict';

// if (self.fetch) {
// return
// }

// function normalizeName(name) {
// if (typeof name !== 'string') {
// name = name.toString();
// }
// if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
// throw new TypeError('Invalid character in header field name')
// }
// return name.toLowerCase()
// }

// function normalizeValue(value) {
// if (typeof value !== 'string') {
// value = value.toString();
// }
// return value
// }

// function Headers(headers) {
// this.map = {}

// var self = this
// if (headers instanceof Headers) {
// headers.forEach(function(name, values) {
//   values.forEach(function(value) {
//     self.append(name, value)
//   })
// })

// } else if (headers) {
// Object.getOwnPropertyNames(headers).forEach(function(name) {
//   self.append(name, headers[name])
// })
// }
// }

// Headers.prototype.append = function(name, value) {
// name = normalizeName(name)
// value = normalizeValue(value)
// var list = this.map[name]
// if (!list) {
// list = []
// this.map[name] = list
// }
// list.push(value)
// }

// Headers.prototype['delete'] = function(name) {
// delete this.map[normalizeName(name)]
// }

// Headers.prototype.get = function(name) {
// var values = this.map[normalizeName(name)]
// return values ? values[0] : null
// }

// Headers.prototype.getAll = function(name) {
// return this.map[normalizeName(name)] || []
// }

// Headers.prototype.has = function(name) {
// return this.map.hasOwnProperty(normalizeName(name))
// }

// Headers.prototype.set = function(name, value) {
// this.map[normalizeName(name)] = [normalizeValue(value)]
// }

// // Instead of iterable for now.
// Headers.prototype.forEach = function(callback) {
// var self = this
// Object.getOwnPropertyNames(this.map).forEach(function(name) {
// callback(name, self.map[name])
// })
// }

// function consumed(body) {
// if (body.bodyUsed) {
// return Promise.reject(new TypeError('Already read'))
// }
// body.bodyUsed = true
// }

// function fileReaderReady(reader) {
// return new Promise(function(resolve, reject) {
// reader.onload = function() {
//   resolve(reader.result)
// }
// reader.onerror = function() {
//   reject(reader.error)
// }
// })
// }

// function readBlobAsArrayBuffer(blob) {
// var reader = new FileReader()
// reader.readAsArrayBuffer(blob)
// return fileReaderReady(reader)
// }

// function readBlobAsText(blob) {
// var reader = new FileReader()
// reader.readAsText(blob)
// return fileReaderReady(reader)
// }

// var support = {
// blob: 'FileReader' in self && 'Blob' in self && (function() {
// try {
//   new Blob();
//   return true
// } catch(e) {
//   return false
// }
// })(),
// formData: 'FormData' in self
// }

// function Body() {
// this.bodyUsed = false


// this._initBody = function(body) {
// this._bodyInit = body
// if (typeof body === 'string') {
//   this._bodyText = body
// } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
//   this._bodyBlob = body
// } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
//   this._bodyFormData = body
// } else if (!body) {
//   this._bodyText = ''
// } else {
//   throw new Error('unsupported BodyInit type')
// }
// }

// if (support.blob) {
// this.blob = function() {
//   var rejected = consumed(this)
//   if (rejected) {
//     return rejected
//   }

//   if (this._bodyBlob) {
//     return Promise.resolve(this._bodyBlob)
//   } else if (this._bodyFormData) {
//     throw new Error('could not read FormData body as blob')
//   } else {
//     return Promise.resolve(new Blob([this._bodyText]))
//   }
// }

// this.arrayBuffer = function() {
//   return this.blob().then(readBlobAsArrayBuffer)
// }

// this.text = function() {
//   var rejected = consumed(this)
//   if (rejected) {
//     return rejected
//   }

//   if (this._bodyBlob) {
//     return readBlobAsText(this._bodyBlob)
//   } else if (this._bodyFormData) {
//     throw new Error('could not read FormData body as text')
//   } else {
//     return Promise.resolve(this._bodyText)
//   }
// }
// } else {
// this.text = function() {
//   var rejected = consumed(this)
//   return rejected ? rejected : Promise.resolve(this._bodyText)
// }
// }

// if (support.formData) {
// this.formData = function() {
//   return this.text().then(decode)
// }
// }

// this.json = function() {
// return this.text().then(JSON.parse)
// }

// return this
// }

// // HTTP methods whose capitalization should be normalized
// var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

// function normalizeMethod(method) {
// var upcased = method.toUpperCase()
// return (methods.indexOf(upcased) > -1) ? upcased : method
// }

// function Request(url, options) {
// options = options || {}
// this.url = url

// this.credentials = options.credentials || 'omit'
// this.headers = new Headers(options.headers)
// this.method = normalizeMethod(options.method || 'GET')
// this.mode = options.mode || null
// this.referrer = null

// if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
// throw new TypeError('Body not allowed for GET or HEAD requests')
// }
// this._initBody(options.body)
// }

// function decode(body) {
// var form = new FormData()
// body.trim().split('&').forEach(function(bytes) {
// if (bytes) {
//   var split = bytes.split('=')
//   var name = split.shift().replace(/\+/g, ' ')
//   var value = split.join('=').replace(/\+/g, ' ')
//   form.append(decodeURIComponent(name), decodeURIComponent(value))
// }
// })
// return form
// }

// function headers(xhr) {
// var head = new Headers()
// var pairs = xhr.getAllResponseHeaders().trim().split('\n')
// pairs.forEach(function(header) {
// var split = header.trim().split(':')
// var key = split.shift().trim()
// var value = split.join(':').trim()
// head.append(key, value)
// })
// return head
// }

// Body.call(Request.prototype)

// function Response(bodyInit, options) {
// if (!options) {
// options = {}
// }

// this._initBody(bodyInit)
// this.type = 'default'
// this.url = null
// this.status = options.status
// this.ok = this.status >= 200 && this.status < 300
// this.statusText = options.statusText
// this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
// this.url = options.url || ''
// }

// Body.call(Response.prototype)

// self.Headers = Headers;
// self.Request = Request;
// self.Response = Response;

// self.fetch = function(input, init) {
// // TODO: Request constructor should accept input, init
// var request
// if (Request.prototype.isPrototypeOf(input) && !init) {
// request = input
// } else {
// request = new Request(input, init)
// }

// return new Promise(function(resolve, reject) {
// var xhr = new XMLHttpRequest()
// if (request.credentials === 'cors') {
//   xhr.withCredentials = true;
// }

// function responseURL() {
//   if ('responseURL' in xhr) {
//     return xhr.responseURL
//   }

//   // Avoid security warnings on getResponseHeader when not allowed by CORS
//   if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
//     return xhr.getResponseHeader('X-Request-URL')
//   }

//   return;
// }

// xhr.onload = function() {
//   var status = (xhr.status === 1223) ? 204 : xhr.status
//   if (status < 100 || status > 599) {
//     reject(new TypeError('Network request failed'))
//     return
//   }
//   var options = {
//     status: status,
//     statusText: xhr.statusText,
//     headers: headers(xhr),
//     url: responseURL()
//   }
//   var body = 'response' in xhr ? xhr.response : xhr.responseText;
//   resolve(new Response(body, options))
// }

// xhr.onerror = function() {
//   reject(new TypeError('Network request failed'))
// }

// xhr.open(request.method, request.url, true)

// if ('responseType' in xhr && support.blob) {
//   xhr.responseType = 'blob'
// }

// request.headers.forEach(function(name, values) {
//   values.forEach(function(value) {
//     xhr.setRequestHeader(name, value)
//   })
// })

// xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
// })
// }
// self.fetch.polyfill = true
// })();
// (function (global, undefined) {
// "use strict";

// if (global.setImmediate) {
//   return;
// }

// var nextHandle = 1; // Spec says greater than zero
// var tasksByHandle = {};
// var currentlyRunningATask = false;
// var doc = global.document;
// var setImmediate;

// function addFromSetImmediateArguments(args) {
//   tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
//   return nextHandle++;
// }

// // This function accepts the same arguments as setImmediate, but
// // returns a function that requires no arguments.
// function partiallyApplied(handler) {
//   var args = [].slice.call(arguments, 1);
//   return function() {
//       if (typeof handler === "function") {
//           handler.apply(undefined, args);
//       } else {
//           (new Function("" + handler))();
//       }
//   };
// }

// function runIfPresent(handle) {
//   // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
//   // So if we're currently running a task, we'll need to delay this invocation.
//   if (currentlyRunningATask) {
//       // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
//       // "too much recursion" error.
//       setTimeout(partiallyApplied(runIfPresent, handle), 0);
//   } else {
//       var task = tasksByHandle[handle];
//       if (task) {
//           currentlyRunningATask = true;
//           try {
//               task();
//           } finally {
//               clearImmediate(handle);
//               currentlyRunningATask = false;
//           }
//       }
//   }
// }

// function clearImmediate(handle) {
//   delete tasksByHandle[handle];
// }

// function installNextTickImplementation() {
//   setImmediate = function() {
//       var handle = addFromSetImmediateArguments(arguments);
//       process.nextTick(partiallyApplied(runIfPresent, handle));
//       return handle;
//   };
// }

// function canUsePostMessage() {
//   // The test against `importScripts` prevents this implementation from being installed inside a web worker,
//   // where `global.postMessage` means something completely different and can't be used for this purpose.
//   if (global.postMessage && !global.importScripts) {
//       var postMessageIsAsynchronous = true;
//       var oldOnMessage = global.onmessage;
//       global.onmessage = function() {
//           postMessageIsAsynchronous = false;
//       };
//       global.postMessage("", "*");
//       global.onmessage = oldOnMessage;
//       return postMessageIsAsynchronous;
//   }
// }

// function installPostMessageImplementation() {
//   // Installs an event handler on `global` for the `message` event: see
//   // * https://developer.mozilla.org/en/DOM/window.postMessage
//   // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

//   var messagePrefix = "setImmediate$" + Math.random() + "$";
//   var onGlobalMessage = function(event) {
//       if (event.source === global &&
//           typeof event.data === "string" &&
//           event.data.indexOf(messagePrefix) === 0) {
//           runIfPresent(+event.data.slice(messagePrefix.length));
//       }
//   };

//   if (global.addEventListener) {
//       global.addEventListener("message", onGlobalMessage, false);
//   } else {
//       global.attachEvent("onmessage", onGlobalMessage);
//   }

//   setImmediate = function() {
//       var handle = addFromSetImmediateArguments(arguments);
//       global.postMessage(messagePrefix + handle, "*");
//       return handle;
//   };
// }

// function installMessageChannelImplementation() {
//   var channel = new MessageChannel();
//   channel.port1.onmessage = function(event) {
//       var handle = event.data;
//       runIfPresent(handle);
//   };

//   setImmediate = function() {
//       var handle = addFromSetImmediateArguments(arguments);
//       channel.port2.postMessage(handle);
//       return handle;
//   };
// }

// function installReadyStateChangeImplementation() {
//   var html = doc.documentElement;
//   setImmediate = function() {
//       var handle = addFromSetImmediateArguments(arguments);
//       // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
//       // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
//       var script = doc.createElement("script");
//       script.onreadystatechange = function () {
//           runIfPresent(handle);
//           script.onreadystatechange = null;
//           html.removeChild(script);
//           script = null;
//       };
//       html.appendChild(script);
//       return handle;
//   };
// }

// function installSetTimeoutImplementation() {
//   setImmediate = function() {
//       var handle = addFromSetImmediateArguments(arguments);
//       setTimeout(partiallyApplied(runIfPresent, handle), 0);
//       return handle;
//   };
// }

// // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
// var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
// attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

// // Don't get fooled by e.g. browserify environments.
// if ({}.toString.call(global.process) === "[object process]") {
//   // For Node.js before 0.9
//   installNextTickImplementation();

// } else if (canUsePostMessage()) {
//   // For non-IE10 modern browsers
//   installPostMessageImplementation();

// } else if (global.MessageChannel) {
//   // For web workers, where supported
//   installMessageChannelImplementation();

// } else if (doc && "onreadystatechange" in doc.createElement("script")) {
//   // For IE 6–8
//   installReadyStateChangeImplementation();

// } else {
//   // For older browsers
//   installSetTimeoutImplementation();
// }

// attachTo.setImmediate = setImmediate;
// attachTo.clearImmediate = clearImmediate;
// }(new Function("return this")()));
// /**
// * Promise polyfill v1.0.10
// * requires setImmediate
// *
// * © 2014–2015 Dmitry Korobkin
// * Released under the MIT license
// * github.com/Octane/Promise
// */
// (function (global) {'use strict';

// var STATUS = '[[PromiseStatus]]';
// var VALUE = '[[PromiseValue]]';
// var ON_FUlFILLED = '[[OnFulfilled]]';
// var ON_REJECTED = '[[OnRejected]]';
// var ORIGINAL_ERROR = '[[OriginalError]]';
// var PENDING = 'pending';
// var INTERNAL_PENDING = 'internal pending';
// var FULFILLED = 'fulfilled';
// var REJECTED = 'rejected';
// var NOT_ARRAY = 'not an array.';
// var REQUIRES_NEW = 'constructor Promise requires "new".';
// var CHAINING_CYCLE = 'then() cannot return same Promise that it resolves.';

// var setImmediate = global.setImmediate || require('timers').setImmediate;
// var isArray = Array.isArray || function (anything) {
//   return Object.prototype.toString.call(anything) == '[object Array]';
// };

// function InternalError(originalError) {
//   this[ORIGINAL_ERROR] = originalError;
// }

// function isInternalError(anything) {
//   return anything instanceof InternalError;
// }

// function isObject(anything) {
//   //Object.create(null) instanceof Object → false
//   return Object(anything) === anything;
// }

// function isCallable(anything) {
//   return typeof anything == 'function';
// }

// function isPromise(anything) {
//   return anything instanceof Promise;
// }

// function identity(value) {
//   return value;
// }

// function thrower(reason) {
//   throw reason;
// }

// function enqueue(promise, onFulfilled, onRejected) {
//   if (!promise[ON_FUlFILLED]) {
//       promise[ON_FUlFILLED] = [];
//       promise[ON_REJECTED] = [];
//   }
//   promise[ON_FUlFILLED].push(onFulfilled);
//   promise[ON_REJECTED].push(onRejected);
// }

// function clearAllQueues(promise) {
//   delete promise[ON_FUlFILLED];
//   delete promise[ON_REJECTED];
// }

// function callEach(queue) {
//   var i;
//   var length = queue.length;
//   for (i = 0; i < length; i++) {
//       queue[i]();
//   }
// }

// function call(resolve, reject, value) {
//   var anything = toPromise(value);
//   if (isPromise(anything)) {
//       anything.then(resolve, reject);
//   } else if (isInternalError(anything)) {
//       reject(anything[ORIGINAL_ERROR]);
//   } else {
//       resolve(value);
//   }
// }

// function toPromise(anything) {
//   var then;
//   if (isPromise(anything)) {
//       return anything;
//   }
//   if(isObject(anything)) {
//       try {
//           then = anything.then;
//       } catch (error) {
//           return new InternalError(error);
//       }
//       if (isCallable(then)) {
//           return new Promise(function (resolve, reject) {
//               setImmediate(function () {
//                   try {
//                       then.call(anything, resolve, reject);
//                   } catch (error) {
//                       reject(error);
//                   }
//               });
//           });
//       }
//   }
//   return null;
// }

// function resolvePromise(promise, resolver) {
//   function resolve(value) {
//       if (promise[STATUS] == PENDING) {
//           fulfillPromise(promise, value);
//       }
//   }
//   function reject(reason) {
//       if (promise[STATUS] == PENDING) {
//           rejectPromise(promise, reason);
//       }
//   }
//   try {
//       resolver(resolve, reject);
//   } catch(error) {
//       reject(error);
//   }
// }

// function fulfillPromise(promise, value) {
//   var queue;
//   var anything = toPromise(value);
//   if (isPromise(anything)) {
//       promise[STATUS] = INTERNAL_PENDING;
//       anything.then(
//           function (value) {
//               fulfillPromise(promise, value);
//           },
//           function (reason) {
//               rejectPromise(promise, reason);
//           }
//       );
//   } else if (isInternalError(anything)) {
//       rejectPromise(promise, anything[ORIGINAL_ERROR]);
//   } else {
//       promise[STATUS] = FULFILLED;
//       promise[VALUE] = value;
//       queue = promise[ON_FUlFILLED];
//       if (queue && queue.length) {
//           clearAllQueues(promise);
//           callEach(queue);
//       }
//   }
// }

// function rejectPromise(promise, reason) {
//   var queue = promise[ON_REJECTED];
//   promise[STATUS] = REJECTED;
//   promise[VALUE] = reason;
//   if (queue && queue.length) {
//       clearAllQueues(promise);
//       callEach(queue);
//   }
// }

// function Promise(resolver) {
//   var promise = this;
//   if (!isPromise(promise)) {
//       throw new TypeError(REQUIRES_NEW);
//   }
//   promise[STATUS] = PENDING;
//   promise[VALUE] = undefined;
//   resolvePromise(promise, resolver);
// }

// Promise.prototype.then = function (onFulfilled, onRejected) {
//   var promise = this;
//   var nextPromise;
//   onFulfilled = isCallable(onFulfilled) ? onFulfilled : identity;
//   onRejected = isCallable(onRejected) ? onRejected : thrower;
//   nextPromise = new Promise(function (resolve, reject) {
//       function tryCall(func) {
//           var value;
//           try {
//               value = func(promise[VALUE]);
//           } catch (error) {
//               reject(error);
//               return;
//           }
//           if (value === nextPromise) {
//               reject(new TypeError(CHAINING_CYCLE));
//           } else {
//               call(resolve, reject, value);
//           }
//       }
//       function asyncOnFulfilled() {
//           setImmediate(tryCall, onFulfilled);
//       }
//       function asyncOnRejected() {
//           setImmediate(tryCall, onRejected);
//       }
//       switch (promise[STATUS]) {
//           case FULFILLED:
//               asyncOnFulfilled();
//               break;
//           case REJECTED:
//               asyncOnRejected();
//               break;
//           default:
//               enqueue(promise, asyncOnFulfilled, asyncOnRejected);
//       }
//   });
//   return nextPromise;
// };

// Promise.prototype['catch'] = function (onRejected) {
//   return this.then(identity, onRejected);
// };

// Promise.resolve = function (value) {
//   var anything = toPromise(value);
//   if (isPromise(anything)) {
//       return anything;
//   }
//   return new Promise(function (resolve, reject) {
//       if (isInternalError(anything)) {
//           reject(anything[ORIGINAL_ERROR]);
//       } else {
//           resolve(value);
//       }
//   });
// };

// Promise.reject = function (reason) {
//   return new Promise(function (resolve, reject) {
//       reject(reason);
//   });
// };

// Promise.race = function (values) {
//   return new Promise(function (resolve, reject) {
//       var i;
//       var length;
//       if (isArray(values)) {
//           length = values.length;
//           for (i = 0; i < length; i++) {
//               call(resolve, reject, values[i]);
//           }
//       } else {
//           reject(new TypeError(NOT_ARRAY));
//       }
//   });
// };

// Promise.all = function (values) {
//   return new Promise(function (resolve, reject) {
//       var fulfilledCount = 0;
//       var promiseCount = 0;
//       var anything;
//       var length;
//       var value;
//       var i;
//       if (isArray(values)) {
//           values = values.slice(0);
//           length = values.length;
//           for (i = 0; i < length; i++) {
//               value = values[i];
//               anything = toPromise(value);
//               if (isPromise(anything)) {
//                   promiseCount++;
//                   anything.then(
//                       function (index) {
//                           return function (value) {
//                               values[index] = value;
//                               fulfilledCount++;
//                               if (fulfilledCount == promiseCount) {
//                                   resolve(values);
//                               }
//                           };
//                       }(i),
//                       reject
//                   );
//               } else if (isInternalError(anything)) {
//                   reject(anything[ORIGINAL_ERROR]);
//               } else {
//                   //[1, , 3] → [1, undefined, 3]
//                   values[i] = value;
//               }
//           }
//           if (!promiseCount) {
//               resolve(values);
//           }
//       } else {
//           reject(new TypeError(NOT_ARRAY));
//       }
//   });
// };

// if (typeof module != 'undefined' && module.exports) {
//   module.exports = global.Promise || Promise;
// } else if (!global.Promise) {
//   global.Promise = Promise;
// }

// }(this));

// }.call(
//   typeof window === 'object' && window ||
//   typeof self   === 'object' && self   ||
//   typeof global === 'object' && global ||
//   {}
// ));
// // https://tc39.github.io/ecma262/#sec-array.prototype.includes
// try{
// if(!Array.prototype.includes) {
//   Object.defineProperty(Array.prototype, 'includes', {
//     value: function(searchElement, fromIndex) {

//       if (this == null) {
//         throw new TypeError('"this" is null or not defined');
//       }

//       // 1. Let O be ? ToObject(this value).
//       var o = Object(this);

//       // 2. Let len be ? ToLength(? Get(O, "length")).
//       var len = o.length >>> 0;

//       // 3. If len is 0, return false.
//       if (len === 0) {
//         return false;
//       }

//       // 4. Let n be ? ToInteger(fromIndex).
//       //    (If fromIndex is undefined, this step produces the value 0.)
//       var n = fromIndex | 0;

//       // 5. If n ≥ 0, then
//       //  a. Let k be n.
//       // 6. Else n < 0,
//       //  a. Let k be len + n.
//       //  b. If k < 0, let k be 0.
//       var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

//       function sameValueZero(x, y) {
//         return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
//       }

//       // 7. Repeat, while k < len
//       while (k < len) {
//         // a. Let elementK be the result of ? Get(O, ! ToString(k)).
//         // b. If SameValueZero(searchElement, elementK) is true, return true.
//         if (sameValueZero(o[k], searchElement)) {
//           return true;
//         }
//         // c. Increase k by 1. 
//         k++;
//       }

//       // 8. Return false
//       return false;
//     }
//   });
// }
// }catch(e){
//   console.log(e.message)
// }
// // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
// (function (arr) {
//   arr.forEach(function (item) {
//     if (item.hasOwnProperty('append')) {
//       return;
//     }
//     Object.defineProperty(item, 'append', {
//       configurable: true,
//       enumerable: true,
//       writable: true,
//       value: function append() {
//         var argArr = Array.prototype.slice.call(arguments),
//           docFrag = document.createDocumentFragment();
        
//         argArr.forEach(function (argItem) {
//           var isNode = argItem instanceof Node;
//           docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
//         });
        
//         this.appendChild(docFrag);
//       }
//     });
//   });
// })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
// (function() {
//   if (!Event.prototype.preventDefault) {
//     Event.prototype.preventDefault=function() {
//       this.returnValue=false;
//     };
//   }
//   if (!Event.prototype.stopPropagation) {
//     Event.prototype.stopPropagation=function() {
//       this.cancelBubble=true;
//     };
//   }
//   if (!Element.prototype.addEventListener) {
//     var eventListeners=[];
    
//     var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
//       var self=this;
//       var wrapper=function(e) {
//         e.target=e.srcElement;
//         e.currentTarget=self;
//         if (typeof listener.handleEvent != 'undefined') {
//           listener.handleEvent(e);
//         } else {
//           listener.call(self,e);
//         }
//       };
//       if (type=="DOMContentLoaded") {
//         var wrapper2=function(e) {
//           if (document.readyState=="complete") {
//             wrapper(e);
//           }
//         };
//         document.attachEvent("onreadystatechange",wrapper2);
//         eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
//         if (document.readyState=="complete") {
//           var e=new Event();
//           e.srcElement=window;
//           wrapper2(e);
//         }
//       } else {
//         this.attachEvent("on"+type,wrapper);
//         eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
//       }
//     };
//     var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
//       var counter=0;
//       while (counter<eventListeners.length) {
//         var eventListener=eventListeners[counter];
//         if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
//           if (type=="DOMContentLoaded") {
//             this.detachEvent("onreadystatechange",eventListener.wrapper);
//           } else {
//             this.detachEvent("on"+type,eventListener.wrapper);
//           }
//           eventListeners.splice(counter, 1);
//           break;
//         }
//         ++counter;
//       }
//     };
//     Element.prototype.addEventListener=addEventListener;
//     Element.prototype.removeEventListener=removeEventListener;
//     if (HTMLDocument) {
//       HTMLDocument.prototype.addEventListener=addEventListener;
//       HTMLDocument.prototype.removeEventListener=removeEventListener;
//     }
//     if (Window) {
//       Window.prototype.addEventListener=addEventListener;
//       Window.prototype.removeEventListener=removeEventListener;
//     }
//   }
// })();
// // Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
// ;(function() {
//   // helpers
//   var regExp = function(name) {
//       return new RegExp('(^| )'+ name +'( |$)');
//   };
//   var forEach = function(list, fn, scope) {
//       for (var i = 0; i < list.length; i++) {
//           fn.call(scope, list[i]);
//       }
//   };

//   // class list object with basic methods
//   function ClassList(element) {
//       this.element = element;
//   }

//   ClassList.prototype = {
//       add: function() {
//           forEach(arguments, function(name) {
//               if (!this.contains(name)) {
//                   this.element.className += this.element.className.length > 0 ? ' ' + name : name;
//               }
//           }, this);
//       },
//       remove: function() {
//           forEach(arguments, function(name) {
//               this.element.className =
//                   this.element.className.replace(regExp(name), '');
//           }, this);
//       },
//       toggle: function(name) {
//           return this.contains(name) 
//               ? (this.remove(name), false) : (this.add(name), true);
//       },
//       contains: function(name) {
//           return regExp(name).test(this.element.className);
//       },
//       // bonus..
//       replace: function(oldName, newName) {
//           this.remove(oldName), this.add(newName);
//       }
//   };

//   // IE8/9, Safari
//   if (!('classList' in Element.prototype)) {
//       Object.defineProperty(Element.prototype, 'classList', {
//           get: function() {
//               return new ClassList(this);
//           }
//       });
//   }

//   // replace() support for others
//   if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
//       DOMTokenList.prototype.replace = ClassList.prototype.replace;
//   }
// })();
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  function shoppingBoxFunc() {
    var productTab = document.getElementById('productTab');
    var mallTab = document.getElementById('mallTab');
    var menTab = document.getElementById('menTab');
    var productContent = document.getElementById('productShopContent');
    var productBanner = document.getElementById('productShopBanner');
    var MallContent = document.getElementById('shopMallContent');
    var MallBanner = document.getElementById('shopMallBanner');
    var MENConent = document.getElementById('MENConent');
    var MENBanner = document.getElementById('MENBanner');
    var tabBox = document.getElementById('tabBox');
    var mainTab = document.getElementsByClassName('mainTab');
    var allMenu = document.getElementsByClassName('allMenu');

    //shop top tab
    tabBox.addEventListener('click', function (e) {
      for (var i = 0; i < mainTab.length; i++) {
        mainTab[i].classList.remove('shop_active');
      }
      if (e.target.tagName == 'A') e.target.classList.add('shop_active');
    });

    productTab.addEventListener('click', function (e) {
      tabChange(e);
    });
    mallTab.addEventListener('click', function (e) {
      tabChange(e);
    });
    menTab.addEventListener('click', function (e) {
      tabChange(e);
    });

    function tabChange(e) {
      e.preventDefault();

      if (e.target.id === 'productTab') {

        productContent.classList.add('tabActive');
        productBanner.classList.add('tabActive');

        MENConent.classList.remove('tabActive');
        MENBanner.classList.remove('tabActive');

        MallContent.classList.remove('tabActive');
        MallBanner.classList.remove('tabActive');
      } else if (e.target.id === 'mallTab') {

        MallContent.classList.add('tabActive');
        MallBanner.classList.add('tabActive');

        MENConent.classList.remove('tabActive');
        MENBanner.classList.remove('tabActive');

        productContent.classList.remove('tabActive');
        productBanner.classList.remove('tabActive');
      } else if (e.target.id === 'menTab') {

        MENConent.classList.add('tabActive');
        MENBanner.classList.add('tabActive');

        MallContent.classList.remove('tabActive');
        MallBanner.classList.remove('tabActive');

        productContent.classList.remove('tabActive');
        productBanner.classList.remove('tabActive');
      }
      return;
    }

    // product func
    function productFunc() {
      //shop_banner_item
      var shopBannerList = [{
        title: '잇수다 LAB ',
        content: '여름신상데일리룩',
        green: ' 1+1＆무료배송',
        color: '1',
        url: 'https://www.naver.com1'
      }, {
        title: '인유어핏 ',
        content: '장마 땐 레인플랫 ',
        green: ' 최대 40%할인',
        color: '1',
        url: 'https://www.naver.com2'
      }, {
        title: '골드리프 ',
        content: '세련된 썸머룩 톡톡5% 추가할인!',
        url: 'https://www.naver.com3'
      }, {
        title: '다닝AA ',
        content: '여름신상모자',
        green: ' 최대 40%할인',
        color: "2",
        url: 'https://www.naver.com4'
      }, {
        title: '차차룰루 ',
        content: '페미닌룩 모음전',
        green: ' 전상품 무료배송!',
        color: '1',
        url: 'https://www.naver.com5'
      }, {
        title: '프리스카제이',
        content: '14K 여자 발찌 후기 370개 인증',
        url: 'https://www.naver.com6'
      }, {
        title: 'vichi',
        content: '소장가치 비치',
        green: ' 바캉스준비는비치',
        color: '2',
        url: 'https://www.naver.com7'
      }, {
        title: '메이드인109',
        content: '여름 후드 집업 톡톡친구 15%할인',
        url: 'https://www.naver.com8'
      }, {
        title: '메이퍼플',
        content: '여름신상 전품목',
        url: 'https://www.naver.com9'
      }, {
        title: '땡스메리',
        content: '장마 땐 레인플랫 최대 40% 할인',
        green: ' 당일+무료배송',
        color: '1',
        url: 'https://www.naver.com10'
      }, {
        title: '유니콩',
        content: '키작녀 데일리룩',
        green: ' 150~159cm ',
        color: '1',
        url: 'https://www.naver.com11'
      }, {
        title: '세냥이',
        content: '핸드메이드귀걸이 특가 세일!',
        url: 'https://www.naver.com12'
      }, {
        title: '경기행복샵',
        content: '경기테크노파크와 중소기업착한소비',
        url: 'https://www.naver.com13'
      }, {
        title: '레어템옴므',
        content: '여름신상전품목 무료배송 행사중',
        url: 'https://www.naver.com14'
      }, {
        title: '노블리카',
        content: '여름신상밀짚모자 40% 할인!',
        url: 'https://www.naver.com15'
      }, {
        title: '서울샵',
        content: '중소기업 우수',
        green: ' 리빙삼품 모음전',
        color: '1',
        url: 'https://www.naver.com16'
      }, {
        title: '데이러브',
        content: '지금부터여름내내',
        green: ' 신상샌들 SALE',
        color: '2',
        url: 'https://www.naver.com17'
      }, {
        title: '러블리아미에',
        content: '데일리룩 휴가룩 1벌사도 무료배송',
        url: 'https://www.naver.com18'
      }, {
        title: '다채몰',
        content: '소상공인과 함께 경제적인 아이템',
        url: 'https://www.naver.com19'
      }, {
        title: '피그민트',
        content: '세원한리넨아이템',
        green: ' 기획전 세일 ',
        color: '2',
        url: 'https://www.naver.com20'
      }, {
        title: '프라스카제이',
        content: '14K 여자 발찌 후기 370개 인증',
        url: 'https://www.naver.com21'
      }, {
        title: '키올',
        content: '후기가 인정하는 ',
        green: ' 레터링모던컬러티',
        color: '1',
        url: 'https://www.naver.com22'
      }, {
        title: '로웰',
        content: '1+1 여름롱스커트',
        green: ' 최대50%할인',
        color: '1',
        url: 'https://www.naver.com23'
      }, {
        title: '에어라운드',
        content: '여름엔 커플발찌 무료배송',
        url: 'https://www.naver.com24'
      }, {
        title: '킬링파트',
        content: '롱레이어드반팔티 최대 20% 할인',
        url: 'https://www.naver.com25'
      }];
      var shopRefreshBt = document.getElementById('shopRefreshBt');
      var shopBannerli = document.getElementsByClassName('shop_banner_li');

      //data produce
      var shopDataFuc = function shopDataFuc() {
        var cnt = 0;
        var numCheck = [];
        var resData = [];

        while (true) {
          var ranNum = Math.floor(Math.random() * shopBannerList.length);
          if (cnt == 0) {
            numCheck[0] = ranNum;
            resData[0] = shopBannerList[ranNum];
            cnt++;
          } else {
            if (!numCheck.includes(ranNum)) {
              numCheck[cnt] = ranNum;
              resData[cnt] = shopBannerList[ranNum];
              cnt++;
            }
          }
          if (cnt == 7) break;
        }

        //view produce
        for (var sh_cnt = 0; sh_cnt < shopBannerli.length; sh_cnt++) {
          shopBannerli[sh_cnt].innerHTML = '';
          var aTag = document.createElement('a');
          aTag.href = resData[sh_cnt].url;

          var title = document.createElement('span');
          title.textContent = resData[sh_cnt].title;
          title.classList.add('ft-pp');
          title.classList.add('bn-title');

          var shopContent = document.createElement('span');
          shopContent.textContent = resData[sh_cnt].content;

          aTag.appendChild(title);
          aTag.appendChild(shopContent);
          shopBannerli[sh_cnt].append(aTag);

          if (resData[sh_cnt].color == '2') shopContent.classList.add('ft-gr');

          if (resData[sh_cnt].green) {
            var green = document.createElement('span');
            green.textContent = resData[sh_cnt].green;
            if (resData[sh_cnt].color == '1') green.classList.add('ft-gr');

            shopBannerli[sh_cnt].lastElementChild.append(green);
          }
        }
        return;
      };
      shopDataFuc();

      shopRefreshBt.addEventListener('click', function (e) {
        e.preventDefault();
        shopDataFuc();
      });

      // shop Content Prev Next
      var shopContentList = [{
        shopContentList: [{
          img: '../img/shoppingBox/sh1.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com1'
        }, {
          img: '../img/shoppingBox/sh2.jpg',
          text1: '감각적 디자인',
          text2: '다들~뒤돌아봐',
          url: 'https://www.naver.com2'
        }, {
          img: '../img/shoppingBox/sh3.jpg',
          text1: '휘게 전상품',
          text2: '20%특가할인!',
          url: 'https://www.naver.com3'
        }, {
          img: '../img/shoppingBox/sh4.jpg',
          text1: '이게뭐길래~',
          text2: '쿨링감폭발해?',
          url: 'https://www.naver.com4'
        }, {
          img: '../img/shoppingBox/sh5.jpg',
          text1: '고급스러운~',
          text2: '명품스타일~',
          url: 'https://www.naver.com5'
        }, {
          img: '../img/shoppingBox/sh6.jpg',
          text1: '모두들 극찬해',
          text2: '인생 생리대',
          url: 'https://www.naver.com6'
        }, {
          img: '../img/shoppingBox/sh7.jpg',
          text1: '시원하게~',
          text2: '피로를 싺~',
          url: 'https://www.naver.com7'
        }, {
          img: '../img/shoppingBox/sh8.jpg',
          text1: '퀄리티~좋아요',
          text2: '전상품 5%',
          url: 'https://www.naver.com8'
        }, {
          img: '../img/shoppingBox/sh9.jpg',
          text1: '볼륨감원해?',
          text2: '나를 입어봐~',
          url: 'https://www.naver.com9'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh10.jpg',
          text1: '대체불가 핏감',
          text2: '후회없는 선택',
          url: 'https://www.naver.com10'
        }, {
          img: '../img/shoppingBox/sh11.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com11'
        }, {
          img: '../img/shoppingBox/sh12.jpg',
          text1: '차원이다르죠?',
          text2: '안사면 후회해',
          url: 'https://www.naver.com12'
        }, {
          img: '../img/shoppingBox/sh13.jpg',
          text1: '허기진 밤을',
          text2: '달래줄 98kcal',
          url: 'https://www.naver.com13'
        }, {
          img: '../img/shoppingBox/sh14.jpg',
          text1: '원단좋고 시원',
          text2: '브랜드 그이상',
          url: 'https://www.naver.com14'
        }, {
          img: '../img/shoppingBox/sh15.jpg',
          text1: 'ALL SALE',
          text2: '지금이 기회!',
          url: 'https://www.naver.com15'
        }, {
          img: '../img/shoppingBox/sh16.jpg',
          text1: '농심라면 특가',
          text2: '오늘만이가격!',
          url: 'https://www.naver.com16'
        }, {
          img: '../img/shoppingBox/sh17.jpg',
          text1: '세련미 폭발!',
          text2: '여름이 더예뻐',
          url: 'https://www.naver.com17'
        }, {
          img: '../img/shoppingBox/sh18.jpg',
          text1: '헉! 색소침착',
          text2: '100%환불가능',
          url: 'https://www.naver.com18'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh19.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com19'
        }, {
          img: '../img/shoppingBox/sh20.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com20'
        }, {
          img: '../img/shoppingBox/sh21.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com21'
        }, {
          img: '../img/shoppingBox/sh22.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com22'
        }, {
          img: '../img/shoppingBox/sh23.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com23'
        }, {
          img: '../img/shoppingBox/sh24.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com24'
        }, {
          img: '../img/shoppingBox/sh25.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com25'
        }, {
          img: '../img/shoppingBox/sh26.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com26'
        }, {
          img: '../img/shoppingBox/sh27.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com27'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh28.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com28'
        }, {
          img: '../img/shoppingBox/sh29.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com29'
        }, {
          img: '../img/shoppingBox/sh30.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com30'
        }, {
          img: '../img/shoppingBox/sh31.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com31'
        }, {
          img: '../img/shoppingBox/sh32.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com32'
        }, {
          img: '../img/shoppingBox/sh33.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com33'
        }, {
          img: '../img/shoppingBox/sh34.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com34'
        }, {
          img: '../img/shoppingBox/sh35.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com35'
        }, {
          img: '../img/shoppingBox/sh36.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com36'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh1.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com1'
        }, {
          img: '../img/shoppingBox/sh2.jpg',
          text1: '감각적 디자인',
          text2: '다들~뒤돌아봐',
          url: 'https://www.naver.com2'
        }, {
          img: '../img/shoppingBox/sh3.jpg',
          text1: '휘게 전상품',
          text2: '20%특가할인!',
          url: 'https://www.naver.com3'
        }, {
          img: '../img/shoppingBox/sh4.jpg',
          text1: '이게뭐길래~',
          text2: '쿨링감폭발해?',
          url: 'https://www.naver.com4'
        }, {
          img: '../img/shoppingBox/sh5.jpg',
          text1: '고급스러운~',
          text2: '명품스타일~',
          url: 'https://www.naver.com5'
        }, {
          img: '../img/shoppingBox/sh6.jpg',
          text1: '모두들 극찬해',
          text2: '인생 생리대',
          url: 'https://www.naver.com6'
        }, {
          img: '../img/shoppingBox/sh7.jpg',
          text1: '시원하게~',
          text2: '피로를 싺~',
          url: 'https://www.naver.com7'
        }, {
          img: '../img/shoppingBox/sh8.jpg',
          text1: '퀄리티~좋아요',
          text2: '전상품 5%',
          url: 'https://www.naver.com8'
        }, {
          img: '../img/shoppingBox/sh9.jpg',
          text1: '볼륨감원해?',
          text2: '나를 입어봐~',
          url: 'https://www.naver.com9'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh10.jpg',
          text1: '대체불가 핏감',
          text2: '후회없는 선택',
          url: 'https://www.naver.com10'
        }, {
          img: '../img/shoppingBox/sh11.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com11'
        }, {
          img: '../img/shoppingBox/sh12.jpg',
          text1: '차원이다르죠?',
          text2: '안사면 후회해',
          url: 'https://www.naver.com12'
        }, {
          img: '../img/shoppingBox/sh13.jpg',
          text1: '허기진 밤을',
          text2: '달래줄 98kcal',
          url: 'https://www.naver.com13'
        }, {
          img: '../img/shoppingBox/sh14.jpg',
          text1: '원단좋고 시원',
          text2: '브랜드 그이상',
          url: 'https://www.naver.com14'
        }, {
          img: '../img/shoppingBox/sh15.jpg',
          text1: 'ALL SALE',
          text2: '지금이 기회!',
          url: 'https://www.naver.com15'
        }, {
          img: '../img/shoppingBox/sh16.jpg',
          text1: '농심라면 특가',
          text2: '오늘만이가격!',
          url: 'https://www.naver.com16'
        }, {
          img: '../img/shoppingBox/sh17.jpg',
          text1: '세련미 폭발!',
          text2: '여름이 더예뻐',
          url: 'https://www.naver.com17'
        }, {
          img: '../img/shoppingBox/sh18.jpg',
          text1: '헉! 색소침착',
          text2: '100%환불가능',
          url: 'https://www.naver.com18'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh19.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com19'
        }, {
          img: '../img/shoppingBox/sh20.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com20'
        }, {
          img: '../img/shoppingBox/sh21.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com21'
        }, {
          img: '../img/shoppingBox/sh22.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com22'
        }, {
          img: '../img/shoppingBox/sh23.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com23'
        }, {
          img: '../img/shoppingBox/sh24.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com24'
        }, {
          img: '../img/shoppingBox/sh25.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com25'
        }, {
          img: '../img/shoppingBox/sh26.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com26'
        }, {
          img: '../img/shoppingBox/sh27.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com27'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh28.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com28'
        }, {
          img: '../img/shoppingBox/sh29.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com29'
        }, {
          img: '../img/shoppingBox/sh30.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com30'
        }, {
          img: '../img/shoppingBox/sh31.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com31'
        }, {
          img: '../img/shoppingBox/sh32.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com32'
        }, {
          img: '../img/shoppingBox/sh33.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com33'
        }, {
          img: '../img/shoppingBox/sh34.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com34'
        }, {
          img: '../img/shoppingBox/sh35.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com35'
        }, {
          img: '../img/shoppingBox/sh36.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com36'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh1.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com1'
        }, {
          img: '../img/shoppingBox/sh2.jpg',
          text1: '감각적 디자인',
          text2: '다들~뒤돌아봐',
          url: 'https://www.naver.com2'
        }, {
          img: '../img/shoppingBox/sh3.jpg',
          text1: '휘게 전상품',
          text2: '20%특가할인!',
          url: 'https://www.naver.com3'
        }, {
          img: '../img/shoppingBox/sh4.jpg',
          text1: '이게뭐길래~',
          text2: '쿨링감폭발해?',
          url: 'https://www.naver.com4'
        }, {
          img: '../img/shoppingBox/sh5.jpg',
          text1: '고급스러운~',
          text2: '명품스타일~',
          url: 'https://www.naver.com5'
        }, {
          img: '../img/shoppingBox/sh6.jpg',
          text1: '모두들 극찬해',
          text2: '인생 생리대',
          url: 'https://www.naver.com6'
        }, {
          img: '../img/shoppingBox/sh7.jpg',
          text1: '시원하게~',
          text2: '피로를 싺~',
          url: 'https://www.naver.com7'
        }, {
          img: '../img/shoppingBox/sh8.jpg',
          text1: '퀄리티~좋아요',
          text2: '전상품 5%',
          url: 'https://www.naver.com8'
        }, {
          img: '../img/shoppingBox/sh9.jpg',
          text1: '볼륨감원해?',
          text2: '나를 입어봐~',
          url: 'https://www.naver.com9'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh10.jpg',
          text1: '대체불가 핏감',
          text2: '후회없는 선택',
          url: 'https://www.naver.com10'
        }, {
          img: '../img/shoppingBox/sh11.jpg',
          text1: '올리자마자~',
          text2: '인기폭발신상',
          url: 'https://www.naver.com11'
        }, {
          img: '../img/shoppingBox/sh12.jpg',
          text1: '차원이다르죠?',
          text2: '안사면 후회해',
          url: 'https://www.naver.com12'
        }, {
          img: '../img/shoppingBox/sh13.jpg',
          text1: '허기진 밤을',
          text2: '달래줄 98kcal',
          url: 'https://www.naver.com13'
        }, {
          img: '../img/shoppingBox/sh14.jpg',
          text1: '원단좋고 시원',
          text2: '브랜드 그이상',
          url: 'https://www.naver.com14'
        }, {
          img: '../img/shoppingBox/sh15.jpg',
          text1: 'ALL SALE',
          text2: '지금이 기회!',
          url: 'https://www.naver.com15'
        }, {
          img: '../img/shoppingBox/sh16.jpg',
          text1: '농심라면 특가',
          text2: '오늘만이가격!',
          url: 'https://www.naver.com16'
        }, {
          img: '../img/shoppingBox/sh17.jpg',
          text1: '세련미 폭발!',
          text2: '여름이 더예뻐',
          url: 'https://www.naver.com17'
        }, {
          img: '../img/shoppingBox/sh18.jpg',
          text1: '헉! 색소침착',
          text2: '100%환불가능',
          url: 'https://www.naver.com18'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh19.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com19'
        }, {
          img: '../img/shoppingBox/sh20.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com20'
        }, {
          img: '../img/shoppingBox/sh21.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com21'
        }, {
          img: '../img/shoppingBox/sh22.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com22'
        }, {
          img: '../img/shoppingBox/sh23.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com23'
        }, {
          img: '../img/shoppingBox/sh24.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com24'
        }, {
          img: '../img/shoppingBox/sh25.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com25'
        }, {
          img: '../img/shoppingBox/sh26.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com26'
        }, {
          img: '../img/shoppingBox/sh27.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com27'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh28.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com28'
        }, {
          img: '../img/shoppingBox/sh29.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com29'
        }, {
          img: '../img/shoppingBox/sh30.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com30'
        }, {
          img: '../img/shoppingBox/sh31.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com31'
        }, {
          img: '../img/shoppingBox/sh32.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com32'
        }, {
          img: '../img/shoppingBox/sh33.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com33'
        }, {
          img: '../img/shoppingBox/sh34.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com34'
        }, {
          img: '../img/shoppingBox/sh35.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com35'
        }, {
          img: '../img/shoppingBox/sh36.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com36'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh19.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com19'
        }, {
          img: '../img/shoppingBox/sh20.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com20'
        }, {
          img: '../img/shoppingBox/sh21.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com21'
        }, {
          img: '../img/shoppingBox/sh22.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com22'
        }, {
          img: '../img/shoppingBox/sh23.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com23'
        }, {
          img: '../img/shoppingBox/sh24.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com24'
        }, {
          img: '../img/shoppingBox/sh25.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com25'
        }, {
          img: '../img/shoppingBox/sh26.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com26'
        }, {
          img: '../img/shoppingBox/sh27.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com27'
        }]
      }, {
        shopContentList: [{
          img: '../img/shoppingBox/sh28.jpg',
          text1: '필드위의 여신',
          text2: '반응완전 최고',
          url: 'https://www.naver.com28'
        }, {
          img: '../img/shoppingBox/sh29.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com29'
        }, {
          img: '../img/shoppingBox/sh30.jpg',
          text1: '헬로월드',
          text2: '헬로월드',
          url: 'https://www.naver.com30'
        }, {
          img: '../img/shoppingBox/sh31.jpg',
          text1: '모공축소 세럼',
          text2: '40% 한정특가!',
          url: 'https://www.naver.com31'
        }, {
          img: '../img/shoppingBox/sh32.jpg',
          text1: '지금이 기회~!',
          text2: 'EVENT SALE~!',
          url: 'https://www.naver.com32'
        }, {
          img: '../img/shoppingBox/sh33.jpg',
          text1: '썸머세트인기',
          text2: '고민없이예뻐',
          url: 'https://www.naver.com33'
        }, {
          img: '../img/shoppingBox/sh34.jpg',
          text1: '쓰임 총결산',
          text2: '최대 56%↓',
          url: 'https://www.naver.com34'
        }, {
          img: '../img/shoppingBox/sh35.jpg',
          text1: '센스있는 코디',
          text2: '자신감 급상승',
          url: 'https://www.naver.com35'
        }, {
          img: '../img/shoppingBox/sh36.jpg',
          text1: '침구심야특가!',
          text2: '지금이 기회~',
          url: 'https://www.naver.com36'
        }]
      }];

      var shopPaging = document.getElementById('shopPaging');
      var shopPrev = document.getElementById('shopPrev');
      var shopNext = document.getElementById('shopNext');
      var shopContentItem = document.getElementsByClassName('shop_content_item');

      var shopPrevNextBt = document.getElementsByClassName('shopContentArrow');
      var pageMount = document.getElementById('pageMount');
      var pageingNum = 1;

      var shopCtBtData = 0;
      var resData = [];

      var shopContentFuc = function shopContentFuc(e) {
        var dataModule = [];

        for (var cnt = 0; cnt < shopContentList[pageingNum - 1].shopContentList.length; cnt++) {
          dataModule.push(shopContentList[pageingNum - 1].shopContentList[cnt]);
        }

        for (var ci = 0; ci < 9; ci++) {
          shopContentItem[ci].innerHTML = '';
          var url = document.createElement('a');
          url.href = dataModule[ci].url;

          var div = document.createElement('div');
          div.classList.add('shop_mw');

          var imgTag = document.createElement('img');
          imgTag.src = dataModule[ci].img;

          var p = document.createElement('p');
          p.classList.add('shop_content_tx');

          var span1 = document.createElement('span');
          var span2 = document.createElement('span');
          span1.innerHTML = dataModule[ci].text1;
          span2.innerHTML = dataModule[ci].text2;

          p.append(span1);
          p.append(span2);

          div.append(imgTag);
          url.append(div);
          url.append(p);

          shopContentItem[ci].appendChild(url);
        }
      };
      shopContentFuc();

      pageMount.textContent = '/' + shopContentList.length;

      for (var i = 0; i < shopPrevNextBt.length; i++) {
        shopPrevNextBt[i].addEventListener('click', function (e) {
          e.preventDefault();
          if (e.target.id === 'shopPrev') {
            pageingNum < 2 ? pageingNum = shopContentList.length : pageingNum--;
          } else {
            pageingNum > shopContentList.length - 1 ? pageingNum = 1 : pageingNum++;
          }
          shopPaging.innerHTML = pageingNum;
          shopContentFuc(e.target.id);
        });
      }
      //product
      return;
    }
    productFunc();

    // MENS func
    // banner
    var MENRefreshBt = document.getElementById('MENRefreshBt');
    var MENBannerListBox = document.getElementById('MENBannerListBox');
    var MENArrowBt = document.getElementById('MENArrowBt');
    var MENCurrentPaging = document.getElementById('MENCurrentPaging');
    var MENPagingMount = document.getElementById('MENPagingMount');
    var MENData = [];

    function MENMallFunc() {
      //MENContent
      var MENContentList = [{
        MENContentList: [{
          img: '../img/MENContentList/sh1.jpg',
          text1: '자꾸 배나와?',
          text2: '입기만하면쏚~',
          url: 'https://www.naver.com1',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh2.jpg',
          text1: '한달 34,800원',
          text2: '남자들이 더찾아',
          url: 'https://www.naver.com2',
          title: '얼굴 보호대'
        }, {
          img: '../img/MENContentList/sh3.jpg',
          text1: '손목에 웬 펌프?',
          text2: '공기주입식 깁스',
          url: 'https://www.naver.com3',
          title: '시원한 린넨셔츠'
        }, {
          img: '../img/MENContentList/sh4.jpg',
          text1: '자고난뒤 피곤?',
          text2: '왜 진작 몰랐지?',
          url: 'https://www.naver.com4',
          title: '피로 회복제'
        }, {
          img: '../img/MENContentList/sh5.jpg',
          text1: '긴팔이더시원해!',
          text2: '추성훈티5,900원',
          url: 'https://www.naver.com5',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh6.jpg',
          text1: '1만원대 진짜?',
          text2: '프리미엄 칼라티',
          url: 'https://www.naver.com6',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh7.jpg',
          text1: '입냄새 잇몸질환',
          text2: '이거 하나면 끝!',
          url: 'https://www.naver.com7',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh8.jpg',
          text1: '풀커버 강화유리',
          text2: '이 가격 실화?!',
          url: 'https://www.naver.com8',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh9.jpg',
          text1: '비싸서 못샀던거',
          text2: '웹일로 이가격?!',
          url: 'https://www.naver.com9',
          title: '손목 보호대'
        }]
      }, {
        MENContentList: [{
          img: '../img/MENContentList/sh10.jpg',
          text1: '와 진짜!',
          text2: '향수?필요없네~',
          url: 'https://www.naver.com10',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh11.jpg',
          text1: '피곤한 남자들',
          text2: '붙여봐 해결돼~',
          url: 'https://www.naver.com11',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh12.jpg',
          text1: '헉! 3만원대라니',
          text2: '없어서 못샀던거',
          url: 'https://www.naver.com12',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh13.jpg',
          text1: '엘칸토 리퍼브',
          text2: '39,600원~',
          url: 'https://www.naver.com13',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh14.jpg',
          text1: '제발',
          text2: '잠 좀풀자고싶어',
          url: 'https://www.naver.com14',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh15.jpg',
          text1: '여름이니까~',
          text2: '드라이기능성티!',
          url: 'https://www.naver.com15',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh16.jpg',
          text1: '3in1 구스다운',
          text2: '회원 93%할인',
          url: 'https://www.naver.com16',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh17.jpg',
          text1: '자동차 스크래치',
          text2: '제거 타올 등장!',
          url: 'https://www.naver.com17',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh18.jpg',
          text1: '시원한 착용감',
          text2: '데일리 리넨셔츠',
          url: 'https://www.naver.com18',
          title: '손목 보호대'
        }]
      }, {
        MENContentList: [{
          img: '../img/MENContentList/sh19.jpg',
          text1: '눕자마자 기절!',
          text2: '나에게 딱 맞춰!',
          url: 'https://www.naver.com19',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh20.jpg',
          text1: '엄마 나 키컸어!',
          text2: '5cm 인생역전',
          url: 'https://www.naver.com20',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh21.jpg',
          text1: '단 일주일 1+1',
          text2: '슬랙스 3만원대!',
          url: 'https://www.naver.com21',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh22.jpg',
          text1: '미운티아 여름',
          text2: '의류창고개방!',
          url: 'https://www.naver.com22',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh23.jpg',
          text1: '이가격에 나올',
          text2: '신발이 아닌ㄴ데',
          url: 'https://www.naver.com23',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh24.jpg',
          text1: '아무리 더워도',
          text2: '스타일 포기못해!',
          url: 'https://www.naver.com24',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh25.jpg',
          text1: '요즘 이거없는',
          text2: '사람이 어딨어',
          url: 'https://www.naver.com25',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh26.jpg',
          text1: '호랑이 기운?',
          text2: '진짜부럽지않네~',
          url: 'https://www.naver.com26',
          title: '손목 보호대'
        }, {
          img: '../img/MENContentList/sh27.jpg',
          text1: '비싸서 못샀던거',
          text2: '드디어~한국상륙',
          url: 'https://www.naver.com27',
          title: '손목 보호대'
        }]
      }];
      var MENContentPagingNum = 0;
      var MENContentBox = document.getElementById('MENContentBox');

      MENPagingMount.innerHTML = '/' + MENContentList.length;
      MENArrowBt.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName == 'A') {
          if (e.target.className == 'shop_prev') {
            MENContentPagingNum < 1 ? MENContentPagingNum = MENContentList.length - 1 : MENContentPagingNum--;
          } else if (e.target.className == 'shop_next') {
            MENContentPagingNum >= MENContentList.length - 1 ? MENContentPagingNum = 0 : MENContentPagingNum++;
          }
        }
        MENCurrentPaging.innerHTML = MENContentPagingNum + 1;
        MENContentFunc();
      });

      function MENContentFunc() {
        MENContentBox.innerHTML = '';
        var ul = document.createElement('ul');
        ul.classList.add('contents_mens_ul');
        for (var i = 0; i < 9; i++) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          var div = document.createElement('div');
          var img = document.createElement('img');

          var p = document.createElement('p');
          var span1 = document.createElement('span');
          var span2 = document.createElement('span');

          li.classList.add('mens_content_list');
          a.href = MENContentList[MENContentPagingNum].MENContentList[i].url;

          div.classList.add('ms_md');
          img.src = MENContentList[MENContentPagingNum].MENContentList[i].img;
          img.alt = MENContentList[MENContentPagingNum].MENContentList[i].title;

          p.classList.add('mens_tx');
          span1.classList.add('mens_content_span');
          span2.classList.add('mens_content_span');
          span1.innerHTML = MENContentList[MENContentPagingNum].MENContentList[i].text1;
          span2.innerHTML = MENContentList[MENContentPagingNum].MENContentList[i].text2;

          p.appendChild(span1);
          p.appendChild(span2);
          div.appendChild(img);
          a.appendChild(div);
          a.appendChild(p);

          li.appendChild(a);
          ul.appendChild(li);
        }
        MENContentBox.appendChild(ul);
      }
      MENContentFunc();

      //MENBanner
      var MENBannerList = [{
        url: 'https:www.google.com1',
        src: '../img/MENSBanner/mb1.jpg',
        title: 'USB충전기',
        text1: '이렇게간편할수가',
        text2: '컴팩트하게USB 충전',
        text3: '더액션'
      }, {
        url: 'https:www.google.com2',
        src: '../img/MENSBanner/mb2.jpg',
        title: '머리고정젤',
        text1: '땀범벅~머리고정',
        text2: '특가 2+1 진행중',
        text3: '엠도씨'
      }, {
        url: 'https:www.google.com3',
        src: '../img/MENSBanner/mb3.jpg',
        title: '휴대폰 게임기',
        text1: '반응 장난아니야~',
        text2: '못사서 안달났어~',
        text3: '폰뿌'
      }, {
        url: 'https:www.google.com4',
        src: '../img/MENSBanner/mb4.jpg',
        title: '구스다운방풍',
        text1: '방수방풍기능 3in1',
        text2: '구스다운 93%',
        text3: '슈나이더 스포츠'
      }, {
        url: 'https:www.google.com5',
        src: '../img/MENSBanner/mb5.jpg',
        title: '무선이어폰',
        text1: '터치 볼륨컨트롤',
        text2: '무선이어폰 입고',
        text3: '펀픽'
      }, {
        url: 'https:www.google.com6',
        src: '../img/MENSBanner/mb6.jpg',
        title: '가로모드 폰거치대',
        text1: '운전자를위한 정면',
        text2: '가로모드 폰거치대',
        text3: '비비드망고'
      }, {
        url: 'https:www.google.com7',
        src: '../img/MENSBanner/mb7.jpg',
        title: '고음질! 이어폰',
        text1: '최대 15시간 사용',
        text2: '고음질 무선이어폰',
        text3: '앱스토리몰'
      }, {
        url: 'https:www.google.com8',
        src: '../img/MENSBanner/mb8.jpg',
        title: '액션캡짱',
        text1: '5만원대',
        text2: '가성비 액션캡',
        text3: '앱스토리몰'
      }, {
        url: 'https:www.google.com9',
        src: '../img/MENSBanner/mb9.jpg',
        title: '빠른 움직임',
        text1: '가볍고편한 클로그',
        text2: '언제나 신기 좋아',
        text3: '스포츠다이렉트'
      }, {
        url: 'https:www.google.com10',
        src: '../img/MENSBanner/mb10.jpg',
        title: '언더아머 러닝화',
        text1: '이런게 진짜 특가!',
        text2: '언더아머 러닝화',
        text3: '스포츠다이렉트'
      }, {
        url: 'https:www.google.com11',
        src: '../img/MENSBanner/mb11.jpg',
        title: '그라펜 샴푸',
        text1: '샴푸로 대머리탈출',
        text2: '지금사면 1+1',
        text3: '그라펜'
      }, {
        url: 'https:www.google.com12',
        src: '../img/MENSBanner/mb12.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com13',
        src: '../img/MENSBanner/mb13.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com14',
        src: '../img/MENSBanner/mb14.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com15',
        src: '../img/MENSBanner/mb15.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com16',
        src: '../img/MENSBanner/mb16.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com17',
        src: '../img/MENSBanner/mb17.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }, {
        url: 'https:www.google.com18',
        src: '../img/MENSBanner/mb18.jpg',
        title: '손풍기',
        text1: '이거들면 여자들 다!',
        text2: '시원 시원',
        text3: '선풍기'
      }];

      MENRefreshBt.addEventListener('click', function (e) {
        e.preventDefault();
        MENData = [];
        MENBannerFunc();
      });

      function MENBannerFunc() {
        MENBannerListBox.innerHTML = '';
        var ul = document.createElement('ul');
        for (var cnt = 0; cnt < 3; cnt++) {
          var randomNum = Math.floor(Math.random() * MENBannerList.length);
          if (MENData.includes(randomNum)) {
            cnt = cnt - 1;
            continue;
          } else {
            MENData.push(randomNum);
          }
          var li = document.createElement('il');
          var a = document.createElement('a');
          var img = document.createElement('img');
          var spanParent = document.createElement('span');
          var span1 = document.createElement('span');
          var span2 = document.createElement('span');
          var span3 = document.createElement('span');

          li.classList.add('MEN_banner_list');
          a.classList.add('MENBanner_anch');
          a.href = MENBannerList[randomNum].url;

          img.src = MENBannerList[randomNum].src;
          img.alt = MENBannerList[randomNum].title;
          img.classList.add('MEN_img_float');

          spanParent.classList.add('MEN_banner_txbox');
          span3.classList.add('MEN_color_tx');
          span1.textContent = MENBannerList[randomNum].text1;
          span2.textContent = MENBannerList[randomNum].text2;
          span3.textContent = MENBannerList[randomNum].text3;

          spanParent.appendChild(span1);
          spanParent.appendChild(span2);
          spanParent.appendChild(span3);

          a.appendChild(img);
          a.appendChild(spanParent);
          li.appendChild(a);
          ul.appendChild(li);
        }
        MENBannerListBox.appendChild(ul);
        return;
      }
      MENBannerFunc();
      return;
    }
    MENMallFunc();

    //shopping Mall

    var mallPagingBox = document.getElementById('mallPagingBox');
    var mallCurrentPaging = document.getElementById('mallCurrentPaging');
    var mallContentBox = document.getElementById('mallContentBox');
    var mallContentListLi = document.getElementsByClassName('mall_content_list');
    var mallPagingMount = document.getElementById('mallPagingMount');

    var mallContentList = [{
      mallContentList: [{ //MALL TOP
        title: '립컬러',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/tt1-1.jpg',
        text1: '나만 알고싶은',
        text2: '너무예쁜 립컬러'
      }, {
        title: '홍콩 제니쿠키',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/tt1-2.jpg',
        text1: '줄 서서 먹는',
        text2: '홍콩 제니쿠키'
      }, {
        title: '펄박스',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/tt1-3.jpg',
        text1: '펄 좋아한다고?',
        text2: '주목! 너무예뻐~'
      }, {
        title: '눈썹키트',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/tt1-4.jpg',
        text1: '눈썹 그리지말고',
        text2: '자연스럽게 붙여'
      }, {
        title: '화장품 패킷',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/tt1-5.jpg',
        text1: '귀여워 소장할래',
        text2: '미니제품 포함!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/tt1-6.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL1
        title: '미니선풍기1',
        url: 'https:www.google.com7/malllist1',
        src: '../img/shoppingMallContentList/tt2-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기2',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/tt2-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기3',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/tt2-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL2
        title: '미니선풍기4',
        url: 'https:www.google.com10/malllist1',
        src: '../img/shoppingMallContentList/tt3-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기5',
        url: 'https:www.google.com11',
        src: '../img/shoppingMallContentList/tt3-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기6',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/tt3-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL3
        title: '미니선풍기7',
        url: 'https:www.google.com13/malllist1',
        src: '../img/shoppingMallContentList/tt4-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기8',
        url: 'https:www.google.com14',
        src: '../img/shoppingMallContentList/tt4-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기9',
        url: 'https:www.google.com15',
        src: '../img/shoppingMallContentList/tt4-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }]
    }, {
      mallContentList: [{ //MALL TOP
        title: '미니선풍기',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/tt5-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/tt5-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/tt5-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/tt5-4.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/tt5-5.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/tt5-6.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 1
        title: '미니선풍기',
        url: 'https:www.google.com7/malllist2',
        src: '../img/shoppingMallContentList/tt6-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/tt6-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/tt6-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 2
        title: '미니선풍기',
        url: 'https:www.google.com10/malllist2',
        src: '../img/shoppingMallContentList/tt7-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com11',
        src: '../img/shoppingMallContentList/tt7-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/tt7-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL3
        title: '미니선풍기',
        url: 'https:www.google.com13/malllist2',
        src: '../img/shoppingMallContentList/tt8-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com14',
        src: '../img/shoppingMallContentList/tt8-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com15',
        src: '../img/shoppingMallContentList/tt8-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }]
    }, {
      mallContentList: [{ //MALL TOP
        title: '미니선풍기',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/tt9-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/tt9-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/tt9-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/tt9-4.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/tt9-5.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/tt9-6.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 1
        title: '미니선풍기',
        url: 'https:www.google.com7malllist3',
        src: '../img/shoppingMallContentList/tt10-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/tt10-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/tt10-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 2
        title: '미니선풍기',
        url: 'https:www.google.com10/com7malllist3',
        src: '../img/shoppingMallContentList/tt11-1.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com11/',
        src: '../img/shoppingMallContentList/tt11-2.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/tt11-3.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL3
        title: '미니선풍기',
        url: 'https:www.google.com13/com7malllist3',
        src: '../img/shoppingMallContentList/tt12-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com14',
        src: '../img/shoppingMallContentList/tt12-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com15',
        src: '../img/shoppingMallContentList/tt12-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }]
    }, {
      mallContentList: [{ //MALL TOP
        title: '립컬러',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/tt1-1.jpg',
        text1: '나만 알고싶은',
        text2: '너무예쁜 립컬러'
      }, {
        title: '홍콩 제니쿠키',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/tt1-2.jpg',
        text1: '줄 서서 먹는',
        text2: '홍콩 제니쿠키'
      }, {
        title: '펄박스',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/tt1-3.jpg',
        text1: '펄 좋아한다고?',
        text2: '주목! 너무예뻐~'
      }, {
        title: '눈썹키트',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/tt1-4.jpg',
        text1: '눈썹 그리지말고',
        text2: '자연스럽게 붙여'
      }, {
        title: '화장품 패킷',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/tt1-5.jpg',
        text1: '귀여워 소장할래',
        text2: '미니제품 포함!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/tt1-6.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL1
        title: '미니선풍기1',
        url: 'https:www.google.com7/malllist1',
        src: '../img/shoppingMallContentList/tt2-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기2',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/tt2-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기3',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/tt2-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL2
        title: '미니선풍기4',
        url: 'https:www.google.com10/malllist1',
        src: '../img/shoppingMallContentList/tt3-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기5',
        url: 'https:www.google.com11',
        src: '../img/shoppingMallContentList/tt3-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기6',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/tt3-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL3
        title: '미니선풍기7',
        url: 'https:www.google.com13/malllist1',
        src: '../img/shoppingMallContentList/tt4-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기8',
        url: 'https:www.google.com14',
        src: '../img/shoppingMallContentList/tt4-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기9',
        url: 'https:www.google.com15',
        src: '../img/shoppingMallContentList/tt4-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }]
    }, {
      mallContentList: [{ //MALL TOP
        title: '미니선풍기',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/tt9-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/tt9-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/tt9-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/tt9-4.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/tt9-5.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/tt9-6.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 1
        title: '미니선풍기',
        url: 'https:www.google.com7malllist3',
        src: '../img/shoppingMallContentList/tt10-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/tt10-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/tt10-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL 2
        title: '미니선풍기',
        url: 'https:www.google.com10/com7malllist3',
        src: '../img/shoppingMallContentList/tt11-1.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com11/',
        src: '../img/shoppingMallContentList/tt11-2.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/tt11-3.gif',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, { //MALL3
        title: '미니선풍기',
        url: 'https:www.google.com13/com7malllist3',
        src: '../img/shoppingMallContentList/tt12-1.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com14',
        src: '../img/shoppingMallContentList/tt12-2.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }, {
        title: '미니선풍기',
        url: 'https:www.google.com15',
        src: '../img/shoppingMallContentList/tt12-3.jpg',
        text1: '날개없는 선풍기',
        text2: '풍속짱! 휴대용!'
      }]
    }, {
      mallTextList: [{
        text: '매일 달라지는 상품과 혜택! 오늘의 특가',
        url: 'https:www.godgoogle.com/1'
      }, {
        text: '바쁜 내 남자를 위한 올인원 4종 UP TO 51%',
        url: 'https:www.godgoogle.com/2'
      }, {
        text: '홈데이몰 핫딜로 한방에 OK! 망설이면 후회',
        url: 'https:www.godgoogle.com/3'
      }, {
        text: '매일 달라지는 상품과 혜택! 오늘의 특가',
        url: 'https:www.godgoogle.com/1'
      }, {
        text: '바쁜 내 남자를 위한 올인원 4종 UP TO 51%',
        url: 'https:www.godgoogle.com/2'
      }]
    }, {
      mallTitleList: [{
        title: '올리브영',
        url: 'https:www.google.com1',
        src: '../img/shoppingMallContentList/title/tt1.gif',
        id: 'mall_title1'
      }, {
        title: '퍼플',
        url: 'https:www.google.com2',
        src: '../img/shoppingMallContentList/title/tt2.gif',
        id: 'mall_title2'
      }, {
        title: '한샘몰',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/title/tt8.gif',
        id: 'mall_title8'
      }, {
        title: 'NAIN',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/title/tt9.gif',
        id: 'mall_title9'
      }, {
        title: 'WBSKIN',
        url: 'https:www.google.com3',
        src: '../img/shoppingMallContentList/title/tt3.gif',
        id: 'mall_title3'
      }, {
        title: 'MOMEDAYMALL',
        url: 'https:www.google.com4',
        src: '../img/shoppingMallContentList/title/tt4.gif',
        id: 'mall_title4'
      }, {
        title: 'SINBIANG',
        url: 'https:www.google.com5',
        src: '../img/shoppingMallContentList/title/tt5.gif',
        id: 'mall_title5'
      }, {
        title: '실리쿨',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/title/tt6.gif',
        id: 'mall_title6'
      }, {
        title: '카멜브라운',
        url: 'https:www.google.com7',
        src: '../img/shoppingMallContentList/title/tt7.gif',
        id: 'mall_title7'
      }, {
        title: '한샘몰',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/title/tt8.gif',
        id: 'mall_title8'
      }, {
        title: 'NAIN',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/title/tt9.gif',
        id: 'mall_title9'
      }, {
        title: 'WIZWID',
        url: 'https:www.google.com10',
        src: '../img/shoppingMallContentList/title/tt10.gif',
        id: 'mall_title10'
      }, {
        title: '그녀희제',
        url: 'https:www.google.com11',
        src: '../img/shoppingMallContentList/title/tt11.gif',
        id: 'mall_title11'
      }, {
        title: 'UPDOWN SHOP',
        url: 'https:www.google.com12',
        src: '../img/shoppingMallContentList/title/tt12.gif',
        id: 'mall_title12'
      }, {
        title: '한샘몰',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/title/tt8.gif',
        id: 'mall_title8'
      }, {
        title: 'NAIN',
        url: 'https:www.google.com9',
        src: '../img/shoppingMallContentList/title/tt9.gif',
        id: 'mall_title9'
      }, {
        title: '실리쿨',
        url: 'https:www.google.com6',
        src: '../img/shoppingMallContentList/title/tt6.gif',
        id: 'mall_title6'
      }, {
        title: '카멜브라운',
        url: 'https:www.google.com7',
        src: '../img/shoppingMallContentList/title/tt7.gif',
        id: 'mall_title7'
      }, {
        title: '한샘몰',
        url: 'https:www.google.com8',
        src: '../img/shoppingMallContentList/title/tt8.gif',
        id: 'mall_title8'
      }]
    }];

    var mallPaging = 0;
    mallPagingMount.innerHTML = '/' + (mallContentList.length - 2);
    mallPagingBox.addEventListener('click', function (e) {
      e.preventDefault();
      var mallpageMount = mallContentList.length - 2;
      if (e.target.id == 'mallPrevBt') {
        mallPaging < 1 ? mallPaging = mallpageMount - 1 : mallPaging--;
      } else if (e.target.id == 'mallNextBt') {
        mallPaging >= mallpageMount - 1 ? mallPaging = 0 : mallPaging++;
      }
      mallCurrentPaging.innerHTML = mallPaging + 1;
      mallContentFunc();
      return;
    });

    //mallContentBox
    function mallContentFunc() {
      mallContentBox.innerHTML = '';
      var ul = document.createElement('ul');

      function mallTitleFunc() {
        var div = document.createElement('div');
        var a = document.createElement('a');
        var img = document.createElement('img');
        var spanParent = document.createElement('span');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');

        ul.classList.add('mall_title_ul');
        div.classList.add('mall_title_link');
        img.classList.add('mall_title_img');
        spanParent.classList.add('mall_nowlink_box');

        a.href = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].url;
        img.src = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].src;
        img.alt = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].title;

        span1.classList.add('mall_nowLink');
        span1.innerHTML = '바로가기';
        span2.innerHTML = '＞';

        spanParent.appendChild(span1);
        spanParent.appendChild(span2);

        a.appendChild(img);
        a.appendChild(spanParent);
        div.appendChild(a);
        mallContentBox.appendChild(div);
      }
      mallTitleFunc();

      function mallContentListFunc() {
        for (var cnt = 0; cnt < 6; cnt++) {
          var mallContentData = mallContentList[mallPaging].mallContentList[cnt];
          var listLi = document.createElement('li');
          var listA = document.createElement('a');
          var listImg = document.createElement('img');
          var listSpanParents = document.createElement('span');
          var listSpan1 = document.createElement('span');
          var listSpan2 = document.createElement('span');

          listLi.classList.add('mall_content_list');
          listImg.classList.add('mall_content_img');
          listSpanParents.classList.add('mall_text_box');

          listA.href = mallContentData.url;
          listImg.src = mallContentData.src;
          listImg.alt = mallContentData.title;

          listSpan1.innerHTML = mallContentData.text1;
          listSpan2.innerHTML = mallContentData.text2;

          listSpanParents.appendChild(listSpan1);
          listSpanParents.appendChild(listSpan2);

          listA.appendChild(listImg);
          listA.appendChild(listSpanParents);
          listLi.appendChild(listA);
          ul.appendChild(listLi);
          mallContentBox.appendChild(ul);
        }
      }
      mallContentListFunc();

      //mattBanner
      var shopMallBanner = document.getElementById('shopMallBanner');
      var malllistCnt = 0;

      function mallBannerFunc() {
        shopMallBanner.innerHTML = '';
        //mallTextBanner
        function mallTextBannerFunc() {
          var div = document.createElement('div');
          var a = document.createElement('a');
          var span1Parent = document.createElement('span');
          var span1 = document.createElement('span');
          var span2 = document.createElement('span');

          div.classList.add('mall_sale_box');
          span1Parent.classList.add('mall_sale_icon');
          span1.classList.add('blind');
          span2.classList.add('mall_sale_anchor');
          span2.innerHTML = mallContentList[mallContentList.length - 2].mallTextList[mallPaging].text;
          span1.innerHTML = 'sale';
          a.href = mallContentList[mallContentList.length - 2].mallTextList[mallPaging].url;

          span1Parent.appendChild(span1);
          a.appendChild(span1Parent);
          a.appendChild(span2);
          div.appendChild(a);
          shopMallBanner.appendChild(div);

          return;
        }
        mallTextBannerFunc();

        var _loop = function _loop(mallTitleCnt) {
          var mallTitleData = mallContentList[mallContentList.length - 1].mallTitleList[mallTitleCnt + 3 + mallPaging * 3];
          var divParents = document.createElement('div');
          var div = document.createElement('div');
          var a = document.createElement('a');
          var img = document.createElement('img');
          var spanParent = document.createElement('span');
          var span1 = document.createElement('span');
          var span2 = document.createElement('span');
          var mallBannerUl = document.createElement('ul');

          mallBannerUl.classList.add('mall_title_ul');
          divParents.classList.add('mall_bx');
          div.classList.add('mall_title_link');
          img.classList.add('mall_title_img');
          spanParent.classList.add('mall_nowlink_box');
          span1.classList.add('mall_nowLink');
          ul.classList.add('mall_title_ul');

          a.href = mallTitleData.url;
          img.src = mallTitleData.src;
          img.alt = mallTitleData.title;

          span1.innerHTML = '바로가기';
          span2.innerHTML = '＞';

          spanParent.appendChild(span1);
          spanParent.appendChild(span2);
          a.appendChild(img);
          a.appendChild(spanParent);
          div.appendChild(a);
          divParents.appendChild(div);

          shopMallBanner.appendChild(divParents);
          shopMallBanner.appendChild(mallBannerUl);

          function mallBannerContCnt() {
            for (var _mallBannerContCnt = 0; _mallBannerContCnt < 3; _mallBannerContCnt++) {
              var mallBannerListData = mallContentList[mallPaging].mallContentList[malllistCnt + 6];
              malllistCnt++;
              var mallBannerLi = document.createElement('li');
              var mallBannerA = document.createElement('a');
              var mallBannerimg = document.createElement('img');
              var mallBannerSpanParent = document.createElement('span');
              var mallBannerSpan1 = document.createElement('span');
              var mallBannerSpan2 = document.createElement('span');

              mallBannerLi.classList.add('mall_content_list');
              mallBannerimg.classList.add('mall_content_img');
              mallBannerSpanParent.classList.add('mall_text_box');
              mallBannerSpan1.classList.add('mall_tx_span');

              mallBannerA.href = mallBannerListData.url;
              mallBannerimg.src = mallBannerListData.src;
              mallBannerimg.alt = mallBannerListData.title;
              mallBannerSpan1.innerHTML = mallBannerListData.text1;
              mallBannerSpan2.innerHTML = mallBannerListData.text2;

              mallBannerSpanParent.appendChild(mallBannerSpan1);
              mallBannerSpanParent.appendChild(mallBannerSpan2);

              mallBannerA.appendChild(mallBannerimg);
              mallBannerA.appendChild(mallBannerSpanParent);
              mallBannerLi.appendChild(mallBannerA);

              mallBannerUl.appendChild(mallBannerLi);
            }

            return;
          }
          mallBannerContCnt();
        };

        for (var mallTitleCnt = 0; mallTitleCnt < 3; mallTitleCnt++) {
          _loop(mallTitleCnt);
        }
        return;
      }
      mallBannerFunc();
      return;
    }
    mallContentFunc();
  }
  shoppingBoxFunc();

  
}); //load
