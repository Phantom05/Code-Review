
//polyfill
;(function () {
    (function() {
  'use strict';
  
  if (self.fetch) {
  return
  }
  
  function normalizeName(name) {
  if (typeof name !== 'string') {
  name = name.toString();
  }
  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
  throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
  }
  
  function normalizeValue(value) {
  if (typeof value !== 'string') {
  value = value.toString();
  }
  return value
  }
  
  function Headers(headers) {
  this.map = {}
  
  var self = this
  if (headers instanceof Headers) {
  headers.forEach(function(name, values) {
    values.forEach(function(value) {
      self.append(name, value)
    })
  })
  
  } else if (headers) {
  Object.getOwnPropertyNames(headers).forEach(function(name) {
    self.append(name, headers[name])
  })
  }
  }
  
  Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var list = this.map[name]
  if (!list) {
  list = []
  this.map[name] = list
  }
  list.push(value)
  }
  
  Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
  }
  
  Headers.prototype.get = function(name) {
  var values = this.map[normalizeName(name)]
  return values ? values[0] : null
  }
  
  Headers.prototype.getAll = function(name) {
  return this.map[normalizeName(name)] || []
  }
  
  Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
  }
  
  Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = [normalizeValue(value)]
  }
  
  // Instead of iterable for now.
  Headers.prototype.forEach = function(callback) {
  var self = this
  Object.getOwnPropertyNames(this.map).forEach(function(name) {
  callback(name, self.map[name])
  })
  }
  
  function consumed(body) {
  if (body.bodyUsed) {
  return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
  }
  
  function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
  reader.onload = function() {
    resolve(reader.result)
  }
  reader.onerror = function() {
    reject(reader.error)
  }
  })
  }
  
  function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  reader.readAsArrayBuffer(blob)
  return fileReaderReady(reader)
  }
  
  function readBlobAsText(blob) {
  var reader = new FileReader()
  reader.readAsText(blob)
  return fileReaderReady(reader)
  }
  
  var support = {
  blob: 'FileReader' in self && 'Blob' in self && (function() {
  try {
    new Blob();
    return true
  } catch(e) {
    return false
  }
  })(),
  formData: 'FormData' in self
  }
  
  function Body() {
  this.bodyUsed = false
  
  
  this._initBody = function(body) {
  this._bodyInit = body
  if (typeof body === 'string') {
    this._bodyText = body
  } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
    this._bodyBlob = body
  } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
    this._bodyFormData = body
  } else if (!body) {
    this._bodyText = ''
  } else {
    throw new Error('unsupported BodyInit type')
  }
  }
  
  if (support.blob) {
  this.blob = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }
  
    if (this._bodyBlob) {
      return Promise.resolve(this._bodyBlob)
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as blob')
    } else {
      return Promise.resolve(new Blob([this._bodyText]))
    }
  }
  
  this.arrayBuffer = function() {
    return this.blob().then(readBlobAsArrayBuffer)
  }
  
  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }
  
    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }
  } else {
  this.text = function() {
    var rejected = consumed(this)
    return rejected ? rejected : Promise.resolve(this._bodyText)
  }
  }
  
  if (support.formData) {
  this.formData = function() {
    return this.text().then(decode)
  }
  }
  
  this.json = function() {
  return this.text().then(JSON.parse)
  }
  
  return this
  }
  
  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
  
  function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return (methods.indexOf(upcased) > -1) ? upcased : method
  }
  
  function Request(url, options) {
  options = options || {}
  this.url = url
  
  this.credentials = options.credentials || 'omit'
  this.headers = new Headers(options.headers)
  this.method = normalizeMethod(options.method || 'GET')
  this.mode = options.mode || null
  this.referrer = null
  
  if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
  throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(options.body)
  }
  
  function decode(body) {
  var form = new FormData()
  body.trim().split('&').forEach(function(bytes) {
  if (bytes) {
    var split = bytes.split('=')
    var name = split.shift().replace(/\+/g, ' ')
    var value = split.join('=').replace(/\+/g, ' ')
    form.append(decodeURIComponent(name), decodeURIComponent(value))
  }
  })
  return form
  }
  
  function headers(xhr) {
  var head = new Headers()
  var pairs = xhr.getAllResponseHeaders().trim().split('\n')
  pairs.forEach(function(header) {
  var split = header.trim().split(':')
  var key = split.shift().trim()
  var value = split.join(':').trim()
  head.append(key, value)
  })
  return head
  }
  
  Body.call(Request.prototype)
  
  function Response(bodyInit, options) {
  if (!options) {
  options = {}
  }
  
  this._initBody(bodyInit)
  this.type = 'default'
  this.url = null
  this.status = options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText
  this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
  this.url = options.url || ''
  }
  
  Body.call(Response.prototype)
  
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
  
  self.fetch = function(input, init) {
  // TODO: Request constructor should accept input, init
  var request
  if (Request.prototype.isPrototypeOf(input) && !init) {
  request = input
  } else {
  request = new Request(input, init)
  }
  
  return new Promise(function(resolve, reject) {
  var xhr = new XMLHttpRequest()
  if (request.credentials === 'cors') {
    xhr.withCredentials = true;
  }
  
  function responseURL() {
    if ('responseURL' in xhr) {
      return xhr.responseURL
    }
  
    // Avoid security warnings on getResponseHeader when not allowed by CORS
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL')
    }
  
    return;
  }
  
  xhr.onload = function() {
    var status = (xhr.status === 1223) ? 204 : xhr.status
    if (status < 100 || status > 599) {
      reject(new TypeError('Network request failed'))
      return
    }
    var options = {
      status: status,
      statusText: xhr.statusText,
      headers: headers(xhr),
      url: responseURL()
    }
    var body = 'response' in xhr ? xhr.response : xhr.responseText;
    resolve(new Response(body, options))
  }
  
  xhr.onerror = function() {
    reject(new TypeError('Network request failed'))
  }
  
  xhr.open(request.method, request.url, true)
  
  if ('responseType' in xhr && support.blob) {
    xhr.responseType = 'blob'
  }
  
  request.headers.forEach(function(name, values) {
    values.forEach(function(value) {
      xhr.setRequestHeader(name, value)
    })
  })
  
  xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
  }
  self.fetch.polyfill = true
  })();
  (function (global, undefined) {
  "use strict";
  
  if (global.setImmediate) {
    return;
  }
  
  var nextHandle = 1; // Spec says greater than zero
  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var setImmediate;
  
  function addFromSetImmediateArguments(args) {
    tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
    return nextHandle++;
  }
  
  // This function accepts the same arguments as setImmediate, but
  // returns a function that requires no arguments.
  function partiallyApplied(handler) {
    var args = [].slice.call(arguments, 1);
    return function() {
        if (typeof handler === "function") {
            handler.apply(undefined, args);
        } else {
            (new Function("" + handler))();
        }
    };
  }
  
  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
        // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
        // "too much recursion" error.
        setTimeout(partiallyApplied(runIfPresent, handle), 0);
    } else {
        var task = tasksByHandle[handle];
        if (task) {
            currentlyRunningATask = true;
            try {
                task();
            } finally {
                clearImmediate(handle);
                currentlyRunningATask = false;
            }
        }
    }
  }
  
  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }
  
  function installNextTickImplementation() {
    setImmediate = function() {
        var handle = addFromSetImmediateArguments(arguments);
        process.nextTick(partiallyApplied(runIfPresent, handle));
        return handle;
    };
  }
  
  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
        global.onmessage = function() {
            postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;
        return postMessageIsAsynchronous;
    }
  }
  
  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
  
    var messagePrefix = "setImmediate$" + Math.random() + "$";
    var onGlobalMessage = function(event) {
        if (event.source === global &&
            typeof event.data === "string" &&
            event.data.indexOf(messagePrefix) === 0) {
            runIfPresent(+event.data.slice(messagePrefix.length));
        }
    };
  
    if (global.addEventListener) {
        global.addEventListener("message", onGlobalMessage, false);
    } else {
        global.attachEvent("onmessage", onGlobalMessage);
    }
  
    setImmediate = function() {
        var handle = addFromSetImmediateArguments(arguments);
        global.postMessage(messagePrefix + handle, "*");
        return handle;
    };
  }
  
  function installMessageChannelImplementation() {
    var channel = new MessageChannel();
    channel.port1.onmessage = function(event) {
        var handle = event.data;
        runIfPresent(handle);
    };
  
    setImmediate = function() {
        var handle = addFromSetImmediateArguments(arguments);
        channel.port2.postMessage(handle);
        return handle;
    };
  }
  
  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;
    setImmediate = function() {
        var handle = addFromSetImmediateArguments(arguments);
        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
        var script = doc.createElement("script");
        script.onreadystatechange = function () {
            runIfPresent(handle);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
        };
        html.appendChild(script);
        return handle;
    };
  }
  
  function installSetTimeoutImplementation() {
    setImmediate = function() {
        var handle = addFromSetImmediateArguments(arguments);
        setTimeout(partiallyApplied(runIfPresent, handle), 0);
        return handle;
    };
  }
  
  // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
  
  // Don't get fooled by e.g. browserify environments.
  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }
  
  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
  }(new Function("return this")()));
  /**
  * Promise polyfill v1.0.10
  * requires setImmediate
  *
  * © 2014–2015 Dmitry Korobkin
  * Released under the MIT license
  * github.com/Octane/Promise
  */
  (function (global) {'use strict';
  
  var STATUS = '[[PromiseStatus]]';
  var VALUE = '[[PromiseValue]]';
  var ON_FUlFILLED = '[[OnFulfilled]]';
  var ON_REJECTED = '[[OnRejected]]';
  var ORIGINAL_ERROR = '[[OriginalError]]';
  var PENDING = 'pending';
  var INTERNAL_PENDING = 'internal pending';
  var FULFILLED = 'fulfilled';
  var REJECTED = 'rejected';
  var NOT_ARRAY = 'not an array.';
  var REQUIRES_NEW = 'constructor Promise requires "new".';
  var CHAINING_CYCLE = 'then() cannot return same Promise that it resolves.';
  
  var setImmediate = global.setImmediate || require('timers').setImmediate;
  var isArray = Array.isArray || function (anything) {
    return Object.prototype.toString.call(anything) == '[object Array]';
  };
  
  function InternalError(originalError) {
    this[ORIGINAL_ERROR] = originalError;
  }
  
  function isInternalError(anything) {
    return anything instanceof InternalError;
  }
  
  function isObject(anything) {
    //Object.create(null) instanceof Object → false
    return Object(anything) === anything;
  }
  
  function isCallable(anything) {
    return typeof anything == 'function';
  }
  
  function isPromise(anything) {
    return anything instanceof Promise;
  }
  
  function identity(value) {
    return value;
  }
  
  function thrower(reason) {
    throw reason;
  }
  
  function enqueue(promise, onFulfilled, onRejected) {
    if (!promise[ON_FUlFILLED]) {
        promise[ON_FUlFILLED] = [];
        promise[ON_REJECTED] = [];
    }
    promise[ON_FUlFILLED].push(onFulfilled);
    promise[ON_REJECTED].push(onRejected);
  }
  
  function clearAllQueues(promise) {
    delete promise[ON_FUlFILLED];
    delete promise[ON_REJECTED];
  }
  
  function callEach(queue) {
    var i;
    var length = queue.length;
    for (i = 0; i < length; i++) {
        queue[i]();
    }
  }
  
  function call(resolve, reject, value) {
    var anything = toPromise(value);
    if (isPromise(anything)) {
        anything.then(resolve, reject);
    } else if (isInternalError(anything)) {
        reject(anything[ORIGINAL_ERROR]);
    } else {
        resolve(value);
    }
  }
  
  function toPromise(anything) {
    var then;
    if (isPromise(anything)) {
        return anything;
    }
    if(isObject(anything)) {
        try {
            then = anything.then;
        } catch (error) {
            return new InternalError(error);
        }
        if (isCallable(then)) {
            return new Promise(function (resolve, reject) {
                setImmediate(function () {
                    try {
                        then.call(anything, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
    }
    return null;
  }
  
  function resolvePromise(promise, resolver) {
    function resolve(value) {
        if (promise[STATUS] == PENDING) {
            fulfillPromise(promise, value);
        }
    }
    function reject(reason) {
        if (promise[STATUS] == PENDING) {
            rejectPromise(promise, reason);
        }
    }
    try {
        resolver(resolve, reject);
    } catch(error) {
        reject(error);
    }
  }
  
  function fulfillPromise(promise, value) {
    var queue;
    var anything = toPromise(value);
    if (isPromise(anything)) {
        promise[STATUS] = INTERNAL_PENDING;
        anything.then(
            function (value) {
                fulfillPromise(promise, value);
            },
            function (reason) {
                rejectPromise(promise, reason);
            }
        );
    } else if (isInternalError(anything)) {
        rejectPromise(promise, anything[ORIGINAL_ERROR]);
    } else {
        promise[STATUS] = FULFILLED;
        promise[VALUE] = value;
        queue = promise[ON_FUlFILLED];
        if (queue && queue.length) {
            clearAllQueues(promise);
            callEach(queue);
        }
    }
  }
  
  function rejectPromise(promise, reason) {
    var queue = promise[ON_REJECTED];
    promise[STATUS] = REJECTED;
    promise[VALUE] = reason;
    if (queue && queue.length) {
        clearAllQueues(promise);
        callEach(queue);
    }
  }
  
  function Promise(resolver) {
    var promise = this;
    if (!isPromise(promise)) {
        throw new TypeError(REQUIRES_NEW);
    }
    promise[STATUS] = PENDING;
    promise[VALUE] = undefined;
    resolvePromise(promise, resolver);
  }
  
  Promise.prototype.then = function (onFulfilled, onRejected) {
    var promise = this;
    var nextPromise;
    onFulfilled = isCallable(onFulfilled) ? onFulfilled : identity;
    onRejected = isCallable(onRejected) ? onRejected : thrower;
    nextPromise = new Promise(function (resolve, reject) {
        function tryCall(func) {
            var value;
            try {
                value = func(promise[VALUE]);
            } catch (error) {
                reject(error);
                return;
            }
            if (value === nextPromise) {
                reject(new TypeError(CHAINING_CYCLE));
            } else {
                call(resolve, reject, value);
            }
        }
        function asyncOnFulfilled() {
            setImmediate(tryCall, onFulfilled);
        }
        function asyncOnRejected() {
            setImmediate(tryCall, onRejected);
        }
        switch (promise[STATUS]) {
            case FULFILLED:
                asyncOnFulfilled();
                break;
            case REJECTED:
                asyncOnRejected();
                break;
            default:
                enqueue(promise, asyncOnFulfilled, asyncOnRejected);
        }
    });
    return nextPromise;
  };
  
  Promise.prototype['catch'] = function (onRejected) {
    return this.then(identity, onRejected);
  };
  
  Promise.resolve = function (value) {
    var anything = toPromise(value);
    if (isPromise(anything)) {
        return anything;
    }
    return new Promise(function (resolve, reject) {
        if (isInternalError(anything)) {
            reject(anything[ORIGINAL_ERROR]);
        } else {
            resolve(value);
        }
    });
  };
  
  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
  };
  
  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
        var i;
        var length;
        if (isArray(values)) {
            length = values.length;
            for (i = 0; i < length; i++) {
                call(resolve, reject, values[i]);
            }
        } else {
            reject(new TypeError(NOT_ARRAY));
        }
    });
  };
  
  Promise.all = function (values) {
    return new Promise(function (resolve, reject) {
        var fulfilledCount = 0;
        var promiseCount = 0;
        var anything;
        var length;
        var value;
        var i;
        if (isArray(values)) {
            values = values.slice(0);
            length = values.length;
            for (i = 0; i < length; i++) {
                value = values[i];
                anything = toPromise(value);
                if (isPromise(anything)) {
                    promiseCount++;
                    anything.then(
                        function (index) {
                            return function (value) {
                                values[index] = value;
                                fulfilledCount++;
                                if (fulfilledCount == promiseCount) {
                                    resolve(values);
                                }
                            };
                        }(i),
                        reject
                    );
                } else if (isInternalError(anything)) {
                    reject(anything[ORIGINAL_ERROR]);
                } else {
                    //[1, , 3] → [1, undefined, 3]
                    values[i] = value;
                }
            }
            if (!promiseCount) {
                resolve(values);
            }
        } else {
            reject(new TypeError(NOT_ARRAY));
        }
    });
  };
  
  if (typeof module != 'undefined' && module.exports) {
    module.exports = global.Promise || Promise;
  } else if (!global.Promise) {
    global.Promise = Promise;
  }
  
  }(this));
  
  }.call(
    typeof window === 'object' && window ||
    typeof self   === 'object' && self   ||
    typeof global === 'object' && global ||
    {}
  ));
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  try{
  if(!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {
  
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
  
        // 1. Let O be ? ToObject(this value).
        var o = Object(this);
  
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;
  
        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }
  
        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;
  
        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
  
        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
  
        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          // c. Increase k by 1. 
          k++;
        }
  
        // 8. Return false
        return false;
      }
    });
  }
  }catch(e){
    console.log(e.message)
  }
  // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
        return;
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.appendChild(docFrag);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
  (function() {
    if (!Event.prototype.preventDefault) {
      Event.prototype.preventDefault=function() {
        this.returnValue=false;
      };
    }
    if (!Event.prototype.stopPropagation) {
      Event.prototype.stopPropagation=function() {
        this.cancelBubble=true;
      };
    }
    if (!Element.prototype.addEventListener) {
      var eventListeners=[];
      
      var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
        var self=this;
        var wrapper=function(e) {
          e.target=e.srcElement;
          e.currentTarget=self;
          if (typeof listener.handleEvent != 'undefined') {
            listener.handleEvent(e);
          } else {
            listener.call(self,e);
          }
        };
        if (type=="DOMContentLoaded") {
          var wrapper2=function(e) {
            if (document.readyState=="complete") {
              wrapper(e);
            }
          };
          document.attachEvent("onreadystatechange",wrapper2);
          eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
          
          if (document.readyState=="complete") {
            var e=new Event();
            e.srcElement=window;
            wrapper2(e);
          }
        } else {
          this.attachEvent("on"+type,wrapper);
          eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
        }
      };
      var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
        var counter=0;
        while (counter<eventListeners.length) {
          var eventListener=eventListeners[counter];
          if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
            if (type=="DOMContentLoaded") {
              this.detachEvent("onreadystatechange",eventListener.wrapper);
            } else {
              this.detachEvent("on"+type,eventListener.wrapper);
            }
            eventListeners.splice(counter, 1);
            break;
          }
          ++counter;
        }
      };
      Element.prototype.addEventListener=addEventListener;
      Element.prototype.removeEventListener=removeEventListener;
      if (HTMLDocument) {
        HTMLDocument.prototype.addEventListener=addEventListener;
        HTMLDocument.prototype.removeEventListener=removeEventListener;
      }
      if (Window) {
        Window.prototype.addEventListener=addEventListener;
        Window.prototype.removeEventListener=removeEventListener;
      }
    }
  })();
  // Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
  ;(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };
  
    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }
  
    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += this.element.className.length > 0 ? ' ' + name : name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };
  
    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }
  
    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
  })();