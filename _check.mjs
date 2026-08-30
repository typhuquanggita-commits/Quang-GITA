var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.2.8";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.8";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production();
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React2 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React2 = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
        React2,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_jsx_runtime_production();
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// src/lib/rng.ts
function makeRng(seed) {
  let s = seed >>> 0 || 1;
  const next = () => {
    s = s + 1831565813 >>> 0;
    let t = s;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const int = (min, max) => min + Math.floor(next() * (max - min + 1));
  return {
    next,
    int,
    pick: (arr) => arr[int(0, arr.length - 1)],
    bool: () => next() < 0.5,
    sign: () => next() < 0.5 ? -1 : 1,
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = int(0, i);
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  };
}
var gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
var lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
function factorize(n) {
  const out = [];
  let m = Math.abs(n);
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}
function reduce(a, b) {
  if (b === 0) return [a, 0];
  const g = gcd(a, b) || 1;
  let n = a / g, d = b / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return [n, d];
}
function frac(a, b) {
  const [n, d] = reduce(a, b);
  if (d === 1) return `${n}`;
  if (n === 0) return "0";
  return n < 0 ? `-\\f{${-n}}{${d}}` : `\\f{${n}}{${d}}`;
}
function simplifySqrt(n) {
  let out = 1, inn = n;
  for (let i = 2; i * i <= inn; i++) {
    while (inn % (i * i) === 0) {
      out *= i;
      inn /= i * i;
    }
  }
  if (inn === 1) return `${out}`;
  return out === 1 ? `\\s{${inn}}` : `${out}\\s{${inn}}`;
}
function term(coef, v, first = false) {
  if (coef === 0) return "";
  const sign = coef < 0 ? "-" : first ? "" : "+";
  const a = Math.abs(coef);
  const body = v === "" ? `${a}` : a === 1 ? v : `${a}${v}`;
  return `${sign}${body}`;
}
function poly(coefs, v = "x") {
  const n = coefs.length - 1;
  let s = "";
  coefs.forEach((c, i) => {
    const p = n - i;
    if (c === 0) return;
    const vv = p === 0 ? "" : p === 1 ? v : `${v}^{${p}}`;
    s += term(c, vv, s === "");
  });
  return s || "0";
}
function round(x, k = 2) {
  const r = Math.round(x * 10 ** k) / 10 ** k;
  return String(r);
}
function distractInt(r, correct, spread = 5) {
  const set = /* @__PURE__ */ new Set([correct]);
  const cand = [correct + 1, correct - 1, -correct, correct * 2, correct + spread, correct - spread, correct + 2, correct - 2];
  const pool = r.shuffle(cand.filter((x) => x !== correct));
  for (const c of pool) {
    if (set.size >= 4) break;
    set.add(c);
  }
  let k = 1;
  while (set.size < 4) {
    set.add(correct + spread + k);
    k++;
  }
  return Array.from(set).filter((x) => x !== correct).slice(0, 3);
}
function mcOptions(r, correct, wrong) {
  const uniq = Array.from(new Set(wrong.filter((w) => w !== correct))).slice(0, 3);
  while (uniq.length < 3) uniq.push(`${correct} + ${uniq.length + 1}`);
  const all = r.shuffle([correct, ...uniq]);
  return [all, all.indexOf(correct)];
}

// src/bank/g6.ts
var BANK_G6 = [
  {
    id: "g6.tap-hop",
    topicId: "g6-t1",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\u1EADp h\u1EE3p \u2014 li\u1EC7t k\xEA ph\u1EA7n t\u1EED",
    build: (r) => {
      const a = r.int(3, 12), n = r.int(4, 8), b = a + n;
      const count = n;
      const [options, answer] = mcOptions(r, String(count), distractInt(r, count, 2).map(String));
      return {
        stem: `Cho t\u1EADp h\u1EE3p $A=\\{x\\in\\N\\mid ${a}\\le x<${b}\\}$. T\u1EADp h\u1EE3p $A$ c\xF3 bao nhi\xEAu ph\u1EA7n t\u1EED?`,
        options,
        answer,
        thinking: [
          `D\u1EA5u $\\le$ \u1EDF b\xEAn tr\xE1i n\xEAn **l\u1EA5y** s\u1ED1 ${a}; d\u1EA5u $<$ \u1EDF b\xEAn ph\u1EA3i n\xEAn **kh\xF4ng l\u1EA5y** s\u1ED1 ${b}.`,
          `C\xE1c ph\u1EA7n t\u1EED ch\u1EA1y t\u1EEB ${a} \u0111\u1EBFn ${b - 1}.`
        ],
        solution: [
          `$A=\\{${Array.from({ length: n }, (_, i) => a + i).join(";")}\\}$.`,
          `S\u1ED1 ph\u1EA7n t\u1EED $=${b}-${a}=${count}$.`
        ],
        pitfall: "Nh\u1EA7m \u201Cnh\u1ECF h\u01A1n\u201D v\u1EDBi \u201Ckh\xF4ng v\u01B0\u1EE3t qu\xE1\u201D l\xE0 l\u1ED7i l\xE0m l\u1EC7ch m\u1ED9t ph\u1EA7n t\u1EED."
      };
    }
  },
  {
    id: "g6.tinh-nhanh",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh nhanh b\u1EB1ng nh\xE2n t\u1EED chung",
    build: (r) => {
      const k = r.pick([25, 4, 8, 125, 50]);
      const a = r.int(11, 89), b = 100 - a;
      const val = k * 100;
      return {
        stem: `T\xEDnh h\u1EE3p l\xED: $${k}\\cdot${a}+${k}\\cdot${b}$.`,
        answer: String(val),
        thinking: [`Hai h\u1EA1ng t\u1EED c\xF3 th\u1EEBa s\u1ED1 chung ${k}.`, `Ph\u1EA7n trong ngo\u1EB7c: $${a}+${b}=100$ \u2014 s\u1ED1 tr\xF2n tr\u0103m.`],
        solution: [
          `$${k}\\cdot${a}+${k}\\cdot${b}=${k}(${a}+${b})$`,
          `$=${k}\\cdot100=${val}$.`
        ],
        pitfall: "Nh\xE2n th\u1EB3ng t\u1EEBng t\xEDch r\u1ED3i c\u1ED9ng v\u1EEBa l\xE2u v\u1EEBa d\u1EC5 sai \u2014 lu\xF4n t\xECm nh\xE2n t\u1EED chung tr\u01B0\u1EDBc."
      };
    }
  },
  {
    id: "g6.luy-thua",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\xE2n, chia l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1",
    build: (r) => {
      const base = r.pick([2, 3, 5, 7]);
      const m = r.int(4, 9), n = r.int(2, 5), p = r.int(1, 3);
      const e = m + n - p;
      const correct = `${base}^{${e}}`;
      const [options, answer] = mcOptions(r, correct, [
        `${base}^{${m * n - p}}`,
        `${base}^{${m + n + p}}`,
        `${base}^{${e + 1}}`
      ]);
      return {
        stem: `K\u1EBFt qu\u1EA3 c\u1EE7a ph\xE9p t\xEDnh $${base}^{${m}}\\cdot${base}^{${n}}:${base}^{${p}}$ l\xE0:`,
        options,
        answer,
        thinking: ["C\xF9ng c\u01A1 s\u1ED1 n\xEAn ch\u1EC9 l\xE0m vi\u1EC7c v\u1EDBi s\u1ED1 m\u0169: nh\xE2n th\xEC c\u1ED9ng s\u1ED1 m\u0169, chia th\xEC tr\u1EEB s\u1ED1 m\u0169."],
        solution: [
          `$${base}^{${m}}\\cdot${base}^{${n}}=${base}^{${m}+${n}}=${base}^{${m + n}}$.`,
          `$${base}^{${m + n}}:${base}^{${p}}=${base}^{${m + n}-${p}}=${base}^{${e}}$.`
        ],
        pitfall: "Nh\xE2n hai l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 th\xEC C\u1ED8NG s\u1ED1 m\u0169, kh\xF4ng nh\xE2n s\u1ED1 m\u0169."
      };
    }
  },
  {
    id: "g6.thu-tu-phep-tinh",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh",
    build: (r) => {
      const a = r.int(2, 5), b = r.int(2, 4);
      const c = r.pick([2, 3, 4, 5]);
      const d = c * r.int(2, 9);
      const e = r.int(3, 9);
      const val = a ** b + d / c - e;
      return {
        stem: `T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $A=${a}^{${b}}+${d}:${c}-${e}$.`,
        answer: String(val),
        thinking: ["Kh\xF4ng c\xF3 ngo\u1EB7c: \u01B0u ti\xEAn l\u0169y th\u1EEBa, sau \u0111\xF3 nh\xE2n chia, cu\u1ED1i c\xF9ng c\u1ED9ng tr\u1EEB t\u1EEB tr\xE1i sang ph\u1EA3i."],
        solution: [
          `L\u0169y th\u1EEBa: $${a}^{${b}}=${a ** b}$.`,
          `Ph\xE9p chia: $${d}:${c}=${d / c}$.`,
          `$A=${a ** b}+${d / c}-${e}=${val}$.`
        ],
        pitfall: `T\xEDnh $${d}:${c}$ sau khi \u0111\xE3 c\u1ED9ng l\xE0 sai th\u1EE9 t\u1EF1 \u2014 nh\xE2n chia lu\xF4n l\xE0m tr\u01B0\u1EDBc c\u1ED9ng tr\u1EEB.`
      };
    }
  },
  {
    id: "g6.tim-x",
    topicId: "g6-t1",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x c\xF3 l\u0169y th\u1EEBa",
    build: (r) => {
      const base = r.pick([2, 3, 5]);
      const x = r.int(2, 4);
      const k = r.int(2, 5), c = r.int(3, 12);
      const d = k * (base ** x + c);
      return {
        stem: `T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $x$, bi\u1EBFt $${k}\\cdot(${base}^{x}+${c})=${d}$.`,
        answer: String(x),
        thinking: [
          `$x$ n\u1EB1m \u1EDF l\u1EDBp trong c\xF9ng; b\xEAn ngo\xE0i l\u1EA7n l\u01B0\u1EE3t l\xE0 \u201C$+${c}$\u201D r\u1ED3i \u201Cnh\xE2n ${k}\u201D.`,
          "G\u1EE1 ng\u01B0\u1EE3c t\u1EEB ngo\xE0i v\xE0o: chia tr\u01B0\u1EDBc, tr\u1EEB sau, cu\u1ED1i c\xF9ng so s\xE1nh l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1."
        ],
        solution: [
          `$${base}^{x}+${c}=${d}:${k}=${d / k}$.`,
          `$${base}^{x}=${d / k}-${c}=${base ** x}$.`,
          `M\xE0 $${base ** x}=${base}^{${x}}$ n\xEAn $x=${x}$.`,
          `Th\u1EED l\u1EA1i: $${k}(${base}^{${x}}+${c})=${k}\\cdot${base ** x + c}=${d}$ (\u0111\xFAng).`
        ]
      };
    }
  },
  {
    id: "g6.chia-het",
    topicId: "g6-t2",
    grade: 6,
    level: "NB",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a t\u1ED5ng",
    build: (r) => {
      const m = r.pick([2, 3, 5, 9]);
      const a = m * r.int(4, 20), b = m * r.int(4, 20), c = m * r.int(2, 15) + r.int(1, m - 1);
      const opts = [
        `$${a}$ chia h\u1EBFt cho $${m}$`,
        `$${a}+${b}$ chia h\u1EBFt cho $${m}$`,
        `$${a}+${c}$ chia h\u1EBFt cho $${m}$`,
        `$${b}-${a}$ chia h\u1EBFt cho $${m}$`
      ];
      const key = [true, true, false, true];
      return {
        stem: `Cho $m=${m}$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh sau:`,
        options: opts,
        answer: key,
        thinking: [`X\xE9t t\u1EEBng s\u1ED1 v\u1EDBi s\u1ED1 chia ${m}, r\u1ED3i \xE1p d\u1EE5ng t\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a t\u1ED5ng v\xE0 hi\u1EC7u.`],
        solution: [
          `a) **\u0110\xFAng** \u2014 $${a}=${m}\\cdot${a / m}$ n\xEAn $${a};\\vdots;${m}$.`,
          `b) **\u0110\xFAng** \u2014 $${b}=${m}\\cdot${b / m}$ c\u0169ng chia h\u1EBFt cho $${m}$; t\u1ED5ng hai s\u1ED1 c\xF9ng chia h\u1EBFt cho $${m}$ th\xEC chia h\u1EBFt cho $${m}$.`,
          `c) **Sai** \u2014 $${c}$ chia $${m}$ d\u01B0 $${c % m}$; m\u1ED9t s\u1ED1 chia h\u1EBFt c\u1ED9ng m\u1ED9t s\u1ED1 kh\xF4ng chia h\u1EBFt th\xEC t\u1ED5ng **kh\xF4ng** chia h\u1EBFt.`,
          `d) **\u0110\xFAng** \u2014 hi\u1EC7u c\u1EE7a hai s\u1ED1 c\xF9ng chia h\u1EBFt cho $${m}$ th\xEC chia h\u1EBFt cho $${m}$.`
        ],
        pitfall: "M\u1ED9t s\u1ED1 chia h\u1EBFt c\u1ED9ng m\u1ED9t s\u1ED1 kh\xF4ng chia h\u1EBFt th\xEC t\u1ED5ng KH\xD4NG chia h\u1EBFt."
      };
    }
  },
  {
    id: "g6.dau-hieu",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "D\u1EA5u hi\u1EC7u chia h\u1EBFt \u2014 t\xECm ch\u1EEF s\u1ED1",
    build: (r) => {
      const d1 = r.int(1, 9), d3 = r.int(0, 9), d4 = r.int(0, 9);
      const base = d1 + d3 + d4;
      let a = (9 - base % 9) % 9;
      const total = base + a;
      return {
        stem: `T\xECm ch\u1EEF s\u1ED1 $a$ \u0111\u1EC3 s\u1ED1 $\\ov{${d1}a${d3}${d4}}$ chia h\u1EBFt cho 9.`,
        answer: String(a),
        accept: a === 0 ? ["0", "9"] : void 0,
        thinking: ["Chia h\u1EBFt cho 9 th\xEC x\xE9t T\u1ED4NG c\xE1c ch\u1EEF s\u1ED1.", `T\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 l\xE0 $${d1}+a+${d3}+${d4}=a+${base}$.`],
        solution: [
          `S\u1ED1 \u0111\xE3 cho chia h\u1EBFt cho 9 $\\Leftrightarrow (a+${base});\\vdots;9$.`,
          `V\xEC $0\\le a\\le9$ n\xEAn $${base}\\le a+${base}\\le${base + 9}$.`,
          `Trong kho\u1EA3ng \u0111\xF3, b\u1ED9i c\u1EE7a 9 ph\xF9 h\u1EE3p l\xE0 $${total}$, suy ra $a=${a}$.`
        ],
        pitfall: "Ph\u1EA3i ch\u1EB7n mi\u1EC1n gi\xE1 tr\u1ECB c\u1EE7a t\u1ED5ng \u0111\u1EC3 kh\xF4ng b\u1ECF s\xF3t ho\u1EB7c th\u1EEBa nghi\u1EC7m."
      };
    }
  },
  {
    id: "g6.nguyen-to",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE2n t\xEDch th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 \u2014 \u0111\u1EBFm \u01B0\u1EDBc",
    build: (r) => {
      const n = r.pick([120, 180, 240, 360, 252, 300, 168, 200, 216, 400]);
      const f = factorize(n);
      const cnt = f.reduce((s, [, e]) => s * (e + 1), 1);
      const [options, answer] = mcOptions(r, String(cnt), distractInt(r, cnt, 3).map(String));
      return {
        stem: `S\u1ED1 $${n}$ c\xF3 bao nhi\xEAu \u01B0\u1EDBc t\u1EF1 nhi\xEAn?`,
        options,
        answer,
        thinking: ["Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 r\u1ED3i nh\xE2n c\xE1c (s\u1ED1 m\u0169 + 1)."],
        solution: [
          `$${n}=${f.map(([p, e]) => e === 1 ? `${p}` : `${p}^{${e}}`).join("\\cdot")}$.`,
          `S\u1ED1 \u01B0\u1EDBc $=${f.map(([, e]) => `(${e}+1)`).join("")}=${cnt}$.`
        ],
        pitfall: "Qu\xEAn c\u1ED9ng 1 v\xE0o m\u1ED7i s\u1ED1 m\u0169."
      };
    }
  },
  {
    id: "g6.ucln",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n th\u1EF1c t\u1EBF \u01AFCLN",
    build: (r) => {
      const g = r.pick([6, 8, 12, 15, 18]);
      const p = r.shuffle([2, 3, 5, 7, 11]).slice(0, 3);
      const a = g * p[0], b = g * p[1], c = g * p[2];
      const item = r.pick([
        { x: "quy\u1EC3n v\u1EDF", y: "chi\u1EBFc b\xFAt", z: "c\u1EE5c t\u1EA9y" },
        { x: "c\xE1i k\u1EB9o", y: "c\xE1i b\xE1nh", z: "qu\u1EA3 cam" },
        { x: "quy\u1EC3n truy\u1EC7n", y: "chi\u1EBFc th\u01B0\u1EDBc", z: "h\u1ED9p m\xE0u" }
      ]);
      return {
        stem: `C\xF4 gi\xE1o c\xF3 $${a}$ ${item.x}, $${b}$ ${item.y} v\xE0 $${c}$ ${item.z}. C\xF4 mu\u1ED1n chia \u0111\u1EC1u t\u1EA5t c\u1EA3 v\xE0o c\xE1c ph\u1EA7n qu\xE0 sao cho s\u1ED1 ph\u1EA7n qu\xE0 l\xE0 nhi\u1EC1u nh\u1EA5t. H\u1ECFi chia \u0111\u01B0\u1EE3c nhi\u1EC1u nh\u1EA5t bao nhi\xEAu ph\u1EA7n qu\xE0?`,
        answer: String(g),
        thinking: [
          "\u201CChia \u0111\u1EC1u\u201D cho c\u1EA3 ba lo\u1EA1i \u2192 s\u1ED1 ph\u1EA7n qu\xE0 l\xE0 **\u01B0\u1EDBc chung** c\u1EE7a ba s\u1ED1.",
          "\u201CNhi\u1EC1u nh\u1EA5t\u201D \u2192 l\u1EA5y \u01AFCLN."
        ],
        solution: [
          `G\u1ECDi $n$ l\xE0 s\u1ED1 ph\u1EA7n qu\xE0 ($n\\in\\Nstar$). V\xEC chia \u0111\u1EC1u n\xEAn $n$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a $${a}$, $${b}$, $${c}$.`,
          `Y\xEAu c\u1EA7u nhi\u1EC1u nh\u1EA5t n\xEAn $n=$ \u01AFCLN$(${a};${b};${c})=${g}$.`,
          `V\u1EADy chia \u0111\u01B0\u1EE3c nhi\u1EC1u nh\u1EA5t **${g} ph\u1EA7n qu\xE0**; m\u1ED7i ph\u1EA7n c\xF3 ${a / g} ${item.x}, ${b / g} ${item.y} v\xE0 ${c / g} ${item.z}.`
        ],
        pitfall: "T\u1EEB kho\xE1 \u201Cnhi\u1EC1u nh\u1EA5t / l\u1EDBn nh\u1EA5t\u201D \u2192 \u01AFCLN; \u201C\xEDt nh\u1EA5t / c\xF9ng l\xFAc\u201D \u2192 BCNN."
      };
    }
  },
  {
    id: "g6.bcnn",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n th\u1EF1c t\u1EBF BCNN (c\xF3 d\u01B0)",
    build: (r) => {
      const trio = r.pick([[12, 15, 18], [8, 12, 20], [10, 12, 15], [6, 9, 12], [12, 16, 20]]);
      const L = trio.reduce((x, y) => lcm(x, y));
      const d\u01B0 = r.int(1, Math.min(5, trio[0] - 1));
      const k = r.int(2, 3);
      const n = L * k + d\u01B0;
      const lo = L * k - Math.floor(L / 2), hi = L * k + Math.floor(L / 2) + d\u01B0;
      return {
        stem: `S\u1ED1 h\u1ECDc sinh kh\u1ED1i 6 c\u1EE7a m\u1ED9t tr\u01B0\u1EDDng khi x\u1EBFp th\xE0nh h\xE0ng $${trio[0]}$, h\xE0ng $${trio[1]}$, h\xE0ng $${trio[2]}$ th\xEC \u0111\u1EC1u th\u1EEBa $${d\u01B0}$ em. Bi\u1EBFt s\u1ED1 h\u1ECDc sinh trong kho\u1EA3ng t\u1EEB $${lo}$ \u0111\u1EBFn $${hi}$. T\xEDnh s\u1ED1 h\u1ECDc sinh kh\u1ED1i 6.`,
        answer: String(n),
        thinking: [
          `\u201C\u0110\u1EC1u th\u1EEBa ${d\u01B0}\u201D ngh\u0129a l\xE0 n\u1EBFu b\u1EDBt \u0111i ${d\u01B0} em th\xEC chia h\u1EBFt cho c\u1EA3 ba s\u1ED1.`,
          "\u0110\u1EB7t $n$ l\xE0 s\u1ED1 h\u1ECDc sinh, khi \u0111\xF3 $n-" + d\u01B0 + "$ l\xE0 b\u1ED9i chung c\u1EE7a ba s\u1ED1."
        ],
        solution: [
          `G\u1ECDi $n$ l\xE0 s\u1ED1 h\u1ECDc sinh kh\u1ED1i 6 ($n\\in\\Nstar$, $${lo}\\le n\\le${hi}$).`,
          `Theo \u0111\u1EC1: $(n-${d\u01B0})$ chia h\u1EBFt cho $${trio[0]}$, $${trio[1]}$, $${trio[2]}$ n\xEAn $n-${d\u01B0}\\in$ BC$(${trio.join(";")})$.`,
          `BCNN$(${trio.join(";")})=${L}$, do \u0111\xF3 $n-${d\u01B0}\\in\\{0;${L};${L * 2};${L * 3};\\dots\\}$.`,
          `Suy ra $n\\in\\{${d\u01B0};${L + d\u01B0};${L * 2 + d\u01B0};${L * 3 + d\u01B0};\\dots\\}$.`,
          `\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $${lo}\\le n\\le${hi}$ ta \u0111\u01B0\u1EE3c $n=${n}$.`,
          `V\u1EADy kh\u1ED1i 6 c\xF3 **${n} h\u1ECDc sinh**.`
        ],
        pitfall: "Qu\xEAn c\u1ED9ng l\u1EA1i ph\u1EA7n d\u01B0 sau khi t\xECm BCNN."
      };
    }
  },
  {
    id: "g6.so-nguyen-ss",
    topicId: "g6-t3",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "So s\xE1nh s\u1ED1 nguy\xEAn",
    build: (r) => {
      const nums = r.shuffle([-r.int(5, 20), -r.int(1, 4), 0, r.int(1, 15)]);
      const min = Math.min(...nums);
      const [options, answer] = mcOptions(r, String(min), nums.filter((x) => x !== min).map(String));
      return {
        stem: `Trong c\xE1c s\u1ED1 $${nums.join(";\\ ")}$, s\u1ED1 nh\u1ECF nh\u1EA5t l\xE0:`,
        options,
        answer,
        thinking: ["M\u1ECDi s\u1ED1 nguy\xEAn \xE2m \u0111\u1EC1u nh\u1ECF h\u01A1n 0 v\xE0 nh\u1ECF h\u01A1n m\u1ECDi s\u1ED1 nguy\xEAn d\u01B0\u01A1ng.", "Trong hai s\u1ED1 \xE2m, s\u1ED1 n\xE0o c\xF3 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\u1EDBn h\u01A1n th\xEC nh\u1ECF h\u01A1n."],
        solution: [`S\u1EAFp x\u1EBFp t\u0103ng d\u1EA7n: $${nums.slice().sort((a, b) => a - b).join("<")}$.`, `V\u1EADy s\u1ED1 nh\u1ECF nh\u1EA5t l\xE0 $${min}$.`],
        pitfall: "So s\xE1nh hai s\u1ED1 \xE2m theo \u0111\u1ED9 l\u1EDBn gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\xE0 l\u1ED7i ph\u1ED5 bi\u1EBFn nh\u1EA5t."
      };
    }
  },
  {
    id: "g6.so-nguyen-tinh",
    topicId: "g6-t3",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh h\u1EE3p l\xED v\u1EDBi s\u1ED1 nguy\xEAn",
    build: (r) => {
      const a = r.int(100, 300), b = r.int(50, 200);
      const c = r.int(20, 90), d = 100 - c;
      const val = -(a + b) + 100;
      return {
        stem: `T\xEDnh h\u1EE3p l\xED: $A=(-${a})+${c}+(-${b})+${d}$.`,
        answer: String(val),
        thinking: [`Nh\xF3m hai s\u1ED1 \xE2m l\u1EA1i; hai s\u1ED1 d\u01B0\u01A1ng $${c}+${d}=100$ tr\xF2n tr\u0103m.`],
        solution: [
          `$A=[(-${a})+(-${b})]+(${c}+${d})$`,
          `$A=(-${a + b})+100=${val}$.`
        ]
      };
    }
  },
  {
    id: "g6.so-nguyen-timx",
    topicId: "g6-t3",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x v\u1EDBi s\u1ED1 nguy\xEAn",
    build: (r) => {
      const x = r.int(-12, 12) || 5;
      const a = r.int(2, 6), b = r.int(1, 5);
      const c = r.int(-15, 15);
      const d = (a - b) * x + c;
      return {
        stem: `T\xECm s\u1ED1 nguy\xEAn $x$, bi\u1EBFt $${a}x${c >= 0 ? "+" : "-"}${Math.abs(c)}=${b}x${d >= 0 ? "+" : "-"}${Math.abs(d)}$.`,
        answer: String(x),
        thinking: ["Chuy\u1EC3n c\xE1c h\u1EA1ng t\u1EED ch\u1EE9a $x$ v\u1EC1 v\u1EBF tr\xE1i, h\u1EB1ng s\u1ED1 v\u1EC1 v\u1EBF ph\u1EA3i; nh\u1EDB \u0111\u1ED5i d\u1EA5u khi chuy\u1EC3n v\u1EBF."],
        solution: [
          `$${a}x-${b}x=${d}-(${c})$`,
          `$${a - b}x=${d - c}$`,
          `$x=${d - c}:${a - b}=${x}$.`,
          `Th\u1EED l\u1EA1i: $${a}\\cdot${x}${c >= 0 ? "+" : "-"}${Math.abs(c)}=${a * x + c}$ v\xE0 $${b}\\cdot${x}${d >= 0 ? "+" : "-"}${Math.abs(d)}=${b * x + d}$ (b\u1EB1ng nhau).`
        ],
        pitfall: "Chuy\u1EC3n v\u1EBF m\xE0 qu\xEAn \u0111\u1ED5i d\u1EA5u."
      };
    }
  },
  {
    id: "g6.phan-so-rutgon",
    topicId: "g6-t4",
    grade: 6,
    level: "NB",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "R\xFAt g\u1ECDn ph\xE2n s\u1ED1",
    build: (r) => {
      const k = r.int(3, 12);
      const [n0, d0] = [r.int(2, 9), r.int(2, 11)];
      const g = gcd(n0, d0);
      const n = n0 / g, d = d0 / g;
      if (d === 1) return { stem: "R\xFAt g\u1ECDn ph\xE2n s\u1ED1 $\\f{12}{18}$.", answer: "2/3", thinking: ["Mu\u1ED1n t\u1ED1i gi\u1EA3n, chia c\u1EA3 t\u1EED v\xE0 m\u1EABu cho **\u01AFCLN** c\u1EE7a ch\xFAng: \u01AFCLN$(12;18)=6$."], solution: ["$\\f{12}{18}=\\f{12:6}{18:6}=\\f{2}{3}$."] };
      return {
        stem: `R\xFAt g\u1ECDn ph\xE2n s\u1ED1 $\\f{${n * k}}{${d * k}}$ v\u1EC1 d\u1EA1ng t\u1ED1i gi\u1EA3n (nh\u1EADp theo d\u1EA1ng a/b).`,
        answer: `${n}/${d}`,
        thinking: [`T\xECm \u01AFCLN c\u1EE7a t\u1EED v\xE0 m\u1EABu: \u01AFCLN$(${n * k};${d * k})=${k}$.`],
        solution: [`$\\f{${n * k}}{${d * k}}=\\f{${n * k}:${k}}{${d * k}:${k}}=\\f{${n}}{${d}}$.`]
      };
    }
  },
  {
    id: "g6.phan-so-tinh",
    topicId: "g6-t4",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "C\u1ED9ng, tr\u1EEB ph\xE2n s\u1ED1 kh\xE1c m\u1EABu",
    build: (r) => {
      const b = r.int(3, 9), d = r.int(3, 12);
      const a = r.int(1, b - 1), c = r.int(1, d - 1);
      const num = a * d + c * b, den = b * d;
      const [rn, rd] = reduce(num, den);
      return {
        stem: `T\xEDnh $\\f{${a}}{${b}}+\\f{${c}}{${d}}$ (nh\u1EADp k\u1EBFt qu\u1EA3 t\u1ED1i gi\u1EA3n d\u1EA1ng a/b).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: [`M\u1EABu chung l\xE0 BCNN$(${b};${d})=${lcm(b, d)}$; \u1EDF \u0111\xE2y ta d\xF9ng $${b}\\cdot${d}=${den}$ r\u1ED3i r\xFAt g\u1ECDn.`],
        solution: [
          `$\\f{${a}}{${b}}+\\f{${c}}{${d}}=\\f{${a}\\cdot${d}+${c}\\cdot${b}}{${den}}=\\f{${num}}{${den}}$`,
          `$=${frac(num, den)}$.`
        ]
      };
    }
  },
  {
    id: "g6.phan-so-bt",
    topicId: "g6-t4",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n v\u1EC1 ph\xE2n s\u1ED1 \u2014 b\u1EABy \u201Cph\u1EA7n c\xF2n l\u1EA1i\u201D",
    build: (r) => {
      const b1 = r.pick([3, 4, 5]);
      const a1 = r.int(1, b1 - 1);
      const b2 = r.pick([2, 3, 4]);
      const remN = b1 - a1, remD = b1;
      const d2N = remN, d2D = b2 * remD;
      const d3N = remN * (b2 - 1), d3D = b2 * remD;
      const [pn, pd] = reduce(d3N, d3D);
      const unit = r.int(4, 20) * pn;
      const total = unit / pn * pd;
      return {
        stem: `M\u1ED9t quy\u1EC3n s\xE1ch, ng\xE0y \u0111\u1EA7u An \u0111\u1ECDc $\\f{${a1}}{${b1}}$ s\u1ED1 trang, ng\xE0y th\u1EE9 hai \u0111\u1ECDc $\\f{1}{${b2}}$ s\u1ED1 trang **c\xF2n l\u1EA1i**, ng\xE0y th\u1EE9 ba \u0111\u1ECDc n\u1ED1t $${unit}$ trang th\xEC h\u1EBFt quy\u1EC3n s\xE1ch. H\u1ECFi quy\u1EC3n s\xE1ch c\xF3 bao nhi\xEAu trang?`,
        answer: String(total),
        thinking: [
          "Ch\xFA \xFD c\u1EE5m \u201Cs\u1ED1 trang c\xF2n l\u1EA1i\u201D: m\u1ED1c so s\xE1nh c\u1EE7a ng\xE0y hai l\xE0 ph\u1EA7n ch\u01B0a \u0111\u1ECDc, kh\xF4ng ph\u1EA3i c\u1EA3 quy\u1EC3n.",
          "Quy m\u1ECDi ph\xE2n s\u1ED1 v\u1EC1 c\xF9ng m\u1ED9t m\u1ED1c l\xE0 **c\u1EA3 quy\u1EC3n s\xE1ch**, r\u1ED3i \u0111i ng\u01B0\u1EE3c t\u1EEB s\u1ED1 trang ng\xE0y ba."
        ],
        solution: [
          `Sau ng\xE0y \u0111\u1EA7u, ph\u1EA7n c\xF2n l\u1EA1i l\xE0 $1-\\f{${a1}}{${b1}}=${frac(remN, remD)}$ quy\u1EC3n s\xE1ch.`,
          `Ng\xE0y th\u1EE9 hai \u0111\u1ECDc $\\f{1}{${b2}}$ c\u1EE7a ph\u1EA7n c\xF2n l\u1EA1i, t\u1EE9c $\\f{1}{${b2}}\\cdot${frac(remN, remD)}=${frac(d2N, d2D)}$ quy\u1EC3n s\xE1ch.`,
          `Ng\xE0y th\u1EE9 ba \u0111\u1ECDc: $${frac(remN, remD)}-${frac(d2N, d2D)}=${frac(pn, pd)}$ quy\u1EC3n s\xE1ch, \u1EE9ng v\u1EDBi $${unit}$ trang.`,
          `S\u1ED1 trang quy\u1EC3n s\xE1ch: $${unit}:${frac(pn, pd)}=${unit}\\cdot\\f{${pd}}{${pn}}=${total}$ (trang).`,
          `V\u1EADy quy\u1EC3n s\xE1ch c\xF3 **${total} trang**.`
        ],
        pitfall: "B\u1EABy \u201Cph\u1EA7n c\xF2n l\u1EA1i\u201D \u2014 n\u1EBFu l\u1EA5y $\\f{1}{b}$ c\u1EE7a c\u1EA3 quy\u1EC3n l\xE0 sai ngay t\u1EEB d\xF2ng \u0111\u1EA7u."
      };
    }
  },
  {
    id: "g6.phan-so-day",
    topicId: "g6-t4",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u1ED5ng d\xE3y ph\xE2n s\u1ED1 c\xF3 quy lu\u1EADt",
    build: (r) => {
      const a = r.int(2, 5), b = r.int(20, 60);
      const num = b + 1 - a, den = a * (b + 1);
      const [rn, rd] = reduce(num, den);
      return {
        stem: `T\xEDnh t\u1ED5ng $S=\\f{1}{${a}\\cdot${a + 1}}+\\f{1}{${a + 1}\\cdot${a + 2}}+\\dots+\\f{1}{${b}\\cdot${b + 1}}$ (nh\u1EADp k\u1EBFt qu\u1EA3 t\u1ED1i gi\u1EA3n d\u1EA1ng a/b).`,
        answer: `${rn}/${rd}`,
        thinking: [
          "M\u1EABu c\xF3 d\u1EA1ng $n(n+1)$ \u2192 d\xF9ng c\xF4ng th\u1EE9c sai ph\xE2n $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$.",
          "Sau khi t\xE1ch, c\xE1c s\u1ED1 h\u1EA1ng gi\u1EEFa tri\u1EC7t ti\xEAu t\u1EEBng \u0111\xF4i m\u1ED9t."
        ],
        solution: [
          `$S=\\left(\\f{1}{${a}}-\\f{1}{${a + 1}}\\right)+\\left(\\f{1}{${a + 1}}-\\f{1}{${a + 2}}\\right)+\\dots+\\left(\\f{1}{${b}}-\\f{1}{${b + 1}}\\right)$`,
          `C\xE1c s\u1ED1 h\u1EA1ng \u1EDF gi\u1EEFa tri\u1EC7t ti\xEAu, c\xF2n l\u1EA1i $S=\\f{1}{${a}}-\\f{1}{${b + 1}}$.`,
          `$S=\\f{${b + 1}-${a}}{${den}}=${frac(num, den)}$.`
        ]
      };
    }
  },
  {
    id: "g6.phan-tram",
    topicId: "g6-t5",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m",
    build: (r) => {
      const total = r.pick([40, 50, 25, 80, 20, 200]);
      const part = Math.round(total * r.pick([0.15, 0.2, 0.25, 0.35, 0.4, 0.6]));
      const pct = part / total * 100;
      return {
        stem: `L\u1EDBp 6A c\xF3 $${total}$ h\u1ECDc sinh, trong \u0111\xF3 c\xF3 $${part}$ h\u1ECDc sinh gi\u1ECFi. H\u1ECFi h\u1ECDc sinh gi\u1ECFi chi\u1EBFm bao nhi\xEAu ph\u1EA7n tr\u0103m s\u1ED1 h\u1ECDc sinh c\u1EA3 l\u1EDBp? (Nh\u1EADp s\u1ED1, kh\xF4ng k\xE8m d\u1EA5u %.)`,
        answer: String(Math.round(pct * 100) / 100),
        thinking: ["To\xE0n th\u1EC3 l\xE0 s\u1ED1 h\u1ECDc sinh c\u1EA3 l\u1EDBp; ph\u1EA7n l\xE0 s\u1ED1 h\u1ECDc sinh gi\u1ECFi \u2192 l\u1EA5y ph\u1EA7n chia to\xE0n th\u1EC3 r\u1ED3i nh\xE2n 100%."],
        solution: [`T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m $=\\f{${part}}{${total}}\\cdot100\\percent=${Math.round(pct * 100) / 100}\\percent$.`]
      };
    }
  },
  {
    id: "g6.giam-gia",
    topicId: "g6-t5",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n gi\u1EA3m gi\xE1 li\xEAn ti\u1EBFp",
    build: (r) => {
      const price = r.pick([5e5, 8e5, 6e5, 12e5, 4e5]);
      const m = r.pick([10, 20, 25]), n = r.pick([5, 10, 20]);
      const p1 = price * (1 - m / 100);
      const p2 = p1 * (1 - n / 100);
      return {
        stem: `M\u1ED9t chi\u1EBFc \xE1o c\xF3 gi\xE1 ni\xEAm y\u1EBFt $${price.toLocaleString("vi-VN")}$ \u0111\u1ED3ng, \u0111\u01B0\u1EE3c gi\u1EA3m $${m}\\percent$. Sau \u0111\xF3 c\u1EEDa h\xE0ng gi\u1EA3m th\xEAm $${n}\\percent$ tr\xEAn gi\xE1 \u0111\xE3 gi\u1EA3m. T\xEDnh gi\xE1 cu\u1ED1i c\xF9ng c\u1EE7a chi\u1EBFc \xE1o (\u0111\u01A1n v\u1ECB: \u0111\u1ED3ng).`,
        answer: String(Math.round(p2)),
        thinking: [
          "Hai l\u1EA7n gi\u1EA3m li\xEAn ti\u1EBFp \u2192 nh\xE2n hai h\u1EC7 s\u1ED1, KH\xD4NG c\u1ED9ng d\u1ED3n hai ph\u1EA7n tr\u0103m.",
          "L\u1EA7n gi\u1EA3m th\u1EE9 hai t\xEDnh tr\xEAn gi\xE1 \u0111\xE3 gi\u1EA3m, kh\xF4ng ph\u1EA3i gi\xE1 g\u1ED1c."
        ],
        solution: [
          `Gi\xE1 sau l\u1EA7n gi\u1EA3m th\u1EE9 nh\u1EA5t: $${price.toLocaleString("vi-VN")}\\cdot(1-\\f{${m}}{100})=${p1.toLocaleString("vi-VN")}$ (\u0111\u1ED3ng).`,
          `Gi\xE1 sau l\u1EA7n gi\u1EA3m th\u1EE9 hai: $${p1.toLocaleString("vi-VN")}\\cdot(1-\\f{${n}}{100})=${Math.round(p2).toLocaleString("vi-VN")}$ (\u0111\u1ED3ng).`,
          `L\u01B0u \xFD: t\u1ED5ng m\u1EE9c gi\u1EA3m l\xE0 $100\\percent-${Math.round(p2 / price * 100)}\\percent=${100 - Math.round(p2 / price * 100)}\\percent$, **kh\xF4ng** ph\u1EA3i $${m + n}\\percent$.`
        ],
        pitfall: `Gi\u1EA3m ${m}% r\u1ED3i gi\u1EA3m ti\u1EBFp ${n}% kh\xF4ng b\u1EB1ng gi\u1EA3m ${m + n}%.`
      };
    }
  },
  {
    id: "g6.chu-vi-dien-tich",
    topicId: "g6-t6",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Chu vi \u2014 di\u1EC7n t\xEDch h\xECnh c\u01A1 b\u1EA3n",
    build: (r) => {
      const a = r.int(8, 30), num = r.int(1, 3), den = num + r.int(1, 2);
      const b = Math.round(a * num / den) || 5;
      const kind = r.pick(["S", "C"]);
      const S = a * b, C = 2 * (a + b);
      return {
        stem: `M\u1ED9t m\u1EA3nh v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $${a}\\,m$ v\xE0 chi\u1EC1u r\u1ED9ng $${b}\\,m$. T\xEDnh ${kind === "S" ? "di\u1EC7n t\xEDch" : "chu vi"} m\u1EA3nh v\u01B0\u1EDDn (\u0111\u01A1n v\u1ECB: ${kind === "S" ? "m\xB2" : "m"}).`,
        answer: String(kind === "S" ? S : C),
        thinking: ["X\xE1c \u0111\u1ECBnh \u0111\xFAng c\xF4ng th\u1EE9c: $S=ab$ v\xE0 $C=2(a+b)$."],
        solution: kind === "S" ? [`$S=${a}\\cdot${b}=${S}\\ (m^{2})$.`] : [`$C=2(${a}+${b})=2\\cdot${a + b}=${C}\\ (m)$.`]
      };
    }
  },
  {
    id: "g6.hinh-thuc-te",
    topicId: "g6-t6",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "B\xE0i to\xE1n l\xE1t g\u1EA1ch \u2014 b\u1EABy \u0111\u1ED5i \u0111\u01A1n v\u1ECB",
    build: (r) => {
      const side = r.pick([20, 25, 30, 40, 50]);
      const s = side / 100;
      const k1 = r.int(4, 12), k2 = r.int(3, 10);
      const L = k1 * s * r.int(1, 3), W = k2 * s * r.int(1, 3);
      const n = Math.round(L * W / (s * s));
      return {
        stem: `N\u1EC1n m\u1ED9t c\u0103n ph\xF2ng h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $${L}\\,m$, chi\u1EC1u r\u1ED9ng $${W}\\,m$. Ng\u01B0\u1EDDi ta l\xE1t n\u1EC1n b\u1EB1ng nh\u1EEFng vi\xEAn g\u1EA1ch h\xECnh vu\xF4ng c\u1EA1nh $${side}\\,cm$. H\u1ECFi c\u1EA7n bao nhi\xEAu vi\xEAn g\u1EA1ch (coi m\u1EA1ch v\u1EEFa kh\xF4ng \u0111\xE1ng k\u1EC3)?`,
        answer: String(n),
        thinking: [
          "\u0110\u01A1n v\u1ECB kh\xE1c nhau: ph\xF2ng t\xEDnh b\u1EB1ng m\xE9t, g\u1EA1ch t\xEDnh b\u1EB1ng x\u0103ng-ti-m\xE9t \u2192 ph\u1EA3i \u0111\u1ED5i tr\u01B0\u1EDBc.",
          "S\u1ED1 vi\xEAn g\u1EA1ch = di\u1EC7n t\xEDch n\u1EC1n chia di\u1EC7n t\xEDch m\u1ED9t vi\xEAn."
        ],
        solution: [
          `\u0110\u1ED5i $${side}\\,cm=${s}\\,m$.`,
          `Di\u1EC7n t\xEDch n\u1EC1n: $${L}\\cdot${W}=${Math.round(L * W * 1e4) / 1e4}\\ (m^{2})$.`,
          `Di\u1EC7n t\xEDch m\u1ED9t vi\xEAn g\u1EA1ch: $${s}\\cdot${s}=${Math.round(s * s * 1e4) / 1e4}\\ (m^{2})$.`,
          `S\u1ED1 vi\xEAn g\u1EA1ch: $${Math.round(L * W * 1e4) / 1e4}:${Math.round(s * s * 1e4) / 1e4}=${n}$ (vi\xEAn).`
        ],
        pitfall: "Kh\xF4ng \u0111\u1ED5i \u0111\u01A1n v\u1ECB tr\u01B0\u1EDBc khi chia \u2014 b\u1EABy kinh \u0111i\u1EC3n c\u1EE7a l\u1EDBp 6."
      };
    }
  },
  {
    id: "g6.doan-thang",
    topicId: "g6-t7",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng",
    build: (r) => {
      const oa = r.int(2, 8), ab = r.int(2, 8), ob = oa + ab;
      return {
        stem: `Tr\xEAn tia $Ox$ l\u1EA5y hai \u0111i\u1EC3m $A$ v\xE0 $B$ sao cho $OA=${oa}\\,cm$, $OB=${ob}\\,cm$. T\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng $AB$ (\u0111\u01A1n v\u1ECB: cm).`,
        answer: String(ab),
        thinking: ["Hai \u0111i\u1EC3m c\xF9ng thu\u1ED9c tia $Ox$; \u0111i\u1EC3m n\xE0o g\u1EA7n g\u1ED1c h\u01A1n th\xEC n\u1EB1m gi\u1EEFa."],
        solution: [
          `V\xEC $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA<OB$ ($${oa}<${ob}$) n\xEAn \u0111i\u1EC3m $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$.`,
          `Do \u0111\xF3 $OA+AB=OB$.`,
          `$AB=OB-OA=${ob}-${oa}=${ab}\\ (cm)$.`
        ],
        pitfall: "Ph\u1EA3i l\u1EADp lu\u1EADn \u201C\u0111i\u1EC3m n\u1EB1m gi\u1EEFa\u201D tr\u01B0\u1EDBc khi d\xF9ng h\u1EC7 th\u1EE9c c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng."
      };
    }
  },
  {
    id: "g6.goc",
    topicId: "g6-t7",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\xEDnh s\u1ED1 \u0111o g\xF3c",
    build: (r) => {
      const xOz = r.int(80, 170), xOy = r.int(25, xOz - 20);
      return {
        stem: `Cho $\\angle xOz=${xOz}\\deg$, tia $Oy$ n\u1EB1m gi\u1EEFa hai tia $Ox$ v\xE0 $Oz$, bi\u1EBFt $\\angle xOy=${xOy}\\deg$. T\xEDnh s\u1ED1 \u0111o g\xF3c $\\angle yOz$ (nh\u1EADp s\u1ED1 \u0111o theo \u0111\u1ED9).`,
        answer: String(xOz - xOy),
        thinking: ["Tia $Oy$ n\u1EB1m gi\u1EEFa \u2192 d\xF9ng h\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c."],
        solution: [
          `V\xEC tia $Oy$ n\u1EB1m gi\u1EEFa hai tia $Ox$, $Oz$ n\xEAn $\\angle xOy+\\angle yOz=\\angle xOz$.`,
          `$\\angle yOz=${xOz}\\deg-${xOy}\\deg=${xOz - xOy}\\deg$.`
        ]
      };
    }
  },
  {
    id: "g6.xac-suat",
    topicId: "g6-t8",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
    build: (r) => {
      const total = r.pick([20, 25, 40, 50, 100]);
      const hit = r.int(3, Math.floor(total / 2));
      const [n, d] = reduce(hit, total);
      return {
        stem: `Gieo m\u1ED9t con x\xFAc x\u1EAFc $${total}$ l\u1EA7n th\xEC m\u1EB7t 6 ch\u1EA5m xu\u1EA5t hi\u1EC7n $${hit}$ l\u1EA7n. T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a s\u1EF1 ki\u1EC7n \u201Cgieo \u0111\u01B0\u1EE3c m\u1EB7t 6 ch\u1EA5m\u201D (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        accept: [String(Math.round(hit / total * 1e4) / 1e4)],
        thinking: ["\xC1p d\u1EE5ng tr\u1EF1c ti\u1EBFp \u0111\u1ECBnh ngh\u0129a: s\u1ED1 l\u1EA7n x\u1EA3y ra chia t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n."],
        solution: [`X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m $=\\f{${hit}}{${total}}=${frac(hit, total)}$.`]
      };
    }
  },
  {
    id: "g6.thong-ke",
    topicId: "g6-t8",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "THONG_KE_XS",
    tag: "\u0110\u1ECDc bi\u1EC3u \u0111\u1ED3 c\u1ED9t",
    build: (r) => {
      const sports = ["B\xF3ng \u0111\xE1", "C\u1EA7u l\xF4ng", "B\xF3ng r\u1ED5", "B\u01A1i l\u1ED9i"];
      const vals = sports.map(() => r.int(4, 20));
      const mx = Math.max(...vals);
      const best = sports[vals.indexOf(mx)];
      const [options, answer] = mcOptions(r, best, sports.filter((s) => s !== best));
      return {
        stem: `Bi\u1EC3u \u0111\u1ED3 c\u1ED9t ghi l\u1EA1i s\u1ED1 h\u1ECDc sinh y\xEAu th\xEDch c\xE1c m\xF4n th\u1EC3 thao c\u1EE7a l\u1EDBp 6A: ${sports.map((s, i) => `${s}: ${vals[i]}`).join("; ")}. M\xF4n th\u1EC3 thao n\xE0o \u0111\u01B0\u1EE3c nhi\u1EC1u h\u1ECDc sinh y\xEAu th\xEDch nh\u1EA5t?`,
        options,
        answer,
        thinking: ["T\xECm c\u1ED9t c\xF3 s\u1ED1 li\u1EC7u l\u1EDBn nh\u1EA5t."],
        solution: [`S\u1ED1 li\u1EC7u l\u1EDBn nh\u1EA5t l\xE0 $${mx}$, \u1EE9ng v\u1EDBi m\xF4n **${best}**.`, `T\u1ED5ng s\u1ED1 h\u1ECDc sinh c\u1EA3 l\u1EDBp: $${vals.join("+")}=${vals.reduce((a, b) => a + b, 0)}$.`]
      };
    }
  },
  {
    id: "g6.tu-luan-1",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 b\xE0i to\xE1n \u01AFCLN/BCNN",
    build: (r) => {
      const trio = r.pick([[24, 36], [18, 30], [40, 60], [45, 75]]);
      const g = gcd(trio[0], trio[1]);
      const L = lcm(trio[0], trio[1]);
      return {
        stem: `a) T\xECm \u01AFCLN$(${trio[0]};${trio[1]})$ v\xE0 BCNN$(${trio[0]};${trio[1]})$.

b) Ki\u1EC3m tra l\u1EA1i k\u1EBFt qu\u1EA3 b\u1EB1ng h\u1EC7 th\u1EE9c \u01AFCLN$\\cdot$BCNN$=$ t\xEDch hai s\u1ED1.`,
        answer: "",
        rubric: [
          { criterion: `Ph\xE2n t\xEDch \u0111\xFAng $${trio[0]}$ v\xE0 $${trio[1]}$ ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1`, points: 1 },
          { criterion: `T\xEDnh \u0111\xFAng \u01AFCLN $=${g}$ (chung, m\u0169 nh\u1ECF nh\u1EA5t)`, points: 1 },
          { criterion: `T\xEDnh \u0111\xFAng BCNN $=${L}$ (chung v\xE0 ri\xEAng, m\u0169 l\u1EDBn nh\u1EA5t)`, points: 1 },
          { criterion: `Ki\u1EC3m tra \u0111\xFAng: $${g}\\cdot${L}=${trio[0]}\\cdot${trio[1]}=${trio[0] * trio[1]}$`, points: 1 }
        ],
        thinking: ["Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 l\xE0 b\u01B0\u1EDBc b\u1EAFt bu\u1ED9c; sau \u0111\xF3 ch\u1EC9 vi\u1EC7c ch\u1ECDn th\u1EEBa s\u1ED1 theo quy t\u1EAFc."],
        solution: [
          `$${trio[0]}=${factorize(trio[0]).map(([p, e]) => e === 1 ? `${p}` : `${p}^{${e}}`).join("\\cdot")}$ ; $${trio[1]}=${factorize(trio[1]).map(([p, e]) => e === 1 ? `${p}` : `${p}^{${e}}`).join("\\cdot")}$.`,
          `\u01AFCLN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung** v\u1EDBi s\u1ED1 m\u0169 **nh\u1ECF nh\u1EA5t** \u2192 \u01AFCLN$=${g}$.`,
          `BCNN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung v\xE0 ri\xEAng** v\u1EDBi s\u1ED1 m\u0169 **l\u1EDBn nh\u1EA5t** \u2192 BCNN$=${L}$.`,
          `Ki\u1EC3m tra: $${g}\\cdot${L}=${g * L}$ v\xE0 $${trio[0]}\\cdot${trio[1]}=${trio[0] * trio[1]}$ \u2014 b\u1EB1ng nhau, k\u1EBFt qu\u1EA3 \u0111\xFAng.`
        ]
      };
    }
  }
];

// src/bank/g7.ts
var BANK_G7 = [
  {
    id: "g7.so-huu-ti",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh h\u1EE3p l\xED s\u1ED1 h\u1EEFu t\u1EC9",
    build: (r) => {
      const b = r.int(3, 11), a = r.int(1, b - 1);
      const d = r.int(3, 13), c = r.int(1, d - 1), e = d - c;
      return {
        stem: `T\xEDnh h\u1EE3p l\xED: $A=\\f{${a}}{${b}}\\cdot\\f{${c}}{${d}}+\\f{${a}}{${b}}\\cdot\\f{${e}}{${d}}$ (nh\u1EADp k\u1EBFt qu\u1EA3 t\u1ED1i gi\u1EA3n d\u1EA1ng a/b).`,
        answer: `${a}/${b}`,
        thinking: [`Hai h\u1EA1ng t\u1EED \u0111\u1EC1u ch\u1EE9a $\\f{${a}}{${b}}$ \u2192 \u0111\u1EB7t l\xE0m nh\xE2n t\u1EED chung.`, `Trong ngo\u1EB7c: $\\f{${c}}{${d}}+\\f{${e}}{${d}}=\\f{${d}}{${d}}=1$.`],
        solution: [
          `$A=\\f{${a}}{${b}}\\left(\\f{${c}}{${d}}+\\f{${e}}{${d}}\\right)$`,
          `$A=\\f{${a}}{${b}}\\cdot1=\\f{${a}}{${b}}$.`
        ]
      };
    }
  },
  {
    id: "g7.luy-thua",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "L\u0169y th\u1EEBa \u2014 \u0111\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1",
    build: (r) => {
      const p = r.pick([2, 3, 5]);
      const m = r.int(2, 4), k = r.int(2, 4);
      const q = r.int(3, 9);
      const e = m * k + q;
      const correct = `${p}^{${e}}`;
      const [options, answer] = mcOptions(r, correct, [`${p}^{${m + k + q}}`, `${p}^{${m * k * q}}`, `${p}^{${e - 1}}`]);
      return {
        stem: `R\xFAt g\u1ECDn $\\left(${p}^{${m}}\\right)^{${k}}\\cdot${p}^{${q}}$ ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: ["L\u0169y th\u1EEBa c\u1EE7a l\u0169y th\u1EEBa th\xEC NH\xC2N s\u1ED1 m\u0169; nh\xE2n hai l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 th\xEC C\u1ED8NG s\u1ED1 m\u0169."],
        solution: [
          `$\\left(${p}^{${m}}\\right)^{${k}}=${p}^{${m}\\cdot${k}}=${p}^{${m * k}}$.`,
          `$${p}^{${m * k}}\\cdot${p}^{${q}}=${p}^{${m * k}+${q}}=${p}^{${e}}$.`
        ],
        pitfall: `Nh\u1EA7m $(x^{m})^{n}=x^{mn}$ v\u1EDBi $x^{m}\\cdot x^{n}=x^{m+n}$.`
      };
    }
  },
  {
    id: "g7.gttd",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.int(2, 5), b = r.int(1, 9);
      const k = r.int(2, 4), c = r.int(1, 12);
      const v = r.int(2, 9);
      const rhs = k * v + c;
      const x1 = (v + b) / a, x2 = (b - v) / a;
      const f = (x) => Number.isInteger(x) ? String(x) : `${reduce(x * a, a)[0]}/${a}`;
      const s1 = Number.isInteger(x1) ? String(x1) : `${v + b}/${a}`;
      const s2 = Number.isInteger(x2) ? String(x2) : `${b - v}/${a}`;
      void f;
      return {
        stem: `T\xECm $x$, bi\u1EBFt $${k}\\abs{${a}x-${b}}-${c}=${rhs - 2 * c}$. (N\u1EBFu c\xF3 nhi\u1EC1u gi\xE1 tr\u1ECB, nh\u1EADp c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: `${s1},${s2}`,
        accept: [`${s2},${s1}`],
        thinking: [
          "B\u01B0\u1EDBc 1: c\xF4 l\u1EADp d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i v\u1EC1 m\u1ED9t v\u1EBF.",
          "B\u01B0\u1EDBc 2: ki\u1EC3m tra v\u1EBF ph\u1EA3i kh\xF4ng \xE2m.",
          "B\u01B0\u1EDBc 3: t\xE1ch hai tr\u01B0\u1EDDng h\u1EE3p \u2014 \u0111\xE2y l\xE0 n\u01A1i r\u1EA5t nhi\u1EC1u b\u1EA1n qu\xEAn nh\xE1nh \xE2m."
        ],
        solution: [
          `$${k}\\abs{${a}x-${b}}=${rhs - 2 * c}+${c}=${rhs - c}$.`,
          `$\\abs{${a}x-${b}}=${(rhs - c) / k}=${v}$.`,
          `TH1: $${a}x-${b}=${v}\\Rightarrow ${a}x=${v + b}\\Rightarrow x=${s1}$.`,
          `TH2: $${a}x-${b}=-${v}\\Rightarrow ${a}x=${b - v}\\Rightarrow x=${s2}$.`,
          `V\u1EADy $x\\in\\{${s1};${s2}\\}$.`
        ],
        pitfall: "Qu\xEAn nh\xE1nh \xE2m l\xE0 m\u1EA5t m\u1ED9t n\u1EEDa s\u1ED1 \u0111i\u1EC3m."
      };
    }
  },
  {
    id: "g7.can-bac-hai",
    topicId: "g7-t1",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc",
    build: (r) => {
      const n = r.int(4, 20);
      const sq = n * n;
      const [options, answer] = mcOptions(r, String(n), [String(-n), `${n}$ v\xE0 $${-n}`, String(sq / 2)]);
      return {
        stem: `C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc c\u1EE7a $${sq}$ l\xE0:`,
        options,
        answer,
        thinking: ["C\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB kh\xF4ng \xE2m."],
        solution: [`$\\s{${sq}}=${n}$ v\xEC $${n}\\ge0$ v\xE0 $${n}^{2}=${sq}$.`],
        pitfall: `$\\s{${sq}}=${n}$ (ch\u1EC9 m\u1ED9t gi\xE1 tr\u1ECB), nh\u01B0ng $x^{2}=${sq}$ th\xEC $x=\\pm${n}$ (hai gi\xE1 tr\u1ECB).`
      };
    }
  },
  {
    id: "g7.ti-le-thuc",
    topicId: "g7-t2",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u1EC9 l\u1EC7 th\u1EE9c \u2014 t\xECm x, y theo t\u1ED5ng",
    build: (r) => {
      const m = r.int(2, 7), n = r.int(2, 9);
      const t = r.int(3, 12);
      const sum = (m + n) * t;
      return {
        stem: `T\xECm hai s\u1ED1 $x$, $y$ bi\u1EBFt $\\f{x}{${m}}=\\f{y}{${n}}$ v\xE0 $x+y=${sum}$. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${m * t},${n * t}`,
        thinking: ["C\xF3 T\u1ED4NG \u2192 d\xF9ng ngay t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: c\u1ED9ng t\u1EED, c\u1ED9ng m\u1EABu."],
        solution: [
          `$\\f{x}{${m}}=\\f{y}{${n}}=\\f{x+y}{${m}+${n}}=\\f{${sum}}{${m + n}}=${t}$.`,
          `$x=${m}\\cdot${t}=${m * t}$ ; $y=${n}\\cdot${t}=${n * t}$.`
        ]
      };
    }
  },
  {
    id: "g7.day-ti-so",
    topicId: "g7-t2",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n chia t\u1EC9 l\u1EC7 (theo hi\u1EC7u)",
    build: (r) => {
      const [p, q, s] = r.shuffle([3, 4, 5, 6, 7]).slice(0, 3).sort((a, b) => a - b);
      const t = r.int(4, 15);
      const diff = (s - p) * t;
      const obj = r.pick(["tr\u1ED3ng c\xE2y", "quy\xEAn g\xF3p s\xE1ch", "thu gom gi\u1EA5y v\u1EE5n"]);
      return {
        stem: `Ba l\u1EDBp 7A, 7B, 7C c\xF9ng ${obj}. S\u1ED1 l\u01B0\u1EE3ng c\u1EE7a ba l\u1EDBp l\u1EA7n l\u01B0\u1EE3t t\u1EC9 l\u1EC7 v\u1EDBi $${p};${q};${s}$. Bi\u1EBFt l\u1EDBp 7C nhi\u1EC1u h\u01A1n l\u1EDBp 7A l\xE0 $${diff}$. T\xEDnh s\u1ED1 l\u01B0\u1EE3ng c\u1EE7a m\u1ED7i l\u1EDBp. (Nh\u1EADp theo d\u1EA1ng a,b,c.)`,
        answer: `${p * t},${q * t},${s * t}`,
        thinking: [
          "\u201CT\u1EC9 l\u1EC7 v\u1EDBi\u201D \u2192 d\u1EF1ng d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau.",
          "D\u1EEF ki\u1EC7n l\xE0 HI\u1EC6U \u2192 d\xF9ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau v\u1EDBi ph\xE9p tr\u1EEB."
        ],
        solution: [
          `G\u1ECDi s\u1ED1 l\u01B0\u1EE3ng c\u1EE7a ba l\u1EDBp l\u1EA7n l\u01B0\u1EE3t l\xE0 $a$, $b$, $c$ ($a,b,c\\in\\Nstar$).`,
          `Theo \u0111\u1EC1: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ v\xE0 $c-a=${diff}$.`,
          `$\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}=\\f{c-a}{${s}-${p}}=\\f{${diff}}{${s - p}}=${t}$.`,
          `$a=${p * t}$ ; $b=${q * t}$ ; $c=${s * t}$.`
        ]
      };
    }
  },
  {
    id: "g7.ti-le-nghich",
    topicId: "g7-t2",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "\u0110\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 ngh\u1ECBch",
    build: (r) => {
      const v1 = r.pick([40, 45, 50, 60]);
      const t1 = r.pick([2, 3, 4, 6]);
      const s = v1 * t1;
      const v2 = r.pick([30, 60, 75, 80, 90]).valueOf();
      const v2ok = s % v2 === 0 ? v2 : s % 40 === 0 ? 40 : v1;
      const t2 = s / v2ok;
      return {
        stem: `M\u1ED9t \xF4 t\xF4 \u0111i t\u1EEB A \u0111\u1EBFn B v\u1EDBi v\u1EADn t\u1ED1c $${v1}\\,km/h$ th\xEC h\u1EBFt $${t1}$ gi\u1EDD. H\u1ECFi n\u1EBFu \u0111i v\u1EDBi v\u1EADn t\u1ED1c $${v2ok}\\,km/h$ th\xEC h\u1EBFt bao nhi\xEAu gi\u1EDD? (Qu\xE3ng \u0111\u01B0\u1EDDng kh\xF4ng \u0111\u1ED5i.)`,
        answer: String(Math.round(t2 * 100) / 100),
        thinking: [
          "Qu\xE3ng \u0111\u01B0\u1EDDng kh\xF4ng \u0111\u1ED5i \u2192 v\u1EADn t\u1ED1c v\xE0 th\u1EDDi gian l\xE0 hai \u0111\u1EA1i l\u01B0\u1EE3ng T\u1EC8 L\u1EC6 NGH\u1ECACH.",
          "D\xF9ng $v_1t_1=v_2t_2$."
        ],
        solution: [
          `Qu\xE3ng \u0111\u01B0\u1EDDng AB: $s=${v1}\\cdot${t1}=${s}$ (km).`,
          `V\xEC $s$ kh\xF4ng \u0111\u1ED5i n\xEAn $v$ v\xE0 $t$ t\u1EC9 l\u1EC7 ngh\u1ECBch: $${v1}\\cdot${t1}=${v2ok}\\cdot t_2$.`,
          `$t_2=\\f{${s}}{${v2ok}}=${Math.round(t2 * 100) / 100}$ (gi\u1EDD).`
        ],
        pitfall: "V\u1EADn t\u1ED1c t\u0103ng th\xEC th\u1EDDi gian gi\u1EA3m \u2014 n\u1EBFu ra k\u1EBFt qu\u1EA3 ng\u01B0\u1EE3c chi\u1EC1u l\xE0 \u0111\xE3 nh\u1EA7m sang t\u1EC9 l\u1EC7 thu\u1EADn."
      };
    }
  },
  {
    id: "g7.da-thuc-thugon",
    topicId: "g7-t3",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Thu g\u1ECDn \u0111a th\u1EE9c, x\xE1c \u0111\u1ECBnh b\u1EADc",
    build: (r) => {
      const c3 = r.int(-5, 5) || 2;
      const a = r.int(1, 6), b = r.int(1, 6);
      const c1 = r.int(-7, 7), c0 = r.int(-9, 9);
      const deg = 3;
      const [options, answer] = mcOptions(r, String(deg), ["2", "4", "5"]);
      return {
        stem: `Cho \u0111a th\u1EE9c $P(x)=${a}x^{2}${c3 >= 0 ? "+" : "-"}${Math.abs(c3)}x^{3}+${b}x^{2}${c1 >= 0 ? "+" : "-"}${Math.abs(c1)}x${c0 >= 0 ? "+" : "-"}${Math.abs(c0)}$. Sau khi thu g\u1ECDn, b\u1EADc c\u1EE7a $P(x)$ l\xE0:`,
        options,
        answer,
        thinking: ["Ph\u1EA3i THU G\u1ECCN tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi x\xE1c \u0111\u1ECBnh b\u1EADc."],
        solution: [
          `Thu g\u1ECDn: $P(x)=${c3}x^{3}+${a + b}x^{2}${c1 >= 0 ? "+" : "-"}${Math.abs(c1)}x${c0 >= 0 ? "+" : "-"}${Math.abs(c0)}$.`,
          `H\u1EA1ng t\u1EED c\xF3 b\u1EADc cao nh\u1EA5t l\xE0 $${c3}x^{3}$ n\xEAn b\u1EADc c\u1EE7a $P(x)$ l\xE0 3.`
        ]
      };
    }
  },
  {
    id: "g7.da-thuc-tinh",
    topicId: "g7-t3",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh gi\xE1 tr\u1ECB \u0111a th\u1EE9c",
    build: (r) => {
      const a = r.int(1, 5), b = r.int(-6, 6), c = r.int(-9, 9);
      const x = r.int(-4, 4);
      const val = a * x * x + b * x + c;
      return {
        stem: `Cho $P(x)=${a}x^{2}${b >= 0 ? "+" : "-"}${Math.abs(b)}x${c >= 0 ? "+" : "-"}${Math.abs(c)}$. T\xEDnh $P(${x})$.`,
        answer: String(val),
        thinking: ["Thay gi\xE1 tr\u1ECB c\u1EE7a $x$ v\xE0o, ch\xFA \xFD d\u1EA5u ngo\u1EB7c khi $x$ \xE2m."],
        solution: [
          `$P(${x})=${a}\\cdot(${x})^{2}${b >= 0 ? "+" : "-"}${Math.abs(b)}\\cdot(${x})${c >= 0 ? "+" : "-"}${Math.abs(c)}$`,
          `$=${a * x * x}${b * x >= 0 ? "+" : "-"}${Math.abs(b * x)}${c >= 0 ? "+" : "-"}${Math.abs(c)}=${val}$.`
        ],
        pitfall: `Khi $x$ \xE2m ph\u1EA3i vi\u1EBFt $(${x})^{2}$ c\xF3 ngo\u1EB7c, n\u1EBFu kh\xF4ng s\u1EBD sai d\u1EA5u.`
      };
    }
  },
  {
    id: "g7.nghiem-da-thuc",
    topicId: "g7-t3",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm tham s\u1ED1 \u0111\u1EC3 x = a l\xE0 nghi\u1EC7m",
    build: (r) => {
      const x0 = r.int(-3, 3) || 2;
      const c = r.int(-10, 10);
      const k = x0 * x0 + c;
      const m = k % x0 === 0 ? k / x0 - 1 : null;
      if (m === null) {
        return {
          stem: `T\xECm $m$ \u0111\u1EC3 \u0111a th\u1EE9c $P(x)=x^{2}-(m+1)x+6$ nh\u1EADn $x=2$ l\xE0m nghi\u1EC7m.`,
          answer: "4",
          thinking: ["$x=2$ l\xE0 nghi\u1EC7m ngh\u0129a l\xE0 $P(2)=0$ \u2014 thay v\xE0o r\u1ED3i gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t theo $m$."],
          solution: ["$P(2)=4-2(m+1)+6=0\\Rightarrow 8-2m=0\\Rightarrow m=4$."]
        };
      }
      return {
        stem: `T\xECm $m$ \u0111\u1EC3 \u0111a th\u1EE9c $P(x)=x^{2}-(m+1)x${c >= 0 ? "+" : "-"}${Math.abs(c)}$ nh\u1EADn $x=${x0}$ l\xE0m nghi\u1EC7m.`,
        answer: String(m),
        thinking: [`$x=${x0}$ l\xE0 nghi\u1EC7m ngh\u0129a l\xE0 $P(${x0})=0$ \u2014 thay v\xE0o r\u1ED3i gi\u1EA3i theo $m$.`],
        solution: [
          `$P(${x0})=(${x0})^{2}-(m+1)\\cdot(${x0})${c >= 0 ? "+" : "-"}${Math.abs(c)}=0$`,
          `$${x0 * x0}-${x0}(m+1)${c >= 0 ? "+" : "-"}${Math.abs(c)}=0$`,
          `$${x0}(m+1)=${k}\\Rightarrow m+1=${k / x0}\\Rightarrow m=${m}$.`
        ]
      };
    }
  },
  {
    id: "g7.goc-song-song",
    topicId: "g7-t4",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "G\xF3c t\u1EA1o b\u1EDFi hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
    build: (r) => {
      const a = r.int(35, 145);
      return {
        stem: `Cho hai \u0111\u01B0\u1EDDng th\u1EB3ng $a\\para b$ b\u1ECB c\u1EAFt b\u1EDFi \u0111\u01B0\u1EDDng th\u1EB3ng $c$. Bi\u1EBFt m\u1ED9t g\xF3c t\u1EA1o th\xE0nh c\xF3 s\u1ED1 \u0111o $${a}\\deg$. T\xEDnh s\u1ED1 \u0111o g\xF3c **trong c\xF9ng ph\xEDa** v\u1EDBi g\xF3c \u0111\xF3 (nh\u1EADp s\u1ED1 \u0111o theo \u0111\u1ED9).`,
        answer: String(180 - a),
        thinking: ["Hai \u0111\u01B0\u1EDDng song song \u2192 hai g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau (t\u1ED5ng b\u1EB1ng $180\\deg$)."],
        solution: [
          `V\xEC $a\\para b$ n\xEAn hai g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau.`,
          `S\u1ED1 \u0111o g\xF3c c\u1EA7n t\xECm $=180\\deg-${a}\\deg=${180 - a}\\deg$.`
        ],
        pitfall: "So le trong v\xE0 \u0111\u1ED3ng v\u1ECB th\xEC B\u1EB0NG nhau; trong c\xF9ng ph\xEDa th\xEC B\xD9 nhau."
      };
    }
  },
  {
    id: "g7.cm-song-song",
    topicId: "g7-t4",
    grade: 7,
    level: "VD",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
    build: (r) => {
      const correct = "Hai g\xF3c so le trong b\u1EB1ng nhau";
      const [options, answer] = mcOptions(r, correct, [
        "Hai g\xF3c so le trong b\xF9 nhau",
        "Hai g\xF3c \u0111\u1ED3ng v\u1ECB b\xF9 nhau",
        "Hai g\xF3c trong c\xF9ng ph\xEDa b\u1EB1ng nhau"
      ]);
      void r;
      return {
        stem: "\u0110\u1EC3 ch\u1EE9ng minh hai \u0111\u01B0\u1EDDng th\u1EB3ng song song, ta c\xF3 th\u1EC3 ch\u1EC9 ra \u0111i\u1EC1u ki\u1EC7n n\xE0o sau \u0111\xE2y?",
        options,
        answer,
        thinking: ["Nh\u1EDB ch\xEDnh x\xE1c d\u1EA5u hi\u1EC7u: so le trong B\u1EB0NG nhau, \u0111\u1ED3ng v\u1ECB B\u1EB0NG nhau, trong c\xF9ng ph\xEDa B\xD9 nhau."],
        solution: [
          "D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt: n\u1EBFu hai \u0111\u01B0\u1EDDng th\u1EB3ng b\u1ECB c\u1EAFt b\u1EDFi m\u1ED9t c\xE1t tuy\u1EBFn t\u1EA1o th\xE0nh m\u1ED9t c\u1EB7p g\xF3c **so le trong b\u1EB1ng nhau** (ho\u1EB7c **\u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau**, ho\u1EB7c **trong c\xF9ng ph\xEDa b\xF9 nhau**) th\xEC hai \u0111\u01B0\u1EDDng th\u1EB3ng \u0111\xF3 song song.",
          "V\u1EADy \u0111\xE1p \xE1n \u0111\xFAng l\xE0 \u201CHai g\xF3c so le trong b\u1EB1ng nhau\u201D."
        ]
      };
    }
  },
  {
    id: "g7.tam-giac-goc",
    topicId: "g7-t5",
    grade: 7,
    level: "NB",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\u1ED5ng ba g\xF3c trong tam gi\xE1c",
    build: (r) => {
      const A = r.int(30, 100), B = r.int(25, 170 - A);
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $\\angle A=${A}\\deg$, $\\angle B=${B}\\deg$. T\xEDnh s\u1ED1 \u0111o g\xF3c ngo\xE0i t\u1EA1i \u0111\u1EC9nh $C$ (nh\u1EADp s\u1ED1 \u0111o theo \u0111\u1ED9).`,
        answer: String(A + B),
        thinking: ["G\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng T\u1ED4NG hai g\xF3c trong kh\xF4ng k\u1EC1 v\u1EDBi n\xF3."],
        solution: [
          `$\\angle C=180\\deg-${A}\\deg-${B}\\deg=${180 - A - B}\\deg$.`,
          `G\xF3c ngo\xE0i t\u1EA1i $C$ $=180\\deg-${180 - A - B}\\deg=${A + B}\\deg$ (c\u0169ng b\u1EB1ng $\\angle A+\\angle B$).`
        ]
      };
    }
  },
  {
    id: "g7.bdt-tam-giac",
    topicId: "g7-t5",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c",
    build: (r) => {
      const b = r.int(4, 9), c = r.int(b + 2, b + 8);
      const lo = c - b, hi = c + b;
      const cnt = hi - lo - 1;
      const [options, answer] = mcOptions(r, String(cnt), distractInt(r, cnt, 2).map(String));
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $AB=${b}\\,cm$, $AC=${c}\\,cm$ v\xE0 \u0111\u1ED9 d\xE0i $BC$ l\xE0 m\u1ED9t s\u1ED1 nguy\xEAn (\u0111\u01A1n v\u1ECB cm). C\xF3 bao nhi\xEAu gi\xE1 tr\u1ECB c\xF3 th\u1EC3 c\u1EE7a $BC$?`,
        options,
        answer,
        thinking: ["D\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c \u0111\u1EC3 ch\u1EB7n hai \u0111\u1EA7u: $\\abs{b-c}<a<b+c$."],
        solution: [
          `$\\abs{${c}-${b}}<BC<${c}+${b}$, t\u1EE9c $${lo}<BC<${hi}$.`,
          `$BC$ nguy\xEAn n\xEAn $BC\\in\\{${lo + 1};${lo + 2};\\dots;${hi - 1}\\}$ \u2014 c\xF3 $${cnt}$ gi\xE1 tr\u1ECB.`
        ],
        pitfall: "Hai \u0111\u1EA7u m\xFAt \u0111\u1EC1u l\xE0 d\u1EA5u $<$ (kh\xF4ng l\u1EA5y b\u1EB1ng), n\u1EBFu l\u1EA5y b\u1EB1ng s\u1EBD th\u1EEBa 2 gi\xE1 tr\u1ECB."
      };
    }
  },
  {
    id: "g7.tam-giac-can",
    topicId: "g7-t5",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Tam gi\xE1c c\xE2n \u2014 t\xEDnh g\xF3c",
    build: (r) => {
      const apex = r.int(20, 140);
      const base = (180 - apex) / 2;
      return {
        stem: `Tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$ c\xF3 $\\angle A=${apex}\\deg$. T\xEDnh s\u1ED1 \u0111o g\xF3c $\\angle B$ (nh\u1EADp s\u1ED1 \u0111o theo \u0111\u1ED9).`,
        answer: String(Math.round(base * 100) / 100),
        thinking: ["Tam gi\xE1c c\xE2n t\u1EA1i $A$ th\xEC hai g\xF3c \u1EDF \u0111\xE1y $\\angle B=\\angle C$."],
        solution: [
          `V\xEC $\\tri ABC$ c\xE2n t\u1EA1i $A$ n\xEAn $\\angle B=\\angle C$.`,
          `$\\angle B+\\angle C=180\\deg-${apex}\\deg=${180 - apex}\\deg$.`,
          `$\\angle B=\\f{${180 - apex}\\deg}{2}=${Math.round(base * 100) / 100}\\deg$.`
        ]
      };
    }
  },
  {
    id: "g7.tam-giac-bang-nhau",
    topicId: "g7-t5",
    grade: 7,
    level: "VD",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "C\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a tam gi\xE1c",
    build: (r) => {
      void r;
      return {
        stem: "Cho tam gi\xE1c $ABC$ c\xF3 $AB=AC$, $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh:",
        options: [
          "$\\tri ABM=\\tri ACM$ theo tr\u01B0\u1EDDng h\u1EE3p c.c.c",
          "$AM$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $\\angle BAC$",
          "$AM\\perp BC$",
          "N\u1EBFu ch\u1EC9 bi\u1EBFt $AB=AC$ v\xE0 $\\angle B=\\angle C$ th\xEC \u0111\xE3 \u0111\u1EE7 k\u1EBFt lu\u1EADn $\\tri ABM=\\tri ACM$"
        ],
        answer: [true, true, true, false],
        thinking: ["Ba y\u1EBFu t\u1ED1 $AB=AC$, $MB=MC$, $AM$ chung cho ngay tr\u01B0\u1EDDng h\u1EE3p c.c.c; t\u1EEB \u0111\xF3 suy ra c\xE1c h\u1EC7 qu\u1EA3."],
        solution: [
          "X\xE9t $\\tri ABM$ v\xE0 $\\tri ACM$: $AB=AC$ (gt); $MB=MC$ ($M$ l\xE0 trung \u0111i\u1EC3m); $AM$ chung \u2192 b\u1EB1ng nhau theo **c.c.c**. (a \u0111\xFAng)",
          "Suy ra $\\angle BAM=\\angle CAM$ n\xEAn $AM$ l\xE0 ph\xE2n gi\xE1c g\xF3c $A$. (b \u0111\xFAng)",
          "Suy ra $\\angle AMB=\\angle AMC$; m\xE0 ch\xFAng k\u1EC1 b\xF9 n\xEAn m\u1ED7i g\xF3c b\u1EB1ng $90\\deg$, do \u0111\xF3 $AM\\perp BC$. (c \u0111\xFAng)",
          "\xDD (d) sai: $AB=AC$ v\xE0 $\\angle B=\\angle C$ ch\u1EC9 l\xE0 hai y\u1EBFu t\u1ED1 l\u1EB7p (tam gi\xE1c c\xE2n), ch\u01B0a \u0111\u1EE7 ba y\u1EBFu t\u1ED1 cho hai tam gi\xE1c nh\u1ECF."
        ]
      };
    }
  },
  {
    id: "g7.hinh-khoi",
    topicId: "g7-t6",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Th\u1EC3 t\xEDch h\xECnh h\u1ED9p ch\u1EEF nh\u1EADt \u2014 \u0111\u1ED5i \u0111\u01A1n v\u1ECB l\xEDt",
    build: (r) => {
      const a = r.pick([60, 80, 100, 120]), b = r.pick([40, 50, 60]), h = r.pick([30, 40, 45, 50]);
      const liters = a * b * h / 1e3;
      return {
        stem: `M\u1ED9t b\u1EC3 c\xE1 d\u1EA1ng h\xECnh h\u1ED9p ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $${a}\\,cm$, chi\u1EC1u r\u1ED9ng $${b}\\,cm$. Ng\u01B0\u1EDDi ta \u0111\u1ED5 n\u01B0\u1EDBc v\xE0o b\u1EC3 \u0111\u1EBFn khi m\u1EF1c n\u01B0\u1EDBc cao $${h}\\,cm$. T\xEDnh th\u1EC3 t\xEDch n\u01B0\u1EDBc trong b\u1EC3 theo l\xEDt.`,
        answer: String(Math.round(liters * 1e3) / 1e3),
        thinking: [
          "D\xF9ng chi\u1EC1u cao **c\u1ED9t n\u01B0\u1EDBc**, kh\xF4ng d\xF9ng chi\u1EC1u cao b\u1EC3.",
          "\u0110\u1ED5i $1000\\,cm^{3}=1\\,dm^{3}=1$ l\xEDt."
        ],
        solution: [
          `$V=${a}\\cdot${b}\\cdot${h}=${a * b * h}\\ (cm^{3})$.`,
          `$${a * b * h}\\,cm^{3}=${Math.round(liters * 1e3) / 1e3}\\,dm^{3}=${Math.round(liters * 1e3) / 1e3}$ l\xEDt.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i $cm^{3}$ sang l\xEDt."
      };
    }
  },
  {
    id: "g7.thong-ke",
    topicId: "g7-t7",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "\u0110\u1ECDc bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n",
    build: (r) => {
      const total = r.pick([120, 200, 250, 400, 500]);
      const p1 = r.pick([25, 30, 35, 40]), p2 = r.pick([15, 20, 25]), p3 = r.pick([10, 15, 20]);
      const rest = 100 - p1 - p2 - p3;
      const n = Math.round(total * rest / 100);
      return {
        stem: `Bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n m\xF4 t\u1EA3 s\u1EDF th\xEDch m\xF4n h\u1ECDc c\u1EE7a $${total}$ h\u1ECDc sinh: To\xE1n $${p1}\\percent$, V\u0103n $${p2}\\percent$, Ti\u1EBFng Anh $${p3}\\percent$, c\xF2n l\u1EA1i l\xE0 c\xE1c m\xF4n kh\xE1c. T\xEDnh s\u1ED1 h\u1ECDc sinh th\xEDch c\xE1c m\xF4n kh\xE1c.`,
        answer: String(n),
        thinking: ["T\u1ED5ng c\xE1c ph\u1EA7n trong bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n lu\xF4n b\u1EB1ng $100\\percent$."],
        solution: [
          `T\u1EC9 l\u1EC7 m\xF4n kh\xE1c: $100\\percent-${p1}\\percent-${p2}\\percent-${p3}\\percent=${rest}\\percent$.`,
          `S\u1ED1 h\u1ECDc sinh: $${total}\\cdot${rest}\\percent=${n}$ (h\u1ECDc sinh).`
        ]
      };
    }
  },
  {
    id: "g7.xac-suat",
    topicId: "g7-t7",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "X\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 \u0111\u1ED3ng kh\u1EA3 n\u0103ng",
    build: (r) => {
      const n = r.pick([12, 15, 18, 20, 24, 30]);
      const k = r.pick([2, 3, 4, 5]);
      const cnt = Math.floor(n / k);
      const [rn, rd] = reduce(cnt, n);
      return {
        stem: `M\u1ED9t h\u1ED9p c\xF3 $${n}$ t\u1EA5m th\u1EBB \u0111\u01B0\u1EE3c \u0111\xE1nh s\u1ED1 t\u1EEB 1 \u0111\u1EBFn $${n}$. R\xFAt ng\u1EABu nhi\xEAn m\u1ED9t th\u1EBB. T\xEDnh x\xE1c su\u1EA5t r\xFAt \u0111\u01B0\u1EE3c th\u1EBB ghi s\u1ED1 chia h\u1EBFt cho $${k}$ (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ["\u0110\u1EBFm s\u1ED1 b\u1ED9i c\u1EE7a $k$ trong kho\u1EA3ng t\u1EEB 1 \u0111\u1EBFn $n$, r\u1ED3i chia cho $n$."],
        solution: [
          `C\xE1c th\u1EBB chia h\u1EBFt cho $${k}$: $${k};${2 * k};\\dots;${cnt * k}$ \u2014 c\xF3 $${cnt}$ th\u1EBB.`,
          `$P=\\f{${cnt}}{${n}}=${frac(cnt, n)}$.`
        ]
      };
    }
  },
  {
    id: "g7.tu-luan-1",
    topicId: "g7-t2",
    grade: 7,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 b\xE0i to\xE1n chia t\u1EC9 l\u1EC7",
    build: (r) => {
      const [p, q, s] = [3, 4, 5];
      const t = r.int(5, 20);
      const sum = (p + q + s) * t;
      return {
        stem: `Ba l\u1EDBp 7A, 7B, 7C \u0111\u01B0\u1EE3c giao tr\u1ED3ng t\u1ED5ng c\u1ED9ng $${sum}$ c\xE2y xanh. S\u1ED1 c\xE2y c\u1EE7a ba l\u1EDBp l\u1EA7n l\u01B0\u1EE3t t\u1EC9 l\u1EC7 v\u1EDBi $${p};${q};${s}$.

a) T\xEDnh s\u1ED1 c\xE2y m\u1ED7i l\u1EDBp ph\u1EA3i tr\u1ED3ng.

b) Bi\u1EBFt m\u1ED7i c\xE2y tr\u1ED3ng \u0111\u01B0\u1EE3c c\u1ED9ng 2 \u0111i\u1EC3m thi \u0111ua, t\xEDnh s\u1ED1 \u0111i\u1EC3m thi \u0111ua c\u1EE7a l\u1EDBp 7C.`,
        answer: "",
        rubric: [
          { criterion: "G\u1ECDi \u1EA9n \u0111\xFAng, c\xF3 \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n", points: 0.5 },
          { criterion: `L\u1EADp \u0111\xFAng d\xE3y t\u1EC9 s\u1ED1 $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ v\xE0 $a+b+c=${sum}$`, points: 1 },
          { criterion: `\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau, t\xECm \u0111\u01B0\u1EE3c gi\xE1 tr\u1ECB chung $=${t}$`, points: 1 },
          { criterion: `T\xEDnh \u0111\xFAng ba s\u1ED1: $${p * t}$; $${q * t}$; $${s * t}$ v\xE0 k\u1EBFt lu\u1EADn`, points: 1 },
          { criterion: `\xDD b: t\xEDnh \u0111\xFAng $${s * t}\\cdot2=${s * t * 2}$ \u0111i\u1EC3m`, points: 0.5 }
        ],
        thinking: ["\u0110\u1EC1 cho T\u1ED4NG \u2192 d\xF9ng ngay t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau."],
        solution: [
          `G\u1ECDi s\u1ED1 c\xE2y c\u1EE7a ba l\u1EDBp 7A, 7B, 7C l\u1EA7n l\u01B0\u1EE3t l\xE0 $a$, $b$, $c$ (c\xE2y; $a,b,c\\in\\Nstar$).`,
          `Theo \u0111\u1EC1: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ v\xE0 $a+b+c=${sum}$.`,
          `\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}=\\f{a+b+c}{${p}+${q}+${s}}=\\f{${sum}}{${p + q + s}}=${t}$.`,
          `Suy ra $a=${p * t}$; $b=${q * t}$; $c=${s * t}$ (\u0111\u1EC1u tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`,
          `V\u1EADy ba l\u1EDBp tr\u1ED3ng l\u1EA7n l\u01B0\u1EE3t $${p * t}$, $${q * t}$ v\xE0 $${s * t}$ c\xE2y.`,
          `b) \u0110i\u1EC3m thi \u0111ua c\u1EE7a l\u1EDBp 7C: $${s * t}\\cdot2=${s * t * 2}$ (\u0111i\u1EC3m).`
        ]
      };
    }
  }
];

// src/bank/g8.ts
var sgn = (n, first = false) => n < 0 ? `-${Math.abs(n)}` : first ? `${n}` : `+${n}`;
var BANK_G8 = [
  {
    id: "g8.hang-dang-thuc",
    topicId: "g8-t1",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u2014 hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng",
    build: (r) => {
      const a = r.int(2, 7), b = r.int(1, 9);
      const k = 4 * a * b;
      const [options, answer] = mcOptions(r, `${k}x`, [`${2 * a * b}x`, `${2 * b * b}`, `${k}x^{2}`]);
      return {
        stem: `R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c $M=(${a}x+${b})^{2}-(${a}x-${b})^{2}$.`,
        options,
        answer,
        thinking: [
          `Nh\u1EADn d\u1EA1ng $A^{2}-B^{2}$ v\u1EDBi $A=${a}x+${b}$, $B=${a}x-${b}$ \u2014 d\xF9ng hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng nhanh h\u01A1n khai tri\u1EC3n.`
        ],
        solution: [
          `$M=[(${a}x+${b})-(${a}x-${b})]\\cdot[(${a}x+${b})+(${a}x-${b})]$`,
          `$M=(${2 * b})\\cdot(${2 * a}x)=${k}x$.`
        ],
        pitfall: "Khai tri\u1EC3n bung ra r\u1ED3i tr\u1EEB v\u1EABn \u0111\xFAng nh\u01B0ng d\xE0i g\u1EA5p ba v\xE0 d\u1EC5 sai d\u1EA5u."
      };
    }
  },
  {
    id: "g8.nhan-tu",
    topicId: "g8-t1",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED",
    build: (r) => {
      const p = r.int(1, 9), q = r.int(1, 9);
      const b = -(p + q), c = p * q;
      const correct = `(x-${p})(x-${q})`;
      const [options, answer] = mcOptions(r, correct, [
        `(x+${p})(x+${q})`,
        `(x-${p})(x+${q})`,
        `(x-${p + q})(x-1)`
      ]);
      return {
        stem: `Ph\xE2n t\xEDch \u0111a th\u1EE9c $${poly([1, b, c])}$ th\xE0nh nh\xE2n t\u1EED, ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: [
          "Ba h\u1EA1ng t\u1EED, h\u1EC7 s\u1ED1 b\u1EADc hai b\u1EB1ng 1 \u2192 t\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa.",
          `T\xECm hai s\u1ED1 c\xF3 t\xEDch $${c}$ v\xE0 t\u1ED5ng $${b}$: \u0111\xF3 l\xE0 $-${p}$ v\xE0 $-${q}$.`
        ],
        solution: [
          `$${poly([1, b, c])}=x^{2}-${p}x-${q}x+${c}$`,
          `$=x(x-${p})-${q}(x-${p})=(x-${p})(x-${q})$.`
        ],
        pitfall: "Ki\u1EC3m tra l\u1EA1i b\u1EB1ng c\xE1ch nh\xE2n ng\u01B0\u1EE3c hai nh\xE2n t\u1EED."
      };
    }
  },
  {
    id: "g8.timx-nhantu",
    topicId: "g8-t1",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x b\u1EB1ng ph\xE2n t\xEDch nh\xE2n t\u1EED",
    build: (r) => {
      const a = r.int(2, 9);
      const a2 = a * a;
      return {
        stem: `T\xECm $x$, bi\u1EBFt $x^{3}-${a2}x=0$. (N\u1EBFu c\xF3 nhi\u1EC1u nghi\u1EC7m, nh\u1EADp c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: `0,${a},-${a}`,
        accept: [`-${a},0,${a}`, `0,-${a},${a}`, `${a},-${a},0`],
        thinking: [
          "Tuy\u1EC7t \u0111\u1ED1i KH\xD4NG chia hai v\u1EBF cho $x$ (s\u1EBD m\u1EA5t nghi\u1EC7m $x=0$).",
          "Ph\u1EA3i \u0111\u01B0a v\u1EC1 d\u1EA1ng t\xEDch b\u1EB1ng 0."
        ],
        solution: [
          `$x(x^{2}-${a2})=0$`,
          `$x(x-${a})(x+${a})=0$`,
          `$x=0$ ho\u1EB7c $x=${a}$ ho\u1EB7c $x=-${a}$.`,
          `V\u1EADy $x\\in\\{0;${a};-${a}\\}$.`
        ],
        pitfall: "Chia hai v\u1EBF cho bi\u1EC3u th\u1EE9c ch\u1EE9a \u1EA9n l\xE0 nguy\xEAn nh\xE2n m\u1EA5t nghi\u1EC7m s\u1ED1 1."
      };
    }
  },
  {
    id: "g8.cuc-tri",
    topicId: "g8-t1",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "C\u1EF1c tr\u1ECB b\u1EB1ng ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng",
    build: (r) => {
      const m = r.int(1, 9), k = r.int(1, 12);
      const b = -2 * m, c = m * m + k;
      return {
        stem: `T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $P=${poly([1, b, c])}$.`,
        answer: String(k),
        thinking: [
          "Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng: l\u1EA5y n\u1EEDa h\u1EC7 s\u1ED1 c\u1EE7a $x$ r\u1ED3i b\xECnh ph\u01B0\u01A1ng \u0111\u1EC3 b\xF9 tr\u1EEB.",
          `N\u1EEDa h\u1EC7 s\u1ED1 c\u1EE7a $x$ l\xE0 $${-m}$, b\xECnh ph\u01B0\u01A1ng l\xE0 $${m * m}$.`
        ],
        solution: [
          `$P=x^{2}-${2 * m}x+${m * m}+${k}=(x-${m})^{2}+${k}$.`,
          `V\xEC $(x-${m})^{2}\\ge0$ v\u1EDBi m\u1ECDi $x$ n\xEAn $P\\ge${k}$.`,
          `D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x-${m}=0\\Leftrightarrow x=${m}$.`,
          `V\u1EADy $P_{\\min}=${k}$ khi $x=${m}$.`
        ],
        pitfall: "Ph\u1EA3i n\xEAu \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng, n\u1EBFu kh\xF4ng th\xEC ch\u01B0a k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c c\u1EF1c tr\u1ECB."
      };
    }
  },
  {
    id: "g8.phan-thuc-rutgon",
    topicId: "g8-t2",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "R\xFAt g\u1ECDn ph\xE2n th\u1EE9c",
    build: (r) => {
      const a = r.int(2, 8);
      const a2 = a * a;
      const correct = `\\f{x-${a}}{x}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{x+${a}}{x}`, `\\f{x-${a}}{x+${a}}`, `-${a}`]);
      return {
        stem: `R\xFAt g\u1ECDn ph\xE2n th\u1EE9c $P=\\f{x^{2}-${a2}}{x^{2}+${a}x}$ (v\u1EDBi $x\\ne0$, $x\\ne-${a}$).`,
        options,
        answer,
        thinking: ["Ph\xE2n t\xEDch c\u1EA3 t\u1EED v\xE0 m\u1EABu th\xE0nh nh\xE2n t\u1EED \u0111\u1EC3 l\u1ED9 nh\xE2n t\u1EED chung."],
        solution: [
          `T\u1EED: $x^{2}-${a2}=(x-${a})(x+${a})$.`,
          `M\u1EABu: $x^{2}+${a}x=x(x+${a})$.`,
          `$P=\\f{(x-${a})(x+${a})}{x(x+${a})}=\\f{x-${a}}{x}$.`
        ],
        pitfall: "Ch\u1EC9 \u0111\u01B0\u1EE3c r\xFAt g\u1ECDn theo TH\u1EEAA S\u1ED0 chung, kh\xF4ng r\xFAt theo s\u1ED1 h\u1EA1ng."
      };
    }
  },
  {
    id: "g8.phan-thuc-tinh",
    topicId: "g8-t2",
    grade: 8,
    level: "VD",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "C\u1ED9ng, tr\u1EEB ph\xE2n th\u1EE9c",
    build: (r) => {
      const a = r.int(2, 7);
      const a2 = a * a;
      const correct = `\\f{2}{x+${a}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{2}{x-${a}}`, `\\f{2x}{x^{2}-${a2}}`, `\\f{4}{x+${a}}`]);
      return {
        stem: `R\xFAt g\u1ECDn $Q=\\f{1}{x-${a}}+\\f{1}{x+${a}}-\\f{${2 * a}\\cdot 2}{x^{2}-${a2}}\\cdot\\f{1}{${a}}\\cdot${a}\\cdot\\f{1}{2}$ (v\u1EDBi $x\\ne\\pm${a}$).`,
        options,
        answer,
        thinking: [
          `R\xFAt g\u1ECDn h\u1EC7 s\u1ED1 c\u1EE7a h\u1EA1ng t\u1EED th\u1EE9 ba tr\u01B0\u1EDBc: $\\f{${4 * a}}{x^{2}-${a2}}\\cdot\\f{1}{2}=\\f{${2 * a}}{x^{2}-${a2}}$.`,
          `M\u1EABu chung l\xE0 $x^{2}-${a2}=(x-${a})(x+${a})$.`
        ],
        solution: [
          `H\u1EA1ng t\u1EED th\u1EE9 ba r\xFAt g\u1ECDn th\xE0nh $\\f{${2 * a}}{x^{2}-${a2}}$.`,
          `$Q=\\f{(x+${a})+(x-${a})-${2 * a}}{(x-${a})(x+${a})}=\\f{2x-${2 * a}}{(x-${a})(x+${a})}$`,
          `$=\\f{2(x-${a})}{(x-${a})(x+${a})}=\\f{2}{x+${a}}$.`
        ]
      };
    }
  },
  {
    id: "g8.phan-thuc-vdc",
    topicId: "g8-t2",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x nguy\xEAn \u0111\u1EC3 bi\u1EC3u th\u1EE9c nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn",
    build: (r) => {
      const k = r.pick([2, 3, 5, 6, 7]);
      const divs = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) {
        divs.push(i, -i);
      }
      const xs = divs.map((d) => d).sort((a, b) => a - b);
      return {
        stem: `Cho $P=\\f{x-${k}}{x}$ v\u1EDBi $x\\ne0$. T\xECm t\u1EA5t c\u1EA3 c\xE1c s\u1ED1 nguy\xEAn $x$ \u0111\u1EC3 $P$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn. (Nh\u1EADp c\xE1c gi\xE1 tr\u1ECB c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: xs.join(","),
        accept: [xs.slice().reverse().join(",")],
        thinking: ["T\xE1ch ph\u1EA7n nguy\xEAn \u0111\u1EC3 l\u1ED9 \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt."],
        solution: [
          `$P=\\f{x-${k}}{x}=1-\\f{${k}}{x}$.`,
          `$P\\in\\Z\\Leftrightarrow\\f{${k}}{x}\\in\\Z\\Leftrightarrow x$ l\xE0 \u01B0\u1EDBc c\u1EE7a $${k}$.`,
          `\u01AF$(${k})=\\{${xs.join(";")}\\}$ (\u0111\u1EC1u tho\u1EA3 $x\\ne0$).`,
          `V\u1EADy $x\\in\\{${xs.join(";")}\\}$.`
        ],
        pitfall: "Qu\xEAn c\xE1c \u01B0\u1EDBc \xE2m l\xE0 m\u1EA5t m\u1ED9t n\u1EEDa \u0111\xE1p s\u1ED1."
      };
    }
  },
  {
    id: "g8.pt-bac-nhat",
    topicId: "g8-t3",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh \u0111\u01B0a v\u1EC1 b\u1EADc nh\u1EA5t",
    build: (r) => {
      const x = r.int(-6, 8) || 3;
      const a = r.int(2, 6), b = r.int(1, 9), c = r.int(2, 5), d = r.int(1, 9);
      const num = 4 * (a * x + b) - 3 * (c * x + d);
      const [kn, kd] = reduce(num, 12);
      const kStr = kd === 1 ? String(kn) : `\\f{${kn}}{${kd}}`;
      return {
        stem: `Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\f{${a}x${sgn(b)}}{3}-\\f{${c}x${sgn(d)}}{4}=${kStr}$.`,
        answer: String(x),
        thinking: ["M\u1EABu chung l\xE0 12 \u2192 nh\xE2n hai v\u1EBF v\u1EDBi 12 \u0111\u1EC3 kh\u1EED m\u1EABu, sau \u0111\xF3 b\u1ECF ngo\u1EB7c v\xE0 chuy\u1EC3n v\u1EBF."],
        solution: [
          `Nh\xE2n hai v\u1EBF v\u1EDBi 12: $4(${a}x${sgn(b)})-3(${c}x${sgn(d)})=${num}$.`,
          `$${4 * a}x${sgn(4 * b)}-${3 * c}x${sgn(-3 * d)}=${num}$`,
          `$${4 * a - 3 * c}x=${num - (4 * b - 3 * d)}$`,
          `$x=${x}$.`
        ],
        pitfall: "Nh\xE2n v\u1EDBi m\u1EABu chung m\xE0 qu\xEAn nh\xE2n c\u1EA3 v\u1EBF ph\u1EA3i."
      };
    }
  },
  {
    id: "g8.lap-pt-chuyen-dong",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 b\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng",
    build: (r) => {
      const v1 = r.pick([40, 45, 50, 30]), v2 = v1 + r.pick([10, 15, 20]);
      const dtMin = r.pick([20, 30, 40, 45, 60]);
      const dt = dtMin / 60;
      const s = dt * v1 * v2 / (v2 - v1);
      return {
        stem: `M\u1ED9t \xF4 t\xF4 \u0111i t\u1EEB A \u0111\u1EBFn B v\u1EDBi v\u1EADn t\u1ED1c $${v1}\\,km/h$, l\xFAc v\u1EC1 \u0111i v\u1EDBi v\u1EADn t\u1ED1c $${v2}\\,km/h$ n\xEAn th\u1EDDi gian v\u1EC1 \xEDt h\u01A1n th\u1EDDi gian \u0111i $${dtMin}$ ph\xFAt. T\xEDnh qu\xE3ng \u0111\u01B0\u1EDDng AB (\u0111\u01A1n v\u1ECB: km).`,
        answer: String(Math.round(s * 100) / 100),
        thinking: [
          "Qu\xE3ng \u0111\u01B0\u1EDDng l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng chung c\u1EE7a c\u1EA3 l\u01B0\u1EE3t \u0111i v\xE0 l\u01B0\u1EE3t v\u1EC1 \u2192 ch\u1ECDn l\xE0m \u1EA9n.",
          `\u0110\u1ED5i $${dtMin}$ ph\xFAt $=${Math.round(dt * 1e3) / 1e3}$ gi\u1EDD.`
        ],
        solution: [
          `G\u1ECDi qu\xE3ng \u0111\u01B0\u1EDDng AB l\xE0 $x$ (km, $x>0$).`,
          `Th\u1EDDi gian \u0111i: $\\f{x}{${v1}}$ (gi\u1EDD); th\u1EDDi gian v\u1EC1: $\\f{x}{${v2}}$ (gi\u1EDD).`,
          `Theo \u0111\u1EC1: $\\f{x}{${v1}}-\\f{x}{${v2}}=${Math.round(dt * 1e3) / 1e3}$.`,
          `$x\\left(\\f{1}{${v1}}-\\f{1}{${v2}}\\right)=${Math.round(dt * 1e3) / 1e3}$, t\u1EE9c $x\\cdot\\f{${v2 - v1}}{${v1 * v2}}=${Math.round(dt * 1e3) / 1e3}$.`,
          `$x=${Math.round(s * 100) / 100}$ (km), tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n $x>0$.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i ph\xFAt sang gi\u1EDD."
      };
    }
  },
  {
    id: "g8.lap-pt-nang-suat",
    topicId: "g8-t3",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 b\xE0i to\xE1n n\u0103ng su\u1EA5t",
    build: (r) => {
      const t1 = r.pick([10, 12, 15, 20, 8]);
      const t2 = r.pick([15, 20, 24, 30, 12]);
      const t = t1 * t2 / (t1 + t2);
      const tRound = Math.round(t * 100) / 100;
      return {
        stem: `Hai ng\u01B0\u1EDDi c\xF9ng l\xE0m chung m\u1ED9t c\xF4ng vi\u1EC7c th\xEC sau $${tRound}$ gi\u1EDD xong. N\u1EBFu ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m m\u1ED9t m\xECnh th\xEC m\u1EA5t $${t1}$ gi\u1EDD. H\u1ECFi ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh th\xEC m\u1EA5t bao nhi\xEAu gi\u1EDD m\u1EDBi xong c\xF4ng vi\u1EC7c?`,
        answer: String(t2),
        thinking: [
          "Kh\xF4ng c\u1ED9ng \u0111\u01B0\u1EE3c th\u1EDDi gian \u2014 ph\u1EA3i c\u1ED9ng N\u0102NG SU\u1EA4T.",
          "Coi to\xE0n b\u1ED9 c\xF4ng vi\u1EC7c l\xE0 1; n\u0103ng su\u1EA5t m\u1ED7i gi\u1EDD l\xE0 $\\f{1}{\\text{th\u1EDDi gian}}$."
        ],
        solution: [
          `G\u1ECDi th\u1EDDi gian ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh l\xE0 $x$ (gi\u1EDD, $x>0$).`,
          `Trong 1 gi\u1EDD: ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{${t1}}$ c\xF4ng vi\u1EC7c, ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{x}$ c\xF4ng vi\u1EC7c.`,
          `L\xE0m chung trong 1 gi\u1EDD \u0111\u01B0\u1EE3c $\\f{1}{${tRound}}$ c\xF4ng vi\u1EC7c, n\xEAn $\\f{1}{${t1}}+\\f{1}{x}=\\f{1}{${tRound}}$.`,
          `$\\f{1}{x}=\\f{1}{${tRound}}-\\f{1}{${t1}}=\\f{1}{${t2}}$.`,
          `$x=${t2}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n $x>0$).`,
          `V\u1EADy ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh m\u1EA5t **${t2} gi\u1EDD**.`
        ],
        pitfall: "C\u1ED9ng th\u1EDDi gian thay v\xEC c\u1ED9ng n\u0103ng su\u1EA5t l\xE0 sai l\u1EA7m ch\u1EBFt ng\u01B0\u1EDDi c\u1EE7a d\u1EA1ng n\xE0y."
      };
    }
  },
  {
    id: "g8.ham-so-bac-nhat",
    topicId: "g8-t4",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t qua hai \u0111i\u1EC3m",
    build: (r) => {
      const a = r.int(-5, 5) || 2, b = r.int(-8, 8);
      const x1 = r.int(-4, 4), x2 = x1 + r.int(1, 5);
      const y1 = a * x1 + b, y2 = a * x2 + b;
      return {
        stem: `X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 $y=ax+b$ bi\u1EBFt \u0111\u1ED3 th\u1ECB \u0111i qua hai \u0111i\u1EC3m $A(${x1};${y1})$ v\xE0 $B(${x2};${y2})$. (Nh\u1EADp theo d\u1EA1ng a,b.)`,
        answer: `${a},${b}`,
        thinking: ["Thay l\u1EA7n l\u01B0\u1EE3t to\u1EA1 \u0111\u1ED9 hai \u0111i\u1EC3m v\xE0o c\xF4ng th\u1EE9c \u0111\u1EC3 l\u1EADp h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh."],
        solution: [
          `Thay $A$: $${x1}a+b=${y1}$. (1)`,
          `Thay $B$: $${x2}a+b=${y2}$. (2)`,
          `L\u1EA5y (2) tr\u1EEB (1): $${x2 - x1}a=${y2 - y1}\\Rightarrow a=${a}$.`,
          `Thay v\xE0o (1): $b=${y1}-${x1}\\cdot${a}=${b}$.`,
          `V\u1EADy $y=${a}x${sgn(b)}$.`
        ]
      };
    }
  },
  {
    id: "g8.do-thi",
    topicId: "g8-t4",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC1u ki\u1EC7n hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
    build: (r) => {
      const k = r.int(2, 8), c = r.int(1, 9), d = r.int(1, 9);
      const m = k + c;
      return {
        stem: `T\xECm $m$ \u0111\u1EC3 \u0111\u01B0\u1EDDng th\u1EB3ng $y=(m-${c})x+${d}$ song song v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng $y=${k}x-${d + 1}$.`,
        answer: String(m),
        thinking: ["Song song $\\Leftrightarrow$ h\u1EC7 s\u1ED1 g\xF3c b\u1EB1ng nhau V\xC0 tung \u0111\u1ED9 g\u1ED1c kh\xE1c nhau."],
        solution: [
          `\u0110i\u1EC1u ki\u1EC7n h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t: $m-${c}\\ne0\\Leftrightarrow m\\ne${c}$.`,
          `Song song: $m-${c}=${k}\\Rightarrow m=${m}$; \u0111\u1ED3ng th\u1EDDi $${d}\\ne${-(d + 1)}$ (tho\u1EA3).`,
          `V\u1EADy $m=${m}$.`
        ],
        pitfall: `Qu\xEAn \u0111i\u1EC1u ki\u1EC7n tung \u0111\u1ED9 g\u1ED1c kh\xE1c nhau, ho\u1EB7c qu\xEAn $a\\ne0$.`
      };
    }
  },
  {
    id: "g8.tu-giac",
    topicId: "g8-t5",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t",
    build: (r) => {
      const bank = [
        { q: "H\xECnh b\xECnh h\xE0nh c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau l\xE0 h\xECnh g\xEC?", a: "H\xECnh ch\u1EEF nh\u1EADt", w: ["H\xECnh thoi", "H\xECnh vu\xF4ng", "H\xECnh thang c\xE2n"] },
        { q: "H\xECnh b\xECnh h\xE0nh c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c l\xE0 h\xECnh g\xEC?", a: "H\xECnh thoi", w: ["H\xECnh ch\u1EEF nh\u1EADt", "H\xECnh vu\xF4ng", "H\xECnh thang"] },
        { q: "H\xECnh ch\u1EEF nh\u1EADt c\xF3 hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau l\xE0 h\xECnh g\xEC?", a: "H\xECnh vu\xF4ng", w: ["H\xECnh thoi", "H\xECnh b\xECnh h\xE0nh", "H\xECnh thang c\xE2n"] },
        { q: "T\u1EE9 gi\xE1c c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng l\xE0 h\xECnh g\xEC?", a: "H\xECnh b\xECnh h\xE0nh", w: ["H\xECnh thoi", "H\xECnh ch\u1EEF nh\u1EADt", "H\xECnh thang c\xE2n"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["\u0110\u1ED1i chi\u1EBFu v\u1EDBi s\u01A1 \u0111\u1ED3 quan h\u1EC7: h\xECnh b\xECnh h\xE0nh + 1 \u0111i\u1EC1u ki\u1EC7n = h\xECnh ch\u1EEF nh\u1EADt ho\u1EB7c h\xECnh thoi."],
        solution: [`Theo d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt: **${it.a}**.`]
      };
    }
  },
  {
    id: "g8.pythagore",
    topicId: "g8-t7",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "\u0110\u1ECBnh l\xED Pythagore",
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
      const k = r.int(1, 3);
      const [a, b, c] = trip.map((x) => x * k);
      const ask = r.pick(["leg", "hyp"]);
      return {
        stem: ask === "hyp" ? `Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ c\xF3 $AB=${a}\\,cm$, $AC=${b}\\,cm$. T\xEDnh \u0111\u1ED9 d\xE0i c\u1EA1nh $BC$ (\u0111\u01A1n v\u1ECB: cm).` : `M\u1ED9t chi\u1EBFc thang d\xE0i $${c}\\,m$ d\u1EF1a v\xE0o t\u01B0\u1EDDng, ch\xE2n thang c\xE1ch ch\xE2n t\u01B0\u1EDDng $${a}\\,m$. H\u1ECFi thang ch\u1EA1m t\u01B0\u1EDDng \u1EDF \u0111\u1ED9 cao bao nhi\xEAu m\xE9t?`,
        answer: String(ask === "hyp" ? c : b),
        thinking: ask === "hyp" ? ["C\u1EA1nh huy\u1EC1n \u0111\u1ED1i di\u1EC7n g\xF3c vu\xF4ng, d\xF9ng $BC^{2}=AB^{2}+AC^{2}$."] : ["Thang l\xE0 c\u1EA1nh huy\u1EC1n; kho\u1EA3ng c\xE1ch ch\xE2n thang \u2013 ch\xE2n t\u01B0\u1EDDng v\xE0 \u0111\u1ED9 cao l\xE0 hai c\u1EA1nh g\xF3c vu\xF4ng."],
        solution: ask === "hyp" ? [`$BC^{2}=AB^{2}+AC^{2}=${a}^{2}+${b}^{2}=${a * a}+${b * b}=${c * c}$.`, `$BC=${c}\\ (cm)$.`] : [`G\u1ECDi \u0111\u1ED9 cao c\u1EA7n t\xECm l\xE0 $h$ ($h>0$).`, `$h^{2}+${a}^{2}=${c}^{2}\\Rightarrow h^{2}=${c * c}-${a * a}=${b * b}$.`, `$h=${b}\\ (m)$.`],
        pitfall: "C\u1EA1nh huy\u1EC1n lu\xF4n l\xE0 c\u1EA1nh L\u1EDAN NH\u1EA4T \u2014 n\u1EBFu \u0111\u1EB7t nh\u1EA7m s\u1EBD ra c\u0103n c\u1EE7a s\u1ED1 \xE2m."
      };
    }
  },
  {
    id: "g8.thales",
    topicId: "g8-t6",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "\u0110\u1ECBnh l\xED Thal\xE8s \u2014 t\xEDnh \u0111\u1ED9 d\xE0i",
    build: (r) => {
      const am = r.int(2, 8), mb = r.int(2, 9), an = r.int(2, 10);
      const nc = an * mb / am;
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $MN\\para BC$ v\u1EDBi $M\\in AB$, $N\\in AC$. Bi\u1EBFt $AM=${am}$, $MB=${mb}$, $AN=${an}$. T\xEDnh $NC$.`,
        answer: String(Math.round(nc * 1e3) / 1e3),
        thinking: ["$MN\\para BC$ \u2192 \xE1p d\u1EE5ng \u0111\u1ECBnh l\xED Thal\xE8s, ch\xFA \xFD vi\u1EBFt \u0111\xFAng th\u1EE9 t\u1EF1 t\u01B0\u01A1ng \u1EE9ng."],
        solution: [
          `V\xEC $MN\\para BC$ n\xEAn theo \u0111\u1ECBnh l\xED Thal\xE8s: $\\f{AM}{MB}=\\f{AN}{NC}$.`,
          `$\\f{${am}}{${mb}}=\\f{${an}}{NC}\\Rightarrow NC=\\f{${an}\\cdot${mb}}{${am}}=${Math.round(nc * 1e3) / 1e3}$.`
        ],
        pitfall: "Vi\u1EBFt l\u1EC7ch th\u1EE9 t\u1EF1 t\u1EC9 s\u1ED1 (v\xED d\u1EE5 $\\f{AM}{AB}=\\f{AN}{NC}$) l\xE0 sai ngay."
      };
    }
  },
  {
    id: "g8.dong-dang",
    topicId: "g8-t6",
    grade: 8,
    level: "VD",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng v\xE0 t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch",
    build: (r) => {
      const k1 = r.int(2, 5), k2 = k1 + r.int(1, 4);
      const s1 = k1 * k1, s2 = k2 * k2;
      const [rn, rd] = reduce(s1, s2);
      const correct = `\\f{${rn}}{${rd}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{${k1}}{${k2}}`, `\\f{${k2}}{${k1}}`, `\\f{${rd}}{${rn}}`]);
      return {
        stem: `Hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng c\xF3 t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $k=\\f{${k1}}{${k2}}$. T\u1EC9 s\u1ED1 di\u1EC7n t\xEDch c\u1EE7a ch\xFAng b\u1EB1ng:`,
        options,
        answer,
        thinking: ["Di\u1EC7n t\xEDch t\u1EC9 l\u1EC7 v\u1EDBi B\xCCNH PH\u01AF\u01A0NG c\u1EE7a t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng."],
        solution: [
          `$\\f{S_1}{S_2}=k^{2}=\\left(\\f{${k1}}{${k2}}\\right)^{2}=\\f{${s1}}{${s2}}=\\f{${rn}}{${rd}}$.`
        ],
        pitfall: "D\xF9ng $k$ thay v\xEC $k^{2}$ \u2014 l\u1ED7i r\u1EA5t ph\u1ED5 bi\u1EBFn."
      };
    }
  },
  {
    id: "g8.dong-dang-vdc",
    topicId: "g8-t6",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "\u1EE8ng d\u1EE5ng \u0111\u1ED3ng d\u1EA1ng \u2014 \u0111o chi\u1EC1u cao gi\xE1n ti\u1EBFp",
    build: (r) => {
      const hp = r.pick([1.5, 1.6, 2, 1.2]);
      const sp = r.pick([0.9, 1, 1.2, 0.8]);
      const st = r.pick([6, 7.5, 9, 12]);
      const h = hp * st / sp;
      return {
        stem: `M\u1ED9t c\xE1i c\xE2y c\xF3 b\xF3ng tr\xEAn m\u1EB7t \u0111\u1EA5t d\xE0i $${st}\\,m$. C\xF9ng th\u1EDDi \u0111i\u1EC3m \u0111\xF3, m\u1ED9t chi\u1EBFc c\u1ECDc cao $${hp}\\,m$ c\xF3 b\xF3ng d\xE0i $${sp}\\,m$. T\xEDnh chi\u1EC1u cao c\u1EE7a c\xE2y (\u0111\u01A1n v\u1ECB: m).`,
        answer: String(Math.round(h * 100) / 100),
        thinking: [
          "Tia n\u1EAFng m\u1EB7t tr\u1EDDi coi nh\u01B0 song song \u2192 hai tam gi\xE1c vu\xF4ng c\xF3 c\u1EB7p g\xF3c nh\u1ECDn b\u1EB1ng nhau \u2192 \u0111\u1ED3ng d\u1EA1ng (g.g).",
          "T\u1EEB \u0111\u1ED3ng d\u1EA1ng suy ra t\u1EC9 l\u1EC7 gi\u1EEFa chi\u1EC1u cao v\xE0 b\xF3ng."
        ],
        solution: [
          `G\u1ECDi chi\u1EC1u cao c\xE2y l\xE0 $h$ (m, $h>0$).`,
          `Hai tam gi\xE1c vu\xF4ng (c\xE2y \u2013 b\xF3ng c\xE2y) v\xE0 (c\u1ECDc \u2013 b\xF3ng c\u1ECDc) \u0111\u1ED3ng d\u1EA1ng theo tr\u01B0\u1EDDng h\u1EE3p g.g.`,
          `$\\f{h}{${st}}=\\f{${hp}}{${sp}}\\Rightarrow h=\\f{${hp}\\cdot${st}}{${sp}}=${Math.round(h * 100) / 100}$ (m).`
        ]
      };
    }
  },
  {
    id: "g8.hinh-chop",
    topicId: "g8-t7",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\xECnh ch\xF3p t\u1EE9 gi\xE1c \u0111\u1EC1u",
    build: (r) => {
      const a = r.int(4, 12), h = r.int(3, 10);
      const V = a * a * h / 3;
      return {
        stem: `M\u1ED9t h\xECnh ch\xF3p t\u1EE9 gi\xE1c \u0111\u1EC1u c\xF3 c\u1EA1nh \u0111\xE1y $${a}\\,cm$ v\xE0 chi\u1EC1u cao $${h}\\,cm$. T\xEDnh th\u1EC3 t\xEDch h\xECnh ch\xF3p (\u0111\u01A1n v\u1ECB: cm\xB3).`,
        answer: String(Math.round(V * 100) / 100),
        thinking: ["\u0110\xE1y l\xE0 h\xECnh vu\xF4ng c\u1EA1nh $a$; d\xF9ng $V=\\f{1}{3}S_{\\text{\u0111\xE1y}}\\cdot h$."],
        solution: [
          `$S_{\\text{\u0111\xE1y}}=${a}^{2}=${a * a}\\ (cm^{2})$.`,
          `$V=\\f{1}{3}\\cdot${a * a}\\cdot${h}=${Math.round(V * 100) / 100}\\ (cm^{3})$.`
        ],
        pitfall: "Qu\xEAn h\u1EC7 s\u1ED1 $\\f{1}{3}$ c\u1EE7a h\xECnh ch\xF3p."
      };
    }
  },
  {
    id: "g8.hbh",
    topicId: "g8-t5",
    grade: 8,
    level: "VD",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "Ch\u1EE9ng minh h\xECnh b\xECnh h\xE0nh",
    build: (r) => {
      void r;
      return {
        stem: "Cho tam gi\xE1c $ABC$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y $D$ sao cho $MD=MA$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai:",
        options: [
          "T\u1EE9 gi\xE1c $ABDC$ l\xE0 h\xECnh b\xECnh h\xE0nh",
          "$AB\\para CD$ v\xE0 $AB=CD$",
          "N\u1EBFu $\\tri ABC$ vu\xF4ng t\u1EA1i $A$ th\xEC $ABDC$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt",
          "N\u1EBFu $\\tri ABC$ c\xE2n t\u1EA1i $A$ th\xEC $ABDC$ l\xE0 h\xECnh vu\xF4ng"
        ],
        answer: [true, true, true, false],
        thinking: ["$M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a c\u1EA3 hai \u0111\u01B0\u1EDDng ch\xE9o $AD$ v\xE0 $BC$ \u2192 h\xECnh b\xECnh h\xE0nh; sau \u0111\xF3 \u201Cleo thang\u201D th\xEAm \u0111i\u1EC1u ki\u1EC7n."],
        solution: [
          "Trong t\u1EE9 gi\xE1c $ABDC$, hai \u0111\u01B0\u1EDDng ch\xE9o $AD$ v\xE0 $BC$ c\u1EAFt nhau t\u1EA1i $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a m\u1ED7i \u0111\u01B0\u1EDDng \u2192 **h\xECnh b\xECnh h\xE0nh**. (a \u0111\xFAng)",
          "H\xECnh b\xECnh h\xE0nh c\xF3 c\xE1c c\u1EA1nh \u0111\u1ED1i song song v\xE0 b\u1EB1ng nhau \u2192 $AB\\para CD$, $AB=CD$. (b \u0111\xFAng)",
          "H\xECnh b\xECnh h\xE0nh c\xF3 m\u1ED9t g\xF3c vu\xF4ng ($\\angle BAC=90\\deg$) \u2192 **h\xECnh ch\u1EEF nh\u1EADt**. (c \u0111\xFAng)",
          "$\\tri ABC$ c\xE2n t\u1EA1i $A$ ch\u1EC9 cho $AB=AC$, t\u1EE9c hai c\u1EA1nh **k\u1EC1** c\u1EE7a h\xECnh b\xECnh h\xE0nh b\u1EB1ng nhau \u2192 h\xECnh thoi, ch\u01B0a ph\u1EA3i h\xECnh vu\xF4ng. (d sai)"
        ]
      };
    }
  },
  {
    id: "g8.hcn-hthoi-hvuong",
    topicId: "g8-t5",
    grade: 8,
    level: "VD",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n",
    build: (r) => {
      const bc = r.int(6, 24) * 2;
      const am = bc / 2;
      const [options, answer] = mcOptions(r, String(am), distractInt(r, am, 3).map(String));
      return {
        stem: `Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ c\xF3 $BC=${bc}\\,cm$, $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. T\xEDnh \u0111\u1ED9 d\xE0i $AM$ (\u0111\u01A1n v\u1ECB: cm).`,
        options,
        answer,
        thinking: ["Trong tam gi\xE1c vu\xF4ng, \u0111\u01B0\u1EDDng trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng N\u1EECA c\u1EA1nh huy\u1EC1n."],
        solution: [`$AM=\\f{BC}{2}=\\f{${bc}}{2}=${am}\\ (cm)$.`]
      };
    }
  },
  {
    id: "g8.thong-ke",
    topicId: "g8-t8",
    grade: 8,
    level: "NB",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "X\xE1c su\u1EA5t l\xED thuy\u1EBFt",
    build: (r) => {
      const red = r.int(3, 9), blue = r.int(2, 8), yellow = r.int(1, 6);
      const total = red + blue + yellow;
      const [rn, rd] = reduce(blue + yellow, total);
      return {
        stem: `M\u1ED9t h\u1ED9p c\xF3 $${red}$ vi\xEAn bi \u0111\u1ECF, $${blue}$ vi\xEAn bi xanh v\xE0 $${yellow}$ vi\xEAn bi v\xE0ng. L\u1EA5y ng\u1EABu nhi\xEAn m\u1ED9t vi\xEAn bi. T\xEDnh x\xE1c su\u1EA5t l\u1EA5y \u0111\u01B0\u1EE3c vi\xEAn bi **kh\xF4ng ph\u1EA3i m\xE0u \u0111\u1ECF** (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ["\u0110\u1EBFm t\u1ED5ng s\u1ED1 bi v\xE0 s\u1ED1 bi kh\xF4ng \u0111\u1ECF."],
        solution: [
          `T\u1ED5ng s\u1ED1 bi: $${red}+${blue}+${yellow}=${total}$.`,
          `S\u1ED1 bi kh\xF4ng \u0111\u1ECF: $${blue}+${yellow}=${blue + yellow}$.`,
          `$P=\\f{${blue + yellow}}{${total}}=\\f{${rn}}{${rd}}$.`
        ]
      };
    }
  },
  {
    id: "g8.xac-suat",
    topicId: "g8-t8",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "\u01AF\u1EDBc l\u01B0\u1EE3ng t\u1EA7n s\u1ED1 theo x\xE1c su\u1EA5t",
    build: (r) => {
      const n = r.pick([200, 300, 500, 600, 1e3]);
      const k = r.pick([2, 3, 4, 5, 6]);
      return {
        stem: `Gieo m\u1ED9t con x\xFAc x\u1EAFc c\xE2n \u0111\u1ED1i $${n}$ l\u1EA7n. H\xE3y \u01B0\u1EDBc l\u01B0\u1EE3ng s\u1ED1 l\u1EA7n xu\u1EA5t hi\u1EC7n m\u1EB7t c\xF3 s\u1ED1 ch\u1EA5m chia h\u1EBFt cho $${k <= 6 ? k : 3}$.`,
        answer: String(Math.round(n * Math.floor(6 / (k <= 6 ? k : 3)) / 6)),
        thinking: [
          "T\xEDnh x\xE1c su\u1EA5t l\xED thuy\u1EBFt tr\u01B0\u1EDBc, sau \u0111\xF3 nh\xE2n v\u1EDBi s\u1ED1 l\u1EA7n gieo.",
          "S\u1ED1 l\u1EA7n k\u1EF3 v\u1ECDng $=n\\cdot P(A)$."
        ],
        solution: [
          `C\xE1c m\u1EB7t c\xF3 s\u1ED1 ch\u1EA5m chia h\u1EBFt cho $${k <= 6 ? k : 3}$: c\xF3 $${Math.floor(6 / (k <= 6 ? k : 3))}$ m\u1EB7t trong 6 m\u1EB7t.`,
          `$P=\\f{${Math.floor(6 / (k <= 6 ? k : 3))}}{6}$.`,
          `S\u1ED1 l\u1EA7n \u01B0\u1EDBc l\u01B0\u1EE3ng $=${n}\\cdot\\f{${Math.floor(6 / (k <= 6 ? k : 3))}}{6}=${Math.round(n * Math.floor(6 / (k <= 6 ? k : 3)) / 6)}$ (l\u1EA7n).`
        ]
      };
    }
  },
  {
    id: "g8.tu-luan-1",
    topicId: "g8-t1",
    grade: 8,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 ph\xE2n t\xEDch nh\xE2n t\u1EED v\xE0 t\xECm x",
    build: (r) => {
      const a = r.int(2, 8), a2 = a * a;
      const p = r.int(1, 7), q = r.int(1, 7);
      return {
        stem: `a) Ph\xE2n t\xEDch \u0111a th\u1EE9c sau th\xE0nh nh\xE2n t\u1EED: $A=x^{2}-2xy+y^{2}-${a2}$.

b) T\xECm $x$, bi\u1EBFt $x^{2}-${p + q}x+${p * q}=0$.`,
        answer: "",
        rubric: [
          { criterion: `Nh\xF3m \u0111\xFAng 3 h\u1EA1ng t\u1EED \u0111\u1EA7u th\xE0nh $(x-y)^{2}$`, points: 1 },
          { criterion: `\u0110\u01B0a v\u1EC1 hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng v\xE0 ph\xE2n t\xEDch th\xE0nh $(x-y-${a})(x-y+${a})$`, points: 1 },
          { criterion: `\xDD b: ph\xE2n t\xEDch \u0111\u01B0\u1EE3c $(x-${p})(x-${q})=0$`, points: 1 },
          { criterion: `K\u1EBFt lu\u1EADn \u0111\xFAng $x=${p}$ ho\u1EB7c $x=${q}$`, points: 1 }
        ],
        thinking: [
          "\xDD a: b\u1ED1n h\u1EA1ng t\u1EED \u2192 nh\xF3m 3\u20131 \u0111\u1EC3 t\u1EA1o h\u1EB1ng \u0111\u1EB3ng th\u1EE9c, sau \u0111\xF3 l\xE0 hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng.",
          "\xDD b: tam th\u1EE9c b\u1EADc hai h\u1EC7 s\u1ED1 1 \u2192 t\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa."
        ],
        solution: [
          `a) $A=(x^{2}-2xy+y^{2})-${a2}=(x-y)^{2}-${a}^{2}=(x-y-${a})(x-y+${a})$.`,
          `b) $x^{2}-${p + q}x+${p * q}=x^{2}-${p}x-${q}x+${p * q}=x(x-${p})-${q}(x-${p})=(x-${p})(x-${q})$.`,
          `$(x-${p})(x-${q})=0\\Leftrightarrow x=${p}$ ho\u1EB7c $x=${q}$.`
        ]
      };
    }
  }
];

// src/bank/g9.ts
var sgn2 = (n, first = false) => n < 0 ? `-${Math.abs(n)}` : first ? `${n}` : `+${n}`;
var BANK_G9 = [
  {
    id: "g9.he-pt",
    topicId: "g9-t1",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n",
    build: (r) => {
      const x = r.int(-6, 8), y = r.int(-6, 8);
      const a1 = r.int(1, 5), b1 = r.int(1, 5) * r.sign();
      const a2 = r.int(1, 5), b2 = r.int(1, 5) * r.sign();
      const det = a1 * b2 - a2 * b1;
      if (det === 0) {
        return {
          stem: "Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh $\\sys{3x+2y=7\\\\2x-2y=3}$. (Nh\u1EADp theo d\u1EA1ng x,y.)",
          answer: "2,0.5",
          thinking: ["Quan s\xE1t h\u1EC7 s\u1ED1 c\u1EE7a $y$ \u0111\xE3 \u0111\u1ED1i nhau ($2$ v\xE0 $-2$) \u2192 c\u1ED9ng \u0111\u1EA1i s\u1ED1 ngay \u0111\u1EC3 kh\u1EED $y$."],
          solution: ["C\u1ED9ng theo v\u1EBF: $5x=10\\Rightarrow x=2$.", "Thay v\xE0o: $6+2y=7\\Rightarrow y=0{,}5$."]
        };
      }
      const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
      return {
        stem: `Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh $\\sys{${a1}x${sgn2(b1)}y=${c1}\\\\${a2}x${sgn2(b2)}y=${c2}}$. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          "Nh\xE2n hai v\u1EBF \u0111\u1EC3 h\u1EC7 s\u1ED1 c\u1EE7a m\u1ED9t \u1EA9n \u0111\u1ED1i nhau r\u1ED3i c\u1ED9ng \u0111\u1EA1i s\u1ED1 (ho\u1EB7c r\xFAt m\u1ED9t \u1EA9n \u0111\u1EC3 th\u1EBF)."
        ],
        solution: [
          `Nh\xE2n ph\u01B0\u01A1ng tr\xECnh (1) v\u1EDBi $${b2}$ v\xE0 (2) v\u1EDBi $${-b1}$ r\u1ED3i c\u1ED9ng theo v\u1EBF \u0111\u1EC3 kh\u1EED $y$:`,
          `$(${a1}\\cdot${b2}-${a2}\\cdot${b1})x=${b2}\\cdot${c1}-${b1}\\cdot${c2}$, t\u1EE9c $${det}x=${b2 * c1 - b1 * c2}$.`,
          `$x=${x}$.`,
          `Thay $x=${x}$ v\xE0o (1): $${a1}\\cdot${x}${sgn2(b1)}y=${c1}\\Rightarrow y=${y}$.`,
          `V\u1EADy h\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t $(x;y)=(${x};${y})$.`
        ]
      };
    }
  },
  {
    id: "g9.he-pt-an-phu",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh \u2014 \u0111\u1EB7t \u1EA9n ph\u1EE5",
    build: (r) => {
      const x = r.int(2, 9), y = r.int(2, 9);
      const u = 1 / x, v = 1 / y;
      const a1 = r.int(1, 4), b1 = r.int(1, 4);
      const a2 = r.int(1, 4), b2 = r.int(1, 4) * -1;
      const c1 = a1 * u + b1 * v, c2 = a2 * u + b2 * v;
      const f = (z) => {
        const [n, d] = reduce(Math.round(z * x * y), x * y);
        return d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      };
      return {
        stem: `Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh $\\sys{\\f{${a1}}{x}+\\f{${b1}}{y}=${f(c1)}\\\\\\f{${a2}}{x}-\\f{${Math.abs(b2)}}{y}=${f(c2)}}$. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          "\u1EA8n n\u1EB1m \u1EDF m\u1EABu \u2192 \u0111\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$ \u0111\u1EC3 tuy\u1EBFn t\xEDnh ho\xE1.",
          "\u0110\u1EEBng qu\xEAn \u0111i\u1EC1u ki\u1EC7n $x\\ne0$, $y\\ne0$ v\xE0 b\u01B0\u1EDBc quay v\u1EC1 \u1EA9n ban \u0111\u1EA7u."
        ],
        solution: [
          `\u0110i\u1EC1u ki\u1EC7n: $x\\ne0$, $y\\ne0$. \u0110\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$.`,
          `H\u1EC7 tr\u1EDF th\xE0nh $\\sys{${a1}u+${b1}v=${f(c1)}\\\\${a2}u-${Math.abs(b2)}v=${f(c2)}}$`,
          `Gi\u1EA3i h\u1EC7 b\u1EADc nh\u1EA5t theo $u$, $v$ ta \u0111\u01B0\u1EE3c $u=\\f{1}{${x}}$, $v=\\f{1}{${y}}$.`,
          `Quay v\u1EC1 \u1EA9n ban \u0111\u1EA7u: $x=${x}$, $y=${y}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`
        ]
      };
    }
  },
  {
    id: "g9.lap-he-pt",
    topicId: "g9-t1",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7 \u2014 hai v\xF2i n\u01B0\u1EDBc",
    build: (r) => {
      const t1 = r.pick([10, 12, 15, 20, 24]);
      const t2 = r.pick([15, 20, 24, 30, 40]);
      const t = t1 * t2 / (t1 + t2);
      const tR = Math.round(t * 100) / 100;
      return {
        stem: `Hai v\xF2i n\u01B0\u1EDBc c\xF9ng ch\u1EA3y v\xE0o m\u1ED9t b\u1EC3 c\u1EA1n th\xEC sau $${tR}$ gi\u1EDD \u0111\u1EA7y b\u1EC3. N\u1EBFu ch\u1EA3y ri\xEAng th\xEC v\xF2i th\u1EE9 nh\u1EA5t \u0111\u1EA7y b\u1EC3 trong $${t1}$ gi\u1EDD. H\u1ECFi v\xF2i th\u1EE9 hai ch\u1EA3y ri\xEAng th\xEC bao l\xE2u \u0111\u1EA7y b\u1EC3?`,
        answer: String(t2),
        thinking: [
          "B\xE0i to\xE1n c\xF4ng vi\u1EC7c \u2192 l\xE0m vi\u1EC7c v\u1EDBi N\u0102NG SU\u1EA4T (ph\u1EA7n b\u1EC3 ch\u1EA3y \u0111\u01B0\u1EE3c trong 1 gi\u1EDD).",
          "N\u0103ng su\u1EA5t c\u1ED9ng \u0111\u01B0\u1EE3c, th\u1EDDi gian th\xEC kh\xF4ng."
        ],
        solution: [
          `G\u1ECDi th\u1EDDi gian v\xF2i th\u1EE9 hai ch\u1EA3y ri\xEAng \u0111\u1EA7y b\u1EC3 l\xE0 $x$ (gi\u1EDD, $x>0$).`,
          `Trong 1 gi\u1EDD: v\xF2i 1 ch\u1EA3y \u0111\u01B0\u1EE3c $\\f{1}{${t1}}$ b\u1EC3, v\xF2i 2 ch\u1EA3y \u0111\u01B0\u1EE3c $\\f{1}{x}$ b\u1EC3.`,
          `C\xF9ng ch\u1EA3y \u0111\u1EA7y b\u1EC3 trong $${tR}$ gi\u1EDD n\xEAn $\\f{1}{${t1}}+\\f{1}{x}=\\f{1}{${tR}}$.`,
          `$\\f{1}{x}=\\f{1}{${tR}}-\\f{1}{${t1}}=\\f{1}{${t2}}\\Rightarrow x=${t2}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`,
          `V\u1EADy v\xF2i th\u1EE9 hai ch\u1EA3y ri\xEAng \u0111\u1EA7y b\u1EC3 trong **${t2} gi\u1EDD**.`
        ]
      };
    }
  },
  {
    id: "g9.can-dkxd",
    topicId: "g9-t2",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a c\u0103n th\u1EE9c",
    build: (r) => {
      const a = r.int(2, 6), b = r.int(1, 15);
      const [n, d] = reduce(b, a);
      const bound = d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      const correct = `$x\\ge${bound}$`;
      const [options, answer] = mcOptions(r, correct, [`$x\\le${bound}$`, `$x>${bound}$`, `$x\\ne${bound}$`]);
      return {
        stem: `Bi\u1EC3u th\u1EE9c $\\s{${a}x-${b}}$ x\xE1c \u0111\u1ECBnh khi v\xE0 ch\u1EC9 khi:`,
        options,
        answer,
        thinking: ["C\u0103n b\u1EADc hai c\xF3 ngh\u0129a khi bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi d\u1EA5u c\u0103n kh\xF4ng \xE2m."],
        solution: [
          `$\\s{${a}x-${b}}$ x\xE1c \u0111\u1ECBnh $\\Leftrightarrow ${a}x-${b}\\ge0$`,
          `$\\Leftrightarrow ${a}x\\ge${b}\\Leftrightarrow x\\ge${bound}$.`
        ]
      };
    }
  },
  {
    id: "g9.can-rutgon",
    topicId: "g9-t2",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n",
    build: (r) => {
      const a = r.int(1, 9);
      const correct = `\\f{${2 * a}}{x-${a * a}}`;
      const [options, answer] = mcOptions(r, correct, [
        `\\f{${2 * a}}{\\s{x}-${a}}`,
        `\\f{${2 * a}\\s{x}}{x-${a * a}}`,
        `\\f{${2 * a}}{x+${a * a}}`
      ]);
      return {
        stem: `R\xFAt g\u1ECDn $P=\\f{1}{\\s{x}-${a}}-\\f{1}{\\s{x}+${a}}$ (v\u1EDBi $x\\ge0$, $x\\ne${a * a}$).`,
        options,
        answer,
        thinking: [
          `\u0110\u1EB7t $t=\\s{x}$; m\u1EABu chung l\xE0 $(t-${a})(t+${a})=t^{2}-${a * a}=x-${a * a}$.`,
          "Quy \u0111\u1ED3ng r\u1ED3i thu g\u1ECDn t\u1EED \u2014 t\u1EED l\xE0 hi\u1EC7u c\u1EE7a hai bi\u1EC3u th\u1EE9c, ph\u1EA3i nh\u1EDB \u0111\u1ED5i d\u1EA5u."
        ],
        solution: [
          `M\u1EABu th\u1EE9c chung: $(\\s{x}-${a})(\\s{x}+${a})=x-${a * a}$.`,
          `$P=\\f{(\\s{x}+${a})-(\\s{x}-${a})}{x-${a * a}}$`,
          `$=\\f{\\s{x}+${a}-\\s{x}+${a}}{x-${a * a}}=\\f{${2 * a}}{x-${a * a}}$.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i d\u1EA5u khi b\u1ECF ngo\u1EB7c c\xF3 d\u1EA5u tr\u1EEB ph\xEDa tr\u01B0\u1EDBc \u1EDF t\u1EED s\u1ED1."
      };
    }
  },
  {
    id: "g9.can-vdc",
    topicId: "g9-t2",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n",
    build: (r) => {
      const k = r.int(2, 9);
      return {
        stem: `Cho $P=\\f{\\s{x}+${k + 1}}{\\s{x}+1}$ v\u1EDBi $x\\ge0$. T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a $P$.`,
        answer: String(k + 1),
        thinking: [
          `\u0110\u1EB7t $t=\\s{x}\\ge0$ r\u1ED3i t\xE1ch ph\u1EA7n nguy\xEAn theo m\u1EABu \u0111\u1EC3 th\u1EA5y $P$ gi\u1EA3m khi $t$ t\u0103ng.`
        ],
        solution: [
          `\u0110\u1EB7t $t=\\s{x}$, $t\\ge0$. Khi \u0111\xF3 $P=\\f{t+${k + 1}}{t+1}=\\f{(t+1)+${k}}{t+1}=1+\\f{${k}}{t+1}$.`,
          `V\xEC $t\\ge0$ n\xEAn $t+1\\ge1$, suy ra $\\f{${k}}{t+1}\\le${k}$.`,
          `Do \u0111\xF3 $P\\le${k + 1}$. D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $t=0$, t\u1EE9c $x=0$.`,
          `V\u1EADy $P_{\\max}=${k + 1}$ khi $x=0$.`
        ],
        pitfall: "Thi\u1EBFu b\u01B0\u1EDBc ch\u1EC9 ra d\u1EA5u b\u1EB1ng l\xE0 ch\u01B0a k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t."
      };
    }
  },
  {
    id: "g9.pt-bac-hai",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai",
    build: (r) => {
      const x1 = r.int(-8, 8), x2 = r.int(-8, 8);
      const a = r.int(1, 3);
      const b = -a * (x1 + x2), c = a * x1 * x2;
      const roots = Array.from(/* @__PURE__ */ new Set([x1, x2])).sort((p, q) => p - q);
      return {
        stem: `Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $${a === 1 ? "" : a}x^{2}${sgn2(b)}x${sgn2(c)}=0$. (N\u1EBFu c\xF3 hai nghi\u1EC7m, nh\u1EADp c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: roots.join(","),
        accept: [roots.slice().reverse().join(",")],
        thinking: [
          `T\xEDnh $\\Delta=b^{2}-4ac$ r\u1ED3i d\xF9ng c\xF4ng th\u1EE9c nghi\u1EC7m; th\u1EED nh\u1EA9m nghi\u1EC7m tr\u01B0\u1EDBc n\u1EBFu $a+b+c=0$ ho\u1EB7c $a-b+c=0$.`
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot${a}\\cdot(${c})=${b * b}-${4 * a * c}=${b * b - 4 * a * c}$.`,
          b * b - 4 * a * c > 0 ? `$\\Delta>0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t $x_1=${roots[0]}$, $x_2=${roots[roots.length - 1]}$.` : `$\\Delta=0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m k\xE9p $x=${roots[0]}$.`
        ]
      };
    }
  },
  {
    id: "g9.viete",
    topicId: "g9-t3",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "H\u1EC7 th\u1EE9c Vi\xE8te \u2014 bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng",
    build: (r) => {
      const b = r.int(-12, 12), c = r.int(-20, 12);
      const D = b * b - 4 * c;
      if (D <= 0) {
        return {
          stem: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-6x+4=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=x_1^{2}+x_2^{2}$.",
          answer: "28",
          thinking: ["$A$ l\xE0 bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u2192 bi\u1EC3u di\u1EC5n qua $S$ v\xE0 $P$, KH\xD4NG c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.", "$x_1^{2}+x_2^{2}=(x_1+x_2)^{2}-2x_1x_2=S^{2}-2P$."],
          solution: ["$S=6$; $P=4$.", "$A=S^{2}-2P=36-8=28$."]
        };
      }
      const S = -b, P = c;
      const A = S * S - 2 * P;
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}${sgn2(b)}x${sgn2(c)}=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=x_1^{2}+x_2^{2}$.`,
        answer: String(A),
        thinking: [
          "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u2192 bi\u1EC3u di\u1EC5n qua $S$ v\xE0 $P$, KH\xD4NG c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.",
          "Nh\u1EDB ki\u1EC3m tra $\\Delta\\ge0$ tr\u01B0\u1EDBc khi d\xF9ng Vi\xE8te."
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot1\\cdot(${c})=${D}>0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.`,
          `Theo Vi\xE8te: $S=x_1+x_2=${S}$ ; $P=x_1x_2=${P}$.`,
          `$A=x_1^{2}+x_2^{2}=S^{2}-2P=${S * S}-${2 * P}=${A}$.`
        ],
        pitfall: "D\xF9ng Vi\xE8te m\xE0 ch\u01B0a kh\u1EB3ng \u0111\u1ECBnh ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m l\xE0 m\u1EA5t \u0111i\u1EC3m l\u1EADp lu\u1EADn."
      };
    }
  },
  {
    id: "g9.viete-tham-so",
    topicId: "g9-t3",
    grade: 9,
    level: "VDC",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n tham s\u1ED1 v\u1EDBi h\u1EC7 th\u1EE9c Vi\xE8te",
    build: (r) => {
      const k = r.int(1, 6);
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2mx+m-${k}=0$ ($m$ l\xE0 tham s\u1ED1).

a) Ch\u1EE9ng minh ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t v\u1EDBi m\u1ECDi $m$.

b) T\xECm h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 gi\u1EEFa hai nghi\u1EC7m $x_1$, $x_2$ kh\xF4ng ph\u1EE5 thu\u1ED9c v\xE0o $m$.`,
        answer: "",
        rubric: [
          { criterion: `T\xEDnh \u0111\xFAng $\\Delta'=m^{2}-m+${k}$`, points: 1 },
          { criterion: `Bi\u1EBFn \u0111\u1ED5i $\\Delta'=\\left(m-\\f{1}{2}\\right)^{2}+${k}-\\f{1}{4}>0$ v\xE0 k\u1EBFt lu\u1EADn`, points: 1 },
          { criterion: `Vi\u1EBFt \u0111\xFAng Vi\xE8te: $S=2m$, $P=m-${k}$`, points: 0.5 },
          { criterion: `Kh\u1EED $m$: t\u1EEB $S=2m$ suy ra $m=\\f{S}{2}$, thay v\xE0o $P$`, points: 1 },
          { criterion: `K\u1EBFt lu\u1EADn h\u1EC7 th\u1EE9c $x_1+x_2-2x_1x_2-${2 * k}=0$`, points: 0.5 }
        ],
        thinking: [
          "\xDD a: \u0111\u01B0a $\\Delta'$ v\u1EC1 d\u1EA1ng b\xECnh ph\u01B0\u01A1ng c\u1ED9ng s\u1ED1 d\u01B0\u01A1ng.",
          "\xDD b: vi\u1EBFt $S$, $P$ theo $m$ r\u1ED3i kh\u1EED $m$ gi\u1EEFa hai bi\u1EC3u th\u1EE9c."
        ],
        solution: [
          `a) $\\Delta'=m^{2}-(m-${k})=m^{2}-m+${k}=\\left(m-\\f{1}{2}\\right)^{2}+${k}-\\f{1}{4}$.`,
          `V\xEC $\\left(m-\\f{1}{2}\\right)^{2}\\ge0$ v\xE0 $${k}-\\f{1}{4}>0$ n\xEAn $\\Delta'>0$ v\u1EDBi m\u1ECDi $m$.`,
          `V\u1EADy ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t v\u1EDBi m\u1ECDi $m$.`,
          `b) Theo Vi\xE8te: $S=x_1+x_2=2m$ v\xE0 $P=x_1x_2=m-${k}$.`,
          `T\u1EEB $S=2m$ suy ra $m=\\f{S}{2}$; thay v\xE0o $P$: $P=\\f{S}{2}-${k}$.`,
          `Nh\xE2n hai v\u1EBF v\u1EDBi 2: $2P=S-${2 * k}$, t\u1EE9c $x_1+x_2-2x_1x_2-${2 * k}=0$.`,
          `\u0110\xE2y l\xE0 h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 gi\u1EEFa hai nghi\u1EC7m kh\xF4ng ph\u1EE5 thu\u1ED9c tham s\u1ED1 $m$.`
        ]
      };
    }
  },
  {
    id: "g9.parabol",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "H\xE0m s\u1ED1 y = ax\xB2 v\xE0 \u0111i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB",
    build: (r) => {
      const a = r.int(1, 4) * r.sign();
      const x0 = r.int(-4, 4) || 2;
      const y0 = a * x0 * x0;
      const [options, answer] = mcOptions(r, String(y0), distractInt(r, y0, 4).map(String));
      return {
        stem: `Cho h\xE0m s\u1ED1 $y=${a}x^{2}$. Tung \u0111\u1ED9 c\u1EE7a \u0111i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB c\xF3 ho\xE0nh \u0111\u1ED9 $x=${x0}$ l\xE0:`,
        options,
        answer,
        thinking: ["Thay ho\xE0nh \u0111\u1ED9 v\xE0o c\xF4ng th\u1EE9c h\xE0m s\u1ED1; ch\xFA \xFD b\xECnh ph\u01B0\u01A1ng c\u1EE7a s\u1ED1 \xE2m l\xE0 s\u1ED1 d\u01B0\u01A1ng."],
        solution: [`$y=${a}\\cdot(${x0})^{2}=${a}\\cdot${x0 * x0}=${y0}$.`],
        pitfall: `Qu\xEAn d\u1EA5u ngo\u1EB7c khi b\xECnh ph\u01B0\u01A1ng s\u1ED1 \xE2m.`
      };
    }
  },
  {
    id: "g9.bpt",
    topicId: "g9-t4",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "B\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
    build: (r) => {
      const a = -r.int(2, 7), b = r.int(-12, 12);
      const [n, d] = reduce(-b, a);
      const bound = d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      const correct = `$x<${bound}$`;
      const [options, answer] = mcOptions(r, correct, [`$x>${bound}$`, `$x\\le${bound}$`, `$x\\ge${bound}$`]);
      return {
        stem: `T\u1EADp nghi\u1EC7m c\u1EE7a b\u1EA5t ph\u01B0\u01A1ng tr\xECnh $${a}x${sgn2(b)}>0$ l\xE0:`,
        options,
        answer,
        thinking: ["Chuy\u1EC3n v\u1EBF r\u1ED3i chia hai v\u1EBF cho h\u1EC7 s\u1ED1 \xC2M \u2192 ph\u1EA3i \u0110\u1ED4I CHI\u1EC0U b\u1EA5t \u0111\u1EB3ng th\u1EE9c."],
        solution: [
          `$${a}x>${-b}$`,
          `Chia hai v\u1EBF cho $${a}<0$ n\xEAn \u0111\u1ED5i chi\u1EC1u: $x<\\f{${-b}}{${a}}=${bound}$.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i chi\u1EC1u khi chia cho s\u1ED1 \xE2m \u2014 l\u1ED7i sai kinh \u0111i\u1EC3n."
      };
    }
  },
  {
    id: "g9.he-thuc-luong",
    topicId: "g9-t5",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao",
    build: (r) => {
      const bh = r.pick([1, 2, 3, 4, 6, 8, 9]);
      const ch = r.pick([4, 9, 12, 16, 25, 27]);
      const h2 = bh * ch;
      const h = Math.sqrt(h2);
      const isInt = Number.isInteger(h);
      return {
        stem: `Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$. Bi\u1EBFt $BH=${bh}\\,cm$, $CH=${ch}\\,cm$. T\xEDnh \u0111\u1ED9 d\xE0i $AH$ (\u0111\u01A1n v\u1ECB: cm; n\u1EBFu l\xE0 c\u0103n th\xEC nh\u1EADp d\u1EA1ng nh\u01B0 6, 2\u221A3 \u2192 vi\u1EBFt 2sqrt3).`,
        answer: isInt ? String(h) : simplifySqrt(h2).replace(/\\s\{(\d+)\}/, "sqrt$1"),
        accept: [String(Math.round(h * 1e3) / 1e3)],
        thinking: ["C\xF3 hai h\xECnh chi\u1EBFu c\u1EE7a hai c\u1EA1nh g\xF3c vu\xF4ng \u2192 d\xF9ng h\u1EC7 th\u1EE9c $h^{2}=b'c'$."],
        solution: [
          `$AH^{2}=BH\\cdot CH=${bh}\\cdot${ch}=${h2}$.`,
          `$AH=\\s{${h2}}=${isInt ? h : simplifySqrt(h2)}\\ (cm)$.`
        ]
      };
    }
  },
  {
    id: "g9.ti-so-luong-giac",
    topicId: "g9-t5",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c \u2014 b\xE0i to\xE1n th\u1EF1c t\u1EBF",
    build: (r) => {
      const d = r.pick([20, 25, 30, 40, 50]);
      const ang = r.pick([30, 35, 40, 45, 50, 55, 60]);
      const eye = r.pick([1.5, 1.6, 1.7]);
      const h = d * Math.tan(ang * Math.PI / 180) + eye;
      return {
        stem: `T\u1EEB m\u1ED9t \u0111i\u1EC3m c\xE1ch ch\xE2n to\xE0 nh\xE0 $${d}\\,m$, ng\u01B0\u1EDDi ta nh\xECn \u0111\u1EC9nh to\xE0 nh\xE0 d\u01B0\u1EDBi g\xF3c n\xE2ng $${ang}\\deg$. Bi\u1EBFt m\u1EAFt ng\u01B0\u1EDDi quan s\xE1t cao $${eye}\\,m$ so v\u1EDBi m\u1EB7t \u0111\u1EA5t. T\xEDnh chi\u1EC1u cao to\xE0 nh\xE0 (l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi, \u0111\u01A1n v\u1ECB: m).`,
        answer: String(Math.round(h * 10) / 10),
        thinking: [
          "V\u1EBD tam gi\xE1c vu\xF4ng: c\u1EA1nh k\u1EC1 l\xE0 kho\u1EA3ng c\xE1ch ngang, c\u1EA1nh \u0111\u1ED1i l\xE0 chi\u1EC1u cao t\xEDnh t\u1EEB t\u1EA7m m\u1EAFt.",
          "D\xF9ng $\\tan$ v\xEC li\xEAn h\u1EC7 c\u1EA1nh \u0111\u1ED1i v\xE0 c\u1EA1nh k\u1EC1. \u0110\u1EEBng qu\xEAn c\u1ED9ng chi\u1EC1u cao m\u1EAFt."
        ],
        solution: [
          `G\u1ECDi $h_1$ l\xE0 chi\u1EC1u cao t\u1EEB t\u1EA7m m\u1EAFt \u0111\u1EBFn \u0111\u1EC9nh to\xE0 nh\xE0.`,
          `$\\tan${ang}\\deg=\\f{h_1}{${d}}\\Rightarrow h_1=${d}\\cdot\\tan${ang}\\deg\\approx${Math.round(d * Math.tan(ang * Math.PI / 180) * 100) / 100}\\ (m)$.`,
          `Chi\u1EC1u cao to\xE0 nh\xE0: $h=h_1+${eye}\\approx${Math.round(h * 10) / 10}\\ (m)$.`
        ],
        pitfall: "Qu\xEAn c\u1ED9ng chi\u1EC1u cao m\u1EAFt ng\u01B0\u1EDDi quan s\xE1t."
      };
    }
  },
  {
    id: "g9.duong-tron",
    topicId: "g9-t6",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "\u0110\u1ED9 d\xE0i cung v\xE0 di\u1EC7n t\xEDch h\xECnh qu\u1EA1t",
    build: (r) => {
      const R = r.int(2, 12), n = r.pick([30, 45, 60, 90, 120, 150, 180]);
      const [ln, ld] = reduce(R * n, 180);
      const correct = ld === 1 ? `${ln}\\pi` : `\\f{${ln}\\pi}{${ld}}`;
      const [options, answer] = mcOptions(r, correct, [
        `${R * n}\\pi`,
        `\\f{${R * R * n}\\pi}{360}`,
        ld === 1 ? `${ln * 2}\\pi` : `\\f{${ln}\\pi}{${ld * 2}}`
      ]);
      return {
        stem: `Cho \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ v\u1EDBi $R=${R}\\,cm$. T\xEDnh \u0111\u1ED9 d\xE0i cung c\xF3 s\u1ED1 \u0111o $${n}\\deg$.`,
        options,
        answer,
        thinking: ["C\xF4ng th\u1EE9c \u0111\u1ED9 d\xE0i cung: $l=\\f{\\pi Rn}{180}$ (m\u1EABu 180 cho \u0110\u1ED8 D\xC0I, m\u1EABu 360 cho DI\u1EC6N T\xCDCH qu\u1EA1t)."],
        solution: [
          `$l=\\f{\\pi Rn}{180}=\\f{\\pi\\cdot${R}\\cdot${n}}{180}=${correct}\\ (cm)$.`
        ],
        pitfall: "Nh\u1EA7m m\u1EABu 180 (\u0111\u1ED9 d\xE0i cung) v\u1EDBi 360 (di\u1EC7n t\xEDch qu\u1EA1t)."
      };
    }
  },
  {
    id: "g9.goc-duong-tron",
    topicId: "g9-t6",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "G\xF3c n\u1ED9i ti\u1EBFp v\xE0 g\xF3c \u1EDF t\xE2m",
    build: (r) => {
      const cung = r.int(40, 170);
      return {
        stem: `Cho \u0111\u01B0\u1EDDng tr\xF2n $(O)$ v\xE0 cung $AB$ c\xF3 s\u1ED1 \u0111o $${cung}\\deg$. T\xEDnh s\u1ED1 \u0111o g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung $AB$ (nh\u1EADp s\u1ED1 \u0111o theo \u0111\u1ED9).`,
        answer: String(Math.round(cung / 2 * 100) / 100),
        thinking: ["G\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng N\u1EECA s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn; g\xF3c \u1EDF t\xE2m b\u1EB1ng C\u1EA2 s\u1ED1 \u0111o cung."],
        solution: [
          `G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung $AB$ c\xF3 s\u1ED1 \u0111o $=\\f{1}{2}\\cdot${cung}\\deg=${Math.round(cung / 2 * 100) / 100}\\deg$.`,
          `(Trong khi g\xF3c \u1EDF t\xE2m $\\angle AOB=${cung}\\deg$.)`
        ]
      };
    }
  },
  {
    id: "g9.tu-giac-noi-tiep",
    topicId: "g9-t6",
    grade: 9,
    level: "VD",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
    build: (r) => {
      void r;
      return {
        stem: "Cho tam gi\xE1c $ABC$ nh\u1ECDn, c\xE1c \u0111\u01B0\u1EDDng cao $BE$ v\xE0 $CF$ c\u1EAFt nhau t\u1EA1i $H$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai:",
        options: [
          "T\u1EE9 gi\xE1c $AEHF$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AH$",
          "T\u1EE9 gi\xE1c $BFEC$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $BC$",
          "$\\angle AEF=\\angle ABC$",
          "T\u1EE9 gi\xE1c $BFHD$ (v\u1EDBi $D$ l\xE0 ch\xE2n \u0111\u01B0\u1EDDng cao t\u1EEB $A$) kh\xF4ng n\u1ED9i ti\u1EBFp"
        ],
        answer: [true, true, true, false],
        thinking: [
          "M\u1ECDi c\xE2u h\xECnh thi v\xE0o 10 \u0111\u1EC1u b\u1EAFt \u0111\u1EA7u b\u1EB1ng vi\u1EC7c \u201Cs\u0103n\u201D c\xE1c g\xF3c vu\xF4ng \u0111\u1EC3 t\xECm t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp."
        ],
        solution: [
          "$\\angle AEH=\\angle AFH=90\\deg$, t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$ \u2192 $AEHF$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AH$. (a \u0111\xFAng)",
          "$\\angle BFC=\\angle BEC=90\\deg$: hai \u0111\u1EC9nh $F$, $E$ k\u1EC1 nhau c\xF9ng nh\xECn c\u1EA1nh $BC$ d\u01B0\u1EDBi g\xF3c vu\xF4ng \u2192 $BFEC$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $BC$. (b \u0111\xFAng)",
          "T\u1EEB $BFEC$ n\u1ED9i ti\u1EBFp: $\\angle AEF=\\angle ABC$ (g\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng g\xF3c trong c\u1EE7a \u0111\u1EC9nh \u0111\u1ED1i di\u1EC7n). (c \u0111\xFAng)",
          "$\\angle BFH=\\angle BDH=90\\deg$ n\xEAn $BFHD$ c\u0169ng n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $BH$. (d sai)"
        ]
      };
    }
  },
  {
    id: "g9.hinh-tru-non-cau",
    topicId: "g9-t7",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\xECnh tr\u1EE5 \u2014 h\xECnh n\xF3n \u2014 h\xECnh c\u1EA7u",
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
      const [rad, h, l] = trip;
      const V = rad * rad * h / 3;
      return {
        stem: `M\u1ED9t h\xECnh n\xF3n c\xF3 b\xE1n k\xEDnh \u0111\xE1y $${rad}\\,cm$ v\xE0 \u0111\u01B0\u1EDDng sinh $${l}\\,cm$. T\xEDnh th\u1EC3 t\xEDch h\xECnh n\xF3n (k\u1EBFt qu\u1EA3 d\u1EA1ng $k\\pi$, ch\u1EC9 nh\u1EADp gi\xE1 tr\u1ECB $k$).`,
        answer: String(Math.round(V * 100) / 100),
        thinking: [
          "Mu\u1ED1n t\xEDnh th\u1EC3 t\xEDch c\u1EA7n chi\u1EC1u cao; d\xF9ng $l^{2}=r^{2}+h^{2}$ \u0111\u1EC3 t\xECm $h$."
        ],
        solution: [
          `$h=\\s{l^{2}-r^{2}}=\\s{${l * l}-${rad * rad}}=\\s{${h * h}}=${h}\\ (cm)$.`,
          `$V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot${rad * rad}\\cdot${h}=${Math.round(V * 100) / 100}\\pi\\ (cm^{3})$.`
        ],
        pitfall: "Nh\u1EA7m \u0111\u01B0\u1EDDng sinh $l$ v\u1EDBi chi\u1EC1u cao $h$."
      };
    }
  },
  {
    id: "g9.thong-ke",
    topicId: "g9-t8",
    grade: 9,
    level: "NB",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i",
    build: (r) => {
      const total = r.pick([40, 50, 80, 200, 250]);
      const n = r.int(4, Math.floor(total / 2));
      const f = n / total * 100;
      return {
        stem: `Trong m\u1ED9t m\u1EABu s\u1ED1 li\u1EC7u g\u1ED3m $${total}$ gi\xE1 tr\u1ECB, gi\xE1 tr\u1ECB $x$ xu\u1EA5t hi\u1EC7n $${n}$ l\u1EA7n. T\xEDnh t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a $x$ (\u0111\u01A1n v\u1ECB %, nh\u1EADp s\u1ED1).`,
        answer: String(Math.round(f * 100) / 100),
        thinking: ["T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i $=\\f{\\text{t\u1EA7n s\u1ED1}}{\\text{t\u1ED5ng s\u1ED1}}\\cdot100\\percent$."],
        solution: [`$f=\\f{${n}}{${total}}\\cdot100\\percent=${Math.round(f * 100) / 100}\\percent$.`]
      };
    }
  },
  {
    id: "g9.xac-suat",
    topicId: "g9-t8",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "X\xE1c su\u1EA5t ph\xE9p th\u1EED hai giai \u0111o\u1EA1n",
    build: (r) => {
      const kind = r.pick(["coin", "dice"]);
      if (kind === "coin") {
        return {
          stem: "Tung m\u1ED9t \u0111\u1ED3ng xu c\xE2n \u0111\u1ED1i hai l\u1EA7n. T\xEDnh x\xE1c su\u1EA5t \u0111\u1EC3 c\xF3 \xEDt nh\u1EA5t m\u1ED9t l\u1EA7n xu\u1EA5t hi\u1EC7n m\u1EB7t s\u1EA5p (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).",
          answer: "3/4",
          accept: ["0.75"],
          thinking: [
            "Li\u1EC7t k\xEA \u0111\u1EE7 kh\xF4ng gian m\u1EABu b\u1EB1ng s\u01A1 \u0111\u1ED3 c\xE2y.",
            "D\xF9ng ph\u1EA7n b\xF9: \u201C\xEDt nh\u1EA5t m\u1ED9t l\u1EA7n S\u201D l\xE0 b\xF9 c\u1EE7a \u201Ckh\xF4ng l\u1EA7n n\xE0o S\u201D."
          ],
          solution: [
            "Kh\xF4ng gian m\u1EABu: $\\{NN;NS;SN;SS\\}$ \u2014 4 k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
            "Bi\u1EBFn c\u1ED1 \u0111\u1ED1i \u201Ckh\xF4ng c\xF3 m\u1EB7t s\u1EA5p\u201D ch\u1EC9 c\xF3 1 k\u1EBFt qu\u1EA3 l\xE0 $NN$.",
            "$P=1-\\f{1}{4}=\\f{3}{4}$."
          ]
        };
      }
      const target = r.int(4, 10);
      let cnt = 0;
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === target) cnt++;
      const [rn, rd] = reduce(cnt, 36);
      return {
        stem: `Gieo hai con x\xFAc x\u1EAFc c\xE2n \u0111\u1ED1i. T\xEDnh x\xE1c su\u1EA5t \u0111\u1EC3 t\u1ED5ng s\u1ED1 ch\u1EA5m b\u1EB1ng $${target}$ (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ["Kh\xF4ng gian m\u1EABu c\xF3 $6\\cdot6=36$ k\u1EBFt qu\u1EA3; li\u1EC7t k\xEA c\xE1c c\u1EB7p c\xF3 t\u1ED5ng b\u1EB1ng y\xEAu c\u1EA7u."],
        solution: [
          `S\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3: $6\\cdot6=36$.`,
          `S\u1ED1 c\u1EB7p $(i;j)$ v\u1EDBi $i+j=${target}$: c\xF3 $${cnt}$ c\u1EB7p.`,
          `$P=\\f{${cnt}}{36}=\\f{${rn}}{${rd}}$.`
        ]
      };
    }
  },
  {
    id: "g9.hinh-tu-luan",
    topicId: "g9-t6",
    grade: 9,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "T\u1EF1 lu\u1EADn h\xECnh h\u1ECDc \u2014 c\xE2u h\xECnh thi v\xE0o 10",
    build: (r) => {
      void r;
      return {
        stem: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O)$ v\xE0 \u0111i\u1EC3m $M$ n\u1EB1m ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n. T\u1EEB $M$ k\u1EBB hai ti\u1EBFp tuy\u1EBFn $MA$, $MB$ t\u1EDBi $(O)$ ($A$, $B$ l\xE0 c\xE1c ti\u1EBFp \u0111i\u1EC3m) v\xE0 m\u1ED9t c\xE1t tuy\u1EBFn $MCD$ (v\u1EDBi $C$ n\u1EB1m gi\u1EEFa $M$ v\xE0 $D$).\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $MAOB$ n\u1ED9i ti\u1EBFp.\n\nb) Ch\u1EE9ng minh $MA^{2}=MC\\cdot MD$.\n\nc) G\u1ECDi $H$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $MO$ v\xE0 $AB$. Ch\u1EE9ng minh $MH\\cdot MO=MC\\cdot MD$.",
        answer: "",
        rubric: [
          { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 k\xFD hi\u1EC7u", points: 0.5 },
          { criterion: "\xDD a: ch\u1EC9 ra $\\angle MAO=\\angle MBO=90\\deg$ v\xE0 k\u1EBFt lu\u1EADn t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $MO$", points: 1 },
          { criterion: "\xDD b: ch\u1EE9ng minh $\\tri MAC\\sim\\tri MDA$ (g\xF3c $M$ chung, g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp)", points: 1 },
          { criterion: "\xDD b: suy ra t\u1EC9 l\u1EC7 v\xE0 k\u1EBFt lu\u1EADn $MA^{2}=MC\\cdot MD$", points: 0.5 },
          { criterion: "\xDD c: ch\u1EE9ng minh $MO\\perp AB$ t\u1EA1i $H$ v\xE0 d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng $MA^{2}=MH\\cdot MO$", points: 1 },
          { criterion: "\xDD c: k\u1EBFt h\u1EE3p hai k\u1EBFt qu\u1EA3 \u0111\u1EC3 k\u1EBFt lu\u1EADn", points: 0.5 }
        ],
        thinking: [
          "\xDD a: hai ti\u1EBFp tuy\u1EBFn cho ngay hai g\xF3c vu\xF4ng \u2192 t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $MO$.",
          "\xDD b: h\u1EC7 th\u1EE9c t\xEDch \u2192 \u0111\u01B0a v\u1EC1 t\u1EC9 l\u1EC7 $\\f{MA}{MD}=\\f{MC}{MA}$ \u2192 t\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng.",
          "\xDD c: n\u1ED1i k\u1EBFt qu\u1EA3 b v\u1EDBi h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng $MAO$."
        ],
        solution: [
          "a) V\xEC $MA$, $MB$ l\xE0 ti\u1EBFp tuy\u1EBFn c\u1EE7a $(O)$ t\u1EA1i $A$, $B$ n\xEAn $MA\\perp OA$, $MB\\perp OB$.",
          "Suy ra $\\angle MAO=\\angle MBO=90\\deg$, t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$.",
          "V\u1EADy t\u1EE9 gi\xE1c $MAOB$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $MO$.",
          "b) X\xE9t $\\tri MAC$ v\xE0 $\\tri MDA$ c\xF3: $\\angle M$ chung;",
          "$\\angle MAC=\\angle MDA$ (g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn $MA$ v\xE0 d\xE2y $AC$ b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp $\\angle ADC$ c\xF9ng ch\u1EAFn cung $AC$).",
          "Do \u0111\xF3 $\\tri MAC\\sim\\tri MDA$ (g.g), suy ra $\\f{MA}{MD}=\\f{MC}{MA}$, t\u1EE9c $MA^{2}=MC\\cdot MD$.",
          "c) V\xEC $MA=MB$ v\xE0 $OA=OB$ n\xEAn $MO$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $AB$, do \u0111\xF3 $MO\\perp AB$ t\u1EA1i $H$.",
          "X\xE9t tam gi\xE1c $MAO$ vu\xF4ng t\u1EA1i $A$ c\xF3 \u0111\u01B0\u1EDDng cao $AH$: $MA^{2}=MH\\cdot MO$ (h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng).",
          "K\u1EBFt h\u1EE3p v\u1EDBi \xFD b: $MH\\cdot MO=MA^{2}=MC\\cdot MD$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ]
      };
    }
  }
];

// src/bank/g6-plus.ts
var BANK_G6_PLUS = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: "g6.nb-thu-tu",
    topicId: "g6-t1",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh",
    build: (r) => {
      const a = r.int(20, 90), b = r.pick([2, 4, 5, 10]), c = b * r.int(3, 12);
      const val = a - c / b;
      const [options, answer] = mcOptions(r, String(val), [String((a - c) / b), String(a + c / b), String(a * b - c)]);
      return {
        stem: `Gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $${a}-${c}:${b}$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ["Kh\xF4ng c\xF3 ngo\u1EB7c: nh\xE2n chia l\xE0m tr\u01B0\u1EDBc, c\u1ED9ng tr\u1EEB l\xE0m sau."],
        solution: [`$${c}:${b}=${c / b}$.`, `$${a}-${c / b}=${val}$.`],
        pitfall: `N\u1EBFu tr\u1EEB tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi chia s\u1EBD ra $${(a - c) / b}$ \u2014 \u0111\xE2y l\xE0 ph\u01B0\u01A1ng \xE1n nhi\u1EC5u.`
      };
    }
  },
  {
    id: "g6.nb-luy-thua-gt",
    topicId: "g6-t1",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Gi\xE1 tr\u1ECB c\u1EE7a l\u0169y th\u1EEBa",
    build: (r) => {
      const a = r.int(2, 6), n = r.int(2, 4);
      const v = a ** n;
      const [options, answer] = mcOptions(r, String(v), [String(a * n), String(a ** (n - 1)), String(a * a * n)]);
      return {
        stem: `Gi\xE1 tr\u1ECB c\u1EE7a $${a}^{${n}}$ b\u1EB1ng:`,
        options,
        answer,
        thinking: [`$a^{n}$ ngh\u0129a l\xE0 nh\xE2n $n$ th\u1EEBa s\u1ED1 $a$ v\u1EDBi nhau, kh\xF4ng ph\u1EA3i $a$ nh\xE2n $n$.`],
        solution: [`$${a}^{${n}}=${Array(n).fill(a).join("\\cdot")}=${v}$.`],
        pitfall: `Nh\u1EA7m $${a}^{${n}}$ th\xE0nh $${a}\\cdot${n}=${a * n}$.`
      };
    }
  },
  {
    id: "g6.nb-dau-hieu-2-5",
    topicId: "g6-t2",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, 3, 5, 9",
    build: (r) => {
      const d = r.pick([2, 3, 5, 9]);
      const ok = d * r.int(20, 110);
      const bad2 = [ok + 1, ok + 2, ok + d - 1].filter((x) => x % d !== 0).slice(0, 3);
      while (bad2.length < 3) bad2.push(ok + bad2.length + 3);
      const [options, answer] = mcOptions(r, String(ok), bad2.map(String));
      return {
        stem: `Trong c\xE1c s\u1ED1 sau, s\u1ED1 n\xE0o chia h\u1EBFt cho $${d}$?`,
        options,
        answer,
        thinking: d === 2 || d === 5 ? [`Chia h\u1EBFt cho ${d} th\xEC x\xE9t **ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng**.`] : [`Chia h\u1EBFt cho ${d} th\xEC x\xE9t **t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1**.`],
        solution: [
          `$${ok}=${d}\\cdot${ok / d}$ n\xEAn $${ok};\\vdots;${d}$.`,
          d === 3 || d === 9 ? `Ki\u1EC3m tra nhanh: t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 c\u1EE7a $${ok}$ l\xE0 $${String(ok).split("").reduce((s, c) => s + Number(c), 0)}$, chia h\u1EBFt cho $${d}$.` : `Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a $${ok}$ l\xE0 $${String(ok).slice(-1)}$.`
        ]
      };
    }
  },
  {
    id: "g6.nb-nguyen-to",
    topicId: "g6-t2",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\u1EADn bi\u1EBFt s\u1ED1 nguy\xEAn t\u1ED1 \u2014 h\u1EE3p s\u1ED1",
    build: (r) => {
      const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const comps = [15, 21, 25, 27, 33, 35, 39, 49, 51, 55, 57];
      const p = r.pick(primes);
      const [options, answer] = mcOptions(r, String(p), r.shuffle(comps).slice(0, 3).map(String));
      return {
        stem: "Trong c\xE1c s\u1ED1 sau, s\u1ED1 n\xE0o l\xE0 **s\u1ED1 nguy\xEAn t\u1ED1**?",
        options,
        answer,
        thinking: ["S\u1ED1 nguy\xEAn t\u1ED1 l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn h\u01A1n 1, ch\u1EC9 c\xF3 \u0111\xFAng hai \u01B0\u1EDBc l\xE0 1 v\xE0 ch\xEDnh n\xF3."],
        solution: [
          `$${p}$ ch\u1EC9 chia h\u1EBFt cho $1$ v\xE0 $${p}$ n\xEAn l\xE0 s\u1ED1 nguy\xEAn t\u1ED1.`,
          "C\xE1c s\u1ED1 c\xF2n l\u1EA1i \u0111\u1EC1u c\xF3 th\xEAm \u01B0\u1EDBc kh\xE1c n\xEAn l\xE0 h\u1EE3p s\u1ED1."
        ],
        pitfall: "S\u1ED1 1 kh\xF4ng ph\u1EA3i s\u1ED1 nguy\xEAn t\u1ED1, c\u0169ng kh\xF4ng ph\u1EA3i h\u1EE3p s\u1ED1."
      };
    }
  },
  {
    id: "g6.nb-so-doi",
    topicId: "g6-t3",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "S\u1ED1 \u0111\u1ED1i v\xE0 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.int(-30, 30) || -7;
      const ask = r.pick(["doi", "abs"]);
      const v = ask === "doi" ? -a : Math.abs(a);
      const [options, answer] = mcOptions(r, String(v), distractInt(r, v, 3).map(String));
      return {
        stem: ask === "doi" ? `S\u1ED1 \u0111\u1ED1i c\u1EE7a $${a}$ l\xE0:` : `Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i $\\abs{${a}}$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ask === "doi" ? ["S\u1ED1 \u0111\u1ED1i c\u1EE7a $a$ l\xE0 $-a$: \u0111\u1ED5i d\u1EA5u, gi\u1EEF nguy\xEAn \u0111\u1ED9 l\u1EDBn."] : ["Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\xE0 kho\u1EA3ng c\xE1ch t\u1EDBi \u0111i\u1EC3m 0, lu\xF4n kh\xF4ng \xE2m."],
        solution: ask === "doi" ? [`S\u1ED1 \u0111\u1ED1i c\u1EE7a $${a}$ l\xE0 $${-a}$ v\xEC $${a}+(${-a})=0$.`] : [`$\\abs{${a}}=${Math.abs(a)}$.`]
      };
    }
  },
  {
    id: "g6.nb-phan-so-bang",
    topicId: "g6-t4",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE2n s\u1ED1 b\u1EB1ng nhau",
    build: (r) => {
      const n = r.int(1, 8), d = r.int(n + 1, 12), k = r.int(2, 6);
      const correct = `\\f{${n * k}}{${d * k}}`;
      const [options, answer] = mcOptions(r, correct, [
        `\\f{${n + k}}{${d + k}}`,
        `\\f{${n * k}}{${d}}`,
        `\\f{${d * k}}{${n * k}}`
      ]);
      return {
        stem: `Ph\xE2n s\u1ED1 n\xE0o sau \u0111\xE2y b\u1EB1ng ph\xE2n s\u1ED1 $\\f{${n}}{${d}}$?`,
        options,
        answer,
        thinking: ["Nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi c\xF9ng m\u1ED9t s\u1ED1 kh\xE1c 0 th\xEC \u0111\u01B0\u1EE3c ph\xE2n s\u1ED1 b\u1EB1ng n\xF3."],
        solution: [`$\\f{${n}}{${d}}=\\f{${n}\\cdot${k}}{${d}\\cdot${k}}=\\f{${n * k}}{${d * k}}$.`],
        pitfall: "C\u1ED9ng c\xF9ng m\u1ED9t s\u1ED1 v\xE0o t\u1EED v\xE0 m\u1EABu KH\xD4NG cho ph\xE2n s\u1ED1 b\u1EB1ng nhau."
      };
    }
  },
  {
    id: "g6.nb-hinh-cong-thuc",
    topicId: "g6-t6",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Nh\u1EADn bi\u1EBFt c\xF4ng th\u1EE9c chu vi \u2014 di\u1EC7n t\xEDch",
    build: (r) => {
      const bank = [
        { q: "Di\u1EC7n t\xEDch h\xECnh thoi c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o $m$ v\xE0 $n$ \u0111\u01B0\u1EE3c t\xEDnh b\u1EB1ng c\xF4ng th\u1EE9c n\xE0o?", a: "$S=\\f{1}{2}mn$", w: ["$S=mn$", "$S=2mn$", "$S=\\f{m+n}{2}$"] },
        { q: "Chu vi h\xECnh ch\u1EEF nh\u1EADt c\xF3 hai k\xEDch th\u01B0\u1EDBc $a$, $b$ \u0111\u01B0\u1EE3c t\xEDnh b\u1EB1ng:", a: "$C=2(a+b)$", w: ["$C=a+b$", "$C=ab$", "$C=4(a+b)$"] },
        { q: "Di\u1EC7n t\xEDch h\xECnh b\xECnh h\xE0nh c\xF3 \u0111\xE1y $a$ v\xE0 chi\u1EC1u cao $h$ l\xE0:", a: "$S=a\\cdot h$", w: ["$S=\\f{ah}{2}$", "$S=2ah$", "$S=a+h$"] },
        { q: "Di\u1EC7n t\xEDch h\xECnh thang c\xF3 hai \u0111\xE1y $a$, $b$ v\xE0 chi\u1EC1u cao $h$ l\xE0:", a: "$S=\\f{(a+b)h}{2}$", w: ["$S=(a+b)h$", "$S=\\f{abh}{2}$", "$S=\\f{a+b}{2}+h$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["\u0110\u1ED1i chi\u1EBFu v\u1EDBi b\u1EA3ng c\xF4ng th\u1EE9c chu vi \u2013 di\u1EC7n t\xEDch trong C\u1EA9m nang \u0111i\u1EC3m 10."],
        solution: [`C\xF4ng th\u1EE9c \u0111\xFAng l\xE0 ${it.a}.`]
      };
    }
  },
  {
    id: "g6.nb-trung-diem",
    topicId: "g6-t7",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng",
    build: (r) => {
      const ab = r.int(3, 20) * 2;
      const [options, answer] = mcOptions(r, String(ab / 2), distractInt(r, ab / 2, 3).map(String));
      return {
        stem: `Cho $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng $AB$ v\u1EDBi $AB=${ab}\\,cm$. \u0110\u1ED9 d\xE0i $MA$ b\u1EB1ng bao nhi\xEAu x\u0103ng-ti-m\xE9t?`,
        options,
        answer,
        thinking: ["Trung \u0111i\u1EC3m chia \u0111o\u1EA1n th\u1EB3ng th\xE0nh hai ph\u1EA7n b\u1EB1ng nhau, m\u1ED7i ph\u1EA7n b\u1EB1ng n\u1EEDa c\u1EA3 \u0111o\u1EA1n."],
        solution: [`$MA=MB=\\f{AB}{2}=\\f{${ab}}{2}=${ab / 2}\\ (cm)$.`]
      };
    }
  },
  /* ============================ THÔNG HIỂU ============================ */
  {
    id: "g6.th-ucln-bcnn",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\xECm \u01AFCLN v\xE0 BCNN",
    build: (r) => {
      const a = r.pick([12, 18, 24, 30, 36, 40, 45]);
      const b = r.pick([16, 20, 27, 32, 42, 48, 60]);
      const ask = r.pick(["ucln", "bcnn"]);
      const v = ask === "ucln" ? gcd(a, b) : lcm(a, b);
      const wrong = ask === "ucln" ? [lcm(a, b), gcd(a, b) * 2, Math.abs(a - b)] : [gcd(a, b), a * b, lcm(a, b) / 2];
      const [options, answer] = mcOptions(r, String(v), wrong.map(String));
      return {
        stem: `${ask === "ucln" ? "\u01AFCLN" : "BCNN"}$(${a};${b})$ b\u1EB1ng:`,
        options,
        answer,
        thinking: [
          "Ph\xE2n t\xEDch c\u1EA3 hai s\u1ED1 ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1.",
          ask === "ucln" ? "\u01AFCLN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung**, m\u1ED7i th\u1EEBa s\u1ED1 l\u1EA5y s\u1ED1 m\u0169 **nh\u1ECF nh\u1EA5t**." : "BCNN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung v\xE0 ri\xEAng**, m\u1ED7i th\u1EEBa s\u1ED1 l\u1EA5y s\u1ED1 m\u0169 **l\u1EDBn nh\u1EA5t**."
        ],
        solution: [
          `$${a}=${factorize(a).map(([p, e]) => e === 1 ? `${p}` : `${p}^{${e}}`).join("\\cdot")}$`,
          `$${b}=${factorize(b).map(([p, e]) => e === 1 ? `${p}` : `${p}^{${e}}`).join("\\cdot")}$`,
          `${ask === "ucln" ? "\u01AFCLN" : "BCNN"}$(${a};${b})=${v}$.`,
          `Ki\u1EC3m tra: \u01AFCLN$\\cdot$BCNN$=${gcd(a, b)}\\cdot${lcm(a, b)}=${a * b}=${a}\\cdot${b}$ \u2713`
        ]
      };
    }
  },
  {
    id: "g6.th-so-nguyen-mc",
    topicId: "g6-t3",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 nguy\xEAn",
    build: (r) => {
      const a = r.int(-25, 25) || -8, b = r.int(-25, 25) || 6;
      const op = r.pick(["+", "-", "\xB7"]);
      const v = op === "+" ? a + b : op === "-" ? a - b : a * b;
      const [options, answer] = mcOptions(r, String(v), distractInt(r, v, Math.abs(b) || 3).map(String));
      const expr = op === "\xB7" ? `(${a})\\cdot(${b})` : `(${a})${op}(${b})`;
      return {
        stem: `K\u1EBFt qu\u1EA3 c\u1EE7a ph\xE9p t\xEDnh $${expr}$ l\xE0:`,
        options,
        answer,
        thinking: op === "\xB7" ? ["X\xE1c \u0111\u1ECBnh d\u1EA5u tr\u01B0\u1EDBc: t\xEDch hai s\u1ED1 c\xF9ng d\u1EA5u l\xE0 d\u01B0\u01A1ng, kh\xE1c d\u1EA5u l\xE0 \xE2m. Sau \u0111\xF3 nh\xE2n hai gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i."] : ["\u0110\u01B0a ph\xE9p tr\u1EEB v\u1EC1 ph\xE9p c\u1ED9ng v\u1EDBi s\u1ED1 \u0111\u1ED1i, r\u1ED3i \xE1p d\u1EE5ng quy t\u1EAFc c\u1ED9ng hai s\u1ED1 nguy\xEAn."],
        solution: op === "\xB7" ? [
          `D\u1EA5u c\u1EE7a t\xEDch: ${a < 0 === b < 0 ? "hai s\u1ED1 c\xF9ng d\u1EA5u n\xEAn t\xEDch d\u01B0\u01A1ng" : "hai s\u1ED1 kh\xE1c d\u1EA5u n\xEAn t\xEDch \xE2m"}.`,
          `$\\abs{${a}}\\cdot\\abs{${b}}=${Math.abs(a)}\\cdot${Math.abs(b)}=${Math.abs(a * b)}$, v\u1EADy k\u1EBFt qu\u1EA3 l\xE0 $${v}$.`
        ] : [`$${expr}=${v}$.`]
      };
    }
  },
  {
    id: "g6.th-hon-so",
    topicId: "g6-t4",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110\u1ED5i h\u1ED7n s\u1ED1 ra ph\xE2n s\u1ED1",
    build: (r) => {
      const w = r.int(1, 6), d = r.int(3, 9), n = r.int(1, d - 1);
      const num = w * d + n;
      const correct = `\\f{${num}}{${d}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{${w * n}}{${d}}`, `\\f{${w + n}}{${d}}`, `\\f{${num + d}}{${d}}`]);
      return {
        stem: `Vi\u1EBFt h\u1ED7n s\u1ED1 $${w}\\f{${n}}{${d}}$ d\u01B0\u1EDBi d\u1EA1ng ph\xE2n s\u1ED1 ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: ["Ph\u1EA7n nguy\xEAn nh\xE2n m\u1EABu r\u1ED3i c\u1ED9ng t\u1EED, gi\u1EEF nguy\xEAn m\u1EABu."],
        solution: [`$${w}\\f{${n}}{${d}}=\\f{${w}\\cdot${d}+${n}}{${d}}=\\f{${num}}{${d}}$.`]
      };
    }
  },
  {
    id: "g6.th-lam-tron",
    topicId: "g6-t5",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "L\xE0m tr\xF2n s\u1ED1 th\u1EADp ph\xE2n",
    build: (r) => {
      const whole = r.int(3, 99);
      const d1 = r.int(0, 9), d2 = r.int(0, 9);
      const x = whole + d1 / 10 + d2 / 100;
      const rounded = Math.round(x * 10) / 10;
      const [options, answer] = mcOptions(r, String(rounded), [
        String(Math.floor(x * 10) / 10),
        String(Math.round(x)),
        String(Math.round(x * 100) / 100)
      ]);
      return {
        stem: `L\xE0m tr\xF2n s\u1ED1 $${x.toFixed(2).replace(".", "{,}")}$ \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: ["L\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi th\xEC x\xE9t ch\u1EEF s\u1ED1 h\xE0ng ph\u1EA7n tr\u0103m: \u2265 5 th\xEC t\u0103ng, < 5 th\xEC gi\u1EEF nguy\xEAn."],
        solution: [
          `Ch\u1EEF s\u1ED1 h\xE0ng ph\u1EA7n tr\u0103m l\xE0 $${d2}$${d2 >= 5 ? " \u2265 5 n\xEAn t\u0103ng ch\u1EEF s\u1ED1 h\xE0ng ph\u1EA7n m\u01B0\u1EDDi th\xEAm 1" : " < 5 n\xEAn gi\u1EEF nguy\xEAn ch\u1EEF s\u1ED1 h\xE0ng ph\u1EA7n m\u01B0\u1EDDi"}.`,
          `K\u1EBFt qu\u1EA3: $${String(rounded).replace(".", "{,}")}$.`
        ]
      };
    }
  },
  {
    id: "g6.th-tf-chia-het",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 s\u1ED1 nguy\xEAn t\u1ED1 v\xE0 chia h\u1EBFt",
    build: (r) => {
      const n = r.pick([2, 3, 5, 7]);
      void n;
      return {
        stem: "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh sau:",
        options: [
          "S\u1ED1 2 l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t",
          "M\u1ECDi s\u1ED1 chia h\u1EBFt cho 9 \u0111\u1EC1u chia h\u1EBFt cho 3",
          "S\u1ED1 1 l\xE0 s\u1ED1 nguy\xEAn t\u1ED1",
          "N\u1EBFu $a;\\vdots;m$ v\xE0 $b;\\vdots;m$ th\xEC $(a+b);\\vdots;m$"
        ],
        answer: [true, true, false, true],
        thinking: ["\u0110\u1ED1i chi\u1EBFu t\u1EEBng kh\u1EB3ng \u0111\u1ECBnh v\u1EDBi \u0111\u1ECBnh ngh\u0129a v\xE0 t\xEDnh ch\u1EA5t \u0111\xE3 h\u1ECDc."],
        solution: [
          "a) \u0110\xFAng: m\u1ECDi s\u1ED1 ch\u1EB5n l\u1EDBn h\u01A1n 2 \u0111\u1EC1u chia h\u1EBFt cho 2 n\xEAn l\xE0 h\u1EE3p s\u1ED1.",
          "b) \u0110\xFAng: n\u1EBFu t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 chia h\u1EBFt cho 9 th\xEC c\u0169ng chia h\u1EBFt cho 3 (v\xEC $9;\\vdots;3$).",
          "c) Sai: s\u1ED1 1 ch\u1EC9 c\xF3 m\u1ED9t \u01B0\u1EDBc n\xEAn kh\xF4ng ph\u1EA3i s\u1ED1 nguy\xEAn t\u1ED1, c\u0169ng kh\xF4ng ph\u1EA3i h\u1EE3p s\u1ED1.",
          "d) \u0110\xFAng: \u0111\xE2y l\xE0 t\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a m\u1ED9t t\u1ED5ng."
        ]
      };
    }
  },
  {
    id: "g6.th-tf-phan-so",
    topicId: "g6-t4",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\xE2n s\u1ED1 v\xE0 s\u1ED1 th\u1EADp ph\xE2n",
    build: (r) => {
      const a = r.int(2, 8), b = a + r.int(1, 6);
      return {
        stem: `Cho hai ph\xE2n s\u1ED1 $\\f{${a}}{${b}}$ v\xE0 $\\f{${a}}{${b + 2}}$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai:`,
        options: [
          `$\\f{${a}}{${b}}>\\f{${a}}{${b + 2}}$`,
          `$\\f{${a}}{${b}}<1$`,
          `Hai ph\xE2n s\u1ED1 tr\xEAn b\u1EB1ng nhau`,
          `$\\f{-${a}}{${b}}$ l\xE0 s\u1ED1 \u0111\u1ED1i c\u1EE7a $\\f{${a}}{${b}}$`
        ],
        answer: [true, true, false, true],
        thinking: ["Hai ph\xE2n s\u1ED1 d\u01B0\u01A1ng c\xF9ng t\u1EED: m\u1EABu c\xE0ng l\u1EDBn th\xEC ph\xE2n s\u1ED1 c\xE0ng b\xE9."],
        solution: [
          `a) \u0110\xFAng: c\xF9ng t\u1EED $${a}$, m\u1EABu $${b}<${b + 2}$ n\xEAn $\\f{${a}}{${b}}>\\f{${a}}{${b + 2}}$.`,
          `b) \u0110\xFAng: t\u1EED nh\u1ECF h\u01A1n m\u1EABu ($${a}<${b}$) n\xEAn ph\xE2n s\u1ED1 nh\u1ECF h\u01A1n 1.`,
          `c) Sai: kh\xE1c m\u1EABu n\xEAn hai ph\xE2n s\u1ED1 kh\xF4ng b\u1EB1ng nhau.`,
          `d) \u0110\xFAng: hai s\u1ED1 \u0111\u1ED1i nhau c\xF3 t\u1ED5ng b\u1EB1ng 0.`
        ]
      };
    }
  },
  /* ============================ VẬN DỤNG ============================ */
  {
    id: "g6.vd-tim-so",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm s\u1ED1 t\u1EF1 nhi\xEAn tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt",
    build: (r) => {
      const g = r.pick([4, 6, 8, 9, 12]);
      const k = r.int(3, 9);
      const n = g * k;
      const lo = n - g + 1, hi = n + g - 1;
      return {
        stem: `T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $n$ bi\u1EBFt $n$ chia h\u1EBFt cho $${g}$ v\xE0 $${lo}\\le n\\le${hi}$.`,
        answer: String(n),
        thinking: [
          `Li\u1EC7t k\xEA c\xE1c b\u1ED9i c\u1EE7a $${g}$ r\u1ED3i \u0111\u1ED1i chi\u1EBFu v\u1EDBi kho\u1EA3ng \u0111\u1EC1 cho.`,
          "V\xEC kho\u1EA3ng c\xF3 \u0111\u1ED9 d\xE0i nh\u1ECF h\u01A1n hai l\u1EA7n s\u1ED1 chia n\xEAn ch\u1EC9 c\xF3 duy nh\u1EA5t m\u1ED9t b\u1ED9i n\u1EB1m trong \u0111\xF3."
        ],
        solution: [
          `C\xE1c b\u1ED9i c\u1EE7a $${g}$ g\u1EA7n kho\u1EA3ng \u0111\xE3 cho: $${g * (k - 1)}$; $${n}$; $${g * (k + 1)}$.`,
          `Ch\u1EC9 c\xF3 $${n}$ tho\u1EA3 m\xE3n $${lo}\\le n\\le${hi}$.`,
          `V\u1EADy $n=${n}$.`
        ]
      };
    }
  },
  {
    id: "g6.vd-thuc-te-phan-so",
    topicId: "g6-t4",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 ph\xE2n s\u1ED1",
    build: (r) => {
      const d = r.pick([3, 4, 5, 6, 8]);
      const n = r.int(1, d - 1);
      const total = d * r.int(6, 30);
      const part = total * n / d;
      const obj = r.pick([
        { t: "quy\u1EC3n s\xE1ch", v: "\u0111\u1ECDc" },
        { t: "trang v\u1EDF", v: "vi\u1EBFt" },
        { t: "chi\u1EBFc b\xE1nh", v: "\u0103n" },
        { t: "m\xE9t v\u1EA3i", v: "d\xF9ng" }
      ]);
      return {
        stem: `M\u1ED9t c\u1EEDa h\xE0ng c\xF3 $${total}$ ${obj.t}. Bu\u1ED5i s\xE1ng \u0111\xE3 ${obj.v} h\u1EBFt $\\f{${n}}{${d}}$ s\u1ED1 \u0111\xF3. H\u1ECFi bu\u1ED5i s\xE1ng \u0111\xE3 ${obj.v} bao nhi\xEAu ${obj.t}?`,
        answer: String(part),
        thinking: [
          "\u0110\u1EC1 cho to\xE0n th\u1EC3 (t\u1ED5ng s\u1ED1) v\xE0 h\u1ECFi gi\xE1 tr\u1ECB c\u1EE7a m\u1ED9t ph\xE2n s\u1ED1 c\u1EE7a n\xF3 \u2192 b\xE0i to\xE1n \u201Ct\xECm gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1\u201D \u2192 **nh\xE2n**."
        ],
        solution: [
          `S\u1ED1 ${obj.t} \u0111\xE3 ${obj.v}: $${total}\\cdot\\f{${n}}{${d}}=${part}$ (${obj.t}).`,
          `Ki\u1EC3m tra: ph\u1EA7n c\xF2n l\u1EA1i l\xE0 $${total}-${part}=${total - part}$ (${obj.t}), \u1EE9ng v\u1EDBi $${frac(d - n, d)}$ t\u1ED5ng s\u1ED1.`
        ],
        pitfall: "\u201CC\u1EE7a\u201D th\xEC nh\xE2n; \u201Cbi\u1EBFt \u2026 b\u1EB1ng\u201D th\xEC chia. Nh\u1EA7m chi\u1EC1u l\xE0 m\u1EA5t tr\u1ECDn \u0111i\u1EC3m."
      };
    }
  },
  {
    id: "g6.vd-tim-so-tp",
    topicId: "g6-t5",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm m\u1ED9t s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\u1EA7n tr\u0103m c\u1EE7a n\xF3",
    build: (r) => {
      const pct = r.pick([15, 20, 25, 30, 40, 60, 75]);
      const total = r.pick([200, 240, 300, 400, 500, 800]);
      const part = total * pct / 100;
      return {
        stem: `S\u1ED1 h\u1ECDc sinh gi\u1ECFi c\u1EE7a m\u1ED9t kh\u1ED1i l\xE0 $${part}$ em, chi\u1EBFm $${pct}\\percent$ s\u1ED1 h\u1ECDc sinh c\u1EA3 kh\u1ED1i. H\u1ECFi kh\u1ED1i \u0111\xF3 c\xF3 bao nhi\xEAu h\u1ECDc sinh?`,
        answer: String(total),
        thinking: [
          "\u0110\u1EC1 cho **gi\xE1 tr\u1ECB c\u1EE7a m\u1ED9t ph\u1EA7n tr\u0103m** v\xE0 h\u1ECFi **to\xE0n th\u1EC3** \u2192 ph\xE9p chia."
        ],
        solution: [
          `S\u1ED1 h\u1ECDc sinh c\u1EA3 kh\u1ED1i: $${part}:\\f{${pct}}{100}=${part}\\cdot\\f{100}{${pct}}=${total}$ (h\u1ECDc sinh).`,
          `Ki\u1EC3m tra: $${total}\\cdot${pct}\\percent=${part}$ \u2713`
        ]
      };
    }
  },
  {
    id: "g6.vd-dien-tich-ghep",
    topicId: "g6-t6",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Di\u1EC7n t\xEDch h\xECnh gh\xE9p \u2014 chia h\xECnh",
    build: (r) => {
      const A = r.int(8, 20), B = r.int(6, 16);
      const a = r.int(2, Math.min(A - 2, 8)), b = r.int(2, Math.min(B - 2, 8));
      const S = A * B - a * b;
      return {
        stem: `M\u1ED9t m\u1EA3nh \u0111\u1EA5t h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $${A}\\,m$, chi\u1EC1u r\u1ED9ng $${B}\\,m$. Ng\u01B0\u1EDDi ta kho\xE9t ra m\u1ED9t h\u1ED3 n\u01B0\u1EDBc h\xECnh ch\u1EEF nh\u1EADt c\xF3 k\xEDch th\u01B0\u1EDBc $${a}\\,m\\times${b}\\,m$. T\xEDnh di\u1EC7n t\xEDch ph\u1EA7n \u0111\u1EA5t c\xF2n l\u1EA1i (\u0111\u01A1n v\u1ECB: m\xB2).`,
        answer: String(S),
        thinking: [
          "Di\u1EC7n t\xEDch c\xF3 t\xEDnh c\u1ED9ng \u2014 h\xECnh ph\u1EE9c t\u1EA1p lu\xF4n quy v\u1EC1 h\xECnh c\u01A1 b\u1EA3n.",
          "\u1EDE \u0111\xE2y: l\u1EA5y di\u1EC7n t\xEDch h\xECnh l\u1EDBn tr\u1EEB di\u1EC7n t\xEDch ph\u1EA7n b\u1ECB kho\xE9t."
        ],
        solution: [
          `Di\u1EC7n t\xEDch m\u1EA3nh \u0111\u1EA5t: $${A}\\cdot${B}=${A * B}\\ (m^{2})$.`,
          `Di\u1EC7n t\xEDch h\u1ED3 n\u01B0\u1EDBc: $${a}\\cdot${b}=${a * b}\\ (m^{2})$.`,
          `Di\u1EC7n t\xEDch ph\u1EA7n c\xF2n l\u1EA1i: $${A * B}-${a * b}=${S}\\ (m^{2})$.`
        ]
      };
    }
  },
  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: "g6.vdc-tong-day",
    topicId: "g6-t1",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u1ED5ng d\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u",
    build: (r) => {
      const a = r.int(1, 9), d = r.pick([2, 3, 4, 5]);
      const n = r.int(15, 40);
      const last = a + (n - 1) * d;
      const S = (a + last) * n / 2;
      return {
        stem: `T\xEDnh t\u1ED5ng $S=${a}+${a + d}+${a + 2 * d}+\\dots+${last}$ (d\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u $${d}$ \u0111\u01A1n v\u1ECB).`,
        answer: String(S),
        thinking: [
          "D\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u \u2192 d\xF9ng c\xF4ng th\u1EE9c: s\u1ED1 s\u1ED1 h\u1EA1ng, r\u1ED3i t\u1ED5ng = (\u0111\u1EA7u + cu\u1ED1i) \xD7 s\u1ED1 s\u1ED1 h\u1EA1ng : 2.",
          "\xDD t\u01B0\u1EDFng g\u1ED1c: gh\xE9p c\u1EB7p \u0111\u1EA7u \u2013 cu\u1ED1i, m\u1ED7i c\u1EB7p c\xF3 t\u1ED5ng b\u1EB1ng nhau."
        ],
        solution: [
          `S\u1ED1 s\u1ED1 h\u1EA1ng: $(${last}-${a}):${d}+1=${n}$.`,
          `$S=\\f{(${a}+${last})\\cdot${n}}{2}=\\f{${a + last}\\cdot${n}}{2}=${S}$.`
        ]
      };
    }
  },
  {
    id: "g6.vdc-uoc-cua-bt",
    topicId: "g6-t3",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x nguy\xEAn \u0111\u1EC3 bi\u1EC3u th\u1EE9c nguy\xEAn",
    build: (r) => {
      const k = r.pick([3, 5, 6, 7, 10, 12]);
      const c = r.int(1, 5);
      const divs = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) divs.push(i, -i);
      const xs = divs.map((d) => d - c).sort((a, b) => a - b);
      return {
        stem: `T\xECm t\u1EA5t c\u1EA3 c\xE1c s\u1ED1 nguy\xEAn $x$ \u0111\u1EC3 $A=\\f{${k}}{x+${c}}$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn. (Nh\u1EADp c\xE1c gi\xE1 tr\u1ECB c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: xs.join(","),
        accept: [xs.slice().reverse().join(",")],
        thinking: [
          `$A$ nguy\xEAn khi v\xE0 ch\u1EC9 khi $x+${c}$ l\xE0 **\u01B0\u1EDBc** c\u1EE7a $${k}$.`,
          "Nh\u1EDB li\u1EC7t k\xEA c\u1EA3 \u01B0\u1EDBc \xE2m \u2014 \u0111\xE2y l\xE0 ch\u1ED7 m\u1EA5t \u0111i\u1EC3m ph\u1ED5 bi\u1EBFn nh\u1EA5t."
        ],
        solution: [
          `\u0110i\u1EC1u ki\u1EC7n: $x\\ne-${c}$.`,
          `$A\\in\\Z\\Leftrightarrow (x+${c})\\in$ \u01AF$(${k})=\\{${divs.sort((a, b) => a - b).join(";")}\\}$.`,
          `Suy ra $x\\in\\{${xs.join(";")}\\}$.`
        ]
      };
    }
  },
  /* ============================= TỰ LUẬN ============================= */
  {
    id: "g6.tl-thuc-hien",
    topicId: "g6-t1",
    grade: 6,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh v\xE0 t\xECm x",
    build: (r) => {
      const a = r.int(2, 4), b = r.int(2, 3);
      const c = r.pick([2, 3, 4, 5]), d = c * r.int(3, 9);
      const A = a ** b + d / c;
      const k = r.int(2, 5), m = r.int(3, 12);
      const x = r.int(2, 15);
      const rhs = k * x + m;
      return {
        stem: `a) Th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh: $A=${a}^{${b}}+${d}:${c}$.

b) T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $x$, bi\u1EBFt $${k}x+${m}=${rhs}$.

c) N\xEAu r\xF5 quy t\u1EAFc v\u1EC1 th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh \u0111\xE3 d\xF9ng \u1EDF c\xE2u a).`,
        answer: "",
        rubric: [
          { criterion: `T\xEDnh \u0111\xFAng l\u0169y th\u1EEBa $${a}^{${b}}=${a ** b}$`, points: 1 },
          { criterion: `T\xEDnh \u0111\xFAng ph\xE9p chia $${d}:${c}=${d / c}$ v\xE0 k\u1EBFt lu\u1EADn $A=${A}$`, points: 1 },
          { criterion: `C\xE2u b: chuy\u1EC3n v\u1EBF \u0111\xFAng, t\xECm \u0111\u01B0\u1EE3c $${k}x=${rhs - m}$`, points: 1 },
          { criterion: `C\xE2u b: k\u1EBFt lu\u1EADn $x=${x}$ v\xE0 th\u1EED l\u1EA1i`, points: 0.5 },
          { criterion: "C\xE2u c: n\xEAu \u0111\xFAng quy t\u1EAFc l\u0169y th\u1EEBa \u2192 nh\xE2n chia \u2192 c\u1ED9ng tr\u1EEB", points: 0.5 }
        ],
        thinking: ["C\xE2u a ki\u1EC3m tra th\u1EE9 t\u1EF1 ph\xE9p t\xEDnh; c\xE2u b ki\u1EC3m tra quy t\u1EAFc t\xECm th\xE0nh ph\u1EA7n ch\u01B0a bi\u1EBFt."],
        solution: [
          `a) $${a}^{${b}}=${a ** b}$ ; $${d}:${c}=${d / c}$ ; v\u1EADy $A=${a ** b}+${d / c}=${A}$.`,
          `b) $${k}x=${rhs}-${m}=${rhs - m}\\Rightarrow x=${rhs - m}:${k}=${x}$.`,
          `Th\u1EED l\u1EA1i: $${k}\\cdot${x}+${m}=${rhs}$ \u2713`,
          "c) Trong bi\u1EC3u th\u1EE9c kh\xF4ng c\xF3 ngo\u1EB7c, ta th\u1EF1c hi\u1EC7n: **l\u0169y th\u1EEBa \u2192 nh\xE2n, chia \u2192 c\u1ED9ng, tr\u1EEB**, c\xF9ng m\u1EE9c \u01B0u ti\xEAn th\xEC l\xE0m t\u1EEB tr\xE1i sang ph\u1EA3i."
        ]
      };
    }
  },
  {
    id: "g6.tl-hinh-hoc",
    topicId: "g6-t7",
    grade: 6,
    level: "VD",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "T\u1EF1 lu\u1EADn \u2014 \u0111o\u1EA1n th\u1EB3ng v\xE0 trung \u0111i\u1EC3m",
    build: (r) => {
      const oa = r.int(2, 6), ob = oa * 2;
      return {
        stem: `Tr\xEAn tia $Ox$ l\u1EA5y hai \u0111i\u1EC3m $A$ v\xE0 $B$ sao cho $OA=${oa}\\,cm$, $OB=${ob}\\,cm$.

a) Trong ba \u0111i\u1EC3m $O$, $A$, $B$ \u0111i\u1EC3m n\xE0o n\u1EB1m gi\u1EEFa hai \u0111i\u1EC3m c\xF2n l\u1EA1i? V\xEC sao?

b) T\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng $AB$.

c) Ch\u1EE9ng t\u1ECF $A$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng $OB$.`,
        answer: "",
        rubric: [
          { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 s\u1ED1 \u0111o", points: 0.5 },
          { criterion: `C\xE2u a: l\u1EADp lu\u1EADn $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA<OB$ n\xEAn $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$`, points: 1 },
          { criterion: `C\xE2u b: d\xF9ng $OA+AB=OB$, t\xEDnh \u0111\u01B0\u1EE3c $AB=${ob - oa}\\,cm$`, points: 1 },
          { criterion: `C\xE2u c: ch\u1EC9 ra $OA=AB=${oa}\\,cm$`, points: 1 },
          { criterion: "C\xE2u c: k\u1EBFt lu\u1EADn \u0111\u1EE7 hai \xFD (n\u1EB1m gi\u1EEFa + c\xE1ch \u0111\u1EC1u) c\u1EE7a \u0111\u1ECBnh ngh\u0129a trung \u0111i\u1EC3m", points: 0.5 }
        ],
        thinking: [
          "Tr\xEAn c\xF9ng m\u1ED9t tia, \u0111i\u1EC3m n\xE0o g\u1EA7n g\u1ED1c h\u01A1n th\xEC n\u1EB1m gi\u1EEFa \u2014 \u0111\xE2y l\xE0 c\u0103n c\u1EE9 b\u1EAFt bu\u1ED9c ph\u1EA3i vi\u1EBFt ra.",
          "Ch\u1EE9ng minh trung \u0111i\u1EC3m lu\xF4n ph\u1EA3i \u0111\u1EE7 **hai \xFD**: n\u1EB1m gi\u1EEFa v\xE0 c\xE1ch \u0111\u1EC1u."
        ],
        solution: [
          `a) V\xEC $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA<OB$ ($${oa}<${ob}$) n\xEAn \u0111i\u1EC3m $A$ n\u1EB1m gi\u1EEFa hai \u0111i\u1EC3m $O$ v\xE0 $B$.`,
          `b) Do $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$ n\xEAn $OA+AB=OB$.`,
          `$AB=OB-OA=${ob}-${oa}=${ob - oa}\\ (cm)$.`,
          `c) Ta c\xF3 $OA=${oa}\\,cm$ v\xE0 $AB=${ob - oa}\\,cm$ n\xEAn $OA=AB$. (1)`,
          `M\u1EB7t kh\xE1c $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$. (2)`,
          `T\u1EEB (1) v\xE0 (2) suy ra $A$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng $OB$.`
        ]
      };
    }
  }
];

// src/bank/g7-plus.ts
var BANK_G7_PLUS = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: "g7.nb-tap-hop-so",
    topicId: "g7-t1",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\u1EADn bi\u1EBFt t\u1EADp h\u1EE3p s\u1ED1",
    build: (r) => {
      const bank = [
        { q: "S\u1ED1 n\xE0o sau \u0111\xE2y l\xE0 **s\u1ED1 v\xF4 t\u1EC9**?", a: "$\\s{2}$", w: ["$\\f{1}{3}$", "$-5$", "$0{,}25$"] },
        { q: "S\u1ED1 n\xE0o sau \u0111\xE2y **kh\xF4ng** l\xE0 s\u1ED1 h\u1EEFu t\u1EC9?", a: "$\\pi$", w: ["$\\f{7}{2}$", "$-3$", "$1{,}5$"] },
        { q: "Kh\u1EB3ng \u0111\u1ECBnh n\xE0o sau \u0111\xE2y **\u0111\xFAng**?", a: "$\\N\\subset\\Z\\subset\\Q\\subset\\R$", w: ["$\\R\\subset\\Q$", "$\\Q\\subset\\Z$", "$\\Z\\subset\\N$"] },
        { q: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc c\u1EE7a $16$ l\xE0:", a: "$4$", w: ["$-4$", "$\\pm4$", "$8$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["S\u1ED1 h\u1EEFu t\u1EC9 vi\u1EBFt \u0111\u01B0\u1EE3c d\u01B0\u1EDBi d\u1EA1ng $\\f{a}{b}$; s\u1ED1 v\xF4 t\u1EC9 l\xE0 s\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n kh\xF4ng tu\u1EA7n ho\xE0n."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`],
        pitfall: "C\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB kh\xF4ng \xE2m."
      };
    }
  },
  {
    id: "g7.nb-luy-thua-mc",
    topicId: "g7-t1",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Quy t\u1EAFc l\u0169y th\u1EEBa",
    build: (r) => {
      const bank = [
        { q: "$x^{m}\\cdot x^{n}$ b\u1EB1ng:", a: "$x^{m+n}$", w: ["$x^{mn}$", "$x^{m-n}$", "$2x^{m+n}$"] },
        { q: "$(x^{m})^{n}$ b\u1EB1ng:", a: "$x^{mn}$", w: ["$x^{m+n}$", "$x^{m-n}$", "$(2x)^{mn}$"] },
        { q: "$(xy)^{n}$ b\u1EB1ng:", a: "$x^{n}y^{n}$", w: ["$x^{n}+y^{n}$", "$(xy)^{2n}$", "$xy^{n}$"] },
        { q: "V\u1EDBi $x\\ne0$, $x^{0}$ b\u1EB1ng:", a: "$1$", w: ["$0$", "$x$", "kh\xF4ng x\xE1c \u0111\u1ECBnh"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["Nh\xE2n c\xF9ng c\u01A1 s\u1ED1 th\xEC C\u1ED8NG s\u1ED1 m\u0169; l\u0169y th\u1EEBa c\u1EE7a l\u0169y th\u1EEBa th\xEC NH\xC2N s\u1ED1 m\u0169."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`]
      };
    }
  },
  {
    id: "g7.nb-goc-doi-dinh",
    topicId: "g7-t4",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "G\xF3c \u0111\u1ED1i \u0111\u1EC9nh \u2014 g\xF3c k\u1EC1 b\xF9",
    build: (r) => {
      const a = r.int(20, 160);
      const ask = r.pick(["doi", "bu"]);
      const v = ask === "doi" ? a : 180 - a;
      const [options, answer] = mcOptions(r, `$${v}\\deg$`, distractInt(r, v, 10).map((x) => `$${x}\\deg$`));
      return {
        stem: ask === "doi" ? `Hai \u0111\u01B0\u1EDDng th\u1EB3ng c\u1EAFt nhau t\u1EA1o th\xE0nh m\u1ED9t g\xF3c c\xF3 s\u1ED1 \u0111o $${a}\\deg$. G\xF3c \u0111\u1ED1i \u0111\u1EC9nh v\u1EDBi n\xF3 c\xF3 s\u1ED1 \u0111o l\xE0:` : `Hai g\xF3c k\u1EC1 b\xF9, m\u1ED9t g\xF3c c\xF3 s\u1ED1 \u0111o $${a}\\deg$. G\xF3c c\xF2n l\u1EA1i c\xF3 s\u1ED1 \u0111o l\xE0:`,
        options,
        answer,
        thinking: ask === "doi" ? ["Hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh th\xEC b\u1EB1ng nhau."] : ["Hai g\xF3c k\u1EC1 b\xF9 c\xF3 t\u1ED5ng b\u1EB1ng $180\\deg$."],
        solution: ask === "doi" ? [`Hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh b\u1EB1ng nhau n\xEAn g\xF3c c\u1EA7n t\xECm b\u1EB1ng $${a}\\deg$.`] : [`G\xF3c c\u1EA7n t\xECm $=180\\deg-${a}\\deg=${180 - a}\\deg$.`]
      };
    }
  },
  {
    id: "g7.nb-tam-giac-nb",
    topicId: "g7-t5",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\xEDnh g\xF3c c\xF2n l\u1EA1i c\u1EE7a tam gi\xE1c",
    build: (r) => {
      const A = r.int(30, 100), B = r.int(25, 175 - A);
      const C = 180 - A - B;
      const [options, answer] = mcOptions(r, `$${C}\\deg$`, distractInt(r, C, 15).map((x) => `$${x}\\deg$`));
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $\\angle A=${A}\\deg$, $\\angle B=${B}\\deg$. S\u1ED1 \u0111o $\\angle C$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ["T\u1ED5ng ba g\xF3c trong m\u1ED9t tam gi\xE1c b\u1EB1ng $180\\deg$."],
        solution: [`$\\angle C=180\\deg-${A}\\deg-${B}\\deg=${C}\\deg$.`]
      };
    }
  },
  {
    id: "g7.nb-dong-quy",
    topicId: "g7-t5",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "C\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy trong tam gi\xE1c",
    build: (r) => {
      const bank = [
        { q: "Ba \u0111\u01B0\u1EDDng trung tuy\u1EBFn c\u1EE7a tam gi\xE1c \u0111\u1ED3ng quy t\u1EA1i:", a: "Tr\u1ECDng t\xE2m", w: ["Tr\u1EF1c t\xE2m", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp"] },
        { q: "Ba \u0111\u01B0\u1EDDng cao c\u1EE7a tam gi\xE1c \u0111\u1ED3ng quy t\u1EA1i:", a: "Tr\u1EF1c t\xE2m", w: ["Tr\u1ECDng t\xE2m", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp"] },
        { q: "Ba \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c trong c\u1EE7a tam gi\xE1c \u0111\u1ED3ng quy t\u1EA1i:", a: "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp", w: ["Tr\u1ECDng t\xE2m", "Tr\u1EF1c t\xE2m", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp"] },
        { q: "Ba \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a tam gi\xE1c \u0111\u1ED3ng quy t\u1EA1i:", a: "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp", w: ["Tr\u1ECDng t\xE2m", "Tr\u1EF1c t\xE2m", "T\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["M\u1EB9o nh\u1EDB: trung tuy\u1EBFn \u2192 tr\u1ECDng t\xE2m; cao \u2192 tr\u1EF1c t\xE2m; ph\xE2n gi\xE1c \u2192 n\u1ED9i ti\u1EBFp; trung tr\u1EF1c \u2192 ngo\u1EA1i ti\u1EBFp."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: **${it.a}**.`]
      };
    }
  },
  {
    id: "g7.nb-bien-co",
    topicId: "g7-t7",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "THONG_KE_XS",
    tag: "Nh\u1EADn bi\u1EBFt lo\u1EA1i bi\u1EBFn c\u1ED1",
    build: (r) => {
      const bank = [
        { q: "Gieo m\u1ED9t con x\xFAc x\u1EAFc, bi\u1EBFn c\u1ED1 \u201CS\u1ED1 ch\u1EA5m xu\u1EA5t hi\u1EC7n nh\u1ECF h\u01A1n 7\u201D l\xE0 bi\u1EBFn c\u1ED1 g\xEC?", a: "Bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn", w: ["Bi\u1EBFn c\u1ED1 kh\xF4ng th\u1EC3", "Bi\u1EBFn c\u1ED1 ng\u1EABu nhi\xEAn", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"] },
        { q: "Gieo m\u1ED9t con x\xFAc x\u1EAFc, bi\u1EBFn c\u1ED1 \u201CS\u1ED1 ch\u1EA5m xu\u1EA5t hi\u1EC7n b\u1EB1ng 8\u201D l\xE0 bi\u1EBFn c\u1ED1 g\xEC?", a: "Bi\u1EBFn c\u1ED1 kh\xF4ng th\u1EC3", w: ["Bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn", "Bi\u1EBFn c\u1ED1 ng\u1EABu nhi\xEAn", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"] },
        { q: "Tung m\u1ED9t \u0111\u1ED3ng xu, bi\u1EBFn c\u1ED1 \u201CXu\u1EA5t hi\u1EC7n m\u1EB7t ng\u1EEDa\u201D l\xE0 bi\u1EBFn c\u1ED1 g\xEC?", a: "Bi\u1EBFn c\u1ED1 ng\u1EABu nhi\xEAn", w: ["Bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn", "Bi\u1EBFn c\u1ED1 kh\xF4ng th\u1EC3", "Kh\xF4ng x\xE1c \u0111\u1ECBnh"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["Ch\u1EAFc ch\u1EAFn: lu\xF4n x\u1EA3y ra (P = 1). Kh\xF4ng th\u1EC3: kh\xF4ng bao gi\u1EDD x\u1EA3y ra (P = 0). Ng\u1EABu nhi\xEAn: c\xF3 th\u1EC3 x\u1EA3y ra ho\u1EB7c kh\xF4ng."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: **${it.a}**.`]
      };
    }
  },
  /* ============================ THÔNG HIỂU ============================ */
  {
    id: "g7.th-thu-tu-huu-ti",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "So s\xE1nh s\u1ED1 h\u1EEFu t\u1EC9",
    build: (r) => {
      const b = r.int(3, 9), d = r.int(3, 11);
      const a = r.int(1, b - 1), c = r.int(1, d - 1);
      const v1 = a / b, v2 = c / d;
      const bigger = v1 > v2 ? `\\f{${a}}{${b}}` : v1 < v2 ? `\\f{${c}}{${d}}` : "hai ph\xE2n s\u1ED1 b\u1EB1ng nhau";
      const [options, answer] = mcOptions(r, `$${bigger}$`, [
        v1 > v2 ? `$\\f{${c}}{${d}}$` : `$\\f{${a}}{${b}}$`,
        "$0$",
        "$1$"
      ]);
      return {
        stem: `Trong hai s\u1ED1 $\\f{${a}}{${b}}$ v\xE0 $\\f{${c}}{${d}}$, s\u1ED1 l\u1EDBn h\u01A1n l\xE0:`,
        options,
        answer,
        thinking: [`Quy \u0111\u1ED3ng m\u1EABu \u0111\u1EC3 so s\xE1nh: m\u1EABu chung $${b}\\cdot${d}=${b * d}$.`],
        solution: [
          `$\\f{${a}}{${b}}=\\f{${a * d}}{${b * d}}$ ; $\\f{${c}}{${d}}=\\f{${c * b}}{${b * d}}$.`,
          `So s\xE1nh t\u1EED: $${a * d}$ v\xE0 $${c * b}$ \u2192 s\u1ED1 l\u1EDBn h\u01A1n l\xE0 $${bigger}$.`
        ]
      };
    }
  },
  {
    id: "g7.th-ti-le-thuan",
    topicId: "g7-t2",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "H\u1EC7 s\u1ED1 t\u1EC9 l\u1EC7 c\u1EE7a \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 thu\u1EADn",
    build: (r) => {
      const k = r.int(2, 9) * r.sign();
      const x = r.int(2, 9);
      const y = k * x;
      const [options, answer] = mcOptions(r, String(k), distractInt(r, k, 2).map(String));
      return {
        stem: `Cho $y$ t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $x$ theo h\u1EC7 s\u1ED1 t\u1EC9 l\u1EC7 $k$. Bi\u1EBFt khi $x=${x}$ th\xEC $y=${y}$. Gi\xE1 tr\u1ECB c\u1EE7a $k$ l\xE0:`,
        options,
        answer,
        thinking: ["T\u1EC9 l\u1EC7 thu\u1EADn: $y=kx$, do \u0111\xF3 $k=\\f{y}{x}$."],
        solution: [`$k=\\f{y}{x}=\\f{${y}}{${x}}=${k}$.`]
      };
    }
  },
  {
    id: "g7.th-nghiem-da-thuc-mc",
    topicId: "g7-t3",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c b\u1EADc nh\u1EA5t",
    build: (r) => {
      const a = r.int(2, 8) * r.sign(), b = r.int(-15, 15);
      const num = -b, den = a;
      const [n, d] = reduce(num, den);
      const correct = d === 1 ? `$${n}$` : `$\\f{${n}}{${d}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${a}$`, `$${b}$`, d === 1 ? `$${-n}$` : `$\\f{${-n}}{${d}}$`]);
      return {
        stem: `Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c $P(x)=${a}x${b >= 0 ? "+" : "-"}${Math.abs(b)}$ l\xE0:`,
        options,
        answer,
        thinking: ["Nghi\u1EC7m l\xE0 gi\xE1 tr\u1ECB l\xE0m \u0111a th\u1EE9c b\u1EB1ng 0: gi\u1EA3i $P(x)=0$."],
        solution: [`$${a}x${b >= 0 ? "+" : "-"}${Math.abs(b)}=0\\Rightarrow ${a}x=${-b}\\Rightarrow x=${frac(num, den)}$.`]
      };
    }
  },
  {
    id: "g7.th-lang-tru",
    topicId: "g7-t6",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Th\u1EC3 t\xEDch l\u0103ng tr\u1EE5 \u0111\u1EE9ng",
    build: (r) => {
      const a = r.int(3, 12), h = r.int(2, 10), L = r.int(4, 15);
      const S = a * h / 2;
      const V = S * L;
      const [options, answer] = mcOptions(r, String(V), distractInt(r, V, Math.round(V / 3) || 5).map(String));
      return {
        stem: `M\u1ED9t l\u0103ng tr\u1EE5 \u0111\u1EE9ng tam gi\xE1c c\xF3 \u0111\xE1y l\xE0 tam gi\xE1c v\u1EDBi c\u1EA1nh \u0111\xE1y $${a}\\,cm$, chi\u1EC1u cao \u1EE9ng v\u1EDBi c\u1EA1nh \u0111\xE1y $${h}\\,cm$; chi\u1EC1u cao l\u0103ng tr\u1EE5 $${L}\\,cm$. Th\u1EC3 t\xEDch l\u0103ng tr\u1EE5 (cm\xB3) b\u1EB1ng:`,
        options,
        answer,
        thinking: ["$V=S_{\\text{\u0111\xE1y}}\\cdot h$; di\u1EC7n t\xEDch tam gi\xE1c $=\\f{1}{2}$ \u0111\xE1y \xD7 chi\u1EC1u cao."],
        solution: [
          `$S_{\\text{\u0111\xE1y}}=\\f{1}{2}\\cdot${a}\\cdot${h}=${S}\\ (cm^{2})$.`,
          `$V=${S}\\cdot${L}=${V}\\ (cm^{3})$.`
        ]
      };
    }
  },
  {
    id: "g7.th-tf-song-song",
    topicId: "g7-t4",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
    build: (r) => {
      let a = r.int(35, 145);
      if (a === 90) a = 85;
      return {
        stem: `Cho $a\\para b$ b\u1ECB c\u1EAFt b\u1EDFi c\xE1t tuy\u1EBFn $c$, t\u1EA1o th\xE0nh m\u1ED9t g\xF3c c\xF3 s\u1ED1 \u0111o $${a}\\deg$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai:`,
        options: [
          `G\xF3c so le trong v\u1EDBi n\xF3 c\xF3 s\u1ED1 \u0111o $${a}\\deg$`,
          `G\xF3c \u0111\u1ED3ng v\u1ECB v\u1EDBi n\xF3 c\xF3 s\u1ED1 \u0111o $${a}\\deg$`,
          `G\xF3c trong c\xF9ng ph\xEDa v\u1EDBi n\xF3 c\xF3 s\u1ED1 \u0111o $${a}\\deg$`,
          `G\xF3c trong c\xF9ng ph\xEDa v\u1EDBi n\xF3 c\xF3 s\u1ED1 \u0111o $${180 - a}\\deg$`
        ],
        answer: [true, true, false, true],
        thinking: ["So le trong v\xE0 \u0111\u1ED3ng v\u1ECB th\xEC B\u1EB0NG nhau; trong c\xF9ng ph\xEDa th\xEC B\xD9 nhau."],
        solution: [
          `a) \u0110\xFAng \u2014 hai g\xF3c so le trong b\u1EB1ng nhau khi $a\\para b$.`,
          `b) \u0110\xFAng \u2014 hai g\xF3c \u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau khi $a\\para b$.`,
          `c) Sai \u2014 hai g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau, kh\xF4ng b\u1EB1ng nhau (tr\u1EEB khi c\xF9ng b\u1EB1ng $90\\deg$).`,
          `d) \u0110\xFAng \u2014 $180\\deg-${a}\\deg=${180 - a}\\deg$.`
        ]
      };
    }
  },
  {
    id: "g7.th-tf-tam-giac",
    topicId: "g7-t5",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 quan h\u1EC7 trong tam gi\xE1c",
    build: (r) => {
      void r;
      return {
        stem: "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh v\u1EC1 tam gi\xE1c:",
        options: [
          "Trong m\u1ED9t tam gi\xE1c, c\u1EA1nh \u0111\u1ED1i di\u1EC7n v\u1EDBi g\xF3c l\u1EDBn h\u01A1n th\xEC l\u1EDBn h\u01A1n",
          "Ba \u0111\u1ED9 d\xE0i $3\\,cm$, $4\\,cm$, $8\\,cm$ l\u1EADp th\xE0nh m\u1ED9t tam gi\xE1c",
          "Tr\u1ECDng t\xE2m chia m\u1ED7i trung tuy\u1EBFn theo t\u1EC9 s\u1ED1 $\\f{2}{3}$ t\xEDnh t\u1EEB \u0111\u1EC9nh",
          "Tam gi\xE1c \u0111\u1EC1u l\xE0 tam gi\xE1c c\xE2n"
        ],
        answer: [true, false, true, true],
        thinking: ["Ki\u1EC3m tra b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t; nh\u1EDB t\u1EC9 s\u1ED1 tr\u1ECDng t\xE2m $\\f{2}{3}$."],
        solution: [
          "a) \u0110\xFAng \u2014 quan h\u1EC7 gi\u1EEFa g\xF3c v\xE0 c\u1EA1nh \u0111\u1ED1i di\u1EC7n.",
          "b) Sai \u2014 $3+4=7<8$, vi ph\u1EA1m b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c.",
          "c) \u0110\xFAng \u2014 $AG=\\f{2}{3}AM$.",
          "d) \u0110\xFAng \u2014 tam gi\xE1c \u0111\u1EC1u c\xF3 ba c\u1EA1nh b\u1EB1ng nhau n\xEAn c\xE2n t\u1EA1i m\u1ECDi \u0111\u1EC9nh."
        ]
      };
    }
  },
  /* ============================ VẬN DỤNG ============================ */
  {
    id: "g7.vd-day-ti-so-3",
    topicId: "g7-t2",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u2014 ba \u0111\u1EA1i l\u01B0\u1EE3ng",
    build: (r) => {
      const [p, q, s] = r.shuffle([2, 3, 4, 5, 6, 7]).slice(0, 3);
      const t = r.int(3, 14);
      const sum = (p + q + s) * t;
      return {
        stem: `T\xECm ba s\u1ED1 $x$, $y$, $z$ bi\u1EBFt $\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}$ v\xE0 $x+y+z=${sum}$. (Nh\u1EADp theo d\u1EA1ng x,y,z.)`,
        answer: `${p * t},${q * t},${s * t}`,
        thinking: ["C\xF3 T\u1ED4NG ba s\u1ED1 \u2192 \xE1p d\u1EE5ng ngay t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau m\u1EDF r\u1ED9ng cho ba t\u1EC9 s\u1ED1."],
        solution: [
          `$\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}=\\f{x+y+z}{${p}+${q}+${s}}=\\f{${sum}}{${p + q + s}}=${t}$.`,
          `$x=${p * t}$ ; $y=${q * t}$ ; $z=${s * t}$.`
        ]
      };
    }
  },
  {
    id: "g7.vd-gttd-min",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.int(1, 12), c = r.int(1, 20);
      return {
        stem: `T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $A=\\abs{x-${a}}+${c}$.`,
        answer: String(c),
        thinking: [
          "$\\abs{A}\\ge0$ v\u1EDBi m\u1ECDi gi\xE1 tr\u1ECB c\u1EE7a bi\u1EBFn \u2014 \u0111\xE2y l\xE0 \u0111i\u1EC3m t\u1EF1a \u0111\u1EC3 ch\u1EB7n d\u01B0\u1EDBi.",
          "Ch\u1EB7n xong ph\u1EA3i ch\u1EC9 ra d\u1EA5u b\u1EB1ng x\u1EA3y ra khi n\xE0o m\u1EDBi k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c."
        ],
        solution: [
          `V\xEC $\\abs{x-${a}}\\ge0$ v\u1EDBi m\u1ECDi $x$ n\xEAn $A=\\abs{x-${a}}+${c}\\ge${c}$.`,
          `D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x-${a}=0\\Leftrightarrow x=${a}$.`,
          `V\u1EADy $A_{\\min}=${c}$ khi $x=${a}$.`
        ],
        pitfall: "Thi\u1EBFu b\u01B0\u1EDBc ch\u1EC9 ra d\u1EA5u b\u1EB1ng l\xE0 ch\u01B0a k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t."
      };
    }
  },
  {
    id: "g7.vd-da-thuc-cong",
    topicId: "g7-t3",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "C\u1ED9ng, tr\u1EEB \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn",
    build: (r) => {
      const p = [r.int(1, 5), r.int(-6, 6), r.int(-9, 9)];
      const q = [r.int(1, 5), r.int(-6, 6), r.int(-9, 9)];
      const x = r.int(-3, 3);
      const val = (p[0] - q[0]) * x * x + (p[1] - q[1]) * x + (p[2] - q[2]);
      const f = (c, v = "x") => `${c[0]}${v}^{2}${c[1] >= 0 ? "+" : "-"}${Math.abs(c[1])}${v}${c[2] >= 0 ? "+" : "-"}${Math.abs(c[2])}`;
      return {
        stem: `Cho $P(x)=${f(p)}$ v\xE0 $Q(x)=${f(q)}$. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $P(x)-Q(x)$ t\u1EA1i $x=${x}$.`,
        answer: String(val),
        thinking: [
          "Tr\u1EEB hai \u0111a th\u1EE9c: \u0111\u1ED5i d\u1EA5u to\xE0n b\u1ED9 $Q(x)$ r\u1ED3i c\u1ED9ng c\xE1c h\u1EA1ng t\u1EED \u0111\u1ED3ng d\u1EA1ng.",
          "N\xEAn thu g\u1ECDn tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi thay s\u1ED1 \u2014 nhanh h\u01A1n v\xE0 \xEDt sai h\u01A1n."
        ],
        solution: [
          `$P(x)-Q(x)=${p[0] - q[0]}x^{2}${p[1] - q[1] >= 0 ? "+" : "-"}${Math.abs(p[1] - q[1])}x${p[2] - q[2] >= 0 ? "+" : "-"}${Math.abs(p[2] - q[2])}$.`,
          `Thay $x=${x}$: $${p[0] - q[0]}\\cdot(${x})^{2}${p[1] - q[1] >= 0 ? "+" : "-"}${Math.abs(p[1] - q[1])}\\cdot(${x})${p[2] - q[2] >= 0 ? "+" : "-"}${Math.abs(p[2] - q[2])}=${val}$.`
        ]
      };
    }
  },
  {
    id: "g7.vd-goc-ke-them",
    topicId: "g7-t4",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "K\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song \u0111\u1EC3 t\xEDnh g\xF3c",
    build: (r) => {
      const a = r.int(20, 70), b = r.int(20, 70);
      return {
        stem: `Cho $Ax\\para By$, \u0111i\u1EC3m $C$ n\u1EB1m gi\u1EEFa hai \u0111\u01B0\u1EDDng th\u1EB3ng sao cho $\\angle xAC=${a}\\deg$ v\xE0 $\\angle yBC=${b}\\deg$. T\xEDnh s\u1ED1 \u0111o $\\angle ACB$ (nh\u1EADp theo \u0111\u1ED9).`,
        answer: String(a + b),
        thinking: [
          "G\xF3c $\\angle ACB$ kh\xF4ng so s\xE1nh tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c v\u1EDBi hai g\xF3c \u0111\xE3 cho.",
          "K\u1EBB qua $C$ m\u1ED9t tia song song v\u1EDBi $Ax$ \u0111\u1EC3 t\xE1ch $\\angle ACB$ th\xE0nh hai g\xF3c so le trong."
        ],
        solution: [
          `Qua $C$ k\u1EBB tia $Cz\\para Ax$. V\xEC $Ax\\para By$ n\xEAn $Cz\\para By$.`,
          `$Cz\\para Ax\\Rightarrow\\angle ACz=\\angle xAC=${a}\\deg$ (hai g\xF3c so le trong).`,
          `$Cz\\para By\\Rightarrow\\angle zCB=\\angle yBC=${b}\\deg$ (hai g\xF3c so le trong).`,
          `Tia $Cz$ n\u1EB1m gi\u1EEFa hai tia $CA$, $CB$ n\xEAn $\\angle ACB=${a}\\deg+${b}\\deg=${a + b}\\deg$.`
        ]
      };
    }
  },
  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: "g7.vdc-ti-so-tich",
    topicId: "g7-t2",
    grade: 7,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau k\xE8m \u0111i\u1EC1u ki\u1EC7n t\xEDch",
    build: (r) => {
      const p = r.int(2, 6), q = r.int(2, 7);
      const t = r.int(2, 6);
      const prod = p * q * t * t;
      return {
        stem: `T\xECm $x$, $y$ bi\u1EBFt $\\f{x}{${p}}=\\f{y}{${q}}$ v\xE0 $xy=${prod}$, v\u1EDBi $x>0$. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${p * t},${q * t}`,
        thinking: [
          "\u0110i\u1EC1u ki\u1EC7n l\xE0 **t\xEDch**, kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c t\xEDnh ch\u1EA5t c\u1ED9ng c\u1EE7a d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau.",
          "Ph\u1EA3i \u0111\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng tham s\u1ED1 $t$ r\u1ED3i thay v\xE0o."
        ],
        solution: [
          `\u0110\u1EB7t $\\f{x}{${p}}=\\f{y}{${q}}=t\\Rightarrow x=${p}t$, $y=${q}t$.`,
          `$xy=${p}t\\cdot${q}t=${p * q}t^{2}=${prod}\\Rightarrow t^{2}=${t * t}\\Rightarrow t=\\pm${t}$.`,
          `V\xEC $x>0$ n\xEAn $t=${t}$, suy ra $x=${p * t}$, $y=${q * t}$.`,
          `(N\u1EBFu \u0111\u1EC1 kh\xF4ng c\xF3 \u0111i\u1EC1u ki\u1EC7n $x>0$ th\xEC c\xF2n nghi\u1EC7m $x=${-p * t}$, $y=${-q * t}$.)`
        ],
        pitfall: "Qu\xEAn nghi\u1EC7m \xE2m khi b\u1EADc c\u1EE7a $t$ l\xE0 ch\u1EB5n."
      };
    }
  },
  {
    id: "g7.vdc-bdt-tam-giac",
    topicId: "g7-t5",
    grade: 7,
    level: "VDC",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Chu vi tam gi\xE1c c\xE2n \u2014 b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c",
    build: (r) => {
      const a = r.int(3, 9);
      const b = a * 2 + r.int(1, 5);
      const P = b + b + a;
      return {
        stem: `M\u1ED9t tam gi\xE1c c\xE2n c\xF3 hai c\u1EA1nh d\xE0i $${a}\\,cm$ v\xE0 $${b}\\,cm$. T\xEDnh chu vi tam gi\xE1c \u0111\xF3 (\u0111\u01A1n v\u1ECB: cm).`,
        answer: String(P),
        thinking: [
          "Tam gi\xE1c c\xE2n c\xF3 hai c\u1EA1nh b\u1EB1ng nhau \u2014 nh\u01B0ng ph\u1EA3i x\xE9t xem c\u1EA1nh n\xE0o l\xE0 c\u1EA1nh b\xEAn.",
          "D\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c \u0111\u1EC3 lo\u1EA1i tr\u01B0\u1EDDng h\u1EE3p kh\xF4ng h\u1EE3p l\u1EC7."
        ],
        solution: [
          `TH1: c\u1EA1nh b\xEAn l\xE0 $${a}\\,cm$, c\u1EA1nh \u0111\xE1y $${b}\\,cm$. Khi \u0111\xF3 $${a}+${a}=${2 * a}$ v\xE0 $${2 * a}<${b}$ n\xEAn **kh\xF4ng tho\u1EA3** b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c \u2192 lo\u1EA1i.`,
          `TH2: c\u1EA1nh b\xEAn l\xE0 $${b}\\,cm$, c\u1EA1nh \u0111\xE1y $${a}\\,cm$. Ki\u1EC3m tra: $${b}+${a}>${b}$ v\xE0 $${b}+${b}=${2 * b}>${a}$ \u2192 tho\u1EA3 m\xE3n.`,
          `Chu vi: $P=${b}+${b}+${a}=${P}\\ (cm)$.`
        ],
        pitfall: "Kh\xF4ng x\xE9t \u0111\u1EE7 hai tr\u01B0\u1EDDng h\u1EE3p, ho\u1EB7c qu\xEAn ki\u1EC3m tra b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c."
      };
    }
  },
  /* ============================= TỰ LUẬN ============================= */
  {
    id: "g7.tl-so-huu-ti",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 t\xEDnh h\u1EE3p l\xED v\xE0 t\xECm x",
    build: (r) => {
      const b = r.int(3, 9), a = r.int(1, b - 1);
      const d = r.int(3, 11), c = r.int(1, d - 1), e = d - c;
      const k = r.int(2, 5), m = r.int(1, 9), v = r.int(2, 9);
      return {
        stem: `a) T\xEDnh h\u1EE3p l\xED: $A=\\f{${a}}{${b}}\\cdot\\f{${c}}{${d}}+\\f{${a}}{${b}}\\cdot\\f{${e}}{${d}}$.

b) T\xECm $x$, bi\u1EBFt $${k}\\abs{x-${m}}=${k * v}$.

c) T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $B=\\abs{x-${m}}+${v}$.`,
        answer: "",
        rubric: [
          { criterion: `C\xE2u a: \u0111\u1EB7t \u0111\u01B0\u1EE3c nh\xE2n t\u1EED chung $\\f{${a}}{${b}}$`, points: 0.75 },
          { criterion: `C\xE2u a: t\xEDnh \u0111\xFAng $A=\\f{${a}}{${b}}$`, points: 0.75 },
          { criterion: `C\xE2u b: c\xF4 l\u1EADp \u0111\u01B0\u1EE3c $\\abs{x-${m}}=${v}$`, points: 0.5 },
          { criterion: `C\xE2u b: x\xE9t \u0111\u1EE7 hai tr\u01B0\u1EDDng h\u1EE3p, ra $x=${m + v}$ v\xE0 $x=${m - v}$`, points: 1 },
          { criterion: `C\xE2u c: ch\u1EB7n $B\\ge${v}$ v\xE0 ch\u1EC9 ra d\u1EA5u b\u1EB1ng khi $x=${m}$`, points: 1 }
        ],
        thinking: [
          "C\xE2u a: nh\xECn th\u1EA5y th\u1EEBa s\u1ED1 chung l\xE0 ch\xECa kho\xE1 t\xEDnh nhanh.",
          "C\xE2u b: c\xF4 l\u1EADp d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i r\u1ED3i t\xE1ch hai nh\xE1nh.",
          "C\xE2u c: d\xF9ng $\\abs{A}\\ge0$ \u0111\u1EC3 ch\u1EB7n d\u01B0\u1EDBi."
        ],
        solution: [
          `a) $A=\\f{${a}}{${b}}\\left(\\f{${c}}{${d}}+\\f{${e}}{${d}}\\right)=\\f{${a}}{${b}}\\cdot1=\\f{${a}}{${b}}$.`,
          `b) $\\abs{x-${m}}=\\f{${k * v}}{${k}}=${v}$.`,
          `TH1: $x-${m}=${v}\\Rightarrow x=${m + v}$. TH2: $x-${m}=-${v}\\Rightarrow x=${m - v}$.`,
          `V\u1EADy $x\\in\\{${m + v};${m - v}\\}$.`,
          `c) V\xEC $\\abs{x-${m}}\\ge0$ n\xEAn $B\\ge${v}$; d\u1EA5u \u201C=\u201D khi $x=${m}$. V\u1EADy $B_{\\min}=${v}$ khi $x=${m}$.`
        ]
      };
    }
  },
  {
    id: "g7.tl-tam-giac",
    topicId: "g7-t5",
    grade: 7,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "T\u1EF1 lu\u1EADn h\xECnh h\u1ECDc \u2014 ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau",
    build: (r) => {
      void r;
      return {
        stem: "Cho tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$. G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a c\u1EA1nh $BC$.\n\na) Ch\u1EE9ng minh $\\tri ABM=\\tri ACM$.\n\nb) Ch\u1EE9ng minh $AM\\perp BC$ v\xE0 $AM$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $\\angle BAC$.\n\nc) Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $MD=MA$. Ch\u1EE9ng minh $AB=CD$.",
        answer: "",
        rubric: [
          { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi gi\u1EA3 thi\u1EBFt \u2013 k\u1EBFt lu\u1EADn", points: 0.5 },
          { criterion: "C\xE2u a: li\u1EC7t k\xEA \u0111\u1EE7 ba y\u1EBFu t\u1ED1 ($AB=AC$, $MB=MC$, $AM$ chung) v\xE0 k\u1EBFt lu\u1EADn c.c.c", points: 1 },
          { criterion: "C\xE2u b: suy ra $\\angle AMB=\\angle AMC$, d\xF9ng hai g\xF3c k\u1EC1 b\xF9 \u0111\u1EC3 c\xF3 $90\\deg$", points: 1 },
          { criterion: "C\xE2u b: suy ra $\\angle BAM=\\angle CAM$ n\xEAn $AM$ l\xE0 ph\xE2n gi\xE1c", points: 0.5 },
          { criterion: "C\xE2u c: ch\u1EE9ng minh $\\tri ABM=\\tri DCM$ (c.g.c, d\xF9ng hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh)", points: 1 }
        ],
        thinking: [
          "Trung \u0111i\u1EC3m cho ngay hai \u0111o\u1EA1n b\u1EB1ng nhau \u2014 v\u1EADt li\u1EC7u mi\u1EC5n ph\xED cho tr\u01B0\u1EDDng h\u1EE3p c.c.c.",
          "\xDD c: hai \u0111o\u1EA1n c\u1EA7n ch\u1EE9ng minh b\u1EB1ng nhau n\u1EB1m \u1EDF hai tam gi\xE1c kh\xE1c nhau \u2192 gh\xE9p v\xE0o hai tam gi\xE1c r\u1ED3i ch\u1EE9ng minh b\u1EB1ng nhau; g\xF3c xen gi\u1EEFa l\xE0 c\u1EB7p g\xF3c \u0111\u1ED1i \u0111\u1EC9nh t\u1EA1i $M$."
        ],
        solution: [
          "a) X\xE9t $\\tri ABM$ v\xE0 $\\tri ACM$ c\xF3: $AB=AC$ (v\xEC $\\tri ABC$ c\xE2n t\u1EA1i $A$); $MB=MC$ ($M$ l\xE0 trung \u0111i\u1EC3m $BC$); $AM$ l\xE0 c\u1EA1nh chung.",
          "Do \u0111\xF3 $\\tri ABM=\\tri ACM$ (c.c.c).",
          "b) T\u1EEB \u0111\xF3 $\\angle AMB=\\angle AMC$ (hai g\xF3c t\u01B0\u01A1ng \u1EE9ng). M\xE0 $\\angle AMB+\\angle AMC=180\\deg$ (hai g\xF3c k\u1EC1 b\xF9) n\xEAn $\\angle AMB=\\angle AMC=90\\deg$, suy ra $AM\\perp BC$.",
          "C\u0169ng t\u1EEB hai tam gi\xE1c b\u1EB1ng nhau: $\\angle BAM=\\angle CAM$, n\xEAn $AM$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a $\\angle BAC$.",
          "c) X\xE9t $\\tri ABM$ v\xE0 $\\tri DCM$ c\xF3: $MB=MC$ (gt); $\\angle AMB=\\angle DMC$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh); $MA=MD$ (gt).",
          "Do \u0111\xF3 $\\tri ABM=\\tri DCM$ (c.g.c), suy ra $AB=DC$ (hai c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng)."
        ]
      };
    }
  }
];

// src/bank/g7-decuong.ts
var sgn3 = (n) => n >= 0 ? `+${n}` : `${n}`;
var BANK_G7_DECUONG = [
  /* ----------- 1. Số thập phân vô hạn tuần hoàn -> phân số ----------- */
  {
    id: "g7.stp-tuan-hoan",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "S\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n tu\u1EA7n ho\xE0n \u2192 ph\xE2n s\u1ED1",
    build: (r) => {
      const nguyen = r.int(0, 3);
      const d = r.pick([1, 2, 3, 4, 5, 6, 7, 8]);
      const [n, m] = reduce(9 * nguyen + d, 9);
      const viet = `${nguyen},(${d})`;
      return {
        stem: `Vi\u1EBFt s\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n tu\u1EA7n ho\xE0n $${viet}$ d\u01B0\u1EDBi d\u1EA1ng ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n (nh\u1EADp theo d\u1EA1ng a/b).`,
        answer: m === 1 ? String(n) : `${n}/${m}`,
        thinking: [
          "Chu k\xEC g\u1ED3m **1 ch\u1EEF s\u1ED1** th\xEC \u0111\u1EB7t $x$ b\u1EB1ng s\u1ED1 \u0111\xF3 r\u1ED3i nh\xE2n $10$: hi\u1EC7u $10x-x=9x$ kh\u1EED \u0111\u01B0\u1EE3c ph\u1EA7n tu\u1EA7n ho\xE0n.",
          "Ghi nh\u1EDB nhanh: $0,(d)=\\f{d}{9}$ ; $0,(dd)=\\f{\\ov{dd}}{99}$."
        ],
        solution: [
          `\u0110\u1EB7t $x=${viet}$ th\xEC $10x=${nguyen * 10 + d},(${d})$.`,
          `Tr\u1EEB theo v\u1EBF: $10x-x=${nguyen * 10 + d}-${nguyen}$, t\u1EE9c $9x=${9 * nguyen + d}$.`,
          `$x=\\f{${9 * nguyen + d}}{9}=\\f{${n}}{${m}}$.`
        ],
        pitfall: "Nh\u1EA7m $0,(3)=\\f{3}{10}$. \u0110\xFAng ph\u1EA3i l\xE0 $\\f{3}{9}=\\f{1}{3}$ \u2014 ph\u1EA7n tu\u1EA7n ho\xE0n k\xE9o d\xE0i v\xF4 h\u1EA1n."
      };
    }
  },
  /* ----------- 2. Phân số viết được dạng thập phân hữu hạn ----------- */
  {
    id: "g7.stp-huu-han",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\u1EADn bi\u1EBFt ph\xE2n s\u1ED1 vi\u1EBFt \u0111\u01B0\u1EE3c d\u1EA1ng th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n",
    build: (r) => {
      const huuHan = [
        { f: "\\f{7}{20}", d: 20 },
        { f: "\\f{3}{8}", d: 8 },
        { f: "\\f{9}{25}", d: 25 },
        { f: "\\f{11}{40}", d: 40 },
        { f: "\\f{13}{50}", d: 50 },
        { f: "\\f{1}{16}", d: 16 }
      ];
      const voHan = [
        { f: "\\f{5}{12}", d: 12 },
        { f: "\\f{2}{7}", d: 7 },
        { f: "\\f{4}{15}", d: 15 },
        { f: "\\f{7}{30}", d: 30 },
        { f: "\\f{5}{6}", d: 6 },
        { f: "\\f{8}{11}", d: 11 }
      ];
      const ok = r.pick(huuHan);
      const sai = r.shuffle(voHan.slice()).slice(0, 3);
      const [options, answer] = mcOptions(r, `$${ok.f}$`, sai.map((x) => `$${x.f}$`));
      return {
        stem: "Trong c\xE1c ph\xE2n s\u1ED1 **t\u1ED1i gi\u1EA3n** sau, ph\xE2n s\u1ED1 n\xE0o vi\u1EBFt \u0111\u01B0\u1EE3c d\u01B0\u1EDBi d\u1EA1ng **s\u1ED1 th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n**?",
        options,
        answer,
        thinking: [
          "D\u1EA5u hi\u1EC7u: ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n vi\u1EBFt \u0111\u01B0\u1EE3c d\u1EA1ng th\u1EADp ph\xE2n **h\u1EEFu h\u1EA1n** khi v\xE0 ch\u1EC9 khi m\u1EABu **ch\u1EC9 c\xF3 \u01B0\u1EDBc nguy\xEAn t\u1ED1 $2$ v\xE0 $5$**.",
          "V\u1EADy h\xE3y ph\xE2n t\xEDch m\u1EABu ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 tr\u01B0\u1EDBc, \u0111\u1EEBng b\u1EA5m m\xE1y chia th\u1EED."
        ],
        solution: [
          `M\u1EABu $${ok.d}$ ch\u1EC9 ch\u1EE9a th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 $2$ v\xE0 $5$ n\xEAn $${ok.f}$ vi\u1EBFt \u0111\u01B0\u1EE3c d\u1EA1ng th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n.`,
          `C\xE1c m\u1EABu c\xF2n l\u1EA1i ($${sai.map((x) => x.d).join("$; $")}$) \u0111\u1EC1u c\xF3 \u01B0\u1EDBc nguy\xEAn t\u1ED1 kh\xE1c $2$ v\xE0 $5$ n\xEAn cho s\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n tu\u1EA7n ho\xE0n.`
        ],
        pitfall: "Ph\u1EA3i r\xFAt g\u1ECDn v\u1EC1 **t\u1ED1i gi\u1EA3n** r\u1ED3i m\u1EDBi x\xE9t m\u1EABu; $\\f{6}{15}=\\f{2}{5}$ v\u1EABn l\xE0 th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n."
      };
    }
  },
  /* ----------- 3. Tìm x chứa căn bậc hai số học ----------- */
  {
    id: "g7.timx-can",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x trong bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n b\u1EADc hai",
    build: (r) => {
      const root = r.int(2, 9);
      const b = r.int(2, 6);
      const a = r.int(5, 40);
      const c = a - b * root;
      return {
        stem: `T\xECm $x\\ge0$, bi\u1EBFt $${a}-${b}\\s{x}=${c}$.`,
        answer: String(root * root),
        thinking: [
          "Coi $\\s{x}$ nh\u01B0 **m\u1ED9t \u1EA9n ph\u1EE5**: chuy\u1EC3n v\u1EBF \u0111\u1EC3 t\xE1ch $\\s{x}$ \u0111\u1EE9ng ri\xEAng m\u1ED9t b\xEAn.",
          "C\xF3 $\\s{x}=k$ (v\u1EDBi $k\\ge0$) th\xEC b\xECnh ph\u01B0\u01A1ng hai v\u1EBF: $x=k^{2}$."
        ],
        solution: [
          `$${a}-${b}\\s{x}=${c}\\Rightarrow ${b}\\s{x}=${a}-(${c})=${a - c}$.`,
          `$\\s{x}=\\f{${a - c}}{${b}}=${root}$.`,
          `V\xEC $${root}\\ge0$ n\xEAn $x=${root}^{2}=${root * root}$.`,
          `Th\u1EED l\u1EA1i: $${a}-${b}\\cdot${root}=${c}$ (\u0111\xFAng). V\u1EADy $x=${root * root}$.`
        ],
        pitfall: "B\xECnh ph\u01B0\u01A1ng khi v\u1EBF ph\u1EA3i **\xE2m** s\u1EBD cho nghi\u1EC7m ngo\u1EA1i lai \u2014 lu\xF4n ki\u1EC3m tra $\\s{x}\\ge0$ tr\u01B0\u1EDBc."
      };
    }
  },
  /* ----------- 4. Phương trình tích chứa căn / giá trị tuyệt đối ----------- */
  {
    id: "g7.pt-tich-can",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh t\xEDch ch\u1EE9a c\u0103n b\u1EADc hai",
    build: (r) => {
      const k = r.int(2, 9);
      const a = r.int(2, 6);
      const b = r.int(1, 20);
      const b2 = b * a;
      const x2 = b2 / a;
      const roots = [k * k, x2].filter((v, i, arr) => arr.indexOf(v) === i).sort((p, q) => p - q);
      return {
        stem: `T\xECm $x\\ge0$, bi\u1EBFt $(\\s{x}-${k})(${a}x-${b2})=0$. (N\u1EBFu c\xF3 nhi\u1EC1u gi\xE1 tr\u1ECB, nh\u1EADp t\u1EEB nh\u1ECF \u0111\u1EBFn l\u1EDBn, c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: roots.join(","),
        accept: roots.length > 1 ? [roots.slice().reverse().join(",")] : void 0,
        thinking: [
          "T\xEDch b\u1EB1ng $0$ khi v\xE0 ch\u1EC9 khi **\xEDt nh\u1EA5t m\u1ED9t th\u1EEBa s\u1ED1 b\u1EB1ng $0$** \u2014 t\xE1ch ra hai ph\u01B0\u01A1ng tr\xECnh con.",
          "Nh\xE1nh ch\u1EE9a c\u0103n c\u1EA7n th\xEAm \u0111i\u1EC1u ki\u1EC7n $x\\ge0$ v\xE0 v\u1EBF ph\u1EA3i kh\xF4ng \xE2m."
        ],
        solution: [
          `$(\\s{x}-${k})(${a}x-${b2})=0\\Leftrightarrow \\cb{\\s{x}-${k}=0\\\\${a}x-${b2}=0}$`,
          `\u2022 $\\s{x}=${k}\\Rightarrow x=${k}^{2}=${k * k}$ (tho\u1EA3 $x\\ge0$).`,
          `\u2022 $${a}x=${b2}\\Rightarrow x=${x2}$ (tho\u1EA3 $x\\ge0$).`,
          `V\u1EADy $x\\in\\{${roots.join(";")}\\}$.`
        ],
        pitfall: "Ch\u1EC9 gi\u1EA3i m\u1ED9t nh\xE1nh r\u1ED3i k\u1EBFt lu\u1EADn l\xE0 **m\u1EA5t n\u1EEDa s\u1ED1 \u0111i\u1EC3m**."
      };
    }
  },
  /* ----------- 5. |ax+b| = |cx+d| ----------- */
  {
    id: "g7.gttd-hai-ve",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh hai v\u1EBF c\xF9ng ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.pick([1, 2, 3, 4]);
      let b = r.int(-9, 9), d = r.int(-9, 9);
      if (b === d) d = b + 2;
      const num = -(b + d), den = 2 * a;
      const [n0, d0] = reduce(num, den);
      const ans = d0 === 1 ? String(n0) : `${n0}/${d0}`;
      return {
        stem: `T\xECm $x$, bi\u1EBFt $|${a === 1 ? "" : a}x${sgn3(b)}|=|${a === 1 ? "" : a}x${sgn3(d)}|$. (Nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n n\u1EBFu l\xE0 ph\xE2n s\u1ED1.)`,
        answer: ans,
        thinking: [
          "$|A|=|B|\\Leftrightarrow A=B$ **ho\u1EB7c** $A=-B$ \u2014 lu\xF4n x\xE9t \u0111\u1EE7 hai tr\u01B0\u1EDDng h\u1EE3p.",
          `\u1EDE \u0111\xE2y h\u1EC7 s\u1ED1 c\u1EE7a $x$ hai v\u1EBF b\u1EB1ng nhau n\xEAn tr\u01B0\u1EDDng h\u1EE3p $A=B$ v\xF4 nghi\u1EC7m, ch\u1EC9 c\xF2n $A=-B$.`
        ],
        solution: [
          `**TH1:** $${a === 1 ? "" : a}x${sgn3(b)}=${a === 1 ? "" : a}x${sgn3(d)}\\Rightarrow ${b}=${d}$ (v\xF4 l\xED) \u2192 lo\u1EA1i.`,
          `**TH2:** $${a === 1 ? "" : a}x${sgn3(b)}=-(${a === 1 ? "" : a}x${sgn3(d)})$`,
          `$\\Leftrightarrow ${a}x${sgn3(b)}=-${a}x${sgn3(-d)}\\Leftrightarrow ${2 * a}x=${-(b + d)}$.`,
          `$x=\\f{${num}}{${den}}=${d0 === 1 ? String(n0) : n0 < 0 ? `-\\f{${-n0}}{${d0}}` : `\\f{${n0}}{${d0}}`}$.`
        ],
        pitfall: "B\u1ECF qu\xEAn tr\u01B0\u1EDDng h\u1EE3p $A=-B$ (ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i) l\xE0 l\u1ED7i ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a d\u1EA1ng n\xE0y."
      };
    }
  },
  /* ----------- 6. GTLN của phân thức chứa |x - a| ----------- */
  {
    id: "g7.gtln-gttd",
    topicId: "g7-t1",
    grade: 7,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a ph\xE2n th\u1EE9c ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.int(1, 9) * r.sign();
      const m = r.int(1, 6);
      const k = r.int(2, 12) * m;
      const maxV = k / m;
      return {
        stem: `T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $P=\\f{${k}}{|x${sgn3(-a)}|+${m}}$ v\u1EDBi $x$ l\xE0 s\u1ED1 th\u1EF1c.`,
        answer: String(maxV),
        thinking: [
          "T\u1EED l\xE0 h\u1EB1ng s\u1ED1 d\u01B0\u01A1ng \u21D2 $P$ **l\u1EDBn nh\u1EA5t khi m\u1EABu nh\u1ECF nh\u1EA5t**.",
          `M\xE0 $|x${sgn3(-a)}|\\ge0$ v\u1EDBi m\u1ECDi $x$, n\xEAn m\u1EABu $\\ge${m}$ \u2014 d\u1EA5u b\u1EB1ng x\u1EA3y ra khi bi\u1EC3u th\u1EE9c trong d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i b\u1EB1ng $0$.`
        ],
        solution: [
          `V\u1EDBi m\u1ECDi $x$: $|x${sgn3(-a)}|\\ge0\\Rightarrow |x${sgn3(-a)}|+${m}\\ge${m}>0$.`,
          `Do \u0111\xF3 $P=\\f{${k}}{|x${sgn3(-a)}|+${m}}\\le\\f{${k}}{${m}}=${maxV}$.`,
          `D\u1EA5u "$=$" x\u1EA3y ra $\\Leftrightarrow x${sgn3(-a)}=0\\Leftrightarrow x=${a}$.`,
          `V\u1EADy $P_{\\max}=${maxV}$ khi $x=${a}$.`
        ],
        pitfall: "V\u1EDBi ph\xE2n th\u1EE9c d\u01B0\u01A1ng, m\u1EABu **c\xE0ng nh\u1ECF gi\xE1 tr\u1ECB c\xE0ng l\u1EDBn** \u2014 nhi\u1EC1u b\u1EA1n l\xE0m ng\u01B0\u1EE3c chi\u1EC1u b\u1EA5t \u0111\u1EB3ng th\u1EE9c."
      };
    }
  },
  /* ----------- 7. Tìm x, y nguyên với |x - a| + b·y = c ----------- */
  {
    id: "g7.xy-nguyen-gttd",
    topicId: "g7-t1",
    grade: 7,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm c\u1EB7p s\u1ED1 nguy\xEAn tho\u1EA3 \u0111\u1EB3ng th\u1EE9c ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
    build: (r) => {
      const a = r.int(1, 9);
      const b = r.pick([2, 3]);
      const y = r.int(1, 5);
      const t = r.int(1, 4) * b;
      const c = t + b * y;
      let count = 0;
      for (let k = 0; k <= c; k++) {
        if ((c - k) % b !== 0) continue;
        count += k === 0 ? 1 : 2;
      }
      return {
        stem: `T\xECm s\u1ED1 c\u1EB7p s\u1ED1 nguy\xEAn $(x;y)$ tho\u1EA3 m\xE3n $|x-${a}|+${b}y=${c}$ v\u1EDBi $y$ l\xE0 s\u1ED1 nguy\xEAn **kh\xF4ng \xE2m**.`,
        answer: String(count),
        thinking: [
          `\u0110\u1EB7t $k=|x-${a}|$ th\xEC $k$ l\xE0 s\u1ED1 nguy\xEAn **kh\xF4ng \xE2m** v\xE0 $${b}y=${c}-k$.`,
          `\u0110i\u1EC1u ki\u1EC7n: $${c}-k$ chia h\u1EBFt cho $${b}$ v\xE0 $${c}-k\\ge0$, t\u1EE9c $0\\le k\\le${c}$.`,
          `V\u1EDBi m\u1ED7i $k>0$ c\xF3 **hai** gi\xE1 tr\u1ECB $x=${a}\\pm k$; ri\xEAng $k=0$ ch\u1EC9 c\xF3 **m\u1ED9t** gi\xE1 tr\u1ECB $x=${a}$.`
        ],
        solution: [
          `\u0110\u1EB7t $k=|x-${a}|\\ge0$, ta \u0111\u01B0\u1EE3c $${b}y=${c}-k$ n\xEAn $k\\equiv${c}\\ (\\text{mod }${b})$ v\xE0 $0\\le k\\le${c}$.`,
          `C\xE1c gi\xE1 tr\u1ECB $k$ h\u1EE3p l\u1EC7 l\xE0 $k\\in\\{${(() => {
            const l = [];
            for (let k = 0; k <= c; k++) if ((c - k) % b === 0) l.push(k);
            return l.join(";");
          })()}\\}$.`,
          `\u0110\u1EBFm nghi\u1EC7m: $k=0$ cho $1$ c\u1EB7p; m\u1ED7i $k>0$ cho $2$ c\u1EB7p.`,
          `V\u1EADy c\xF3 t\u1EA5t c\u1EA3 $${count}$ c\u1EB7p $(x;y)$.`
        ],
        pitfall: "Qu\xEAn r\u1EB1ng $k=0$ ch\u1EC9 \u1EE9ng v\u1EDBi **m\u1ED9t** gi\xE1 tr\u1ECB $x$ n\xEAn \u0111\u1EBFm th\u1EEBa m\u1ED9t c\u1EB7p."
      };
    }
  },
  /* ----------- 8. Biểu đồ hình quạt tròn — tính góc ở tâm ----------- */
  {
    id: "g7.quat-tron-goc",
    topicId: "g7-t7",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "Bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n \u2014 g\xF3c \u1EDF t\xE2m",
    build: (r) => {
      const nhan = ["Tivi", "Laptop", "M\xE1y gi\u1EB7t", "T\u1EE7 l\u1EA1nh"];
      const tong = r.pick([24, 30, 36, 40, 45, 60, 72, 90, 120]);
      const buoc = tong / 12;
      const p = [r.int(1, 4), r.int(1, 4), r.int(1, 4)];
      const p4 = 12 - p[0] - p[1] - p[2];
      const phan = [...p, p4].map((x) => x * buoc);
      const idx = r.int(0, 3);
      const goc = phan[idx] / tong * 360;
      const heSo = r.pick([1, 5, 10]);
      const so = phan.map((x) => x * heSo);
      const tongSo = tong * heSo;
      return {
        stem: `Doanh s\u1ED1 b\u1ED1n d\xF2ng s\u1EA3n ph\u1EA9m c\u1EE7a m\u1ED9t c\u1EEDa h\xE0ng \u0111i\u1EC7n m\xE1y trong th\xE1ng (\u0111\u01A1n v\u1ECB: tri\u1EC7u \u0111\u1ED3ng) l\u1EA7n l\u01B0\u1EE3t l\xE0 ${nhan.map((n, i) => `**${n}**: $${so[i]}$`).join("; ")}.

Khi v\u1EBD bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n, h\xECnh qu\u1EA1t bi\u1EC3u di\u1EC5n **${nhan[idx]}** c\xF3 g\xF3c \u1EDF t\xE2m b\u1EB1ng bao nhi\xEAu \u0111\u1ED9?`,
        answer: String(goc),
        thinking: [
          "C\u1EA3 h\xECnh tr\xF2n \u1EE9ng v\u1EDBi $360\\deg$ v\xE0 \u1EE9ng v\u1EDBi **t\u1ED5ng** t\u1EA5t c\u1EA3 s\u1ED1 li\u1EC7u.",
          "G\xF3c \u1EDF t\xE2m c\u1EE7a m\u1ED9t ph\u1EA7n $=\\f{\\text{s\u1ED1 li\u1EC7u ph\u1EA7n \u0111\xF3}}{\\text{t\u1ED5ng}}\\cdot360\\deg$."
        ],
        solution: [
          `T\u1ED5ng doanh s\u1ED1: $${so.join("+")}=${tongSo}$ (tri\u1EC7u \u0111\u1ED3ng).`,
          `T\u1EC9 l\u1EC7 c\u1EE7a ${nhan[idx]}: $\\f{${so[idx]}}{${tongSo}}$.`,
          `G\xF3c \u1EDF t\xE2m: $\\f{${so[idx]}}{${tongSo}}\\cdot360\\deg=${goc}\\deg$.`
        ],
        pitfall: `Nh\u1EA7m g\xF3c \u1EDF t\xE2m v\u1EDBi **t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m** (chia cho $100$ thay v\xEC nh\xE2n $360\\deg$). \u1EDE \u0111\xE2y t\u1EC9 l\u1EC7 l\xE0 ${Math.round(phan[idx] / tong * 1e3) / 10}%.`
      };
    }
  },
  /* ----------- 9. Biểu đồ đoạn thẳng — trung bình và mức tăng ----------- */
  {
    id: "g7.bieu-do-doan-thang",
    topicId: "g7-t7",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "Bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng \u2014 trung b\xECnh v\xE0 m\u1EE9c t\u0103ng",
    build: (r) => {
      const days = ["Hai", "Ba", "T\u01B0", "N\u0103m", "S\xE1u", "B\u1EA3y", "Ch\u1EE7 nh\u1EADt"];
      const base = r.int(4, 10) * 5;
      const vals = days.map(() => base + r.int(-3, 6) * 5);
      const tong = vals.reduce((s, x) => s + x, 0);
      const hoi = r.pick(["tb", "tang"]);
      if (hoi === "tb") {
        const tb = Math.round(tong / 7 * 100) / 100;
        return {
          stem: `B\u1EA3ng th\u1ED1ng k\xEA s\u1ED1 ly tr\xE0 s\u1EEFa b\xE1n ra trong m\u1ED9t tu\u1EA7n c\u1EE7a c\u1EEDa h\xE0ng:

${days.map((d, i) => `Th\u1EE9 ${d}: $${vals[i]}$`).join(" \xB7 ")}

Trung b\xECnh m\u1ED7i ng\xE0y c\u1EEDa h\xE0ng b\xE1n \u0111\u01B0\u1EE3c bao nhi\xEAu ly? (L\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n tr\u0103m.)`,
          answer: String(tb),
          thinking: ["Trung b\xECnh c\u1ED9ng $=\\f{\\text{t\u1ED5ng t\u1EA5t c\u1EA3 gi\xE1 tr\u1ECB}}{\\text{s\u1ED1 ng\xE0y}}$."],
          solution: [
            `T\u1ED5ng s\u1ED1 ly c\u1EA3 tu\u1EA7n: $${vals.join("+")}=${tong}$.`,
            `Trung b\xECnh m\u1ED7i ng\xE0y: $${tong}:7\\approx${tb}$ (ly).`
          ],
          pitfall: "Chia cho s\u1ED1 ng\xE0y **c\xF3 b\xE1n** ch\u1EE9 kh\xF4ng ph\u1EA3i s\u1ED1 lo\u1EA1i s\u1EA3n ph\u1EA9m."
        };
      }
      const cuoi = vals[5] + vals[6];
      const ti = Math.round(cuoi / tong * 1e4) / 100;
      return {
        stem: `B\u1EA3ng th\u1ED1ng k\xEA s\u1ED1 ly tr\xE0 s\u1EEFa b\xE1n ra trong m\u1ED9t tu\u1EA7n c\u1EE7a c\u1EEDa h\xE0ng:

${days.map((d, i) => `Th\u1EE9 ${d}: $${vals[i]}$`).join(" \xB7 ")}

T\xEDnh t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m s\u1ED1 ly b\xE1n \u0111\u01B0\u1EE3c trong hai ng\xE0y cu\u1ED1i tu\u1EA7n (th\u1EE9 B\u1EA3y v\xE0 Ch\u1EE7 nh\u1EADt) so v\u1EDBi c\u1EA3 tu\u1EA7n. (Nh\u1EADp s\u1ED1 ph\u1EA7n tr\u0103m, l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n tr\u0103m.)`,
        answer: String(ti),
        thinking: [
          "T\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m $=\\f{\\text{ph\u1EA7n c\u1EA7n t\xEDnh}}{\\text{to\xE0n b\u1ED9}}\\cdot100\\%$.",
          'X\xE1c \u0111\u1ECBnh r\xF5 \u0111\xE2u l\xE0 "ph\u1EA7n" v\xE0 \u0111\xE2u l\xE0 "to\xE0n b\u1ED9" tr\u01B0\u1EDBc khi b\u1EA5m m\xE1y.'
        ],
        solution: [
          `Hai ng\xE0y cu\u1ED1i tu\u1EA7n: $${vals[5]}+${vals[6]}=${cuoi}$ (ly).`,
          `C\u1EA3 tu\u1EA7n: $${tong}$ ly.`,
          `T\u1EC9 l\u1EC7: $\\f{${cuoi}}{${tong}}\\cdot100\\%\\approx${ti}\\%$.`
        ],
        pitfall: "L\u1EA5y hai ng\xE0y cu\u1ED1i tu\u1EA7n chia cho **n\u0103m ng\xE0y c\xF2n l\u1EA1i** thay v\xEC chia cho c\u1EA3 tu\u1EA7n."
      };
    }
  },
  /* ----------- 10. Tính hợp lí bằng tính chất phân phối ----------- */
  {
    id: "g7.tinh-hop-li-phan-phoi",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh h\u1EE3p l\xED b\u1EB1ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i",
    build: (r) => {
      const m = r.int(2, 9);
      const d = r.pick([7, 9, 11, 13, 17, 19, 23]);
      const p = r.int(1, d - 1);
      const q = d - p;
      return {
        stem: `T\xEDnh h\u1EE3p l\xED: $A=${m}\\cdot\\f{${p}}{${d}}+${m}\\cdot\\f{${q}}{${d}}$.`,
        answer: String(m),
        thinking: [
          "Th\u1EA5y **th\u1EEBa s\u1ED1 chung** $" + m + "$ \u1EDF c\u1EA3 hai h\u1EA1ng t\u1EED \u2192 \u0111\u1EB7t ra ngo\xE0i (t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i).",
          "Sau khi \u0111\u1EB7t nh\xE2n t\u1EED chung, ph\u1EA7n trong ngo\u1EB7c th\u01B0\u1EDDng g\u1ECDn th\xE0nh s\u1ED1 \u0111\u1EB9p."
        ],
        solution: [
          `$A=${m}\\left(\\f{${p}}{${d}}+\\f{${q}}{${d}}\\right)$`,
          `$=${m}\\cdot\\f{${p}+${q}}{${d}}=${m}\\cdot\\f{${d}}{${d}}=${m}\\cdot1=${m}$.`
        ],
        pitfall: "Quy \u0111\u1ED3ng v\xE0 nh\xE2n bung ra s\u1EBD m\u1EA5t nhi\u1EC1u th\u1EDDi gian v\xE0 d\u1EC5 sai s\u1ED1 \u2014 h\xE3y t\xECm nh\xE2n t\u1EED chung tr\u01B0\u1EDBc."
      };
    }
  },
  /* ----------- 11. Phép tính hỗn hợp: căn + lũy thừa + số mũ 0 ----------- */
  {
    id: "g7.tinh-can-luy-thua",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\xE9p t\xEDnh h\u1ED7n h\u1EE3p c\u0103n b\u1EADc hai v\xE0 l\u0169y th\u1EEBa",
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
      const sa = Math.round(Math.sqrt(a));
      const h = r.int(2, 5);
      const nam = r.pick([2024, 2025, 2026]);
      const b = r.int(2, 6);
      const val = h * sa - b * b + 1;
      return {
        stem: `Th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh: $B=${h}\\s{${a}}-${b}^{2}+${nam}^{0}$.`,
        answer: String(val),
        thinking: [
          "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n: **l\u0169y th\u1EEBa v\xE0 c\u0103n tr\u01B0\u1EDBc**, r\u1ED3i m\u1EDBi nh\xE2n chia, cu\u1ED1i c\xF9ng c\u1ED9ng tr\u1EEB.",
          `Nh\u1EDB quy \u01B0\u1EDBc: m\u1ECDi s\u1ED1 kh\xE1c $0$ n\xE2ng l\xEAn m\u0169 $0$ \u0111\u1EC1u b\u1EB1ng $1$, n\xEAn $${nam}^{0}=1$.`
        ],
        solution: [
          `$\\s{${a}}=${sa}$ ; $${b}^{2}=${b * b}$ ; $${nam}^{0}=1$.`,
          `$B=${h}\\cdot${sa}-${b * b}+1=${h * sa}-${b * b}+1=${val}$.`
        ],
        pitfall: `Vi\u1EBFt $${nam}^{0}=0$ l\xE0 sai \u2014 ch\u1EC9 $0^{0}$ m\u1EDBi kh\xF4ng x\xE1c \u0111\u1ECBnh.`
      };
    }
  },
  /* ----------- 12. Làm tròn và ước lượng ----------- */
  {
    id: "g7.lam-tron",
    topicId: "g7-t1",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "L\xE0m tr\xF2n s\u1ED1 th\u1EADp ph\xE2n",
    build: (r) => {
      const nguyen = r.int(1, 99);
      const d1 = r.int(0, 9), d2 = r.int(0, 9), d3 = r.int(0, 9);
      const so = Number(`${nguyen}.${d1}${d2}${d3}`);
      const den = r.pick(["ph\u1EA7n m\u01B0\u1EDDi", "ph\u1EA7n tr\u0103m"]);
      const k = den === "ph\u1EA7n m\u01B0\u1EDDi" ? 1 : 2;
      const dung = Number(so.toFixed(k));
      const sai = [
        Number((Math.trunc(so * 10 ** k) / 10 ** k).toFixed(k)),
        Number((dung + 10 ** -k).toFixed(k)),
        Number(so.toFixed(k === 1 ? 2 : 1))
      ].filter((v) => v !== dung);
      while (sai.length < 3) sai.push(Number((dung + sai.length * 10 ** -k + 10 ** -k).toFixed(k)));
      const uniq = [];
      for (const v of sai) if (v !== dung && !uniq.includes(v)) uniq.push(v);
      while (uniq.length < 3) {
        const v = Number((dung + (uniq.length + 2) * 10 ** -k).toFixed(k));
        if (v !== dung && !uniq.includes(v)) uniq.push(v);
      }
      const [options, answer] = mcOptions(r, `$${String(dung).replace(".", "{,}")}$`, uniq.slice(0, 3).map((v) => `$${String(v).replace(".", "{,}")}$`));
      return {
        stem: `L\xE0m tr\xF2n s\u1ED1 $${String(so).replace(".", "{,}")}$ \u0111\u1EBFn h\xE0ng **${den}**, ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: [
          "X\xE1c \u0111\u1ECBnh **ch\u1EEF s\u1ED1 h\xE0ng l\xE0m tr\xF2n**, r\u1ED3i nh\xECn ch\u1EEF s\u1ED1 ngay sau n\xF3.",
          "Ch\u1EEF s\u1ED1 sau $\\ge5$ th\xEC t\u0103ng ch\u1EEF s\u1ED1 l\xE0m tr\xF2n th\xEAm $1$; nh\u1ECF h\u01A1n $5$ th\xEC gi\u1EEF nguy\xEAn."
        ],
        solution: [
          `H\xE0ng ${den} \u1EE9ng v\u1EDBi ch\u1EEF s\u1ED1 th\u1EE9 ${k} sau d\u1EA5u ph\u1EA9y.`,
          `Ch\u1EEF s\u1ED1 \u0111\u1EE9ng ngay sau l\xE0 $${k === 1 ? d2 : d3}$ n\xEAn ta ${(k === 1 ? d2 : d3) >= 5 ? "**t\u0103ng th\xEAm 1**" : "**gi\u1EEF nguy\xEAn**"}.`,
          `K\u1EBFt qu\u1EA3: $${String(dung).replace(".", "{,}")}$.`
        ],
        pitfall: "C\u1EAFt b\u1ECF \u0111u\xF4i (ch\u1EB7t) kh\xF4ng ph\u1EA3i l\xE0 l\xE0m tr\xF2n \u2014 ph\u1EA3i nh\xECn ch\u1EEF s\u1ED1 k\u1EBF ti\u1EBFp."
      };
    }
  },
  /* ----------- 13. Dãy tỉ số bằng nhau với hệ số ----------- */
  {
    id: "g7.day-ti-so-he-so",
    topicId: "g7-t2",
    grade: 7,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau c\xF3 h\u1EC7 s\u1ED1 \u1EDF t\u1EED",
    build: (r) => {
      const k = r.int(2, 9);
      const p = r.int(2, 6), q = r.int(2, 6), s = r.int(2, 6);
      const x = p * k, y = q * k, z = s * k;
      const u = r.int(1, 4), v = r.int(1, 4);
      const tong = u * x + v * y;
      return {
        stem: `Cho $\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}$ v\xE0 $${u === 1 ? "" : u}x+${v === 1 ? "" : v}y=${tong}$. T\xEDnh $z$.`,
        answer: String(z),
        thinking: [
          "C\xF3 h\u1EC7 s\u1ED1 k\xE8m theo \u1EDF \u0111i\u1EC1u ki\u1EC7n th\xEC **nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu** c\u1EE7a t\u1EEBng t\u1EC9 s\u1ED1 v\u1EDBi \u0111\xFAng h\u1EC7 s\u1ED1 \u0111\xF3 r\u1ED3i m\u1EDBi d\xF9ng d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau.",
          `$\\f{x}{${p}}=\\f{${u === 1 ? "" : u}x}{${u * p}}$ v\xE0 $\\f{y}{${q}}=\\f{${v === 1 ? "" : v}y}{${v * q}}$.`
        ],
        solution: [
          `$\\f{x}{${p}}=\\f{${u === 1 ? "" : u}x}{${u * p}}$ ; $\\f{y}{${q}}=\\f{${v === 1 ? "" : v}y}{${v * q}}$.`,
          `Theo t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{${u === 1 ? "" : u}x+${v === 1 ? "" : v}y}{${u * p}+${v * q}}=\\f{${tong}}{${u * p + v * q}}=${k}$.`,
          `V\u1EADy t\u1EC9 s\u1ED1 chung b\u1EB1ng $${k}$, suy ra $z=${s}\\cdot${k}=${z}$.`,
          `(Ki\u1EC3m tra: $x=${x}$, $y=${y}$ v\xE0 $${u === 1 ? "" : u}\\cdot${x}+${v === 1 ? "" : v}\\cdot${y}=${tong}$ \u2014 \u0111\xFAng.)`
        ],
        pitfall: "C\u1ED9ng th\u1EB3ng $\\f{x+y}{" + p + "+" + q + "}$ khi \u0111i\u1EC1u ki\u1EC7n c\xF3 h\u1EC7 s\u1ED1 l\xE0 **sai** \u2014 ph\u1EA3i nh\xE2n h\u1EC7 s\u1ED1 v\xE0o t\u1EED v\xE0 m\u1EABu tr\u01B0\u1EDBc."
      };
    }
  },
  /* ----------- 14. Tự luận: rút gọn và tìm x (đề cương) ----------- */
  {
    id: "g7.tl-de-cuong-timx",
    topicId: "g7-t1",
    grade: 7,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 t\xECm x t\u1ED5ng h\u1EE3p (\u0111\u1EC1 c\u01B0\u01A1ng h\u1ECDc k\xEC)",
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36]);
      const sa = Math.round(Math.sqrt(a));
      const b = r.int(2, 5);
      const c = r.int(1, 9);
      const k = r.int(2, 6);
      const x1 = k * k;
      return {
        stem: `T\xECm $x$, bi\u1EBFt:

a) $${b}x-\\s{${a}}=${c}$.

b) $|${b}x-${c}|=${b * 2 + c}$.

c) $(\\s{x}-${k})\\left(x^{2}-${c * c}\\right)=0$ v\u1EDBi $x\\ge0$.`,
        answer: "",
        rubric: [
          { criterion: `a) T\xEDnh $\\s{${a}}=${sa}$ v\xE0 chuy\u1EC3n v\u1EBF \u0111\xFAng`, points: 0.5 },
          { criterion: `a) K\u1EBFt lu\u1EADn $x=\\f{${c + sa}}{${b}}$`, points: 0.5 },
          { criterion: "b) X\xE9t \u0111\u1EE7 **hai** tr\u01B0\u1EDDng h\u1EE3p c\u1EE7a d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", points: 1 },
          { criterion: "b) Gi\u1EA3i v\xE0 k\u1EBFt lu\u1EADn \u0111\xFAng c\u1EA3 hai nghi\u1EC7m", points: 1 },
          { criterion: "c) \u0110\u01B0a v\u1EC1 ph\u01B0\u01A1ng tr\xECnh t\xEDch v\xE0 x\xE9t t\u1EEBng th\u1EEBa s\u1ED1", points: 1 },
          { criterion: `c) \u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $x\\ge0$, k\u1EBFt lu\u1EADn $x\\in\\{${[k * k, c].sort((p, q) => p - q).join(";")}\\}$`, points: 1 }
        ],
        thinking: [
          "Ba c\xE2u \u1EE9ng v\u1EDBi ba k\u0129 thu\u1EADt l\xF5i: **chuy\u1EC3n v\u1EBF**, **ph\xE1 d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i theo hai tr\u01B0\u1EDDng h\u1EE3p**, **\u0111\u01B0a v\u1EC1 ph\u01B0\u01A1ng tr\xECnh t\xEDch**.",
          "C\xE2u n\xE0o c\xF3 c\u0103n ho\u1EB7c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i \u0111\u1EC1u ph\u1EA3i k\xE8m **\u0111i\u1EC1u ki\u1EC7n** v\xE0 **\u0111\u1ED1i chi\u1EBFu** \u1EDF cu\u1ED1i."
        ],
        solution: [
          `**a)** $${b}x-${sa}=${c}\\Rightarrow ${b}x=${c + sa}\\Rightarrow x=\\f{${c + sa}}{${b}}$.`,
          `**b)** $|${b}x-${c}|=${b * 2 + c}$ n\xEAn $${b}x-${c}=${b * 2 + c}$ ho\u1EB7c $${b}x-${c}=-${b * 2 + c}$.`,
          `\u2022 $${b}x=${b * 2 + 2 * c}\\Rightarrow x=\\f{${b * 2 + 2 * c}}{${b}}$.`,
          `\u2022 $${b}x=${-(b * 2)}\\Rightarrow x=${-2}$.`,
          `**c)** $(\\s{x}-${k})(x-${c})(x+${c})=0$ v\u1EDBi $x\\ge0$.`,
          `\u2022 $\\s{x}=${k}\\Rightarrow x=${x1}$. \u2022 $x=${c}$ (nh\u1EADn). \u2022 $x=-${c}$ (lo\u1EA1i v\xEC $x\\ge0$).`,
          `V\u1EADy $x\\in\\{${[k * k, c].sort((p, q) => p - q).join(";")}\\}$.`
        ]
      };
    }
  }
];

// src/bank/g8-plus.ts
var sgn4 = (n) => n < 0 ? `-${Math.abs(n)}` : `+${n}`;
var BANK_G8_PLUS = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: "g8.nb-hang-dang-thuc",
    topicId: "g8-t1",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\u1EADn bi\u1EBFt b\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c",
    build: (r) => {
      const bank = [
        { q: "$(A+B)^{2}$ b\u1EB1ng:", a: "$A^{2}+2AB+B^{2}$", w: ["$A^{2}+B^{2}$", "$A^{2}-2AB+B^{2}$", "$A^{2}+AB+B^{2}$"] },
        { q: "$A^{2}-B^{2}$ b\u1EB1ng:", a: "$(A-B)(A+B)$", w: ["$(A-B)^{2}$", "$(A+B)^{2}$", "$A^{2}+B^{2}$"] },
        { q: "$A^{3}-B^{3}$ b\u1EB1ng:", a: "$(A-B)(A^{2}+AB+B^{2})$", w: ["$(A-B)^{3}$", "$(A-B)(A^{2}-AB+B^{2})$", "$(A+B)(A^{2}-AB+B^{2})$"] },
        { q: "$A^{3}+B^{3}$ b\u1EB1ng:", a: "$(A+B)(A^{2}-AB+B^{2})$", w: ["$(A+B)^{3}$", "$(A+B)(A^{2}+AB+B^{2})$", "$(A-B)(A^{2}+AB+B^{2})$"] },
        { q: "$(A-B)^{3}$ b\u1EB1ng:", a: "$A^{3}-3A^{2}B+3AB^{2}-B^{3}$", w: ["$A^{3}-B^{3}$", "$A^{3}+3A^{2}B+3AB^{2}+B^{3}$", "$A^{3}-3AB+B^{3}$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["B\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c ph\u1EA3i thu\u1ED9c theo c\u1EA3 hai chi\u1EC1u \u2014 \u0111\xE2y l\xE0 b\u1ED9 c\xF4ng c\u1EE5 d\xF9ng su\u1ED1t THCS v\xE0 THPT."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`],
        pitfall: "B\xECnh ph\u01B0\u01A1ng **thi\u1EBFu** $A^{2}\\pm AB+B^{2}$ kh\xE1c b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t hi\u1EC7u $A^{2}-2AB+B^{2}$."
      };
    }
  },
  {
    id: "g8.nb-khai-trien",
    topicId: "g8-t1",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Khai tri\u1EC3n h\u1EB1ng \u0111\u1EB3ng th\u1EE9c",
    build: (r) => {
      const a = r.int(1, 6), b = r.int(1, 9);
      const correct = `$${a * a === 1 ? "" : a * a}x^{2}${sgn4(2 * a * b)}x+${b * b}$`;
      const [options, answer] = mcOptions(r, correct, [
        `$${a * a}x^{2}+${b * b}$`,
        `$${a * a}x^{2}${sgn4(a * b)}x+${b * b}$`,
        `$${a * a}x^{2}${sgn4(-2 * a * b)}x+${b * b}$`
      ]);
      return {
        stem: `Khai tri\u1EC3n $(${a === 1 ? "" : a}x+${b})^{2}$ ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: [`\xC1p d\u1EE5ng $(A+B)^{2}=A^{2}+2AB+B^{2}$ v\u1EDBi $A=${a === 1 ? "" : a}x$, $B=${b}$.`],
        solution: [
          `$A^{2}=${a * a}x^{2}$ ; $2AB=2\\cdot${a}x\\cdot${b}=${2 * a * b}x$ ; $B^{2}=${b * b}$.`,
          `V\u1EADy $(${a === 1 ? "" : a}x+${b})^{2}=${a * a}x^{2}+${2 * a * b}x+${b * b}$.`
        ],
        pitfall: "Qu\xEAn h\u1EA1ng t\u1EED gi\u1EEFa $2AB$ l\xE0 l\u1ED7i ph\u1ED5 bi\u1EBFn nh\u1EA5t."
      };
    }
  },
  {
    id: "g8.nb-dkxd-phan-thuc",
    topicId: "g8-t2",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a ph\xE2n th\u1EE9c",
    build: (r) => {
      const a = r.int(2, 9);
      const correct = `$x\\ne${a}$`;
      const [options, answer] = mcOptions(r, correct, [`$x\\ne-${a}$`, `$x\\ne0$`, `$x>${a}$`]);
      return {
        stem: `Ph\xE2n th\u1EE9c $\\f{2x+1}{x-${a}}$ x\xE1c \u0111\u1ECBnh khi v\xE0 ch\u1EC9 khi:`,
        options,
        answer,
        thinking: ["Ph\xE2n th\u1EE9c x\xE1c \u0111\u1ECBnh khi m\u1EABu th\u1EE9c kh\xE1c 0."],
        solution: [`$x-${a}\\ne0\\Leftrightarrow x\\ne${a}$.`]
      };
    }
  },
  {
    id: "g8.nb-pt-bac-nhat",
    topicId: "g8-t3",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t",
    build: (r) => {
      const a = r.int(2, 9) * r.sign(), x = r.int(-8, 8);
      const b = -a * x;
      const [n, d] = reduce(-b, a);
      const correct = d === 1 ? `$${n}$` : `$\\f{${n}}{${d}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${-x}$`, `$${a}$`, `$${b}$`]);
      return {
        stem: `Nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh $${a}x${sgn4(b)}=0$ l\xE0:`,
        options,
        answer,
        thinking: ["Chuy\u1EC3n v\u1EBF r\u1ED3i chia cho h\u1EC7 s\u1ED1 c\u1EE7a $x$."],
        solution: [`$${a}x=${-b}\\Rightarrow x=\\f{${-b}}{${a}}=${x}$.`]
      };
    }
  },
  {
    id: "g8.nb-ham-so",
    topicId: "g8-t4",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh ch\u1EA5t h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
    build: (r) => {
      const a = r.int(1, 9) * r.sign(), b = r.int(-9, 9);
      const ask = r.pick(["bien", "tung"]);
      const correct = ask === "bien" ? a > 0 ? "\u0110\u1ED3ng bi\u1EBFn tr\xEAn $\\R$" : "Ngh\u1ECBch bi\u1EBFn tr\xEAn $\\R$" : `$(0;${b})$`;
      const wrong = ask === "bien" ? [a > 0 ? "Ngh\u1ECBch bi\u1EBFn tr\xEAn $\\R$" : "\u0110\u1ED3ng bi\u1EBFn tr\xEAn $\\R$", "Kh\xF4ng \u0111\u1ED5i", "Kh\xF4ng x\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EE3c"] : [`$(${b};0)$`, `$(0;${a})$`, `$(${a};${b})$`];
      const [options, answer] = mcOptions(r, correct, wrong);
      return {
        stem: ask === "bien" ? `H\xE0m s\u1ED1 $y=${a}x${sgn4(b)}$ l\xE0 h\xE0m s\u1ED1:` : `\u0110\u1ED3 th\u1ECB h\xE0m s\u1ED1 $y=${a}x${sgn4(b)}$ c\u1EAFt tr\u1EE5c tung t\u1EA1i \u0111i\u1EC3m:`,
        options,
        answer,
        thinking: ask === "bien" ? ["H\u1EC7 s\u1ED1 g\xF3c $a>0$ th\xEC \u0111\u1ED3ng bi\u1EBFn (\u0111\u1ED3 th\u1ECB \u0111i l\xEAn); $a<0$ th\xEC ngh\u1ECBch bi\u1EBFn."] : ["Giao v\u1EDBi tr\u1EE5c tung l\xE0 \u0111i\u1EC3m c\xF3 ho\xE0nh \u0111\u1ED9 b\u1EB1ng 0, tung \u0111\u1ED9 b\u1EB1ng $b$."],
        solution: ask === "bien" ? [`H\u1EC7 s\u1ED1 g\xF3c $a=${a}${a > 0 ? ">0" : "<0"}$ n\xEAn h\xE0m s\u1ED1 ${a > 0 ? "\u0111\u1ED3ng bi\u1EBFn" : "ngh\u1ECBch bi\u1EBFn"} tr\xEAn $\\R$.`] : [`Cho $x=0$: $y=${b}$. V\u1EADy \u0111\u1ED3 th\u1ECB c\u1EAFt tr\u1EE5c tung t\u1EA1i $(0;${b})$.`]
      };
    }
  },
  {
    id: "g8.nb-pythagore-mc",
    topicId: "g8-t7",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Nh\u1EADn bi\u1EBFt tam gi\xE1c vu\xF4ng (Pythagore \u0111\u1EA3o)",
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      const ok = `$${trip[0]}\\,cm$; $${trip[1]}\\,cm$; $${trip[2]}\\,cm$`;
      const bad2 = [
        `$${trip[0]}\\,cm$; $${trip[1]}\\,cm$; $${trip[2] + 1}\\,cm$`,
        `$${trip[0] + 1}\\,cm$; $${trip[1]}\\,cm$; $${trip[2]}\\,cm$`,
        `$${trip[0]}\\,cm$; $${trip[1] + 2}\\,cm$; $${trip[2]}\\,cm$`
      ];
      const [options, answer] = mcOptions(r, ok, bad2);
      return {
        stem: "B\u1ED9 ba \u0111\u1ED9 d\xE0i n\xE0o sau \u0111\xE2y l\xE0 ba c\u1EA1nh c\u1EE7a m\u1ED9t **tam gi\xE1c vu\xF4ng**?",
        options,
        answer,
        thinking: ["D\xF9ng \u0111\u1ECBnh l\xED Pythagore \u0111\u1EA3o: ki\u1EC3m tra b\xECnh ph\u01B0\u01A1ng c\u1EA1nh l\u1EDBn nh\u1EA5t v\u1EDBi t\u1ED5ng b\xECnh ph\u01B0\u01A1ng hai c\u1EA1nh c\xF2n l\u1EA1i."],
        solution: [
          `$${trip[0]}^{2}+${trip[1]}^{2}=${trip[0] ** 2}+${trip[1] ** 2}=${trip[2] ** 2}=${trip[2]}^{2}$.`,
          "V\u1EADy b\u1ED9 ba n\xE0y l\xE0 ba c\u1EA1nh c\u1EE7a m\u1ED9t tam gi\xE1c vu\xF4ng."
        ]
      };
    }
  },
  {
    id: "g8.nb-duong-trung-binh",
    topicId: "g8-t6",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c",
    build: (r) => {
      const bc = r.int(4, 30) * 2;
      const [options, answer] = mcOptions(r, `$${bc / 2}\\,cm$`, distractInt(r, bc / 2, 4).map((x) => `$${x}\\,cm$`));
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $M$, $N$ l\u1EA7n l\u01B0\u1EE3t l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AB$, $AC$ v\xE0 $BC=${bc}\\,cm$. \u0110\u1ED9 d\xE0i $MN$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ["\u0110\u01B0\u1EDDng trung b\xECnh song song v\u1EDBi c\u1EA1nh th\u1EE9 ba v\xE0 b\u1EB1ng N\u1EECA c\u1EA1nh \u1EA5y."],
        solution: [`$MN=\\f{BC}{2}=\\f{${bc}}{2}=${bc / 2}\\ (cm)$.`]
      };
    }
  },
  /* ============================ THÔNG HIỂU ============================ */
  {
    id: "g8.th-nhan-tu-nhom",
    topicId: "g8-t1",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE2n t\xEDch nh\xE2n t\u1EED b\u1EB1ng nh\xF3m h\u1EA1ng t\u1EED",
    build: (r) => {
      const a = r.int(2, 7), b = r.int(2, 8);
      const correct = `$(x+${a})(x+${b})$`;
      const [options, answer] = mcOptions(r, correct, [
        `$(x-${a})(x-${b})$`,
        `$(x+${a})(x-${b})$`,
        `$(x+${a + b})(x+1)$`
      ]);
      return {
        stem: `Ph\xE2n t\xEDch $x^{2}+${a}x+${b}x+${a * b}$ th\xE0nh nh\xE2n t\u1EED ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: ["B\u1ED1n h\u1EA1ng t\u1EED \u2192 nh\xF3m 2\u20132, sau \u0111\xF3 \u0111\u1EB7t nh\xE2n t\u1EED chung."],
        solution: [
          `$x^{2}+${a}x+${b}x+${a * b}=(x^{2}+${a}x)+(${b}x+${a * b})$`,
          `$=x(x+${a})+${b}(x+${a})=(x+${a})(x+${b})$.`
        ]
      };
    }
  },
  {
    id: "g8.th-rut-gon-phan-thuc-2",
    topicId: "g8-t2",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh gi\xE1 tr\u1ECB ph\xE2n th\u1EE9c sau khi r\xFAt g\u1ECDn",
    build: (r) => {
      const a = r.int(2, 8);
      const x = r.int(2, 12);
      if (x === a || x === -a || x === 0) return {
        stem: `Cho $P=\\f{x^{2}-4}{x^{2}+2x}$. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $P$ t\u1EA1i $x=3$.`,
        answer: "1/3",
        thinking: ["R\xFAt g\u1ECDn tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi thay s\u1ED1 \u2014 nhanh h\u01A1n v\xE0 tr\xE1nh s\u1ED1 l\u1EDBn."],
        solution: ["$P=\\f{(x-2)(x+2)}{x(x+2)}=\\f{x-2}{x}$.", "T\u1EA1i $x=3$: $P=\\f{1}{3}$."]
      };
      const [n, d] = reduce(x - a, x);
      return {
        stem: `Cho $P=\\f{x^{2}-${a * a}}{x^{2}+${a}x}$ (v\u1EDBi $x\\ne0$, $x\\ne-${a}$). T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $P$ t\u1EA1i $x=${x}$ (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        thinking: ["R\xFAt g\u1ECDn tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi thay s\u1ED1 \u2014 nhanh h\u01A1n v\xE0 tr\xE1nh s\u1ED1 l\u1EDBn."],
        solution: [
          `$P=\\f{(x-${a})(x+${a})}{x(x+${a})}=\\f{x-${a}}{x}$.`,
          `T\u1EA1i $x=${x}$: $P=\\f{${x}-${a}}{${x}}=\\f{${x - a}}{${x}}=\\f{${n}}{${d}}$.`
        ],
        pitfall: "Thay s\u1ED1 v\xE0o bi\u1EC3u th\u1EE9c ch\u01B0a r\xFAt g\u1ECDn s\u1EBD ra s\u1ED1 r\u1EA5t l\u1EDBn v\xE0 d\u1EC5 sai."
      };
    }
  },
  {
    id: "g8.th-pt-tich",
    topicId: "g8-t3",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh t\xEDch",
    build: (r) => {
      const a = r.int(1, 9), b = r.int(1, 9);
      const roots = Array.from(/* @__PURE__ */ new Set([a, -b])).sort((p, q) => p - q);
      return {
        stem: `Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $(x-${a})(x+${b})=0$. (N\u1EBFu c\xF3 nhi\u1EC1u nghi\u1EC7m, nh\u1EADp c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: roots.join(","),
        accept: [roots.slice().reverse().join(",")],
        thinking: ["T\xEDch b\u1EB1ng 0 khi v\xE0 ch\u1EC9 khi \xEDt nh\u1EA5t m\u1ED9t th\u1EEBa s\u1ED1 b\u1EB1ng 0."],
        solution: [
          `$(x-${a})(x+${b})=0\\Leftrightarrow x-${a}=0$ ho\u1EB7c $x+${b}=0$.`,
          `$x=${a}$ ho\u1EB7c $x=${-b}$.`
        ]
      };
    }
  },
  {
    id: "g8.th-do-thi-diem",
    topicId: "g8-t4",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
    build: (r) => {
      const a = r.int(1, 5) * r.sign(), b = r.int(-8, 8);
      const x = r.int(-4, 4);
      const y = a * x + b;
      const [options, answer] = mcOptions(r, `$(${x};${y})$`, [`$(${x};${y + 1})$`, `$(${y};${x})$`, `$(${x};${-y})$`]);
      return {
        stem: `\u0110i\u1EC3m n\xE0o sau \u0111\xE2y **thu\u1ED9c** \u0111\u1ED3 th\u1ECB h\xE0m s\u1ED1 $y=${a}x${sgn4(b)}$?`,
        options,
        answer,
        thinking: ["\u0110i\u1EC3m $(x_0;y_0)$ thu\u1ED9c \u0111\u1ED3 th\u1ECB khi thay v\xE0o c\xF4ng th\u1EE9c \u0111\u01B0\u1EE3c \u0111\u1EB3ng th\u1EE9c \u0111\xFAng."],
        solution: [`Thay $x=${x}$: $y=${a}\\cdot(${x})${sgn4(b)}=${y}$. V\u1EADy \u0111i\u1EC3m $(${x};${y})$ thu\u1ED9c \u0111\u1ED3 th\u1ECB.`]
      };
    }
  },
  {
    id: "g8.th-tf-hang-dang-thuc",
    topicId: "g8-t1",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c v\xE0 nh\xE2n t\u1EED",
    build: (r) => {
      const a = r.int(2, 8);
      return {
        stem: "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh sau:",
        options: [
          `$x^{2}-${a * a}=(x-${a})(x+${a})$`,
          `$x^{2}+${a * a}=(x+${a})^{2}$`,
          `$x^{2}+${2 * a}x+${a * a}=(x+${a})^{2}$`,
          `$x^{2}+${a * a}$ ph\xE2n t\xEDch \u0111\u01B0\u1EE3c th\xE0nh nh\xE2n t\u1EED tr\xEAn t\u1EADp s\u1ED1 th\u1EF1c`
        ],
        answer: [true, false, true, false],
        thinking: ["Nh\u1EDB r\xF5: hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng ph\xE2n t\xEDch \u0111\u01B0\u1EE3c, T\u1ED4NG hai b\xECnh ph\u01B0\u01A1ng th\xEC kh\xF4ng."],
        solution: [
          "a) \u0110\xFAng \u2014 hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng.",
          `b) Sai \u2014 $(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}$, c\xF3 th\xEAm h\u1EA1ng t\u1EED gi\u1EEFa.`,
          "c) \u0110\xFAng \u2014 b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t t\u1ED5ng.",
          "d) Sai \u2014 t\u1ED5ng hai b\xECnh ph\u01B0\u01A1ng kh\xF4ng ph\xE2n t\xEDch \u0111\u01B0\u1EE3c th\xE0nh nh\xE2n t\u1EED tr\xEAn $\\R$."
        ]
      };
    }
  },
  {
    id: "g8.th-tf-tu-giac",
    topicId: "g8-t5",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t",
    build: (r) => {
      void r;
      return {
        stem: "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh v\u1EC1 t\u1EE9 gi\xE1c:",
        options: [
          "H\xECnh vu\xF4ng v\u1EEBa l\xE0 h\xECnh ch\u1EEF nh\u1EADt v\u1EEBa l\xE0 h\xECnh thoi",
          "H\xECnh thoi c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau",
          "H\xECnh b\xECnh h\xE0nh c\xF3 m\u1ED9t g\xF3c vu\xF4ng l\xE0 h\xECnh ch\u1EEF nh\u1EADt",
          "H\xECnh ch\u1EEF nh\u1EADt c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau v\xE0 c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng"
        ],
        answer: [true, false, true, true],
        thinking: ["D\u1EF1a v\xE0o s\u01A1 \u0111\u1ED3 quan h\u1EC7 gi\u1EEFa c\xE1c t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t."],
        solution: [
          "a) \u0110\xFAng \u2014 h\xECnh vu\xF4ng tho\u1EA3 m\u1ECDi t\xEDnh ch\u1EA5t c\u1EE7a c\u1EA3 h\xECnh ch\u1EEF nh\u1EADt l\u1EABn h\xECnh thoi.",
          "b) Sai \u2014 h\xECnh thoi c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o **vu\xF4ng g\xF3c**; b\u1EB1ng nhau ch\u1EC9 khi n\xF3 l\xE0 h\xECnh vu\xF4ng.",
          "c) \u0110\xFAng \u2014 \u0111\xE2y l\xE0 m\u1ED9t d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt h\xECnh ch\u1EEF nh\u1EADt.",
          "d) \u0110\xFAng \u2014 t\xEDnh ch\u1EA5t c\u1EE7a h\xECnh ch\u1EEF nh\u1EADt."
        ]
      };
    }
  },
  {
    id: "g8.th-phan-giac",
    topicId: "g8-t6",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c trong tam gi\xE1c",
    build: (r) => {
      const ab = r.int(3, 12), ac = r.int(3, 14);
      const bc = r.int(Math.abs(ab - ac) + 2, ab + ac - 1);
      const db = bc * ab / (ab + ac);
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $AB=${ab}$, $AC=${ac}$, $BC=${bc}$. $AD$ l\xE0 \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c trong ($D\\in BC$). T\xEDnh $DB$ (l\xE0m tr\xF2n 2 ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n).`,
        answer: String(Math.round(db * 100) / 100),
        thinking: [
          "T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c: $\\f{DB}{DC}=\\f{AB}{AC}$.",
          "K\u1EBFt h\u1EE3p v\u1EDBi $DB+DC=BC$ \u0111\u1EC3 t\xECm t\u1EEBng \u0111o\u1EA1n."
        ],
        solution: [
          `$\\f{DB}{DC}=\\f{AB}{AC}=\\f{${ab}}{${ac}}$.`,
          `\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{DB}{${ab}}=\\f{DC}{${ac}}=\\f{DB+DC}{${ab}+${ac}}=\\f{${bc}}{${ab + ac}}$.`,
          `$DB=${ab}\\cdot\\f{${bc}}{${ab + ac}}=${Math.round(db * 100) / 100}$.`
        ]
      };
    }
  },
  /* ============================ VẬN DỤNG ============================ */
  {
    id: "g8.vd-tinh-nhanh-hdt",
    topicId: "g8-t1",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh nhanh gi\xE1 tr\u1ECB bi\u1EC3u th\u1EE9c nh\u1EDD h\u1EB1ng \u0111\u1EB3ng th\u1EE9c",
    build: (r) => {
      const n = r.pick([101, 99, 102, 98, 201, 199]);
      const base = Math.round(n / 100) * 100;
      const d = n - base;
      const v = n * n;
      return {
        stem: `T\xEDnh nhanh gi\xE1 tr\u1ECB c\u1EE7a $${n}^{2}$ b\u1EB1ng c\xE1ch d\xF9ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c.`,
        answer: String(v),
        thinking: [
          `Vi\u1EBFt $${n}=${base}${d >= 0 ? "+" : "-"}${Math.abs(d)}$ \u0111\u1EC3 \u0111\u01B0a v\u1EC1 b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t ${d >= 0 ? "t\u1ED5ng" : "hi\u1EC7u"} v\u1EDBi s\u1ED1 tr\xF2n tr\u0103m.`
        ],
        solution: [
          `$${n}^{2}=(${base}${d >= 0 ? "+" : "-"}${Math.abs(d)})^{2}=${base}^{2}${d >= 0 ? "+" : "-"}2\\cdot${base}\\cdot${Math.abs(d)}+${d * d}$`,
          `$=${base * base}${d >= 0 ? "+" : "-"}${2 * base * Math.abs(d)}+${d * d}=${v}$.`
        ]
      };
    }
  },
  {
    id: "g8.vd-lap-pt-so",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 b\xE0i to\xE1n s\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1",
    build: (r) => {
      const a = r.int(1, 8), b = a + r.int(1, 9 - a);
      const num = 10 * a + b;
      const sum = a + b;
      const rev = 10 * b + a;
      const diff = rev - num;
      return {
        stem: `M\u1ED9t s\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1, t\u1ED5ng hai ch\u1EEF s\u1ED1 b\u1EB1ng $${sum}$. N\u1EBFu \u0111\u1ED5i ch\u1ED7 hai ch\u1EEF s\u1ED1 th\xEC \u0111\u01B0\u1EE3c s\u1ED1 m\u1EDBi l\u1EDBn h\u01A1n s\u1ED1 ban \u0111\u1EA7u $${diff}$ \u0111\u01A1n v\u1ECB. T\xECm s\u1ED1 ban \u0111\u1EA7u.`,
        answer: String(num),
        thinking: [
          "\u0110\u1EB7t s\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1 l\xE0 $\\ov{ab}=10a+b$ v\u1EDBi $1\\le a\\le9$, $0\\le b\\le9$.",
          "S\u1ED1 \u0111\u1ED5i ch\u1ED7 l\xE0 $\\ov{ba}=10b+a$."
        ],
        solution: [
          `G\u1ECDi ch\u1EEF s\u1ED1 h\xE0ng ch\u1EE5c l\xE0 $a$, h\xE0ng \u0111\u01A1n v\u1ECB l\xE0 $b$ ($a,b\\in\\N$; $1\\le a\\le9$; $0\\le b\\le9$).`,
          `S\u1ED1 ban \u0111\u1EA7u: $10a+b$; s\u1ED1 sau khi \u0111\u1ED5i ch\u1ED7: $10b+a$.`,
          `Theo \u0111\u1EC1: $a+b=${sum}$ (1) v\xE0 $(10b+a)-(10a+b)=${diff}$, t\u1EE9c $9(b-a)=${diff}\\Rightarrow b-a=${(rev - num) / 9}$ (2).`,
          `T\u1EEB (1) v\xE0 (2): $b=${b}$, $a=${a}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`,
          `V\u1EADy s\u1ED1 c\u1EA7n t\xECm l\xE0 **${num}**.`
        ]
      };
    }
  },
  {
    id: "g8.vd-thales-tinh",
    topicId: "g8-t6",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\u1EC7 qu\u1EA3 \u0111\u1ECBnh l\xED Thal\xE8s \u2014 t\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n song song",
    build: (r) => {
      const am = r.int(2, 8), ab = am + r.int(2, 9);
      const bc = r.int(6, 24);
      const mn = am * bc / ab;
      return {
        stem: `Tam gi\xE1c $ABC$ c\xF3 $MN\\para BC$ ($M\\in AB$, $N\\in AC$). Bi\u1EBFt $AM=${am}$, $AB=${ab}$, $BC=${bc}$. T\xEDnh $MN$ (l\xE0m tr\xF2n 2 ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n).`,
        answer: String(Math.round(mn * 100) / 100),
        thinking: ["$MN\\para BC$ \u2192 d\xF9ng **h\u1EC7 qu\u1EA3** \u0111\u1ECBnh l\xED Thal\xE8s: $\\f{AM}{AB}=\\f{MN}{BC}$."],
        solution: [
          `V\xEC $MN\\para BC$ n\xEAn theo h\u1EC7 qu\u1EA3 \u0111\u1ECBnh l\xED Thal\xE8s: $\\f{AM}{AB}=\\f{AN}{AC}=\\f{MN}{BC}$.`,
          `$\\f{${am}}{${ab}}=\\f{MN}{${bc}}\\Rightarrow MN=\\f{${am}\\cdot${bc}}{${ab}}=${Math.round(mn * 100) / 100}$.`
        ],
        pitfall: "Ph\xE2n bi\u1EC7t \u0111\u1ECBnh l\xED Thal\xE8s ($\\f{AM}{MB}$) v\u1EDBi h\u1EC7 qu\u1EA3 ($\\f{AM}{AB}$) \u2014 d\xF9ng nh\u1EA7m l\xE0 sai k\u1EBFt qu\u1EA3."
      };
    }
  },
  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: "g8.vdc-cuc-tri-2",
    topicId: "g8-t1",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a tam th\u1EE9c b\u1EADc hai",
    build: (r) => {
      const m = r.int(1, 8), k = r.int(1, 15);
      const b = 2 * m, c = k - m * m;
      return {
        stem: `T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $P=${poly([-1, b, c])}$.`,
        answer: String(k),
        thinking: [
          "H\u1EC7 s\u1ED1 c\u1EE7a $x^{2}$ \xE2m \u2192 bi\u1EC3u th\u1EE9c c\xF3 gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t.",
          "\u0110\u1EB7t d\u1EA5u tr\u1EEB ra ngo\xE0i r\u1ED3i ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng."
        ],
        solution: [
          `$P=-(x^{2}-${b}x)${c >= 0 ? "+" : "-"}${Math.abs(c)}=-(x^{2}-${b}x+${m * m})+${m * m}${c >= 0 ? "+" : "-"}${Math.abs(c)}$`,
          `$P=-(x-${m})^{2}+${k}$.`,
          `V\xEC $(x-${m})^{2}\\ge0$ n\xEAn $-(x-${m})^{2}\\le0$, do \u0111\xF3 $P\\le${k}$.`,
          `D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x=${m}$. V\u1EADy $P_{\\max}=${k}$ khi $x=${m}$.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i d\u1EA5u khi \u0111\u1EB7t d\u1EA5u tr\u1EEB ra ngo\xE0i ngo\u1EB7c."
      };
    }
  },
  {
    id: "g8.vdc-chia-het",
    topicId: "g8-t1",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ch\u1EE9ng minh chia h\u1EBFt b\u1EB1ng ph\xE2n t\xEDch nh\xE2n t\u1EED",
    build: (r) => {
      const n = r.int(3, 20);
      const v = n * n * n - n;
      return {
        stem: `Cho bi\u1EC3u th\u1EE9c $A=n^{3}-n$ v\u1EDBi $n$ nguy\xEAn. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $A$ t\u1EA1i $n=${n}$ v\xE0 cho bi\u1EBFt $A$ chia h\u1EBFt cho s\u1ED1 n\xE0o l\u1EDBn nh\u1EA5t trong c\xE1c s\u1ED1 2, 3, 6 (nh\u1EADp gi\xE1 tr\u1ECB c\u1EE7a $A$).`,
        answer: String(v),
        thinking: [
          "$n^{3}-n=(n-1)n(n+1)$ l\xE0 t\xEDch ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp.",
          "Trong ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp lu\xF4n c\xF3 m\u1ED9t b\u1ED9i c\u1EE7a 2 v\xE0 m\u1ED9t b\u1ED9i c\u1EE7a 3 \u2192 t\xEDch chia h\u1EBFt cho 6."
        ],
        solution: [
          `$A=n^{3}-n=n(n^{2}-1)=(n-1)n(n+1)$.`,
          `T\u1EA1i $n=${n}$: $A=${n - 1}\\cdot${n}\\cdot${n + 1}=${v}$.`,
          `V\xEC $(n-1)n(n+1)$ l\xE0 t\xEDch ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp n\xEAn lu\xF4n chia h\u1EBFt cho $2$ v\xE0 $3$, do \u0111\xF3 chia h\u1EBFt cho $6$.`,
          `Ki\u1EC3m tra: $${v}:6=${v / 6}$ \u2713`
        ]
      };
    }
  },
  {
    id: "g8.vdc-phan-thuc-tong",
    topicId: "g8-t2",
    grade: 8,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u1ED5ng ph\xE2n th\u1EE9c c\xF3 quy lu\u1EADt (sai ph\xE2n)",
    build: (r) => {
      const a = r.int(1, 4), b = r.int(15, 40);
      const num = b + 1 - a, den = a * (b + 1);
      const [n, d] = reduce(num, den);
      return {
        stem: `T\xEDnh t\u1ED5ng $S=\\f{1}{${a}\\cdot${a + 1}}+\\f{1}{${a + 1}\\cdot${a + 2}}+\\dots+\\f{1}{${b}\\cdot${b + 1}}$ (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        thinking: ["D\xF9ng $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$ \u0111\u1EC3 c\xE1c s\u1ED1 h\u1EA1ng gi\u1EEFa tri\u1EC7t ti\xEAu."],
        solution: [
          `$S=\\left(\\f{1}{${a}}-\\f{1}{${a + 1}}\\right)+\\dots+\\left(\\f{1}{${b}}-\\f{1}{${b + 1}}\\right)=\\f{1}{${a}}-\\f{1}{${b + 1}}$.`,
          `$S=\\f{${b + 1}-${a}}{${den}}=\\f{${n}}{${d}}$.`
        ]
      };
    }
  },
  /* ============================= TỰ LUẬN ============================= */
  {
    id: "g8.tl-phan-thuc",
    topicId: "g8-t2",
    grade: 8,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 r\xFAt g\u1ECDn ph\xE2n th\u1EE9c v\xE0 b\xE0i to\xE1n ph\u1EE5",
    build: (r) => {
      const a = r.int(2, 7);
      const x = r.int(2, 9);
      return {
        stem: `Cho bi\u1EC3u th\u1EE9c $P=\\f{1}{x-${a}}+\\f{1}{x+${a}}-\\f{2x}{x^{2}-${a * a}}$.

a) T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a $P$.

b) R\xFAt g\u1ECDn $P$.

c) T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $P$ t\u1EA1i $x=${x}$ (n\u1EBFu x\xE1c \u0111\u1ECBnh).`,
        answer: "",
        rubric: [
          { criterion: `C\xE2u a: \u0111i\u1EC1u ki\u1EC7n $x\\ne${a}$ v\xE0 $x\\ne-${a}$`, points: 1 },
          { criterion: `C\xE2u b: ph\xE2n t\xEDch $x^{2}-${a * a}=(x-${a})(x+${a})$ v\xE0 t\xECm \u0111\xFAng m\u1EABu chung`, points: 1 },
          { criterion: "C\xE2u b: quy \u0111\u1ED3ng v\xE0 thu g\u1ECDn t\u1EED \u0111\xFAng d\u1EA5u", points: 1 },
          { criterion: "C\xE2u b: k\u1EBFt lu\u1EADn $P=0$", points: 0.5 },
          { criterion: "C\xE2u c: \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n v\xE0 k\u1EBFt lu\u1EADn", points: 0.5 }
        ],
        thinking: [
          "Lu\xF4n vi\u1EBFt \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh TR\u01AF\u1EDAC khi r\xFAt g\u1ECDn.",
          "Ph\xE2n t\xEDch m\u1EABu th\xE0nh nh\xE2n t\u1EED \u0111\u1EC3 nh\xECn ra m\u1EABu chung."
        ],
        solution: [
          `a) $P$ x\xE1c \u0111\u1ECBnh khi $x-${a}\\ne0$ v\xE0 $x+${a}\\ne0$, t\u1EE9c $x\\ne${a}$ v\xE0 $x\\ne-${a}$.`,
          `b) $x^{2}-${a * a}=(x-${a})(x+${a})$ n\xEAn m\u1EABu chung l\xE0 $(x-${a})(x+${a})$.`,
          `$P=\\f{(x+${a})+(x-${a})-2x}{(x-${a})(x+${a})}=\\f{2x-2x}{(x-${a})(x+${a})}=0$.`,
          `V\u1EADy $P=0$ v\u1EDBi m\u1ECDi $x$ tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh.`,
          `c) T\u1EA1i $x=${x}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n), $P=0$.`
        ]
      };
    }
  },
  {
    id: "g8.tl-hinh-tu-giac",
    topicId: "g8-t5",
    grade: 8,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "T\u1EF1 lu\u1EADn h\xECnh h\u1ECDc \u2014 t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t",
    build: (r) => {
      void r;
      return {
        stem: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ ($AB<AC$), $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. G\u1ECDi $D$, $E$ l\u1EA7n l\u01B0\u1EE3t l\xE0 h\xECnh chi\u1EBFu vu\xF4ng g\xF3c c\u1EE7a $M$ tr\xEAn $AB$, $AC$.\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ADME$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt.\n\nb) Ch\u1EE9ng minh $D$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AB$ v\xE0 $E$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AC$.\n\nc) G\u1ECDi $N$ l\xE0 \u0111i\u1EC3m \u0111\u1ED1i x\u1EE9ng v\u1EDBi $M$ qua $E$. Ch\u1EE9ng minh t\u1EE9 gi\xE1c $AMCN$ l\xE0 h\xECnh thoi.\n\nd) Tam gi\xE1c $ABC$ c\u1EA7n th\xEAm \u0111i\u1EC1u ki\u1EC7n g\xEC \u0111\u1EC3 $AMCN$ l\xE0 h\xECnh vu\xF4ng?",
        answer: "",
        rubric: [
          { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi gi\u1EA3 thi\u1EBFt \u2013 k\u1EBFt lu\u1EADn", points: 0.5 },
          { criterion: "C\xE2u a: ch\u1EC9 ra ba g\xF3c vu\xF4ng v\xE0 k\u1EBFt lu\u1EADn h\xECnh ch\u1EEF nh\u1EADt", points: 1 },
          { criterion: "C\xE2u b: d\xF9ng $MD\\para AC$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$ \u27F9 $D$ l\xE0 trung \u0111i\u1EC3m $AB$ (\u0111\u01B0\u1EDDng trung b\xECnh)", points: 1 },
          { criterion: "C\xE2u c: ch\u1EE9ng minh $AMCN$ l\xE0 h\xECnh b\xECnh h\xE0nh (hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m)", points: 1 },
          { criterion: "C\xE2u c: th\xEAm $MN\\perp AC$ \u27F9 h\xECnh thoi", points: 0.5 },
          { criterion: "C\xE2u d: \u0111i\u1EC1u ki\u1EC7n $AB=AC$ (tam gi\xE1c vu\xF4ng c\xE2n t\u1EA1i $A$)", points: 1 }
        ],
        thinking: [
          "\xDD a: \u201Cba g\xF3c vu\xF4ng\u201D l\xE0 d\u1EA5u hi\u1EC7u ng\u1EAFn nh\u1EA5t cho h\xECnh ch\u1EEF nh\u1EADt.",
          "\xDD b: $MD\\perp AB$ v\xE0 $AC\\perp AB$ n\xEAn $MD\\para AC$; k\u1EBFt h\u1EE3p $M$ l\xE0 trung \u0111i\u1EC3m $BC$ \u2192 \u0111\u01B0\u1EDDng trung b\xECnh.",
          "\xDD c: \u0111\u1ED1i x\u1EE9ng qua $E$ cho $E$ l\xE0 trung \u0111i\u1EC3m $MN$; m\xE0 $E$ c\u0169ng l\xE0 trung \u0111i\u1EC3m $AC$ \u2192 hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m.",
          "\xDD d: h\xECnh thoi th\xE0nh h\xECnh vu\xF4ng khi c\xF3 th\xEAm m\u1ED9t g\xF3c vu\xF4ng ho\u1EB7c hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau."
        ],
        solution: [
          "a) X\xE9t t\u1EE9 gi\xE1c $ADME$: $\\angle DAE=90\\deg$ (v\xEC $\\tri ABC$ vu\xF4ng t\u1EA1i $A$); $\\angle ADM=90\\deg$ ($MD\\perp AB$); $\\angle AEM=90\\deg$ ($ME\\perp AC$).",
          "T\u1EE9 gi\xE1c c\xF3 ba g\xF3c vu\xF4ng n\xEAn $ADME$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt.",
          "b) V\xEC $MD\\perp AB$ v\xE0 $AC\\perp AB$ n\xEAn $MD\\para AC$. Trong tam gi\xE1c $ABC$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$ v\xE0 $MD\\para AC$ n\xEAn $D$ l\xE0 trung \u0111i\u1EC3m $AB$.",
          "T\u01B0\u01A1ng t\u1EF1, $ME\\para AB$ v\xE0 $M$ l\xE0 trung \u0111i\u1EC3m $BC$ n\xEAn $E$ l\xE0 trung \u0111i\u1EC3m $AC$.",
          "c) V\xEC $N$ \u0111\u1ED1i x\u1EE9ng v\u1EDBi $M$ qua $E$ n\xEAn $E$ l\xE0 trung \u0111i\u1EC3m $MN$. M\xE0 $E$ c\u0169ng l\xE0 trung \u0111i\u1EC3m $AC$.",
          "T\u1EE9 gi\xE1c $AMCN$ c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o $AC$ v\xE0 $MN$ c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m $E$ c\u1EE7a m\u1ED7i \u0111\u01B0\u1EDDng n\xEAn l\xE0 h\xECnh b\xECnh h\xE0nh.",
          "L\u1EA1i c\xF3 $MN\\perp AC$ (v\xEC $ME\\perp AC$), t\u1EE9c hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c, n\xEAn $AMCN$ l\xE0 **h\xECnh thoi**.",
          "d) H\xECnh thoi $AMCN$ l\xE0 h\xECnh vu\xF4ng khi c\xF3 th\xEAm m\u1ED9t g\xF3c vu\xF4ng, t\u1EE9c $\\angle AMC=90\\deg$, hay $AM\\perp BC$.",
          "M\xE0 $AM$ l\xE0 trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n; $AM\\perp BC$ khi v\xE0 ch\u1EC9 khi $AM$ \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao, t\u1EE9c tam gi\xE1c $ABC$ **vu\xF4ng c\xE2n t\u1EA1i $A$** ($AB=AC$)."
        ]
      };
    }
  }
];

// src/bank/g9-plus.ts
var sgn5 = (n) => n < 0 ? `-${Math.abs(n)}` : `+${n}`;
var BANK_G9_PLUS = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: "g9.nb-can-gia-tri",
    topicId: "g9-t2",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\xEDnh gi\xE1 tr\u1ECB c\u0103n b\u1EADc hai",
    build: (r) => {
      const n = r.int(2, 15);
      const sq = n * n;
      const [options, answer] = mcOptions(r, `$${n}$`, [`$-${n}$`, `$\\pm${n}$`, `$${sq / 2}$`]);
      return {
        stem: `Gi\xE1 tr\u1ECB c\u1EE7a $\\s{${sq}}$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ["C\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB kh\xF4ng \xE2m."],
        solution: [`$\\s{${sq}}=${n}$ v\xEC $${n}\\ge0$ v\xE0 $${n}^{2}=${sq}$.`],
        pitfall: `$\\s{${sq}}=${n}$ (m\u1ED9t gi\xE1 tr\u1ECB), nh\u01B0ng $x^{2}=${sq}\\Rightarrow x=\\pm${n}$ (hai gi\xE1 tr\u1ECB).`
      };
    }
  },
  {
    id: "g9.nb-rut-gon-can",
    topicId: "g9-t2",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110\u01B0a th\u1EEBa s\u1ED1 ra ngo\xE0i d\u1EA5u c\u0103n",
    build: (r) => {
      const k = r.pick([2, 3, 5, 6, 7]);
      const m = r.int(2, 6);
      const n = m * m * k;
      const correct = `$${m}\\s{${k}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${m * k}\\s{${k}}$`, `$${m}\\s{${k * m}}$`, `$${m * m}\\s{${k}}$`]);
      return {
        stem: `R\xFAt g\u1ECDn $\\s{${n}}$ ta \u0111\u01B0\u1EE3c:`,
        options,
        answer,
        thinking: [`T\xE1ch $${n}=${m * m}\\cdot${k}$ v\u1EDBi $${m * m}$ l\xE0 s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng.`],
        solution: [`$\\s{${n}}=\\s{${m * m}\\cdot${k}}=\\s{${m * m}}\\cdot\\s{${k}}=${m}\\s{${k}}$.`]
      };
    }
  },
  {
    id: "g9.nb-delta",
    topicId: "g9-t3",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Bi\u1EC7t th\u1EE9c v\xE0 s\u1ED1 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai",
    build: (r) => {
      const a = r.int(1, 3), b = r.int(-9, 9), c = r.int(-9, 9);
      const D = b * b - 4 * a * c;
      const correct = D > 0 ? "Hai nghi\u1EC7m ph\xE2n bi\u1EC7t" : D === 0 ? "Nghi\u1EC7m k\xE9p" : "V\xF4 nghi\u1EC7m";
      const [options, answer] = mcOptions(r, correct, ["Hai nghi\u1EC7m ph\xE2n bi\u1EC7t", "Nghi\u1EC7m k\xE9p", "V\xF4 nghi\u1EC7m"].filter((x) => x !== correct));
      return {
        stem: `Ph\u01B0\u01A1ng tr\xECnh $${a === 1 ? "" : a}x^{2}${sgn5(b)}x${sgn5(c)}=0$ c\xF3:`,
        options,
        answer,
        thinking: ["T\xEDnh $\\Delta=b^{2}-4ac$ r\u1ED3i k\u1EBFt lu\u1EADn: $\\Delta>0$ hai nghi\u1EC7m, $\\Delta=0$ nghi\u1EC7m k\xE9p, $\\Delta<0$ v\xF4 nghi\u1EC7m."],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot${a}\\cdot(${c})=${b * b}-${4 * a * c}=${D}$.`,
          `$\\Delta${D > 0 ? ">0" : D === 0 ? "=0" : "<0"}$ n\xEAn ph\u01B0\u01A1ng tr\xECnh ${correct.toLowerCase()}.`
        ]
      };
    }
  },
  {
    id: "g9.nb-viete-mc",
    topicId: "g9-t3",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "H\u1EC7 th\u1EE9c Vi\xE8te \u2014 t\u1ED5ng v\xE0 t\xEDch hai nghi\u1EC7m",
    build: (r) => {
      const b = r.int(-10, 10), c = r.int(-15, 8);
      const D = b * b - 4 * c;
      const ask = r.pick(["S", "P"]);
      const v = ask === "S" ? -b : c;
      const [options, answer] = mcOptions(r, `$${v}$`, distractInt(r, v, 3).map((x) => `$${x}$`));
      return {
        stem: `Ph\u01B0\u01A1ng tr\xECnh $x^{2}${sgn5(b)}x${sgn5(c)}=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$ (bi\u1EBFt $\\Delta=${D}>0$). Khi \u0111\xF3 ${ask === "S" ? "$x_1+x_2$" : "$x_1x_2$"} b\u1EB1ng:`,
        options,
        answer,
        thinking: ["H\u1EC7 th\u1EE9c Vi\xE8te: $S=x_1+x_2=-\\f{b}{a}$ v\xE0 $P=x_1x_2=\\f{c}{a}$."],
        solution: [
          `V\u1EDBi $a=1$, $b=${b}$, $c=${c}$:`,
          ask === "S" ? `$S=-\\f{b}{a}=-\\f{${b}}{1}=${-b}$.` : `$P=\\f{c}{a}=\\f{${c}}{1}=${c}$.`
        ],
        pitfall: "Nh\u1EDB d\u1EA5u tr\u1EEB \u1EDF c\xF4ng th\u1EE9c t\u1ED5ng: $S=-\\f{b}{a}$."
      };
    }
  },
  {
    id: "g9.nb-luong-giac",
    topicId: "g9-t5",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\u1EE7a g\xF3c nh\u1ECDn",
    build: (r) => {
      const bank = [
        { q: "Trong tam gi\xE1c vu\xF4ng, $\\sin$ c\u1EE7a m\u1ED9t g\xF3c nh\u1ECDn b\u1EB1ng:", a: "C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh huy\u1EC1n", w: ["C\u1EA1nh k\u1EC1 chia c\u1EA1nh huy\u1EC1n", "C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh k\u1EC1", "C\u1EA1nh huy\u1EC1n chia c\u1EA1nh \u0111\u1ED1i"] },
        { q: "Trong tam gi\xE1c vu\xF4ng, $\\cos$ c\u1EE7a m\u1ED9t g\xF3c nh\u1ECDn b\u1EB1ng:", a: "C\u1EA1nh k\u1EC1 chia c\u1EA1nh huy\u1EC1n", w: ["C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh huy\u1EC1n", "C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh k\u1EC1", "C\u1EA1nh k\u1EC1 chia c\u1EA1nh \u0111\u1ED1i"] },
        { q: "Trong tam gi\xE1c vu\xF4ng, $\\tan$ c\u1EE7a m\u1ED9t g\xF3c nh\u1ECDn b\u1EB1ng:", a: "C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh k\u1EC1", w: ["C\u1EA1nh k\u1EC1 chia c\u1EA1nh \u0111\u1ED1i", "C\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh huy\u1EC1n", "C\u1EA1nh k\u1EC1 chia c\u1EA1nh huy\u1EC1n"] },
        { q: "V\u1EDBi $\\alpha$ l\xE0 g\xF3c nh\u1ECDn, $\\sin^{2}\\alpha+\\cos^{2}\\alpha$ b\u1EB1ng:", a: "$1$", w: ["$0$", "$2$", "$\\tan\\alpha$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["M\u1EB9o nh\u1EDB: \u201CSin \u0111i h\u1ECDc \u2013 Cos kh\xF4ng h\u01B0 \u2013 Tang \u0111o\xE0n k\u1EBFt \u2013 Cotang k\u1EBFt \u0111o\xE0n\u201D."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`]
      };
    }
  },
  {
    id: "g9.nb-duong-tron-nb",
    topicId: "g9-t6",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\xEDnh ch\u1EA5t c\u01A1 b\u1EA3n c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n",
    build: (r) => {
      const bank = [
        { q: "G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n c\xF3 s\u1ED1 \u0111o b\u1EB1ng:", a: "$90\\deg$", w: ["$45\\deg$", "$180\\deg$", "$60\\deg$"] },
        { q: "Ti\u1EBFp tuy\u1EBFn c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n th\xEC:", a: "Vu\xF4ng g\xF3c v\u1EDBi b\xE1n k\xEDnh t\u1EA1i ti\u1EBFp \u0111i\u1EC3m", w: ["Song song v\u1EDBi b\xE1n k\xEDnh", "\u0110i qua t\xE2m", "B\u1EB1ng \u0111\u01B0\u1EDDng k\xEDnh"] },
        { q: "G\xF3c \u1EDF t\xE2m c\xF3 s\u1ED1 \u0111o b\u1EB1ng:", a: "S\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", w: ["N\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", "Hai l\u1EA7n s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", "$90\\deg$"] },
        { q: "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp c\xF3 t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng:", a: "$180\\deg$", w: ["$90\\deg$", "$360\\deg$", "$270\\deg$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["\u0110\xE2y l\xE0 nh\xF3m t\xEDnh ch\u1EA5t n\u1EC1n t\u1EA3ng, xu\u1EA5t hi\u1EC7n trong h\u1EA7u h\u1EBFt c\xE2u h\xECnh thi v\xE0o 10."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`]
      };
    }
  },
  {
    id: "g9.nb-hinh-khoi",
    topicId: "g9-t7",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "C\xF4ng th\u1EE9c h\xECnh tr\u1EE5, h\xECnh n\xF3n, h\xECnh c\u1EA7u",
    build: (r) => {
      const bank = [
        { q: "Th\u1EC3 t\xEDch h\xECnh tr\u1EE5 b\xE1n k\xEDnh \u0111\xE1y $r$, chi\u1EC1u cao $h$ l\xE0:", a: "$V=\\pi r^{2}h$", w: ["$V=\\f{1}{3}\\pi r^{2}h$", "$V=2\\pi rh$", "$V=\\f{4}{3}\\pi r^{3}$"] },
        { q: "Th\u1EC3 t\xEDch h\xECnh n\xF3n b\xE1n k\xEDnh \u0111\xE1y $r$, chi\u1EC1u cao $h$ l\xE0:", a: "$V=\\f{1}{3}\\pi r^{2}h$", w: ["$V=\\pi r^{2}h$", "$V=\\pi rl$", "$V=\\f{4}{3}\\pi r^{3}$"] },
        { q: "Th\u1EC3 t\xEDch h\xECnh c\u1EA7u b\xE1n k\xEDnh $R$ l\xE0:", a: "$V=\\f{4}{3}\\pi R^{3}$", w: ["$V=4\\pi R^{2}$", "$V=\\f{1}{3}\\pi R^{3}$", "$V=\\pi R^{3}$"] },
        { q: "Di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u b\xE1n k\xEDnh $R$ l\xE0:", a: "$S=4\\pi R^{2}$", w: ["$S=\\f{4}{3}\\pi R^{3}$", "$S=2\\pi R^{2}$", "$S=\\pi R^{2}$"] },
        { q: "Di\u1EC7n t\xEDch xung quanh h\xECnh n\xF3n b\xE1n k\xEDnh \u0111\xE1y $r$, \u0111\u01B0\u1EDDng sinh $l$ l\xE0:", a: "$S_{xq}=\\pi rl$", w: ["$S_{xq}=2\\pi rl$", "$S_{xq}=\\pi r^{2}$", "$S_{xq}=\\pi rh$"] }
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options,
        answer,
        thinking: ["Nh\u1EDB h\u1EC7 s\u1ED1 $\\f{1}{3}$ c\u1EE7a h\xECnh n\xF3n v\xE0 $\\f{4}{3}$ c\u1EE7a h\xECnh c\u1EA7u."],
        solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`]
      };
    }
  },
  /* ============================ THÔNG HIỂU ============================ */
  {
    id: "g9.th-lien-hop",
    topicId: "g9-t2",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu",
    build: (r) => {
      const a = r.pick([2, 3, 5, 6, 7, 10]);
      const b = r.int(1, 4);
      const den = a - b * b;
      if (den === 0) return {
        stem: "Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu: $\\f{1}{\\s{5}-2}$ (nh\u1EADp k\u1EBFt qu\u1EA3 r\xFAt g\u1ECDn).",
        answer: "sqrt5+2",
        accept: ["\u221A5+2", "\\s{5}+2"],
        solution: ["Nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p $\\s{5}+2$.", "$\\f{1}{\\s{5}-2}=\\f{\\s{5}+2}{5-4}=\\s{5}+2$."]
      };
      return {
        stem: `Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu c\u1EE7a $\\f{1}{\\s{${a}}-${b}}$. Sau khi tr\u1EE5c c\u0103n, **m\u1EABu s\u1ED1** c\u1EE7a bi\u1EC3u th\u1EE9c b\u1EB1ng bao nhi\xEAu?`,
        answer: String(den),
        thinking: [
          `Nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi bi\u1EC3u th\u1EE9c **li\xEAn h\u1EE3p** $\\s{${a}}+${b}$.`,
          "M\u1EABu tr\u1EDF th\xE0nh hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng n\xEAn h\u1EBFt c\u0103n."
        ],
        solution: [
          `$\\f{1}{\\s{${a}}-${b}}=\\f{\\s{${a}}+${b}}{(\\s{${a}}-${b})(\\s{${a}}+${b})}=\\f{\\s{${a}}+${b}}{${a}-${b * b}}=\\f{\\s{${a}}+${b}}{${den}}$.`,
          `V\u1EADy m\u1EABu s\u1ED1 b\u1EB1ng $${den}$.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i d\u1EA5u trong bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p."
      };
    }
  },
  {
    id: "g9.th-nham-nghiem",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Nh\u1EA9m nghi\u1EC7m ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai",
    build: (r) => {
      const a = r.int(1, 5), c = r.int(1, 12);
      const useOne = r.bool();
      const b = useOne ? -(a + c) : a + c;
      const roots = useOne ? [1, c / a] : [-1, -c / a];
      const rs = roots.map((x) => Number.isInteger(x) ? String(x) : `\\f{${useOne ? c : -c}}{${a}}`);
      const correct = `$x_1=${rs[0]}$; $x_2=${rs[1]}$`;
      const [options, answer] = mcOptions(r, correct, [
        `$x_1=${useOne ? "-1" : "1"}$; $x_2=${rs[1]}$`,
        `$x_1=${rs[0]}$; $x_2=${a}$`,
        "Ph\u01B0\u01A1ng tr\xECnh v\xF4 nghi\u1EC7m"
      ]);
      return {
        stem: `Nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh $${a === 1 ? "" : a}x^{2}${sgn5(b)}x${sgn5(c)}=0$ l\xE0:`,
        options,
        answer,
        thinking: [
          useOne ? `Ki\u1EC3m tra $a+b+c=${a}${sgn5(b)}${sgn5(c)}=0$ \u2192 nh\u1EA9m ngay $x_1=1$, $x_2=\\f{c}{a}$.` : `Ki\u1EC3m tra $a-b+c=${a}${sgn5(-b)}${sgn5(c)}=0$ \u2192 nh\u1EA9m ngay $x_1=-1$, $x_2=-\\f{c}{a}$.`
        ],
        solution: [
          useOne ? `V\xEC $a+b+c=${a}+(${b})+${c}=0$ n\xEAn $x_1=1$ v\xE0 $x_2=\\f{c}{a}=\\f{${c}}{${a}}$.` : `V\xEC $a-b+c=${a}-(${b})+${c}=0$ n\xEAn $x_1=-1$ v\xE0 $x_2=-\\f{c}{a}=-\\f{${c}}{${a}}$.`
        ],
        pitfall: "Nh\u1EA9m nghi\u1EC7m ti\u1EBFt ki\u1EC7m r\u1EA5t nhi\u1EC1u th\u1EDDi gian \u2014 lu\xF4n th\u1EED t\u1ED5ng h\u1EC7 s\u1ED1 tr\u01B0\u1EDBc khi t\xEDnh $\\Delta$."
      };
    }
  },
  {
    id: "g9.th-tuong-giao",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u01B0\u01A1ng giao parabol v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng",
    build: (r) => {
      const a = r.pick([1, 2, -1, -2]);
      const x1 = r.int(-4, 4), x2 = r.int(-4, 4);
      if (x1 === x2) return {
        stem: "T\xECm ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a $(P): y=x^{2}$ v\xE0 $(d): y=2x+3$. (Nh\u1EADp c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)",
        answer: "-1,3",
        accept: ["3,-1"],
        thinking: ["Ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m l\xE0 nghi\u1EC7m c\u1EE7a **ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m**: cho hai v\u1EBF b\u1EB1ng nhau."],
        solution: ["$x^{2}=2x+3\\Leftrightarrow x^{2}-2x-3=0$.", "$\\Delta'=1+3=4>0$, nghi\u1EC7m $x=-1$ v\xE0 $x=3$."]
      };
      const m = a * (x1 + x2), n = -a * x1 * x2;
      const roots = [x1, x2].sort((p, q) => p - q);
      return {
        stem: `T\xECm ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a parabol $(P): y=${a === 1 ? "" : a === -1 ? "-" : a}x^{2}$ v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng $(d): y=${m}x${sgn5(n)}$. (Nh\u1EADp c\xE1c gi\xE1 tr\u1ECB c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y.)`,
        answer: roots.join(","),
        accept: [roots.slice().reverse().join(",")],
        thinking: [
          "Ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m l\xE0 nghi\u1EC7m c\u1EE7a **ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m**: cho hai v\u1EBF b\u1EB1ng nhau."
        ],
        solution: [
          `Ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m: $${a === 1 ? "" : a === -1 ? "-" : a}x^{2}=${m}x${sgn5(n)}$.`,
          `$\\Leftrightarrow ${a === 1 ? "" : a === -1 ? "-" : a}x^{2}-${m}x${sgn5(-n)}=0$.`,
          `Gi\u1EA3i ra \u0111\u01B0\u1EE3c $x_1=${roots[0]}$, $x_2=${roots[1]}$.`
        ]
      };
    }
  },
  {
    id: "g9.th-he-thuc-luong-2",
    topicId: "g9-t5",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "H\u1EC7 th\u1EE9c l\u01B0\u1EE3ng \u2014 t\xEDnh c\u1EA1nh g\xF3c vu\xF4ng",
    build: (r) => {
      const bh = r.pick([1, 4, 9, 16, 2, 3]);
      const ch = r.pick([4, 9, 16, 25, 12]);
      const bc = bh + ch;
      const ab2 = bh * bc;
      const correct = `$\\s{${ab2}}$`;
      const [options, answer] = mcOptions(r, correct, [`$\\s{${ch * bc}}$`, `$\\s{${bh * ch}}$`, `$${bh + ch}$`]);
      return {
        stem: `Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$. Bi\u1EBFt $BH=${bh}$, $CH=${ch}$. \u0110\u1ED9 d\xE0i $AB$ b\u1EB1ng:`,
        options,
        answer,
        thinking: ["H\u1EC7 th\u1EE9c $c^{2}=ac'$: b\xECnh ph\u01B0\u01A1ng c\u1EA1nh g\xF3c vu\xF4ng b\u1EB1ng c\u1EA1nh huy\u1EC1n nh\xE2n h\xECnh chi\u1EBFu c\u1EE7a n\xF3."],
        solution: [
          `$BC=BH+CH=${bh}+${ch}=${bc}$.`,
          `$AB^{2}=BH\\cdot BC=${bh}\\cdot${bc}=${ab2}$, suy ra $AB=\\s{${ab2}}${Number.isInteger(Math.sqrt(ab2)) ? `=${Math.sqrt(ab2)}` : `=${simplifySqrt(ab2)}`}$.`
        ],
        pitfall: "Nh\u1EA7m h\xECnh chi\u1EBFu c\u1EE7a c\u1EA1nh n\xE0y v\u1EDBi c\u1EA1nh kia."
      };
    }
  },
  {
    id: "g9.th-tf-can",
    topicId: "g9-t2",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 c\u0103n th\u1EE9c b\u1EADc hai",
    build: (r) => {
      const a = r.int(2, 9);
      return {
        stem: "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh sau:",
        options: [
          `$\\s{(-${a})^{2}}=${a}$`,
          `$\\s{A^{2}}=A$ v\u1EDBi m\u1ECDi s\u1ED1 th\u1EF1c $A$`,
          `$\\s{${a}}\\cdot\\s{${a}}=${a}$`,
          `$\\s{x-${a}}$ x\xE1c \u0111\u1ECBnh khi $x\\ge${a}$`
        ],
        answer: [true, false, true, true],
        thinking: ["Nh\u1EDB $\\s{A^{2}}=\\abs{A}$, kh\xF4ng ph\u1EA3i $A$."],
        solution: [
          `a) \u0110\xFAng: $\\s{(-${a})^{2}}=\\s{${a * a}}=${a}=\\abs{-${a}}$.`,
          "b) Sai: \u0111\xFAng ph\u1EA3i l\xE0 $\\s{A^{2}}=\\abs{A}$; n\u1EBFu $A<0$ th\xEC $\\s{A^{2}}=-A\\ne A$.",
          `c) \u0110\xFAng: $\\s{${a}}\\cdot\\s{${a}}=(\\s{${a}})^{2}=${a}$.`,
          `d) \u0110\xFAng: c\u0103n c\xF3 ngh\u0129a khi bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n kh\xF4ng \xE2m.`
        ]
      };
    }
  },
  {
    id: "g9.th-tf-viete",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai v\xE0 Vi\xE8te",
    build: (r) => {
      void r;
      return {
        stem: "Cho ph\u01B0\u01A1ng tr\xECnh $ax^{2}+bx+c=0$ ($a\\ne0$) c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. X\xE9t t\xEDnh \u0111\xFAng \u2013 sai:",
        options: [
          "$x_1+x_2=-\\f{b}{a}$",
          "$x_1x_2=-\\f{c}{a}$",
          "$x_1^{2}+x_2^{2}=S^{2}-2P$ v\u1EDBi $S=x_1+x_2$, $P=x_1x_2$",
          "Hai nghi\u1EC7m tr\xE1i d\u1EA5u khi v\xE0 ch\u1EC9 khi $P<0$"
        ],
        answer: [true, false, true, true],
        thinking: ["Ki\u1EC3m tra k\u1EF9 d\u1EA5u trong hai c\xF4ng th\u1EE9c Vi\xE8te \u2014 \u0111\xE2y l\xE0 ch\u1ED7 nh\u1EA7m ph\u1ED5 bi\u1EBFn."],
        solution: [
          "a) \u0110\xFAng \u2014 c\xF4ng th\u1EE9c t\u1ED5ng c\xF3 d\u1EA5u tr\u1EEB.",
          "b) Sai \u2014 t\xEDch l\xE0 $x_1x_2=\\f{c}{a}$, **kh\xF4ng** c\xF3 d\u1EA5u tr\u1EEB.",
          "c) \u0110\xFAng \u2014 $x_1^{2}+x_2^{2}=(x_1+x_2)^{2}-2x_1x_2$.",
          "d) \u0110\xFAng \u2014 khi $P<0$ th\xEC $\\Delta=b^{2}-4ac>0$ t\u1EF1 \u0111\u1ED9ng, v\xE0 hai nghi\u1EC7m tr\xE1i d\u1EA5u."
        ]
      };
    }
  },
  /* ============================ VẬN DỤNG ============================ */
  {
    id: "g9.vd-viete-hieu",
    topicId: "g9-t3",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng n\xE2ng cao c\u1EE7a hai nghi\u1EC7m",
    build: (r) => {
      const b = r.int(-10, 10), c = r.int(-20, 5);
      const D = b * b - 4 * c;
      if (D <= 0) return {
        stem: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-5x+2=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=(x_1-x_2)^{2}$.",
        answer: "17",
        thinking: ["$(x_1-x_2)^{2}=(x_1+x_2)^{2}-4x_1x_2=S^{2}-4P$ \u2014 \u0111\u01B0a v\u1EC1 $S$, $P$ r\u1ED3i d\xF9ng Vi\xE8te."],
        solution: ["$S=5$; $P=2$.", "$(x_1-x_2)^{2}=S^{2}-4P=25-8=17$."]
      };
      const S = -b, P = c;
      const which = r.pick(["diff", "cube", "inv"]);
      const val = which === "diff" ? S * S - 4 * P : which === "cube" ? S * S * S - 3 * P * S : null;
      if (which === "inv" && P === 0) {
        return {
          stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}${sgn5(b)}x${sgn5(c)}=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=(x_1-x_2)^{2}$.`,
          answer: String(S * S - 4 * P),
          thinking: ["$(x_1-x_2)^{2}=S^{2}-4P$ \u2014 bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng n\xEAn quy v\u1EC1 $S$, $P$."],
          solution: [`$S=${S}$; $P=${P}$.`, `$(x_1-x_2)^{2}=S^{2}-4P=${S * S}-${4 * P}=${S * S - 4 * P}$.`]
        };
      }
      if (which === "inv") {
        const [n, d] = reduce(S, P);
        return {
          stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}${sgn5(b)}x${sgn5(c)}=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=\\f{1}{x_1}+\\f{1}{x_2}$ (nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n).`,
          answer: d === 1 ? String(n) : `${n}/${d}`,
          thinking: ["Quy \u0111\u1ED3ng: $\\f{1}{x_1}+\\f{1}{x_2}=\\f{x_1+x_2}{x_1x_2}=\\f{S}{P}$."],
          solution: [
            `$\\Delta=${D}>0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.`,
            `Vi\xE8te: $S=${S}$ ; $P=${P}$.`,
            `$A=\\f{S}{P}=\\f{${S}}{${P}}=\\f{${n}}{${d}}$.`
          ]
        };
      }
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}${sgn5(b)}x${sgn5(c)}=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$. T\xEDnh $A=${which === "diff" ? "(x_1-x_2)^{2}" : "x_1^{3}+x_2^{3}"}$.`,
        answer: String(val),
        thinking: [
          "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u2192 bi\u1EC3u di\u1EC5n qua $S$ v\xE0 $P$, kh\xF4ng c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.",
          which === "diff" ? "$(x_1-x_2)^{2}=S^{2}-4P$." : "$x_1^{3}+x_2^{3}=S^{3}-3PS$."
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot1\\cdot(${c})=${D}>0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.`,
          `Theo Vi\xE8te: $S=${S}$ ; $P=${P}$.`,
          which === "diff" ? `$A=S^{2}-4P=${S * S}-${4 * P}=${val}$.` : `$A=S^{3}-3PS=${S ** 3}-3\\cdot${P}\\cdot${S}=${val}$.`
        ],
        pitfall: "Nh\u1EDB ph\xE2n bi\u1EC7t $S^{2}-2P$ (t\u1ED5ng b\xECnh ph\u01B0\u01A1ng) v\u1EDBi $S^{2}-4P$ (b\xECnh ph\u01B0\u01A1ng hi\u1EC7u)."
      };
    }
  },
  {
    id: "g9.vd-lap-he-chuyen-dong",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh \u2014 chuy\u1EC3n \u0111\u1ED9ng",
    build: (r) => {
      const v = r.pick([10, 12, 15, 18, 20]);
      const w = r.pick([2, 3, 4, 5]);
      const s = (v + w) * (v - w) * r.int(1, 2);
      const tx = s / (v + w), tn = s / (v - w);
      return {
        stem: `M\u1ED9t ca n\xF4 \u0111i xu\xF4i d\xF2ng qu\xE3ng s\xF4ng d\xE0i $${s}\\,km$ h\u1EBFt $${Math.round(tx * 100) / 100}$ gi\u1EDD v\xE0 \u0111i ng\u01B0\u1EE3c d\xF2ng ch\xEDnh qu\xE3ng s\xF4ng \u0111\xF3 h\u1EBFt $${Math.round(tn * 100) / 100}$ gi\u1EDD. T\xEDnh v\u1EADn t\u1ED1c th\u1EF1c c\u1EE7a ca n\xF4 (km/h).`,
        answer: String(v),
        thinking: [
          "V\u1EADn t\u1ED1c xu\xF4i d\xF2ng $=v+w$; v\u1EADn t\u1ED1c ng\u01B0\u1EE3c d\xF2ng $=v-w$ (v\u1EDBi $w$ l\xE0 v\u1EADn t\u1ED1c d\xF2ng n\u01B0\u1EDBc).",
          "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt \u2192 l\u1EADp h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh."
        ],
        solution: [
          `G\u1ECDi v\u1EADn t\u1ED1c th\u1EF1c c\u1EE7a ca n\xF4 l\xE0 $x$ (km/h) v\xE0 v\u1EADn t\u1ED1c d\xF2ng n\u01B0\u1EDBc l\xE0 $y$ (km/h), $x>y>0$.`,
          `Xu\xF4i d\xF2ng: $(x+y)\\cdot${Math.round(tx * 100) / 100}=${s}\\Rightarrow x+y=${v + w}$.`,
          `Ng\u01B0\u1EE3c d\xF2ng: $(x-y)\\cdot${Math.round(tn * 100) / 100}=${s}\\Rightarrow x-y=${v - w}$.`,
          `C\u1ED9ng hai ph\u01B0\u01A1ng tr\xECnh: $2x=${2 * v}\\Rightarrow x=${v}$; suy ra $y=${w}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`,
          `V\u1EADy v\u1EADn t\u1ED1c th\u1EF1c c\u1EE7a ca n\xF4 l\xE0 **${v} km/h**.`
        ]
      };
    }
  },
  {
    id: "g9.vd-tu-giac-noi-tiep-goc",
    topicId: "g9-t6",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "T\xEDnh g\xF3c trong t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
    build: (r) => {
      const A = r.int(50, 130);
      const B = r.int(50, 130);
      return {
        stem: `T\u1EE9 gi\xE1c $ABCD$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O)$, bi\u1EBFt $\\angle A=${A}\\deg$ v\xE0 $\\angle B=${B}\\deg$. T\xEDnh $\\angle C+\\angle D$ (nh\u1EADp theo \u0111\u1ED9).`,
        answer: String(360 - A - B),
        thinking: [
          "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp: t\u1ED5ng hai g\xF3c **\u0111\u1ED1i** b\u1EB1ng $180\\deg$, n\xEAn $\\angle A+\\angle C=180\\deg$ v\xE0 $\\angle B+\\angle D=180\\deg$."
        ],
        solution: [
          `$\\angle C=180\\deg-\\angle A=180\\deg-${A}\\deg=${180 - A}\\deg$.`,
          `$\\angle D=180\\deg-\\angle B=180\\deg-${B}\\deg=${180 - B}\\deg$.`,
          `$\\angle C+\\angle D=${180 - A}\\deg+${180 - B}\\deg=${360 - A - B}\\deg$.`,
          `(Ki\u1EC3m tra: t\u1ED5ng b\u1ED1n g\xF3c c\u1EE7a t\u1EE9 gi\xE1c b\u1EB1ng $360\\deg$ \u2713)`
        ]
      };
    }
  },
  {
    id: "g9.vd-hinh-tru-thuc-te",
    topicId: "g9-t7",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "B\xE0i to\xE1n th\u1EF1c t\u1EBF h\xECnh tr\u1EE5",
    build: (r) => {
      const rad = r.pick([5, 10, 20, 25, 30]);
      const h = r.pick([20, 30, 40, 50, 60]);
      const V = Math.PI * rad * rad * h;
      const liters = V / 1e3;
      return {
        stem: `M\u1ED9t th\xF9ng ch\u1EE9a n\u01B0\u1EDBc d\u1EA1ng h\xECnh tr\u1EE5 c\xF3 b\xE1n k\xEDnh \u0111\xE1y $${rad}\\,cm$ v\xE0 chi\u1EC1u cao $${h}\\,cm$. T\xEDnh th\u1EC3 t\xEDch th\xF9ng theo l\xEDt (l\u1EA5y $\\pi\\approx3{,}14$, l\xE0m tr\xF2n 2 ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n).`,
        answer: String(Math.round(3.14 * rad * rad * h / 1e3 * 100) / 100),
        accept: [String(Math.round(liters * 100) / 100)],
        thinking: [
          "$V=\\pi r^{2}h$; sau \u0111\xF3 \u0111\u1ED5i $1000\\,cm^{3}=1$ l\xEDt."
        ],
        solution: [
          `$V=\\pi r^{2}h\\approx3{,}14\\cdot${rad}^{2}\\cdot${h}=3{,}14\\cdot${rad * rad}\\cdot${h}\\approx${Math.round(3.14 * rad * rad * h * 100) / 100}\\ (cm^{3})$.`,
          `\u0110\u1ED5i ra l\xEDt: $${Math.round(3.14 * rad * rad * h * 100) / 100}:1000\\approx${Math.round(3.14 * rad * rad * h / 1e3 * 100) / 100}$ l\xEDt.`
        ],
        pitfall: "Qu\xEAn \u0111\u1ED5i \u0111\u01A1n v\u1ECB $cm^{3}$ sang l\xEDt."
      };
    }
  },
  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: "g9.vdc-can-cuc-tri",
    topicId: "g9-t2",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "C\u1EF1c tr\u1ECB bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n (C\xF4-si)",
    build: (r) => {
      const k = r.pick([1, 4, 9, 16, 25]);
      const s = Math.sqrt(k);
      return {
        stem: `Cho $x>0$. T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $A=x+\\f{${k}}{x}$.`,
        answer: String(2 * s),
        thinking: [
          "Hai h\u1EA1ng t\u1EED d\u01B0\u01A1ng c\xF3 t\xEDch l\xE0 h\u1EB1ng s\u1ED1 $x\\cdot\\f{${k}}{x}=${k}$ \u2192 d\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si.",
          "C\xF4-si cho hai s\u1ED1 d\u01B0\u01A1ng: $a+b\\ge2\\s{ab}$, d\u1EA5u b\u1EB1ng khi $a=b$."
        ],
        solution: [
          `V\xEC $x>0$ n\xEAn $\\f{${k}}{x}>0$. \xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si:`,
          `$A=x+\\f{${k}}{x}\\ge2\\s{x\\cdot\\f{${k}}{x}}=2\\s{${k}}=${2 * s}$.`,
          `D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x=\\f{${k}}{x}\\Leftrightarrow x^{2}=${k}\\Leftrightarrow x=${s}$ (v\xEC $x>0$).`,
          `V\u1EADy $A_{\\min}=${2 * s}$ khi $x=${s}$.`
        ],
        pitfall: "Ph\u1EA3i n\xEAu \u0111i\u1EC1u ki\u1EC7n $x>0$ tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng C\xF4-si."
      };
    }
  },
  {
    id: "g9.vdc-viete-dieu-kien",
    topicId: "g9-t3",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm tham s\u1ED1 theo \u0111i\u1EC1u ki\u1EC7n v\u1EC1 nghi\u1EC7m",
    build: (r) => {
      const m = r.int(2, 9);
      const target = 2 * m * m + 2;
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2mx+m^{2}-1=0$ ($m$ l\xE0 tham s\u1ED1). T\xECm gi\xE1 tr\u1ECB d\u01B0\u01A1ng c\u1EE7a $m$ \u0111\u1EC3 hai nghi\u1EC7m $x_1$, $x_2$ tho\u1EA3 m\xE3n $x_1^{2}+x_2^{2}=${target}$.`,
        answer: String(m),
        thinking: [
          "B\u01B0\u1EDBc 1: ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n c\xF3 nghi\u1EC7m b\u1EB1ng $\\Delta'$.",
          "B\u01B0\u1EDBc 2: vi\u1EBFt Vi\xE8te.",
          "B\u01B0\u1EDBc 3: \u0111\u01B0a h\u1EC7 th\u1EE9c \u0111\u1EC1 cho v\u1EC1 $S$, $P$ r\u1ED3i gi\u1EA3i theo $m$, cu\u1ED1i c\xF9ng \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."
        ],
        solution: [
          `$\\Delta'=m^{2}-(m^{2}-1)=1>0$ v\u1EDBi m\u1ECDi $m$, n\xEAn ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.`,
          `Theo Vi\xE8te: $S=x_1+x_2=2m$ ; $P=x_1x_2=m^{2}-1$.`,
          `$x_1^{2}+x_2^{2}=S^{2}-2P=4m^{2}-2(m^{2}-1)=2m^{2}+2$.`,
          `Theo \u0111\u1EC1: $2m^{2}+2=${target}\\Rightarrow m^{2}=${m * m}\\Rightarrow m=\\pm${m}$.`,
          `L\u1EA5y gi\xE1 tr\u1ECB d\u01B0\u01A1ng: $m=${m}$.`
        ],
        pitfall: "Qu\xEAn b\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n l\xE0 n\u01A1i ph\xE2n lo\u1EA1i h\u1ECDc sinh 8 \u0111i\u1EC3m v\xE0 9+ \u0111i\u1EC3m."
      };
    }
  },
  {
    id: "g9.vdc-hinh-hoc-tinh",
    topicId: "g9-t6",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Ph\u01B0\u01A1ng t\xEDch \u2014 h\u1EC7 th\u1EE9c trong \u0111\u01B0\u1EDDng tr\xF2n",
    build: (r) => {
      const mt = r.pick([6, 8, 10, 12, 15]);
      const mc = r.pick([2, 3, 4, 5, 6]);
      const md = mt * mt / mc;
      if (!Number.isInteger(md)) {
        return {
          stem: "T\u1EEB \u0111i\u1EC3m $M$ ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n $(O)$ k\u1EBB ti\u1EBFp tuy\u1EBFn $MT$ v\xE0 c\xE1t tuy\u1EBFn $MCD$. Bi\u1EBFt $MT=6$, $MC=4$. T\xEDnh $MD$.",
          answer: "9",
          thinking: ["Ti\u1EBFp tuy\u1EBFn + c\xE1t tuy\u1EBFn t\u1EEB m\u1ED9t \u0111i\u1EC3m \u2192 ngh\u0129 ngay t\u1EDBi h\u1EC7 th\u1EE9c $MT^{2}=MC\\cdot MD$."],
          solution: ["$MT^{2}=MC\\cdot MD$ (ph\u01B0\u01A1ng t\xEDch).", "$36=4\\cdot MD\\Rightarrow MD=9$."]
        };
      }
      return {
        stem: `T\u1EEB \u0111i\u1EC3m $M$ n\u1EB1m ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n $(O)$, k\u1EBB ti\u1EBFp tuy\u1EBFn $MT$ ($T$ l\xE0 ti\u1EBFp \u0111i\u1EC3m) v\xE0 c\xE1t tuy\u1EBFn $MCD$ ($C$ n\u1EB1m gi\u1EEFa $M$ v\xE0 $D$). Bi\u1EBFt $MT=${mt}$ v\xE0 $MC=${mc}$. T\xEDnh $MD$.`,
        answer: String(md),
        thinking: [
          "H\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch: $MT^{2}=MC\\cdot MD$.",
          "Ngu\u1ED3n g\u1ED1c: $\\tri MTC\\sim\\tri MDT$ (g\xF3c $M$ chung, g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp)."
        ],
        solution: [
          `X\xE9t $\\tri MTC$ v\xE0 $\\tri MDT$: $\\angle M$ chung; $\\angle MTC=\\angle MDT$ (g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung $TC$).`,
          `Do \u0111\xF3 $\\tri MTC\\sim\\tri MDT$ (g.g), suy ra $\\f{MT}{MD}=\\f{MC}{MT}$, t\u1EE9c $MT^{2}=MC\\cdot MD$.`,
          `$${mt}^{2}=${mc}\\cdot MD\\Rightarrow MD=\\f{${mt * mt}}{${mc}}=${md}$.`
        ]
      };
    }
  },
  /* ============================= TỰ LUẬN ============================= */
  {
    id: "g9.tl-rut-gon-can",
    topicId: "g9-t2",
    grade: 9,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 r\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n (c\xE2u 1 thi v\xE0o 10)",
    build: (r) => {
      const a = r.int(2, 6);
      const a2 = a * a;
      const x0 = r.pick([0, 1, 4, 9, 16, 25]).valueOf();
      const xv = x0 === a2 ? x0 + 1 : x0;
      return {
        stem: `Cho bi\u1EC3u th\u1EE9c $P=\\f{1}{\\s{x}-${a}}-\\f{1}{\\s{x}+${a}}$ v\u1EDBi $x\\ge0$, $x\\ne${a2}$.

a) R\xFAt g\u1ECDn $P$.

b) T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $P$ khi $x=${xv}$.

c) T\xECm $x$ \u0111\u1EC3 $P>0$.`,
        answer: "",
        rubric: [
          { criterion: `C\xE2u a: x\xE1c \u0111\u1ECBnh \u0111\xFAng m\u1EABu chung $(\\s{x}-${a})(\\s{x}+${a})=x-${a2}$`, points: 1 },
          { criterion: `C\xE2u a: quy \u0111\u1ED3ng, thu g\u1ECDn t\u1EED \u0111\xFAng d\u1EA5u v\xE0 k\u1EBFt lu\u1EADn $P=\\f{${2 * a}}{x-${a2}}$`, points: 1 },
          { criterion: `C\xE2u b: thay s\u1ED1 v\xE0 t\xEDnh \u0111\xFAng gi\xE1 tr\u1ECB`, points: 1 },
          { criterion: `C\xE2u c: l\u1EADp lu\u1EADn t\u1EED d\u01B0\u01A1ng n\xEAn $P>0\\Leftrightarrow x-${a2}>0$`, points: 0.5 },
          { criterion: `C\xE2u c: k\u1EBFt lu\u1EADn $x>${a2}$, k\u1EBFt h\u1EE3p \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh`, points: 0.5 }
        ],
        thinking: [
          "Quy tr\xECnh 5 b\u01B0\u1EDBc: \u0111i\u1EC1u ki\u1EC7n \u2192 \u0111\u1EB7t $t=\\s{x}$ \u2192 ph\xE2n t\xEDch m\u1EABu \u2192 quy \u0111\u1ED3ng \u2192 thu g\u1ECDn.",
          "C\xE2u c: t\u1EED l\xE0 h\u1EB1ng s\u1ED1 d\u01B0\u01A1ng n\xEAn d\u1EA5u c\u1EE7a $P$ ch\u1EC9 ph\u1EE5 thu\u1ED9c d\u1EA5u c\u1EE7a m\u1EABu."
        ],
        solution: [
          `a) M\u1EABu th\u1EE9c chung: $(\\s{x}-${a})(\\s{x}+${a})=x-${a2}$.`,
          `$P=\\f{(\\s{x}+${a})-(\\s{x}-${a})}{x-${a2}}=\\f{${2 * a}}{x-${a2}}$.`,
          `b) T\u1EA1i $x=${xv}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n): $P=\\f{${2 * a}}{${xv}-${a2}}=\\f{${2 * a}}{${xv - a2}}$.`,
          `c) V\xEC t\u1EED $${2 * a}>0$ n\xEAn $P>0\\Leftrightarrow x-${a2}>0\\Leftrightarrow x>${a2}$.`,
          `K\u1EBFt h\u1EE3p \u0111i\u1EC1u ki\u1EC7n $x\\ge0$, $x\\ne${a2}$: \u0111\xE1p s\u1ED1 $x>${a2}$.`
        ]
      };
    }
  },
  {
    id: "g9.tl-lap-he",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh",
    build: (r) => {
      const x = r.int(20, 60), y = r.int(15, 50);
      const t1 = r.int(2, 5), t2 = r.int(2, 5);
      const s1 = t1 * x + t2 * y;
      const s2 = t2 * x + t1 * y;
      if (t1 === t2) {
        return {
          stem: "Hai x\u01B0\u1EDFng may c\xF9ng s\u1EA3n xu\u1EA5t. Trong 3 ng\xE0y x\u01B0\u1EDFng I may \u0111\u01B0\u1EE3c 90 \xE1o, x\u01B0\u1EDFng II may \u0111\u01B0\u1EE3c 60 \xE1o. H\u1ECFi m\u1ED7i ng\xE0y m\u1ED7i x\u01B0\u1EDFng may \u0111\u01B0\u1EE3c bao nhi\xEAu \xE1o?",
          answer: "",
          rubric: [
            { criterion: "G\u1ECDi \u1EA9n c\xF3 \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n", points: 1 },
            { criterion: "L\u1EADp \u0111\xFAng ph\u01B0\u01A1ng tr\xECnh", points: 1 },
            { criterion: "Gi\u1EA3i \u0111\xFAng", points: 1 },
            { criterion: "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n v\xE0 k\u1EBFt lu\u1EADn", points: 1 }
          ],
          thinking: ["N\u0103ng su\u1EA5t m\u1ED7i ng\xE0y = t\u1ED5ng s\u1EA3n ph\u1EA9m : s\u1ED1 ng\xE0y \u2014 b\xE0i to\xE1n quy v\u1EC1 hai ph\xE9p chia \u0111\u1ED9c l\u1EADp."],
          solution: ["X\u01B0\u1EDFng I: $90:3=30$ \xE1o/ng\xE0y. X\u01B0\u1EDFng II: $60:3=20$ \xE1o/ng\xE0y."]
        };
      }
      return {
        stem: `Hai t\u1ED5 s\u1EA3n xu\u1EA5t c\u1EE7a m\u1ED9t x\u01B0\u1EDFng may c\xF9ng may kh\u1EA9u trang, m\u1ED7i t\u1ED5 c\xF3 n\u0103ng su\u1EA5t kh\xF4ng \u0111\u1ED5i trong m\u1ED7i ng\xE0y.

Bi\u1EBFt r\u1EB1ng n\u1EBFu t\u1ED5 I l\xE0m trong $${t1}$ ng\xE0y v\xE0 t\u1ED5 II l\xE0m trong $${t2}$ ng\xE0y th\xEC c\u1EA3 hai t\u1ED5 may \u0111\u01B0\u1EE3c $${s1}$ chi\u1EBFc; c\xF2n n\u1EBFu t\u1ED5 I l\xE0m trong $${t2}$ ng\xE0y v\xE0 t\u1ED5 II l\xE0m trong $${t1}$ ng\xE0y th\xEC c\u1EA3 hai t\u1ED5 may \u0111\u01B0\u1EE3c $${s2}$ chi\u1EBFc.

H\u1ECFi m\u1ED7i ng\xE0y m\u1ED7i t\u1ED5 may \u0111\u01B0\u1EE3c bao nhi\xEAu chi\u1EBFc kh\u1EA9u trang?`,
        answer: "",
        rubric: [
          { criterion: "G\u1ECDi \u1EA9n \u0111\xFAng, c\xF3 \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n ($x,y>0$)", points: 0.5 },
          { criterion: `L\u1EADp \u0111\xFAng ph\u01B0\u01A1ng tr\xECnh th\u1EE9 nh\u1EA5t: $${t1}x+${t2}y=${s1}$`, points: 1 },
          { criterion: `L\u1EADp \u0111\xFAng ph\u01B0\u01A1ng tr\xECnh th\u1EE9 hai: $${t2}x+${t1}y=${s2}$`, points: 1 },
          { criterion: "Gi\u1EA3i h\u1EC7 \u0111\xFAng", points: 1 },
          { criterion: `\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n v\xE0 k\u1EBFt lu\u1EADn: t\u1ED5 I ${x} chi\u1EBFc/ng\xE0y, t\u1ED5 II ${y} chi\u1EBFc/ng\xE0y`, points: 0.5 }
        ],
        thinking: [
          "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt (n\u0103ng su\u1EA5t m\u1ED7i t\u1ED5) \u2192 hai \u1EA9n \u2192 c\u1EA7n hai ph\u01B0\u01A1ng tr\xECnh.",
          "M\u1ED7i t\xECnh hu\u1ED1ng trong \u0111\u1EC1 cho m\u1ED9t ph\u01B0\u01A1ng tr\xECnh."
        ],
        solution: [
          `G\u1ECDi s\u1ED1 kh\u1EA9u trang m\u1ED7i ng\xE0y t\u1ED5 I v\xE0 t\u1ED5 II may \u0111\u01B0\u1EE3c l\u1EA7n l\u01B0\u1EE3t l\xE0 $x$, $y$ (chi\u1EBFc; $x,y>0$).`,
          `T\xECnh hu\u1ED1ng 1: $${t1}x+${t2}y=${s1}$. (1)`,
          `T\xECnh hu\u1ED1ng 2: $${t2}x+${t1}y=${s2}$. (2)`,
          `Gi\u1EA3i h\u1EC7 (1), (2) b\u1EB1ng ph\u01B0\u01A1ng ph\xE1p c\u1ED9ng \u0111\u1EA1i s\u1ED1 ta \u0111\u01B0\u1EE3c $x=${x}$; $y=${y}$.`,
          `C\u1EA3 hai gi\xE1 tr\u1ECB \u0111\u1EC1u d\u01B0\u01A1ng n\xEAn tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n.`,
          `V\u1EADy m\u1ED7i ng\xE0y t\u1ED5 I may \u0111\u01B0\u1EE3c **${x} chi\u1EBFc**, t\u1ED5 II may \u0111\u01B0\u1EE3c **${y} chi\u1EBFc**.`
        ]
      };
    }
  }
];

// src/bank/g6-gita.ts
var ROMAN = [
  [1e3, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
];
var toRoman = (n) => {
  let out = "", x = n;
  for (const [v, s] of ROMAN) while (x >= v) {
    out += s;
    x -= v;
  }
  return out;
};
var BANK_G6_GITA = [
  {
    id: "g6.so-la-ma",
    topicId: "g6-t1",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "S\u1ED1 La M\xE3",
    build: (r) => {
      const n = r.int(4, 39);
      const ask = r.pick(["doc", "viet"]);
      const rom = toRoman(n);
      if (ask === "doc") {
        const [options2, answer2] = mcOptions(r, String(n), [String(n + 1), String(n - 1), String(n + 5)]);
        return {
          stem: `S\u1ED1 La M\xE3 $${rom}$ c\xF3 gi\xE1 tr\u1ECB b\u1EB1ng bao nhi\xEAu?`,
          options: options2,
          answer: answer2,
          thinking: [
            "K\xFD hi\u1EC7u b\xE9 \u0111\u1EE9ng **b\xEAn tr\xE1i** k\xFD hi\u1EC7u l\u1EDBn th\xEC l\u1EA5y l\u1EDBn **tr\u1EEB** b\xE9 (v\xED d\u1EE5 $IV=5-1=4$).",
            "K\xFD hi\u1EC7u b\xE9 \u0111\u1EE9ng **b\xEAn ph\u1EA3i** k\xFD hi\u1EC7u l\u1EDBn th\xEC l\u1EA5y l\u1EDBn **c\u1ED9ng** b\xE9 (v\xED d\u1EE5 $VI=5+1=6$)."
          ],
          solution: [`B\u1EA3ng gi\xE1 tr\u1ECB: $I=1$; $V=5$; $X=10$; $L=50$.`, `$${rom}=${n}$.`],
          pitfall: "\u0110\u1ECDc tr\xE1i sang ph\u1EA3i v\xE0 x\xE9t t\u1EEBng c\u1EB7p k\xFD hi\u1EC7u li\u1EC1n nhau \u2014 b\u1ECF qua quy t\u1EAFc tr\u1EEB l\xE0 sai ngay."
        };
      }
      const [options, answer] = mcOptions(r, `$${rom}$`, [`$${toRoman(n + 1)}$`, `$${toRoman(n - 1)}$`, `$${toRoman(n + 10)}$`]);
      return {
        stem: `S\u1ED1 $${n}$ \u0111\u01B0\u1EE3c vi\u1EBFt b\u1EB1ng s\u1ED1 La M\xE3 l\xE0:`,
        options,
        answer,
        thinking: ["T\xE1ch s\u1ED1 theo h\xE0ng ch\u1EE5c v\xE0 h\xE0ng \u0111\u01A1n v\u1ECB r\u1ED3i gh\xE9p k\xFD hi\u1EC7u t\u01B0\u01A1ng \u1EE9ng."],
        solution: [`$${n}$ vi\u1EBFt th\xE0nh $${rom}$.`]
      };
    }
  },
  {
    id: "g6.cau-tao-so",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "C\u1EA5u t\u1EA1o s\u1ED1 \u2014 vi\u1EBFt s\u1ED1 theo \u0111i\u1EC1u ki\u1EC7n ch\u1EEF s\u1ED1",
    build: (r) => {
      const d = r.int(1, 7);
      const list = [];
      for (let a = 1; a <= 9; a++) {
        const b = a - d;
        if (b >= 0) list.push(10 * a + b);
      }
      return {
        stem: `Vi\u1EBFt t\u1EADp h\u1EE3p c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn c\xF3 hai ch\u1EEF s\u1ED1, trong \u0111\xF3 ch\u1EEF s\u1ED1 h\xE0ng ch\u1EE5c l\u1EDBn h\u01A1n ch\u1EEF s\u1ED1 h\xE0ng \u0111\u01A1n v\u1ECB $${d}$ \u0111\u01A1n v\u1ECB. T\u1EADp h\u1EE3p \u0111\xF3 c\xF3 bao nhi\xEAu ph\u1EA7n t\u1EED?`,
        answer: String(list.length),
        thinking: [
          `G\u1ECDi s\u1ED1 c\u1EA7n t\xECm l\xE0 $\\ov{ab}$ v\u1EDBi $1\\le a\\le9$, $0\\le b\\le9$ v\xE0 $a-b=${d}$.`,
          `Cho $a$ ch\u1EA1y t\u1EEB nh\u1ECF \u0111\u1EBFn l\u1EDBn, m\u1ED7i gi\xE1 tr\u1ECB $a$ cho \u0111\xFAng m\u1ED9t gi\xE1 tr\u1ECB $b=a-${d}$ (n\u1EBFu $b\\ge0$).`
        ],
        solution: [
          `\u0110i\u1EC1u ki\u1EC7n: $a-b=${d}$, t\u1EE9c $b=a-${d}\\ge0$ n\xEAn $a\\ge${d}$.`,
          `$a$ nh\u1EADn c\xE1c gi\xE1 tr\u1ECB t\u1EEB $${Math.max(1, d)}$ \u0111\u1EBFn $9$.`,
          `T\u1EADp h\u1EE3p: $\\{${list.join(";")}\\}$ \u2014 c\xF3 $${list.length}$ ph\u1EA7n t\u1EED.`
        ],
        pitfall: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n ch\u1EEF s\u1ED1 h\xE0ng ch\u1EE5c kh\xE1c 0 ho\u1EB7c qu\xEAn $b\\ge0$."
      };
    }
  },
  {
    id: "g6.ucln-co-du",
    topicId: "g6-t2",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm s\u1ED1 chia t\u1EEB hai ph\xE9p chia c\xF3 d\u01B0",
    build: (r) => {
      const a = r.pick([12, 14, 15, 16, 18, 20, 21, 24]);
      const r1 = r.int(1, Math.min(9, a - 1));
      const r2 = r.int(1, Math.min(9, a - 1));
      const n1 = a * r.int(6, 14) + r1;
      const n2 = a * r.int(6, 14) + r2;
      const g = gcd(n1 - r1, n2 - r2);
      return {
        stem: `T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $a$ l\u1EDBn nh\u1EA5t, bi\u1EBFt r\u1EB1ng $${n1}$ chia cho $a$ d\u01B0 $${r1}$ v\xE0 $${n2}$ chia cho $a$ d\u01B0 $${r2}$.`,
        answer: String(g),
        thinking: [
          `\u201C$${n1}$ chia $a$ d\u01B0 $${r1}$\u201D ngh\u0129a l\xE0 $${n1}-${r1}=${n1 - r1}$ chia h\u1EBFt cho $a$.`,
          `T\u01B0\u01A1ng t\u1EF1 $${n2}-${r2}=${n2 - r2}$ c\u0169ng chia h\u1EBFt cho $a$.`,
          `V\u1EADy $a$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a hai hi\u1EC7u; mu\u1ED1n l\u1EDBn nh\u1EA5t th\xEC l\u1EA5y \u01AFCLN. Nh\u1EDB \u0111i\u1EC1u ki\u1EC7n $a$ ph\u1EA3i **l\u1EDBn h\u01A1n s\u1ED1 d\u01B0 l\u1EDBn nh\u1EA5t**.`
        ],
        solution: [
          `T\u1EEB gi\u1EA3 thi\u1EBFt: $(${n1}-${r1});\\vdots;a$ v\xE0 $(${n2}-${r2});\\vdots;a$, t\u1EE9c $${n1 - r1};\\vdots;a$ v\xE0 $${n2 - r2};\\vdots;a$.`,
          `Do \u0111\xF3 $a\\in$ \u01AFC$(${n1 - r1};${n2 - r2})$.`,
          `\u01AFCLN$(${n1 - r1};${n2 - r2})=${g}$.`,
          `\u0110i\u1EC1u ki\u1EC7n: $a>${Math.max(r1, r2)}$ (s\u1ED1 chia ph\u1EA3i l\u1EDBn h\u01A1n s\u1ED1 d\u01B0) \u2014 gi\xE1 tr\u1ECB $a=${g}$ tho\u1EA3 m\xE3n.`,
          `V\u1EADy $a=${g}$.`
        ],
        pitfall: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n \u201Cs\u1ED1 chia l\u1EDBn h\u01A1n s\u1ED1 d\u01B0\u201D l\xE0 l\u1ED7i m\u1EA5t \u0111i\u1EC3m ph\u1ED5 bi\u1EBFn c\u1EE7a d\u1EA1ng n\xE0y."
      };
    }
  },
  {
    id: "g6.uc-bieu-thuc",
    topicId: "g6-t2",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "\u01AF\u1EDBc chung c\u1EE7a hai bi\u1EC3u th\u1EE9c ch\u1EE9a n",
    build: (r) => {
      const a1 = r.int(1, 3), b1 = r.int(1, 6);
      const a2 = a1 + r.int(1, 3), b2 = r.int(1, 8);
      const k = Math.abs(a2 * b1 - a1 * b2);
      const divs = [];
      for (let i = 1; i <= (k || 1); i++) if (k % i === 0) divs.push(i);
      if (k === 0) {
        return {
          stem: "T\xECm \u01B0\u1EDBc chung l\u1EDBn nh\u1EA5t c\u1EE7a hai s\u1ED1 $2n+3$ v\xE0 $3n+4$ v\u1EDBi $n$ l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn.",
          answer: "1",
          thinking: ["\u0110\u1EB7t $d$ l\xE0 \u01B0\u1EDBc chung, kh\u1EED $n$ b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh."],
          solution: [
            "G\u1ECDi $d$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a $2n+3$ v\xE0 $3n+4$.",
            "$3(2n+3)-2(3n+4)=9-8=1$ n\xEAn $1;\\vdots;d\\Rightarrow d=1$.",
            "V\u1EADy \u01AFCLN b\u1EB1ng 1, hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau."
          ]
        };
      }
      return {
        stem: `T\xECm \u01B0\u1EDBc chung l\u1EDBn nh\u1EA5t c\xF3 th\u1EC3 c\u1EE7a hai s\u1ED1 $${a1 === 1 ? "" : a1}n+${b1}$ v\xE0 $${a2 === 1 ? "" : a2}n+${b2}$ (v\u1EDBi $n$ l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn).`,
        answer: String(k),
        thinking: [
          "\u0110\u1EB7t $d$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a hai bi\u1EC3u th\u1EE9c, r\u1ED3i **kh\u1EED $n$** b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh.",
          `Nh\xE2n bi\u1EC3u th\u1EE9c th\u1EE9 nh\u1EA5t v\u1EDBi $${a2}$ v\xE0 bi\u1EC3u th\u1EE9c th\u1EE9 hai v\u1EDBi $${a1}$ \u0111\u1EC3 h\u1EC7 s\u1ED1 c\u1EE7a $n$ b\u1EB1ng nhau.`
        ],
        solution: [
          `G\u1ECDi $d$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a $${a1 === 1 ? "" : a1}n+${b1}$ v\xE0 $${a2 === 1 ? "" : a2}n+${b2}$.`,
          `Khi \u0111\xF3 $${a2}(${a1 === 1 ? "" : a1}n+${b1});\\vdots;d$ v\xE0 $${a1}(${a2 === 1 ? "" : a2}n+${b2});\\vdots;d$.`,
          `Tr\u1EEB theo v\u1EBF: $${a2 * b1}-${a1 * b2}=${a2 * b1 - a1 * b2}$ chia h\u1EBFt cho $d$.`,
          `Suy ra $d$ l\xE0 \u01B0\u1EDBc c\u1EE7a $${k}$; \u01B0\u1EDBc l\u1EDBn nh\u1EA5t c\xF3 th\u1EC3 l\xE0 $d=${k}$.`,
          `\u01AF$(${k})=\\{${divs.join(";")}\\}$ \u2014 \u0111\xE2y l\xE0 t\u1EADp c\xE1c gi\xE1 tr\u1ECB $d$ c\xF3 th\u1EC3 nh\u1EADn.`
        ],
        remark: "K\u1EF9 thu\u1EADt kh\u1EED \u1EA9n b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh l\xE0 m\u1EABu chu\u1EA9n cho m\u1ECDi b\xE0i \u01AFC c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a $n$."
      };
    }
  },
  {
    id: "g6.lap-so",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp s\u1ED1 theo d\u1EA5u hi\u1EC7u chia h\u1EBFt",
    build: (r) => {
      const d = r.pick([2, 5, 3, 9]);
      const digits = r.shuffle([0, r.int(1, 4), r.int(5, 9)]).slice(0, 3);
      const uniq = Array.from(new Set(digits));
      while (uniq.length < 3) uniq.push(uniq.length + 3);
      const perms = [];
      for (const a of uniq) for (const b of uniq) for (const c of uniq) {
        if (a === b || b === c || a === c) continue;
        if (a === 0) continue;
        perms.push(100 * a + 10 * b + c);
      }
      const ok = perms.filter((x) => x % d === 0);
      return {
        stem: `T\u1EEB ba ch\u1EEF s\u1ED1 $${uniq.join("$; $")}$, c\xF3 th\u1EC3 l\u1EADp \u0111\u01B0\u1EE3c bao nhi\xEAu s\u1ED1 t\u1EF1 nhi\xEAn c\xF3 ba ch\u1EEF s\u1ED1 **kh\xE1c nhau** v\xE0 chia h\u1EBFt cho $${d}$?`,
        answer: String(ok.length),
        thinking: [
          "Li\u1EC7t k\xEA c\xF3 h\u1EC7 th\u1ED1ng: ch\u1ECDn ch\u1EEF s\u1ED1 h\xE0ng tr\u0103m tr\u01B0\u1EDBc (kh\xE1c 0), r\u1ED3i h\xE0ng ch\u1EE5c, r\u1ED3i h\xE0ng \u0111\u01A1n v\u1ECB.",
          d === 2 || d === 5 ? `Chia h\u1EBFt cho ${d} n\xEAn **ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng** ph\u1EA3i tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n \u2014 b\u1EAFt \u0111\u1EA7u t\u1EEB r\xE0ng bu\u1ED9c n\xE0y \u0111\u1EC3 l\u1ECDc nhanh.` : `Chia h\u1EBFt cho ${d} th\xEC x\xE9t **t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1**; t\u1ED5ng c\u1EE7a ba ch\u1EEF s\u1ED1 \u0111\xE3 cho l\xE0 c\u1ED1 \u0111\u1ECBnh n\xEAn ho\u1EB7c t\u1EA5t c\u1EA3 c\xE1c s\u1ED1 \u0111\u1EC1u tho\u1EA3, ho\u1EB7c kh\xF4ng s\u1ED1 n\xE0o tho\u1EA3.`
        ],
        solution: [
          `C\xE1c s\u1ED1 c\xF3 ba ch\u1EEF s\u1ED1 kh\xE1c nhau l\u1EADp \u0111\u01B0\u1EE3c: $${perms.sort((a, b) => a - b).join("$; $")}$.`,
          ok.length ? `Trong \u0111\xF3 chia h\u1EBFt cho $${d}$: $${ok.sort((a, b) => a - b).join("$; $")}$ \u2014 c\xF3 $${ok.length}$ s\u1ED1.` : `Kh\xF4ng c\xF3 s\u1ED1 n\xE0o chia h\u1EBFt cho $${d}$, v\u1EADy \u0111\xE1p s\u1ED1 l\xE0 $0$.`
        ],
        pitfall: "Qu\xEAn lo\u1EA1i c\xE1c s\u1ED1 c\xF3 ch\u1EEF s\u1ED1 h\xE0ng tr\u0103m b\u1EB1ng 0."
      };
    }
  },
  {
    id: "g6.chia-nhom",
    topicId: "g6-t2",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "\u0110\u1EBFm s\u1ED1 c\xE1ch chia \u0111\u1EC1u th\xE0nh nh\xF3m",
    build: (r) => {
      const g = r.pick([4, 6, 8, 12]);
      const p = r.shuffle([2, 3, 5, 7]).slice(0, 2);
      const nam = g * p[0], nu = g * p[1];
      const divs = [];
      for (let i = 1; i <= g; i++) if (g % i === 0) divs.push(i);
      return {
        stem: `C\xF3 $${nam}$ h\u1ECDc sinh nam v\xE0 $${nu}$ h\u1ECDc sinh n\u1EEF. Ng\u01B0\u1EDDi ta mu\u1ED1n chia \u0111\u1EC1u s\u1ED1 h\u1ECDc sinh nam v\xE0 s\u1ED1 h\u1ECDc sinh n\u1EEF v\xE0o c\xE1c nh\xF3m. H\u1ECFi c\xF3 bao nhi\xEAu **c\xE1ch chia** nh\u01B0 v\u1EADy?`,
        answer: String(divs.length),
        thinking: [
          "S\u1ED1 nh\xF3m ph\u1EA3i l\xE0 **\u01B0\u1EDBc chung** c\u1EE7a s\u1ED1 nam v\xE0 s\u1ED1 n\u1EEF (\u0111\u1EC3 chia \u0111\u1EC1u \u0111\u01B0\u1EE3c c\u1EA3 hai).",
          "S\u1ED1 c\xE1ch chia b\u1EB1ng s\u1ED1 \u01B0\u1EDBc chung, t\u1EE9c s\u1ED1 \u01B0\u1EDBc c\u1EE7a \u01AFCLN."
        ],
        solution: [
          `G\u1ECDi $n$ l\xE0 s\u1ED1 nh\xF3m. V\xEC chia \u0111\u1EC1u c\u1EA3 nam v\xE0 n\u1EEF n\xEAn $n\\in$ \u01AFC$(${nam};${nu})$.`,
          `\u01AFCLN$(${nam};${nu})=${g}$, do \u0111\xF3 \u01AFC$(${nam};${nu})=$ \u01AF$(${g})=\\{${divs.join(";")}\\}$.`,
          `V\u1EADy c\xF3 $${divs.length}$ c\xE1ch chia.`
        ],
        pitfall: "\u0110\u1EC1 h\u1ECFi \u201Cbao nhi\xEAu c\xE1ch chia\u201D (\u0111\u1EBFm s\u1ED1 \u01B0\u1EDBc chung), kh\xE1c v\u1EDBi \u201Cchia nhi\u1EC1u nh\u1EA5t bao nhi\xEAu nh\xF3m\u201D (l\u1EA5y \u01AFCLN)."
      };
    }
  }
];

// src/bank/g9-hinh.ts
var PROBLEMS = [
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ c\xF3 ba g\xF3c nh\u1ECDn ($AB<AC$) n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O)$. Hai \u0111\u01B0\u1EDDng cao $BE$ v\xE0 $CF$ c\u1EAFt nhau t\u1EA1i $H$.\n\na) Ch\u1EE9ng minh b\u1ED1n \u0111i\u1EC3m $B$, $C$, $E$, $F$ c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n.\n\nb) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $AEHF$ n\u1ED9i ti\u1EBFp v\xE0 $AH\\perp BC$.\n\nc) Ch\u1EE9ng minh $\\angle AEF=\\angle ABC$.\n\nd) Ch\u1EE9ng minh $OA\\perp EF$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 k\xFD hi\u1EC7u vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: ch\u1EC9 ra $\\angle BFC=\\angle BEC=90\\deg$, hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn $BC$ \u2192 b\u1ED1n \u0111i\u1EC3m thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $BC$", points: 1 },
      { criterion: "\xDD b: $\\angle AEH+\\angle AFH=180\\deg$ \u2192 $AEHF$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng k\xEDnh $AH$", points: 0.75 },
      { criterion: "\xDD b: $H$ l\xE0 tr\u1EF1c t\xE2m n\xEAn $AH$ l\xE0 \u0111\u01B0\u1EDDng cao th\u1EE9 ba, suy ra $AH\\perp BC$", points: 0.75 },
      { criterion: "\xDD c: t\u1EEB $BFEC$ n\u1ED9i ti\u1EBFp, d\xF9ng g\xF3c ngo\xE0i b\u1EB1ng g\xF3c trong \u0111\u1ED1i di\u1EC7n", points: 1 },
      { criterion: "\xDD d: k\u1EBB ti\u1EBFp tuy\u1EBFn $Ax$, ch\u1EE9ng minh $Ax\\para EF$ r\u1ED3i suy ra $OA\\perp EF$", points: 1 }
    ],
    thinking: [
      "\xDD a v\xE0 b \u0111\u1EC1u l\xE0 \u201Cs\u0103n g\xF3c vu\xF4ng\u201D: m\u1ED7i \u0111\u01B0\u1EDDng cao cho m\u1ED9t g\xF3c $90\\deg$, hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t \u0111o\u1EA1n l\xE0 c\xF3 ngay t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp.",
      "\xDD c l\xE0 h\u1EC7 qu\u1EA3 tr\u1EF1c ti\u1EBFp c\u1EE7a t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp $BFEC$ \u2014 g\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng g\xF3c trong c\u1EE7a \u0111\u1EC9nh \u0111\u1ED1i di\u1EC7n.",
      "\xDD d l\xE0 c\xE2u ph\xE2n lo\u1EA1i: \xFD t\u01B0\u1EDFng l\xE0 k\u1EBB ti\u1EBFp tuy\u1EBFn $Ax$ t\u1EA1i $A$ r\u1ED3i ch\u1EE9ng minh $Ax\\para EF$; v\xEC $OA\\perp Ax$ n\xEAn $OA\\perp EF$."
    ],
    solution: [
      "a) V\xEC $BE$, $CF$ l\xE0 \u0111\u01B0\u1EDDng cao n\xEAn $\\angle BEC=\\angle BFC=90\\deg$.",
      "Hai \u0111\u1EC9nh $E$, $F$ k\u1EC1 nhau c\xF9ng nh\xECn \u0111o\u1EA1n $BC$ d\u01B0\u1EDBi g\xF3c vu\xF4ng, n\xEAn b\u1ED1n \u0111i\u1EC3m $B$, $C$, $E$, $F$ c\xF9ng thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $BC$.",
      "b) X\xE9t t\u1EE9 gi\xE1c $AEHF$: $\\angle AEH=90\\deg$ (v\xEC $BE\\perp AC$) v\xE0 $\\angle AFH=90\\deg$ (v\xEC $CF\\perp AB$).",
      "T\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$ n\xEAn $AEHF$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AH$.",
      "$H$ l\xE0 giao c\u1EE7a hai \u0111\u01B0\u1EDDng cao n\xEAn $H$ l\xE0 tr\u1EF1c t\xE2m tam gi\xE1c $ABC$; do \u0111\xF3 $AH$ n\u1EB1m tr\xEAn \u0111\u01B0\u1EDDng cao th\u1EE9 ba, suy ra $AH\\perp BC$.",
      "c) T\u1EE9 gi\xE1c $BFEC$ n\u1ED9i ti\u1EBFp (ch\u1EE9ng minh \u1EDF \xFD a).",
      "Do \u0111\xF3 g\xF3c ngo\xE0i t\u1EA1i \u0111\u1EC9nh $E$ b\u1EB1ng g\xF3c trong t\u1EA1i \u0111\u1EC9nh \u0111\u1ED1i di\u1EC7n $B$: $\\angle AEF=\\angle ABC$.",
      "d) K\u1EBB ti\u1EBFp tuy\u1EBFn $Ax$ c\u1EE7a $(O)$ t\u1EA1i $A$ (l\u1EA5y $Ax$ n\u1EB1m c\xF9ng ph\xEDa v\u1EDBi $E$ so v\u1EDBi $AB$).",
      "$\\angle xAB=\\angle ACB$ (g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y $AB$ b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung $AB$).",
      "M\u1EB7t kh\xE1c t\u1EEB \xFD c ta c\xF3 $\\angle AEF=\\angle ABC$, suy ra $\\angle AFE=\\angle ACB$ (c\xF9ng b\xF9 v\u1EDBi c\xE1c g\xF3c t\u01B0\u01A1ng \u1EE9ng trong t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp $BFEC$).",
      "V\u1EADy $\\angle xAB=\\angle AFE$, hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED so le trong \u0111\u1ED1i v\u1EDBi $Ax$ v\xE0 $EF$ n\xEAn $Ax\\para EF$.",
      "M\xE0 $OA\\perp Ax$ (b\xE1n k\xEDnh vu\xF4ng g\xF3c ti\u1EBFp tuy\u1EBFn), do \u0111\xF3 $OA\\perp EF$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O)$ v\xE0 \u0111i\u1EC3m $A$ n\u1EB1m ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n. K\u1EBB hai ti\u1EBFp tuy\u1EBFn $AM$, $AN$ t\u1EDBi $(O)$ ($M$, $N$ l\xE0 ti\u1EBFp \u0111i\u1EC3m). M\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng $d$ qua $A$ c\u1EAFt $(O)$ t\u1EA1i hai \u0111i\u1EC3m $B$ v\xE0 $C$ ($AB<AC$, $d$ kh\xF4ng \u0111i qua $O$).\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $AMON$ n\u1ED9i ti\u1EBFp.\n\nb) Ch\u1EE9ng minh $AN^{2}=AB\\cdot AC$. T\xEDnh $BC$ khi $AB=4\\,cm$ v\xE0 $AN=6\\,cm$.\n\nc) G\u1ECDi $I$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. Ch\u1EE9ng minh n\u0103m \u0111i\u1EC3m $A$, $M$, $O$, $I$, $N$ c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n.\n\nd) Ch\u1EE9ng minh $IA$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $\\angle MIN$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng", points: 0.5 },
      { criterion: "\xDD a: $\\angle AMO=\\angle ANO=90\\deg$, t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$", points: 0.75 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri ANB\\sim\\tri ACN$ (g\xF3c $A$ chung, g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y)", points: 1 },
      { criterion: "\xDD b: suy ra $AN^{2}=AB\\cdot AC$ v\xE0 t\xEDnh $BC=5\\,cm$", points: 0.75 },
      { criterion: "\xDD c: $OI\\perp BC$ n\xEAn $\\angle AIO=90\\deg$, suy ra $I$ thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AO$", points: 1 },
      { criterion: "\xDD d: d\xF9ng $AM=AN$ \u0111\u1EC3 suy ra hai cung b\u1EB1ng nhau, t\u1EEB \u0111\xF3 hai g\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng nhau", points: 1 }
    ],
    thinking: [
      "C\u1EA5u h\xECnh \u201Chai ti\u1EBFp tuy\u1EBFn + c\xE1t tuy\u1EBFn\u201D l\xE0 c\u1EA5u h\xECnh xu\u1EA5t hi\u1EC7n nhi\u1EC1u nh\u1EA5t trong \u0111\u1EC1 thi v\xE0o 10 \u2014 nh\u1EDB khai th\xE1c \u0111\u1EE7 b\u1ED1n k\u1EBFt qu\u1EA3 c\u1EE7a hai ti\u1EBFp tuy\u1EBFn.",
      "\xDD b l\xE0 h\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch: \u0111\u01B0a v\u1EC1 t\u1EC9 l\u1EC7 $\\f{AN}{AC}=\\f{AB}{AN}$ r\u1ED3i t\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng.",
      "\xDD c: $I$ l\xE0 trung \u0111i\u1EC3m d\xE2y n\xEAn $OI\\perp BC$ \u2014 l\u1EA1i m\u1ED9t g\xF3c vu\xF4ng nh\xECn $AO$, gh\xE9p chung v\xE0o \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AO$ \u1EDF \xFD a.",
      "\xDD d: khi \u0111\xE3 c\xF3 n\u0103m \u0111i\u1EC3m c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n, m\u1ECDi quan h\u1EC7 g\xF3c \u0111\u1EC1u quy v\u1EC1 g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung b\u1EB1ng nhau."
    ],
    solution: [
      "a) V\xEC $AM$, $AN$ l\xE0 ti\u1EBFp tuy\u1EBFn n\xEAn $OM\\perp AM$ v\xE0 $ON\\perp AN$, t\u1EE9c $\\angle AMO=\\angle ANO=90\\deg$.",
      "T\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$ n\xEAn t\u1EE9 gi\xE1c $AMON$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AO$.",
      "b) X\xE9t $\\tri ANB$ v\xE0 $\\tri ACN$ c\xF3: $\\angle A$ chung;",
      "$\\angle ANB=\\angle ACN$ (g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn $AN$ v\xE0 d\xE2y $NB$ b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp $\\angle NCB$ c\xF9ng ch\u1EAFn cung $NB$).",
      "Do \u0111\xF3 $\\tri ANB\\sim\\tri ACN$ (g.g), suy ra $\\f{AN}{AC}=\\f{AB}{AN}$, t\u1EE9c $AN^{2}=AB\\cdot AC$.",
      "Thay s\u1ED1: $6^{2}=4\\cdot AC\\Rightarrow AC=9\\ (cm)$.",
      "V\u1EADy $BC=AC-AB=9-4=5\\ (cm)$.",
      "c) V\xEC $I$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a d\xE2y $BC$ (d\xE2y kh\xF4ng \u0111i qua t\xE2m) n\xEAn $OI\\perp BC$, t\u1EE9c $\\angle AIO=90\\deg$.",
      "Do \u0111\xF3 $I$ thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AO$ \u2014 ch\xEDnh l\xE0 \u0111\u01B0\u1EDDng tr\xF2n \u0111i qua $A$, $M$, $O$, $N$ \u1EDF \xFD a.",
      "V\u1EADy n\u0103m \u0111i\u1EC3m $A$, $M$, $O$, $I$, $N$ c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n.",
      "d) Trong \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AO$ n\xF3i tr\xEAn, ta c\xF3 $AM=AN$ (hai ti\u1EBFp tuy\u1EBFn c\xF9ng xu\u1EA5t ph\xE1t t\u1EEB $A$).",
      "Hai d\xE2y b\u1EB1ng nhau c\u0103ng hai cung b\u1EB1ng nhau, n\xEAn cung $AM$ b\u1EB1ng cung $AN$.",
      "Hai g\xF3c n\u1ED9i ti\u1EBFp $\\angle MIA$ v\xE0 $\\angle AIN$ ch\u1EAFn hai cung b\u1EB1ng nhau \u0111\xF3 n\xEAn $\\angle MIA=\\angle AIN$.",
      "V\u1EADy $IA$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $\\angle MIN$."
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n t\xE2m $O$ \u0111\u01B0\u1EDDng k\xEDnh $AB$. L\u1EA5y \u0111i\u1EC3m $C$ tr\xEAn \u0111o\u1EA1n $AO$ ($C$ kh\xE1c $A$ v\xE0 $O$). \u0110\u01B0\u1EDDng th\u1EB3ng qua $C$ vu\xF4ng g\xF3c v\u1EDBi $AB$ c\u1EAFt n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n t\u1EA1i $K$. G\u1ECDi $M$ l\xE0 \u0111i\u1EC3m b\u1EA5t k\u1EF3 tr\xEAn cung $KB$ ($M$ kh\xE1c $K$, $B$). \u0110\u01B0\u1EDDng th\u1EB3ng $CK$ c\u1EAFt $AM$ t\u1EA1i $H$ v\xE0 c\u1EAFt $BM$ t\u1EA1i $D$.\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ACMD$ n\u1ED9i ti\u1EBFp.\n\nb) Ch\u1EE9ng minh $CA\\cdot CB=CH\\cdot CD$.\n\nc) Ch\u1EE9ng minh $CH\\cdot CD=CK^{2}$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi k\xFD hi\u1EC7u vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: $\\angle AMB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n) n\xEAn $\\angle AMD=90\\deg$", points: 0.75 },
      { criterion: "\xDD a: c\xF9ng v\u1EDBi $\\angle ACD=90\\deg$, t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$", points: 0.75 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri CAH\\sim\\tri CDB$ (hai g\xF3c vu\xF4ng + g\xF3c b\u1EB1ng nhau)", points: 1.25 },
      { criterion: "\xDD b: suy ra h\u1EC7 th\u1EE9c $CA\\cdot CB=CH\\cdot CD$", points: 0.75 },
      { criterion: "\xDD c: d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng $CK^{2}=CA\\cdot CB$ trong tam gi\xE1c $AKB$ vu\xF4ng t\u1EA1i $K$", points: 1 }
    ],
    thinking: [
      "$M$ n\u1EB1m tr\xEAn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle AMB=90\\deg$ \u2014 \u0111\xE2y l\xE0 \u201Cch\xECa kho\xE1\u201D c\u1EE7a c\u1EA3 b\xE0i.",
      "\xDD b: h\u1EC7 th\u1EE9c t\xEDch \u2192 t\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng ch\u1EE9a b\u1ED1n \u0111o\u1EA1n $CA$, $CB$, $CH$, $CD$.",
      "\xDD c: $K$ c\u0169ng n\u1EB1m tr\xEAn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n n\xEAn $\\tri AKB$ vu\xF4ng t\u1EA1i $K$, c\xF3 \u0111\u01B0\u1EDDng cao $KC$ \u2014 d\xF9ng ngay h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng."
    ],
    solution: [
      "a) V\xEC $M$ thu\u1ED9c n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle AMB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n).",
      "$D$ thu\u1ED9c tia $BM$ n\xEAn $\\angle AMD=180\\deg-\\angle AMB=90\\deg$.",
      "L\u1EA1i c\xF3 $CD\\perp AB$ t\u1EA1i $C$ n\xEAn $\\angle ACD=90\\deg$.",
      "X\xE9t t\u1EE9 gi\xE1c $ACMD$: $\\angle ACD+\\angle AMD=90\\deg+90\\deg=180\\deg$, hai g\xF3c \u1EDF v\u1ECB tr\xED \u0111\u1ED1i nhau.",
      "V\u1EADy t\u1EE9 gi\xE1c $ACMD$ n\u1ED9i ti\u1EBFp.",
      "b) T\u1EEB t\u1EE9 gi\xE1c $ACMD$ n\u1ED9i ti\u1EBFp (\xFD a), hai g\xF3c n\u1ED9i ti\u1EBFp $\\angle MAC$ v\xE0 $\\angle MDC$ c\xF9ng ch\u1EAFn cung $MC$ n\xEAn $\\angle MAC=\\angle MDC$.",
      "V\xEC $H$ thu\u1ED9c $AM$ v\xE0 $B$ thu\u1ED9c tia $DM$ n\xEAn $\\angle HAC=\\angle MAC$ v\xE0 $\\angle BDC=\\angle MDC$, do \u0111\xF3 $\\angle HAC=\\angle BDC$.",
      "X\xE9t $\\tri CAH$ v\xE0 $\\tri CDB$ c\xF3: $\\angle ACH=\\angle DCB=90\\deg$ (v\xEC $CD\\perp AB$) v\xE0 $\\angle HAC=\\angle BDC$ (ch\u1EE9ng minh tr\xEAn).",
      "Do \u0111\xF3 $\\tri CAH\\sim\\tri CDB$ (g.g), suy ra $\\f{CA}{CD}=\\f{CH}{CB}$, t\u1EE9c $CA\\cdot CB=CH\\cdot CD$.",
      "c) V\xEC $K$ thu\u1ED9c n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle AKB=90\\deg$, tam gi\xE1c $AKB$ vu\xF4ng t\u1EA1i $K$.",
      "$KC\\perp AB$ n\xEAn $KC$ l\xE0 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n $AB$.",
      "Theo h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng: $CK^{2}=CA\\cdot CB$.",
      "K\u1EBFt h\u1EE3p v\u1EDBi \xFD b: $CH\\cdot CD=CA\\cdot CB=CK^{2}$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ \u0111\u01B0\u1EDDng k\xEDnh $AB$. B\xE1n k\xEDnh $OC$ vu\xF4ng g\xF3c v\u1EDBi $AB$. L\u1EA5y $M$ l\xE0 \u0111i\u1EC3m b\u1EA5t k\u1EF3 tr\xEAn cung nh\u1ECF $AC$ ($M$ kh\xE1c $A$ v\xE0 $C$). \u0110\u01B0\u1EDDng th\u1EB3ng $BM$ c\u1EAFt $AC$ t\u1EA1i $H$. G\u1ECDi $K$ l\xE0 h\xECnh chi\u1EBFu vu\xF4ng g\xF3c c\u1EE7a $H$ tr\xEAn $AB$.\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $CBKH$ n\u1ED9i ti\u1EBFp.\n\nb) Ch\u1EE9ng minh $\\angle ACM=\\angle ACK$.\n\nc) Tr\xEAn \u0111o\u1EA1n $BM$ l\u1EA5y \u0111i\u1EC3m $E$ sao cho $BE=AM$. Ch\u1EE9ng minh tam gi\xE1c $ECM$ vu\xF4ng c\xE2n t\u1EA1i $C$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng", points: 0.5 },
      { criterion: "\xDD a: $\\angle HCB=90\\deg$ v\xE0 $\\angle HKB=90\\deg$, t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$", points: 1 },
      { criterion: "\xDD b: d\xF9ng t\u1EE9 gi\xE1c $CBKH$ n\u1ED9i ti\u1EBFp v\xE0 g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung $AM$", points: 1.25 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\tri AMC=\\tri BEC$ (c.g.c) suy ra $CM=CE$", points: 1 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\angle MCE=90\\deg$ v\xE0 k\u1EBFt lu\u1EADn vu\xF4ng c\xE2n", points: 1.25 }
    ],
    thinking: [
      "$OC\\perp AB$ cho $C$ l\xE0 \u0111i\u1EC3m ch\xEDnh gi\u1EEFa cung $AB$, do \u0111\xF3 $CA=CB$ v\xE0 m\u1ECDi g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung $AC$ b\u1EB1ng $45\\deg$.",
      "\xDD c l\xE0 c\xE2u ph\xE2n lo\u1EA1i: mu\u1ED1n ch\u1EE9ng minh vu\xF4ng c\xE2n th\xEC c\u1EA7n hai vi\u1EC7c \u2014 hai c\u1EA1nh b\u1EB1ng nhau v\xE0 g\xF3c xen gi\u1EEFa b\u1EB1ng $90\\deg$.",
      "Gh\xE9p $AM$ v\xE0 $BE$ v\xE0o hai tam gi\xE1c $AMC$ v\xE0 $BEC$, d\xF9ng $CA=CB$ v\xE0 g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung."
    ],
    solution: [
      "a) V\xEC $\\angle ACB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n) n\xEAn $\\angle HCB=90\\deg$.",
      "$HK\\perp AB$ t\u1EA1i $K$ n\xEAn $\\angle HKB=90\\deg$.",
      "X\xE9t t\u1EE9 gi\xE1c $CBKH$: $\\angle HCB+\\angle HKB=180\\deg$, hai g\xF3c \u1EDF v\u1ECB tr\xED \u0111\u1ED1i nhau, n\xEAn $CBKH$ n\u1ED9i ti\u1EBFp.",
      "b) T\u1EEB t\u1EE9 gi\xE1c $CBKH$ n\u1ED9i ti\u1EBFp (\xFD a), hai g\xF3c n\u1ED9i ti\u1EBFp $\\angle HCK$ v\xE0 $\\angle HBK$ c\xF9ng ch\u1EAFn cung $HK$ n\xEAn $\\angle HCK=\\angle HBK$.",
      "V\xEC $H$ n\u1EB1m tr\xEAn $BM$ v\xE0 $K$ n\u1EB1m tr\xEAn $AB$ n\xEAn $\\angle HBK=\\angle MBA$.",
      "Trong \u0111\u01B0\u1EDDng tr\xF2n $(O)$, hai g\xF3c n\u1ED9i ti\u1EBFp $\\angle MBA$ v\xE0 $\\angle MCA$ c\xF9ng ch\u1EAFn cung $AM$ n\xEAn $\\angle MBA=\\angle MCA$.",
      "M\u1EB7t kh\xE1c $H$ thu\u1ED9c \u0111o\u1EA1n $AC$ n\xEAn tia $CH$ tr\xF9ng tia $CA$, do \u0111\xF3 $\\angle HCK=\\angle ACK$.",
      "K\u1EBFt h\u1EE3p l\u1EA1i: $\\angle ACK=\\angle HCK=\\angle HBK=\\angle MBA=\\angle MCA=\\angle ACM$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "c) V\xEC $OC\\perp AB$ n\xEAn $C$ l\xE0 \u0111i\u1EC3m ch\xEDnh gi\u1EEFa cung $AB$, suy ra $CA=CB$.",
      "X\xE9t $\\tri AMC$ v\xE0 $\\tri BEC$ c\xF3: $AM=BE$ (gi\u1EA3 thi\u1EBFt); $CA=CB$ (ch\u1EE9ng minh tr\xEAn);",
      "$\\angle MAC=\\angle EBC$ (hai g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung $MC$ c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n $(O)$).",
      "Do \u0111\xF3 $\\tri AMC=\\tri BEC$ (c.g.c), suy ra $CM=CE$ v\xE0 $\\angle ACM=\\angle BCE$.",
      "Khi \u0111\xF3 $\\angle MCE=\\angle MCB+\\angle BCE=\\angle MCB+\\angle ACM=\\angle ACB=90\\deg$.",
      "Tam gi\xE1c $ECM$ c\xF3 $CM=CE$ v\xE0 $\\angle MCE=90\\deg$ n\xEAn vu\xF4ng c\xE2n t\u1EA1i $C$."
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ v\xE0 \u0111i\u1EC3m $A$ n\u1EB1m ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n. K\u1EBB hai ti\u1EBFp tuy\u1EBFn $AB$, $AC$ t\u1EDBi $(O)$ ($B$, $C$ l\xE0 ti\u1EBFp \u0111i\u1EC3m).\n\na) Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ABOC$ n\u1ED9i ti\u1EBFp.\n\nb) G\u1ECDi $E$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $BC$ v\xE0 $OA$. Ch\u1EE9ng minh $BE\\perp OA$ v\xE0 $OE\\cdot OA=R^{2}$.\n\nc) Cho $OA=2R$. T\xEDnh \u0111\u1ED9 d\xE0i $AB$, s\u1ED1 \u0111o g\xF3c $\\angle BAC$ v\xE0 di\u1EC7n t\xEDch tam gi\xE1c $ABC$ theo $R$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng", points: 0.5 },
      { criterion: "\xDD a: hai g\xF3c vu\xF4ng \u0111\u1ED1i nhau, t\u1ED5ng b\u1EB1ng $180\\deg$", points: 0.5 },
      { criterion: "\xDD b: $OA$ l\xE0 trung tr\u1EF1c c\u1EE7a $BC$ n\xEAn $OA\\perp BC$ t\u1EA1i $E$", points: 1 },
      { criterion: "\xDD b: d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c $OBA$ vu\xF4ng t\u1EA1i $B$: $OB^{2}=OE\\cdot OA$", points: 1 },
      { criterion: "\xDD c: t\xEDnh $AB=R\\s{3}$ v\xE0 $\\angle BAC=60\\deg$", points: 1 },
      { criterion: "\xDD c: t\xEDnh \u0111\xFAng $S_{ABC}=\\f{3R^{2}\\s{3}}{4}$", points: 1 }
    ],
    thinking: [
      "C\u1EA5u h\xECnh hai ti\u1EBFp tuy\u1EBFn cho ngay: $AB=AC$, $OA$ l\xE0 trung tr\u1EF1c c\u1EE7a $BC$, v\xE0 t\u1EE9 gi\xE1c $ABOC$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $OA$.",
      "\xDD b: khi \u0111\xE3 c\xF3 $OA\\perp BC$ t\u1EA1i $E$ th\xEC $BE$ l\xE0 \u0111\u01B0\u1EDDng cao c\u1EE7a tam gi\xE1c vu\xF4ng $OBA$ \u2014 d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng.",
      "\xDD c: $OA=2R$ l\xE0 c\u1EA5u h\xECnh quen thu\u1ED9c cho tam gi\xE1c $ABC$ \u0111\u1EC1u."
    ],
    solution: [
      "a) V\xEC $AB$, $AC$ l\xE0 ti\u1EBFp tuy\u1EBFn n\xEAn $\\angle ABO=\\angle ACO=90\\deg$.",
      "T\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$ n\xEAn t\u1EE9 gi\xE1c $ABOC$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $OA$.",
      "b) Ta c\xF3 $AB=AC$ (hai ti\u1EBFp tuy\u1EBFn c\xF9ng xu\u1EA5t ph\xE1t t\u1EEB $A$) v\xE0 $OB=OC=R$.",
      "Do \u0111\xF3 $OA$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n $BC$, suy ra $OA\\perp BC$ t\u1EA1i $E$ v\xE0 $E$ l\xE0 trung \u0111i\u1EC3m $BC$.",
      "X\xE9t tam gi\xE1c $OBA$ vu\xF4ng t\u1EA1i $B$, c\xF3 $BE$ l\xE0 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n $OA$.",
      "Theo h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng: $OB^{2}=OE\\cdot OA$, t\u1EE9c $OE\\cdot OA=R^{2}$.",
      "c) Tam gi\xE1c $OBA$ vu\xF4ng t\u1EA1i $B$, theo Pythagore: $AB^{2}=OA^{2}-OB^{2}=(2R)^{2}-R^{2}=3R^{2}$.",
      "V\u1EADy $AB=R\\s{3}$.",
      "$\\sin\\angle BAO=\\f{OB}{OA}=\\f{R}{2R}=\\f{1}{2}\\Rightarrow\\angle BAO=30\\deg$.",
      "V\xEC $AO$ l\xE0 ph\xE2n gi\xE1c c\u1EE7a $\\angle BAC$ n\xEAn $\\angle BAC=2\\cdot30\\deg=60\\deg$.",
      "Tam gi\xE1c $ABC$ c\xF3 $AB=AC$ v\xE0 $\\angle BAC=60\\deg$ n\xEAn l\xE0 tam gi\xE1c **\u0111\u1EC1u** c\u1EA1nh $R\\s{3}$.",
      "$S_{ABC}=\\f{(R\\s{3})^{2}\\s{3}}{4}=\\f{3R^{2}\\s{3}}{4}$."
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ \u0111\u01B0\u1EDDng k\xEDnh $AB$. Tr\xEAn ti\u1EBFp tuy\u1EBFn t\u1EA1i $A$ c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n l\u1EA5y \u0111i\u1EC3m $M$ ($M$ kh\xE1c $A$). \u0110\u01B0\u1EDDng th\u1EB3ng $MB$ c\u1EAFt \u0111\u01B0\u1EDDng tr\xF2n t\u1EA1i \u0111i\u1EC3m th\u1EE9 hai $C$.\n\na) Ch\u1EE9ng minh $\\angle ACB=90\\deg$ v\xE0 $MA^{2}=MC\\cdot MB$.\n\nb) Ch\u1EE9ng minh $AC^{2}=MC\\cdot CB$.\n\nc) Cho $MA=R\\s{3}$. T\xEDnh $MB$, $MC$ v\xE0 $BC$ theo $R$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi k\xFD hi\u1EC7u vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: $\\angle ACB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n)", points: 0.75 },
      { criterion: "\xDD a: ch\u1EC9 ra $\\tri MAB$ vu\xF4ng t\u1EA1i $A$ v\xE0 $AC$ l\xE0 \u0111\u01B0\u1EDDng cao, suy ra $MA^{2}=MC\\cdot MB$", points: 1 },
      { criterion: "\xDD b: d\xF9ng h\u1EC7 th\u1EE9c \u0111\u01B0\u1EDDng cao $h^{2}=b'c'$ trong tam gi\xE1c vu\xF4ng $MAB$", points: 1 },
      { criterion: "\xDD c: t\xEDnh $MB=R\\s{7}$ b\u1EB1ng \u0111\u1ECBnh l\xED Pythagore", points: 0.75 },
      { criterion: "\xDD c: t\xEDnh \u0111\xFAng $MC=\\f{3R\\s{7}}{7}$ v\xE0 $BC=\\f{4R\\s{7}}{7}$, c\xF3 ki\u1EC3m tra l\u1EA1i", points: 1 }
    ],
    thinking: [
      "Ti\u1EBFp tuy\u1EBFn t\u1EA1i $A$ vu\xF4ng g\xF3c v\u1EDBi b\xE1n k\xEDnh $OA$, m\xE0 $OA$ n\u1EB1m tr\xEAn $AB$, n\xEAn $MA\\perp AB$: tam gi\xE1c $MAB$ vu\xF4ng t\u1EA1i $A$.",
      "$\\angle ACB=90\\deg$ n\xEAn $AC\\perp MB$ \u2014 v\u1EADy $AC$ ch\xEDnh l\xE0 **\u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n** $MB$ c\u1EE7a tam gi\xE1c vu\xF4ng $MAB$.",
      "Nh\u1EADn ra \u0111i\u1EC1u \u0111\xF3 th\xEC c\u1EA3 ba \xFD \u0111\u1EC1u l\xE0 h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng, kh\xF4ng c\u1EA7n th\xEAm c\xF4ng c\u1EE5 n\xE0o kh\xE1c."
    ],
    solution: [
      "a) V\xEC $C$ thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle ACB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n).",
      "$MA$ l\xE0 ti\u1EBFp tuy\u1EBFn t\u1EA1i $A$ n\xEAn $MA\\perp OA$, m\xE0 $O\\in AB$ n\xEAn $MA\\perp AB$: tam gi\xE1c $MAB$ vu\xF4ng t\u1EA1i $A$.",
      "T\u1EEB $\\angle ACB=90\\deg$ suy ra $AC\\perp MB$, t\u1EE9c $AC$ l\xE0 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n $MB$ c\u1EE7a tam gi\xE1c $MAB$.",
      "Theo h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng: $MA^{2}=MC\\cdot MB$.",
      "b) C\u0169ng trong tam gi\xE1c vu\xF4ng $MAB$ v\u1EDBi \u0111\u01B0\u1EDDng cao $AC$, hai h\xECnh chi\u1EBFu c\u1EE7a hai c\u1EA1nh g\xF3c vu\xF4ng l\xEAn c\u1EA1nh huy\u1EC1n l\xE0 $MC$ v\xE0 $CB$.",
      "Theo h\u1EC7 th\u1EE9c $h^{2}=b'c'$ ta c\xF3 $AC^{2}=MC\\cdot CB$.",
      "c) V\u1EDBi $MA=R\\s{3}$ v\xE0 $AB=2R$, \xE1p d\u1EE5ng \u0111\u1ECBnh l\xED Pythagore trong tam gi\xE1c $MAB$ vu\xF4ng t\u1EA1i $A$:",
      "$MB^{2}=MA^{2}+AB^{2}=3R^{2}+4R^{2}=7R^{2}\\Rightarrow MB=R\\s{7}$.",
      "T\u1EEB $MA^{2}=MC\\cdot MB$: $MC=\\f{MA^{2}}{MB}=\\f{3R^{2}}{R\\s{7}}=\\f{3R}{\\s{7}}=\\f{3R\\s{7}}{7}$.",
      "T\u1EEB $AB^{2}=BC\\cdot BM$: $BC=\\f{AB^{2}}{MB}=\\f{4R^{2}}{R\\s{7}}=\\f{4R\\s{7}}{7}$.",
      "Ki\u1EC3m tra: $MC+BC=\\f{3R\\s{7}+4R\\s{7}}{7}=\\f{7R\\s{7}}{7}=R\\s{7}=MB$ \u2713"
    ]
  }
];
var BANK_G9_HINH = [
  {
    id: "g9.hinh-thi-vao-10",
    topicId: "g9-t6",
    grade: 9,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "C\xE2u h\xECnh thi v\xE0o 10 \u2014 b\xE0i nhi\u1EC1u \xFD",
    build: (r) => {
      const p = r.pick(PROBLEMS);
      return {
        stem: p.stem,
        answer: "",
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: "\xDD a v\xE0 b lu\xF4n l\xE0m \u0111\u01B0\u1EE3c \u2014 ph\u1EA3i l\u1EA5y tr\u1ECDn \u0111i\u1EC3m hai \xFD n\xE0y tr\u01B0\u1EDBc khi ngh\u0129 t\u1EDBi \xFD cu\u1ED1i."
      };
    }
  }
];

// src/bank/g7-hinh.ts
var PROBLEMS2 = [
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ c\xF3 $AB<AC$. Tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $A$ c\u1EAFt c\u1EA1nh $BC$ t\u1EA1i \u0111i\u1EC3m $I$. Tr\xEAn c\u1EA1nh $AC$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $AD=AB$.\n\na) Ch\u1EE9ng minh $IB=ID$.\n\nb) Tia $DI$ c\u1EAFt tia $AB$ t\u1EA1i \u0111i\u1EC3m $E$. Ch\u1EE9ng minh $\\tri IBE=\\tri IDC$, t\u1EEB \u0111\xF3 suy ra $BD\\para CE$.\n\nc) G\u1ECDi $H$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $EC$. Ch\u1EE9ng minh $AH\\perp BD$.\n\nd) Cho $\\angle ABC=2\\angle ACB$. Ch\u1EE9ng minh $AB+BI=AC$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 gi\u1EA3 thi\u1EBFt \u2013 k\u1EBFt lu\u1EADn", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri ABI=\\tri ADI$ (c.g.c) \u2192 $IB=ID$", points: 1 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri IBE=\\tri IDC$ (g.c.g)", points: 0.5 },
      { criterion: "\xDD b: suy ra $AE=AC$, tam gi\xE1c $AEC$ c\xE2n, d\xF9ng g\xF3c \u0111\u1ED3ng v\u1ECB \u0111\u1EC3 k\u1EBFt lu\u1EADn $BD\\para CE$", points: 0.5 },
      { criterion: "\xDD c: $AH$ l\xE0 ph\xE2n gi\xE1c c\u1EE7a tam gi\xE1c c\xE2n $AEC$ n\xEAn $AH\\perp EC$, k\u1EBFt h\u1EE3p $BD\\para CE$", points: 0.5 },
      { criterion: "\xDD d: l\u1EA5y $AK=AB$ tr\xEAn $AC$, ch\u1EE9ng minh $KI=KC$ \u0111\u1EC3 suy ra $AB+BI=AC$", points: 0.5 }
    ],
    thinking: [
      "B\xE0i m\u1EDF \u0111\u1EA7u b\u1EB1ng **ph\xE2n gi\xE1c + hai c\u1EA1nh b\u1EB1ng nhau** \u2014 \u0111\xF3 \u0111\xFAng l\xE0 b\u1ED9 ba d\u1EEF ki\u1EC7n c\u1EE7a tr\u01B0\u1EDDng h\u1EE3p c.g.c. Gh\xE9p ngay $\\tri ABI$ v\xE0 $\\tri ADI$.",
      "\xDD b: sau khi c\xF3 $IB=ID$, h\xE3y t\xECm th\xEAm m\u1ED9t c\u1EB7p g\xF3c b\u1EB1ng nhau. G\xF3c $\\angle BIE$ v\xE0 $\\angle DIC$ **\u0111\u1ED1i \u0111\u1EC9nh**, c\xF2n $\\angle IBE$ v\xE0 $\\angle IDC$ **k\u1EC1 b\xF9** v\u1EDBi hai g\xF3c b\u1EB1ng nhau \u1EDF \xFD a.",
      "\xDD c v\xE0 d \u0111\u1EC1u d\u1EF1a tr\xEAn **tam gi\xE1c c\xE2n**: $AE=AC$ \u1EDF \xFD b cho tam gi\xE1c c\xE2n $AEC$, v\xE0 trong tam gi\xE1c c\xE2n, ph\xE2n gi\xE1c \u0111\u1EC9nh \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao.",
      "\xDD d l\xE0 m\u1EB9o quen thu\u1ED9c: mu\u1ED1n ch\u1EE9ng minh **t\u1ED5ng hai \u0111o\u1EA1n b\u1EB1ng m\u1ED9t \u0111o\u1EA1n**, h\xE3y c\u1EAFt \u0111o\u1EA1n d\xE0i th\xE0nh \u0111\xFAng hai ph\u1EA7n r\u1ED3i ch\u1EE9ng minh t\u1EEBng ph\u1EA7n b\u1EB1ng nhau."
    ],
    solution: [
      "a) X\xE9t $\\tri ABI$ v\xE0 $\\tri ADI$ c\xF3: $AB=AD$ (gi\u1EA3 thi\u1EBFt); $\\angle BAI=\\angle DAI$ (v\xEC $AI$ l\xE0 ph\xE2n gi\xE1c g\xF3c $A$); $AI$ l\xE0 c\u1EA1nh chung.",
      "Do \u0111\xF3 $\\tri ABI=\\tri ADI$ (c.g.c), suy ra $IB=ID$ (hai c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng).",
      "b) T\u1EEB $\\tri ABI=\\tri ADI$ ta c\xF2n c\xF3 $\\angle ABI=\\angle ADI$, n\xEAn hai g\xF3c k\u1EC1 b\xF9 c\u1EE7a ch\xFAng c\u0169ng b\u1EB1ng nhau: $\\angle IBE=\\angle IDC$.",
      "X\xE9t $\\tri IBE$ v\xE0 $\\tri IDC$: $\\angle IBE=\\angle IDC$ (v\u1EEBa ch\u1EE9ng minh); $IB=ID$ (\xFD a); $\\angle BIE=\\angle DIC$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh).",
      "V\u1EADy $\\tri IBE=\\tri IDC$ (g.c.g), suy ra $BE=DC$.",
      "Khi \u0111\xF3 $AE=AB+BE=AD+DC=AC$, n\xEAn tam gi\xE1c $AEC$ c\xE2n t\u1EA1i $A$.",
      "Tam gi\xE1c $ABD$ c\u0169ng c\xE2n t\u1EA1i $A$ (v\xEC $AB=AD$). Hai tam gi\xE1c c\xE2n $ABD$ v\xE0 $AEC$ c\xF3 chung g\xF3c \u1EDF \u0111\u1EC9nh $A$ n\xEAn $\\angle ABD=\\angle AEC=\\f{180\\deg-\\angle A}{2}$.",
      "Hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED **\u0111\u1ED3ng v\u1ECB** \u0111\u1ED1i v\u1EDBi hai \u0111\u01B0\u1EDDng th\u1EB3ng $BD$, $EC$ v\xE0 c\xE1t tuy\u1EBFn $AE$, do \u0111\xF3 $BD\\para CE$.",
      "c) Tam gi\xE1c $AEC$ c\xE2n t\u1EA1i $A$, $H$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $EC$ n\xEAn $AH$ l\xE0 \u0111\u01B0\u1EDDng trung tuy\u1EBFn, \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao: $AH\\perp EC$.",
      "M\xE0 $BD\\para CE$ (\xFD b), n\xEAn $AH\\perp BD$.",
      "d) Tr\xEAn c\u1EA1nh $AC$ l\u1EA5y \u0111i\u1EC3m $K$ sao cho $AK=AB$. Khi \u0111\xF3 $K$ tr\xF9ng $D$ (v\xEC $AD=AB$), n\xEAn ta x\xE9t lu\xF4n \u0111i\u1EC3m $D$.",
      "\u0110\u1EB7t $\\angle ACB=\\alpha$ th\xEC $\\angle ABC=2\\alpha$.",
      "T\u1EEB $\\tri ABI=\\tri ADI$ (\xFD a) ta c\xF3 $\\angle ADI=\\angle ABI=\\angle ABC=2\\alpha$.",
      "$\\angle IDC$ k\u1EC1 b\xF9 v\u1EDBi $\\angle ADI$ n\xEAn $\\angle IDC=180\\deg-2\\alpha$; trong tam gi\xE1c $IDC$: $\\angle DIC=180\\deg-\\angle IDC-\\angle DCI=180\\deg-(180\\deg-2\\alpha)-\\alpha=\\alpha$.",
      "V\u1EADy $\\angle DIC=\\angle DCI=\\alpha$, tam gi\xE1c $DIC$ c\xE2n t\u1EA1i $D$, suy ra $DI=DC$.",
      "K\u1EBFt h\u1EE3p $IB=ID$ (\xFD a): $AB+BI=AD+DI=AD+DC=AC$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$. G\u1ECDi $E$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $EA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $ED=EA$.\n\na) Ch\u1EE9ng minh $\\tri AEB=\\tri DEC$.\n\nb) Ch\u1EE9ng minh $AC\\para BD$.\n\nc) K\u1EBB $EI\\perp AC$ t\u1EA1i $I$ v\xE0 $EK\\perp BD$ t\u1EA1i $K$. Ch\u1EE9ng minh $\\tri AIE=\\tri DKE$.\n\nd) Ch\u1EE9ng minh ba \u0111i\u1EC3m $I$, $E$, $K$ th\u1EB3ng h\xE0ng.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 k\xFD hi\u1EC7u", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri AEB=\\tri DEC$ (c.g.c) v\u1EDBi g\xF3c \u0111\u1ED1i \u0111\u1EC9nh t\u1EA1i $E$", points: 1 },
      { criterion: "\xDD b: t\u1EEB hai g\xF3c so le trong b\u1EB1ng nhau suy ra $AC\\para BD$", points: 0.75 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\tri AIE=\\tri DKE$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn)", points: 0.75 },
      { criterion: "\xDD d: ch\u1EE9ng minh $\\angle IEA=\\angle KED$ r\u1ED3i d\xF9ng g\xF3c \u0111\u1ED1i \u0111\u1EC9nh \u0111\u1EC3 k\u1EBFt lu\u1EADn th\u1EB3ng h\xE0ng", points: 0.5 }
    ],
    thinking: [
      'C\u1EA5u h\xECnh "trung \u0111i\u1EC3m + k\xE9o d\xE0i g\u1EA5p \u0111\xF4i" lu\xF4n cho ngay m\u1ED9t c\u1EB7p tam gi\xE1c b\u1EB1ng nhau theo c.g.c v\u1EDBi **g\xF3c \u0111\u1ED1i \u0111\u1EC9nh** \u1EDF gi\u1EEFa. \u0110\xE2y l\xE0 m\xF4 h\xECnh ph\u1EA3i nh\u1EADn ra trong 5 gi\xE2y.',
      "C\xF3 hai tam gi\xE1c b\u1EB1ng nhau th\xEC l\u1EADp t\u1EE9c thu ho\u1EA1ch: c\xE1c c\u1EB7p c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng ($AB=CD$, $AC=BD$) v\xE0 c\xE1c c\u1EB7p g\xF3c so le trong \u2014 ch\xEDnh l\xE0 ch\xECa kho\xE1 cho \xFD b.",
      "\xDD c l\xE0 tam gi\xE1c vu\xF4ng, n\xEAn d\xF9ng tr\u01B0\u1EDDng h\u1EE3p ri\xEAng **c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn** thay v\xEC \u0111i t\xECm \u0111\u1EE7 ba y\u1EBFu t\u1ED1.",
      "\xDD d: mu\u1ED1n ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng qua m\u1ED9t \u0111i\u1EC3m gi\u1EEFa, h\xE3y ch\u1EE9ng minh hai tia \u0111\u1ED1i nhau \u2014 th\u01B0\u1EDDng b\u1EB1ng c\xE1ch ch\u1EC9 ra hai g\xF3c **\u0111\u1ED1i \u0111\u1EC9nh** ho\u1EB7c t\u1ED5ng hai g\xF3c k\u1EC1 b\u1EB1ng $180\\deg$."
    ],
    solution: [
      "a) X\xE9t $\\tri AEB$ v\xE0 $\\tri DEC$ c\xF3: $EA=ED$ (gi\u1EA3 thi\u1EBFt); $\\angle AEB=\\angle DEC$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh); $EB=EC$ ($E$ l\xE0 trung \u0111i\u1EC3m $BC$).",
      "Do \u0111\xF3 $\\tri AEB=\\tri DEC$ (c.g.c).",
      "b) X\xE9t t\u01B0\u01A1ng t\u1EF1 $\\tri AEC$ v\xE0 $\\tri DEB$: $EA=ED$; $\\angle AEC=\\angle DEB$ (\u0111\u1ED1i \u0111\u1EC9nh); $EC=EB$.",
      "V\u1EADy $\\tri AEC=\\tri DEB$ (c.g.c), suy ra $\\angle EAC=\\angle EDB$.",
      "Hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED **so le trong** \u0111\u1ED1i v\u1EDBi hai \u0111\u01B0\u1EDDng th\u1EB3ng $AC$, $BD$ v\xE0 c\xE1t tuy\u1EBFn $AD$, n\xEAn $AC\\para BD$.",
      "T\u1EEB hai tam gi\xE1c b\u1EB1ng nhau \u1EDF tr\xEAn ta c\u0169ng c\xF3 $AC=DB$.",
      "c) X\xE9t hai tam gi\xE1c vu\xF4ng $AIE$ (vu\xF4ng t\u1EA1i $I$) v\xE0 $DKE$ (vu\xF4ng t\u1EA1i $K$):",
      "$EA=ED$ (gi\u1EA3 thi\u1EBFt) \u2014 \u0111\xE2y l\xE0 hai c\u1EA1nh huy\u1EC1n;",
      "$\\angle EAI=\\angle EDK$ (ch\xEDnh l\xE0 $\\angle EAC=\\angle EDB$ \u0111\xE3 ch\u1EE9ng minh \u1EDF \xFD b).",
      "Do \u0111\xF3 $\\tri AIE=\\tri DKE$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn), suy ra $EI=EK$.",
      "d) T\u1EEB $\\tri AIE=\\tri DKE$ ta c\xF3 $\\angle AEI=\\angle DEK$ (hai g\xF3c t\u01B0\u01A1ng \u1EE9ng).",
      "M\u1EB7t kh\xE1c $A$, $E$, $D$ th\u1EB3ng h\xE0ng n\xEAn $\\angle AEI$ v\xE0 $\\angle DEI$ k\u1EC1 b\xF9: $\\angle AEI+\\angle DEI=180\\deg$.",
      "Thay $\\angle AEI=\\angle DEK$ ta \u0111\u01B0\u1EE3c $\\angle DEK+\\angle DEI=180\\deg$, t\u1EE9c $\\angle IEK=180\\deg$.",
      "V\u1EADy ba \u0111i\u1EC3m $I$, $E$, $K$ th\u1EB3ng h\xE0ng. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$. Tr\xEAn c\u1EA1nh $BC$ l\u1EA5y hai \u0111i\u1EC3m $D$, $E$ sao cho $BD=CE<\\f{BC}{2}$. Qua $D$ k\u1EBB \u0111\u01B0\u1EDDng th\u1EB3ng vu\xF4ng g\xF3c v\u1EDBi $BC$, c\u1EAFt $AB$ t\u1EA1i $M$. Qua $E$ k\u1EBB \u0111\u01B0\u1EDDng th\u1EB3ng vu\xF4ng g\xF3c v\u1EDBi $BC$, c\u1EAFt $AC$ t\u1EA1i $N$.\n\na) Ch\u1EE9ng minh $DM=EN$.\n\nb) Ch\u1EE9ng minh $EM=DN$.\n\nc) Ch\u1EE9ng minh tam gi\xE1c $ADE$ c\xE2n.\n\nd) Ch\u1EE9ng minh $MN\\para BC$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi r\xF5 hai \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri BDM=\\tri CEN$ (c\u1EA1nh g\xF3c vu\xF4ng \u2013 g\xF3c nh\u1ECDn k\u1EC1)", points: 1 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri MDE=\\tri NED$ (c.g.c) \u2192 $EM=DN$", points: 0.75 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\tri ABD=\\tri ACE$ (c.g.c) \u2192 $AD=AE$", points: 0.75 },
      { criterion: "\xDD d: ch\u1EE9ng minh $AM=AN$ r\u1ED3i d\xF9ng hai tam gi\xE1c c\xE2n chung \u0111\u1EC9nh $A$", points: 0.5 }
    ],
    thinking: [
      'Tam gi\xE1c c\xE2n cho ngay hai g\xF3c \u0111\xE1y b\u1EB1ng nhau \u2014 \u0111\xF3 l\xE0 "g\xF3c nh\u1ECDn" c\u1EA7n thi\u1EBFt \u0111\u1EC3 gh\xE9p hai tam gi\xE1c vu\xF4ng \u1EDF \xFD a.',
      "\xDD b kh\xF4ng c\u1EA7n d\u1EF1ng th\xEAm g\xEC: hai tam gi\xE1c $MDE$ v\xE0 $NED$ d\xF9ng chung c\u1EA1nh $DE$, c\xF3 $DM=EN$ (\xFD a) v\xE0 hai g\xF3c vu\xF4ng xen gi\u1EEFa.",
      "\xDD c: $BD=CE$ c\u1ED9ng v\u1EDBi $AB=AC$ v\xE0 hai g\xF3c \u0111\xE1y b\u1EB1ng nhau ch\xEDnh l\xE0 b\u1ED9 c.g.c.",
      '\xDD d: m\u1ECDi b\xE0i "ch\u1EE9ng minh song song v\u1EDBi \u0111\xE1y tam gi\xE1c c\xE2n" \u0111\u1EC1u quy v\u1EC1 vi\u1EC7c ch\u1EC9 ra tam gi\xE1c nh\u1ECF c\u0169ng c\xE2n t\u1EA1i c\xF9ng \u0111\u1EC9nh $A$, r\u1ED3i so s\xE1nh hai g\xF3c \u0111\xE1y (\u0111\u1ED3ng v\u1ECB).'
    ],
    solution: [
      "a) Tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$ n\xEAn $\\angle ABC=\\angle ACB$, t\u1EE9c $\\angle MBD=\\angle NCE$.",
      "X\xE9t hai tam gi\xE1c vu\xF4ng $BDM$ (vu\xF4ng t\u1EA1i $D$) v\xE0 $CEN$ (vu\xF4ng t\u1EA1i $E$):",
      "$BD=CE$ (gi\u1EA3 thi\u1EBFt); $\\angle MBD=\\angle NCE$ (v\u1EEBa ch\u1EE9ng minh).",
      "Do \u0111\xF3 $\\tri BDM=\\tri CEN$ (c\u1EA1nh g\xF3c vu\xF4ng \u2013 g\xF3c nh\u1ECDn k\u1EC1), suy ra $DM=EN$ v\xE0 $BM=CN$.",
      "b) V\xEC $MD\\perp BC$ v\xE0 $NE\\perp BC$ n\xEAn $\\angle MDE=\\angle NED=90\\deg$.",
      "X\xE9t $\\tri MDE$ v\xE0 $\\tri NED$: $DM=EN$ (\xFD a); $\\angle MDE=\\angle NED=90\\deg$; $DE$ l\xE0 c\u1EA1nh chung.",
      "V\u1EADy $\\tri MDE=\\tri NED$ (c.g.c), suy ra $ME=ND$, t\u1EE9c $EM=DN$.",
      "c) X\xE9t $\\tri ABD$ v\xE0 $\\tri ACE$: $AB=AC$ (tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$); $\\angle ABD=\\angle ACE$ (hai g\xF3c \u0111\xE1y); $BD=CE$ (gi\u1EA3 thi\u1EBFt).",
      "Do \u0111\xF3 $\\tri ABD=\\tri ACE$ (c.g.c), suy ra $AD=AE$. V\u1EADy tam gi\xE1c $ADE$ c\xE2n t\u1EA1i $A$.",
      "d) T\u1EEB \xFD a ta c\xF3 $BM=CN$, m\xE0 $AB=AC$, n\xEAn $AM=AB-BM=AC-CN=AN$.",
      "V\u1EADy tam gi\xE1c $AMN$ c\xE2n t\u1EA1i $A$, do \u0111\xF3 $\\angle AMN=\\f{180\\deg-\\angle A}{2}$.",
      "Tam gi\xE1c $ABC$ c\u0169ng c\xE2n t\u1EA1i $A$ n\xEAn $\\angle ABC=\\f{180\\deg-\\angle A}{2}$.",
      "Suy ra $\\angle AMN=\\angle ABC$; hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED \u0111\u1ED3ng v\u1ECB \u0111\u1ED1i v\u1EDBi $MN$, $BC$ v\xE0 c\xE1t tuy\u1EBFn $AB$.",
      "V\u1EADy $MN\\para BC$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, c\xF3 $BM$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $B$ ($M\\in AC$). K\u1EBB $MD\\perp BC$ t\u1EA1i $D$. K\xE9o d\xE0i $MD$ c\u1EAFt $AB$ t\u1EA1i $E$.\n\na) Ch\u1EE9ng minh $BA=BD$.\n\nb) Ch\u1EE9ng minh $\\tri ABC=\\tri DBE$.\n\nc) Ch\u1EE9ng minh $BM$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n $AD$.\n\nd) Ch\u1EE9ng minh ba \u0111i\u1EC3m $B$, $M$ v\xE0 trung \u0111i\u1EC3m $N$ c\u1EE7a $EC$ th\u1EB3ng h\xE0ng.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri ABM=\\tri DBM$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn) \u2192 $BA=BD$", points: 1 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri ABC=\\tri DBE$ (g.c.g)", points: 0.75 },
      { criterion: "\xDD c: t\u1EEB $BA=BD$ v\xE0 $MA=MD$ suy ra $BM$ l\xE0 trung tr\u1EF1c c\u1EE7a $AD$", points: 0.75 },
      { criterion: "\xDD d: ch\u1EE9ng minh $M$ l\xE0 tr\u1EF1c t\xE2m $\\tri BEC$, k\u1EBFt h\u1EE3p $BE=BC$ \u0111\u1EC3 k\u1EBFt lu\u1EADn", points: 0.5 }
    ],
    thinking: [
      "\u0110i\u1EC3m n\u1EB1m tr\xEAn tia ph\xE2n gi\xE1c th\xEC **c\xE1ch \u0111\u1EC1u hai c\u1EA1nh c\u1EE7a g\xF3c** \u2014 \u0111\xF3 l\xE0 l\xED do $MA=MD$, v\xE0 hai tam gi\xE1c vu\xF4ng $ABM$, $DBM$ b\u1EB1ng nhau theo c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn.",
      "Nh\u1EDB t\xEDnh ch\u1EA5t tr\u1EE5c: hai \u0111i\u1EC3m c\xF9ng c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u m\u1ED9t \u0111o\u1EA1n th\u1EB3ng th\xEC \u0111\u01B0\u1EDDng n\u1ED1i ch\xFAng l\xE0 **\u0111\u01B0\u1EDDng trung tr\u1EF1c** c\u1EE7a \u0111o\u1EA1n \u1EA5y. \xDD c ch\u1EC9 c\u1EA7n \u0111\xFAng hai \u0111i\u1EC3m $B$ v\xE0 $M$.",
      "\xDD d l\xE0 c\xE2u ph\xE2n lo\u1EA1i: trong tam gi\xE1c $BEC$, $CA$ v\xE0 $ED$ l\xE0 hai \u0111\u01B0\u1EDDng cao c\u1EAFt nhau t\u1EA1i $M$, n\xEAn $M$ l\xE0 **tr\u1EF1c t\xE2m**, k\xE9o theo $BM\\perp EC$.",
      "K\u1EBFt h\u1EE3p $BE=BC$ (tam gi\xE1c $BEC$ c\xE2n t\u1EA1i $B$): \u0111\u01B0\u1EDDng cao t\u1EEB $B$ c\u0169ng l\xE0 trung tuy\u1EBFn, n\xEAn \u0111i qua trung \u0111i\u1EC3m $N$ c\u1EE7a $EC$."
    ],
    solution: [
      "a) X\xE9t hai tam gi\xE1c vu\xF4ng $ABM$ (vu\xF4ng t\u1EA1i $A$) v\xE0 $DBM$ (vu\xF4ng t\u1EA1i $D$):",
      "$BM$ l\xE0 c\u1EA1nh huy\u1EC1n chung; $\\angle ABM=\\angle DBM$ (v\xEC $BM$ l\xE0 ph\xE2n gi\xE1c g\xF3c $B$).",
      "Do \u0111\xF3 $\\tri ABM=\\tri DBM$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn), suy ra $BA=BD$ v\xE0 $MA=MD$.",
      "b) X\xE9t $\\tri ABC$ v\xE0 $\\tri DBE$: $\\angle BAC=\\angle BDE=90\\deg$; $BA=BD$ (\xFD a); $\\angle ABC=\\angle DBE$ (ch\xEDnh l\xE0 g\xF3c $B$, chung).",
      "V\u1EADy $\\tri ABC=\\tri DBE$ (g.c.g), suy ra $BC=BE$ v\xE0 $AC=DE$.",
      "c) T\u1EEB \xFD a: $BA=BD$ n\xEAn $B$ c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u m\xFAt c\u1EE7a \u0111o\u1EA1n $AD$; $MA=MD$ n\xEAn $M$ c\u0169ng c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u m\xFAt c\u1EE7a $AD$.",
      "Hai \u0111i\u1EC3m ph\xE2n bi\u1EC7t c\xF9ng c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u m\u1ED9t \u0111o\u1EA1n th\u1EB3ng th\xEC \u0111\u01B0\u1EDDng th\u1EB3ng qua ch\xFAng l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n \u0111\xF3.",
      "V\u1EADy $BM$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $AD$.",
      "d) X\xE9t tam gi\xE1c $BEC$: $CA\\perp BE$ (v\xEC $\\angle BAC=90\\deg$ v\xE0 $A\\in BE$) n\xEAn $CA$ l\xE0 m\u1ED9t \u0111\u01B0\u1EDDng cao;",
      "$ED\\perp BC$ (v\xEC $MD\\perp BC$ v\xE0 $E$, $M$, $D$ th\u1EB3ng h\xE0ng) n\xEAn $ED$ l\xE0 \u0111\u01B0\u1EDDng cao th\u1EE9 hai.",
      "Hai \u0111\u01B0\u1EDDng cao $CA$ v\xE0 $ED$ c\u1EAFt nhau t\u1EA1i $M$, n\xEAn $M$ l\xE0 **tr\u1EF1c t\xE2m** c\u1EE7a tam gi\xE1c $BEC$; do \u0111\xF3 $BM\\perp EC$.",
      "M\u1EB7t kh\xE1c t\u1EEB \xFD b, $BE=BC$ n\xEAn tam gi\xE1c $BEC$ c\xE2n t\u1EA1i $B$.",
      "Trong tam gi\xE1c c\xE2n, \u0111\u01B0\u1EDDng cao h\u1EA1 t\u1EEB \u0111\u1EC9nh c\xE2n \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng trung tuy\u1EBFn, n\xEAn \u0111\u01B0\u1EDDng th\u1EB3ng $BM$ \u0111i qua trung \u0111i\u1EC3m $N$ c\u1EE7a $EC$.",
      "V\u1EADy ba \u0111i\u1EC3m $B$, $M$, $N$ th\u1EB3ng h\xE0ng. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ nh\u1ECDn c\xF3 $AB<AC$. G\u1ECDi $I$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a tia ph\xE2n gi\xE1c g\xF3c $B$ v\xE0 tia ph\xE2n gi\xE1c g\xF3c $C$. T\u1EEB $I$ l\u1EA7n l\u01B0\u1EE3t k\u1EBB c\xE1c \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c v\u1EDBi $BC$, $CA$, $AB$ t\u1EA1i $M$, $N$, $P$.\n\na) Ch\u1EE9ng minh $BM=BP$.\n\nb) Ch\u1EE9ng minh $IM=IN$.\n\nc) Ch\u1EE9ng minh $BP+CN=BC$.\n\nd) Ch\u1EE9ng minh $AI$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $BAC$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi r\xF5 ba ch\xE2n \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri BPI=\\tri BMI$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn)", points: 1 },
      { criterion: "\xDD b: ch\u1EE9ng minh $IM=IP$ v\xE0 $IM=IN$ qua hai c\u1EB7p tam gi\xE1c vu\xF4ng b\u1EB1ng nhau", points: 0.75 },
      { criterion: "\xDD c: c\u1ED9ng $BM+MC$ v\xE0 thay b\u1EB1ng $BP$, $CN$", points: 0.75 },
      { criterion: "\xDD d: ch\u1EE9ng minh $IP=IN$ r\u1ED3i d\xF9ng \u0111\u1ECBnh l\xED \u0111\u1EA3o v\u1EC1 tia ph\xE2n gi\xE1c", points: 0.5 }
    ],
    thinking: [
      "To\xE0n b\u1ED9 b\xE0i ch\u1EC9 xoay quanh **m\u1ED9t \u0111\u1ECBnh l\xED**: \u0111i\u1EC3m n\u1EB1m tr\xEAn tia ph\xE2n gi\xE1c c\u1EE7a m\u1ED9t g\xF3c th\xEC c\xE1ch \u0111\u1EC1u hai c\u1EA1nh c\u1EE7a g\xF3c \u0111\xF3 \u2014 v\xE0 \u0111\u1ECBnh l\xED \u0111\u1EA3o c\u1EE7a n\xF3.",
      "$I$ n\u1EB1m tr\xEAn ph\xE2n gi\xE1c g\xF3c $B$ \u21D2 $IP=IM$. $I$ n\u1EB1m tr\xEAn ph\xE2n gi\xE1c g\xF3c $C$ \u21D2 $IM=IN$. Gh\xE9p l\u1EA1i: $IP=IN$.",
      "\xDD c ch\u1EC9 l\xE0 ph\xE9p c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng: $M$ n\u1EB1m gi\u1EEFa $B$ v\xE0 $C$ n\xEAn $BC=BM+MC$, m\xE0 $BM=BP$ v\xE0 $MC=CN$.",
      "\xDD d d\xF9ng **\u0111\u1ECBnh l\xED \u0111\u1EA3o**: $I$ c\xE1ch \u0111\u1EC1u hai c\u1EA1nh $AB$, $AC$ (v\xEC $IP=IN$) v\xE0 n\u1EB1m trong g\xF3c $A$, n\xEAn $AI$ l\xE0 ph\xE2n gi\xE1c g\xF3c $A$. \u0110\xE2y ch\xEDnh l\xE0 ch\u1EE9ng minh ba ph\xE2n gi\xE1c \u0111\u1ED3ng quy."
    ],
    solution: [
      "a) X\xE9t hai tam gi\xE1c vu\xF4ng $BPI$ (vu\xF4ng t\u1EA1i $P$) v\xE0 $BMI$ (vu\xF4ng t\u1EA1i $M$):",
      "$BI$ l\xE0 c\u1EA1nh huy\u1EC1n chung; $\\angle PBI=\\angle MBI$ (v\xEC $BI$ l\xE0 ph\xE2n gi\xE1c g\xF3c $B$).",
      "Do \u0111\xF3 $\\tri BPI=\\tri BMI$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn), suy ra $BP=BM$ v\xE0 $IP=IM$.",
      "b) T\u01B0\u01A1ng t\u1EF1, x\xE9t hai tam gi\xE1c vu\xF4ng $CMI$ (vu\xF4ng t\u1EA1i $M$) v\xE0 $CNI$ (vu\xF4ng t\u1EA1i $N$):",
      "$CI$ l\xE0 c\u1EA1nh huy\u1EC1n chung; $\\angle MCI=\\angle NCI$ (v\xEC $CI$ l\xE0 ph\xE2n gi\xE1c g\xF3c $C$).",
      "V\u1EADy $\\tri CMI=\\tri CNI$ (c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn), suy ra $CM=CN$ v\xE0 $IM=IN$.",
      "c) V\xEC $I$ n\u1EB1m trong tam gi\xE1c n\xEAn $M$ n\u1EB1m gi\u1EEFa $B$ v\xE0 $C$, do \u0111\xF3 $BC=BM+MC$.",
      "Thay $BM=BP$ (\xFD a) v\xE0 $MC=CN$ (\xFD b) ta \u0111\u01B0\u1EE3c $BC=BP+CN$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "d) T\u1EEB \xFD a: $IP=IM$; t\u1EEB \xFD b: $IM=IN$. Suy ra $IP=IN$.",
      "$IP$ l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB $I$ \u0111\u1EBFn $AB$, $IN$ l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB $I$ \u0111\u1EBFn $AC$; hai kho\u1EA3ng c\xE1ch n\xE0y b\u1EB1ng nhau v\xE0 $I$ n\u1EB1m trong g\xF3c $BAC$.",
      "Theo \u0111\u1ECBnh l\xED \u0111\u1EA3o v\u1EC1 tia ph\xE2n gi\xE1c, $AI$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a g\xF3c $BAC$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "H\u1EC7 qu\u1EA3: ba \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c c\u1EE7a tam gi\xE1c $ABC$ c\xF9ng \u0111i qua \u0111i\u1EC3m $I$ \u2014 \u0111\xF3 l\xE0 t\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp tam gi\xE1c."
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ ($AC<AB$). D\u1EF1ng $AH\\perp BC$ t\u1EA1i $H$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $HA$ l\u1EA5y \u0111i\u1EC3m $E$ sao cho $HE=HA$.\n\na) Ch\u1EE9ng minh $\\tri CHA=\\tri CHE$ v\xE0 tam gi\xE1c $CAE$ c\xE2n t\u1EA1i $C$.\n\nb) Ch\u1EE9ng minh $CB$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $AE$ v\xE0 tam gi\xE1c $CBE$ vu\xF4ng t\u1EA1i $E$.\n\nc) G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$; tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $MA=MD$. Ch\u1EE9ng minh $BD=CE$.\n\nd) Ch\u1EE9ng minh $AM=\\f{CB}{2}$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri CHA=\\tri CHE$ (c.g.c) \u2192 $CA=CE$", points: 1 },
      { criterion: "\xDD b: d\xF9ng $HA=HE$ v\xE0 $CB\\perp AE$ \u0111\u1EC3 k\u1EBFt lu\u1EADn trung tr\u1EF1c; suy ra $\\angle CEB=90\\deg$", points: 0.75 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\tri MAC=\\tri MDB$ (c.g.c) \u2192 $BD=CA=CE$", points: 0.75 },
      { criterion: "\xDD d: ch\u1EE9ng minh $ABDC$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt (ho\u1EB7c d\xF9ng trung tuy\u1EBFn \u1EE9ng c\u1EA1nh huy\u1EC1n)", points: 0.5 }
    ],
    thinking: [
      'C\u1EA5u h\xECnh "l\u1EA5y \u0111i\u1EC3m \u0111\u1ED1i x\u1EE9ng qua ch\xE2n \u0111\u01B0\u1EDDng cao" cho ngay hai tam gi\xE1c b\u1EB1ng nhau theo c.g.c v\u1EDBi c\u1EA1nh chung l\xE0 \u0111\u01B0\u1EDDng cao.',
      "\xDD b: \u0111\u01B0\u1EDDng trung tr\u1EF1c ch\u1EC9 c\u1EA7n hai \u0111i\u1EC1u \u2014 **\u0111i qua trung \u0111i\u1EC3m** v\xE0 **vu\xF4ng g\xF3c**. C\u1EA3 hai \u0111\xE3 c\xF3 s\u1EB5n t\u1EEB gi\u1EA3 thi\u1EBFt $HE=HA$ v\xE0 $AH\\perp BC$.",
      '\xDD c l\u1EA1i l\xE0 m\xF4 h\xECnh "trung \u0111i\u1EC3m + k\xE9o d\xE0i g\u1EA5p \u0111\xF4i" v\u1EDBi g\xF3c \u0111\u1ED1i \u0111\u1EC9nh t\u1EA1i $M$ \u2014 ho\xE0n to\xE0n gi\u1ED1ng b\xE0i 2.',
      "\xDD d l\xE0 t\xEDnh ch\u1EA5t n\u1EC1n t\u1EA3ng: **trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n c\u1EE7a tam gi\xE1c vu\xF4ng b\u1EB1ng n\u1EEDa c\u1EA1nh huy\u1EC1n**. Ta ch\u1EE9ng minh l\u1EA1i n\xF3 b\u1EB1ng ch\xEDnh c\u1EA5u h\xECnh \u1EDF \xFD c."
    ],
    solution: [
      "a) X\xE9t $\\tri CHA$ v\xE0 $\\tri CHE$: $HA=HE$ (gi\u1EA3 thi\u1EBFt); $\\angle CHA=\\angle CHE=90\\deg$ (v\xEC $AH\\perp BC$); $CH$ l\xE0 c\u1EA1nh chung.",
      "Do \u0111\xF3 $\\tri CHA=\\tri CHE$ (c.g.c), suy ra $CA=CE$. V\u1EADy tam gi\xE1c $CAE$ c\xE2n t\u1EA1i $C$.",
      "b) \u0110\u01B0\u1EDDng th\u1EB3ng $CB$ ch\u1EE9a $H$ \u2014 trung \u0111i\u1EC3m c\u1EE7a $AE$ (v\xEC $HA=HE$) \u2014 v\xE0 $CB\\perp AE$ (v\xEC $AH\\perp BC$).",
      "V\u1EADy $CB$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n $AE$.",
      "Do $B$ n\u1EB1m tr\xEAn trung tr\u1EF1c c\u1EE7a $AE$ n\xEAn $BA=BE$; x\xE9t $\\tri BAC$ v\xE0 $\\tri BEC$ c\xF3 $BA=BE$, $CA=CE$ (\xFD a), $BC$ chung.",
      "V\u1EADy $\\tri BAC=\\tri BEC$ (c.c.c), suy ra $\\angle BEC=\\angle BAC=90\\deg$: tam gi\xE1c $CBE$ vu\xF4ng t\u1EA1i $E$.",
      "c) X\xE9t $\\tri MAC$ v\xE0 $\\tri MDB$: $MA=MD$ (gi\u1EA3 thi\u1EBFt); $\\angle AMC=\\angle DMB$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh); $MC=MB$ ($M$ l\xE0 trung \u0111i\u1EC3m $BC$).",
      "Do \u0111\xF3 $\\tri MAC=\\tri MDB$ (c.g.c), suy ra $BD=CA$.",
      "K\u1EBFt h\u1EE3p $CA=CE$ (\xFD a) ta \u0111\u01B0\u1EE3c $BD=CE$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "d) T\u1EEB \xFD c, $\\tri MAC=\\tri MDB$ cho $\\angle MAC=\\angle MDB$; hai g\xF3c so le trong n\xEAn $AC\\para BD$.",
      "M\xE0 $AC\\perp AB$ n\xEAn $BD\\perp AB$, t\u1EE9c $\\angle ABD=90\\deg$.",
      "X\xE9t $\\tri ABD$ v\xE0 $\\tri BAC$: $\\angle ABD=\\angle BAC=90\\deg$; $BD=AC$ (\xFD c); $AB$ l\xE0 c\u1EA1nh chung.",
      "V\u1EADy $\\tri ABD=\\tri BAC$ (c.g.c), suy ra $AD=BC$.",
      "M\xE0 $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AD$ (v\xEC $MA=MD$), n\xEAn $AM=\\f{AD}{2}=\\f{BC}{2}=\\f{CB}{2}$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  }
];
var BANK_G7_HINH = [
  {
    id: "g7.hinh-tu-luan-hk",
    topicId: "g7-t5",
    grade: 7,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "C\xE2u h\xECnh t\u1EF1 lu\u1EADn h\u1ECDc k\xEC \u2014 b\xE0i nhi\u1EC1u \xFD",
    build: (r) => {
      const p = r.pick(PROBLEMS2);
      return {
        stem: p.stem,
        answer: "",
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: "\xDD a v\xE0 b c\u1EE7a c\xE2u h\xECnh lu\xF4n n\u1EB1m trong t\u1EA7m tay \u2014 v\u1EBD h\xECnh chu\u1EA9n v\xE0 l\u1EA5y tr\u1ECDn hai \xFD n\xE0y tr\u01B0\u1EDBc khi ngh\u0129 t\u1EDBi \xFD cu\u1ED1i."
      };
    }
  }
];

// src/bank/g8-decuong.ts
var sgn6 = (n) => n >= 0 ? `+${n}` : `${n}`;
var vn = (x) => String(x).replace(".", "{,}");
var co = (k) => k === 1 ? "" : k === -1 ? "-" : String(k);
var BANK_G8_DECUONG = [
  /* ----------- 1. Phương trình chứa mẫu số ----------- */
  {
    id: "g8.pt-chua-mau",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1EABu s\u1ED1",
    build: (r) => {
      const m = r.pick([2, 3, 4, 6]);
      const n = r.pick([2, 3, 4, 5, 6]);
      const a = r.int(1, 5), c = r.int(1, 5);
      const x0 = r.int(-5, 7);
      const e = r.int(-4, 6);
      const k = r.int(-2, 3);
      const d = n * k - c * x0;
      const b = m * e - a * x0 + m * k;
      const L = m * n;
      const heSo = n * a - m * c;
      if (heSo === 0 || Math.abs(b) > 60 || Math.abs(d) > 60) {
        return {
          stem: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\f{2x-1}{3}-\\f{x+2}{4}=1$.",
          answer: "22/5",
          thinking: [
            "B\u01B0\u1EDBc 1: t\xECm **BCNN c\u1EE7a c\xE1c m\u1EABu**, nh\xE2n hai v\u1EBF v\u1EDBi s\u1ED1 \u0111\xF3 \u0111\u1EC3 kh\u1EED m\u1EABu.",
            "B\u01B0\u1EDBc 2: b\u1ECF ngo\u1EB7c (d\u1EA5u tr\u1EEB tr\u01B0\u1EDBc ngo\u1EB7c \u0111\u1ED5i d\u1EA5u t\u1EA5t c\u1EA3 c\xE1c h\u1EA1ng t\u1EED), chuy\u1EC3n v\u1EBF, thu g\u1ECDn."
          ],
          solution: [
            "BCNN$(3;4)=12$. Nh\xE2n hai v\u1EBF v\u1EDBi $12$: $4(2x-1)-3(x+2)=12$.",
            "$8x-4-3x-6=12\\Leftrightarrow 5x=22\\Leftrightarrow x=\\f{22}{5}$."
          ],
          pitfall: "Nh\xE2n m\u1EABu v\xE0o v\u1EBF tr\xE1i m\xE0 qu\xEAn nh\xE2n v\xE0o v\u1EBF ph\u1EA3i l\xE0 l\u1ED7i m\u1EA5t \u0111i\u1EC3m ph\u1ED5 bi\u1EBFn."
        };
      }
      const veSau = L * e - (n * b - m * d);
      return {
        stem: `Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\f{${co(a)}x${sgn6(b)}}{${m}}-\\f{${co(c)}x${sgn6(d)}}{${n}}=${e}$.`,
        answer: String(x0),
        thinking: [
          "B\u01B0\u1EDBc 1: t\xECm **BCNN c\u1EE7a c\xE1c m\u1EABu**, nh\xE2n hai v\u1EBF v\u1EDBi s\u1ED1 \u0111\xF3 \u0111\u1EC3 kh\u1EED m\u1EABu.",
          "B\u01B0\u1EDBc 2: b\u1ECF ngo\u1EB7c \u2014 d\u1EA5u tr\u1EEB tr\u01B0\u1EDBc ngo\u1EB7c \u0111\u1ED5i d\u1EA5u **t\u1EA5t c\u1EA3** c\xE1c h\u1EA1ng t\u1EED b\xEAn trong.",
          "B\u01B0\u1EDBc 3: chuy\u1EC3n c\xE1c h\u1EA1ng t\u1EED ch\u1EE9a $x$ v\u1EC1 m\u1ED9t v\u1EBF, h\u1EB1ng s\u1ED1 v\u1EC1 v\u1EBF c\xF2n l\u1EA1i r\u1ED3i thu g\u1ECDn."
        ],
        solution: [
          `BCNN c\u1EE7a $${m}$ v\xE0 $${n}$ l\xE0 $${L}$. Nh\xE2n hai v\u1EBF v\u1EDBi $${L}$:`,
          `$${n}(${co(a)}x${sgn6(b)})-${m}(${co(c)}x${sgn6(d)})=${L * e}$.`,
          `$${co(n * a)}x${sgn6(n * b)}-${co(m * c)}x${sgn6(-m * d)}=${L * e}$.`,
          `$${co(heSo)}x=${veSau}\\Rightarrow x=${x0}$.`,
          `Th\u1EED l\u1EA1i v\u1EDBi $x=${x0}$: $\\f{${a * x0 + b}}{${m}}-\\f{${c * x0 + d}}{${n}}=${(a * x0 + b) / m}-(${(c * x0 + d) / n})=${e}$ \u2713`
        ],
        pitfall: "D\u1EA5u tr\u1EEB \u0111\u1EE9ng tr\u01B0\u1EDBc ph\xE2n th\u1EE9c ph\u1EA3i \u0111\u1ED5i d\u1EA5u **c\u1EA3 t\u1EED**, kh\xF4ng ch\u1EC9 h\u1EA1ng t\u1EED \u0111\u1EA7u."
      };
    }
  },
  /* ----------- 2. Lập phương trình — bài toán giảm giá ----------- */
  {
    id: "g8.lap-pt-giam-gia",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 b\xE0i to\xE1n gi\u1EA3m gi\xE1 ph\u1EA7n tr\u0103m",
    build: (r) => {
      const gA = r.int(8, 25);
      const gB = r.int(5, 20);
      const pA = r.pick([10, 15, 20, 25, 30]);
      let pB = r.pick([10, 15, 20, 25]);
      if (pB === pA) pB = pA === 10 ? 20 : 10;
      const tong = gA + gB;
      const traRaw = gA * (100 - pA) / 100 + gB * (100 - pB) / 100;
      const tra = Math.round(traRaw * 1e3) / 1e3;
      return {
        stem: `T\u1ED5ng gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a m\u1ED9t chi\u1EBFc tivi lo\u1EA1i A v\xE0 m\u1ED9t chi\u1EBFc t\u1EE7 l\u1EA1nh lo\u1EA1i B l\xE0 $${tong}$ tri\u1EC7u \u0111\u1ED3ng. Trong \u0111\u1EE3t khuy\u1EBFn m\xE3i, tivi lo\u1EA1i A \u0111\u01B0\u1EE3c gi\u1EA3m $${pA}\\%$ v\xE0 t\u1EE7 l\u1EA1nh lo\u1EA1i B \u0111\u01B0\u1EE3c gi\u1EA3m $${pB}\\%$, n\xEAn b\xE1c C\u01B0\u1EDDng mua c\u1EA3 hai v\u1EDBi t\u1ED5ng s\u1ED1 ti\u1EC1n $${vn(tra)}$ tri\u1EC7u \u0111\u1ED3ng.

H\u1ECFi gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a chi\u1EBFc **tivi lo\u1EA1i A** l\xE0 bao nhi\xEAu tri\u1EC7u \u0111\u1ED3ng?`,
        answer: String(gA),
        thinking: [
          "G\u1ECDi $x$ l\xE0 gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a tivi th\xEC gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a t\u1EE7 l\u1EA1nh l\xE0 $" + tong + "-x$ \u2014 m\u1ED9t \u1EA9n l\xE0 \u0111\u1EE7.",
          `Gi\u1EA3m $${pA}\\%$ ngh\u0129a l\xE0 ch\u1EC9 ph\u1EA3i tr\u1EA3 $${100 - pA}\\%$ gi\xE1 g\u1ED1c, t\u1EE9c nh\xE2n v\u1EDBi $${vn((100 - pA) / 100)}$.`,
          "Ph\u01B0\u01A1ng tr\xECnh l\u1EADp t\u1EEB **t\u1ED5ng s\u1ED1 ti\u1EC1n th\u1EF1c tr\u1EA3**."
        ],
        solution: [
          `G\u1ECDi gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a tivi lo\u1EA1i A l\xE0 $x$ (tri\u1EC7u \u0111\u1ED3ng; $0<x<${tong}$).`,
          `Gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a t\u1EE7 l\u1EA1nh lo\u1EA1i B l\xE0 $${tong}-x$ (tri\u1EC7u \u0111\u1ED3ng).`,
          `S\u1ED1 ti\u1EC1n th\u1EF1c tr\u1EA3: $${vn((100 - pA) / 100)}x+${vn((100 - pB) / 100)}(${tong}-x)=${vn(tra)}$.`,
          `$\\Leftrightarrow ${vn((100 - pA) / 100)}x+${vn(Number(round((100 - pB) / 100 * tong, 3)))}-${vn((100 - pB) / 100)}x=${vn(tra)}$`,
          `$\\Leftrightarrow ${vn(Number(round((pB - pA) / 100, 3)))}x=${vn(Number(round(tra - (100 - pB) / 100 * tong, 3)))}\\Rightarrow x=${gA}$.`,
          `V\u1EADy gi\xE1 ni\xEAm y\u1EBFt c\u1EE7a tivi lo\u1EA1i A l\xE0 $${gA}$ tri\u1EC7u \u0111\u1ED3ng (t\u1EE7 l\u1EA1nh: $${gB}$ tri\u1EC7u \u0111\u1ED3ng).`
        ],
        pitfall: `Nh\xE2n v\u1EDBi $${pA}\\%$ (ph\u1EA7n \u0111\u01B0\u1EE3c gi\u1EA3m) thay v\xEC $${100 - pA}\\%$ (ph\u1EA7n ph\u1EA3i tr\u1EA3) l\xE0 l\u1ED7i sai b\u1EA3n ch\u1EA5t.`
      };
    }
  },
  /* ----------- 3. Lập phương trình — ca nô xuôi ngược dòng ----------- */
  {
    id: "g8.lap-pt-cano",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 ca n\xF4 xu\xF4i d\xF2ng, ng\u01B0\u1EE3c d\xF2ng",
    build: (r) => {
      const t1 = r.int(2, 5);
      const t2 = t1 + r.int(1, 3);
      const vn3 = r.pick([2, 3, 4, 5, 10]);
      const num = vn3 * (t1 + t2), den = t2 - t1;
      if (num % den !== 0) {
        return {
          stem: "M\u1ED9t ca n\xF4 xu\xF4i d\xF2ng t\u1EEB b\u1EBFn $A$ \u0111\u1EBFn b\u1EBFn $B$ m\u1EA5t $4$ gi\u1EDD v\xE0 ng\u01B0\u1EE3c d\xF2ng t\u1EEB $B$ v\u1EC1 $A$ m\u1EA5t $5$ gi\u1EDD. V\u1EADn t\u1ED1c d\xF2ng n\u01B0\u1EDBc l\xE0 $10$ km/h. T\xEDnh kho\u1EA3ng c\xE1ch $AB$ (km).",
          answer: "360",
          thinking: ["G\u1ECDi v\u1EADn t\u1ED1c ri\xEAng c\u1EE7a ca n\xF4 l\xE0 $x$; qu\xE3ng \u0111\u01B0\u1EDDng xu\xF4i v\xE0 ng\u01B0\u1EE3c l\xE0 **nh\u01B0 nhau** \u2014 \u0111\xF3 l\xE0 ph\u01B0\u01A1ng tr\xECnh."],
          solution: [
            "G\u1ECDi v\u1EADn t\u1ED1c ri\xEAng c\u1EE7a ca n\xF4 l\xE0 $x$ (km/h; $x>10$).",
            "V\u1EADn t\u1ED1c xu\xF4i $=x+10$, v\u1EADn t\u1ED1c ng\u01B0\u1EE3c $=x-10$.",
            "Qu\xE3ng \u0111\u01B0\u1EDDng b\u1EB1ng nhau: $4(x+10)=5(x-10)\\Rightarrow 4x+40=5x-50\\Rightarrow x=90$.",
            "V\u1EADy $AB=4(90+10)=360$ km."
          ],
          pitfall: "Qu\xEAn r\u1EB1ng v\u1EADn t\u1ED1c ri\xEAng ph\u1EA3i l\u1EDBn h\u01A1n v\u1EADn t\u1ED1c d\xF2ng n\u01B0\u1EDBc th\xEC ca n\xF4 m\u1EDBi ng\u01B0\u1EE3c d\xF2ng \u0111\u01B0\u1EE3c."
        };
      }
      const v = num / den;
      const S = (v + vn3) * t1;
      return {
        stem: `M\u1ED9t ca n\xF4 xu\xF4i d\xF2ng t\u1EEB b\u1EBFn $A$ \u0111\u1EBFn b\u1EBFn $B$ m\u1EA5t $${t1}$ gi\u1EDD v\xE0 ng\u01B0\u1EE3c d\xF2ng t\u1EEB b\u1EBFn $B$ v\u1EC1 b\u1EBFn $A$ m\u1EA5t $${t2}$ gi\u1EDD. Bi\u1EBFt v\u1EADn t\u1ED1c c\u1EE7a d\xF2ng n\u01B0\u1EDBc l\xE0 $${vn3}$ km/h. T\xEDnh kho\u1EA3ng c\xE1ch gi\u1EEFa hai b\u1EBFn $A$ v\xE0 $B$ (km).`,
        answer: String(S),
        thinking: [
          "G\u1ECDi $x$ l\xE0 **v\u1EADn t\u1ED1c ri\xEAng** c\u1EE7a ca n\xF4 (khi n\u01B0\u1EDBc l\u1EB7ng), \u0111i\u1EC1u ki\u1EC7n $x>" + vn3 + "$.",
          `Xu\xF4i d\xF2ng th\xEC c\u1ED9ng v\u1EADn t\u1ED1c n\u01B0\u1EDBc: $x+${vn3}$; ng\u01B0\u1EE3c d\xF2ng th\xEC tr\u1EEB: $x-${vn3}$.`,
          "Ph\u01B0\u01A1ng tr\xECnh \u0111\u1EBFn t\u1EEB ch\u1ED7 **qu\xE3ng \u0111\u01B0\u1EDDng \u0111i v\xE0 v\u1EC1 b\u1EB1ng nhau**."
        ],
        solution: [
          `G\u1ECDi v\u1EADn t\u1ED1c ri\xEAng c\u1EE7a ca n\xF4 l\xE0 $x$ (km/h; $x>${vn3}$).`,
          `V\u1EADn t\u1ED1c xu\xF4i d\xF2ng: $x+${vn3}$ (km/h); v\u1EADn t\u1ED1c ng\u01B0\u1EE3c d\xF2ng: $x-${vn3}$ (km/h).`,
          `Qu\xE3ng \u0111\u01B0\u1EDDng $AB$ kh\xF4ng \u0111\u1ED5i n\xEAn $${t1}(x+${vn3})=${t2}(x-${vn3})$.`,
          `$\\Leftrightarrow ${t1}x+${t1 * vn3}=${t2}x-${t2 * vn3}\\Leftrightarrow ${den === 1 ? `x=${v}` : `${den}x=${num}\\Rightarrow x=${v}`}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).`,
          `V\u1EADy $AB=${t1}\\cdot(${v}+${vn3})=${S}$ km.`
        ],
        pitfall: "L\u1EA5y v\u1EADn t\u1ED1c trung b\xECnh c\u1EE7a xu\xF4i v\xE0 ng\u01B0\u1EE3c \u0111\u1EC3 t\xEDnh qu\xE3ng \u0111\u01B0\u1EDDng l\xE0 **sai** \u2014 th\u1EDDi gian hai chi\u1EC1u kh\xE1c nhau."
      };
    }
  },
  /* ----------- 4. Lập phương trình — chu vi hình chữ nhật không đổi ----------- */
  {
    id: "g8.lap-pt-chu-vi",
    topicId: "g8-t3",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 k\xEDch th\u01B0\u1EDBc h\xECnh ch\u1EEF nh\u1EADt",
    build: (r) => {
      const p = r.pick([4, 5, 6]);
      const q = r.pick([3, 4, 5]);
      const k = r.int(2, 12);
      const dai = p * k, rong = q * k;
      if (dai <= rong) {
        return {
          stem: "M\u1ED9t khu v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt c\xF3 chu vi $450$ m. N\u1EBFu gi\u1EA3m chi\u1EC1u d\xE0i \u0111i $\\f{1}{5}$ chi\u1EC1u d\xE0i c\u0169 v\xE0 t\u0103ng chi\u1EC1u r\u1ED9ng th\xEAm $\\f{1}{4}$ chi\u1EC1u r\u1ED9ng c\u0169 th\xEC chu vi kh\xF4ng \u0111\u1ED5i. T\xEDnh chi\u1EC1u d\xE0i khu v\u01B0\u1EDDn (m).",
          answer: "125",
          thinking: ["Chu vi kh\xF4ng \u0111\u1ED5i \u21D4 t\u1ED5ng d\xE0i + r\u1ED9ng kh\xF4ng \u0111\u1ED5i \u21D4 ph\u1EA7n gi\u1EA3m c\u1EE7a chi\u1EC1u d\xE0i **b\u1EB1ng \u0111\xFAng** ph\u1EA7n t\u0103ng c\u1EE7a chi\u1EC1u r\u1ED9ng."],
          solution: [
            "G\u1ECDi chi\u1EC1u d\xE0i l\xE0 $x$ (m), chi\u1EC1u r\u1ED9ng l\xE0 $225-x$ (m) (v\xEC n\u1EEDa chu vi $=225$).",
            "Chu vi kh\xF4ng \u0111\u1ED5i n\xEAn $\\f{x}{5}=\\f{225-x}{4}\\Rightarrow 4x=1125-5x\\Rightarrow 9x=1125\\Rightarrow x=125$.",
            "V\u1EADy chi\u1EC1u d\xE0i l\xE0 $125$ m, chi\u1EC1u r\u1ED9ng $100$ m."
          ]
        };
      }
      const nua = dai + rong;
      const chuVi = 2 * nua;
      return {
        stem: `M\u1ED9t khu v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt c\xF3 chu vi $${chuVi}$ m. N\u1EBFu gi\u1EA3m chi\u1EC1u d\xE0i \u0111i $\\f{1}{${p}}$ chi\u1EC1u d\xE0i c\u0169 v\xE0 t\u0103ng chi\u1EC1u r\u1ED9ng th\xEAm $\\f{1}{${q}}$ chi\u1EC1u r\u1ED9ng c\u0169 th\xEC chu vi h\xECnh ch\u1EEF nh\u1EADt **kh\xF4ng \u0111\u1ED5i**. T\xEDnh chi\u1EC1u d\xE0i khu v\u01B0\u1EDDn (m).`,
        answer: String(dai),
        thinking: [
          `Chu vi $=2(\\text{d\xE0i}+\\text{r\u1ED9ng})$, n\xEAn chu vi kh\xF4ng \u0111\u1ED5i $\\Leftrightarrow$ **t\u1ED5ng** d\xE0i v\xE0 r\u1ED9ng kh\xF4ng \u0111\u1ED5i.`,
          `V\u1EADy ph\u1EA7n gi\u1EA3m \u0111i c\u1EE7a chi\u1EC1u d\xE0i ph\u1EA3i b\u1EB1ng \u0111\xFAng ph\u1EA7n t\u0103ng th\xEAm c\u1EE7a chi\u1EC1u r\u1ED9ng: $\\f{\\text{d\xE0i}}{${p}}=\\f{\\text{r\u1ED9ng}}{${q}}$.`
        ],
        solution: [
          `N\u1EEDa chu vi: $${chuVi}:2=${nua}$ (m).`,
          `G\u1ECDi chi\u1EC1u d\xE0i l\xE0 $x$ (m; $0<x<${nua}$) th\xEC chi\u1EC1u r\u1ED9ng l\xE0 $${nua}-x$ (m).`,
          `Chu vi kh\xF4ng \u0111\u1ED5i n\xEAn ph\u1EA7n gi\u1EA3m b\u1EB1ng ph\u1EA7n t\u0103ng: $\\f{x}{${p}}=\\f{${nua}-x}{${q}}$.`,
          `$\\Leftrightarrow ${q}x=${p}(${nua}-x)\\Leftrightarrow ${q}x+${p}x=${p * nua}\\Leftrightarrow ${p + q}x=${p * nua}$.`,
          `$x=${dai}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n). V\u1EADy chi\u1EC1u d\xE0i l\xE0 $${dai}$ m, chi\u1EC1u r\u1ED9ng $${rong}$ m.`
        ],
        pitfall: 'Nh\u1EA7m "chu vi kh\xF4ng \u0111\u1ED5i" th\xE0nh "di\u1EC7n t\xEDch kh\xF4ng \u0111\u1ED5i" \u2014 hai \u0111i\u1EC1u ki\u1EC7n cho hai ph\u01B0\u01A1ng tr\xECnh ho\xE0n to\xE0n kh\xE1c nhau.'
      };
    }
  },
  /* ----------- 5. Hàm số bậc nhất — hệ số góc và điểm đi qua ----------- */
  {
    id: "g8.he-so-goc",
    topicId: "g8-t4",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "X\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EDDng th\u1EB3ng theo h\u1EC7 s\u1ED1 g\xF3c v\xE0 \u0111i\u1EC3m \u0111i qua",
    build: (r) => {
      const a = r.int(-5, 5) || 3;
      const x0 = r.int(-4, 5), y0Base = r.int(-6, 6);
      const b = y0Base;
      const y0 = a * x0 + b;
      return {
        stem: `X\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EDDng th\u1EB3ng $(d): y=ax+b$ \u0111i qua \u0111i\u1EC3m $M(${x0};${y0})$ v\xE0 c\xF3 h\u1EC7 s\u1ED1 g\xF3c b\u1EB1ng $${a}$. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $b$.`,
        answer: String(b),
        thinking: [
          "**H\u1EC7 s\u1ED1 g\xF3c** ch\xEDnh l\xE0 h\u1EC7 s\u1ED1 $a$ \u0111\u1EE9ng tr\u01B0\u1EDBc $x$ \u2014 \u0111\u1EC1 cho h\u1EC7 s\u1ED1 g\xF3c l\xE0 cho lu\xF4n $a$.",
          "\u0110\u01B0\u1EDDng th\u1EB3ng \u0111i qua m\u1ED9t \u0111i\u1EC3m ngh\u0129a l\xE0 **thay to\u1EA1 \u0111\u1ED9 \u0111i\u1EC3m \u0111\xF3 v\xE0o** th\xEC \u0111\u01B0\u1EE3c \u0111\u1EB3ng th\u1EE9c \u0111\xFAng."
        ],
        solution: [
          `H\u1EC7 s\u1ED1 g\xF3c b\u1EB1ng $${a}$ n\xEAn $a=${a}$, \u0111\u01B0\u1EDDng th\u1EB3ng c\xF3 d\u1EA1ng $y=${a}x+b$.`,
          `$(d)$ \u0111i qua $M(${x0};${y0})$ n\xEAn $${y0}=${a}\\cdot(${x0})+b$.`,
          `$\\Rightarrow b=${y0}-(${a * x0})=${b}$.`,
          `V\u1EADy $(d): y=${a}x${sgn6(b)}$.`
        ],
        pitfall: "Thay nh\u1EA7m th\u1EE9 t\u1EF1 ho\xE0nh \u0111\u1ED9 v\xE0 tung \u0111\u1ED9 khi th\u1EBF \u0111i\u1EC3m $M(x_0;y_0)$."
      };
    }
  },
  /* ----------- 6. Giao điểm của hai đường thẳng ----------- */
  {
    id: "g8.giao-diem-hai-duong",
    topicId: "g8-t4",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "To\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a hai \u0111\u01B0\u1EDDng th\u1EB3ng",
    build: (r) => {
      const x = r.int(-5, 6), y = r.int(-6, 8);
      let a1 = r.int(-4, 4) || 2, a2 = r.int(-4, 4) || -1;
      if (a1 === a2) a2 = a1 + 1;
      const b1 = y - a1 * x, b2 = y - a2 * x;
      return {
        stem: `Cho hai \u0111\u01B0\u1EDDng th\u1EB3ng $(d_1): y=${a1}x${sgn6(b1)}$ v\xE0 $(d_2): y=${a2}x${sgn6(b2)}$. T\xECm to\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a ch\xFAng. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          `Hai \u0111\u01B0\u1EDDng th\u1EB3ng c\u1EAFt nhau khi h\u1EC7 s\u1ED1 g\xF3c kh\xE1c nhau: $${a1}\\ne${a2}$ \u2713.`,
          "To\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m l\xE0 nghi\u1EC7m c\u1EE7a **ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m**: cho hai v\u1EBF ph\u1EA3i b\u1EB1ng nhau."
        ],
        solution: [
          `V\xEC $${a1}\\ne${a2}$ n\xEAn $(d_1)$ v\xE0 $(d_2)$ c\u1EAFt nhau t\u1EA1i \u0111\xFAng m\u1ED9t \u0111i\u1EC3m.`,
          `Ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m: $${a1}x${sgn6(b1)}=${a2}x${sgn6(b2)}$.`,
          `$\\Leftrightarrow ${a1 - a2}x=${b2 - b1}\\Rightarrow x=${x}$.`,
          `Thay v\xE0o $(d_1)$: $y=${a1}\\cdot(${x})${sgn6(b1)}=${y}$.`,
          `V\u1EADy giao \u0111i\u1EC3m l\xE0 $A(${x};${y})$.`
        ],
        pitfall: "T\xECm \u0111\u01B0\u1EE3c $x$ r\u1ED3i qu\xEAn thay l\u1EA1i \u0111\u1EC3 t\xEDnh $y$ \u2014 \u0111\u1EC1 h\u1ECFi **to\u1EA1 \u0111\u1ED9**, ph\u1EA3i \u0111\u1EE7 hai s\u1ED1."
      };
    }
  },
  /* ----------- 7. Xác suất thực nghiệm từ bảng tần số ----------- */
  {
    id: "g8.xac-suat-thuc-nghiem-bang",
    topicId: "g8-t8",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "THONG_KE_XS",
    tag: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m t\u1EEB b\u1EA3ng th\u1ED1ng k\xEA",
    build: (r) => {
      const nhan = [2, 3, 4, 5, 6, 7];
      const f = nhan.map(() => r.int(2, 8));
      const tren7 = r.int(2, 6);
      const N = f.reduce((s, x) => s + x, 0) + tren7;
      const hoi = r.pick(["tren7", "duoi5"]);
      const so = hoi === "tren7" ? tren7 : f[0] + f[1] + f[2];
      const [n0, d0] = reduce(so, N);
      return {
        stem: `M\u1ED9t c\u1EEDa h\xE0ng b\xE1n xe \u0111\u1EA1p \u0111i\u1EC7n th\u1ED1ng k\xEA s\u1ED1 ng\xE0y theo l\u01B0\u1EE3ng xe b\xE1n ra:

${nhan.map((v, i) => `**${v} chi\u1EBFc**: $${f[i]}$ ng\xE0y`).join(" \xB7 ")} \xB7 **tr\xEAn 7 chi\u1EBFc**: $${tren7}$ ng\xE0y. (T\u1ED5ng $N=${N}$ ng\xE0y.)

T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a bi\u1EBFn c\u1ED1 ${hoi === "tren7" ? '$G$: "Ng\xE0y b\xE1n \u0111\u01B0\u1EE3c **nhi\u1EC1u h\u01A1n 7** chi\u1EBFc xe"' : '$H$: "Ng\xE0y b\xE1n \u0111\u01B0\u1EE3c **d\u01B0\u1EDBi 5** chi\u1EBFc xe"'}. (Nh\u1EADp d\u1EA1ng a/b t\u1ED1i gi\u1EA3n.)`,
        answer: d0 === 1 ? String(n0) : `${n0}/${d0}`,
        thinking: [
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m $=\\f{\\text{s\u1ED1 l\u1EA7n bi\u1EBFn c\u1ED1 x\u1EA3y ra}}{\\text{t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n}}$.",
          hoi === "tren7" ? 'Ch\xFA \xFD "nhi\u1EC1u h\u01A1n 7" ch\u1EC9 l\u1EA5y \u0111\xFAng c\u1ED9t "tr\xEAn 7", **kh\xF4ng** g\u1ED3m c\u1ED9t $7$.' : '"D\u01B0\u1EDBi 5" g\u1ED3m c\xE1c c\u1ED9t $2$, $3$, $4$ \u2014 **kh\xF4ng** g\u1ED3m c\u1ED9t $5$.'
        ],
        solution: [
          hoi === "tren7" ? `S\u1ED1 ng\xE0y b\xE1n nhi\u1EC1u h\u01A1n $7$ chi\u1EBFc: $${tren7}$.` : `S\u1ED1 ng\xE0y b\xE1n d\u01B0\u1EDBi $5$ chi\u1EBFc: $${f[0]}+${f[1]}+${f[2]}=${so}$.`,
          `T\u1ED5ng s\u1ED1 ng\xE0y: $N=${N}$.`,
          `X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m: $\\f{${so}}{${N}}=\\f{${n0}}{${d0}}$.`
        ],
        pitfall: 'Ranh gi\u1EDBi "d\u01B0\u1EDBi"/"nhi\u1EC1u h\u01A1n" l\xE0 **kh\xF4ng** bao g\u1ED3m gi\xE1 tr\u1ECB m\u1ED1c; "kh\xF4ng qu\xE1"/"\xEDt nh\u1EA5t" th\xEC m\u1EDBi bao g\u1ED3m.'
      };
    }
  },
  /* ----------- 8. Hình chóp tam giác đều ----------- */
  {
    id: "g8.chop-tam-giac-deu",
    topicId: "g8-t7",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "Di\u1EC7n t\xEDch xung quanh h\xECnh ch\xF3p tam gi\xE1c \u0111\u1EC1u",
    build: (r) => {
      const c = r.pick([4, 5, 6, 8, 10, 12]);
      const d = r.pick([6, 8, 10, 12, 15, 20]);
      const sxq = 3 * c * d / 2;
      const [options, answer] = mcOptions(r, `$${sxq}\\;cm^{2}$`, distractInt(r, sxq, Math.max(4, Math.round(sxq / 8))).map((v) => `$${v}\\;cm^{2}$`));
      return {
        stem: `M\u1ED9t h\xECnh ch\xF3p tam gi\xE1c \u0111\u1EC1u c\xF3 \u0111\u1ED9 d\xE0i c\u1EA1nh \u0111\xE1y l\xE0 $${c}$ cm v\xE0 \u0111\u1ED9 d\xE0i trung \u0111o\u1EA1n l\xE0 $${d}$ cm. Di\u1EC7n t\xEDch xung quanh c\u1EE7a h\xECnh ch\xF3p \u0111\xF3 l\xE0:`,
        options,
        answer,
        thinking: [
          "Di\u1EC7n t\xEDch xung quanh h\xECnh ch\xF3p \u0111\u1EC1u $=\\f{1}{2}\\cdot$ (chu vi \u0111\xE1y) $\\cdot$ (trung \u0111o\u1EA1n).",
          "\u0110\xE1y l\xE0 tam gi\xE1c \u0111\u1EC1u c\u1EA1nh $" + c + "$ n\xEAn chu vi \u0111\xE1y $=3\\cdot" + c + "=" + 3 * c + "$ cm."
        ],
        solution: [
          `Chu vi \u0111\xE1y: $C=3\\cdot${c}=${3 * c}$ (cm).`,
          `$S_{xq}=\\f{1}{2}\\cdot C\\cdot d=\\f{1}{2}\\cdot${3 * c}\\cdot${d}=${sxq}$ (cm$^{2}$).`
        ],
        pitfall: "Nh\u1EA7m **trung \u0111o\u1EA1n** (\u0111\u01B0\u1EDDng cao m\u1EB7t b\xEAn) v\u1EDBi **chi\u1EC1u cao h\xECnh ch\xF3p** \u2014 trung \u0111o\u1EA1n d\xF9ng cho $S_{xq}$, chi\u1EC1u cao d\xF9ng cho th\u1EC3 t\xEDch."
      };
    }
  },
  /* ----------- 9. Thể tích hình chóp ----------- */
  {
    id: "g8.the-tich-chop",
    topicId: "g8-t7",
    grade: 8,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "Th\u1EC3 t\xEDch h\xECnh ch\xF3p \u0111\u1EC1u",
    build: (r) => {
      const S = r.pick([120, 150, 180, 240, 300, 360, 1560]);
      const h = r.pick([9, 12, 15, 18, 24, 30, 90]);
      const V = S * h / 3;
      return {
        stem: `M\u1ED9t ch\xF3p inox c\xF3 d\u1EA1ng h\xECnh ch\xF3p tam gi\xE1c \u0111\u1EC1u v\u1EDBi di\u1EC7n t\xEDch \u0111\xE1y kho\u1EA3ng $${S}$ cm$^{2}$ v\xE0 chi\u1EC1u cao kho\u1EA3ng $${h}$ cm. T\xEDnh th\u1EC3 t\xEDch c\u1EE7a ch\xF3p inox \u0111\xF3 (cm$^{3}$).`,
        answer: String(V),
        thinking: [
          "Th\u1EC3 t\xEDch h\xECnh ch\xF3p $=\\f{1}{3}\\cdot S_{\\text{\u0111\xE1y}}\\cdot h$ \u2014 nh\u1EDB **h\u1EC7 s\u1ED1 $\\f{1}{3}$** \u0111\u1EC3 ph\xE2n bi\u1EC7t v\u1EDBi h\xECnh l\u0103ng tr\u1EE5.",
          "Chi\u1EC1u cao \u1EDF \u0111\xE2y l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB \u0111\u1EC9nh t\u1EDBi m\u1EB7t \u0111\xE1y, kh\xF4ng ph\u1EA3i trung \u0111o\u1EA1n."
        ],
        solution: [
          `$V=\\f{1}{3}\\cdot S\\cdot h=\\f{1}{3}\\cdot${S}\\cdot${h}=${V}$ (cm$^{3}$).`
        ],
        pitfall: `Qu\xEAn h\u1EC7 s\u1ED1 $\\f{1}{3}$ s\u1EBD cho k\u1EBFt qu\u1EA3 g\u1EA5p ba l\u1EA7n ($${S * h}$ cm$^{3}$) \u2014 \u0111\xE2y l\xE0 b\u1EABy ph\u1ED5 bi\u1EBFn nh\u1EA5t.`
      };
    }
  },
  /* ----------- 10. Tỉ số đồng dạng — trung tuyến, chu vi, diện tích ----------- */
  {
    id: "g8.dong-dang-ti-so-yeu-to",
    topicId: "g8-t6",
    grade: 8,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\u1EC9 s\u1ED1 c\xE1c y\u1EBFu t\u1ED1 t\u01B0\u01A1ng \u1EE9ng c\u1EE7a hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng",
    build: (r) => {
      const yeuTo = r.pick(["trung tuy\u1EBFn", "\u0111\u01B0\u1EDDng cao", "ph\xE2n gi\xE1c", "chu vi", "di\u1EC7n t\xEDch"]);
      const laDienTich = yeuTo === "di\u1EC7n t\xEDch";
      const dung = laDienTich ? "$k^{2}$" : "$k$";
      const sai = laDienTich ? ["$k$", "$\\f{1}{k}$", "$2k$"] : ["$k^{2}$", "$\\f{1}{k}$", "$\\f{k}{2}$"];
      const [options, answer] = mcOptions(r, dung, sai);
      return {
        stem: `Cho $\\tri MNP\\sim\\tri EFH$ theo t\u1EC9 s\u1ED1 $k$. T\u1EC9 s\u1ED1 **${yeuTo}** c\u1EE7a $\\tri MNP$ v\xE0 $\\tri EFH$ (hai y\u1EBFu t\u1ED1 t\u01B0\u01A1ng \u1EE9ng) b\u1EB1ng:`,
        options,
        answer,
        thinking: [
          "M\u1ECDi y\u1EBFu t\u1ED1 **\u0111\u1ED9 d\xE0i** t\u01B0\u01A1ng \u1EE9ng (c\u1EA1nh, \u0111\u01B0\u1EDDng cao, trung tuy\u1EBFn, ph\xE2n gi\xE1c, chu vi) \u0111\u1EC1u t\u1EC9 l\u1EC7 theo \u0111\xFAng t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $k$.",
          "Ri\xEAng **di\u1EC7n t\xEDch** t\u1EC9 l\u1EC7 theo $k^{2}$ v\xEC di\u1EC7n t\xEDch l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng hai chi\u1EC1u."
        ],
        solution: [
          laDienTich ? `Di\u1EC7n t\xEDch l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng hai chi\u1EC1u n\xEAn $\\f{S_{MNP}}{S_{EFH}}=k^{2}$.` : `${yeuTo.charAt(0).toUpperCase() + yeuTo.slice(1)} l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\u1ED9 d\xE0i n\xEAn t\u1EC9 s\u1ED1 c\u1EE7a ch\xFAng b\u1EB1ng \u0111\xFAng t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $k$.`
        ],
        pitfall: '\xC1p $k^{2}$ cho chu vi (sai) ho\u1EB7c $k$ cho di\u1EC7n t\xEDch (sai) \u2014 nh\u1EDB theo "s\u1ED1 chi\u1EC1u" c\u1EE7a \u0111\u1EA1i l\u01B0\u1EE3ng.'
      };
    }
  },
  /* ----------- 11. Ứng dụng đồng dạng — cọc và mắt người ----------- */
  {
    id: "g8.do-cay-bang-coc",
    topicId: "g8-t6",
    grade: 8,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "\u1EE8ng d\u1EE5ng \u0111\u1ED3ng d\u1EA1ng \u2014 \u0111o chi\u1EC1u cao c\xE2y b\u1EB1ng c\u1ECDc",
    build: (r) => {
      const mat = r.pick([1.5, 1.6, 1.65, 1.7]);
      const coc = mat + r.pick([0.6, 0.75, 0.8, 1]);
      const d1 = r.pick([0.5, 0.64, 0.8, 1]);
      const d2 = r.pick([1.2, 1.36, 1.6, 2]);
      const cay = mat + (coc - mat) * (d1 + d2) / d1;
      const kq = Math.round(cay * 100) / 100;
      return {
        stem: `M\u1ED9t ng\u01B0\u1EDDi \u0111o chi\u1EC1u cao c\u1EE7a c\xE2y nh\u1EDD m\u1ED9t chi\u1EBFc c\u1ECDc ch\xF4n xu\u1ED1ng \u0111\u1EA5t. C\u1ECDc cao $${vn(coc)}$ m v\xE0 \u0111\u1EB7t c\xE1ch c\xE2y $${vn(d2)}$ m. Ng\u01B0\u1EDDi \u1EA5y l\xF9i ra xa, c\xE1ch c\u1ECDc $${vn(d1)}$ m th\xEC nh\xECn th\u1EA5y \u0111\u1EC9nh c\u1ECDc v\xE0 \u0111\u1EC9nh c\xE2y c\xF9ng n\u1EB1m tr\xEAn m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng. Bi\u1EBFt kho\u1EA3ng c\xE1ch t\u1EEB ch\xE2n \u0111\u1EBFn m\u1EAFt ng\u01B0\u1EDDi \u1EA5y l\xE0 $${vn(mat)}$ m.

T\xEDnh chi\u1EC1u cao c\u1EE7a c\xE2y (m, l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n tr\u0103m).`,
        answer: String(kq),
        thinking: [
          "V\u1EBD tia nh\xECn t\u1EEB **m\u1EAFt** qua **\u0111\u1EC9nh c\u1ECDc** t\u1EDBi **ng\u1ECDn c\xE2y**. Tr\u1EEB \u0111i chi\u1EC1u cao m\u1EAFt \u1EDF c\u1EA3 c\u1ECDc v\xE0 c\xE2y \u0111\u1EC3 c\xF3 hai tam gi\xE1c vu\xF4ng \u0111\u1ED3ng d\u1EA1ng c\xF3 chung g\xF3c t\u1EA1i m\u1EAFt.",
          "Hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng theo tr\u01B0\u1EDDng h\u1EE3p g.g (chung g\xF3c nh\u1ECDn t\u1EA1i m\u1EAFt, hai g\xF3c vu\xF4ng).",
          "T\u1EC9 l\u1EC7: $\\f{\\text{c\u1ECDc}-\\text{m\u1EAFt}}{\\text{m\u1EAFt}\\to\\text{c\u1ECDc}}=\\f{\\text{c\xE2y}-\\text{m\u1EAFt}}{\\text{m\u1EAFt}\\to\\text{c\xE2y}}$."
        ],
        solution: [
          `Ph\u1EA7n c\u1ECDc cao h\u01A1n t\u1EA7m m\u1EAFt: $${vn(coc)}-${vn(mat)}=${vn(Number(round(coc - mat, 2)))}$ (m).`,
          `Kho\u1EA3ng c\xE1ch t\u1EEB m\u1EAFt t\u1EDBi c\u1ECDc theo ph\u01B0\u01A1ng ngang: $${vn(d1)}$ m; t\u1EDBi c\xE2y: $${vn(d1)}+${vn(d2)}=${vn(Number(round(d1 + d2, 2)))}$ m.`,
          `Hai tam gi\xE1c vu\xF4ng t\u1EA1o b\u1EDFi tia nh\xECn \u0111\u1ED3ng d\u1EA1ng (g.g), n\xEAn $\\f{${vn(Number(round(coc - mat, 2)))}}{${vn(d1)}}=\\f{h-${vn(mat)}}{${vn(Number(round(d1 + d2, 2)))}}$.`,
          `$h-${vn(mat)}=\\f{${vn(Number(round(coc - mat, 2)))}\\cdot${vn(Number(round(d1 + d2, 2)))}}{${vn(d1)}}=${vn(Number(round((coc - mat) * (d1 + d2) / d1, 2)))}$.`,
          `$h\\approx${vn(kq)}$ m.`
        ],
        pitfall: "Qu\xEAn **c\u1ED9ng l\u1EA1i chi\u1EC1u cao c\u1EE7a m\u1EAFt** \u1EDF b\u01B0\u1EDBc cu\u1ED1i \u2014 k\u1EBFt qu\u1EA3 s\u1EBD thi\u1EBFu \u0111\xFAng $" + vn(mat) + "$ m."
      };
    }
  },
  /* ----------- 12. Phương trình bậc nhất có tham số ----------- */
  {
    id: "g8.pt-tham-so",
    topicId: "g8-t3",
    grade: 8,
    level: "VDC",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Bi\u1EC7n lu\u1EADn ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t c\xF3 tham s\u1ED1",
    build: (r) => {
      const a = r.pick([2, 3, 4]);
      const m0 = r.int(1, 6);
      const c = r.int(1, 6);
      const hoi = r.pick(["bac-nhat", "vo-nghiem"]);
      if (hoi === "bac-nhat") {
        const [options2, answer2] = mcOptions(r, `$m\\ne${m0}$`, [`$m=${m0}$`, `$m>${m0}$`, "m\u1ECDi $m$"]);
        return {
          stem: `Cho ph\u01B0\u01A1ng tr\xECnh $${a}(m-${m0})x+${c}-m=0$ (v\u1EDBi $m$ l\xE0 tham s\u1ED1). Ph\u01B0\u01A1ng tr\xECnh l\xE0 **ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n $x$** khi:`,
          options: options2,
          answer: answer2,
          thinking: [
            "Ph\u01B0\u01A1ng tr\xECnh $Ax+B=0$ l\xE0 **b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n** khi v\xE0 ch\u1EC9 khi h\u1EC7 s\u1ED1 $A\\ne0$.",
            `\u1EDE \u0111\xE2y $A=${a}(m-${m0})$, m\xE0 $${a}\\ne0$ n\xEAn ch\u1EC9 c\u1EA7n $m-${m0}\\ne0$.`
          ],
          solution: [
            `H\u1EC7 s\u1ED1 c\u1EE7a $x$ l\xE0 $A=${a}(m-${m0})$.`,
            `Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t $\\Leftrightarrow A\\ne0\\Leftrightarrow ${a}(m-${m0})\\ne0\\Leftrightarrow m\\ne${m0}$.`
          ],
          pitfall: "Ch\u1EC9 nh\xECn v\xE0o h\u1EA1ng t\u1EED t\u1EF1 do m\xE0 qu\xEAn \u0111i\u1EC1u ki\u1EC7n then ch\u1ED1t l\xE0 h\u1EC7 s\u1ED1 c\u1EE7a $x$ kh\xE1c $0$."
        };
      }
      const [options, answer] = mcOptions(r, `$m=${m0}$`, [`$m\\ne${m0}$`, `$m=${c}$`, "kh\xF4ng c\xF3 $m$ n\xE0o"]);
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $${a}(m-${m0})x+${c}-m=0$ (v\u1EDBi $m$ l\xE0 tham s\u1ED1 v\xE0 $${c}\\ne${m0}$). Ph\u01B0\u01A1ng tr\xECnh **v\xF4 nghi\u1EC7m** khi:`,
        options,
        answer,
        thinking: [
          'Ph\u01B0\u01A1ng tr\xECnh $Ax+B=0$ **v\xF4 nghi\u1EC7m** khi $A=0$ v\xE0 $B\\ne0$ (d\u1EA1ng "$0\\cdot x=$ s\u1ED1 kh\xE1c $0$").',
          `\u1EDE \u0111\xE2y $A=${a}(m-${m0})$ v\xE0 $B=${c}-m$.`
        ],
        solution: [
          `$A=0\\Leftrightarrow ${a}(m-${m0})=0\\Leftrightarrow m=${m0}$.`,
          `Khi \u0111\xF3 $B=${c}-${m0}=${c - m0}\\ne0$ (theo gi\u1EA3 thi\u1EBFt $${c}\\ne${m0}$).`,
          `Ph\u01B0\u01A1ng tr\xECnh tr\u1EDF th\xE0nh $0\\cdot x=${m0 - c}$ \u2014 v\xF4 l\xED, n\xEAn ph\u01B0\u01A1ng tr\xECnh v\xF4 nghi\u1EC7m khi $m=${m0}$.`
        ],
        pitfall: "N\u1EBFu c\u1EA3 $A=0$ **v\xE0** $B=0$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 **v\xF4 s\u1ED1 nghi\u1EC7m**, kh\xF4ng ph\u1EA3i v\xF4 nghi\u1EC7m \u2014 ph\u1EA3i ki\u1EC3m tra $B$."
      };
    }
  },
  /* ----------- 13. Rút gọn biểu thức và tìm x nguyên (câu 1 tự luận) ----------- */
  {
    id: "g8.tl-rut-gon-nguyen",
    topicId: "g8-t2",
    grade: 8,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 r\xFAt g\u1ECDn ph\xE2n th\u1EE9c v\xE0 t\xECm x nguy\xEAn",
    build: (r) => {
      const a = r.pick([2, 3, 4, 5]);
      const b = r.int(1, 6);
      const xv = r.pick([-4, -3, 3, 5, 6, 7]).valueOf();
      const xTest = xv === a || xv === -a ? xv + 1 : xv;
      return {
        stem: `Cho bi\u1EC3u th\u1EE9c $A=\\left(\\f{x}{x^{2}-${a * a}}+\\f{1}{x+${a}}\\right):\\f{${b}}{x-${a}}$.

a) T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a $A$ v\xE0 r\xFAt g\u1ECDn $A$.

b) T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $A$ khi $x=${xTest}$.

c) T\xECm c\xE1c gi\xE1 tr\u1ECB nguy\xEAn c\u1EE7a $x$ \u0111\u1EC3 $A$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn.`,
        answer: "",
        rubric: [
          { criterion: `a) N\xEAu \u0111\xFAng \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh $x\\ne\\pm${a}$`, points: 0.5 },
          { criterion: "a) Quy \u0111\u1ED3ng, c\u1ED9ng hai ph\xE2n th\u1EE9c trong ngo\u1EB7c", points: 1 },
          { criterion: `a) Th\u1EF1c hi\u1EC7n ph\xE9p chia, r\xFAt g\u1ECDn \u0111\u01B0\u1EE3c $A=\\f{2x-${a}}{${b}(x+${a})}$`, points: 1 },
          { criterion: `b) \u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n r\u1ED3i thay $x=${xTest}$ v\xE0 t\xEDnh \u0111\xFAng`, points: 1 },
          { criterion: "c) T\xE1ch ph\u1EA7n nguy\xEAn, \u0111\u01B0a v\u1EC1 d\u1EA1ng \u01B0\u1EDBc c\u1EE7a m\u1ED9t s\u1ED1", points: 1 },
          { criterion: "c) Li\u1EC7t k\xEA \u0111\u1EE7 nghi\u1EC7m v\xE0 lo\u1EA1i c\xE1c gi\xE1 tr\u1ECB vi ph\u1EA1m \u0111i\u1EC1u ki\u1EC7n", points: 0.5 }
        ],
        thinking: [
          "B\u01B0\u1EDBc b\u1EAFt bu\u1ED9c \u0111\u1EA7u ti\xEAn: **\u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh** \u2014 m\u1ECDi m\u1EABu ph\u1EA3i kh\xE1c $0$, k\u1EC3 c\u1EA3 m\u1EABu c\u1EE7a ph\xE2n th\u1EE9c chia.",
          `$x^{2}-${a * a}=(x-${a})(x+${a})$ ch\xEDnh l\xE0 m\u1EABu chung \u2014 nh\u1EADn ra h\u1EB1ng \u0111\u1EB3ng th\u1EE9c l\xE0 xong n\u1EEDa b\xE0i.`,
          "Chia cho m\u1ED9t ph\xE2n th\u1EE9c = nh\xE2n v\u1EDBi **ngh\u1ECBch \u0111\u1EA3o** c\u1EE7a n\xF3.",
          '\xDD c: t\xE1ch $\\f{\\text{t\u1EED}}{\\text{m\u1EABu}}$ th\xE0nh "ph\u1EA7n nguy\xEAn + ph\u1EA7n d\u01B0" r\u1ED3i cho m\u1EABu l\xE0 **\u01B0\u1EDBc** c\u1EE7a t\u1EED s\u1ED1 d\u01B0.'
        ],
        solution: [
          `**a)** \u0110KX\u0110: $x^{2}-${a * a}\\ne0$ v\xE0 $x+${a}\\ne0$ v\xE0 $x-${a}\\ne0$, t\u1EE9c $x\\ne${a}$ v\xE0 $x\\ne-${a}$.`,
          `$\\f{x}{x^{2}-${a * a}}+\\f{1}{x+${a}}=\\f{x}{(x-${a})(x+${a})}+\\f{x-${a}}{(x-${a})(x+${a})}=\\f{2x-${a}}{(x-${a})(x+${a})}$.`,
          `$A=\\f{2x-${a}}{(x-${a})(x+${a})}\\cdot\\f{x-${a}}{${b}}=\\f{2x-${a}}{${b}(x+${a})}$.`,
          `**b)** $x=${xTest}$ tho\u1EA3 \u0110KX\u0110. Thay v\xE0o: $A=\\f{2\\cdot${xTest}-${a}}{${b}(${xTest}+${a})}=\\f{${2 * xTest - a}}{${b * (xTest + a)}}$.`,
          `**c)** Vi\u1EBFt l\u1EA1i $${b}A=\\f{2x-${a}}{x+${a}}=2-\\f{${3 * a}}{x+${a}}$.`,
          `\u0110\u1EC3 $A$ nguy\xEAn th\xEC tr\u01B0\u1EDBc h\u1EBFt $\\f{${3 * a}}{x+${a}}$ ph\u1EA3i nguy\xEAn, t\u1EE9c $x+${a}$ l\xE0 \u01B0\u1EDBc c\u1EE7a $${3 * a}$.`,
          `L\u1EADp b\u1EA3ng c\xE1c \u01B0\u1EDBc c\u1EE7a $${3 * a}$, t\xECm $x$ t\u01B0\u01A1ng \u1EE9ng, r\u1ED3i **lo\u1EA1i** c\xE1c gi\xE1 tr\u1ECB $x=\\pm${a}$ v\xE0 ki\u1EC3m tra l\u1EA1i \u0111i\u1EC1u ki\u1EC7n $A$ nguy\xEAn (ch\u1EE9 kh\xF4ng ch\u1EC9 $${b}A$ nguy\xEAn).`
        ]
      };
    }
  }
];

// src/bank/g8-hinh.ts
var PROBLEMS3 = [
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ c\xF3 $AB=6$ cm, $AC=8$ cm, \u0111\u01B0\u1EDDng cao $AH$ ($H\\in BC$).\n\na) T\xEDnh $BC$.\n\nb) Ch\u1EE9ng minh $\\tri ABC\\sim\\tri HBA$, t\u1EEB \u0111\xF3 t\xEDnh $AH$ v\xE0 $BH$.\n\nc) \u0110\u01B0\u1EDDng ph\xE2n gi\xE1c c\u1EE7a g\xF3c $ABC$ c\u1EAFt $AC$ t\u1EA1i $I$. G\u1ECDi $K$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $AH$ v\xE0 $BI$. Ch\u1EE9ng minh $\\angle AIB=\\angle HKB$.\n\nd) Ch\u1EE9ng minh $AI^{2}=IC\\cdot KH$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 s\u1ED1 li\u1EC7u", points: 0.5 },
      { criterion: "\xDD a: d\xF9ng Pythagore t\xEDnh $BC=10$ cm", points: 0.5 },
      { criterion: "\xDD b: ch\u1EE9ng minh $\\tri ABC\\sim\\tri HBA$ (g.g)", points: 0.75 },
      { criterion: "\xDD b: l\u1EADp t\u1EC9 s\u1ED1 v\xE0 t\xEDnh $AH=4{,}8$ cm; $BH=3{,}6$ cm", points: 0.75 },
      { criterion: "\xDD c: hai g\xF3c c\xF9ng ph\u1EE5 v\u1EDBi hai g\xF3c b\u1EB1ng nhau (do $BI$ l\xE0 ph\xE2n gi\xE1c)", points: 1 },
      { criterion: "\xDD d: ch\u1EE9ng minh $AI=AK$ v\xE0 $\\tri AIB\\sim\\tri HKB$ \u0111\u1EC3 suy ra h\u1EC7 th\u1EE9c", points: 1 }
    ],
    thinking: [
      'M\xF4 h\xECnh "tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n" cho **ba c\u1EB7p tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng** c\xF9ng l\xFAc: $\\tri ABC\\sim\\tri HBA\\sim\\tri HAC$. Nh\u1EADn ra l\xE0 \xFD a, b xong ngay.',
      "C\xE1ch gh\xE9p t\xEAn \u0111\u1EC9nh ph\u1EA3i theo \u0111\xFAng th\u1EE9 t\u1EF1 g\xF3c b\u1EB1ng nhau: $\\angle B$ chung, $\\angle BAC=\\angle BHA=90\\deg$.",
      "\xDD c: $\\angle AIB$ v\xE0 $\\angle HKB$ l\u1EA7n l\u01B0\u1EE3t l\xE0 g\xF3c c\xF2n l\u1EA1i c\u1EE7a hai tam gi\xE1c vu\xF4ng $ABI$ v\xE0 $HBK$, m\xE0 hai tam gi\xE1c \u0111\xF3 c\xF3 hai g\xF3c nh\u1ECDn t\u1EA1i $B$ b\u1EB1ng nhau (ph\xE2n gi\xE1c) \u2014 n\xEAn hai g\xF3c c\xF2n l\u1EA1i b\u1EB1ng nhau.",
      "\xDD d: t\u1EEB \xFD c suy ra tam gi\xE1c $AIK$ c\xE2n t\u1EA1i $A$ ($AI=AK$); r\u1ED3i d\xF9ng t\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c $\\f{AI}{IC}=\\f{AB}{BC}$ gh\xE9p v\u1EDBi c\u1EB7p \u0111\u1ED3ng d\u1EA1ng \u0111\u1EC3 ra h\u1EC7 th\u1EE9c."
    ],
    solution: [
      "a) Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, theo \u0111\u1ECBnh l\xED Pythagore: $BC^{2}=AB^{2}+AC^{2}=6^{2}+8^{2}=100$, n\xEAn $BC=10$ cm.",
      "b) X\xE9t $\\tri ABC$ v\xE0 $\\tri HBA$: $\\angle BAC=\\angle BHA=90\\deg$; $\\angle ABC$ chung.",
      "Do \u0111\xF3 $\\tri ABC\\sim\\tri HBA$ (g.g), suy ra $\\f{AB}{HB}=\\f{BC}{BA}=\\f{AC}{HA}$.",
      "T\u1EEB $\\f{AB}{HB}=\\f{BC}{BA}$: $HB=\\f{AB^{2}}{BC}=\\f{36}{10}=3{,}6$ cm.",
      "T\u1EEB $\\f{AC}{HA}=\\f{BC}{BA}$: $HA=\\f{AC\\cdot BA}{BC}=\\f{8\\cdot6}{10}=4{,}8$ cm.",
      "c) $BI$ l\xE0 ph\xE2n gi\xE1c g\xF3c $B$ n\xEAn $\\angle ABI=\\angle HBK$.",
      "Tam gi\xE1c $ABI$ vu\xF4ng t\u1EA1i $A$ n\xEAn $\\angle AIB=90\\deg-\\angle ABI$.",
      "Tam gi\xE1c $HBK$ vu\xF4ng t\u1EA1i $H$ n\xEAn $\\angle HKB=90\\deg-\\angle HBK$.",
      "Hai g\xF3c $\\angle ABI$ v\xE0 $\\angle HBK$ b\u1EB1ng nhau, n\xEAn $\\angle AIB=\\angle HKB$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "d) T\u1EEB \xFD c: $\\angle AKI=\\angle HKB$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh) $=\\angle AIB=\\angle AIK$.",
      "V\u1EADy tam gi\xE1c $AIK$ c\xE2n t\u1EA1i $A$, suy ra $AI=AK$.",
      "X\xE9t $\\tri ABI$ v\xE0 $\\tri HBK$: $\\angle BAI=\\angle BHK=90\\deg$; $\\angle ABI=\\angle HBK$.",
      "N\xEAn $\\tri ABI\\sim\\tri HBK$ (g.g), suy ra $\\f{AI}{HK}=\\f{AB}{HB}$.",
      "M\u1EB7t kh\xE1c, $BI$ l\xE0 ph\xE2n gi\xE1c c\u1EE7a tam gi\xE1c $ABC$ n\xEAn $\\f{AI}{IC}=\\f{AB}{BC}$.",
      "T\u1EEB \xFD b, $\\tri ABC\\sim\\tri HBA$ cho $\\f{AB}{HB}=\\f{BC}{BA}$, t\u1EE9c $\\f{AB}{HB}=\\f{BC}{AB}$.",
      "Do \u0111\xF3 $\\f{AI}{HK}=\\f{BC}{AB}=\\f{IC}{AI}$ (ngh\u1ECBch \u0111\u1EA3o c\u1EE7a t\u1EC9 s\u1ED1 ph\xE2n gi\xE1c).",
      "Nh\xE2n ch\xE9o: $AI^{2}=IC\\cdot HK$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho h\xECnh b\xECnh h\xE0nh $ABCD$, \u0111i\u1EC3m $F$ n\u1EB1m tr\xEAn c\u1EA1nh $BC$. Tia $AF$ c\u1EAFt $BD$ t\u1EA1i $E$ v\xE0 c\u1EAFt tia $DC$ t\u1EA1i $G$.\n\na) Ch\u1EE9ng minh $\\tri BEF\\sim\\tri DEA$ v\xE0 $\\tri BEA\\sim\\tri DEG$.\n\nb) Ch\u1EE9ng minh $EA^{2}=EF\\cdot EG$.\n\nc) Ch\u1EE9ng minh t\xEDch $BF\\cdot DG$ kh\xF4ng \u0111\u1ED5i khi \u0111i\u1EC3m $F$ thay \u0111\u1ED5i tr\xEAn c\u1EA1nh $BC$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi r\xF5 c\xE1c c\u1EB7p c\u1EA1nh song song c\u1EE7a h\xECnh b\xECnh h\xE0nh", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri BEF\\sim\\tri DEA$ (g.g) nh\u1EDD $BC\\para AD$", points: 1 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri BEA\\sim\\tri DEG$ (g.g) nh\u1EDD $AB\\para DG$", points: 1 },
      { criterion: "\xDD b: gh\xE9p hai t\u1EC9 s\u1ED1 c\u1EE7a \xFD a \u0111\u1EC3 kh\u1EED $\\f{EB}{ED}$", points: 1 },
      { criterion: "\xDD c: ch\u1EE9ng minh $\\tri ABF\\sim\\tri GCF$ ho\u1EB7c d\xF9ng $\\f{BF}{AB}=\\f{BC}{DG}$", points: 1 },
      { criterion: "\xDD c: k\u1EBFt lu\u1EADn $BF\\cdot DG=AB\\cdot BC$ \u2014 h\u1EB1ng s\u1ED1", points: 0.5 }
    ],
    thinking: [
      "H\xECnh b\xECnh h\xE0nh cho **hai c\u1EB7p c\u1EA1nh song song**, m\xE0 song song l\xE0 ngu\u1ED3n sinh ra c\xE1c c\u1EB7p g\xF3c so le trong \u2014 nguy\xEAn li\u1EC7u chu\u1EA9n cho \u0111\u1ED3ng d\u1EA1ng g.g.",
      "$BC\\para AD$ d\xF9ng cho c\u1EB7p th\u1EE9 nh\u1EA5t; $AB\\para DC$ (ch\u1EE9a $DG$) d\xF9ng cho c\u1EB7p th\u1EE9 hai. C\u1EE9 m\u1ED7i c\u1EB7p song song l\xE0 m\u1ED9t c\u1EB7p tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng.",
      '\xDD b l\xE0 m\u1EB9o "**gh\xE9p hai t\u1EC9 s\u1ED1 c\xF3 chung m\u1ED9t v\u1EBF**": c\u1EA3 hai c\u1EB7p \u0111\u1ED3ng d\u1EA1ng \u0111\u1EC1u cho t\u1EC9 s\u1ED1 $\\f{EB}{ED}$, \u0111\u1EB7t b\u1EB1ng nhau l\xE0 ra ngay.',
      '\xDD c: "kh\xF4ng \u0111\u1ED5i" ngh\u0129a l\xE0 bi\u1EC3u di\u1EC5n \u0111\u01B0\u1EE3c qua c\xE1c c\u1EA1nh c\u1ED1 \u0111\u1ECBnh $AB$, $BC$ \u2014 h\xE3y h\u01B0\u1EDBng t\u1EA5t c\u1EA3 v\u1EC1 hai \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xF3.'
    ],
    solution: [
      "a) V\xEC $ABCD$ l\xE0 h\xECnh b\xECnh h\xE0nh n\xEAn $BC\\para AD$, t\u1EE9c $BF\\para AD$.",
      "X\xE9t $\\tri BEF$ v\xE0 $\\tri DEA$: $\\angle FBE=\\angle ADE$ (so le trong, $BF\\para AD$); $\\angle BEF=\\angle DEA$ (\u0111\u1ED1i \u0111\u1EC9nh).",
      "Do \u0111\xF3 $\\tri BEF\\sim\\tri DEA$ (g.g), suy ra $\\f{EF}{EA}=\\f{EB}{ED}$. (1)",
      "C\u0169ng v\xEC $ABCD$ l\xE0 h\xECnh b\xECnh h\xE0nh n\xEAn $AB\\para DC$, t\u1EE9c $AB\\para DG$.",
      "X\xE9t $\\tri BEA$ v\xE0 $\\tri DEG$: $\\angle ABE=\\angle GDE$ (so le trong, $AB\\para DG$); $\\angle BEA=\\angle DEG$ (\u0111\u1ED1i \u0111\u1EC9nh).",
      "Do \u0111\xF3 $\\tri BEA\\sim\\tri DEG$ (g.g), suy ra $\\f{EA}{EG}=\\f{EB}{ED}$. (2)",
      "b) T\u1EEB (1) v\xE0 (2): $\\f{EF}{EA}=\\f{EA}{EG}$.",
      "Nh\xE2n ch\xE9o: $EA^{2}=EF\\cdot EG$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "c) V\xEC $AB\\para DG$ n\xEAn x\xE9t $\\tri ABF$ v\xE0 $\\tri GCF$ c\xF3 $\\angle ABF=\\angle GCF$ (so le trong) v\xE0 $\\angle AFB=\\angle GFC$ (\u0111\u1ED1i \u0111\u1EC9nh).",
      "V\u1EADy $\\tri ABF\\sim\\tri GCF$ (g.g), suy ra $\\f{BF}{CF}=\\f{AB}{CG}$. (3)",
      "M\u1EB7t kh\xE1c $AD\\para BF$ n\xEAn $\\tri GCF\\sim\\tri GDA$, cho $\\f{CF}{AD}=\\f{CG}{DG}$, t\u1EE9c $\\f{CF}{BC}=\\f{CG}{DG}$ (v\xEC $AD=BC$). (4)",
      "Nh\xE2n (3) v\u1EDBi (4): $\\f{BF}{CF}\\cdot\\f{CF}{BC}=\\f{AB}{CG}\\cdot\\f{CG}{DG}$, t\u1EE9c $\\f{BF}{BC}=\\f{AB}{DG}$.",
      "Suy ra $BF\\cdot DG=AB\\cdot BC$.",
      "V\u1EBF ph\u1EA3i ch\u1EC9 g\u1ED3m hai c\u1EA1nh c\u1EE7a h\xECnh b\xECnh h\xE0nh \u0111\xE3 cho, kh\xF4ng ph\u1EE5 thu\u1ED9c v\u1ECB tr\xED c\u1EE7a $F$. V\u1EADy $BF\\cdot DG$ kh\xF4ng \u0111\u1ED5i. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$, $H$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a c\u1EA1nh $BC$. V\u1EBD $HI\\perp AC$ t\u1EA1i $I$; g\u1ECDi $O$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $HI$.\n\na) Ch\u1EE9ng minh $\\tri CHA\\sim\\tri CIH$, t\u1EEB \u0111\xF3 suy ra $\\f{CH}{CI}=\\f{HA}{IH}$.\n\nb) Ch\u1EE9ng minh $\\tri BIC\\sim\\tri AOH$.\n\nc) Ch\u1EE9ng minh $AO\\perp BI$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ch\u1EC9 r\xF5 $AH\\perp BC$", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri CHA\\sim\\tri CIH$ (g.g) v\xE0 vi\u1EBFt \u0111\xFAng t\u1EC9 s\u1ED1", points: 1 },
      { criterion: "\xDD b: d\xF9ng $BC=2CH$, $IH=2OH$ \u0111\u1EC3 \u0111\u01B0a v\u1EC1 $\\f{BC}{AH}=\\f{CI}{OH}$", points: 1 },
      { criterion: "\xDD b: ch\u1EC9 ra $\\angle BCI=\\angle AHO$ r\u1ED3i k\u1EBFt lu\u1EADn \u0111\u1ED3ng d\u1EA1ng (c.g.c)", points: 1 },
      { criterion: "\xDD c: t\u1EEB \u0111\u1ED3ng d\u1EA1ng suy ra hai g\xF3c b\u1EB1ng nhau, r\u1ED3i d\xF9ng t\u1ED5ng g\xF3c \u0111\u1EC3 c\xF3 $90\\deg$", points: 1 }
    ],
    thinking: [
      "Tam gi\xE1c c\xE2n + trung \u0111i\u1EC3m \u0111\xE1y \u21D2 $AH$ v\u1EEBa l\xE0 trung tuy\u1EBFn v\u1EEBa l\xE0 **\u0111\u01B0\u1EDDng cao**: $AH\\perp BC$. \u0110\xE2y l\xE0 d\u1EEF ki\u1EC7n then ch\u1ED1t m\xE0 \u0111\u1EC1 kh\xF4ng n\xF3i th\u1EB3ng.",
      '\xDD a l\xE0 m\xF4 h\xECnh "tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n" \xE1p cho $\\tri AHC$ vu\xF4ng t\u1EA1i $H$ v\u1EDBi \u0111\u01B0\u1EDDng cao $HI$.',
      "\xDD b l\xE0 m\u1EB9o **nh\xE2n \u0111\xF4i**: $BC=2CH$ v\xE0 $IH=2OH$, n\xEAn t\u1EC9 s\u1ED1 $\\f{BC}{CI}$ v\xE0 $\\f{AH}{OH}$ \u0111\u1EC1u quy \u0111\u01B0\u1EE3c v\u1EC1 t\u1EC9 s\u1ED1 \u1EDF \xFD a. Hai c\u1EB7p c\u1EA1nh t\u1EC9 l\u1EC7 + g\xF3c xen gi\u1EEFa b\u1EB1ng nhau = \u0111\u1ED3ng d\u1EA1ng c.g.c.",
      "\xDD c: ch\u1EE9ng minh vu\xF4ng g\xF3c b\u1EB1ng c\xE1ch c\u1ED9ng g\xF3c \u2014 ch\u1EC9 ra t\u1ED5ng hai g\xF3c nh\u1ECDn trong m\u1ED9t tam gi\xE1c b\u1EB1ng $90\\deg$."
    ],
    solution: [
      "a) Tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$ c\xF3 $H$ l\xE0 trung \u0111i\u1EC3m $BC$ n\xEAn $AH$ l\xE0 trung tuy\u1EBFn \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao: $AH\\perp BC$.",
      "X\xE9t $\\tri CHA$ v\xE0 $\\tri CIH$: $\\angle AHC=\\angle HIC=90\\deg$; $\\angle ACH$ chung.",
      "Do \u0111\xF3 $\\tri CHA\\sim\\tri CIH$ (g.g), suy ra $\\f{CH}{CI}=\\f{HA}{IH}=\\f{CA}{CH}$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "b) T\u1EEB \xFD a: $\\f{CH}{CI}=\\f{HA}{IH}$, t\u1EE9c $\\f{CI}{CH}=\\f{IH}{HA}$.",
      "V\xEC $H$ l\xE0 trung \u0111i\u1EC3m $BC$ n\xEAn $CH=\\f{BC}{2}$; v\xEC $O$ l\xE0 trung \u0111i\u1EC3m $HI$ n\xEAn $IH=2\\cdot OH$.",
      "Thay v\xE0o: $\\f{CI}{\\f{BC}{2}}=\\f{2\\cdot OH}{HA}$, r\xFAt g\u1ECDn \u0111\u01B0\u1EE3c $\\f{CI}{BC}=\\f{OH}{HA}$, t\u1EE9c $\\f{BC}{CI}=\\f{HA}{OH}$.",
      "X\xE9t g\xF3c xen gi\u1EEFa: $\\angle BCI=\\angle ACH$ (c\xF9ng l\xE0 g\xF3c $C$ c\u1EE7a tam gi\xE1c, v\xEC $I\\in AC$ v\xE0 $B$, $H$, $C$ th\u1EB3ng h\xE0ng).",
      "M\u1EB7t kh\xE1c $\\tri CHA\\sim\\tri CIH$ cho $\\angle ACH=\\angle AHI$; m\xE0 $O\\in HI$ n\xEAn $\\angle AHI=\\angle AHO$.",
      "V\u1EADy $\\angle BCI=\\angle AHO$.",
      "K\u1EBFt h\u1EE3p $\\f{BC}{CI}=\\f{HA}{OH}$ (hai c\u1EB7p c\u1EA1nh k\u1EC1 t\u01B0\u01A1ng \u1EE9ng t\u1EC9 l\u1EC7) v\xE0 g\xF3c xen gi\u1EEFa b\u1EB1ng nhau, ta c\xF3 $\\tri BCI\\sim\\tri AHO$ (c.g.c), t\u1EE9c $\\tri BIC\\sim\\tri AOH$.",
      "c) T\u1EEB $\\tri BCI\\sim\\tri AHO$ suy ra $\\angle CBI=\\angle HAO$.",
      "G\u1ECDi $J$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $AO$ v\xE0 $BI$. X\xE9t tam gi\xE1c $ABJ$ v\xE0 d\xF9ng tam gi\xE1c $ABH$ vu\xF4ng t\u1EA1i $H$:",
      "$\\angle ABJ+\\angle BAJ=\\angle ABI+\\angle BAO$. M\xE0 $\\angle BAO=\\angle BAH+\\angle HAO=\\angle BAH+\\angle CBI$.",
      "Do \u0111\xF3 $\\angle ABJ+\\angle BAJ=(\\angle ABI+\\angle IBC)+\\angle BAH=\\angle ABH+\\angle BAH=90\\deg$ (hai g\xF3c nh\u1ECDn c\u1EE7a tam gi\xE1c $ABH$ vu\xF4ng t\u1EA1i $H$).",
      "V\u1EADy trong tam gi\xE1c $ABJ$, g\xF3c c\xF2n l\u1EA1i $\\angle AJB=90\\deg$, t\u1EE9c $AO\\perp BI$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ nh\u1ECDn c\xF3 $AB<AC$, hai \u0111\u01B0\u1EDDng cao $BD$ v\xE0 $CE$ ($D\\in AC$, $E\\in AB$).\n\na) Ch\u1EE9ng minh $AB\\cdot AE=AC\\cdot AD$.\n\nb) Ch\u1EE9ng minh $\\tri ADE\\sim\\tri ABC$.\n\nc) Cho $AB=6$ cm, $AC=9$ cm v\xE0 $AD=4$ cm. T\xEDnh $AE$ v\xE0 t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch $\\f{S_{ADE}}{S_{ABC}}$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi r\xF5 hai \u0111\u01B0\u1EDDng cao", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri ABD\\sim\\tri ACE$ (g.g) r\u1ED3i nh\xE2n ch\xE9o", points: 1.5 },
      { criterion: "\xDD b: t\u1EEB $\\f{AD}{AB}=\\f{AE}{AC}$ v\xE0 g\xF3c $A$ chung \u2192 \u0111\u1ED3ng d\u1EA1ng c.g.c", points: 1.5 },
      { criterion: "\xDD c: t\xEDnh $AE=6$ cm", points: 0.75 },
      { criterion: "\xDD c: t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch b\u1EB1ng b\xECnh ph\u01B0\u01A1ng t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $=\\f{4}{9}$", points: 0.75 }
    ],
    thinking: [
      "Hai \u0111\u01B0\u1EDDng cao cho hai tam gi\xE1c vu\xF4ng c\xF9ng ch\u1EE9a g\xF3c $A$ \u2014 \u0111\xF3 l\xE0 c\u1EB7p \u0111\u1ED3ng d\u1EA1ng g.g hi\u1EC3n nhi\xEAn nh\u1EA5t c\u1EE7a c\u1EA5u h\xECnh n\xE0y.",
      "\xDD b l\xE0 b\u1EABy v\u1EC1 **th\u1EE9 t\u1EF1 \u0111\u1EC9nh**: t\u1EEB $AB\\cdot AE=AC\\cdot AD$ ta c\xF3 $\\f{AD}{AB}=\\f{AE}{AC}$ \u2014 ch\xFA \xFD $AD$ \u0111i v\u1EDBi $AB$ ch\u1EE9 kh\xF4ng ph\u1EA3i v\u1EDBi $AC$; \u0111\xF3 l\xE0 l\xED do $\\tri ADE\\sim\\tri ABC$ ch\u1EE9 kh\xF4ng ph\u1EA3i $\\tri AED\\sim\\tri ABC$.",
      "\xDD c ch\u1EC9 l\xE0 \xE1p d\u1EE5ng: t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch c\u1EE7a hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng b\u1EB1ng **b\xECnh ph\u01B0\u01A1ng** t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng."
    ],
    solution: [
      "a) X\xE9t $\\tri ABD$ (vu\xF4ng t\u1EA1i $D$) v\xE0 $\\tri ACE$ (vu\xF4ng t\u1EA1i $E$):",
      "$\\angle ADB=\\angle AEC=90\\deg$; $\\angle BAD=\\angle CAE$ (c\xF9ng l\xE0 g\xF3c $A$).",
      "Do \u0111\xF3 $\\tri ABD\\sim\\tri ACE$ (g.g), suy ra $\\f{AB}{AC}=\\f{AD}{AE}$.",
      "Nh\xE2n ch\xE9o: $AB\\cdot AE=AC\\cdot AD$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "b) T\u1EEB $AB\\cdot AE=AC\\cdot AD$ ta vi\u1EBFt l\u1EA1i th\xE0nh $\\f{AD}{AB}=\\f{AE}{AC}$.",
      "X\xE9t $\\tri ADE$ v\xE0 $\\tri ABC$: $\\f{AD}{AB}=\\f{AE}{AC}$ v\xE0 $\\angle DAE=\\angle BAC$ (g\xF3c $A$ chung).",
      "V\u1EADy $\\tri ADE\\sim\\tri ABC$ (c.g.c). (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "c) T\u1EEB $AB\\cdot AE=AC\\cdot AD$: $6\\cdot AE=9\\cdot4=36$, n\xEAn $AE=6$ cm.",
      "T\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng c\u1EE7a $\\tri ADE$ v\xE0 $\\tri ABC$ l\xE0 $k=\\f{AD}{AB}=\\f{4}{6}=\\f{2}{3}$.",
      "(Ki\u1EC3m tra ch\xE9o: $\\f{AE}{AC}=\\f{6}{9}=\\f{2}{3}$ \u2014 kh\u1EDBp.)",
      "Do \u0111\xF3 $\\f{S_{ADE}}{S_{ABC}}=k^{2}=\\left(\\f{2}{3}\\right)^{2}=\\f{4}{9}$."
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    stem: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$ ($H\\in BC$).\n\na) Ch\u1EE9ng minh $\\tri HAB\\sim\\tri HCA$.\n\nb) G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AC$. T\u1EEB $H$ k\u1EBB \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi $AC$, c\u1EAFt $AB$ t\u1EA1i $D$ v\xE0 c\u1EAFt $BM$ t\u1EA1i $I$. Ch\u1EE9ng minh $I$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $DH$.\n\nc) G\u1ECDi $K$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $AH$ v\xE0 $CD$. Ch\u1EE9ng minh $DI\\cdot KC=DK\\cdot MC$.",
    rubric: [
      { criterion: "V\u1EBD h\xECnh \u0111\xFAng, ghi \u0111\u1EE7 k\xFD hi\u1EC7u song song v\xE0 vu\xF4ng g\xF3c", points: 0.5 },
      { criterion: "\xDD a: ch\u1EE9ng minh $\\tri HAB\\sim\\tri HCA$ (g.g) nh\u1EDD hai g\xF3c c\xF9ng ph\u1EE5", points: 1 },
      { criterion: "\xDD b: d\xF9ng h\u1EC7 qu\u1EA3 Thal\xE8s hai l\u1EA7n \u0111\u1EC3 c\xF3 $\\f{DI}{AM}=\\f{IH}{MC}$", points: 1.5 },
      { criterion: "\xDD b: k\u1EBFt h\u1EE3p $AM=MC$ \u0111\u1EC3 k\u1EBFt lu\u1EADn $DI=IH$", points: 0.5 },
      { criterion: "\xDD c: d\xF9ng Thal\xE8s cho $DH\\para AC$ v\u1EDBi c\xE1t tuy\u1EBFn $CD$", points: 1.5 }
    ],
    thinking: [
      '\xDD a l\xE0 c\u1EB7p \u0111\u1ED3ng d\u1EA1ng "**kinh \u0111i\u1EC3n**" c\u1EE7a \u0111\u01B0\u1EDDng cao trong tam gi\xE1c vu\xF4ng: $\\angle HAB$ v\xE0 $\\angle HCA$ c\xF9ng ph\u1EE5 v\u1EDBi $\\angle HAC$.',
      "\xDD b: c\xF3 \u0111\u01B0\u1EDDng th\u1EB3ng song song th\xEC c\xF4ng c\u1EE5 s\u1ED1 m\u1ED9t l\xE0 **h\u1EC7 qu\u1EA3 \u0111\u1ECBnh l\xED Thal\xE8s** \u2014 c\u1EE9 m\u1ED7i tam gi\xE1c b\u1ECB c\u1EAFt b\u1EDFi \u0111\u01B0\u1EDDng song song l\xE0 m\u1ED9t d\xE3y t\u1EC9 s\u1ED1.",
      "D\xF9ng Thal\xE8s trong $\\tri ABM$ (v\u1EDBi $DI\\para AM$) v\xE0 trong $\\tri BMC$ (v\u1EDBi $IH\\para MC$), hai l\u1EA7n \u0111\u1EC1u cho t\u1EC9 s\u1ED1 $\\f{BI}{BM}$ \u2014 gh\xE9p l\u1EA1i l\xE0 xong.",
      "\xDD c c\u0169ng ch\u1EC9 l\xE0 Thal\xE8s, l\u1EA7n n\xE0y v\u1EDBi c\xE1t tuy\u1EBFn $CD$ c\u1EAFt $DH\\para AC$; \u0111i\u1EC3m m\u1EA5u ch\u1ED1t l\xE0 nh\u1EADn ra $K$ n\u1EB1m tr\xEAn c\u1EA3 $CD$ l\u1EABn $AH$."
    ],
    solution: [
      "a) X\xE9t $\\tri HAB$ v\xE0 $\\tri HCA$: $\\angle AHB=\\angle CHA=90\\deg$.",
      "Trong tam gi\xE1c $AHB$ vu\xF4ng t\u1EA1i $H$: $\\angle HAB=90\\deg-\\angle ABH$.",
      "Trong tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$: $\\angle ACB=90\\deg-\\angle ABC=90\\deg-\\angle ABH$.",
      "Do \u0111\xF3 $\\angle HAB=\\angle HCA$, suy ra $\\tri HAB\\sim\\tri HCA$ (g.g). (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "b) V\xEC $DH\\para AC$ n\xEAn $DI\\para AM$ (do $I\\in DH$, $M\\in AC$).",
      "\xC1p d\u1EE5ng h\u1EC7 qu\u1EA3 \u0111\u1ECBnh l\xED Thal\xE8s trong $\\tri ABM$ v\u1EDBi $DI\\para AM$: $\\f{DI}{AM}=\\f{BI}{BM}$. (1)",
      "C\u0169ng v\xEC $DH\\para AC$ n\xEAn $IH\\para MC$.",
      "\xC1p d\u1EE5ng h\u1EC7 qu\u1EA3 \u0111\u1ECBnh l\xED Thal\xE8s trong $\\tri BMC$ v\u1EDBi $IH\\para MC$: $\\f{IH}{MC}=\\f{BI}{BM}$. (2)",
      "T\u1EEB (1) v\xE0 (2): $\\f{DI}{AM}=\\f{IH}{MC}$.",
      "M\xE0 $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AC$ n\xEAn $AM=MC$, suy ra $DI=IH$.",
      "V\u1EADy $I$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $DH$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
      "c) $K$ l\xE0 giao \u0111i\u1EC3m c\u1EE7a $AH$ v\xE0 $CD$, n\xEAn $D$, $K$, $C$ th\u1EB3ng h\xE0ng v\xE0 $H$, $K$, $A$ th\u1EB3ng h\xE0ng.",
      "X\xE9t $\\tri KDH$ v\xE0 $\\tri KCA$: $\\angle KDH=\\angle KCA$ (so le trong, $DH\\para AC$, c\xE1t tuy\u1EBFn $DC$); $\\angle DKH=\\angle CKA$ (hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh).",
      "Do \u0111\xF3 $\\tri KDH\\sim\\tri KCA$ (g.g), suy ra $\\f{DK}{CK}=\\f{DH}{CA}$. (3)",
      "T\u1EEB \xFD b, $I$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $DH$ n\xEAn $DI=\\f{DH}{2}$; $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AC$ n\xEAn $MC=\\f{CA}{2}$.",
      "Suy ra $\\f{DI}{MC}=\\f{DH/2}{CA/2}=\\f{DH}{CA}$. (4)",
      "T\u1EEB (3) v\xE0 (4): $\\f{DI}{MC}=\\f{DK}{CK}$, nh\xE2n ch\xE9o \u0111\u01B0\u1EE3c $DI\\cdot KC=DK\\cdot MC$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
    ]
  }
];
var BANK_G8_HINH = [
  {
    id: "g8.hinh-tu-luan-hk",
    topicId: "g8-t6",
    grade: 8,
    level: "VDC",
    kind: "ESSAY",
    strand: "HINH_HOC",
    tag: "C\xE2u h\xECnh t\u1EF1 lu\u1EADn h\u1ECDc k\xEC \u2014 tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng nhi\u1EC1u \xFD",
    build: (r) => {
      const p = r.pick(PROBLEMS3);
      return {
        stem: p.stem,
        answer: "",
        rubric: p.rubric,
        thinking: p.thinking,
        solution: p.solution,
        pitfall: "Vi\u1EBFt sai **th\u1EE9 t\u1EF1 \u0111\u1EC9nh** khi ghi hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng s\u1EBD k\xE9o theo t\u1EC9 s\u1ED1 sai \u1EDF m\u1ECDi \xFD sau \u2014 lu\xF4n ghi \u0111\u1EC9nh theo \u0111\xFAng c\u1EB7p g\xF3c b\u1EB1ng nhau."
      };
    }
  }
];

// src/bank/g9-decuong.ts
var sgn7 = (n) => n >= 0 ? `+${n}` : `${n}`;
var vn2 = (x) => String(x).replace(".", "{,}");
var hang = (k, v) => k === 0 ? "" : `${k > 0 ? "+" : "-"}${Math.abs(k) === 1 && v ? "" : Math.abs(k)}${v}`;
var heso = (k) => k === 0 ? "" : k === 1 ? "+" : k === -1 ? "-" : `${k > 0 ? "+" : "-"}${Math.abs(k)}`;
var co2 = (k) => k === 1 ? "" : String(k);
var BANK_G9_DECUONG = [
  /* ----------- 1. Tìm hai số biết tổng và tích ----------- */
  {
    id: "g9.tim-hai-so",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\xECm hai s\u1ED1 bi\u1EBFt t\u1ED5ng v\xE0 t\xEDch (Vi\xE8te \u0111\u1EA3o)",
    build: (r) => {
      const u = r.int(-12, 12), v = r.int(-12, 12);
      const S = u + v, P = u * v;
      const dung = `$x^{2}${sgn7(-S)}x${sgn7(P)}=0$`;
      const sai = [
        `$x^{2}${sgn7(S)}x${sgn7(P)}=0$`,
        `$x^{2}${sgn7(-S)}x${sgn7(-P)}=0$`,
        `$x^{2}${sgn7(S)}x${sgn7(-P)}=0$`
      ];
      const [options, answer] = mcOptions(r, dung, sai);
      return {
        stem: `N\u1EBFu hai s\u1ED1 $u$ v\xE0 $v$ tho\u1EA3 m\xE3n $u+v=${S}$ v\xE0 $u\\cdot v=${P}$ th\xEC $u$, $v$ l\xE0 hai nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh n\xE0o sau \u0111\xE2y?`,
        options,
        answer,
        thinking: [
          "\u0110\u1ECBnh l\xED Vi\xE8te **\u0111\u1EA3o**: hai s\u1ED1 c\xF3 t\u1ED5ng $S$ v\xE0 t\xEDch $P$ l\xE0 hai nghi\u1EC7m c\u1EE7a $x^{2}-Sx+P=0$.",
          "Ch\xFA \xFD d\u1EA5u: h\u1EC7 s\u1ED1 c\u1EE7a $x$ l\xE0 $-S$ (**\u0111\u1ED5i d\u1EA5u** t\u1ED5ng), h\u1EA1ng t\u1EED t\u1EF1 do l\xE0 $+P$ (**gi\u1EEF nguy\xEAn** t\xEDch)."
        ],
        solution: [
          `\xC1p d\u1EE5ng Vi\xE8te \u0111\u1EA3o v\u1EDBi $S=${S}$ v\xE0 $P=${P}$:`,
          `$x^{2}-Sx+P=0\\Leftrightarrow x^{2}${sgn7(-S)}x${sgn7(P)}=0$.`,
          `Ki\u1EC3m tra: $\\Delta=S^{2}-4P=${S * S}-${4 * P}=${S * S - 4 * P}\\ge0$ n\xEAn hai s\u1ED1 $u$, $v$ t\u1ED3n t\u1EA1i (ch\xEDnh l\xE0 $${u}$ v\xE0 $${v}$).`
        ],
        pitfall: "Nh\u1EDB nh\u1EA7m th\xE0nh $x^{2}+Sx+P=0$ \u2014 h\u1EC7 s\u1ED1 c\u1EE7a $x$ ph\u1EA3i **\u0111\u1ED5i d\u1EA5u** t\u1ED5ng."
      };
    }
  },
  /* ----------- 2. Điều kiện về dấu hai nghiệm ----------- */
  {
    id: "g9.dau-hai-nghiem",
    topicId: "g9-t3",
    grade: 9,
    level: "VD",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC1u ki\u1EC7n v\u1EC1 d\u1EA5u hai nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai",
    build: (r) => {
      const loai = r.pick(["traidau", "cungduong", "cungam"]);
      const dung = loai === "traidau" ? "$P<0$" : loai === "cungduong" ? "$\\Delta>0$ ; $S>0$ ; $P>0$" : "$\\Delta>0$ ; $S<0$ ; $P>0$";
      const kho = [
        "$P<0$",
        "$\\Delta>0$ ; $S>0$ ; $P>0$",
        "$\\Delta>0$ ; $S<0$ ; $P>0$",
        "$\\Delta>0$ ; $P<0$ ; $S>0$",
        "$S>0$ ; $P<0$"
      ];
      const sai = kho.filter((x) => x !== dung).slice(0, 3);
      const [options, answer] = mcOptions(r, dung, sai);
      const ten = loai === "traidau" ? "hai nghi\u1EC7m **tr\xE1i d\u1EA5u**" : loai === "cungduong" ? "hai nghi\u1EC7m **ph\xE2n bi\u1EC7t c\xF9ng d\u01B0\u01A1ng**" : "hai nghi\u1EC7m **ph\xE2n bi\u1EC7t c\xF9ng \xE2m**";
      return {
        stem: `Cho ph\u01B0\u01A1ng tr\xECnh $ax^{2}+bx+c=0$ ($a\\ne0$) c\xF3 $S=x_1+x_2$, $P=x_1x_2$. Ph\u01B0\u01A1ng tr\xECnh c\xF3 ${ten} khi v\xE0 ch\u1EC9 khi:`,
        options,
        answer,
        thinking: [
          "D\u1EA5u c\u1EE7a **t\xEDch** $P$ quy\u1EBFt \u0111\u1ECBnh hai nghi\u1EC7m c\xF9ng d\u1EA5u hay tr\xE1i d\u1EA5u; d\u1EA5u c\u1EE7a **t\u1ED5ng** $S$ m\u1EDBi ph\xE2n bi\u1EC7t c\xF9ng d\u01B0\u01A1ng hay c\xF9ng \xE2m.",
          "Ri\xEAng tr\u01B0\u1EDDng h\u1EE3p tr\xE1i d\u1EA5u, $P<0$ \u0111\xE3 t\u1EF1 k\xE9o theo $\\Delta>0$ n\xEAn **kh\xF4ng c\u1EA7n** ghi th\xEAm \u0111i\u1EC1u ki\u1EC7n $\\Delta$."
        ],
        solution: [
          loai === "traidau" ? "Hai nghi\u1EC7m tr\xE1i d\u1EA5u $\\Leftrightarrow P=x_1x_2<0$." : loai === "cungduong" ? "Hai nghi\u1EC7m ph\xE2n bi\u1EC7t c\xF9ng d\u01B0\u01A1ng $\\Leftrightarrow \\Delta>0$ (c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t), $P>0$ (c\xF9ng d\u1EA5u) v\xE0 $S>0$ (c\xF9ng d\u01B0\u01A1ng)." : "Hai nghi\u1EC7m ph\xE2n bi\u1EC7t c\xF9ng \xE2m $\\Leftrightarrow \\Delta>0$, $P>0$ (c\xF9ng d\u1EA5u) v\xE0 $S<0$ (c\xF9ng \xE2m).",
          loai === "traidau" ? "Khi $P=\\f{c}{a}<0$ th\xEC $ac<0$, do \u0111\xF3 $\\Delta=b^{2}-4ac>0$ t\u1EF1 \u0111\u1ED9ng tho\u1EA3 \u2014 kh\xF4ng ph\u1EA3i ghi th\xEAm." : "N\u1EBFu thi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $\\Delta>0$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 th\u1EC3 c\xF3 nghi\u1EC7m k\xE9p ho\u1EB7c v\xF4 nghi\u1EC7m."
        ],
        pitfall: "Ghi th\u1EEBa $\\Delta>0$ \u1EDF tr\u01B0\u1EDDng h\u1EE3p tr\xE1i d\u1EA5u (kh\xF4ng sai nh\u01B0ng th\u1EEBa), ho\u1EB7c **thi\u1EBFu** $\\Delta>0$ \u1EDF hai tr\u01B0\u1EDDng h\u1EE3p c\xF9ng d\u1EA5u (sai)."
      };
    }
  },
  /* ----------- 3. Tương giao (P) và (d) — biểu thức đối xứng ----------- */
  {
    id: "g9.tuong-giao-tham-so",
    topicId: "g9-t3",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\u01B0\u01A1ng giao parabol \u2013 \u0111\u01B0\u1EDDng th\u1EB3ng v\u1EDBi \u0111i\u1EC1u ki\u1EC7n v\u1EC1 nghi\u1EC7m",
    build: (r) => {
      const m = r.int(-6, 6);
      const n = r.int(1, 12);
      const D = m * m + 4 * n;
      return {
        stem: `Cho parabol $(P): y=x^{2}$ v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng $(d): y=${m}x+${n}$. Bi\u1EBFt $(d)$ c\u1EAFt $(P)$ t\u1EA1i hai \u0111i\u1EC3m ph\xE2n bi\u1EC7t c\xF3 ho\xE0nh \u0111\u1ED9 $x_1$, $x_2$. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $(x_1-x_2)^{2}$.`,
        answer: String(D),
        thinking: [
          `Ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m l\xE0 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m $x^{2}-${m}x-${n}=0$.`,
          "$(x_1-x_2)^{2}$ l\xE0 bi\u1EC3u th\u1EE9c **\u0111\u1ED1i x\u1EE9ng** n\xEAn quy v\u1EC1 $S$ v\xE0 $P$: $(x_1-x_2)^{2}=S^{2}-4P$ \u2014 kh\xF4ng c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.",
          `V\xEC $P=-${n}<0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh ch\u1EAFc ch\u1EAFn c\xF3 hai nghi\u1EC7m tr\xE1i d\u1EA5u, t\u1EE9c $(d)$ lu\xF4n c\u1EAFt $(P)$ t\u1EA1i hai \u0111i\u1EC3m.`
        ],
        solution: [
          `Ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m: $x^{2}=${m}x+${n}\\Leftrightarrow x^{2}-${m}x-${n}=0$.`,
          `Theo Vi\xE8te: $S=x_1+x_2=${m}$ ; $P=x_1x_2=-${n}$.`,
          `V\xEC $P=-${n}<0$ n\xEAn $\\Delta>0$: ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t (tr\xE1i d\u1EA5u) \u2014 \u0111\xFAng nh\u01B0 gi\u1EA3 thi\u1EBFt.`,
          `$(x_1-x_2)^{2}=(x_1+x_2)^{2}-4x_1x_2=S^{2}-4P=${m * m}+${4 * n}=${D}$.`,
          `(Suy ra $|x_1-x_2|=${simplifySqrt(D)}$.)`
        ],
        pitfall: "Vi\u1EBFt $(x_1-x_2)^{2}=S^{2}-2P$ (nh\u1EA7m v\u1EDBi c\xF4ng th\u1EE9c c\u1EE7a $x_1^{2}+x_2^{2}$) \u2014 \u0111\xFAng ph\u1EA3i l\xE0 $S^{2}-4P$."
      };
    }
  },
  /* ----------- 4. Điểm cố định của họ đường thẳng ----------- */
  {
    id: "g9.diem-co-dinh",
    topicId: "g9-t3",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "\u0110i\u1EC3m c\u1ED1 \u0111\u1ECBnh c\u1EE7a h\u1ECD \u0111\u01B0\u1EDDng th\u1EB3ng ph\u1EE5 thu\u1ED9c tham s\u1ED1",
    build: (r) => {
      const a = r.int(-4, 4);
      const b = r.int(-6, 6);
      const x0 = 1, y0 = a + b;
      return {
        stem: `Cho \u0111\u01B0\u1EDDng th\u1EB3ng $(d): y=(m${sgn7(a)})x-m${sgn7(b)}$ v\u1EDBi $m$ l\xE0 tham s\u1ED1. T\xECm \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh m\xE0 $(d)$ lu\xF4n \u0111i qua v\u1EDBi **m\u1ECDi** gi\xE1 tr\u1ECB c\u1EE7a $m$. (Nh\u1EADp theo d\u1EA1ng x,y.)`,
        answer: `${x0},${y0}`,
        thinking: [
          "\u0110i\u1EC3m c\u1ED1 \u0111\u1ECBnh $(x_0;y_0)$ l\xE0 \u0111i\u1EC3m m\xE0 \u0111\u1EB3ng th\u1EE9c \u0111\xFAng v\u1EDBi **m\u1ECDi** $m$ \u2014 h\xE3y nh\xF3m bi\u1EC3u th\u1EE9c theo $m$.",
          "\u0110\u01B0a v\u1EC1 d\u1EA1ng $m\\cdot A+B=0$ \u0111\xFAng v\u1EDBi m\u1ECDi $m$ th\xEC b\u1EAFt bu\u1ED9c $A=0$ **v\xE0** $B=0$ \u2014 \u0111\xF3 l\xE0 h\u1EC7 \u0111\u1EC3 t\xECm $x_0$, $y_0$."
        ],
        solution: [
          `Gi\u1EA3 s\u1EED $(d)$ lu\xF4n \u0111i qua \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh $M(x_0;y_0)$, t\u1EE9c $y_0=(m${sgn7(a)})x_0-m${sgn7(b)}$ \u0111\xFAng v\u1EDBi m\u1ECDi $m$.`,
          `Nh\xF3m theo $m$: $m(x_0-1)+\\left(${a}x_0${sgn7(b)}-y_0\\right)=0$ \u0111\xFAng v\u1EDBi m\u1ECDi $m$.`,
          `Suy ra $\\cb{x_0-1=0\\\\${a}x_0${sgn7(b)}-y_0=0}$`,
          `T\u1EEB \u0111\xF3 $x_0=1$ v\xE0 $y_0=${a}\\cdot1${sgn7(b)}=${y0}$.`,
          `V\u1EADy $(d)$ lu\xF4n \u0111i qua \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh $M(${x0};${y0})$.`
        ],
        pitfall: "Ch\u1EC9 thay hai gi\xE1 tr\u1ECB $m$ c\u1EE5 th\u1EC3 r\u1ED3i gi\u1EA3i h\u1EC7 \u2014 c\xE1ch \u0111\xF3 t\xECm ra \u0111i\u1EC3m nh\u01B0ng **ch\u01B0a ch\u1EE9ng minh** n\xF3 c\u1ED1 \u0111\u1ECBnh v\u1EDBi m\u1ECDi $m$."
      };
    }
  },
  /* ----------- 5. Căn kép — hiệu hai căn kép cho kết quả hữu tỉ ----------- */
  {
    id: "g9.can-kep",
    topicId: "g9-t2",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "R\xFAt g\u1ECDn c\u0103n k\xE9p $\\s{a\\pm2\\s{b}}$",
    build: (r) => {
      const v = r.pick([1, 4, 9]);
      const u = r.pick([2, 3, 5, 6, 7, 10, 11, 13, 15].filter((k) => k > v));
      const a = u + v, b = u * v;
      const sv = Math.round(Math.sqrt(v));
      const kq = 2 * sv;
      return {
        stem: `R\xFAt g\u1ECDn v\xE0 t\xEDnh gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $A=\\s{${a}+2\\s{${b}}}-\\s{${a}-2\\s{${b}}}$.`,
        answer: String(kq),
        thinking: [
          "Nh\u1EADn d\u1EA1ng **c\u0103n k\xE9p**: $a\\pm2\\s{b}$ lu\xF4n vi\u1EBFt l\u1EA1i \u0111\u01B0\u1EE3c th\xE0nh b\xECnh ph\u01B0\u01A1ng $(\\s{u}\\pm\\s{v})^{2}$ v\u1EDBi $u+v=a$ v\xE0 $uv=b$.",
          `\u1EDE \u0111\xE2y c\u1EA7n $u+v=${a}$ v\xE0 $uv=${b}$, t\xE1ch \u0111\u01B0\u1EE3c $u=${u}$, $v=${v}$.`,
          `Sau khi khai c\u0103n ph\u1EA3i b\u1ECF d\u1EA5u **gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i** \u0111\xFAng chi\u1EC1u: v\xEC $\\s{${u}}>\\s{${v}}$ n\xEAn $\\s{${u}}-\\s{${v}}>0$.`
        ],
        solution: [
          `$${a}+2\\s{${b}}=${u}+2\\s{${u}}\\s{${v}}+${v}=(\\s{${u}}+\\s{${v}})^{2}$.`,
          `$${a}-2\\s{${b}}=${u}-2\\s{${u}}\\s{${v}}+${v}=(\\s{${u}}-\\s{${v}})^{2}$.`,
          `Do \u0111\xF3 $A=\\left|\\s{${u}}+\\s{${v}}\\right|-\\left|\\s{${u}}-\\s{${v}}\\right|=(\\s{${u}}+\\s{${v}})-(\\s{${u}}-\\s{${v}})$ (v\xEC $${u}>${v}$).`,
          `$A=2\\s{${v}}=2\\cdot${sv}=${kq}$.`
        ],
        pitfall: `B\u1ECF d\u1EA5u c\u0103n m\xE0 qu\xEAn gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i: n\u1EBFu $u<v$ th\xEC $\\s{u}-\\s{v}<0$ v\xE0 ph\u1EA3i \u0111\u1ED5i d\u1EA5u, k\u1EBFt qu\u1EA3 s\u1EBD kh\xE1c.`
      };
    }
  },
  /* ----------- 6. Hệ phương trình có tham số ----------- */
  {
    id: "g9.he-pt-tham-so",
    topicId: "g9-t1",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n c\xF3 tham s\u1ED1",
    build: (r) => {
      const x = r.int(2, 9);
      const c1 = 3 * x;
      const heSoM = r.int(2, 6);
      const c2 = x * heSoM;
      const m = heSoM - 1;
      return {
        stem: `Cho h\u1EC7 ph\u01B0\u01A1ng tr\xECnh $\\sys{x+2y=${c1}\\\\mx+y=${c2}}$. T\xECm gi\xE1 tr\u1ECB c\u1EE7a tham s\u1ED1 $m$ \u0111\u1EC3 h\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t $(x;y)$ tho\u1EA3 m\xE3n $x=y$.`,
        answer: String(m),
        thinking: [
          "\u0110i\u1EC1u ki\u1EC7n $x=y$ l\xE0 **th\xEAm m\u1ED9t ph\u01B0\u01A1ng tr\xECnh** \u2014 thay $y=x$ v\xE0o ph\u01B0\u01A1ng tr\xECnh **kh\xF4ng ch\u1EE9a tham s\u1ED1** tr\u01B0\u1EDBc, s\u1EBD t\xECm \u0111\u01B0\u1EE3c ngay $x$.",
          "C\xF3 $x$ (v\xE0 $y$) r\u1ED3i m\u1EDBi thay v\xE0o ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a $m$ \u0111\u1EC3 gi\u1EA3i ra $m$.",
          "Cu\u1ED1i c\xF9ng ph\u1EA3i ki\u1EC3m tra $m$ t\xECm \u0111\u01B0\u1EE3c c\xF3 b\u1EA3o \u0111\u1EA3m h\u1EC7 **c\xF3 nghi\u1EC7m duy nh\u1EA5t** hay kh\xF4ng."
        ],
        solution: [
          `Thay $y=x$ v\xE0o ph\u01B0\u01A1ng tr\xECnh (1): $x+2x=${c1}\\Rightarrow 3x=${c1}\\Rightarrow x=${x}$, do \u0111\xF3 $y=${x}$.`,
          `Thay $(x;y)=(${x};${x})$ v\xE0o ph\u01B0\u01A1ng tr\xECnh (2): $m\\cdot${x}+${x}=${c2}$.`,
          `$\\Rightarrow ${x}m=${c2 - x}\\Rightarrow m=${m}$.`,
          `Ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n nghi\u1EC7m duy nh\u1EA5t: $1\\cdot1-2\\cdot${m}=${1 - 2 * m}\\ne0$ \u2713`,
          `V\u1EADy $m=${m}$.`
        ],
        pitfall: "Gi\u1EA3i h\u1EC7 theo $m$ tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi \xE1p \u0111i\u1EC1u ki\u1EC7n $x=y$ \u2014 c\xE1ch \u0111\xF3 d\xE0i g\u1EA5p ba l\u1EA7n v\xE0 r\u1EA5t d\u1EC5 sai d\u1EA5u."
      };
    }
  },
  /* ----------- 7. Lập phương trình — năng suất vượt mức ----------- */
  {
    id: "g9.lap-pt-vuot-muc",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh \u2014 n\u0103ng su\u1EA5t v\u01B0\u1EE3t m\u1EE9c, ho\xE0n th\xE0nh s\u1EDBm",
    build: (r) => {
      const d = r.pick([5, 10]);
      const som = r.pick([1, 2, 3]);
      const x = r.pick([20, 25, 30, 40, 50, 55, 60, 100, 110]);
      if (x * (x + d) * som % d !== 0) {
        return {
          stem: "M\u1ED9t ph\xE2n x\u01B0\u1EDFng theo k\u1EBF ho\u1EA1ch ph\u1EA3i s\u1EA3n xu\u1EA5t $1100$ s\u1EA3n ph\u1EA9m trong m\u1ED9t s\u1ED1 ng\xE0y quy \u0111\u1ECBnh. Do m\u1ED7i ng\xE0y v\u01B0\u1EE3t m\u1EE9c $5$ s\u1EA3n ph\u1EA9m n\xEAn ph\xE2n x\u01B0\u1EDFng ho\xE0n th\xE0nh s\u1EDBm h\u01A1n quy \u0111\u1ECBnh $2$ ng\xE0y. H\u1ECFi theo k\u1EBF ho\u1EA1ch m\u1ED7i ng\xE0y ph\xE2n x\u01B0\u1EDFng s\u1EA3n xu\u1EA5t bao nhi\xEAu s\u1EA3n ph\u1EA9m?",
          answer: "50",
          thinking: [
            "G\u1ECDi $x$ l\xE0 **n\u0103ng su\u1EA5t k\u1EBF ho\u1EA1ch** (s\u1EA3n ph\u1EA9m/ng\xE0y); s\u1ED1 ng\xE0y $=\\f{\\text{t\u1ED5ng}}{\\text{n\u0103ng su\u1EA5t}}$.",
            "Hi\u1EC7u hai s\u1ED1 ng\xE0y ch\xEDnh l\xE0 s\u1ED1 ng\xE0y ho\xE0n th\xE0nh s\u1EDBm \u2014 \u0111\xF3 l\xE0 ph\u01B0\u01A1ng tr\xECnh."
          ],
          solution: [
            "G\u1ECDi n\u0103ng su\u1EA5t k\u1EBF ho\u1EA1ch l\xE0 $x$ (s\u1EA3n ph\u1EA9m/ng\xE0y; $x\\in\\N^{*}$).",
            "S\u1ED1 ng\xE0y k\u1EBF ho\u1EA1ch: $\\f{1100}{x}$ ; s\u1ED1 ng\xE0y th\u1EF1c t\u1EBF: $\\f{1100}{x+5}$.",
            "Ho\xE0n th\xE0nh s\u1EDBm $2$ ng\xE0y: $\\f{1100}{x}-\\f{1100}{x+5}=2$.",
            "$\\Leftrightarrow 1100(x+5)-1100x=2x(x+5)\\Leftrightarrow 5500=2x^{2}+10x$.",
            "$\\Leftrightarrow x^{2}+5x-2750=0\\Rightarrow x=50$ (nh\u1EADn) ho\u1EB7c $x=-55$ (lo\u1EA1i).",
            "V\u1EADy theo k\u1EBF ho\u1EA1ch m\u1ED7i ng\xE0y s\u1EA3n xu\u1EA5t $50$ s\u1EA3n ph\u1EA9m."
          ],
          pitfall: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $x>0$ v\xE0 kh\xF4ng lo\u1EA1i nghi\u1EC7m \xE2m \u2014 m\u1EA5t \u0111i\u1EC3m \u1EDF b\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu."
        };
      }
      const T = x * (x + d) * som / d;
      const ngay = T / x, ngay2 = T / (x + d);
      return {
        stem: `M\u1ED9t ph\xE2n x\u01B0\u1EDFng theo k\u1EBF ho\u1EA1ch c\u1EA7n s\u1EA3n xu\u1EA5t $${T}$ s\u1EA3n ph\u1EA9m trong m\u1ED9t s\u1ED1 ng\xE0y quy \u0111\u1ECBnh. Do m\u1ED7i ng\xE0y ph\xE2n x\u01B0\u1EDFng s\u1EA3n xu\u1EA5t v\u01B0\u1EE3t m\u1EE9c $${d}$ s\u1EA3n ph\u1EA9m n\xEAn \u0111\xE3 ho\xE0n th\xE0nh k\u1EBF ho\u1EA1ch s\u1EDBm h\u01A1n th\u1EDDi gian quy \u0111\u1ECBnh $${som}$ ng\xE0y.

H\u1ECFi theo k\u1EBF ho\u1EA1ch, m\u1ED7i ng\xE0y ph\xE2n x\u01B0\u1EDFng s\u1EA3n xu\u1EA5t bao nhi\xEAu s\u1EA3n ph\u1EA9m?`,
        answer: String(x),
        thinking: [
          "G\u1ECDi $x$ l\xE0 **n\u0103ng su\u1EA5t k\u1EBF ho\u1EA1ch** (s\u1EA3n ph\u1EA9m/ng\xE0y), \u0111i\u1EC1u ki\u1EC7n $x$ nguy\xEAn d\u01B0\u01A1ng.",
          "S\u1ED1 ng\xE0y $=\\f{\\text{t\u1ED5ng s\u1EA3n ph\u1EA9m}}{\\text{n\u0103ng su\u1EA5t}}$ \u2014 hai ph\xE2n th\u1EE9c, hi\u1EC7u c\u1EE7a ch\xFAng l\xE0 s\u1ED1 ng\xE0y l\xE0m s\u1EDBm.",
          "Ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1EABu ch\u1EE9a \u1EA9n: quy \u0111\u1ED3ng r\u1ED3i \u0111\u01B0a v\u1EC1 ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai."
        ],
        solution: [
          `G\u1ECDi n\u0103ng su\u1EA5t theo k\u1EBF ho\u1EA1ch l\xE0 $x$ (s\u1EA3n ph\u1EA9m/ng\xE0y; $x\\in\\N^{*}$).`,
          `S\u1ED1 ng\xE0y theo k\u1EBF ho\u1EA1ch: $\\f{${T}}{x}$ ; s\u1ED1 ng\xE0y th\u1EF1c t\u1EBF: $\\f{${T}}{x+${d}}$.`,
          `V\xEC ho\xE0n th\xE0nh s\u1EDBm $${som}$ ng\xE0y n\xEAn $\\f{${T}}{x}-\\f{${T}}{x+${d}}=${som}$.`,
          `$\\Leftrightarrow ${T}(x+${d})-${T}x=${co2(som)}x(x+${d})\\Leftrightarrow ${T * d}=${co2(som)}x^{2}+${som * d}x$.`,
          `$\\Leftrightarrow ${co2(som)}x^{2}+${som * d}x-${T * d}=0$, gi\u1EA3i ra $x=${x}$ (nh\u1EADn) ho\u1EB7c $x=${-(x + d)}$ (lo\u1EA1i v\xEC $x>0$).`,
          `\u0110\u1ED1i chi\u1EBFu: $${T}:${x}=${ngay}$ ng\xE0y v\xE0 $${T}:${x + d}=${ngay2}$ ng\xE0y, s\u1EDBm h\u01A1n $${som}$ ng\xE0y \u2713`,
          `V\u1EADy theo k\u1EBF ho\u1EA1ch m\u1ED7i ng\xE0y ph\xE2n x\u01B0\u1EDFng s\u1EA3n xu\u1EA5t $${x}$ s\u1EA3n ph\u1EA9m.`
        ],
        pitfall: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $x>0$ v\xE0 kh\xF4ng lo\u1EA1i nghi\u1EC7m \xE2m \u2014 m\u1EA5t \u0111i\u1EC3m \u1EDF b\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu."
      };
    }
  },
  /* ----------- 8. Lập hệ phương trình — bài toán tỉ lệ phần trăm ----------- */
  {
    id: "g9.lap-he-ti-le",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh \u2014 b\xE0i to\xE1n t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m",
    build: (r) => {
      const pA = r.pick([80, 85, 90]);
      let pB = r.pick([85, 90, 95]);
      if (pB === pA) pB = pA === 90 ? 95 : 90;
      const a = r.int(2, 6) * 100;
      const b = r.int(2, 6) * 100;
      const tongDo = a * pA / 100 + b * pB / 100;
      const tong = a + b;
      const tiChung = Math.round(tongDo / tong * 1e4) / 100;
      return {
        stem: `Hai tr\u01B0\u1EDDng $A$ v\xE0 $B$ c\xF3 t\u1ED5ng c\u1ED9ng $${tongDo}$ h\u1ECDc sinh thi \u0111\u1ED7 v\xE0o l\u1EDBp 10, \u0111\u1EA1t t\u1EC9 l\u1EC7 $${vn2(tiChung)}\\%$ so v\u1EDBi t\u1ED5ng s\u1ED1 h\u1ECDc sinh d\u1EF1 thi c\u1EE7a c\u1EA3 hai tr\u01B0\u1EDDng. Ri\xEAng tr\u01B0\u1EDDng $A$ t\u1EC9 l\u1EC7 \u0111\u1ED7 l\xE0 $${pA}\\%$, ri\xEAng tr\u01B0\u1EDDng $B$ t\u1EC9 l\u1EC7 \u0111\u1ED7 l\xE0 $${pB}\\%$.

T\xEDnh s\u1ED1 h\u1ECDc sinh **d\u1EF1 thi** v\xE0o l\u1EDBp 10 c\u1EE7a tr\u01B0\u1EDDng $A$.`,
        answer: String(a),
        thinking: [
          "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt (s\u1ED1 d\u1EF1 thi m\u1ED7i tr\u01B0\u1EDDng) \u2192 **hai \u1EA9n**, c\u1EA7n hai ph\u01B0\u01A1ng tr\xECnh.",
          "Ph\u01B0\u01A1ng tr\xECnh 1 t\u1EEB **t\u1ED5ng s\u1ED1 d\u1EF1 thi**: suy ra t\u1EEB t\u1EC9 l\u1EC7 \u0111\u1ED7 chung c\u1EE7a c\u1EA3 hai tr\u01B0\u1EDDng.",
          "Ph\u01B0\u01A1ng tr\xECnh 2 t\u1EEB **t\u1ED5ng s\u1ED1 \u0111\u1ED7**: c\u1ED9ng s\u1ED1 h\u1ECDc sinh \u0111\u1ED7 c\u1EE7a t\u1EEBng tr\u01B0\u1EDDng."
        ],
        solution: [
          `G\u1ECDi s\u1ED1 h\u1ECDc sinh d\u1EF1 thi c\u1EE7a tr\u01B0\u1EDDng $A$ l\xE0 $x$, c\u1EE7a tr\u01B0\u1EDDng $B$ l\xE0 $y$ ($x,y\\in\\N^{*}$).`,
          `T\u1EC9 l\u1EC7 \u0111\u1ED7 chung: $\\f{${tongDo}}{x+y}=${vn2(tiChung)}\\%$, suy ra $x+y=\\f{${tongDo}}{${vn2(tiChung / 100)}}=${tong}$. (1)`,
          `T\u1ED5ng s\u1ED1 h\u1ECDc sinh \u0111\u1ED7: $${vn2(pA / 100)}x+${vn2(pB / 100)}y=${tongDo}$. (2)`,
          `T\u1EEB (1): $y=${tong}-x$. Thay v\xE0o (2): $${vn2(pA / 100)}x+${vn2(pB / 100)}(${tong}-x)=${tongDo}$.`,
          `$\\Leftrightarrow ${vn2((pA - pB) / 100)}x=${vn2(Math.round((tongDo - pB / 100 * tong) * 1e3) / 1e3)}\\Rightarrow x=${a}$.`,
          `V\u1EADy tr\u01B0\u1EDDng $A$ c\xF3 $${a}$ h\u1ECDc sinh d\u1EF1 thi (tr\u01B0\u1EDDng $B$ c\xF3 $${b}$ h\u1ECDc sinh).`
        ],
        pitfall: 'Nh\u1EA7m "s\u1ED1 h\u1ECDc sinh **\u0111\u1ED7**" v\u1EDBi "s\u1ED1 h\u1ECDc sinh **d\u1EF1 thi**" khi g\u1ECDi \u1EA9n \u2014 \u0111\u1ECDc k\u0129 \u0111\u1EC1 tr\u01B0\u1EDBc khi l\u1EADp ph\u01B0\u01A1ng tr\xECnh.'
      };
    }
  },
  /* ----------- 9. Lập hệ phương trình — hình chữ nhật đổi kích thước ----------- */
  {
    id: "g9.lap-he-hcn",
    topicId: "g9-t1",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "L\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh \u2014 h\xECnh ch\u1EEF nh\u1EADt thay \u0111\u1ED5i k\xEDch th\u01B0\u1EDBc",
    build: (r) => {
      const rong = r.int(3, 14);
      const dai = rong + r.int(1, 10);
      const tang = dai + rong + 1;
      const giam = dai + 2 * rong - 2;
      return {
        stem: `Cho m\u1ED9t h\xECnh ch\u1EEF nh\u1EADt. N\u1EBFu t\u0103ng \u0111\u1ED9 d\xE0i m\u1ED7i c\u1EA1nh c\u1EE7a n\xF3 th\xEAm $1$ cm th\xEC di\u1EC7n t\xEDch t\u0103ng th\xEAm $${tang}$ cm$^{2}$. N\u1EBFu gi\u1EA3m chi\u1EC1u d\xE0i \u0111i $2$ cm v\xE0 gi\u1EA3m chi\u1EC1u r\u1ED9ng \u0111i $1$ cm th\xEC di\u1EC7n t\xEDch gi\u1EA3m $${giam}$ cm$^{2}$.

T\xEDnh **chi\u1EC1u d\xE0i** c\u1EE7a h\xECnh ch\u1EEF nh\u1EADt \u0111\xE3 cho (cm).`,
        answer: String(dai),
        thinking: [
          "G\u1ECDi chi\u1EC1u d\xE0i $x$, chi\u1EC1u r\u1ED9ng $y$ \u2014 m\u1ED7i t\xECnh hu\u1ED1ng trong \u0111\u1EC1 cho m\u1ED9t ph\u01B0\u01A1ng tr\xECnh.",
          "Khai tri\u1EC3n $(x+1)(y+1)-xy=x+y+1$: c\xE1c h\u1EA1ng t\u1EED $xy$ **tri\u1EC7t ti\xEAu**, c\xF2n l\u1EA1i ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t. \u0110\xE2y l\xE0 m\u1EA5u ch\u1ED1t.",
          "T\u01B0\u01A1ng t\u1EF1 $xy-(x-2)(y-1)=x+2y-2$ c\u0169ng b\u1EADc nh\u1EA5t. V\u1EADy b\xE0i to\xE1n quy v\u1EC1 **h\u1EC7 b\u1EADc nh\u1EA5t hai \u1EA9n**."
        ],
        solution: [
          `G\u1ECDi chi\u1EC1u d\xE0i l\xE0 $x$ cm, chi\u1EC1u r\u1ED9ng l\xE0 $y$ cm ($x>y>0$).`,
          `T\u0103ng m\u1ED7i c\u1EA1nh $1$ cm: $(x+1)(y+1)-xy=${tang}\\Leftrightarrow x+y+1=${tang}\\Leftrightarrow x+y=${tang - 1}$. (1)`,
          `Gi\u1EA3m d\xE0i $2$ cm, r\u1ED9ng $1$ cm: $xy-(x-2)(y-1)=${giam}\\Leftrightarrow x+2y-2=${giam}\\Leftrightarrow x+2y=${giam + 2}$. (2)`,
          `L\u1EA5y (2) tr\u1EEB (1) theo v\u1EBF: $y=${giam + 2 - (tang - 1)}$; thay v\xE0o (1) \u0111\u01B0\u1EE3c $x=${dai}$.`,
          `\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n: $x=${dai}>y=${rong}>0$ \u2713. V\u1EADy chi\u1EC1u d\xE0i l\xE0 $${dai}$ cm.`
        ],
        pitfall: "Khai tri\u1EC3n s\xF3t h\u1EA1ng t\u1EED khi nh\xE2n hai nh\u1ECB th\u1EE9c \u2014 h\xE3y khai tri\u1EC3n \u0111\u1EA7y \u0111\u1EE7 r\u1ED3i m\u1EDBi r\xFAt g\u1ECDn."
      };
    }
  },
  /* ----------- 10. Vị trí tương đối của hai đường tròn ----------- */
  {
    id: "g9.vi-tri-hai-duong-tron",
    topicId: "g9-t6",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a hai \u0111\u01B0\u1EDDng tr\xF2n",
    build: (r) => {
      const R = r.int(5, 14);
      const rr = r.int(2, R - 2);
      const hieu = R - rr, tong = R + rr;
      const loai = r.pick(["catnhau", "tiepngoai", "tieptrong", "ngoainhau", "dungnhau"]);
      const d = loai === "tiepngoai" ? tong : loai === "tieptrong" ? hieu : loai === "ngoainhau" ? tong + r.int(1, 5) : loai === "dungnhau" ? r.int(0, hieu - 1) : r.int(hieu + 1, tong - 1);
      const ten = { catnhau: "C\u1EAFt nhau", tiepngoai: "Ti\u1EBFp x\xFAc ngo\xE0i", tieptrong: "Ti\u1EBFp x\xFAc trong", ngoainhau: "\u1EDE ngo\xE0i nhau", dungnhau: "\u0110\u1EF1ng nhau" };
      const sai = Object.keys(ten).filter((l) => l !== loai).map((l) => ten[l]).slice(0, 3);
      const [options, answer] = mcOptions(r, ten[loai], sai);
      const ketLuan = loai === "ngoainhau" ? `V\xEC $d=${d}>${tong}=R+r$ n\xEAn hai \u0111\u01B0\u1EDDng tr\xF2n **\u1EDF ngo\xE0i nhau** (kh\xF4ng c\xF3 \u0111i\u1EC3m chung).` : loai === "tiepngoai" ? `V\xEC $d=${d}=R+r$ n\xEAn hai \u0111\u01B0\u1EDDng tr\xF2n **ti\u1EBFp x\xFAc ngo\xE0i** (c\xF3 \u0111\xFAng m\u1ED9t \u0111i\u1EC3m chung).` : loai === "tieptrong" ? `V\xEC $d=${d}=|R-r|$ n\xEAn hai \u0111\u01B0\u1EDDng tr\xF2n **ti\u1EBFp x\xFAc trong** (c\xF3 \u0111\xFAng m\u1ED9t \u0111i\u1EC3m chung).` : loai === "dungnhau" ? `V\xEC $d=${d}<${hieu}=|R-r|$ n\xEAn \u0111\u01B0\u1EDDng tr\xF2n l\u1EDBn **\u0111\u1EF1ng** \u0111\u01B0\u1EDDng tr\xF2n nh\u1ECF (kh\xF4ng c\xF3 \u0111i\u1EC3m chung).` : `V\xEC $${hieu}=|R-r|<d=${d}<${tong}=R+r$ n\xEAn hai \u0111\u01B0\u1EDDng tr\xF2n **c\u1EAFt nhau** (c\xF3 hai \u0111i\u1EC3m chung).`;
      return {
        stem: `Cho hai \u0111\u01B0\u1EDDng tr\xF2n $(O;${R}\\;cm)$ v\xE0 $(O';${rr}\\;cm)$ v\u1EDBi $OO'=${d}$ cm. X\xE1c \u0111\u1ECBnh v\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a hai \u0111\u01B0\u1EDDng tr\xF2n:`,
        options,
        answer,
        thinking: [
          `So s\xE1nh $d=OO'$ v\u1EDBi hai m\u1ED1c $R+r$ v\xE0 $|R-r|$ \u2014 ch\u1EC9 c\u1EA7n hai m\u1ED1c n\xE0y l\xE0 ph\xE2n lo\u1EA1i \u0111\u01B0\u1EE3c h\u1EBFt n\u0103m tr\u01B0\u1EDDng h\u1EE3p.`,
          "$d>R+r$: ngo\xE0i nhau \xB7 $d=R+r$: ti\u1EBFp x\xFAc ngo\xE0i \xB7 $|R-r|<d<R+r$: c\u1EAFt nhau \xB7 $d=|R-r|$: ti\u1EBFp x\xFAc trong \xB7 $d<|R-r|$: \u0111\u1EF1ng nhau."
        ],
        solution: [
          `$R+r=${R}+${rr}=${tong}$ ; $|R-r|=${hieu}$ ; $d=${d}$.`,
          ketLuan
        ],
        pitfall: "Qu\xEAn l\u1EA5y **gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i** c\u1EE7a $R-r$ khi $r>R$ \u2014 m\u1ED1c d\u01B0\u1EDBi lu\xF4n l\xE0 $|R-r|$."
      };
    }
  },
  /* ----------- 11. Đa giác đều nội tiếp đường tròn ----------- */
  {
    id: "g9.da-giac-noi-tiep",
    topicId: "g9-t6",
    grade: 9,
    level: "TH",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "\u0110a gi\xE1c \u0111\u1EC1u n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n",
    build: (r) => {
      const map = [
        { q: "Chu vi c\u1EE7a **h\xECnh vu\xF4ng** n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ b\u1EB1ng:", a: "$4R\\s{2}$", w: ["$2R\\s{2}$", "$4R$", "$6R$"], why: "\u0110\u01B0\u1EDDng ch\xE9o h\xECnh vu\xF4ng l\xE0 \u0111\u01B0\u1EDDng k\xEDnh $2R$, n\xEAn c\u1EA1nh $a=\\f{2R}{\\s{2}}=R\\s{2}$; chu vi $=4a=4R\\s{2}$." },
        { q: "C\u1EA1nh c\u1EE7a **h\xECnh vu\xF4ng** n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ b\u1EB1ng:", a: "$R\\s{2}$", w: ["$R\\s{3}$", "$2R$", "$\\f{R\\s{2}}{2}$"], why: "\u0110\u01B0\u1EDDng ch\xE9o b\u1EB1ng \u0111\u01B0\u1EDDng k\xEDnh: $a\\s{2}=2R\\Rightarrow a=R\\s{2}$." },
        { q: "C\u1EA1nh c\u1EE7a **tam gi\xE1c \u0111\u1EC1u** n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ b\u1EB1ng:", a: "$R\\s{3}$", w: ["$R\\s{2}$", "$2R$", "$\\f{R\\s{3}}{2}$"], why: "C\u1EA1nh \u0111a gi\xE1c \u0111\u1EC1u $n$ c\u1EA1nh l\xE0 $a=2R\\sin\\f{180\\deg}{n}$; v\u1EDBi $n=3$: $a=2R\\sin60\\deg=2R\\cdot\\f{\\s{3}}{2}=R\\s{3}$." },
        { q: "C\u1EA1nh c\u1EE7a **l\u1EE5c gi\xE1c \u0111\u1EC1u** n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ b\u1EB1ng:", a: "$R$", w: ["$R\\s{2}$", "$R\\s{3}$", "$2R$"], why: "S\xE1u tam gi\xE1c t\u1EA1o b\u1EDFi t\xE2m v\xE0 c\xE1c c\u1EA1nh c\u1EE7a l\u1EE5c gi\xE1c \u0111\u1EC1u l\xE0 tam gi\xE1c \u0111\u1EC1u, n\xEAn c\u1EA1nh l\u1EE5c gi\xE1c b\u1EB1ng b\xE1n k\xEDnh: $a=R$." }
      ];
      const it = r.pick(map);
      const [options, answer] = mcOptions(r, it.a, [...it.w]);
      return {
        stem: it.q,
        options,
        answer,
        thinking: [
          "C\xF4ng th\u1EE9c chung: \u0111a gi\xE1c \u0111\u1EC1u $n$ c\u1EA1nh n\u1ED9i ti\u1EBFp $(O;R)$ c\xF3 c\u1EA1nh $a=2R\\sin\\f{180\\deg}{n}$.",
          "Ba tr\u01B0\u1EDDng h\u1EE3p c\u1EA7n thu\u1ED9c l\xF2ng: $n=3\\Rightarrow a=R\\s{3}$ ; $n=4\\Rightarrow a=R\\s{2}$ ; $n=6\\Rightarrow a=R$."
        ],
        solution: [it.why],
        pitfall: "Nh\u1EA7m c\u1EA1nh tam gi\xE1c \u0111\u1EC1u ($R\\s{3}$) v\u1EDBi c\u1EA1nh h\xECnh vu\xF4ng ($R\\s{2}$) \u2014 nh\u1EDB theo d\xE3y $\\s{3}$, $\\s{2}$, $1$ \u1EE9ng v\u1EDBi $3$, $4$, $6$ c\u1EA1nh."
      };
    }
  },
  /* ----------- 12. Hình nón sinh bởi tam giác vuông quay ----------- */
  {
    id: "g9.hinh-non-quay",
    topicId: "g9-t6",
    grade: 9,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\xECnh n\xF3n sinh b\u1EDFi tam gi\xE1c vu\xF4ng quay quanh c\u1EA1nh g\xF3c vu\xF4ng",
    build: (r) => {
      const bo = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]);
      const [p, q, l] = bo;
      const quanhAB = r.bool();
      const rBan = quanhAB ? q : p;
      const cao = quanhAB ? p : q;
      const sxq = rBan * l;
      return {
        stem: `Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ v\u1EDBi $AB=${p}$ cm v\xE0 $AC=${q}$ cm. Quay tam gi\xE1c \u0111\xF3 m\u1ED9t v\xF2ng quanh c\u1EA1nh $${quanhAB ? "AB" : "AC"}$ ta \u0111\u01B0\u1EE3c m\u1ED9t h\xECnh n\xF3n.

Di\u1EC7n t\xEDch xung quanh c\u1EE7a h\xECnh n\xF3n \u0111\xF3 b\u1EB1ng $k\\pi$ (cm$^{2}$). T\xEDnh $k$.`,
        answer: String(sxq),
        thinking: [
          "Quay quanh c\u1EA1nh n\xE0o th\xEC c\u1EA1nh \u0111\xF3 l\xE0 **chi\u1EC1u cao** $h$, c\u1EA1nh g\xF3c vu\xF4ng c\xF2n l\u1EA1i l\xE0 **b\xE1n k\xEDnh \u0111\xE1y** $r$, v\xE0 **c\u1EA1nh huy\u1EC1n** l\xE0 \u0111\u01B0\u1EDDng sinh $l$.",
          `\u1EDE \u0111\xE2y quay quanh $${quanhAB ? "AB" : "AC"}$ n\xEAn $h=${cao}$ cm, $r=${rBan}$ cm, $l=BC$.`,
          "$S_{xq}=\\pi r l$ \u2014 d\xF9ng **\u0111\u01B0\u1EDDng sinh** $l$, kh\xF4ng d\xF9ng chi\u1EC1u cao $h$."
        ],
        solution: [
          `C\u1EA1nh huy\u1EC1n $BC=\\s{${p}^{2}+${q}^{2}}=\\s{${p * p + q * q}}=${l}$ cm \u2014 \u0111\xE2y ch\xEDnh l\xE0 \u0111\u01B0\u1EDDng sinh $l$.`,
          `Quay quanh $${quanhAB ? "AB" : "AC"}$ n\xEAn b\xE1n k\xEDnh \u0111\xE1y $r=${rBan}$ cm, chi\u1EC1u cao $h=${cao}$ cm.`,
          `$S_{xq}=\\pi r l=\\pi\\cdot${rBan}\\cdot${l}=${sxq}\\pi$ (cm$^{2}$). V\u1EADy $k=${sxq}$.`
        ],
        pitfall: `D\xF9ng chi\u1EC1u cao $h=${cao}$ thay cho \u0111\u01B0\u1EDDng sinh $l=${l}$ trong c\xF4ng th\u1EE9c $S_{xq}$ \u2014 \u0111\xF3 l\xE0 l\u1ED7i kinh \u0111i\u1EC3n c\u1EE7a d\u1EA1ng n\xE0y.`
      };
    }
  },
  /* ----------- 13. Độ dài cung và diện tích hình quạt ----------- */
  {
    id: "g9.cung-quat-tinh",
    topicId: "g9-t6",
    grade: 9,
    level: "TH",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "\u0110\u1ED9 d\xE0i cung tr\xF2n v\xE0 di\u1EC7n t\xEDch h\xECnh qu\u1EA1t",
    build: (r) => {
      const R = r.pick([3, 5, 6, 9, 10, 12, 15, 18]);
      const n = r.pick([30, 36, 45, 60, 72, 90, 120, 180]);
      const cung = r.bool();
      const [kn, kd] = cung ? reduce(R * n, 180) : reduce(R * R * n, 360);
      const k = kd === 1 ? String(kn) : `\\f{${kn}}{${kd}}`;
      if (cung) {
        return {
          stem: `T\xEDnh \u0111\u1ED9 d\xE0i cung $${n}\\deg$ c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n b\xE1n k\xEDnh $R=${R}$ cm. K\u1EBFt qu\u1EA3 c\xF3 d\u1EA1ng $k\\pi$ (cm); nh\u1EADp gi\xE1 tr\u1ECB c\u1EE7a $k$ (d\u1EA1ng a/b t\u1ED1i gi\u1EA3n n\u1EBFu l\xE0 ph\xE2n s\u1ED1).`,
          answer: kd === 1 ? String(kn) : `${kn}/${kd}`,
          thinking: [
            "\u0110\u1ED9 d\xE0i cung: $\\ell=\\f{\\pi Rn}{180}$ \u2014 b\u1EA3n ch\u1EA5t l\xE0 **t\u1EC9 l\u1EC7 $\\f{n}{360}$ c\u1EE7a chu vi** $2\\pi R$.",
            "Ki\u1EC3m tra nhanh: cung $180\\deg$ ph\u1EA3i cho n\u1EEDa chu vi, t\u1EE9c $\\pi R$."
          ],
          solution: [
            `$\\ell=\\f{\\pi Rn}{180}=\\f{\\pi\\cdot${R}\\cdot${n}}{180}=\\f{${R * n}}{180}\\pi=${k}\\pi$ (cm).`,
            `V\u1EADy $k=${k}$.`
          ],
          pitfall: "Nh\u1EA7m m\u1EABu s\u1ED1 $180$ (d\xF9ng cho \u0111\u1ED9 d\xE0i cung) v\u1EDBi $360$ (d\xF9ng cho di\u1EC7n t\xEDch h\xECnh qu\u1EA1t)."
        };
      }
      return {
        stem: `T\xEDnh di\u1EC7n t\xEDch h\xECnh qu\u1EA1t tr\xF2n c\xF3 b\xE1n k\xEDnh $R=${R}$ cm v\xE0 cung $${n}\\deg$. K\u1EBFt qu\u1EA3 c\xF3 d\u1EA1ng $k\\pi$ (cm$^{2}$); nh\u1EADp gi\xE1 tr\u1ECB c\u1EE7a $k$ (d\u1EA1ng a/b t\u1ED1i gi\u1EA3n n\u1EBFu l\xE0 ph\xE2n s\u1ED1).`,
        answer: kd === 1 ? String(kn) : `${kn}/${kd}`,
        thinking: [
          "Di\u1EC7n t\xEDch h\xECnh qu\u1EA1t: $S=\\f{\\pi R^{2}n}{360}$ \u2014 b\u1EA3n ch\u1EA5t l\xE0 **t\u1EC9 l\u1EC7 $\\f{n}{360}$ c\u1EE7a di\u1EC7n t\xEDch h\xECnh tr\xF2n** $\\pi R^{2}$.",
          "C\xE1ch nh\u1EDB kh\xE1c: $S=\\f{\\ell R}{2}$ v\u1EDBi $\\ell$ l\xE0 \u0111\u1ED9 d\xE0i cung t\u01B0\u01A1ng \u1EE9ng."
        ],
        solution: [
          `$S=\\f{\\pi R^{2}n}{360}=\\f{\\pi\\cdot${R * R}\\cdot${n}}{360}=\\f{${R * R * n}}{360}\\pi=${k}\\pi$ (cm$^{2}$).`,
          `V\u1EADy $k=${k}$.`
        ],
        pitfall: "Qu\xEAn b\xECnh ph\u01B0\u01A1ng b\xE1n k\xEDnh, ho\u1EB7c d\xF9ng m\u1EABu $180$ thay v\xEC $360$."
      };
    }
  },
  /* ----------- 14. Phương trình bậc bốn đối xứng ----------- */
  {
    id: "g9.pt-doi-xung-bac-4",
    topicId: "g9-t3",
    grade: 9,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc b\u1ED1n \u0111\u1ED1i x\u1EE9ng \u2014 \u0111\u1EB7t \u1EA9n ph\u1EE5",
    build: (r) => {
      const t0 = r.pick([-4, -3, -2, 2, 3, 4]);
      const t1 = r.pick([-5, -1, 1, 5]);
      const a = -(t0 + t1);
      const b = t0 * t1 + 2;
      const dem = (t) => Math.abs(t) > 2 ? 2 : Math.abs(t) === 2 ? 1 : 0;
      const soNghiem = dem(t0) + dem(t1);
      const noi = (t) => Math.abs(t) > 2 ? `$|${t}|>2$ n\xEAn cho **2** nghi\u1EC7m $x$.` : Math.abs(t) === 2 ? `$|${t}|=2$ n\xEAn cho **1** nghi\u1EC7m $x$ (nghi\u1EC7m k\xE9p $x=${t / 2}$).` : `$|${t}|<2$ n\xEAn **lo\u1EA1i** (kh\xF4ng c\xF3 $x$ th\u1EF1c n\xE0o).`;
      return {
        stem: `Ph\u01B0\u01A1ng tr\xECnh $x^{4}${hang(a, "x^{3}")}${hang(b, "x^{2}")}${hang(a, "x")}+1=0$ c\xF3 bao nhi\xEAu nghi\u1EC7m th\u1EF1c ph\xE2n bi\u1EC7t?`,
        answer: String(soNghiem),
        thinking: [
          "D\xE3y h\u1EC7 s\u1ED1 **\u0111\u1ED1i x\u1EE9ng** ($1,\\;a,\\;b,\\;a,\\;1$) \u2192 chia hai v\u1EBF cho $x^{2}$ ($x=0$ kh\xF4ng l\xE0 nghi\u1EC7m v\xEC thay v\xE0o cho $1=0$).",
          "Gh\xE9p c\u1EB7p r\u1ED3i \u0111\u1EB7t $t=x+\\f{1}{x}$; khi \u0111\xF3 $x^{2}+\\f{1}{x^{2}}=t^{2}-2$, ph\u01B0\u01A1ng tr\xECnh th\xE0nh b\u1EADc hai theo $t$.",
          "**\u0110i\u1EC1u ki\u1EC7n then ch\u1ED1t:** $t=x+\\f{1}{x}$ ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB $|t|\\ge2$. M\u1ED7i $t$ v\u1EDBi $|t|>2$ cho **hai** nghi\u1EC7m $x$; $|t|=2$ cho **m\u1ED9t**; $|t|<2$ b\u1ECB lo\u1EA1i."
        ],
        solution: [
          `Nh\u1EADn th\u1EA5y $x=0$ kh\xF4ng l\xE0 nghi\u1EC7m. Chia hai v\u1EBF cho $x^{2}$:`,
          `$\\left(x^{2}+\\f{1}{x^{2}}\\right)${heso(a)}\\left(x+\\f{1}{x}\\right)${hang(b, "")}=0$.`,
          `\u0110\u1EB7t $t=x+\\f{1}{x}$, ta c\xF3 $x^{2}+\\f{1}{x^{2}}=t^{2}-2$, ph\u01B0\u01A1ng tr\xECnh tr\u1EDF th\xE0nh $t^{2}${hang(a, "t")}${hang(b - 2, "")}=0$.`,
          `Gi\u1EA3i ra $t=${t0}$ ho\u1EB7c $t=${t1}$.`,
          `\u2022 V\u1EDBi $t=${t0}$: ${noi(t0)}`,
          `\u2022 V\u1EDBi $t=${t1}$: ${noi(t1)}`,
          `V\u1EADy ph\u01B0\u01A1ng tr\xECnh c\xF3 $${soNghiem}$ nghi\u1EC7m th\u1EF1c ph\xE2n bi\u1EC7t.`
        ],
        pitfall: "B\u1ECF qua \u0111i\u1EC1u ki\u1EC7n $|t|\\ge2$ v\xE0 k\u1EBFt lu\u1EADn th\u1EEBa nghi\u1EC7m \u2014 \u0111\xE2y l\xE0 b\u1EABy ch\xEDnh c\u1EE7a d\u1EA1ng \u0111\u1EB7t \u1EA9n ph\u1EE5 n\xE0y."
      };
    }
  },
  /* ----------- 15. Tự luận rút gọn biểu thức chứa căn (câu 1 vào 10) ----------- */
  {
    id: "g9.tl-rutgon-timx",
    topicId: "g9-t2",
    grade: 9,
    level: "VD",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 r\xFAt g\u1ECDn v\xE0 b\xE0i to\xE1n ph\u1EE5 (c\xE2u 1 thi v\xE0o 10)",
    build: (r) => {
      const a = r.pick([1, 2, 3, 4, 5]);
      const a2 = a * a;
      const xT = r.pick([9, 16, 25, 36, 49, 64]).valueOf();
      const xTest = xT === a2 ? xT + 11 : xT;
      const sx = Math.round(Math.sqrt(xTest));
      const uoc = [];
      for (let dd = 1; dd <= a; dd++) if (a % dd === 0) uoc.push(dd, -dd);
      const nghiem = uoc.map((u) => u + a).filter((t) => t > 0 && t * t !== a2).map((t) => t * t);
      const dsNghiem = [...new Set(nghiem)].sort((p, q) => p - q);
      return {
        stem: `Cho hai bi\u1EC3u th\u1EE9c $A=\\f{\\s{x}+${a}}{\\s{x}}$ v\xE0 $B=\\f{\\s{x}}{\\s{x}-${a}}-\\f{${a}\\s{x}}{x-${a2}}$ v\u1EDBi $x>0$, $x\\ne${a2}$.

a) T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $A$ khi $x=${xTest}$.

b) R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c $B$.

c) \u0110\u1EB7t $P=A\\cdot B$. T\xECm c\xE1c gi\xE1 tr\u1ECB $x$ l\xE0 **s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng** \u0111\u1EC3 $P$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn.`,
        answer: "",
        rubric: [
          { criterion: `a) T\xEDnh $\\s{${xTest}}=${sx}$, thay \u0111\xFAng v\xE0 \u0111\u01B0\u1EE3c $A=\\f{${sx + a}}{${sx}}$`, points: 1 },
          { criterion: `b) Ph\xE2n t\xEDch $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$ \u0111\u1EC3 t\xECm m\u1EABu th\u1EE9c chung`, points: 1 },
          { criterion: `b) Quy \u0111\u1ED3ng, r\xFAt g\u1ECDn \u0111\u01B0\u1EE3c $B=\\f{x}{x-${a2}}$`, points: 1 },
          { criterion: `c) T\xEDnh v\xE0 r\xFAt g\u1ECDn $P=A\\cdot B=\\f{\\s{x}}{\\s{x}-${a}}$`, points: 1 },
          { criterion: `c) T\xE1ch $P=1+\\f{${a}}{\\s{x}-${a}}$, l\u1EADp b\u1EA3ng \u01B0\u1EDBc v\xE0 \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n`, points: 1 }
        ],
        thinking: [
          `B\u01B0\u1EDBc \u0111\u1EA7u ti\xEAn c\u1EE7a m\u1ECDi b\xE0i r\xFAt g\u1ECDn: **ph\xE2n t\xEDch c\xE1c m\u1EABu th\xE0nh nh\xE2n t\u1EED**. \u1EDE \u0111\xE2y $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$ \u2014 \u0111\xE2y l\xE0 m\u1EABu th\u1EE9c chung.`,
          "\xDD a ch\u1EC9 c\u1EA7n **thay s\u1ED1**, nh\u01B0ng ph\u1EA3i \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh tr\u01B0\u1EDBc khi thay.",
          `\xDD c: sau khi r\xFAt g\u1ECDn \u0111\u01B0\u1EE3c $P$, h\xE3y **t\xE1ch ph\u1EA7n nguy\xEAn**: $\\f{\\s{x}}{\\s{x}-${a}}=1+\\f{${a}}{\\s{x}-${a}}$.`,
          `$P$ nguy\xEAn $\\Leftrightarrow \\s{x}-${a}$ l\xE0 **\u01B0\u1EDBc** c\u1EE7a $${a}$; v\xEC $x$ ch\xEDnh ph\u01B0\u01A1ng n\xEAn $\\s{x}$ l\xE0 s\u1ED1 nguy\xEAn d\u01B0\u01A1ng, l\u1EADp b\u1EA3ng \u01B0\u1EDBc l\xE0 xong.`
        ],
        solution: [
          `**a)** $x=${xTest}$ tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n ($x>0$, $x\\ne${a2}$). Ta c\xF3 $\\s{${xTest}}=${sx}$.`,
          `$A=\\f{${sx}+${a}}{${sx}}=\\f{${sx + a}}{${sx}}$.`,
          `**b)** M\u1EABu th\u1EE9c chung: $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$.`,
          `$B=\\f{\\s{x}(\\s{x}+${a})}{(\\s{x}-${a})(\\s{x}+${a})}-\\f{${a}\\s{x}}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x+${a}\\s{x}-${a}\\s{x}}{(\\s{x}-${a})(\\s{x}+${a})}$.`,
          `$B=\\f{x}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x}{x-${a2}}$.`,
          `**c)** $P=A\\cdot B=\\f{\\s{x}+${a}}{\\s{x}}\\cdot\\f{x}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x}{\\s{x}(\\s{x}-${a})}=\\f{\\s{x}}{\\s{x}-${a}}$.`,
          `T\xE1ch ph\u1EA7n nguy\xEAn: $P=\\f{(\\s{x}-${a})+${a}}{\\s{x}-${a}}=1+\\f{${a}}{\\s{x}-${a}}$.`,
          `\u0110\u1EB7t $t=\\s{x}$ ($t$ nguy\xEAn d\u01B0\u01A1ng v\xEC $x$ ch\xEDnh ph\u01B0\u01A1ng, $t\\ne${a}$). $P$ nguy\xEAn $\\Leftrightarrow (t-${a})\\in\\text{\u01AF}(${a})=\\{${uoc.sort((p, q) => p - q).join(";")}\\}$.`,
          `Suy ra $t\\in\\{${[...new Set(uoc.map((u) => u + a).filter((t) => t > 0))].sort((p, q) => p - q).join(";")}\\}$, t\u1EE9c $x\\in\\{${dsNghiem.join(";")}\\}$.`,
          `\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $x>0$, $x\\ne${a2}$: t\u1EA5t c\u1EA3 c\xE1c gi\xE1 tr\u1ECB tr\xEAn \u0111\u1EC1u tho\u1EA3. V\u1EADy $x\\in\\{${dsNghiem.join(";")}\\}$.`
        ]
      };
    }
  }
];

// src/bank/kit.ts
var ABCD = ["a", "b", "c", "d"];
function tfFrom(r, pool, opts) {
  const seen = /* @__PURE__ */ new Set();
  const uniq = pool.filter((c) => seen.has(c.t) ? false : (seen.add(c.t), true));
  const dung = uniq.filter((c) => c.ok);
  const sai = uniq.filter((c) => !c.ok);
  const soDung = Math.min(dung.length, Math.max(1, Math.min(3, r.int(1, 3))));
  const soSai = Math.min(sai.length, 4 - soDung);
  const chon = r.shuffle([
    ...r.shuffle(dung).slice(0, soDung),
    ...r.shuffle(sai).slice(0, soSai)
  ]);
  while (chon.length < 4) {
    const con = uniq.filter((c) => !chon.includes(c));
    if (con.length === 0) break;
    chon.push(r.pick(con));
  }
  const bon = chon.slice(0, 4);
  return {
    stem: opts.stem ?? "X\xE9t t\xEDnh \u0111\xFAng \u2013 sai c\u1EE7a m\u1ED7i kh\u1EB3ng \u0111\u1ECBnh sau:",
    options: bon.map((c) => c.t),
    answer: bon.map((c) => c.ok),
    thinking: opts.thinking,
    solution: bon.map((c, i) => `${ABCD[i]}) **${c.ok ? "\u0110\xFAng" : "Sai"}** \u2014 ${c.why}`),
    pitfall: opts.pitfall
  };
}
function mcFrom(r, pool, opts) {
  const it = r.pick(pool);
  const [options, answer] = mcOptions(r, it.a, [...it.w]);
  return {
    stem: it.q,
    options,
    answer,
    thinking: opts.thinking,
    solution: [`\u0110\xE1p \xE1n \u0111\xFAng: ${it.a}.`, it.why],
    pitfall: it.trap ?? opts.pitfall
  };
}

// src/bank/g6-nb.ts
var MC_TAP_HOP = [
  {
    q: "C\xE1ch vi\u1EBFt n\xE0o sau \u0111\xE2y **\u0111\xFAng**?",
    a: "$5\\in\\N$",
    w: ["$5\\subset\\N$", "$\\{5\\}\\in\\N$", "$-5\\in\\N$"],
    why: "K\xFD hi\u1EC7u $\\in$ n\u1ED1i **ph\u1EA7n t\u1EED** v\u1EDBi t\u1EADp h\u1EE3p; $\\subset$ n\u1ED1i **t\u1EADp h\u1EE3p** v\u1EDBi t\u1EADp h\u1EE3p.",
    trap: "Vi\u1EBFt $5\\subset\\N$ l\xE0 sai v\xEC $5$ l\xE0 ph\u1EA7n t\u1EED ch\u1EE9 kh\xF4ng ph\u1EA3i t\u1EADp h\u1EE3p."
  },
  {
    q: "T\u1EADp h\u1EE3p $A=\\{x\\in\\N\\;|\\;3<x\\le7\\}$ c\xF3 bao nhi\xEAu ph\u1EA7n t\u1EED?",
    a: "$4$",
    w: ["$3$", "$5$", "$6$"],
    why: "$A=\\{4;5;6;7\\}$ \u2014 d\u1EA5u $<$ lo\u1EA1i $3$, d\u1EA5u $\\le$ gi\u1EEF l\u1EA1i $7$.",
    trap: "Nh\u1EA7m $\\le$ th\xE0nh $<$ s\u1EBD m\u1EA5t ph\u1EA7n t\u1EED $7$."
  },
  {
    q: "S\u1ED1 ph\u1EA7n t\u1EED c\u1EE7a t\u1EADp h\u1EE3p c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn t\u1EEB $12$ \u0111\u1EBFn $60$ l\xE0:",
    a: "$49$",
    w: ["$48$", "$50$", "$47$"],
    why: "S\u1ED1 ph\u1EA7n t\u1EED $=(60-12):1+1=49$ \u2014 nh\u1EDB **c\u1ED9ng 1** \u1EDF cu\u1ED1i.",
    trap: "Ch\u1EC9 l\u1EA5y $60-12=48$ l\xE0 qu\xEAn \u0111\u1EBFm ch\xEDnh s\u1ED1 \u0111\u1EA7u d\xE3y."
  },
  {
    q: "Trong h\u1EC7 La M\xE3, s\u1ED1 $\\text{XIV}$ c\xF3 gi\xE1 tr\u1ECB l\xE0:",
    a: "$14$",
    w: ["$16$", "$4$", "$24$"],
    why: "$\\text{X}=10$, $\\text{IV}=4$ n\xEAn $\\text{XIV}=10+4=14$."
  },
  {
    q: "Trong s\u1ED1 $470\\,052$, ch\u1EEF s\u1ED1 $7$ c\xF3 gi\xE1 tr\u1ECB b\u1EB1ng:",
    a: "$70\\,000$",
    w: ["$7$", "$7\\,000$", "$700\\,000$"],
    why: "Ch\u1EEF s\u1ED1 $7$ \u0111\u1EE9ng \u1EDF h\xE0ng ch\u1EE5c ngh\xECn n\xEAn c\xF3 gi\xE1 tr\u1ECB $7\\cdot10\\,000=70\\,000$.",
    trap: 'Nh\u1EA7m "ch\u1EEF s\u1ED1" (l\xE0 $7$) v\u1EDBi "gi\xE1 tr\u1ECB c\u1EE7a ch\u1EEF s\u1ED1" (l\xE0 $70\\,000$).'
  },
  {
    q: "K\u1EBFt qu\u1EA3 c\u1EE7a ph\xE9p t\xEDnh $2^{3}\\cdot2^{4}$ l\xE0:",
    a: "$2^{7}$",
    w: ["$2^{12}$", "$4^{7}$", "$2^{1}$"],
    why: "Nh\xE2n hai lu\u1EF9 th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 th\xEC **gi\u1EEF c\u01A1 s\u1ED1, c\u1ED9ng s\u1ED1 m\u0169**: $2^{3+4}=2^{7}$.",
    trap: "Nh\xE2n s\u1ED1 m\u0169 ($2^{12}$) ho\u1EB7c nh\xE2n c\u1EA3 c\u01A1 s\u1ED1 ($4^{7}$) \u0111\u1EC1u sai."
  },
  {
    q: "Gi\xE1 tr\u1ECB c\u1EE7a $5^{0}+5^{1}$ l\xE0:",
    a: "$6$",
    w: ["$5$", "$10$", "$0$"],
    why: "M\u1ECDi s\u1ED1 kh\xE1c $0$ lu\u1EF9 th\u1EEBa $0$ \u0111\u1EC1u b\u1EB1ng $1$, n\xEAn $5^{0}+5^{1}=1+5=6$.",
    trap: "Vi\u1EBFt $5^{0}=0$ l\xE0 l\u1ED7i r\u1EA5t ph\u1ED5 bi\u1EBFn."
  },
  {
    q: "Trong ph\xE9p chia c\xF3 d\u01B0 $a=b\\cdot q+r$, \u0111i\u1EC1u ki\u1EC7n c\u1EE7a s\u1ED1 d\u01B0 $r$ l\xE0:",
    a: "$0\\le r<b$",
    w: ["$0<r<b$", "$0\\le r\\le b$", "$r<b$"],
    why: "S\u1ED1 d\u01B0 lu\xF4n kh\xF4ng \xE2m v\xE0 lu\xF4n **nh\u1ECF h\u01A1n** s\u1ED1 chia."
  }
];
var MC_CHIA_HET = [
  {
    q: "S\u1ED1 n\xE0o sau \u0111\xE2y chia h\u1EBFt cho c\u1EA3 $2$ v\xE0 $5$?",
    a: "$1\\,230$",
    w: ["$1\\,235$", "$1\\,232$", "$1\\,203$"],
    why: "Chia h\u1EBFt cho c\u1EA3 $2$ v\xE0 $5$ th\xEC ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng ph\u1EA3i l\xE0 $0$."
  },
  {
    q: "S\u1ED1 $\\ov{34x}$ chia h\u1EBFt cho $9$ khi $x$ b\u1EB1ng:",
    a: "$2$",
    w: ["$0$", "$5$", "$8$"],
    why: "T\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 $3+4+x=7+x$ ph\u1EA3i chia h\u1EBFt cho $9$, n\xEAn $x=2$.",
    trap: "X\xE9t ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng thay v\xEC t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 \u2014 d\u1EA5u hi\u1EC7u c\u1EE7a $9$ d\xF9ng **t\u1ED5ng**."
  },
  {
    q: "Trong c\xE1c s\u1ED1 sau, s\u1ED1 n\xE0o l\xE0 **h\u1EE3p s\u1ED1**?",
    a: "$91$",
    w: ["$89$", "$97$", "$83$"],
    why: "$91=7\\cdot13$ n\xEAn l\xE0 h\u1EE3p s\u1ED1; $83$, $89$, $97$ \u0111\u1EC1u l\xE0 s\u1ED1 nguy\xEAn t\u1ED1.",
    trap: "$91$ tr\xF4ng gi\u1ED1ng s\u1ED1 nguy\xEAn t\u1ED1 nh\u01B0ng chia h\u1EBFt cho $7$ \u2014 lu\xF4n th\u1EED chia t\u1EDBi $\\s{n}$."
  },
  {
    q: "Ph\xE2n t\xEDch $60$ ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 ta \u0111\u01B0\u1EE3c:",
    a: "$2^{2}\\cdot3\\cdot5$",
    w: ["$2\\cdot3\\cdot10$", "$4\\cdot15$", "$2^{2}\\cdot15$"],
    why: "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 th\xEC m\u1ECDi th\u1EEBa s\u1ED1 \u0111\u1EC1u ph\u1EA3i l\xE0 **s\u1ED1 nguy\xEAn t\u1ED1**.",
    trap: "$10$, $15$, $4$ \u0111\u1EC1u l\xE0 h\u1EE3p s\u1ED1 n\xEAn c\xE1c c\xE1ch vi\u1EBFt kia ch\u01B0a ph\u1EA3i ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1."
  },
  {
    q: "Kh\u1EB3ng \u0111\u1ECBnh n\xE0o sau \u0111\xE2y **sai**?",
    a: "$1$ l\xE0 s\u1ED1 nguy\xEAn t\u1ED1",
    w: ["$2$ l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t", "$0$ chia h\u1EBFt cho m\u1ECDi s\u1ED1 kh\xE1c $0$", "M\u1ECDi s\u1ED1 nguy\xEAn t\u1ED1 l\u1EDBn h\u01A1n $2$ \u0111\u1EC1u l\u1EBB"],
    why: "$1$ ch\u1EC9 c\xF3 **m\u1ED9t** \u01B0\u1EDBc l\xE0 ch\xEDnh n\xF3, n\xEAn kh\xF4ng ph\u1EA3i s\u1ED1 nguy\xEAn t\u1ED1 c\u0169ng kh\xF4ng ph\u1EA3i h\u1EE3p s\u1ED1."
  },
  {
    q: "N\u1EBFu $a\\;\\vdots\\;m$ v\xE0 $b\\;\\vdots\\;m$ th\xEC:",
    a: "$(a+b)\\;\\vdots\\;m$",
    w: ["$(a+b)$ kh\xF4ng chia h\u1EBFt cho $m$", "$(a\\cdot b)\\;\\vdots\\;m^{2}$ l\xE0 \u0111i\u1EC1u ki\u1EC7n c\u1EA7n", "$\\f{a}{b}\\;\\vdots\\;m$"],
    why: "T\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a m\u1ED9t t\u1ED5ng: hai s\u1ED1 h\u1EA1ng c\xF9ng chia h\u1EBFt cho $m$ th\xEC t\u1ED5ng chia h\u1EBFt cho $m$."
  }
];
var MC_PHAN_SO = [
  {
    q: "Ph\xE2n s\u1ED1 n\xE0o sau \u0111\xE2y **b\u1EB1ng** $\\f{3}{4}$?",
    a: "$\\f{15}{20}$",
    w: ["$\\f{6}{9}$", "$\\f{4}{3}$", "$\\f{7}{8}$"],
    why: "$\\f{15}{20}=\\f{15:5}{20:5}=\\f{3}{4}$."
  },
  {
    q: "K\u1EBFt qu\u1EA3 r\xFAt g\u1ECDn c\u1EE7a $\\f{18}{24}$ l\xE0:",
    a: "$\\f{3}{4}$",
    w: ["$\\f{9}{12}$", "$\\f{6}{8}$", "$\\f{2}{3}$"],
    why: "\u01AFCLN$(18;24)=6$ n\xEAn $\\f{18}{24}=\\f{3}{4}$ \u2014 \u0111\xE2y m\u1EDBi l\xE0 d\u1EA1ng **t\u1ED1i gi\u1EA3n**.",
    trap: "$\\f{9}{12}$ v\xE0 $\\f{6}{8}$ tuy b\u1EB1ng $\\f{3}{4}$ nh\u01B0ng **ch\u01B0a t\u1ED1i gi\u1EA3n**."
  },
  {
    q: "S\u1ED1 \u0111\u1ED1i c\u1EE7a $-\\f{5}{7}$ l\xE0:",
    a: "$\\f{5}{7}$",
    w: ["$-\\f{7}{5}$", "$\\f{7}{5}$", "$-\\f{5}{7}$"],
    why: "S\u1ED1 \u0111\u1ED1i ch\u1EC9 **\u0111\u1ED5i d\u1EA5u**; s\u1ED1 ngh\u1ECBch \u0111\u1EA3o m\u1EDBi l\xE0 l\u1EADt ng\u01B0\u1EE3c t\u1EED v\xE0 m\u1EABu.",
    trap: "Nh\u1EA7m s\u1ED1 \u0111\u1ED1i v\u1EDBi s\u1ED1 ngh\u1ECBch \u0111\u1EA3o l\xE0 l\u1ED7i hay g\u1EB7p nh\u1EA5t \u1EDF d\u1EA1ng n\xE0y."
  },
  {
    q: "H\u1ED7n s\u1ED1 $3\\f{2}{5}$ vi\u1EBFt d\u01B0\u1EDBi d\u1EA1ng ph\xE2n s\u1ED1 l\xE0:",
    a: "$\\f{17}{5}$",
    w: ["$\\f{11}{5}$", "$\\f{6}{5}$", "$\\f{32}{5}$"],
    why: "$3\\f{2}{5}=\\f{3\\cdot5+2}{5}=\\f{17}{5}$."
  },
  {
    q: "$25\\%$ c\u1EE7a $80$ b\u1EB1ng:",
    a: "$20$",
    w: ["$25$", "$32$", "$16$"],
    why: "$25\\%=\\f{1}{4}$ n\xEAn $25\\%$ c\u1EE7a $80$ l\xE0 $80:4=20$."
  },
  {
    q: "S\u1ED1 th\u1EADp ph\xE2n $0{,}125$ vi\u1EBFt d\u01B0\u1EDBi d\u1EA1ng ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n l\xE0:",
    a: "$\\f{1}{8}$",
    w: ["$\\f{125}{100}$", "$\\f{1}{4}$", "$\\f{125}{1000}$"],
    why: "$0{,}125=\\f{125}{1000}=\\f{1}{8}$ sau khi r\xFAt g\u1ECDn cho $125$."
  }
];
var MC_HINH_HOC = [
  {
    q: "H\xECnh n\xE0o sau \u0111\xE2y c\xF3 **b\u1ED1n tr\u1EE5c \u0111\u1ED1i x\u1EE9ng**?",
    a: "H\xECnh vu\xF4ng",
    w: ["H\xECnh ch\u1EEF nh\u1EADt", "H\xECnh thoi", "H\xECnh b\xECnh h\xE0nh"],
    why: "H\xECnh vu\xF4ng c\xF3 2 tr\u1EE5c qua trung \u0111i\u1EC3m c\xE1c c\u1EA1nh v\xE0 2 tr\u1EE5c l\xE0 \u0111\u01B0\u1EDDng ch\xE9o.",
    trap: "H\xECnh ch\u1EEF nh\u1EADt v\xE0 h\xECnh thoi m\u1ED7i h\xECnh ch\u1EC9 c\xF3 $2$ tr\u1EE5c; h\xECnh b\xECnh h\xE0nh **kh\xF4ng c\xF3** tr\u1EE5c \u0111\u1ED1i x\u1EE9ng."
  },
  {
    q: "H\xECnh n\xE0o sau \u0111\xE2y **kh\xF4ng** c\xF3 t\xE2m \u0111\u1ED1i x\u1EE9ng?",
    a: "Tam gi\xE1c \u0111\u1EC1u",
    w: ["H\xECnh vu\xF4ng", "H\xECnh ch\u1EEF nh\u1EADt", "H\xECnh l\u1EE5c gi\xE1c \u0111\u1EC1u"],
    why: "Tam gi\xE1c \u0111\u1EC1u c\xF3 $3$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng nh\u01B0ng **kh\xF4ng** c\xF3 t\xE2m \u0111\u1ED1i x\u1EE9ng."
  },
  {
    q: "C\xF4ng th\u1EE9c t\xEDnh di\u1EC7n t\xEDch h\xECnh thoi c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o $d_1$, $d_2$ l\xE0:",
    a: "$S=\\f{d_1\\cdot d_2}{2}$",
    w: ["$S=d_1\\cdot d_2$", "$S=\\f{d_1+d_2}{2}$", "$S=2d_1d_2$"],
    why: "Di\u1EC7n t\xEDch h\xECnh thoi b\u1EB1ng **n\u1EEDa t\xEDch hai \u0111\u01B0\u1EDDng ch\xE9o**."
  },
  {
    q: "H\xECnh thang c\xE2n c\xF3 t\xEDnh ch\u1EA5t n\xE0o sau \u0111\xE2y?",
    a: "Hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau",
    w: ["B\u1ED1n c\u1EA1nh b\u1EB1ng nhau", "Hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c", "B\u1ED1n g\xF3c b\u1EB1ng nhau"],
    why: "H\xECnh thang c\xE2n c\xF3 hai c\u1EA1nh b\xEAn b\u1EB1ng nhau v\xE0 hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau."
  },
  {
    q: "Chu vi h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $a$, chi\u1EC1u r\u1ED9ng $b$ l\xE0:",
    a: "$2(a+b)$",
    w: ["$a+b$", "$a\\cdot b$", "$a+b+ab$"],
    why: "Chu vi b\u1EB1ng t\u1ED5ng b\u1ED1n c\u1EA1nh $=a+b+a+b=2(a+b)$.",
    trap: "Nh\u1EA7m chu vi v\u1EDBi di\u1EC7n t\xEDch $a\\cdot b$."
  }
];
var BANK_G6_NB = [
  {
    id: "g6.nb-tap-hop-mo-rong",
    topicId: "g6-t1",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\u1EADp h\u1EE3p, s\u1ED1 t\u1EF1 nhi\xEAn v\xE0 lu\u1EF9 th\u1EEBa",
    build: (r) => mcFrom(r, MC_TAP_HOP, {
      thinking: [
        "Nh\xF3m c\xE2u n\xE0y ki\u1EC3m tra **k\xFD hi\u1EC7u** v\xE0 **quy t\u1EAFc** \u2014 \u0111\u1ECDc k\u1EF9 t\u1EEBng k\xFD hi\u1EC7u tr\u01B0\u1EDBc khi t\xEDnh.",
        "V\u1EDBi b\xE0i \u0111\u1EBFm ph\u1EA7n t\u1EED c\u1EE7a d\xE3y c\xE1ch \u0111\u1EC1u: s\u1ED1 ph\u1EA7n t\u1EED $=(\\text{cu\u1ED1i}-\\text{\u0111\u1EA7u}):\\text{kho\u1EA3ng c\xE1ch}+1$."
      ]
    })
  },
  {
    id: "g6.nb-chia-het-mo-rong",
    topicId: "g6-t2",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Chia h\u1EBFt, s\u1ED1 nguy\xEAn t\u1ED1 v\xE0 ph\xE2n t\xEDch th\u1EEBa s\u1ED1",
    build: (r) => mcFrom(r, MC_CHIA_HET, {
      thinking: [
        "D\u1EA5u hi\u1EC7u chia h\u1EBFt cho $2$ v\xE0 $5$ nh\xECn **ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng**; cho $3$ v\xE0 $9$ nh\xECn **t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1**.",
        "Mu\u1ED1n bi\u1EBFt m\u1ED9t s\u1ED1 c\xF3 ph\u1EA3i s\u1ED1 nguy\xEAn t\u1ED1 kh\xF4ng, ch\u1EC9 c\u1EA7n th\u1EED chia cho c\xE1c s\u1ED1 nguy\xEAn t\u1ED1 kh\xF4ng v\u01B0\u1EE3t qu\xE1 $\\s{n}$."
      ]
    })
  },
  {
    id: "g6.nb-phan-so-mo-rong",
    topicId: "g6-t4",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\xE2n s\u1ED1, h\u1ED7n s\u1ED1, s\u1ED1 th\u1EADp ph\xE2n v\xE0 ph\u1EA7n tr\u0103m",
    build: (r) => mcFrom(r, MC_PHAN_SO, {
      thinking: [
        "Hai ph\xE2n s\u1ED1 b\u1EB1ng nhau khi r\xFAt g\u1ECDn v\u1EC1 c\xF9ng m\u1ED9t d\u1EA1ng **t\u1ED1i gi\u1EA3n** \u2014 lu\xF4n r\xFAt g\u1ECDn tr\u01B0\u1EDBc khi so s\xE1nh.",
        "Ph\xE2n bi\u1EC7t r\xF5 **s\u1ED1 \u0111\u1ED1i** (\u0111\u1ED5i d\u1EA5u) v\u1EDBi **s\u1ED1 ngh\u1ECBch \u0111\u1EA3o** (l\u1EADt t\u1EED \u2013 m\u1EABu)."
      ]
    })
  },
  {
    id: "g6.nb-hinh-hoc-mo-rong",
    topicId: "g6-t5",
    grade: 6,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "H\xECnh ph\u1EB3ng, \u0111\u1ED1i x\u1EE9ng v\xE0 c\xF4ng th\u1EE9c chu vi \u2013 di\u1EC7n t\xEDch",
    build: (r) => mcFrom(r, MC_HINH_HOC, {
      thinking: [
        "Ghi nh\u1EDB theo b\u1EA3ng: h\xECnh vu\xF4ng $4$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng, h\xECnh ch\u1EEF nh\u1EADt v\xE0 h\xECnh thoi $2$ tr\u1EE5c, h\xECnh b\xECnh h\xE0nh $0$ tr\u1EE5c.",
        "T\xE2m \u0111\u1ED1i x\u1EE9ng v\xE0 tr\u1EE5c \u0111\u1ED1i x\u1EE9ng l\xE0 hai kh\xE1i ni\u1EC7m kh\xE1c nhau \u2014 m\u1ED9t h\xECnh c\xF3 th\u1EC3 c\xF3 c\xE1i n\xE0y m\xE0 kh\xF4ng c\xF3 c\xE1i kia."
      ]
    })
  },
  /* ------------------------- CÂU ĐÚNG / SAI ------------------------- */
  {
    id: "g6.tf-so-tu-nhien",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 s\u1ED1 t\u1EF1 nhi\xEAn v\xE0 lu\u1EF9 th\u1EEBa",
    build: (r) => {
      const a = r.int(2, 6);
      const b = r.int(3, 5);
      const pool = [
        { t: `$${a}^{${b}}\\cdot${a}^{2}=${a}^{${b + 2}}$`, ok: true, why: "nh\xE2n lu\u1EF9 th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 th\xEC c\u1ED9ng s\u1ED1 m\u0169." },
        { t: `$${a}^{${b}}\\cdot${a}^{2}=${a}^{${b * 2}}$`, ok: false, why: `ph\u1EA3i **c\u1ED9ng** s\u1ED1 m\u0169 ($${b}+2=${b + 2}$) ch\u1EE9 kh\xF4ng nh\xE2n.` },
        { t: `$(${a}^{${b}})^{2}=${a}^{${b * 2}}$`, ok: true, why: "lu\u1EF9 th\u1EEBa c\u1EE7a lu\u1EF9 th\u1EEBa th\xEC nh\xE2n s\u1ED1 m\u0169." },
        { t: `$${a}^{0}=1$`, ok: true, why: "m\u1ECDi s\u1ED1 kh\xE1c $0$ n\xE2ng l\xEAn m\u0169 $0$ \u0111\u1EC1u b\u1EB1ng $1$." },
        { t: `$${a}^{0}=0$`, ok: false, why: `\u0111\xFAng ph\u1EA3i l\xE0 $${a}^{0}=1$.` },
        { t: "$0$ l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn nh\u1ECF nh\u1EA5t", ok: true, why: "t\u1EADp $\\N=\\{0;1;2;3;\\dots\\}$ b\u1EAFt \u0111\u1EA7u t\u1EEB $0$." },
        { t: "C\xF3 s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn nh\u1EA5t", ok: false, why: "t\u1EADp s\u1ED1 t\u1EF1 nhi\xEAn l\xE0 v\xF4 h\u1EA1n, kh\xF4ng c\xF3 ph\u1EA7n t\u1EED l\u1EDBn nh\u1EA5t." },
        { t: `$${a}+${b}\\cdot2=(${a}+${b})\\cdot2$`, ok: false, why: "ph\u1EA3i th\u1EF1c hi\u1EC7n nh\xE2n tr\u01B0\u1EDBc c\u1ED9ng sau, hai v\u1EBF kh\xF4ng b\u1EB1ng nhau." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Ba quy t\u1EAFc lu\u1EF9 th\u1EEBa ph\u1EA3i thu\u1ED9c: nh\xE2n c\xF9ng c\u01A1 s\u1ED1 \u2192 **c\u1ED9ng** m\u0169; chia c\xF9ng c\u01A1 s\u1ED1 \u2192 **tr\u1EEB** m\u0169; lu\u1EF9 th\u1EEBa c\u1EE7a lu\u1EF9 th\u1EEBa \u2192 **nh\xE2n** m\u0169.",
          "V\u1EDBi th\u1EE9 t\u1EF1 ph\xE9p t\xEDnh: lu\u1EF9 th\u1EEBa \u2192 nh\xE2n chia \u2192 c\u1ED9ng tr\u1EEB; trong ngo\u1EB7c l\xE0m tr\u01B0\u1EDBc."
        ],
        pitfall: 'Nh\u1EA7m "c\u1ED9ng s\u1ED1 m\u0169" th\xE0nh "nh\xE2n s\u1ED1 m\u0169" khi nh\xE2n hai lu\u1EF9 th\u1EEBa c\xF9ng c\u01A1 s\u1ED1.'
      });
    }
  },
  {
    id: "g6.tf-uoc-boi",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 \u01B0\u1EDBc, b\u1ED9i, \u01AFCLN v\xE0 BCNN",
    build: (r) => {
      const a = r.int(4, 20), b = r.int(4, 20);
      const d = gcd(a, b), m = lcm(a, b);
      const pool = [
        { t: `\u01AFCLN$(${a};${b})=${d}$`, ok: true, why: `ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 r\u1ED3i l\u1EA5y c\xE1c th\u1EEBa s\u1ED1 chung v\u1EDBi s\u1ED1 m\u0169 nh\u1ECF nh\u1EA5t, \u0111\u01B0\u1EE3c $${d}$.` },
        { t: `BCNN$(${a};${b})=${m}$`, ok: true, why: `l\u1EA5y c\xE1c th\u1EEBa s\u1ED1 chung v\xE0 ri\xEAng v\u1EDBi s\u1ED1 m\u0169 l\u1EDBn nh\u1EA5t, \u0111\u01B0\u1EE3c $${m}$.` },
        { t: `\u01AFCLN$(${a};${b})\\cdot$BCNN$(${a};${b})=${a}\\cdot${b}$`, ok: true, why: `\u0111\xE2y l\xE0 t\xEDnh ch\u1EA5t lu\xF4n \u0111\xFAng: $${d}\\cdot${m}=${a * b}$.` },
        { t: `BCNN$(${a};${b})=${a * b}$ v\u1EDBi m\u1ECDi $a$, $b$`, ok: a * b === m, why: a * b === m ? `\u0111\xFAng trong tr\u01B0\u1EDDng h\u1EE3p n\xE0y v\xEC $${a}$ v\xE0 $${b}$ nguy\xEAn t\u1ED1 c\xF9ng nhau.` : `ch\u1EC9 \u0111\xFAng khi hai s\u1ED1 **nguy\xEAn t\u1ED1 c\xF9ng nhau**; \u1EDF \u0111\xE2y BCNN $=${m}\\ne${a * b}$.` },
        { t: "M\u1ECDi s\u1ED1 t\u1EF1 nhi\xEAn kh\xE1c $0$ \u0111\u1EC1u l\xE0 \u01B0\u1EDBc c\u1EE7a ch\xEDnh n\xF3", ok: true, why: "$n:n=1$ n\xEAn $n$ lu\xF4n l\xE0 \u01B0\u1EDBc c\u1EE7a $n$." },
        { t: "S\u1ED1 $0$ l\xE0 \u01B0\u1EDBc c\u1EE7a m\u1ECDi s\u1ED1 t\u1EF1 nhi\xEAn", ok: false, why: 'kh\xF4ng th\u1EC3 chia cho $0$; \u0111\xFAng ph\u1EA3i l\xE0 "$0$ l\xE0 **b\u1ED9i** c\u1EE7a m\u1ECDi s\u1ED1 kh\xE1c $0$".' },
        { t: "N\u1EBFu hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau th\xEC \u01AFCLN c\u1EE7a ch\xFAng b\u1EB1ng $1$", ok: true, why: "\u0111\xF3 ch\xEDnh l\xE0 \u0111\u1ECBnh ngh\u0129a c\u1EE7a hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau." },
        { t: "Hai s\u1ED1 ch\u1EB5n b\u1EA5t k\u1EF3 lu\xF4n nguy\xEAn t\u1ED1 c\xF9ng nhau", ok: false, why: "hai s\u1ED1 ch\u1EB5n lu\xF4n c\xF3 \u01B0\u1EDBc chung l\xE0 $2$ n\xEAn \u01AFCLN $\\ge2$." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "\u01AFCLN l\u1EA5y th\u1EEBa s\u1ED1 **chung**, s\u1ED1 m\u0169 **nh\u1ECF nh\u1EA5t**; BCNN l\u1EA5y th\u1EEBa s\u1ED1 **chung v\xE0 ri\xEAng**, s\u1ED1 m\u0169 **l\u1EDBn nh\u1EA5t**.",
          "T\xEDnh ch\u1EA5t lu\xF4n \u0111\xFAng v\xE0 r\u1EA5t hay d\xF9ng \u0111\u1EC3 ki\u1EC3m tra: \u01AFCLN$(a;b)\\cdot$BCNN$(a;b)=a\\cdot b$."
        ],
        pitfall: 'K\u1EBFt lu\u1EADn "BCNN b\u1EB1ng t\xEDch hai s\u1ED1" \u2014 \u0111i\u1EC1u \u0111\xF3 ch\u1EC9 \u0111\xFAng khi hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau.'
      });
    }
  },
  {
    id: "g6.tf-so-nguyen",
    topicId: "g6-t3",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 s\u1ED1 nguy\xEAn v\xE0 quy t\u1EAFc d\u1EA5u",
    build: (r) => {
      const a = r.int(2, 15), b = r.int(2, 15);
      const pool = [
        { t: `$(-${a})+(-${b})=-${a + b}$`, ok: true, why: "c\u1ED9ng hai s\u1ED1 nguy\xEAn \xE2m: c\u1ED9ng ph\u1EA7n s\u1ED1 t\u1EF1 nhi\xEAn r\u1ED3i \u0111\u1EB7t d\u1EA5u tr\u1EEB." },
        { t: `$(-${a})\\cdot(-${b})=${a * b}$`, ok: true, why: "t\xEDch hai s\u1ED1 \xE2m l\xE0 m\u1ED9t s\u1ED1 d\u01B0\u01A1ng." },
        { t: `$(-${a})\\cdot(-${b})=-${a * b}$`, ok: false, why: `\xE2m nh\xE2n \xE2m ra **d\u01B0\u01A1ng**, k\u1EBFt qu\u1EA3 \u0111\xFAng l\xE0 $${a * b}$.` },
        { t: `$-${a}-(-${b})=-${a}+${b}$`, ok: true, why: "tr\u1EEB m\u1ED9t s\u1ED1 \xE2m b\u1EB1ng c\u1ED9ng s\u1ED1 \u0111\u1ED1i c\u1EE7a n\xF3." },
        { t: `$|-${a}|=${a}$`, ok: true, why: "gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i lu\xF4n kh\xF4ng \xE2m." },
        { t: `$|-${a}|=-${a}$`, ok: false, why: `gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i kh\xF4ng th\u1EC3 \xE2m; \u0111\xFAng l\xE0 $|-${a}|=${a}$.` },
        { t: "M\u1ECDi s\u1ED1 nguy\xEAn \xE2m \u0111\u1EC1u nh\u1ECF h\u01A1n m\u1ECDi s\u1ED1 nguy\xEAn d\u01B0\u01A1ng", ok: true, why: "tr\xEAn tr\u1EE5c s\u1ED1, s\u1ED1 \xE2m n\u1EB1m b\xEAn tr\xE1i $0$ c\xF2n s\u1ED1 d\u01B0\u01A1ng n\u1EB1m b\xEAn ph\u1EA3i." },
        { t: `N\u1EBFu $|x|=${a}$ th\xEC $x=${a}$`, ok: false, why: `c\xF2n thi\u1EBFu nghi\u1EC7m $x=-${a}$ \u2014 ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i lu\xF4n c\xF3 hai tr\u01B0\u1EDDng h\u1EE3p.` }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Quy t\u1EAFc d\u1EA5u khi nh\xE2n chia: **c\xF9ng d\u1EA5u ra d\u01B0\u01A1ng, kh\xE1c d\u1EA5u ra \xE2m**.",
          "Tr\u1EEB m\u1ED9t s\u1ED1 b\u1EB1ng c\u1ED9ng v\u1EDBi **s\u1ED1 \u0111\u1ED1i** c\u1EE7a n\xF3 \u2014 quy t\u1EAFc n\xE0y gi\xFAp m\u1ECDi ph\xE9p tr\u1EEB tr\u1EDF th\xE0nh ph\xE9p c\u1ED9ng."
        ],
        pitfall: "T\u1EEB $|x|=a$ ch\u1EC9 l\u1EA5y $x=a$ m\xE0 qu\xEAn $x=-a$."
      });
    }
  },
  {
    id: "g6.tf-hinh-hoc",
    topicId: "g6-t5",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 h\xECnh ph\u1EB3ng v\xE0 t\xEDnh \u0111\u1ED1i x\u1EE9ng",
    build: (r) => {
      const pool = [
        { t: "H\xECnh vu\xF4ng c\xF3 $4$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng", ok: true, why: "$2$ tr\u1EE5c qua trung \u0111i\u1EC3m c\xE1c c\u1EA1nh \u0111\u1ED1i v\xE0 $2$ tr\u1EE5c l\xE0 hai \u0111\u01B0\u1EDDng ch\xE9o." },
        { t: "H\xECnh ch\u1EEF nh\u1EADt c\xF3 $4$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng", ok: false, why: "h\xECnh ch\u1EEF nh\u1EADt ch\u1EC9 c\xF3 $2$ tr\u1EE5c (qua trung \u0111i\u1EC3m hai c\u1EA1nh \u0111\u1ED1i); hai \u0111\u01B0\u1EDDng ch\xE9o **kh\xF4ng** ph\u1EA3i tr\u1EE5c \u0111\u1ED1i x\u1EE9ng." },
        { t: "H\xECnh b\xECnh h\xE0nh c\xF3 t\xE2m \u0111\u1ED1i x\u1EE9ng l\xE0 giao \u0111i\u1EC3m hai \u0111\u01B0\u1EDDng ch\xE9o", ok: true, why: "\u0111\xE2y l\xE0 t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng c\u1EE7a h\xECnh b\xECnh h\xE0nh." },
        { t: "H\xECnh thang c\xE2n c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau", ok: true, why: "\u0111\xF3 l\xE0 m\u1ED9t d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt h\xECnh thang c\xE2n." },
        { t: "Tam gi\xE1c \u0111\u1EC1u c\xF3 t\xE2m \u0111\u1ED1i x\u1EE9ng", ok: false, why: "tam gi\xE1c \u0111\u1EC1u c\xF3 $3$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng nh\u01B0ng **kh\xF4ng** c\xF3 t\xE2m \u0111\u1ED1i x\u1EE9ng." },
        { t: "H\xECnh thoi c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c v\u1EDBi nhau", ok: true, why: "hai \u0111\u01B0\u1EDDng ch\xE9o h\xECnh thoi vu\xF4ng g\xF3c v\xE0 c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng." },
        { t: "Di\u1EC7n t\xEDch h\xECnh thoi b\u1EB1ng t\xEDch hai \u0111\u01B0\u1EDDng ch\xE9o", ok: false, why: "ph\u1EA3i l\xE0 **n\u1EEDa** t\xEDch hai \u0111\u01B0\u1EDDng ch\xE9o: $S=\\f{d_1d_2}{2}$." },
        { t: "H\xECnh l\u1EE5c gi\xE1c \u0111\u1EC1u c\xF3 $6$ tr\u1EE5c \u0111\u1ED1i x\u1EE9ng", ok: true, why: "$3$ tr\u1EE5c qua hai \u0111\u1EC9nh \u0111\u1ED1i v\xE0 $3$ tr\u1EE5c qua trung \u0111i\u1EC3m hai c\u1EA1nh \u0111\u1ED1i." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "V\u1EBD nhanh h\xECnh ra nh\xE1p r\u1ED3i th\u1EED g\u1EA5p \u0111\xF4i theo t\u1EEBng \u0111\u01B0\u1EDDng \u2014 \u0111\u01B0\u1EDDng n\xE0o g\u1EA5p tr\xF9ng kh\xEDt th\xEC \u0111\xF3 l\xE0 tr\u1EE5c \u0111\u1ED1i x\u1EE9ng.",
          "T\xE2m \u0111\u1ED1i x\u1EE9ng: quay h\xECnh $180\\deg$ quanh \u0111i\u1EC3m \u0111\xF3 m\xE0 h\xECnh tr\xF9ng v\u1EDBi ch\xEDnh n\xF3."
        ],
        pitfall: "Cho r\u1EB1ng \u0111\u01B0\u1EDDng ch\xE9o h\xECnh ch\u1EEF nh\u1EADt l\xE0 tr\u1EE5c \u0111\u1ED1i x\u1EE9ng \u2014 g\u1EA5p theo \u0111\u01B0\u1EDDng ch\xE9o th\xEC hai n\u1EEDa **kh\xF4ng** tr\xF9ng nhau."
      });
    }
  },
  {
    id: "g6.tf-phan-so",
    topicId: "g6-t4",
    grade: 6,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\xE2n s\u1ED1 v\xE0 s\u1ED1 th\u1EADp ph\xE2n",
    build: (r) => {
      const k = r.int(2, 9);
      const n = r.int(1, 8), d = n + r.int(1, 6);
      const pool = [
        { t: `$\\f{${n}}{${d}}=\\f{${n * k}}{${d * k}}$`, ok: true, why: `nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi c\xF9ng s\u1ED1 $${k}\\ne0$ th\xEC ph\xE2n s\u1ED1 kh\xF4ng \u0111\u1ED5i.` },
        { t: `$\\f{${n}}{${d}}=\\f{${n + k}}{${d + k}}$`, ok: false, why: "ch\u1EC9 \u0111\u01B0\u1EE3c **nh\xE2n/chia** c\u1EA3 t\u1EED v\xE0 m\u1EABu c\xF9ng m\u1ED9t s\u1ED1, kh\xF4ng \u0111\u01B0\u1EE3c c\u1ED9ng." },
        { t: `$\\f{${n}}{${d}}<1$`, ok: n < d, why: n < d ? `t\u1EED nh\u1ECF h\u01A1n m\u1EABu n\xEAn ph\xE2n s\u1ED1 nh\u1ECF h\u01A1n $1$.` : `t\u1EED kh\xF4ng nh\u1ECF h\u01A1n m\u1EABu n\xEAn ph\xE2n s\u1ED1 $\\ge1$.` },
        { t: "Mu\u1ED1n c\u1ED9ng hai ph\xE2n s\u1ED1 kh\xE1c m\u1EABu, ta c\u1ED9ng t\u1EED v\u1EDBi t\u1EED v\xE0 m\u1EABu v\u1EDBi m\u1EABu", ok: false, why: "ph\u1EA3i **quy \u0111\u1ED3ng m\u1EABu** r\u1ED3i m\u1EDBi c\u1ED9ng t\u1EED, gi\u1EEF nguy\xEAn m\u1EABu chung." },
        { t: "Mu\u1ED1n chia cho m\u1ED9t ph\xE2n s\u1ED1, ta nh\xE2n v\u1EDBi ngh\u1ECBch \u0111\u1EA3o c\u1EE7a n\xF3", ok: true, why: "$\\f{a}{b}:\\f{c}{d}=\\f{a}{b}\\cdot\\f{d}{c}$ (v\u1EDBi $c\\ne0$)." },
        { t: `$0{,}5=\\f{1}{2}$`, ok: true, why: `$0{,}5=\\f{5}{10}=\\f{1}{2}$.` },
        { t: "Hai ph\xE2n s\u1ED1 c\xF3 c\xF9ng t\u1EED th\xEC ph\xE2n s\u1ED1 n\xE0o c\xF3 m\u1EABu l\u1EDBn h\u01A1n s\u1EBD l\u1EDBn h\u01A1n", ok: false, why: "ng\u01B0\u1EE3c l\u1EA1i: c\xF9ng t\u1EED d\u01B0\u01A1ng th\xEC **m\u1EABu c\xE0ng l\u1EDBn ph\xE2n s\u1ED1 c\xE0ng nh\u1ECF**." },
        { t: `$-\\f{${n}}{${d}}=\\f{-${n}}{${d}}=\\f{${n}}{-${d}}$`, ok: true, why: "d\u1EA5u tr\u1EEB c\xF3 th\u1EC3 \u0111\u1EB7t \u1EDF t\u1EED, \u1EDF m\u1EABu ho\u1EB7c tr\u01B0\u1EDBc ph\xE2n s\u1ED1 \u2014 gi\xE1 tr\u1ECB kh\xF4ng \u0111\u1ED5i." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "T\xEDnh ch\u1EA5t c\u01A1 b\u1EA3n: nh\xE2n (ho\u1EB7c chia) **c\u1EA3 t\u1EED v\xE0 m\u1EABu** cho c\xF9ng m\u1ED9t s\u1ED1 kh\xE1c $0$ th\xEC ph\xE2n s\u1ED1 kh\xF4ng \u0111\u1ED5i \u2014 c\u1ED9ng th\xEC kh\xF4ng \u0111\u01B0\u1EE3c.",
          "So s\xE1nh c\xF9ng t\u1EED d\u01B0\u01A1ng: m\u1EABu l\u1EDBn h\u01A1n th\xEC ph\xE2n s\u1ED1 nh\u1ECF h\u01A1n (chia cho nhi\u1EC1u ph\u1EA7n h\u01A1n)."
        ],
        pitfall: "C\u1ED9ng c\xF9ng m\u1ED9t s\u1ED1 v\xE0o t\u1EED v\xE0 m\u1EABu r\u1ED3i ngh\u0129 ph\xE2n s\u1ED1 kh\xF4ng \u0111\u1ED5i."
      });
    }
  },
  /* ------------------------- THÔNG HIỂU BỔ SUNG ------------------------- */
  {
    id: "g6.th-thu-tu-phep-tinh",
    topicId: "g6-t1",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh",
    build: (r) => {
      const a = r.int(2, 9), b = r.int(2, 6), c = r.int(2, 9);
      const dung = a + b * c;
      const sai = [(a + b) * c, a + b + c, a * b + c];
      const uniq = [...new Set(sai)].filter((v) => v !== dung).slice(0, 3);
      while (uniq.length < 3) uniq.push(dung + uniq.length + 1);
      const [options, answer] = mcOptions(r, `$${dung}$`, uniq.map((v) => `$${v}$`));
      return {
        stem: `Gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $${a}+${b}\\cdot${c}$ l\xE0:`,
        options,
        answer,
        thinking: [
          "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n: **lu\u1EF9 th\u1EEBa \u2192 nh\xE2n chia \u2192 c\u1ED9ng tr\u1EEB**; c\xF3 ngo\u1EB7c th\xEC l\xE0m trong ngo\u1EB7c tr\u01B0\u1EDBc.",
          "\u1EDE bi\u1EC3u th\u1EE9c n\xE0y kh\xF4ng c\xF3 ngo\u1EB7c n\xEAn ph\u1EA3i nh\xE2n tr\u01B0\u1EDBc, c\u1ED9ng sau."
        ],
        solution: [
          `$${a}+${b}\\cdot${c}=${a}+${b * c}=${dung}$.`
        ],
        pitfall: `C\u1ED9ng tr\u01B0\u1EDBc r\u1ED3i nh\xE2n s\u1EBD ra $${(a + b) * c}$ \u2014 sai v\xEC b\u1ECF qua th\u1EE9 t\u1EF1 ph\xE9p t\xEDnh.`
      };
    }
  },
  {
    id: "g6.th-uoc-chung-thuc-te",
    topicId: "g6-t2",
    grade: 6,
    level: "TH",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 \u01AFCLN v\xE0 BCNN",
    build: (r) => {
      const laUCLN = r.bool();
      const k = r.int(3, 12);
      const a = k * r.int(2, 7), b = k * r.int(2, 7);
      if (laUCLN) {
        const d = gcd(a, b);
        const [options2, answer2] = mcOptions(r, `$${d}$`, [`$${lcm(a, b)}$`, `$${a + b}$`, `$${Math.max(2, Math.floor(d / 2))}$`].filter((x) => x !== `$${d}$`).slice(0, 3));
        return {
          stem: `C\xF4 gi\xE1o c\xF3 $${a}$ b\xFAt ch\xEC v\xE0 $${b}$ quy\u1EC3n v\u1EDF, mu\u1ED1n chia \u0111\u1EC1u v\xE0o c\xE1c ph\u1EA7n qu\xE0 sao cho **kh\xF4ng th\u1EEBa** m\xF3n n\xE0o. H\u1ECFi chia \u0111\u01B0\u1EE3c nhi\u1EC1u nh\u1EA5t bao nhi\xEAu ph\u1EA7n qu\xE0?`,
          options: options2,
          answer: answer2,
          thinking: [
            'T\u1EEB kho\xE1 "**chia \u0111\u1EC1u**, kh\xF4ng th\u1EEBa, **nhi\u1EC1u nh\u1EA5t**" \u2192 b\xE0i to\xE1n **\u01AFCLN**.',
            'T\u1EEB kho\xE1 "c\xF9ng l\xFAc, l\u1EB7p l\u1EA1i, **\xEDt nh\u1EA5t**" m\u1EDBi l\xE0 b\xE0i to\xE1n BCNN \u2014 ph\u1EA3i ph\xE2n bi\u1EC7t r\xF5 hai nh\xF3m t\u1EEB kho\xE1 n\xE0y.'
          ],
          solution: [
            `S\u1ED1 ph\u1EA7n qu\xE0 ph\u1EA3i l\xE0 \u01B0\u1EDBc chung c\u1EE7a $${a}$ v\xE0 $${b}$, v\xE0 ta c\u1EA7n gi\xE1 tr\u1ECB **l\u1EDBn nh\u1EA5t**.`,
            `V\u1EADy s\u1ED1 ph\u1EA7n qu\xE0 nhi\u1EC1u nh\u1EA5t l\xE0 \u01AFCLN$(${a};${b})=${d}$.`
          ],
          pitfall: '\u0110\u1ECDc l\u01B0\u1EDBt r\u1ED3i d\xF9ng BCNN \u2014 h\xE3y khoanh t\u1EEB kho\xE1 "nhi\u1EC1u nh\u1EA5t" (\u01AFCLN) hay "\xEDt nh\u1EA5t" (BCNN) tr\u01B0\u1EDBc khi t\xEDnh.'
        };
      }
      const m = lcm(a, b);
      const [options, answer] = mcOptions(r, `$${m}$`, [`$${gcd(a, b)}$`, `$${a * b}$`, `$${a + b}$`].filter((x) => x !== `$${m}$`).slice(0, 3));
      return {
        stem: `Hai xe bu\xFDt c\xF9ng xu\u1EA5t ph\xE1t t\u1EEB b\u1EBFn l\xFAc $6$ gi\u1EDD. Xe th\u1EE9 nh\u1EA5t c\u1EE9 $${a}$ ph\xFAt l\u1EA1i quay v\u1EC1 b\u1EBFn m\u1ED9t l\u1EA7n, xe th\u1EE9 hai c\u1EE9 $${b}$ ph\xFAt m\u1ED9t l\u1EA7n. H\u1ECFi sau \xEDt nh\u1EA5t bao nhi\xEAu ph\xFAt th\xEC hai xe **c\xF9ng** v\u1EC1 b\u1EBFn?`,
        options,
        answer,
        thinking: [
          'T\u1EEB kho\xE1 "**c\xF9ng l\xFAc**, l\u1EB7p l\u1EA1i, **\xEDt nh\u1EA5t**" \u2192 b\xE0i to\xE1n **BCNN**.',
          "Th\u1EDDi \u0111i\u1EC3m hai xe c\xF9ng v\u1EC1 b\u1EBFn l\xE0 b\u1ED9i chung c\u1EE7a hai chu k\u1EF3; ta c\u1EA7n b\u1ED9i chung **nh\u1ECF nh\u1EA5t**."
        ],
        solution: [
          `Th\u1EDDi gian c\u1EA7n t\xECm l\xE0 b\u1ED9i chung nh\u1ECF nh\u1EA5t c\u1EE7a $${a}$ v\xE0 $${b}$.`,
          `BCNN$(${a};${b})=${m}$ (ph\xFAt).`
        ],
        pitfall: `L\u1EA5y t\xEDch $${a}\\cdot${b}=${a * b}$ l\xE0m \u0111\xE1p \xE1n \u2014 t\xEDch ch\u1EC9 **l\xE0 m\u1ED9t** b\u1ED9i chung, ch\u01B0a ch\u1EAFc l\xE0 nh\u1ECF nh\u1EA5t.`
      };
    }
  }
];

// src/bank/g7-nb.ts
var MC_SO_THUC = [
  {
    q: "S\u1ED1 n\xE0o sau \u0111\xE2y l\xE0 **s\u1ED1 v\xF4 t\u1EC9**?",
    a: "$\\s{7}$",
    w: ["$\\s{16}$", "$\\f{22}{7}$", "$0{,}(3)$"],
    why: "$7$ kh\xF4ng ph\u1EA3i s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng n\xEAn $\\s{7}$ l\xE0 s\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n **kh\xF4ng tu\u1EA7n ho\xE0n**.",
    trap: "$\\f{22}{7}$ v\xE0 $0{,}(3)$ l\xE0 s\u1ED1 h\u1EEFu t\u1EC9; $\\s{16}=4$ c\u0169ng h\u1EEFu t\u1EC9."
  },
  {
    q: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc c\u1EE7a $49$ l\xE0:",
    a: "$7$",
    w: ["$-7$", "$\\pm7$", "$24{,}5$"],
    why: "C\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB **kh\xF4ng \xE2m**.",
    trap: "$49$ c\xF3 hai c\u0103n b\u1EADc hai l\xE0 $7$ v\xE0 $-7$, nh\u01B0ng c\u0103n b\u1EADc hai *s\u1ED1 h\u1ECDc* ch\u1EC9 l\xE0 $7$."
  },
  {
    q: "Kh\u1EB3ng \u0111\u1ECBnh n\xE0o sau \u0111\xE2y **\u0111\xFAng**?",
    a: "$\\N\\subset\\Z\\subset\\Q\\subset\\R$",
    w: ["$\\R\\subset\\Q$", "$\\Q\\subset\\Z$", "$\\Z\\subset\\N$"],
    why: "Quan h\u1EC7 bao h\xE0m m\u1EDF r\u1ED9ng d\u1EA7n t\u1EEB s\u1ED1 t\u1EF1 nhi\xEAn t\u1EDBi s\u1ED1 th\u1EF1c."
  },
  {
    q: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i $|-2{,}5|$ b\u1EB1ng:",
    a: "$2{,}5$",
    w: ["$-2{,}5$", "$0$", "$5$"],
    why: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\xE0 kho\u1EA3ng c\xE1ch t\u1EDBi $0$ n\xEAn lu\xF4n **kh\xF4ng \xE2m**."
  },
  {
    q: "Ph\xE2n s\u1ED1 n\xE0o sau \u0111\xE2y vi\u1EBFt \u0111\u01B0\u1EE3c d\u01B0\u1EDBi d\u1EA1ng s\u1ED1 th\u1EADp ph\xE2n **h\u1EEFu h\u1EA1n**?",
    a: "$\\f{7}{40}$",
    w: ["$\\f{5}{12}$", "$\\f{2}{7}$", "$\\f{4}{15}$"],
    why: "$40=2^{3}\\cdot5$ ch\u1EC9 ch\u1EE9a th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 $2$ v\xE0 $5$.",
    trap: "Ph\u1EA3i x\xE9t m\u1EABu c\u1EE7a ph\xE2n s\u1ED1 **t\u1ED1i gi\u1EA3n**, v\xE0 ch\u1EC9 ch\u1EA5p nh\u1EADn \u01B0\u1EDBc nguy\xEAn t\u1ED1 $2$ v\xE0 $5$."
  },
  {
    q: "K\u1EBFt qu\u1EA3 c\u1EE7a $(-2)^{3}$ l\xE0:",
    a: "$-8$",
    w: ["$8$", "$-6$", "$6$"],
    why: "S\u1ED1 m\u0169 **l\u1EBB** gi\u1EEF nguy\xEAn d\u1EA5u \xE2m: $(-2)^{3}=-8$.",
    trap: "Nh\u1EA7m $(-2)^{3}$ v\u1EDBi $(-2)\\cdot3=-6$, ho\u1EB7c cho r\u1EB1ng lu\u1EF9 th\u1EEBa lu\xF4n ra s\u1ED1 d\u01B0\u01A1ng."
  },
  {
    q: "S\u1ED1 $0{,}(6)$ vi\u1EBFt d\u01B0\u1EDBi d\u1EA1ng ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n l\xE0:",
    a: "$\\f{2}{3}$",
    w: ["$\\f{6}{10}$", "$\\f{3}{5}$", "$\\f{6}{9}$"],
    why: "$0,(6)=\\f{6}{9}=\\f{2}{3}$ \u2014 c\u1EA7n r\xFAt g\u1ECDn v\u1EC1 **t\u1ED1i gi\u1EA3n**."
  },
  {
    q: "L\xE0m tr\xF2n $3{,}147$ \u0111\u1EBFn h\xE0ng ph\u1EA7n tr\u0103m \u0111\u01B0\u1EE3c:",
    a: "$3{,}15$",
    w: ["$3{,}14$", "$3{,}1$", "$3{,}2$"],
    why: "Ch\u1EEF s\u1ED1 sau h\xE0ng ph\u1EA7n tr\u0103m l\xE0 $7\\ge5$ n\xEAn t\u0103ng ch\u1EEF s\u1ED1 h\xE0ng ph\u1EA7n tr\u0103m th\xEAm $1$."
  }
];
var MC_TI_LE = [
  {
    q: "T\u1EEB t\u1EC9 l\u1EC7 th\u1EE9c $\\f{a}{b}=\\f{c}{d}$ suy ra:",
    a: "$ad=bc$",
    w: ["$ab=cd$", "$ac=bd$", "$a+d=b+c$"],
    why: "T\xEDnh ch\u1EA5t c\u01A1 b\u1EA3n c\u1EE7a t\u1EC9 l\u1EC7 th\u1EE9c: **t\xEDch trung t\u1EC9 b\u1EB1ng t\xEDch ngo\u1EA1i t\u1EC9**."
  },
  {
    q: "N\u1EBFu $y$ t\u1EC9 l\u1EC7 **thu\u1EADn** v\u1EDBi $x$ theo h\u1EC7 s\u1ED1 $k$ th\xEC:",
    a: "$y=kx$",
    w: ["$y=\\f{k}{x}$", "$xy=k$", "$y=x+k$"],
    why: "T\u1EC9 l\u1EC7 thu\u1EADn: $y=kx$, t\u1EC9 s\u1ED1 $\\f{y}{x}=k$ kh\xF4ng \u0111\u1ED5i.",
    trap: "$xy=k$ v\xE0 $y=\\f{k}{x}$ l\xE0 c\xF4ng th\u1EE9c c\u1EE7a t\u1EC9 l\u1EC7 **ngh\u1ECBch**."
  },
  {
    q: "N\u1EBFu $y$ t\u1EC9 l\u1EC7 **ngh\u1ECBch** v\u1EDBi $x$ theo h\u1EC7 s\u1ED1 $a$ th\xEC:",
    a: "$xy=a$",
    w: ["$y=ax$", "$\\f{y}{x}=a$", "$y=x-a$"],
    why: "T\u1EC9 l\u1EC7 ngh\u1ECBch: t\xEDch $xy=a$ kh\xF4ng \u0111\u1ED5i."
  },
  {
    q: "Cho $\\f{x}{3}=\\f{y}{5}$ v\xE0 $x+y=32$. Gi\xE1 tr\u1ECB c\u1EE7a $x$ l\xE0:",
    a: "$12$",
    w: ["$20$", "$16$", "$8$"],
    why: "Theo d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{x}{3}=\\f{y}{5}=\\f{x+y}{3+5}=\\f{32}{8}=4$, n\xEAn $x=12$."
  },
  {
    q: "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau cho bi\u1EBFt $\\f{a}{b}=\\f{c}{d}$ b\u1EB1ng:",
    a: "$\\f{a+c}{b+d}$ (v\u1EDBi $b+d\\ne0$)",
    w: ["$\\f{a+c}{b\\cdot d}$", "$\\f{a\\cdot c}{b+d}$", "$\\f{a-c}{b+d}$"],
    why: "C\u1ED9ng t\u1EED v\u1EDBi t\u1EED, m\u1EABu v\u1EDBi m\u1EABu \u2014 \u0111i\u1EC1u ki\u1EC7n m\u1EABu t\u1ED5ng kh\xE1c $0$."
  }
];
var MC_HINH_7 = [
  {
    q: "Hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh th\xEC:",
    a: "b\u1EB1ng nhau",
    w: ["b\xF9 nhau", "ph\u1EE5 nhau", "k\u1EC1 b\xF9"],
    why: "Hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh lu\xF4n c\xF3 s\u1ED1 \u0111o b\u1EB1ng nhau."
  },
  {
    q: "T\u1ED5ng ba g\xF3c trong m\u1ED9t tam gi\xE1c b\u1EB1ng:",
    a: "$180\\deg$",
    w: ["$360\\deg$", "$90\\deg$", "$270\\deg$"],
    why: "\u0110\u1ECBnh l\xED t\u1ED5ng ba g\xF3c trong tam gi\xE1c."
  },
  {
    q: "Trong tam gi\xE1c, g\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng:",
    a: "t\u1ED5ng hai g\xF3c trong kh\xF4ng k\u1EC1 v\u1EDBi n\xF3",
    w: ["g\xF3c trong k\u1EC1 v\u1EDBi n\xF3", "n\u1EEDa t\u1ED5ng ba g\xF3c trong", "hi\u1EC7u hai g\xF3c trong c\xF2n l\u1EA1i"],
    why: "\u0110\u1ECBnh l\xED g\xF3c ngo\xE0i c\u1EE7a tam gi\xE1c.",
    trap: 'Nh\u1EA7m th\xE0nh "b\u1EB1ng g\xF3c trong k\u1EC1 v\u1EDBi n\xF3" \u2014 hai g\xF3c \u0111\xF3 th\u1EF1c ra **k\u1EC1 b\xF9**.'
  },
  {
    q: "Ba \u0111\u01B0\u1EDDng **trung tuy\u1EBFn** c\u1EE7a tam gi\xE1c c\xF9ng \u0111i qua:",
    a: "tr\u1ECDng t\xE2m",
    w: ["tr\u1EF1c t\xE2m", "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp", "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp"],
    why: "Ba trung tuy\u1EBFn \u0111\u1ED3ng quy t\u1EA1i tr\u1ECDng t\xE2m, c\xE1ch \u0111\u1EC9nh $\\f{2}{3}$ \u0111\u1ED9 d\xE0i trung tuy\u1EBFn."
  },
  {
    q: "Ba \u0111\u01B0\u1EDDng **ph\xE2n gi\xE1c** c\u1EE7a tam gi\xE1c c\xF9ng \u0111i qua:",
    a: "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp",
    w: ["tr\u1ECDng t\xE2m", "tr\u1EF1c t\xE2m", "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp"],
    why: "Giao ba ph\xE2n gi\xE1c c\xE1ch \u0111\u1EC1u ba c\u1EA1nh n\xEAn l\xE0 t\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp."
  },
  {
    q: "Ba \u0111\u01B0\u1EDDng **trung tr\u1EF1c** c\u1EE7a tam gi\xE1c c\xF9ng \u0111i qua:",
    a: "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp",
    w: ["tr\u1ECDng t\xE2m", "tr\u1EF1c t\xE2m", "t\xE2m \u0111\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp"],
    why: "Giao ba trung tr\u1EF1c c\xE1ch \u0111\u1EC1u ba \u0111\u1EC9nh n\xEAn l\xE0 t\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp."
  },
  {
    q: "B\u1ED9 ba \u0111o\u1EA1n th\u1EB3ng n\xE0o sau \u0111\xE2y **kh\xF4ng** t\u1EA1o th\xE0nh tam gi\xE1c?",
    a: "$2$ cm, $3$ cm, $6$ cm",
    w: ["$3$ cm, $4$ cm, $5$ cm", "$5$ cm, $5$ cm, $8$ cm", "$6$ cm, $7$ cm, $10$ cm"],
    why: "$2+3=5<6$ \u2014 vi ph\u1EA1m b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c.",
    trap: "Ch\u1EC9 c\u1EA7n ki\u1EC3m tra t\u1ED5ng **hai c\u1EA1nh nh\u1ECF nh\u1EA5t** so v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t l\xE0 \u0111\u1EE7."
  },
  {
    q: "Trong m\u1ED9t tam gi\xE1c, \u0111\u1ED1i di\u1EC7n v\u1EDBi c\u1EA1nh l\u1EDBn h\u01A1n l\xE0:",
    a: "g\xF3c l\u1EDBn h\u01A1n",
    w: ["g\xF3c nh\u1ECF h\u01A1n", "g\xF3c vu\xF4ng", "g\xF3c b\u1EB1ng nhau"],
    why: "Quan h\u1EC7 gi\u1EEFa g\xF3c v\xE0 c\u1EA1nh \u0111\u1ED1i di\u1EC7n trong tam gi\xE1c."
  }
];
var BANK_G7_NB = [
  {
    id: "g7.nb-so-thuc-mo-rong",
    topicId: "g7-t1",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "S\u1ED1 h\u1EEFu t\u1EC9, s\u1ED1 v\xF4 t\u1EC9, c\u0103n b\u1EADc hai v\xE0 l\xE0m tr\xF2n",
    build: (r) => mcFrom(r, MC_SO_THUC, {
      thinking: [
        "S\u1ED1 h\u1EEFu t\u1EC9 vi\u1EBFt \u0111\u01B0\u1EE3c d\u1EA1ng $\\f{a}{b}$ (th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n ho\u1EB7c v\xF4 h\u1EA1n **tu\u1EA7n ho\xE0n**); s\u1ED1 v\xF4 t\u1EC9 l\xE0 th\u1EADp ph\xE2n v\xF4 h\u1EA1n **kh\xF4ng tu\u1EA7n ho\xE0n**.",
        "C\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** lu\xF4n kh\xF4ng \xE2m \u2014 \u0111\xE2y l\xE0 chi ti\u1EBFt b\u1ECB m\u1EA5t \u0111i\u1EC3m nhi\u1EC1u nh\u1EA5t."
      ]
    })
  },
  {
    id: "g7.nb-ti-le-mo-rong",
    topicId: "g7-t2",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\u1EC9 l\u1EC7 th\u1EE9c v\xE0 hai \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7",
    build: (r) => mcFrom(r, MC_TI_LE, {
      thinking: [
        "T\u1EC9 l\u1EC7 **thu\u1EADn**: $y=kx$, **t\u1EC9 s\u1ED1** kh\xF4ng \u0111\u1ED5i. T\u1EC9 l\u1EC7 **ngh\u1ECBch**: $xy=a$, **t\xEDch** kh\xF4ng \u0111\u1ED5i.",
        "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau cho ph\xE9p c\u1ED9ng t\u1EED v\u1EDBi t\u1EED, m\u1EABu v\u1EDBi m\u1EABu \u2014 c\xF4ng c\u1EE5 m\u1EA1nh nh\u1EA5t c\u1EE7a chuy\xEAn \u0111\u1EC1 n\xE0y."
      ]
    })
  },
  {
    id: "g7.nb-hinh-mo-rong",
    topicId: "g7-t5",
    grade: 7,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "G\xF3c, tam gi\xE1c v\xE0 c\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy",
    build: (r) => mcFrom(r, MC_HINH_7, {
      thinking: [
        "Nh\u1EDB b\u1ED1n \u0111i\u1EC3m \u0111\u1EB7c bi\u1EC7t theo c\u1EB7p: trung tuy\u1EBFn \u2192 **tr\u1ECDng t\xE2m**; \u0111\u01B0\u1EDDng cao \u2192 **tr\u1EF1c t\xE2m**; ph\xE2n gi\xE1c \u2192 t\xE2m **n\u1ED9i** ti\u1EBFp; trung tr\u1EF1c \u2192 t\xE2m **ngo\u1EA1i** ti\u1EBFp.",
        "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c: ch\u1EC9 c\u1EA7n ki\u1EC3m tra t\u1ED5ng hai c\u1EA1nh nh\u1ECF c\xF3 l\u1EDBn h\u01A1n c\u1EA1nh l\u1EDBn nh\u1EA5t hay kh\xF4ng."
      ]
    })
  },
  {
    id: "g7.tf-so-huu-ti",
    topicId: "g7-t1",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 s\u1ED1 h\u1EEFu t\u1EC9, s\u1ED1 th\u1EF1c v\xE0 c\u0103n b\u1EADc hai",
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
      const sa = Math.round(Math.sqrt(a));
      const pool = [
        { t: `$\\s{${a}}=${sa}$`, ok: true, why: `$${sa}^{2}=${a}$ v\xE0 $${sa}>0$ n\xEAn \u0111\xE2y l\xE0 c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc.` },
        { t: `$\\s{${a}}=\\pm${sa}$`, ok: false, why: `c\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB kh\xF4ng \xE2m: $\\s{${a}}=${sa}$.` },
        { t: `$${a}$ c\xF3 hai c\u0103n b\u1EADc hai l\xE0 $${sa}$ v\xE0 $-${sa}$`, ok: true, why: "m\u1ED7i s\u1ED1 d\u01B0\u01A1ng c\xF3 \u0111\xFAng hai c\u0103n b\u1EADc hai \u0111\u1ED1i nhau." },
        { t: "M\u1ECDi s\u1ED1 h\u1EEFu t\u1EC9 \u0111\u1EC1u l\xE0 s\u1ED1 th\u1EF1c", ok: true, why: "$\\Q\\subset\\R$." },
        { t: "M\u1ECDi s\u1ED1 th\u1EF1c \u0111\u1EC1u l\xE0 s\u1ED1 h\u1EEFu t\u1EC9", ok: false, why: "c\xE1c s\u1ED1 nh\u01B0 $\\s{2}$, $\\pi$ l\xE0 s\u1ED1 th\u1EF1c nh\u01B0ng kh\xF4ng h\u1EEFu t\u1EC9." },
        { t: "$\\pi$ l\xE0 s\u1ED1 h\u1EEFu t\u1EC9", ok: false, why: "$\\pi$ l\xE0 s\u1ED1 v\xF4 t\u1EC9 \u2014 th\u1EADp ph\xE2n v\xF4 h\u1EA1n kh\xF4ng tu\u1EA7n ho\xE0n." },
        { t: "S\u1ED1 $0$ v\u1EEBa l\xE0 s\u1ED1 h\u1EEFu t\u1EC9 v\u1EEBa l\xE0 s\u1ED1 nguy\xEAn", ok: true, why: "$0=\\f{0}{1}$ n\xEAn h\u1EEFu t\u1EC9, v\xE0 $0\\in\\Z$." },
        { t: "C\xF3 s\u1ED1 h\u1EEFu t\u1EC9 nh\u1ECF nh\u1EA5t l\u1EDBn h\u01A1n $0$", ok: false, why: "gi\u1EEFa $0$ v\xE0 b\u1EA5t k\u1EF3 s\u1ED1 d\u01B0\u01A1ng n\xE0o c\u0169ng c\xF2n v\xF4 s\u1ED1 s\u1ED1 h\u1EEFu t\u1EC9 kh\xE1c." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Ph\xE2n bi\u1EC7t "**c\u0103n b\u1EADc hai**" (c\xF3 hai gi\xE1 tr\u1ECB \u0111\u1ED1i nhau) v\u1EDBi "**c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc**" (ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB kh\xF4ng \xE2m).',
          "Ghi nh\u1EDB chu\u1ED7i bao h\xE0m $\\N\\subset\\Z\\subset\\Q\\subset\\R$ \u0111\u1EC3 x\xE9t nhanh c\xE1c m\u1EC7nh \u0111\u1EC1 v\u1EC1 t\u1EADp h\u1EE3p s\u1ED1."
        ],
        pitfall: "Vi\u1EBFt $\\s{a}=\\pm\\s{a}$ \u2014 k\xFD hi\u1EC7u $\\s{\\;}$ lu\xF4n ch\u1EC9 gi\xE1 tr\u1ECB **kh\xF4ng \xE2m**."
      });
    }
  },
  {
    id: "g7.tf-da-thuc",
    topicId: "g7-t3",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn",
    build: (r) => {
      const a = r.int(2, 6), b = r.int(1, 9);
      const pool = [
        { t: `\u0110a th\u1EE9c $P(x)=${a}x^{3}-${b}x+1$ c\xF3 b\u1EADc $3$`, ok: true, why: "b\u1EADc c\u1EE7a \u0111a th\u1EE9c l\xE0 s\u1ED1 m\u0169 **cao nh\u1EA5t** c\u1EE7a bi\u1EBFn." },
        { t: `\u0110a th\u1EE9c $P(x)=${a}x^{3}-${b}x+1$ c\xF3 h\u1EC7 s\u1ED1 cao nh\u1EA5t l\xE0 $${a}$`, ok: true, why: "h\u1EC7 s\u1ED1 cao nh\u1EA5t l\xE0 h\u1EC7 s\u1ED1 c\u1EE7a h\u1EA1ng t\u1EED c\xF3 b\u1EADc l\u1EDBn nh\u1EA5t." },
        { t: `\u0110a th\u1EE9c $P(x)=${a}x^{3}-${b}x+1$ c\xF3 h\u1EC7 s\u1ED1 t\u1EF1 do l\xE0 $${a}$`, ok: false, why: "h\u1EC7 s\u1ED1 t\u1EF1 do l\xE0 h\u1EA1ng t\u1EED kh\xF4ng ch\u1EE9a bi\u1EBFn, \u1EDF \u0111\xE2y b\u1EB1ng $1$." },
        { t: `$x=\\f{${b}}{${a}}$ l\xE0 nghi\u1EC7m c\u1EE7a $Q(x)=${a}x-${b}$`, ok: true, why: `$Q\\left(\\f{${b}}{${a}}\\right)=${b}-${b}=0$.` },
        { t: "M\u1ECDi \u0111a th\u1EE9c b\u1EADc nh\u1EA5t m\u1ED9t bi\u1EBFn \u0111\u1EC1u c\xF3 \u0111\xFAng m\u1ED9t nghi\u1EC7m", ok: true, why: "$ax+b=0$ v\u1EDBi $a\\ne0$ lu\xF4n cho $x=-\\f{b}{a}$ duy nh\u1EA5t." },
        { t: "\u0110a th\u1EE9c $x^{2}+1$ c\xF3 nghi\u1EC7m th\u1EF1c", ok: false, why: "$x^{2}\\ge0$ n\xEAn $x^{2}+1\\ge1>0$ v\u1EDBi m\u1ECDi $x$." },
        { t: "B\u1EADc c\u1EE7a t\u1ED5ng hai \u0111a th\u1EE9c lu\xF4n b\u1EB1ng b\u1EADc l\u1EDBn h\u01A1n trong hai \u0111a th\u1EE9c", ok: false, why: "khi hai h\u1EA1ng t\u1EED b\u1EADc cao tri\u1EC7t ti\xEAu nhau, b\u1EADc c\u1EE7a t\u1ED5ng s\u1EBD **gi\u1EA3m** (v\xED d\u1EE5 $x^{2}+1$ c\u1ED9ng $-x^{2}+x$)." },
        { t: "S\u1ED1 $0$ \u0111\u01B0\u1EE3c coi l\xE0 \u0111a th\u1EE9c kh\xF4ng, kh\xF4ng c\xF3 b\u1EADc x\xE1c \u0111\u1ECBnh", ok: true, why: "theo quy \u01B0\u1EDBc c\u1EE7a s\xE1ch gi\xE1o khoa." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Tr\u01B0\u1EDBc khi x\xE9t b\u1EADc hay h\u1EC7 s\u1ED1, ph\u1EA3i **thu g\u1ECDn** \u0111a th\u1EE9c v\xE0 **s\u1EAFp x\u1EBFp** theo lu\u1EF9 th\u1EEBa gi\u1EA3m d\u1EA7n.",
          "Mu\u1ED1n ki\u1EC3m tra $x=a$ c\xF3 l\xE0 nghi\u1EC7m kh\xF4ng, ch\u1EC9 c\u1EA7n thay v\xE0o v\xE0 xem k\u1EBFt qu\u1EA3 c\xF3 b\u1EB1ng $0$ hay kh\xF4ng."
        ],
        pitfall: "Nh\u1EA7m h\u1EC7 s\u1ED1 cao nh\u1EA5t v\u1EDBi h\u1EC7 s\u1ED1 t\u1EF1 do, ho\u1EB7c qu\xEAn thu g\u1ECDn tr\u01B0\u1EDBc khi x\xE1c \u0111\u1ECBnh b\u1EADc."
      });
    }
  },
  {
    id: "g7.tf-tam-giac-bang-nhau",
    topicId: "g7-t5",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 c\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a tam gi\xE1c",
    build: (r) => {
      const pool = [
        { t: "Hai tam gi\xE1c c\xF3 ba c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng b\u1EB1ng nhau th\xEC b\u1EB1ng nhau", ok: true, why: "\u0111\xF3 l\xE0 tr\u01B0\u1EDDng h\u1EE3p **c.c.c**." },
        { t: "Hai tam gi\xE1c c\xF3 ba g\xF3c t\u01B0\u01A1ng \u1EE9ng b\u1EB1ng nhau th\xEC b\u1EB1ng nhau", ok: false, why: "ba g\xF3c b\u1EB1ng nhau ch\u1EC9 cho hai tam gi\xE1c **\u0111\u1ED3ng d\u1EA1ng**, k\xEDch th\u01B0\u1EDBc c\xF3 th\u1EC3 kh\xE1c nhau." },
        { t: "Hai tam gi\xE1c vu\xF4ng c\xF3 c\u1EA1nh huy\u1EC1n v\xE0 m\u1ED9t g\xF3c nh\u1ECDn b\u1EB1ng nhau th\xEC b\u1EB1ng nhau", ok: true, why: "tr\u01B0\u1EDDng h\u1EE3p **c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn**." },
        { t: "Hai tam gi\xE1c vu\xF4ng c\xF3 hai c\u1EA1nh g\xF3c vu\xF4ng b\u1EB1ng nhau th\xEC b\u1EB1ng nhau", ok: true, why: "\u0111\xE2y ch\xEDnh l\xE0 tr\u01B0\u1EDDng h\u1EE3p c.g.c v\u1EDBi g\xF3c xen gi\u1EEFa l\xE0 g\xF3c vu\xF4ng." },
        { t: "Hai tam gi\xE1c c\xF3 hai c\u1EA1nh v\xE0 m\u1ED9t g\xF3c b\u1EB1ng nhau th\xEC lu\xF4n b\u1EB1ng nhau", ok: false, why: "g\xF3c ph\u1EA3i l\xE0 g\xF3c **xen gi\u1EEFa** hai c\u1EA1nh \u0111\xF3; n\u1EBFu kh\xF4ng, k\u1EBFt lu\u1EADn c\xF3 th\u1EC3 sai." },
        { t: "Trong tam gi\xE1c c\xE2n, hai g\xF3c \u1EDF \u0111\xE1y b\u1EB1ng nhau", ok: true, why: "t\xEDnh ch\u1EA5t c\u1EE7a tam gi\xE1c c\xE2n." },
        { t: "Tam gi\xE1c \u0111\u1EC1u l\xE0 tam gi\xE1c c\xE2n t\u1EA1i c\u1EA3 ba \u0111\u1EC9nh", ok: true, why: "ba c\u1EA1nh b\u1EB1ng nhau n\xEAn c\xE2n t\u1EA1i m\u1ECDi \u0111\u1EC9nh; m\u1ED7i g\xF3c b\u1EB1ng $60\\deg$." },
        { t: "\u0110i\u1EC3m n\u1EB1m tr\xEAn \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a m\u1ED9t \u0111o\u1EA1n th\u1EB3ng th\xEC c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u \u0111o\u1EA1n th\u1EB3ng \u0111\xF3", ok: true, why: "t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng c\u1EE7a \u0111\u01B0\u1EDDng trung tr\u1EF1c." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Ba tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau: **c.c.c**, **c.g.c** (g\xF3c ph\u1EA3i **xen gi\u1EEFa**), **g.c.g** (c\u1EA1nh ph\u1EA3i **k\u1EC1** hai g\xF3c).",
          "V\u1EDBi tam gi\xE1c vu\xF4ng c\xF3 th\xEAm: c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn, c\u1EA1nh huy\u1EC1n \u2013 c\u1EA1nh g\xF3c vu\xF4ng."
        ],
        pitfall: 'D\xF9ng "hai c\u1EA1nh v\xE0 m\u1ED9t g\xF3c" m\xE0 g\xF3c kh\xF4ng xen gi\u1EEFa \u2014 \u0111\xE2y kh\xF4ng ph\u1EA3i tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau.'
      });
    }
  },
  {
    id: "g7.tf-thong-ke-xs",
    topicId: "g7-t7",
    grade: 7,
    level: "TH",
    kind: "TF",
    strand: "THONG_KE_XS",
    tag: "\u0110\xFAng/Sai \u2014 th\u1ED1ng k\xEA v\xE0 x\xE1c su\u1EA5t",
    build: (r) => {
      const n = r.int(4, 12);
      const pool = [
        { t: "T\u1ED5ng c\xE1c t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m trong m\u1ED9t bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n b\u1EB1ng $100\\%$", ok: true, why: "c\u1EA3 h\xECnh tr\xF2n \u1EE9ng v\u1EDBi to\xE0n b\u1ED9 d\u1EEF li\u1EC7u." },
        { t: "T\u1ED5ng c\xE1c g\xF3c \u1EDF t\xE2m trong m\u1ED9t bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n b\u1EB1ng $180\\deg$", ok: false, why: "ph\u1EA3i b\u1EB1ng $360\\deg$ \u2014 \u0111\xF3 l\xE0 s\u1ED1 \u0111o c\u1EA3 \u0111\u01B0\u1EDDng tr\xF2n." },
        { t: "Bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng th\xEDch h\u1EE3p \u0111\u1EC3 bi\u1EC3u di\u1EC5n **s\u1EF1 thay \u0111\u1ED5i theo th\u1EDDi gian**", ok: true, why: "tr\u1EE5c ho\xE0nh l\xE0 m\u1ED1c th\u1EDDi gian, \u0111\u1ED9 d\u1ED1c cho th\u1EA5y xu h\u01B0\u1EDBng t\u0103ng gi\u1EA3m." },
        { t: "X\xE1c su\u1EA5t c\u1EE7a m\u1ED9t bi\u1EBFn c\u1ED1 lu\xF4n n\u1EB1m trong \u0111o\u1EA1n t\u1EEB $0$ \u0111\u1EBFn $1$", ok: true, why: "x\xE1c su\u1EA5t l\xE0 t\u1EC9 s\u1ED1 gi\u1EEFa s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i v\xE0 t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3." },
        { t: "Bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn c\xF3 x\xE1c su\u1EA5t b\u1EB1ng $0$", ok: false, why: "bi\u1EBFn c\u1ED1 **ch\u1EAFc ch\u1EAFn** c\xF3 x\xE1c su\u1EA5t b\u1EB1ng $1$; bi\u1EBFn c\u1ED1 **kh\xF4ng th\u1EC3** m\u1EDBi c\xF3 x\xE1c su\u1EA5t $0$." },
        { t: `Gieo m\u1ED9t con x\xFAc x\u1EAFc c\xE2n \u0111\u1ED1i, x\xE1c su\u1EA5t xu\u1EA5t hi\u1EC7n m\u1EB7t $${Math.min(n, 6)}$ ch\u1EA5m l\xE0 $\\f{1}{6}$`, ok: Math.min(n, 6) <= 6, why: "s\xE1u m\u1EB7t \u0111\u1ED3ng kh\u1EA3 n\u0103ng n\xEAn m\u1ED7i m\u1EB7t c\xF3 x\xE1c su\u1EA5t $\\f{1}{6}$." },
        { t: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m lu\xF4n b\u1EB1ng \u0111\xFAng x\xE1c su\u1EA5t l\xED thuy\u1EBFt", ok: false, why: "x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m ch\u1EC9 **x\u1EA5p x\u1EC9** v\xE0 c\xE0ng g\u1EA7n khi s\u1ED1 l\u1EA7n th\u1EED c\xE0ng l\u1EDBn." },
        { t: "Trong m\u1ED9t d\xE3y s\u1ED1 li\u1EC7u, m\u1ED1t l\xE0 gi\xE1 tr\u1ECB xu\u1EA5t hi\u1EC7n nhi\u1EC1u nh\u1EA5t", ok: true, why: "\u0111\xF3 l\xE0 \u0111\u1ECBnh ngh\u0129a c\u1EE7a m\u1ED1t." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Hai m\u1ED1c ph\u1EA3i nh\u1EDB: c\u1EA3 h\xECnh qu\u1EA1t tr\xF2n \u1EE9ng v\u1EDBi $360\\deg$ v\xE0 v\u1EDBi $100\\%$.",
          "X\xE1c su\u1EA5t lu\xF4n thu\u1ED9c $[0;1]$: bi\u1EBFn c\u1ED1 kh\xF4ng th\u1EC3 $=0$, bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn $=1$."
        ],
        pitfall: "L\u1EABn l\u1ED9n x\xE1c su\u1EA5t **l\xED thuy\u1EBFt** (t\xEDnh b\u1EB1ng c\xF4ng th\u1EE9c) v\u1EDBi x\xE1c su\u1EA5t **th\u1EF1c nghi\u1EC7m** (\u0111\u1EBFm t\u1EEB s\u1ED1 li\u1EC7u th\u1EADt)."
      });
    }
  }
];

// src/bank/g8-nb.ts
var MC_DA_THUC = [
  {
    q: "Khai tri\u1EC3n $(a-b)^{2}$ ta \u0111\u01B0\u1EE3c:",
    a: "$a^{2}-2ab+b^{2}$",
    w: ["$a^{2}-b^{2}$", "$a^{2}+2ab+b^{2}$", "$a^{2}-ab+b^{2}$"],
    why: "B\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t hi\u1EC7u: b\xECnh ph\u01B0\u01A1ng s\u1ED1 th\u1EE9 nh\u1EA5t, tr\u1EEB hai l\u1EA7n t\xEDch, c\u1ED9ng b\xECnh ph\u01B0\u01A1ng s\u1ED1 th\u1EE9 hai.",
    trap: "Nh\u1EA7m $(a-b)^{2}$ v\u1EDBi $a^{2}-b^{2}$ \u2014 \u0111\xF3 l\xE0 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c **hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng**."
  },
  {
    q: "Bi\u1EC3u th\u1EE9c $a^{3}-b^{3}$ ph\xE2n t\xEDch th\xE0nh:",
    a: "$(a-b)(a^{2}+ab+b^{2})$",
    w: ["$(a-b)^{3}$", "$(a-b)(a^{2}-ab+b^{2})$", "$(a+b)(a^{2}-ab+b^{2})$"],
    why: "Hi\u1EC7u hai l\u1EADp ph\u01B0\u01A1ng: d\u1EA5u trong ngo\u1EB7c nh\u1ECF l\xE0 $-$, d\u1EA5u gi\u1EEFa c\xE1c h\u1EA1ng t\u1EED trong ngo\u1EB7c l\u1EDBn l\xE0 $+$.",
    trap: 'Quy t\u1EAFc nh\u1EDB: "hi\u1EC7u \u2013 t\u1ED5ng, t\u1ED5ng \u2013 hi\u1EC7u" cho d\u1EA5u c\u1EE7a h\u1EA1ng t\u1EED $ab$.'
  },
  {
    q: "Ph\xE2n t\xEDch $x^{2}-6x+9$ th\xE0nh nh\xE2n t\u1EED \u0111\u01B0\u1EE3c:",
    a: "$(x-3)^{2}$",
    w: ["$(x+3)^{2}$", "$(x-3)(x+3)$", "$(x-9)(x+1)$"],
    why: "$x^{2}-6x+9=x^{2}-2\\cdot3x+3^{2}=(x-3)^{2}$."
  },
  {
    q: "Ph\xE2n th\u1EE9c $\\f{x+1}{x-2}$ x\xE1c \u0111\u1ECBnh khi:",
    a: "$x\\ne2$",
    w: ["$x\\ne-1$", "$x\\ne0$", "$x\\ne\\pm2$"],
    why: "Ph\xE2n th\u1EE9c x\xE1c \u0111\u1ECBnh khi **m\u1EABu kh\xE1c $0$**: $x-2\\ne0$.",
    trap: "Nhi\u1EC1u b\u1EA1n cho \u0111i\u1EC1u ki\u1EC7n \u1EDF **t\u1EED** \u2014 ch\u1EC9 m\u1EABu m\u1EDBi c\u1EA7n kh\xE1c $0$."
  },
  {
    q: "R\xFAt g\u1ECDn $\\f{x^{2}-4}{x+2}$ (v\u1EDBi $x\\ne-2$) \u0111\u01B0\u1EE3c:",
    a: "$x-2$",
    w: ["$x+2$", "$x^{2}-2$", "$\\f{x-2}{2}$"],
    why: "$\\f{(x-2)(x+2)}{x+2}=x-2$."
  },
  {
    q: "Mu\u1ED1n chia hai ph\xE2n th\u1EE9c $\\f{A}{B}:\\f{C}{D}$ ta:",
    a: "nh\xE2n $\\f{A}{B}$ v\u1EDBi $\\f{D}{C}$",
    w: ["nh\xE2n $\\f{A}{B}$ v\u1EDBi $\\f{C}{D}$", "chia t\u1EED cho t\u1EED, m\u1EABu cho m\u1EABu", "quy \u0111\u1ED3ng r\u1ED3i tr\u1EEB"],
    why: "Chia cho m\u1ED9t ph\xE2n th\u1EE9c b\u1EB1ng nh\xE2n v\u1EDBi **ngh\u1ECBch \u0111\u1EA3o** c\u1EE7a n\xF3 (v\u1EDBi $C\\ne0$)."
  }
];
var MC_PT_HAM = [
  {
    q: "Ph\u01B0\u01A1ng tr\xECnh n\xE0o sau \u0111\xE2y l\xE0 **ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n**?",
    a: "$\\f{1}{2}x-1=0$",
    w: ["$(x-1)^{2}=9$", "$2x^{2}+1=0$", "$0{,}3x-4y=0$"],
    why: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n c\xF3 d\u1EA1ng $ax+b=0$ v\u1EDBi $a\\ne0$ v\xE0 ch\u1EC9 m\u1ED9t \u1EA9n.",
    trap: "$0{,}3x-4y=0$ c\xF3 **hai** \u1EA9n; hai ph\u01B0\u01A1ng \xE1n c\xF2n l\u1EA1i ch\u1EE9a $x^{2}$."
  },
  {
    q: "Nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh $2x-3=12-3x$ l\xE0:",
    a: "$x=3$",
    w: ["$x=-3$", "$x=\\f{9}{5}$", "v\xF4 nghi\u1EC7m"],
    why: "$2x+3x=12+3\\Rightarrow5x=15\\Rightarrow x=3$."
  },
  {
    q: "Ph\u01B0\u01A1ng tr\xECnh $0\\cdot x=5$ c\xF3:",
    a: "v\xF4 nghi\u1EC7m",
    w: ["m\u1ED9t nghi\u1EC7m", "hai nghi\u1EC7m", "v\xF4 s\u1ED1 nghi\u1EC7m"],
    why: "Kh\xF4ng c\xF3 gi\xE1 tr\u1ECB $x$ n\xE0o \u0111\u1EC3 $0=5$.",
    trap: "N\u1EBFu l\xE0 $0\\cdot x=0$ th\xEC l\u1EA1i c\xF3 **v\xF4 s\u1ED1** nghi\u1EC7m \u2014 ph\u1EA3i ph\xE2n bi\u1EC7t hai tr\u01B0\u1EDDng h\u1EE3p."
  },
  {
    q: "H\xE0m s\u1ED1 $y=ax+b$ l\xE0 h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t khi:",
    a: "$a\\ne0$",
    w: ["$b\\ne0$", "$a=0$", "$a\\ne0$ v\xE0 $b\\ne0$"],
    why: "Ch\u1EC9 c\u1EA7n h\u1EC7 s\u1ED1 g\xF3c $a$ kh\xE1c $0$; $b$ c\xF3 th\u1EC3 b\u1EB1ng $0$ (\u0111\u1ED3 th\u1ECB qua g\u1ED1c to\u1EA1 \u0111\u1ED9)."
  },
  {
    q: "\u0110\u1ED3 th\u1ECB h\xE0m s\u1ED1 $y=2x-3$ c\u1EAFt tr\u1EE5c tung t\u1EA1i \u0111i\u1EC3m c\xF3 tung \u0111\u1ED9:",
    a: "$-3$",
    w: ["$3$", "$2$", "$\\f{3}{2}$"],
    why: "Cho $x=0$ \u0111\u01B0\u1EE3c $y=-3$; tung \u0111\u1ED9 g\u1ED1c ch\xEDnh l\xE0 h\u1EC7 s\u1ED1 $b$.",
    trap: "Nh\u1EA7m v\u1EDBi giao \u0111i\u1EC3m tr\u1EE5c **ho\xE0nh** (cho $y=0$, \u0111\u01B0\u1EE3c $x=\\f{3}{2}$)."
  },
  {
    q: "Hai \u0111\u01B0\u1EDDng th\u1EB3ng $y=ax+b$ v\xE0 $y=a'x+b'$ **song song** khi:",
    a: "$a=a'$ v\xE0 $b\\ne b'$",
    w: ["$a=a'$ v\xE0 $b=b'$", "$a\\ne a'$", "$a\\cdot a'=-1$"],
    why: "C\xF9ng h\u1EC7 s\u1ED1 g\xF3c th\xEC c\xF9ng \u0111\u1ED9 d\u1ED1c; kh\xE1c tung \u0111\u1ED9 g\u1ED1c th\xEC kh\xF4ng tr\xF9ng nhau."
  }
];
var MC_HINH_8 = [
  {
    q: "T\u1EE9 gi\xE1c c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng l\xE0:",
    a: "h\xECnh b\xECnh h\xE0nh",
    w: ["h\xECnh thang", "h\xECnh thang c\xE2n", "t\u1EE9 gi\xE1c b\u1EA5t k\u1EF3"],
    why: "\u0110\xF3 l\xE0 m\u1ED9t d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt h\xECnh b\xECnh h\xE0nh."
  },
  {
    q: "H\xECnh b\xECnh h\xE0nh c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o **b\u1EB1ng nhau** l\xE0:",
    a: "h\xECnh ch\u1EEF nh\u1EADt",
    w: ["h\xECnh thoi", "h\xECnh vu\xF4ng", "h\xECnh thang c\xE2n"],
    why: "H\xECnh b\xECnh h\xE0nh + hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau \u27F9 h\xECnh ch\u1EEF nh\u1EADt.",
    trap: "Mu\u1ED1n ra h\xECnh vu\xF4ng c\u1EA7n **th\xEAm** \u0111i\u1EC1u ki\u1EC7n hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c."
  },
  {
    q: "H\xECnh b\xECnh h\xE0nh c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o **vu\xF4ng g\xF3c** l\xE0:",
    a: "h\xECnh thoi",
    w: ["h\xECnh ch\u1EEF nh\u1EADt", "h\xECnh vu\xF4ng", "h\xECnh thang"],
    why: "H\xECnh b\xECnh h\xE0nh + hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c \u27F9 h\xECnh thoi."
  },
  {
    q: "\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c th\xEC:",
    a: "song song v\u1EDBi c\u1EA1nh th\u1EE9 ba v\xE0 b\u1EB1ng n\u1EEDa c\u1EA1nh \u1EA5y",
    w: ["b\u1EB1ng c\u1EA1nh th\u1EE9 ba", "vu\xF4ng g\xF3c v\u1EDBi c\u1EA1nh th\u1EE9 ba", "b\u1EB1ng n\u1EEDa chu vi tam gi\xE1c"],
    why: "\u0110\u1ECBnh l\xED \u0111\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c."
  },
  {
    q: "Trong tam gi\xE1c vu\xF4ng, trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng:",
    a: "n\u1EEDa c\u1EA1nh huy\u1EC1n",
    w: ["c\u1EA1nh huy\u1EC1n", "n\u1EEDa c\u1EA1nh g\xF3c vu\xF4ng", "\u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n"],
    why: "Trung \u0111i\u1EC3m c\u1EA1nh huy\u1EC1n c\xE1ch \u0111\u1EC1u ba \u0111\u1EC9nh \u2014 ch\xEDnh l\xE0 t\xE2m \u0111\u01B0\u1EDDng tr\xF2n ngo\u1EA1i ti\u1EBFp."
  },
  {
    q: "N\u1EBFu $\\tri ABC\\sim\\tri A'B'C'$ theo t\u1EC9 s\u1ED1 $k$ th\xEC t\u1EC9 s\u1ED1 **di\u1EC7n t\xEDch** c\u1EE7a ch\xFAng b\u1EB1ng:",
    a: "$k^{2}$",
    w: ["$k$", "$\\f{1}{k}$", "$2k$"],
    why: "Di\u1EC7n t\xEDch l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng hai chi\u1EC1u n\xEAn t\u1EC9 s\u1ED1 b\u1EB1ng b\xECnh ph\u01B0\u01A1ng t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng.",
    trap: "Chu vi, trung tuy\u1EBFn, \u0111\u01B0\u1EDDng cao th\xEC t\u1EC9 s\u1ED1 b\u1EB1ng $k$; ch\u1EC9 **di\u1EC7n t\xEDch** m\u1EDBi l\xE0 $k^{2}$."
  },
  {
    q: "\u0110\u1ECBnh l\xED Thal\xE8s trong tam gi\xE1c ph\xE1t bi\u1EC3u r\u1EB1ng \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi m\u1ED9t c\u1EA1nh s\u1EBD:",
    a: "\u0111\u1ECBnh ra tr\xEAn hai c\u1EA1nh c\xF2n l\u1EA1i nh\u1EEFng \u0111o\u1EA1n th\u1EB3ng t\u01B0\u01A1ng \u1EE9ng t\u1EC9 l\u1EC7",
    w: ["chia \u0111\xF4i hai c\u1EA1nh c\xF2n l\u1EA1i", "vu\xF4ng g\xF3c v\u1EDBi hai c\u1EA1nh c\xF2n l\u1EA1i", "\u0111i qua tr\u1ECDng t\xE2m"],
    why: "\u0110\xF3 l\xE0 n\u1ED9i dung \u0111\u1ECBnh l\xED Thal\xE8s thu\u1EADn."
  },
  {
    q: "Th\u1EC3 t\xEDch h\xECnh ch\xF3p c\xF3 di\u1EC7n t\xEDch \u0111\xE1y $S$ v\xE0 chi\u1EC1u cao $h$ l\xE0:",
    a: "$\\f{1}{3}Sh$",
    w: ["$Sh$", "$\\f{1}{2}Sh$", "$3Sh$"],
    why: "Th\u1EC3 t\xEDch h\xECnh ch\xF3p b\u1EB1ng **m\u1ED9t ph\u1EA7n ba** th\u1EC3 t\xEDch h\xECnh l\u0103ng tr\u1EE5 c\xF9ng \u0111\xE1y, c\xF9ng chi\u1EC1u cao."
  }
];
var BANK_G8_NB = [
  {
    id: "g8.nb-da-thuc-mo-rong",
    topicId: "g8-t1",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c, nh\xE2n t\u1EED v\xE0 ph\xE2n th\u1EE9c",
    build: (r) => mcFrom(r, MC_DA_THUC, {
      thinking: [
        "B\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c ph\u1EA3i thu\u1ED9c l\xF2ng \u2014 \u0111\u1EB7c bi\u1EC7t ph\xE2n bi\u1EC7t $(a-b)^{2}$ v\u1EDBi $a^{2}-b^{2}$.",
        "Ph\xE2n th\u1EE9c lu\xF4n ph\u1EA3i \u0111\u1EB7t **\u0111i\u1EC1u ki\u1EC7n m\u1EABu kh\xE1c $0$** tr\u01B0\u1EDBc khi r\xFAt g\u1ECDn."
      ]
    })
  },
  {
    id: "g8.nb-pt-ham-mo-rong",
    topicId: "g8-t4",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t v\xE0 h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
    build: (r) => mcFrom(r, MC_PT_HAM, {
      thinking: [
        'Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n: d\u1EA1ng $ax+b=0$ v\u1EDBi $a\\ne0$ \u2014 ch\xFA \xFD c\u1EA3 \u0111i\u1EC1u ki\u1EC7n "m\u1ED9t \u1EA9n" v\xE0 "b\u1EADc nh\u1EA5t".',
        "V\u1EDBi $ax+b=0$: $a\\ne0$ \u2192 m\u1ED9t nghi\u1EC7m; $a=0$, $b\\ne0$ \u2192 v\xF4 nghi\u1EC7m; $a=b=0$ \u2192 v\xF4 s\u1ED1 nghi\u1EC7m."
      ]
    })
  },
  {
    id: "g8.nb-hinh-mo-rong",
    topicId: "g8-t5",
    grade: 8,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t, Thal\xE8s v\xE0 \u0111\u1ED3ng d\u1EA1ng",
    build: (r) => mcFrom(r, MC_HINH_8, {
      thinking: [
        "S\u01A1 \u0111\u1ED3 nh\u1EADn bi\u1EBFt: h\xECnh b\xECnh h\xE0nh **+ hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau** \u2192 h\xECnh ch\u1EEF nh\u1EADt; **+ hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c** \u2192 h\xECnh thoi; c\xF3 c\u1EA3 hai \u2192 h\xECnh vu\xF4ng.",
        "T\u1EC9 s\u1ED1 c\xE1c \u0111\u1EA1i l\u01B0\u1EE3ng **\u0111\u1ED9 d\xE0i** b\u1EB1ng $k$, ri\xEAng t\u1EC9 s\u1ED1 **di\u1EC7n t\xEDch** b\u1EB1ng $k^{2}$."
      ]
    })
  },
  {
    id: "g8.tf-hang-dang-thuc-2",
    topicId: "g8-t1",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c v\xE0 ph\xE2n t\xEDch nh\xE2n t\u1EED",
    build: (r) => {
      const a = r.int(2, 9);
      const pool = [
        { t: `$(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}$`, ok: true, why: "b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t t\u1ED5ng." },
        { t: `$(x-${a})^{2}=x^{2}-${a * a}$`, ok: false, why: `\u0111\xFAng ph\u1EA3i l\xE0 $x^{2}-${2 * a}x+${a * a}$; $x^{2}-${a * a}$ l\xE0 **hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng**.` },
        { t: `$x^{2}-${a * a}=(x-${a})(x+${a})$`, ok: true, why: "hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng." },
        { t: `$x^{2}+${a * a}$ ph\xE2n t\xEDch \u0111\u01B0\u1EE3c th\xE0nh nh\xE2n t\u1EED tr\xEAn $\\R$`, ok: false, why: "t\u1ED5ng hai b\xECnh ph\u01B0\u01A1ng lu\xF4n d\u01B0\u01A1ng, kh\xF4ng ph\xE2n t\xEDch \u0111\u01B0\u1EE3c tr\xEAn t\u1EADp s\u1ED1 th\u1EF1c." },
        { t: `$x^{3}-${a ** 3}=(x-${a})(x^{2}+${a}x+${a * a})$`, ok: true, why: "hi\u1EC7u hai l\u1EADp ph\u01B0\u01A1ng." },
        { t: `$(x+${a})^{3}=x^{3}+${a ** 3}$`, ok: false, why: `c\xF2n thi\u1EBFu hai h\u1EA1ng t\u1EED gi\u1EEFa: $(x+${a})^{3}=x^{3}+${3 * a}x^{2}+${3 * a * a}x+${a ** 3}$.` },
        { t: "Ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED l\xE0 vi\u1EBFt n\xF3 th\xE0nh t\xEDch c\u1EE7a nh\u1EEFng \u0111a th\u1EE9c kh\xE1c", ok: true, why: "\u0111\xFAng theo \u0111\u1ECBnh ngh\u0129a." },
        { t: `$${a}x^{2}+${a}x=${a}x(x+1)$`, ok: true, why: `\u0111\u1EB7t nh\xE2n t\u1EED chung $${a}x$.` }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Tr\u01B0\u1EDBc khi khai tri\u1EC3n, h\xE3y nh\u1EADn d\u1EA1ng: c\xF3 b\xECnh ph\u01B0\u01A1ng? c\xF3 hi\u1EC7u/t\u1ED5ng hai l\u1EADp ph\u01B0\u01A1ng? c\xF3 nh\xE2n t\u1EED chung?",
          "Ba h\u1EB1ng \u0111\u1EB3ng th\u1EE9c hay b\u1ECB nh\u1EA7m nh\u1EA5t: $(a\\pm b)^{2}$, $a^{2}-b^{2}$ v\xE0 $(a\\pm b)^{3}$."
        ],
        pitfall: "Vi\u1EBFt $(x-a)^{2}=x^{2}-a^{2}$ ho\u1EB7c $(x+a)^{3}=x^{3}+a^{3}$ \u2014 qu\xEAn c\xE1c h\u1EA1ng t\u1EED \u1EDF gi\u1EEFa."
      });
    }
  },
  {
    id: "g8.tf-phuong-trinh",
    topicId: "g8-t3",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
    build: (r) => {
      const a = r.int(2, 8), b = r.int(1, 20);
      const pool = [
        { t: `$x=\\f{${b}}{${a}}$ l\xE0 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh $${a}x-${b}=0$`, ok: true, why: `thay v\xE0o \u0111\u01B0\u1EE3c $${b}-${b}=0$.` },
        { t: `Ph\u01B0\u01A1ng tr\xECnh $${a}x-${b}=0$ c\xF3 v\xF4 s\u1ED1 nghi\u1EC7m`, ok: false, why: `h\u1EC7 s\u1ED1 $${a}\\ne0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 **\u0111\xFAng m\u1ED9t** nghi\u1EC7m.` },
        { t: "Ph\u01B0\u01A1ng tr\xECnh $0x=0$ c\xF3 v\xF4 s\u1ED1 nghi\u1EC7m", ok: true, why: "m\u1ECDi gi\xE1 tr\u1ECB c\u1EE7a $x$ \u0111\u1EC1u tho\u1EA3 m\xE3n." },
        { t: "Ph\u01B0\u01A1ng tr\xECnh $0x=3$ c\xF3 m\u1ED9t nghi\u1EC7m", ok: false, why: "kh\xF4ng c\xF3 $x$ n\xE0o \u0111\u1EC3 $0=3$, n\xEAn ph\u01B0\u01A1ng tr\xECnh **v\xF4 nghi\u1EC7m**." },
        { t: "Hai ph\u01B0\u01A1ng tr\xECnh g\u1ECDi l\xE0 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng khi ch\xFAng c\xF3 c\xF9ng t\u1EADp nghi\u1EC7m", ok: true, why: "\u0111\xFAng theo \u0111\u1ECBnh ngh\u0129a." },
        { t: "Nh\xE2n hai v\u1EBF c\u1EE7a m\u1ED9t ph\u01B0\u01A1ng tr\xECnh v\u1EDBi $0$ ta \u0111\u01B0\u1EE3c ph\u01B0\u01A1ng tr\xECnh t\u01B0\u01A1ng \u0111\u01B0\u01A1ng", ok: false, why: "nh\xE2n v\u1EDBi $0$ bi\u1EBFn m\u1ECDi ph\u01B0\u01A1ng tr\xECnh th\xE0nh $0=0$, l\xE0m **m\u1EA5t** th\xF4ng tin v\u1EC1 nghi\u1EC7m." },
        { t: "Chuy\u1EC3n m\u1ED9t h\u1EA1ng t\u1EED t\u1EEB v\u1EBF n\xE0y sang v\u1EBF kia ph\u1EA3i **\u0111\u1ED5i d\u1EA5u** h\u1EA1ng t\u1EED \u0111\xF3", ok: true, why: "quy t\u1EAFc chuy\u1EC3n v\u1EBF." },
        { t: `Ph\u01B0\u01A1ng tr\xECnh $(x-${a})(x+${b})=0$ c\xF3 hai nghi\u1EC7m l\xE0 $x=${a}$ v\xE0 $x=-${b}$`, ok: true, why: "t\xEDch b\u1EB1ng $0$ khi \xEDt nh\u1EA5t m\u1ED9t th\u1EEBa s\u1ED1 b\u1EB1ng $0$." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "V\u1EDBi $ax+b=0$: $a\\ne0$ \u2192 m\u1ED9t nghi\u1EC7m duy nh\u1EA5t; $a=0$ v\xE0 $b\\ne0$ \u2192 v\xF4 nghi\u1EC7m; $a=b=0$ \u2192 v\xF4 s\u1ED1 nghi\u1EC7m.",
          "Hai ph\xE9p bi\u1EBFn \u0111\u1ED5i t\u01B0\u01A1ng \u0111\u01B0\u01A1ng \u0111\u01B0\u1EE3c ph\xE9p: chuy\u1EC3n v\u1EBF (\u0111\u1ED5i d\u1EA5u) v\xE0 nh\xE2n/chia hai v\u1EBF cho s\u1ED1 **kh\xE1c $0$**."
        ],
        pitfall: "Nh\xE2n ho\u1EB7c chia hai v\u1EBF cho m\u1ED9t bi\u1EC3u th\u1EE9c c\xF3 th\u1EC3 b\u1EB1ng $0$ \u2014 s\u1EBD l\xE0m m\u1EA5t ho\u1EB7c th\xEAm nghi\u1EC7m."
      });
    }
  },
  {
    id: "g8.tf-dong-dang",
    topicId: "g8-t6",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 Thal\xE8s v\xE0 tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng",
    build: (r) => {
      const k = r.int(2, 5);
      const pool = [
        { t: "Hai tam gi\xE1c b\u1EB1ng nhau th\xEC \u0111\u1ED3ng d\u1EA1ng v\u1EDBi nhau", ok: true, why: "\u0111\xF3 l\xE0 tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng v\u1EDBi t\u1EC9 s\u1ED1 $k=1$." },
        { t: "Hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng th\xEC b\u1EB1ng nhau", ok: false, why: "ch\u1EC9 b\u1EB1ng nhau khi t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $k=1$." },
        { t: "Hai tam gi\xE1c c\xF3 hai g\xF3c t\u01B0\u01A1ng \u1EE9ng b\u1EB1ng nhau th\xEC \u0111\u1ED3ng d\u1EA1ng", ok: true, why: "tr\u01B0\u1EDDng h\u1EE3p **g.g** \u2014 g\xF3c th\u1EE9 ba t\u1EF1 kh\u1EAFc b\u1EB1ng nhau." },
        { t: `N\u1EBFu $\\tri ABC\\sim\\tri A'B'C'$ theo t\u1EC9 s\u1ED1 $${k}$ th\xEC t\u1EC9 s\u1ED1 chu vi b\u1EB1ng $${k}$`, ok: true, why: "chu vi l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\u1ED9 d\xE0i n\xEAn t\u1EC9 l\u1EC7 theo \u0111\xFAng $k$." },
        { t: `N\u1EBFu $\\tri ABC\\sim\\tri A'B'C'$ theo t\u1EC9 s\u1ED1 $${k}$ th\xEC t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch b\u1EB1ng $${k}$`, ok: false, why: `t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch b\u1EB1ng $k^{2}=${k * k}$.` },
        { t: "\u0110\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi m\u1ED9t c\u1EA1nh c\u1EE7a tam gi\xE1c \u0111\u1ECBnh ra hai \u0111o\u1EA1n th\u1EB3ng t\u01B0\u01A1ng \u1EE9ng t\u1EC9 l\u1EC7 tr\xEAn hai c\u1EA1nh c\xF2n l\u1EA1i", ok: true, why: "\u0111\u1ECBnh l\xED Thal\xE8s thu\u1EADn." },
        { t: "\u0110\u01B0\u1EDDng ph\xE2n gi\xE1c trong c\u1EE7a tam gi\xE1c chia c\u1EA1nh \u0111\u1ED1i di\u1EC7n th\xE0nh hai \u0111o\u1EA1n t\u1EC9 l\u1EC7 v\u1EDBi hai c\u1EA1nh k\u1EC1", ok: true, why: "t\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c trong tam gi\xE1c." },
        { t: "Hai tam gi\xE1c vu\xF4ng lu\xF4n \u0111\u1ED3ng d\u1EA1ng v\u1EDBi nhau", ok: false, why: "m\u1EDBi ch\u1EC9 c\xF3 m\u1ED9t c\u1EB7p g\xF3c b\u1EB1ng nhau (g\xF3c vu\xF4ng), c\u1EA7n th\xEAm m\u1ED9t c\u1EB7p g\xF3c nh\u1ECDn n\u1EEFa." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "\u0110\u1ED3ng d\u1EA1ng ch\u1EC9 c\u1EA7n **h\xECnh d\u1EA1ng** gi\u1ED1ng nhau; b\u1EB1ng nhau \u0111\xF2i h\u1ECFi c\u1EA3 h\xECnh d\u1EA1ng l\u1EABn **k\xEDch th\u01B0\u1EDBc**.",
          "V\u1EDBi hai tam gi\xE1c vu\xF4ng, ch\u1EC9 m\u1ED9t g\xF3c vu\xF4ng l\xE0 ch\u01B0a \u0111\u1EE7 \u2014 ph\u1EA3i c\xF3 th\xEAm m\u1ED9t c\u1EB7p g\xF3c nh\u1ECDn ho\u1EB7c c\u1EB7p c\u1EA1nh t\u1EC9 l\u1EC7."
        ],
        pitfall: "\xC1p t\u1EC9 s\u1ED1 $k$ cho di\u1EC7n t\xEDch thay v\xEC $k^{2}$ \u2014 l\u1ED7i sai b\u1EA3n ch\u1EA5t, m\u1EA5t tr\u1ECDn \u0111i\u1EC3m c\xE2u h\u1ECFi."
      });
    }
  },
  {
    id: "g8.tf-phan-thuc",
    topicId: "g8-t2",
    grade: 8,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\xE2n th\u1EE9c \u0111\u1EA1i s\u1ED1",
    build: (r) => {
      const a = r.int(2, 9);
      const pool = [
        { t: `Ph\xE2n th\u1EE9c $\\f{1}{x-${a}}$ x\xE1c \u0111\u1ECBnh khi $x\\ne${a}$`, ok: true, why: "m\u1EABu ph\u1EA3i kh\xE1c $0$." },
        { t: `Ph\xE2n th\u1EE9c $\\f{x-${a}}{x^{2}+1}$ x\xE1c \u0111\u1ECBnh v\u1EDBi m\u1ECDi $x$`, ok: true, why: "$x^{2}+1\\ge1>0$ n\xEAn m\u1EABu kh\xF4ng bao gi\u1EDD b\u1EB1ng $0$." },
        { t: `Ph\xE2n th\u1EE9c $\\f{1}{x^{2}-${a * a}}$ x\xE1c \u0111\u1ECBnh khi $x\\ne${a}$`, ok: false, why: `c\xF2n thi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $x\\ne-${a}$ v\xEC $x^{2}-${a * a}=(x-${a})(x+${a})$.` },
        { t: "R\xFAt g\u1ECDn ph\xE2n th\u1EE9c l\xE0 chia c\u1EA3 t\u1EED v\xE0 m\u1EABu cho nh\xE2n t\u1EED chung c\u1EE7a ch\xFAng", ok: true, why: "\u0111\xFAng theo quy t\u1EAFc r\xFAt g\u1ECDn." },
        { t: `$\\f{x+${a}}{x}=1+${a}$`, ok: false, why: `ch\u1EC9 \u0111\u01B0\u1EE3c r\xFAt g\u1ECDn **nh\xE2n t\u1EED chung**, kh\xF4ng \u0111\u01B0\u1EE3c r\xFAt t\u1EEBng h\u1EA1ng t\u1EED: \u0111\xFAng l\xE0 $1+\\f{${a}}{x}$.` },
        { t: "Mu\u1ED1n c\u1ED9ng hai ph\xE2n th\u1EE9c kh\xE1c m\u1EABu, ta quy \u0111\u1ED3ng m\u1EABu r\u1ED3i c\u1ED9ng c\xE1c t\u1EED", ok: true, why: "gi\u1ED1ng h\u1EC7t quy t\u1EAFc c\u1ED9ng ph\xE2n s\u1ED1." },
        { t: "Ph\xE2n th\u1EE9c \u0111\u1ED1i c\u1EE7a $\\f{A}{B}$ l\xE0 $\\f{B}{A}$", ok: false, why: "\u0111\xF3 l\xE0 ph\xE2n th\u1EE9c **ngh\u1ECBch \u0111\u1EA3o**; ph\xE2n th\u1EE9c \u0111\u1ED1i l\xE0 $-\\f{A}{B}=\\f{-A}{B}$." },
        { t: "M\u1ECDi \u0111a th\u1EE9c \u0111\u1EC1u l\xE0 m\u1ED9t ph\xE2n th\u1EE9c", ok: true, why: "\u0111a th\u1EE9c $A$ vi\u1EBFt \u0111\u01B0\u1EE3c th\xE0nh $\\f{A}{1}$." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh ph\u1EA3i x\xE9t **to\xE0n b\u1ED9 m\u1EABu**: ph\xE2n t\xEDch m\u1EABu th\xE0nh nh\xE2n t\u1EED r\u1ED3i cho t\u1EEBng nh\xE2n t\u1EED kh\xE1c $0$.",
          "Ch\u1EC9 \u0111\u01B0\u1EE3c r\xFAt g\u1ECDn **nh\xE2n t\u1EED chung** (nh\xE2n v\u1EDBi nhau), tuy\u1EC7t \u0111\u1ED1i kh\xF4ng r\xFAt t\u1EEBng h\u1EA1ng t\u1EED c\u1EE7a m\u1ED9t t\u1ED5ng."
        ],
        pitfall: "V\u1EDBi m\u1EABu $x^{2}-a^{2}$ ch\u1EC9 ghi m\u1ED9t \u0111i\u1EC1u ki\u1EC7n $x\\ne a$ m\xE0 qu\xEAn $x\\ne-a$."
      });
    }
  }
];

// src/bank/g9-nb.ts
var MC_CAN_THUC = [
  {
    q: "Bi\u1EC3u th\u1EE9c $\\s{2x-6}$ x\xE1c \u0111\u1ECBnh khi:",
    a: "$x\\ge3$",
    w: ["$x>3$", "$x\\le3$", "$x\\ne3$"],
    why: "C\u0103n b\u1EADc hai x\xE1c \u0111\u1ECBnh khi bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi d\u1EA5u c\u0103n **kh\xF4ng \xE2m**: $2x-6\\ge0$.",
    trap: "D\xF9ng d\u1EA5u $>$ thay v\xEC $\\ge$ \u2014 gi\xE1 tr\u1ECB l\xE0m bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n b\u1EB1ng $0$ v\u1EABn h\u1EE3p l\u1EC7."
  },
  {
    q: "Bi\u1EC3u th\u1EE9c $\\f{1}{\\s{x-2}}$ x\xE1c \u0111\u1ECBnh khi:",
    a: "$x>2$",
    w: ["$x\\ge2$", "$x\\ne2$", "$x<2$"],
    why: "V\u1EEBa c\u1EA7n $x-2\\ge0$ (\u0111\u1EC3 c\xF3 c\u0103n) v\u1EEBa c\u1EA7n m\u1EABu kh\xE1c $0$, n\xEAn $x-2>0$.",
    trap: "Khi c\u0103n n\u1EB1m \u1EDF **m\u1EABu**, \u0111i\u1EC1u ki\u1EC7n ch\u1EB7t h\u01A1n: ph\u1EA3i **l\u1EDBn h\u01A1n** $0$ ch\u1EE9 kh\xF4ng ph\u1EA3i $\\ge0$."
  },
  {
    q: "R\xFAt g\u1ECDn $\\s{(1-\\s{2})^{2}}$ \u0111\u01B0\u1EE3c:",
    a: "$\\s{2}-1$",
    w: ["$1-\\s{2}$", "$\\s{2}+1$", "$1$"],
    why: "$\\s{A^{2}}=|A|$; v\xEC $1-\\s{2}<0$ n\xEAn $|1-\\s{2}|=\\s{2}-1$.",
    trap: "B\u1ECF d\u1EA5u c\u0103n m\xE0 qu\xEAn d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i \u2014 ph\u1EA3i x\xE9t d\u1EA5u bi\u1EC3u th\u1EE9c b\xEAn trong."
  },
  {
    q: "K\u1EBFt qu\u1EA3 c\u1EE7a $\\s{12}+\\s{27}$ l\xE0:",
    a: "$5\\s{3}$",
    w: ["$\\s{39}$", "$6\\s{3}$", "$39$"],
    why: "$\\s{12}=2\\s{3}$ v\xE0 $\\s{27}=3\\s{3}$ n\xEAn t\u1ED5ng b\u1EB1ng $5\\s{3}$.",
    trap: "$\\s{a}+\\s{b}\\ne\\s{a+b}$ \u2014 ph\u1EA3i \u0111\u01B0a th\u1EEBa s\u1ED1 ra ngo\xE0i d\u1EA5u c\u0103n tr\u01B0\u1EDBc."
  },
  {
    q: "Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu c\u1EE7a $\\f{2}{\\s{5}}$ ta \u0111\u01B0\u1EE3c:",
    a: "$\\f{2\\s{5}}{5}$",
    w: ["$\\f{2}{5}$", "$2\\s{5}$", "$\\f{\\s{5}}{2}$"],
    why: "Nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi $\\s{5}$: $\\f{2\\s{5}}{5}$."
  },
  {
    q: "Kh\u1EB3ng \u0111\u1ECBnh n\xE0o sau \u0111\xE2y **\u0111\xFAng** v\u1EDBi m\u1ECDi s\u1ED1 th\u1EF1c $a$?",
    a: "$\\s{a^{2}}=|a|$",
    w: ["$\\s{a^{2}}=a$", "$\\s{a^{2}}=-a$", "$\\s{a^{2}}=a^{2}$"],
    why: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc lu\xF4n kh\xF4ng \xE2m n\xEAn k\u1EBFt qu\u1EA3 l\xE0 $|a|$."
  }
];
var MC_PT_HAM_9 = [
  {
    q: "Ph\u01B0\u01A1ng tr\xECnh $ax^{2}+bx+c=0$ ($a\\ne0$) c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t khi:",
    a: "$\\Delta>0$",
    w: ["$\\Delta=0$", "$\\Delta<0$", "$\\Delta\\ge0$"],
    why: "$\\Delta>0$ cho hai nghi\u1EC7m ph\xE2n bi\u1EC7t; $\\Delta=0$ cho nghi\u1EC7m k\xE9p; $\\Delta<0$ th\xEC v\xF4 nghi\u1EC7m."
  },
  {
    q: "Theo h\u1EC7 th\u1EE9c Vi\xE8te, v\u1EDBi $ax^{2}+bx+c=0$ c\xF3 hai nghi\u1EC7m $x_1$, $x_2$ th\xEC $x_1+x_2$ b\u1EB1ng:",
    a: "$-\\f{b}{a}$",
    w: ["$\\f{b}{a}$", "$\\f{c}{a}$", "$-\\f{c}{a}$"],
    why: "T\u1ED5ng hai nghi\u1EC7m $S=-\\f{b}{a}$, t\xEDch hai nghi\u1EC7m $P=\\f{c}{a}$.",
    trap: "Qu\xEAn d\u1EA5u tr\u1EEB \u1EDF c\xF4ng th\u1EE9c t\u1ED5ng l\xE0 l\u1ED7i sai ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a Vi\xE8te."
  },
  {
    q: "Ph\u01B0\u01A1ng tr\xECnh $x^{2}-5x+4=0$ c\xF3 hai nghi\u1EC7m l\xE0:",
    a: "$1$ v\xE0 $4$",
    w: ["$-1$ v\xE0 $-4$", "$2$ v\xE0 $3$", "$1$ v\xE0 $-4$"],
    why: "Nh\u1EA9m nghi\u1EC7m: $a+b+c=1-5+4=0$ n\xEAn $x_1=1$, $x_2=\\f{c}{a}=4$.",
    trap: "Nh\u1EA9m nghi\u1EC7m nhanh: $a+b+c=0\\Rightarrow x=1$; $a-b+c=0\\Rightarrow x=-1$."
  },
  {
    q: "\u0110\u1ED3 th\u1ECB h\xE0m s\u1ED1 $y=ax^{2}$ ($a\\ne0$) l\xE0:",
    a: "m\u1ED9t parabol c\xF3 \u0111\u1EC9nh t\u1EA1i g\u1ED1c to\u1EA1 \u0111\u1ED9",
    w: ["m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng", "m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n", "hai \u0111\u01B0\u1EDDng th\u1EB3ng c\u1EAFt nhau"],
    why: "Parabol nh\u1EADn tr\u1EE5c $Oy$ l\xE0m tr\u1EE5c \u0111\u1ED1i x\u1EE9ng, \u0111\u1EC9nh t\u1EA1i $O(0;0)$."
  },
  {
    q: "V\u1EDBi h\xE0m s\u1ED1 $y=ax^{2}$, n\u1EBFu $a<0$ th\xEC \u0111\u1ED3 th\u1ECB:",
    a: "n\u1EB1m ph\xEDa d\u01B0\u1EDBi tr\u1EE5c ho\xE0nh, $O$ l\xE0 \u0111i\u1EC3m cao nh\u1EA5t",
    w: ["n\u1EB1m ph\xEDa tr\xEAn tr\u1EE5c ho\xE0nh", "\u0111i qua \u0111i\u1EC3m $(0;a)$", "l\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng d\u1ED1c xu\u1ED1ng"],
    why: "Khi $a<0$ th\xEC $ax^{2}\\le0$ v\u1EDBi m\u1ECDi $x$, d\u1EA5u b\u1EB1ng ch\u1EC9 t\u1EA1i $x=0$."
  },
  {
    q: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n c\xF3 nghi\u1EC7m **duy nh\u1EA5t** khi hai \u0111\u01B0\u1EDDng th\u1EB3ng bi\u1EC3u di\u1EC5n ch\xFAng:",
    a: "c\u1EAFt nhau",
    w: ["song song", "tr\xF9ng nhau", "vu\xF4ng g\xF3c"],
    why: "C\u1EAFt nhau t\u1EA1i \u0111\xFAng m\u1ED9t \u0111i\u1EC3m n\xEAn h\u1EC7 c\xF3 \u0111\xFAng m\u1ED9t nghi\u1EC7m."
  }
];
var MC_HINH_9 = [
  {
    q: "Trong tam gi\xE1c vu\xF4ng, $\\sin$ c\u1EE7a m\u1ED9t g\xF3c nh\u1ECDn b\u1EB1ng:",
    a: "c\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh huy\u1EC1n",
    w: ["c\u1EA1nh k\u1EC1 chia c\u1EA1nh huy\u1EC1n", "c\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh k\u1EC1", "c\u1EA1nh huy\u1EC1n chia c\u1EA1nh \u0111\u1ED1i"],
    why: "Ghi nh\u1EDB: **Sin \u2013 \u0110\u1ED1i/Huy\u1EC1n, Cos \u2013 K\u1EC1/Huy\u1EC1n, Tan \u2013 \u0110\u1ED1i/K\u1EC1, Cot \u2013 K\u1EC1/\u0110\u1ED1i**."
  },
  {
    q: "G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n l\xE0:",
    a: "g\xF3c vu\xF4ng",
    w: ["g\xF3c nh\u1ECDn", "g\xF3c t\xF9", "g\xF3c b\u1EB9t"],
    why: "G\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng n\u1EEDa cung b\u1ECB ch\u1EAFn; n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n \u1EE9ng v\u1EDBi $180\\deg$ n\xEAn g\xF3c b\u1EB1ng $90\\deg$."
  },
  {
    q: "S\u1ED1 \u0111o g\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng:",
    a: "n\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn",
    w: ["s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", "hai l\u1EA7n s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", "n\u1EEDa s\u1ED1 \u0111o g\xF3c \u1EDF t\xE2m c\xF9ng ch\u1EAFn cung \u0111\xF3 nh\xE2n 2"],
    why: "G\xF3c \u1EDF t\xE2m b\u1EB1ng s\u1ED1 \u0111o cung; g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung \u0111\xF3 b\u1EB1ng **m\u1ED9t n\u1EEDa** g\xF3c \u1EDF t\xE2m."
  },
  {
    q: "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n c\xF3 t\xEDnh ch\u1EA5t:",
    a: "t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$",
    w: ["t\u1ED5ng hai g\xF3c k\u1EC1 b\u1EB1ng $180\\deg$", "b\u1ED1n g\xF3c b\u1EB1ng nhau", "hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau"],
    why: "\u0110\xE2y v\u1EEBa l\xE0 t\xEDnh ch\u1EA5t v\u1EEBa l\xE0 d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp.",
    trap: "Nh\u1EDB l\xE0 hai g\xF3c **\u0111\u1ED1i di\u1EC7n**, kh\xF4ng ph\u1EA3i hai g\xF3c k\u1EC1."
  },
  {
    q: "Ti\u1EBFp tuy\u1EBFn c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n t\u1EA1i m\u1ED9t \u0111i\u1EC3m th\xEC:",
    a: "vu\xF4ng g\xF3c v\u1EDBi b\xE1n k\xEDnh \u0111i qua ti\u1EBFp \u0111i\u1EC3m",
    w: ["song song v\u1EDBi b\xE1n k\xEDnh", "\u0111i qua t\xE2m", "b\u1EB1ng b\xE1n k\xEDnh"],
    why: "\u0110\xE2y l\xE0 t\xEDnh ch\u1EA5t c\u01A1 b\u1EA3n nh\u1EA5t c\u1EE7a ti\u1EBFp tuy\u1EBFn."
  },
  {
    q: "Di\u1EC7n t\xEDch xung quanh c\u1EE7a h\xECnh tr\u1EE5 b\xE1n k\xEDnh $r$, chi\u1EC1u cao $h$ l\xE0:",
    a: "$2\\pi rh$",
    w: ["$\\pi r^{2}h$", "$\\pi rh$", "$2\\pi r^{2}$"],
    why: "Tr\u1EA3i m\u1EB7t xung quanh ra \u0111\u01B0\u1EE3c h\xECnh ch\u1EEF nh\u1EADt k\xEDch th\u01B0\u1EDBc $2\\pi r$ v\xE0 $h$.",
    trap: "$\\pi r^{2}h$ l\xE0 **th\u1EC3 t\xEDch** h\xECnh tr\u1EE5, kh\xF4ng ph\u1EA3i di\u1EC7n t\xEDch xung quanh."
  },
  {
    q: "Th\u1EC3 t\xEDch h\xECnh c\u1EA7u b\xE1n k\xEDnh $R$ l\xE0:",
    a: "$\\f{4}{3}\\pi R^{3}$",
    w: ["$4\\pi R^{2}$", "$\\f{1}{3}\\pi R^{3}$", "$\\pi R^{3}$"],
    why: "$4\\pi R^{2}$ l\xE0 **di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u**, c\xF2n th\u1EC3 t\xEDch l\xE0 $\\f{4}{3}\\pi R^{3}$."
  },
  {
    q: "Trong tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n, h\u1EC7 th\u1EE9c n\xE0o **\u0111\xFAng**?",
    a: "$h^{2}=b'c'$",
    w: ["$h^{2}=bc$", "$h=b'+c'$", "$h^{2}=b^{2}+c^{2}$"],
    why: "\u0110\u01B0\u1EDDng cao b\xECnh ph\u01B0\u01A1ng b\u1EB1ng t\xEDch **hai h\xECnh chi\u1EBFu** c\u1EE7a hai c\u1EA1nh g\xF3c vu\xF4ng l\xEAn c\u1EA1nh huy\u1EC1n."
  }
];
var BANK_G9_NB = [
  {
    id: "g9.nb-can-thuc-mo-rong",
    topicId: "g9-t2",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "C\u0103n th\u1EE9c b\u1EADc hai \u2014 \u0111i\u1EC1u ki\u1EC7n v\xE0 bi\u1EBFn \u0111\u1ED5i",
    build: (r) => mcFrom(r, MC_CAN_THUC, {
      thinking: [
        "\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh: c\u0103n \u0111\u1EE9ng ri\xEAng th\xEC $\\ge0$; c\u0103n n\u1EB1m **\u1EDF m\u1EABu** th\xEC ph\u1EA3i $>0$.",
        "$\\s{A^{2}}=|A|$ \u2014 lu\xF4n x\xE9t d\u1EA5u $A$ tr\u01B0\u1EDBc khi b\u1ECF d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i."
      ]
    })
  },
  {
    id: "g9.nb-pt-ham-mo-rong",
    topicId: "g9-t3",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai, Vi\xE8te v\xE0 h\xE0m s\u1ED1 y = ax\xB2",
    build: (r) => mcFrom(r, MC_PT_HAM_9, {
      thinking: [
        "Ba m\u1ED1c c\u1EE7a $\\Delta$: $>0$ hai nghi\u1EC7m ph\xE2n bi\u1EC7t \xB7 $=0$ nghi\u1EC7m k\xE9p \xB7 $<0$ v\xF4 nghi\u1EC7m.",
        "Vi\xE8te: $S=-\\f{b}{a}$ (nh\u1EDB **d\u1EA5u tr\u1EEB**), $P=\\f{c}{a}$.",
        "Nh\u1EA9m nghi\u1EC7m: $a+b+c=0\\Rightarrow x_1=1,\\;x_2=\\f{c}{a}$; $a-b+c=0\\Rightarrow x_1=-1,\\;x_2=-\\f{c}{a}$."
      ]
    })
  },
  {
    id: "g9.nb-hinh-mo-rong",
    topicId: "g9-t6",
    grade: 9,
    level: "NB",
    kind: "MC",
    strand: "HINH_HOC",
    tag: "T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c, \u0111\u01B0\u1EDDng tr\xF2n v\xE0 h\xECnh kh\u1ED1i",
    build: (r) => mcFrom(r, MC_HINH_9, {
      thinking: [
        "G\xF3c n\u1ED9i ti\u1EBFp $=\\f{1}{2}$ cung b\u1ECB ch\u1EAFn \u2014 \u0111\xE2y l\xE0 ch\xECa kho\xE1 c\u1EE7a g\u1EA7n nh\u01B0 m\u1ECDi c\xE2u h\xECnh v\u1EC1 \u0111\u01B0\u1EDDng tr\xF2n.",
        "Ph\xE2n bi\u1EC7t r\xF5 **di\u1EC7n t\xEDch** v\xE0 **th\u1EC3 t\xEDch** c\u1EE7a h\xECnh tr\u1EE5, h\xECnh n\xF3n, h\xECnh c\u1EA7u; c\xF4ng th\u1EE9c ch\u1EC9 kh\xE1c nhau v\xE0i k\xFD t\u1EF1."
      ]
    })
  },
  {
    id: "g9.tf-can-thuc",
    topicId: "g9-t2",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 c\u0103n b\u1EADc hai v\xE0 bi\u1EBFn \u0111\u1ED5i c\u0103n th\u1EE9c",
    build: (r) => {
      const a = r.int(2, 9), b = r.pick([2, 3, 5, 6, 7]);
      const pool = [
        { t: `$\\s{${a * a}\\cdot${b}}=${a}\\s{${b}}$`, ok: true, why: `\u0111\u01B0a th\u1EEBa s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng $${a * a}$ ra ngo\xE0i d\u1EA5u c\u0103n.` },
        { t: `$\\s{${a * a}+${b}}=${a}+\\s{${b}}$`, ok: false, why: "c\u0103n c\u1EE7a m\u1ED9t **t\u1ED5ng** kh\xF4ng t\xE1ch \u0111\u01B0\u1EE3c th\xE0nh t\u1ED5ng c\xE1c c\u0103n." },
        { t: "$\\s{A}\\cdot\\s{B}=\\s{AB}$ v\u1EDBi $A\\ge0$, $B\\ge0$", ok: true, why: "quy t\u1EAFc nh\xE2n hai c\u0103n b\u1EADc hai." },
        { t: "$\\s{A^{2}}=A$ v\u1EDBi m\u1ECDi s\u1ED1 th\u1EF1c $A$", ok: false, why: "\u0111\xFAng ph\u1EA3i l\xE0 $\\s{A^{2}}=|A|$; n\u1EBFu $A<0$ th\xEC k\u1EBFt qu\u1EA3 l\xE0 $-A$." },
        { t: `$\\f{1}{\\s{${b}}}=\\f{\\s{${b}}}{${b}}$`, ok: true, why: "tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu b\u1EB1ng c\xE1ch nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi $\\s{" + b + "}$." },
        { t: `Bi\u1EC3u th\u1EE9c $\\s{-${a}}$ c\xF3 ngh\u0129a`, ok: false, why: "bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi d\u1EA5u c\u0103n b\u1EADc hai ph\u1EA3i kh\xF4ng \xE2m." },
        { t: `$\\s{${a}}$ l\xE0 s\u1ED1 v\xF4 t\u1EC9`, ok: Math.round(Math.sqrt(a)) ** 2 !== a, why: Math.round(Math.sqrt(a)) ** 2 !== a ? `$${a}$ kh\xF4ng ph\u1EA3i s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng n\xEAn $\\s{${a}}$ v\xF4 t\u1EC9.` : `$${a}$ l\xE0 s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng n\xEAn $\\s{${a}}=${Math.round(Math.sqrt(a))}$ l\xE0 s\u1ED1 h\u1EEFu t\u1EC9.` },
        { t: "Hai bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p c\u1EE7a $\\s{a}-\\s{b}$ l\xE0 $\\s{a}+\\s{b}$", ok: true, why: "nh\xE2n hai bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p cho $a-b$ \u2014 h\u1EBFt c\u0103n \u1EDF m\u1EABu." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "C\u0103n **t\xE1ch \u0111\u01B0\u1EE3c qua ph\xE9p nh\xE2n v\xE0 chia**, nh\u01B0ng **kh\xF4ng t\xE1ch \u0111\u01B0\u1EE3c qua ph\xE9p c\u1ED9ng v\xE0 tr\u1EEB**.",
          "Nh\u1EDB hai c\xF4ng c\u1EE5 tr\u1EE5c c\u0103n th\u1EE9c: nh\xE2n v\u1EDBi ch\xEDnh c\u0103n \u0111\xF3, ho\u1EB7c nh\xE2n v\u1EDBi **bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p**."
        ],
        pitfall: "Vi\u1EBFt $\\s{a+b}=\\s{a}+\\s{b}$ \u2014 sai ho\xE0n to\xE0n, th\u1EED v\u1EDBi $a=b=1$ l\xE0 th\u1EA5y ngay."
      });
    }
  },
  {
    id: "g9.tf-viete-2",
    topicId: "g9-t3",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "SO_DAI_SO",
    tag: "\u0110\xFAng/Sai \u2014 ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai v\xE0 h\u1EC7 th\u1EE9c Vi\xE8te",
    build: (r) => {
      const b = r.int(-9, 9), c = r.int(-12, 12);
      const D = b * b - 4 * c;
      const pool = [
        { t: `Ph\u01B0\u01A1ng tr\xECnh $x^{2}${b >= 0 ? "+" : ""}${b}x${c >= 0 ? "+" : ""}${c}=0$ c\xF3 $\\Delta=${D}$`, ok: true, why: `$\\Delta=b^{2}-4ac=${b * b}-${4 * c}=${D}$.` },
        { t: `Ph\u01B0\u01A1ng tr\xECnh $x^{2}${b >= 0 ? "+" : ""}${b}x${c >= 0 ? "+" : ""}${c}=0$ c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t`, ok: D > 0, why: D > 0 ? `$\\Delta=${D}>0$.` : D === 0 ? `$\\Delta=0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 **nghi\u1EC7m k\xE9p**.` : `$\\Delta=${D}<0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh **v\xF4 nghi\u1EC7m**.` },
        { t: "T\u1ED5ng hai nghi\u1EC7m c\u1EE7a $ax^{2}+bx+c=0$ b\u1EB1ng $\\f{b}{a}$", ok: false, why: "\u0111\xFAng ph\u1EA3i l\xE0 $-\\f{b}{a}$ \u2014 thi\u1EBFu d\u1EA5u tr\u1EEB." },
        { t: "T\xEDch hai nghi\u1EC7m c\u1EE7a $ax^{2}+bx+c=0$ b\u1EB1ng $\\f{c}{a}$", ok: true, why: "h\u1EC7 th\u1EE9c Vi\xE8te." },
        { t: "N\u1EBFu $a+b+c=0$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1ED9t nghi\u1EC7m b\u1EB1ng $1$", ok: true, why: "thay $x=1$ v\xE0o \u0111\u01B0\u1EE3c $a+b+c=0$ \u0111\xFAng." },
        { t: "N\u1EBFu $a-b+c=0$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1ED9t nghi\u1EC7m b\u1EB1ng $1$", ok: false, why: "khi $a-b+c=0$ th\xEC nghi\u1EC7m l\xE0 $x=-1$." },
        { t: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai c\xF3 t\xEDch hai nghi\u1EC7m \xE2m th\xEC hai nghi\u1EC7m tr\xE1i d\u1EA5u", ok: true, why: "$P<0$ ngh\u0129a l\xE0 $x_1x_2<0$, hai nghi\u1EC7m kh\xE1c d\u1EA5u." },
        { t: "Mu\u1ED1n d\xF9ng Vi\xE8te, kh\xF4ng c\u1EA7n ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n $\\Delta\\ge0$", ok: false, why: "ph\u1EA3i ch\u1EAFc ch\u1EAFn ph\u01B0\u01A1ng tr\xECnh **c\xF3 nghi\u1EC7m** th\xEC m\u1EDBi n\xF3i t\u1EDBi t\u1ED5ng v\xE0 t\xEDch hai nghi\u1EC7m." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Tr\xECnh t\u1EF1 chu\u1EA9n c\u1EE7a m\u1ECDi b\xE0i Vi\xE8te: t\xEDnh $\\Delta$ \u2192 kh\u1EB3ng \u0111\u1ECBnh c\xF3 nghi\u1EC7m \u2192 m\u1EDBi vi\u1EBFt $S$ v\xE0 $P$.",
          "Hai m\u1EB9o nh\u1EA9m nghi\u1EC7m: $a+b+c=0\\Rightarrow x=1$; $a-b+c=0\\Rightarrow x=-1$."
        ],
        pitfall: "D\xF9ng Vi\xE8te m\xE0 b\u1ECF qua b\u01B0\u1EDBc kh\u1EB3ng \u0111\u1ECBnh $\\Delta\\ge0$ \u2014 m\u1EA5t \u0111i\u1EC3m l\u1EADp lu\u1EADn d\xF9 k\u1EBFt qu\u1EA3 \u0111\xFAng."
      });
    }
  },
  {
    id: "g9.tf-duong-tron",
    topicId: "g9-t6",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 g\xF3c v\u1EDBi \u0111\u01B0\u1EDDng tr\xF2n v\xE0 t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
    build: (r) => {
      const pool = [
        { t: "G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n l\xE0 g\xF3c vu\xF4ng", ok: true, why: "cung b\u1ECB ch\u1EAFn b\u1EB1ng $180\\deg$ n\xEAn g\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng $90\\deg$." },
        { t: "Hai g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn m\u1ED9t cung th\xEC b\u1EB1ng nhau", ok: true, why: "c\xF9ng b\u1EB1ng n\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn." },
        { t: "G\xF3c \u1EDF t\xE2m b\u1EB1ng n\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", ok: false, why: "g\xF3c \u1EDF t\xE2m **b\u1EB1ng** s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn; g\xF3c **n\u1ED9i ti\u1EBFp** m\u1EDBi b\u1EB1ng n\u1EEDa." },
        { t: "T\u1EE9 gi\xE1c c\xF3 t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$ th\xEC n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng tr\xF2n", ok: true, why: "\u0111\xF3 l\xE0 d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp." },
        { t: "M\u1ECDi h\xECnh b\xECnh h\xE0nh \u0111\u1EC1u n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng tr\xF2n", ok: false, why: "ch\u1EC9 h\xECnh b\xECnh h\xE0nh c\xF3 hai g\xF3c \u0111\u1ED1i b\xF9 nhau, t\u1EE9c **h\xECnh ch\u1EEF nh\u1EADt**, m\u1EDBi n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EE3c." },
        { t: "M\u1ECDi h\xECnh ch\u1EEF nh\u1EADt \u0111\u1EC1u n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng tr\xF2n", ok: true, why: "b\u1ED1n g\xF3c vu\xF4ng n\xEAn t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$; t\xE2m l\xE0 giao hai \u0111\u01B0\u1EDDng ch\xE9o." },
        { t: "G\xF3c t\u1EA1o b\u1EDFi tia ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y cung b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung \u0111\xF3", ok: true, why: "c\u1EA3 hai \u0111\u1EC1u b\u1EB1ng n\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn." },
        { t: "Trong m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n, d\xE2y l\u1EDBn h\u01A1n th\xEC g\u1EA7n t\xE2m h\u01A1n", ok: true, why: "kho\u1EA3ng c\xE1ch t\u1EEB t\xE2m t\u1EDBi d\xE2y c\xE0ng nh\u1ECF th\xEC d\xE2y c\xE0ng d\xE0i." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Quy v\u1EC1 **cung b\u1ECB ch\u1EAFn**: g\xF3c \u1EDF t\xE2m $=$ cung; g\xF3c n\u1ED9i ti\u1EBFp v\xE0 g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y $=\\f{1}{2}$ cung.",
          "Mu\u1ED1n ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp: hai g\xF3c \u0111\u1ED1i b\xF9 nhau, ho\u1EB7c hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh d\u01B0\u1EDBi g\xF3c b\u1EB1ng nhau."
        ],
        pitfall: "L\u1EABn gi\u1EEFa g\xF3c \u1EDF t\xE2m (b\u1EB1ng cung) v\xE0 g\xF3c n\u1ED9i ti\u1EBFp (b\u1EB1ng n\u1EEDa cung) \u2014 sai m\u1ED9t b\u01B0\u1EDBc l\xE0 h\u1ECFng c\u1EA3 b\xE0i."
      });
    }
  },
  {
    id: "g9.tf-he-thuc-luong",
    topicId: "g9-t5",
    grade: 9,
    level: "TH",
    kind: "TF",
    strand: "HINH_HOC",
    tag: "\u0110\xFAng/Sai \u2014 h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng v\xE0 t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c",
    build: (r) => {
      const pool = [
        { t: "Trong tam gi\xE1c vu\xF4ng, $\\sin$ g\xF3c nh\u1ECDn b\u1EB1ng c\u1EA1nh \u0111\u1ED1i chia c\u1EA1nh huy\u1EC1n", ok: true, why: "\u0111\u1ECBnh ngh\u0129a t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c." },
        { t: "Trong tam gi\xE1c vu\xF4ng, $\\tan$ g\xF3c nh\u1ECDn b\u1EB1ng c\u1EA1nh k\u1EC1 chia c\u1EA1nh \u0111\u1ED1i", ok: false, why: "$\\tan$ l\xE0 **\u0111\u1ED1i chia k\u1EC1**; k\u1EC1 chia \u0111\u1ED1i l\xE0 $\\cot$." },
        { t: "$\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ v\u1EDBi m\u1ECDi g\xF3c nh\u1ECDn $\\alpha$", ok: true, why: "h\u1EC7 qu\u1EA3 tr\u1EF1c ti\u1EBFp c\u1EE7a \u0111\u1ECBnh l\xED Pythagore." },
        { t: "N\u1EBFu $\\alpha$ v\xE0 $\\beta$ ph\u1EE5 nhau th\xEC $\\sin\\alpha=\\cos\\beta$", ok: true, why: "hai g\xF3c ph\u1EE5 nhau \u0111\u1ED5i vai tr\xF2 c\u1EA1nh \u0111\u1ED1i v\xE0 c\u1EA1nh k\u1EC1 cho nhau." },
        { t: "V\u1EDBi g\xF3c nh\u1ECDn $\\alpha$ th\xEC $\\sin\\alpha>1$ l\xE0 \u0111i\u1EC1u c\xF3 th\u1EC3 x\u1EA3y ra", ok: false, why: "c\u1EA1nh \u0111\u1ED1i lu\xF4n nh\u1ECF h\u01A1n c\u1EA1nh huy\u1EC1n n\xEAn $0<\\sin\\alpha<1$." },
        { t: "Trong tam gi\xE1c vu\xF4ng, b\xECnh ph\u01B0\u01A1ng m\u1ED7i c\u1EA1nh g\xF3c vu\xF4ng b\u1EB1ng t\xEDch c\u1EA1nh huy\u1EC1n v\u1EDBi h\xECnh chi\u1EBFu c\u1EE7a n\xF3 l\xEAn c\u1EA1nh huy\u1EC1n", ok: true, why: "h\u1EC7 th\u1EE9c $b^{2}=ab'$, $c^{2}=ac'$." },
        { t: "\u0110\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n c\xF3 b\xECnh ph\u01B0\u01A1ng b\u1EB1ng t\xEDch hai c\u1EA1nh g\xF3c vu\xF4ng", ok: false, why: "\u0111\xFAng ph\u1EA3i l\xE0 t\xEDch **hai h\xECnh chi\u1EBFu**: $h^{2}=b'c'$." },
        { t: "Trong tam gi\xE1c vu\xF4ng, $\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$", ok: true, why: "h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 \u0111\u01B0\u1EDDng cao v\u1EDBi hai c\u1EA1nh g\xF3c vu\xF4ng." }
      ];
      return tfFrom(r, pool, {
        thinking: [
          "Ghi nh\u1EDB b\u1EB1ng c\xE2u: **Sin \u0110i H\u1ECDc** (\u0110\u1ED1i/Huy\u1EC1n) \xB7 **Cos Kh\xF4ng H\u01B0** (K\u1EC1/Huy\u1EC1n) \xB7 **Tan \u0110o\xE0n K\u1EBFt** (\u0110\u1ED1i/K\u1EC1) \xB7 **Cot K\u1EBFt \u0110o\xE0n** (K\u1EC1/\u0110\u1ED1i).",
          "B\u1ED1n h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng: $b^{2}=ab'$ \xB7 $c^{2}=ac'$ \xB7 $h^{2}=b'c'$ \xB7 $ah=bc$."
        ],
        pitfall: "Nh\u1EA7m $h^{2}=b'c'$ (t\xEDch hai **h\xECnh chi\u1EBFu**) th\xE0nh t\xEDch hai c\u1EA1nh g\xF3c vu\xF4ng."
      });
    }
  }
];

// src/bank/g6-decuong.ts
var BANK_G6_DECUONG = [
  {
    id: "g6.tong-luy-thua-chia-het",
    topicId: "g6-t1",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "Ch\u1EE9ng minh t\u1ED5ng l\u0169y th\u1EEBa chia h\u1EBFt",
    build: (r) => {
      const a = r.pick([2, 3, 5]);
      const k = r.pick([2, 3, 4]);
      const n = k * r.int(4, 9) - 1;
      let f = 0;
      for (let i = 0; i < k; i++) f += a ** i;
      return {
        stem: `Cho $A=1+${a}+${a}^{2}+${a}^{3}+\\dots+${a}^{${n}}$. Ch\u1EE9ng t\u1ECF r\u1EB1ng $A$ chia h\u1EBFt cho $${f}$. (Nh\u1EADp gi\xE1 tr\u1ECB c\u1EE7a th\u1EEBa s\u1ED1 chung thu \u0111\u01B0\u1EE3c sau khi nh\xF3m.)`,
        answer: String(f),
        thinking: [
          `T\u1ED5ng c\xF3 $${n + 1}$ s\u1ED1 h\u1EA1ng, chia h\u1EBFt cho $${k}$ \u2192 nh\xF3m **${k} s\u1ED1 h\u1EA1ng li\xEAn ti\u1EBFp** th\xE0nh m\u1ED9t nh\xF3m.`,
          `M\u1ED7i nh\xF3m \u0111\u1EC1u \u0111\u1EB7t \u0111\u01B0\u1EE3c th\u1EEBa s\u1ED1 chung, ph\u1EA7n trong ngo\u1EB7c lu\xF4n l\xE0 $1+${a}+\\dots+${a}^{${k - 1}}=${f}$.`
        ],
        solution: [
          `$A$ c\xF3 $${n + 1}$ s\u1ED1 h\u1EA1ng. V\xEC $${n + 1}$ chia h\u1EBFt cho $${k}$ n\xEAn ta nh\xF3m $${k}$ s\u1ED1 h\u1EA1ng li\xEAn ti\u1EBFp th\xE0nh m\u1ED9t nh\xF3m:`,
          `$A=(1+${a}+\\dots+${a}^{${k - 1}})+${a}^{${k}}(1+${a}+\\dots+${a}^{${k - 1}})+\\dots$`,
          `$A=(1+${a}+\\dots+${a}^{${k - 1}})\\cdot(1+${a}^{${k}}+${a}^{${2 * k}}+\\dots)$`,
          `M\xE0 $1+${a}+\\dots+${a}^{${k - 1}}=${f}$, n\xEAn $A$ chia h\u1EBFt cho $${f}$.`
        ],
        pitfall: "Ph\u1EA3i ki\u1EC3m tra s\u1ED1 s\u1ED1 h\u1EA1ng chia h\u1EBFt cho s\u1ED1 ph\u1EA7n t\u1EED m\u1ED7i nh\xF3m th\xEC m\u1EDBi nh\xF3m \u0111\u01B0\u1EE3c tr\u1ECDn v\u1EB9n."
      };
    }
  },
  {
    id: "g6.chu-so-tan-cung",
    topicId: "g6-t1",
    grade: 6,
    level: "VDC",
    kind: "MC",
    strand: "SO_DAI_SO",
    tag: "T\xECm ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a l\u0169y th\u1EEBa",
    build: (r) => {
      const a = r.pick([2, 3, 7, 8]);
      const n = r.int(15, 120);
      const cyc = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6] };
      const last = cyc[a][(n - 1) % 4];
      const others = cyc[a].filter((x) => x !== last).map(String);
      const [options, answer] = mcOptions(r, String(last), others);
      return {
        stem: `Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a $${a}^{${n}}$ l\xE0:`,
        options,
        answer,
        thinking: [
          `Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a l\u0169y th\u1EEBa c\u01A1 s\u1ED1 $${a}$ l\u1EB7p l\u1EA1i theo chu k\u1EF3 4: $${cyc[a].join("; ")}$.`,
          `L\u1EA5y s\u1ED1 m\u0169 chia cho 4 \u0111\u1EC3 bi\u1EBFt v\u1ECB tr\xED trong chu k\u1EF3.`
        ],
        solution: [
          `Chu k\u1EF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a $${a}^{n}$ l\xE0 $${cyc[a].join("; ")}$ (l\u1EB7p l\u1EA1i sau m\u1ED7i 4 b\u01B0\u1EDBc).`,
          `$${n}=4\\cdot${Math.floor((n - 1) / 4)}+${(n - 1) % 4 + 1}$, t\u1EE9c $${n}$ \u1EE9ng v\u1EDBi v\u1ECB tr\xED th\u1EE9 $${(n - 1) % 4 + 1}$ trong chu k\u1EF3.`,
          `V\u1EADy ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 $${last}$.`
        ],
        pitfall: "Chia s\u1ED1 m\u0169 cho 4 l\u1EA5y **s\u1ED1 d\u01B0**; d\u01B0 0 th\xEC \u1EE9ng v\u1EDBi v\u1ECB tr\xED cu\u1ED1i c\xF9ng c\u1EE7a chu k\u1EF3."
      };
    }
  },
  {
    id: "g6.ucln-bcnn-nguoc",
    topicId: "g6-t2",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm hai s\u1ED1 bi\u1EBFt \u01AFCLN v\xE0 BCNN",
    build: (r) => {
      const d = r.pick([3, 4, 5, 6, 8]);
      const pairs = [[1, 5], [1, 7], [2, 3], [3, 4], [1, 11], [2, 5], [3, 5]];
      const [m, n] = r.pick(pairs);
      const a = d * m, b = d * n;
      const L = lcm(a, b);
      return {
        stem: `T\xECm hai s\u1ED1 t\u1EF1 nhi\xEAn $a$, $b$ (v\u1EDBi $a<b$) bi\u1EBFt \u01AFCLN$(a;b)=${d}$ v\xE0 BCNN$(a;b)=${L}$. (Nh\u1EADp theo d\u1EA1ng a,b.)`,
        answer: `${a},${b}`,
        thinking: [
          `\u0110\u1EB7t $a=${d}m$, $b=${d}n$ v\u1EDBi $m$, $n$ nguy\xEAn t\u1ED1 c\xF9ng nhau v\xE0 $m<n$.`,
          `Khi \u0111\xF3 BCNN$(a;b)=${d}mn$, t\u1EEB \u0111\xF3 t\xECm \u0111\u01B0\u1EE3c $mn$.`
        ],
        solution: [
          `V\xEC \u01AFCLN$(a;b)=${d}$ n\xEAn \u0111\u1EB7t $a=${d}m$, $b=${d}n$ v\u1EDBi \u01AFCLN$(m;n)=1$ v\xE0 $m<n$.`,
          `BCNN$(a;b)=${d}mn=${L}\\Rightarrow mn=${L / d}$.`,
          `C\u1EB7p $(m;n)$ nguy\xEAn t\u1ED1 c\xF9ng nhau, $m<n$, t\xEDch b\u1EB1ng $${L / d}$: ch\u1ECDn $(m;n)=(${m};${n})$.`,
          `V\u1EADy $a=${d}\\cdot${m}=${a}$ v\xE0 $b=${d}\\cdot${n}=${b}$.`,
          `Ki\u1EC3m tra: \u01AFCLN$(${a};${b})=${gcd(a, b)}$ \u2713 v\xE0 BCNN$(${a};${b})=${L}$ \u2713`
        ],
        pitfall: "\u0110i\u1EC1u ki\u1EC7n $m$, $n$ **nguy\xEAn t\u1ED1 c\xF9ng nhau** l\xE0 b\u1EAFt bu\u1ED9c \u2014 b\u1ECF qua s\u1EBD ra nghi\u1EC7m sai."
      };
    }
  },
  {
    id: "g6.bcnn-thieu",
    topicId: "g6-t2",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "B\xE0i to\xE1n BCNN d\u1EA1ng \u201C\u0111\u1EC1u thi\u1EBFu\u201D",
    build: (r) => {
      const trio = r.pick([[4, 5, 6], [4, 6, 7], [5, 6, 8], [4, 5, 7], [6, 8, 9]]);
      const L = trio.reduce((x, y) => lcm(x, y));
      const t = r.int(1, Math.min(3, trio[0] - 1));
      const k = r.int(2, 4);
      const n = L * k - t;
      const lo = n - Math.floor(L / 3), hi = n + Math.floor(L / 3);
      return {
        stem: `S\u1ED1 h\u1ECDc sinh c\u1EE7a m\u1ED9t tr\u01B0\u1EDDng khi x\u1EBFp h\xE0ng $${trio[0]}$, h\xE0ng $${trio[1]}$, h\xE0ng $${trio[2]}$ th\xEC **\u0111\u1EC1u thi\u1EBFu $${t}$ em** m\u1EDBi \u0111\u1EE7 h\xE0ng. Bi\u1EBFt s\u1ED1 h\u1ECDc sinh trong kho\u1EA3ng t\u1EEB $${lo}$ \u0111\u1EBFn $${hi}$. T\xEDnh s\u1ED1 h\u1ECDc sinh c\u1EE7a tr\u01B0\u1EDDng.`,
        answer: String(n),
        thinking: [
          `\u201CThi\u1EBFu $${t}$ em\u201D ngh\u0129a l\xE0 n\u1EBFu **th\xEAm** $${t}$ em n\u1EEFa th\xEC x\u1EBFp v\u1EEBa \u0111\u1EE7 m\u1ECDi h\xE0ng.`,
          `V\u1EADy $n+${t}$ chia h\u1EBFt cho c\u1EA3 ba s\u1ED1 \u2014 \u0111\xE2y l\xE0 b\xE0i to\xE1n BCNN, kh\xE1c v\u1EDBi d\u1EA1ng \u201C\u0111\u1EC1u th\u1EEBa\u201D (l\u1EA5y $n-r$).`
        ],
        solution: [
          `G\u1ECDi $n$ l\xE0 s\u1ED1 h\u1ECDc sinh ($n\\in\\Nstar$, $${lo}\\le n\\le${hi}$).`,
          `Theo \u0111\u1EC1, $(n+${t})$ chia h\u1EBFt cho $${trio.join("$, $")}$, n\xEAn $n+${t}\\in$ BC$(${trio.join(";")})$.`,
          `BCNN$(${trio.join(";")})=${L}$, do \u0111\xF3 $n+${t}\\in\\{${L};${2 * L};${3 * L};${4 * L};\\dots\\}$.`,
          `Suy ra $n\\in\\{${L - t};${2 * L - t};${3 * L - t};${4 * L - t};\\dots\\}$.`,
          `\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $${lo}\\le n\\le${hi}$ ta \u0111\u01B0\u1EE3c $n=${n}$.`,
          `V\u1EADy tr\u01B0\u1EDDng \u0111\xF3 c\xF3 **${n} h\u1ECDc sinh**.`
        ],
        pitfall: "D\u1EA1ng \u201C\u0111\u1EC1u th\u1EEBa $r$\u201D th\xEC x\xE9t $n-r$; d\u1EA1ng \u201C\u0111\u1EC1u thi\u1EBFu $t$\u201D th\xEC x\xE9t $n+t$ \u2014 nh\u1EA7m d\u1EA5u l\xE0 sai ho\xE0n to\xE0n."
      };
    }
  },
  {
    id: "g6.tim-x-day-so",
    topicId: "g6-t3",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm x trong t\u1ED5ng d\xE3y s\u1ED1",
    build: (r) => {
      const d = 2;
      const first = r.pick([1, 3, 5]);
      const cnt = r.int(20, 50);
      const last = first + (cnt - 1) * d;
      const S = (first + last) * cnt / 2;
      const x = -S / cnt;
      if (!Number.isInteger(x)) {
        return {
          stem: "T\xECm s\u1ED1 nguy\xEAn $x$, bi\u1EBFt $(x+1)+(x+3)+(x+5)+\\dots+(x+99)=0$.",
          answer: "-50",
          thinking: ["\u0110\u1EBFm s\u1ED1 s\u1ED1 h\u1EA1ng, t\xE1ch ph\u1EA7n ch\u1EE9a $x$ v\xE0 ph\u1EA7n h\u1EB1ng s\u1ED1."],
          solution: [
            "C\xE1c h\u1EB1ng s\u1ED1 $1;3;5;\\dots;99$ l\xE0 d\xE3y c\xE1ch \u0111\u1EC1u 2, c\xF3 $(99-1):2+1=50$ s\u1ED1 h\u1EA1ng.",
            "V\u1EADy v\u1EBF tr\xE1i $=50x+(1+3+\\dots+99)=50x+\\f{(1+99)\\cdot50}{2}=50x+2500$.",
            "$50x+2500=0\\Rightarrow x=-50$."
          ]
        };
      }
      return {
        stem: `T\xECm s\u1ED1 nguy\xEAn $x$, bi\u1EBFt $(x+${first})+(x+${first + d})+(x+${first + 2 * d})+\\dots+(x+${last})=0$.`,
        answer: String(x),
        thinking: [
          "T\xE1ch v\u1EBF tr\xE1i th\xE0nh: (s\u1ED1 s\u1ED1 h\u1EA1ng) $\\times x$ + (t\u1ED5ng c\xE1c h\u1EB1ng s\u1ED1).",
          "\u0110\u1EBFm s\u1ED1 s\u1ED1 h\u1EA1ng c\u1EE7a d\xE3y c\xE1ch \u0111\u1EC1u r\u1ED3i t\xEDnh t\u1ED5ng b\u1EB1ng c\xF4ng th\u1EE9c \u0111\u1EA7u \u2013 cu\u1ED1i."
        ],
        solution: [
          `C\xE1c h\u1EB1ng s\u1ED1 $${first};${first + d};\\dots;${last}$ l\xE0 d\xE3y c\xE1ch \u0111\u1EC1u $${d}$, c\xF3 $(${last}-${first}):${d}+1=${cnt}$ s\u1ED1 h\u1EA1ng.`,
          `T\u1ED5ng c\xE1c h\u1EB1ng s\u1ED1: $\\f{(${first}+${last})\\cdot${cnt}}{2}=${S}$.`,
          `V\u1EBF tr\xE1i $=${cnt}x+${S}=0\\Rightarrow ${cnt}x=${-S}\\Rightarrow x=${x}$.`
        ],
        pitfall: "\u0110\u1EBFm sai s\u1ED1 s\u1ED1 h\u1EA1ng l\xE0 l\u1ED7i ph\u1ED5 bi\u1EBFn \u2014 nh\u1EDB c\xF4ng th\u1EE9c $(\\text{cu\u1ED1i}-\\text{\u0111\u1EA7u}):d+1$."
      };
    }
  },
  {
    id: "g6.tich-hai-thua-so",
    topicId: "g6-t3",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm c\u1EB7p s\u1ED1 t\u1EF1 nhi\xEAn t\u1EEB t\xEDch cho tr\u01B0\u1EDBc",
    build: (r) => {
      const k = r.pick([12, 18, 20, 24, 30]);
      const c = r.int(1, 4);
      const odd = [];
      for (let i = 1; i <= k; i++) if (k % i === 0 && i % 2 === 1) odd.push(i);
      const sols = odd.map((o) => ({ x: (o - 1) / 2, y: k / o + c })).filter((s) => Number.isInteger(s.x) && s.y > c);
      return {
        stem: `T\xECm s\u1ED1 c\u1EB7p s\u1ED1 t\u1EF1 nhi\xEAn $(x;y)$ tho\u1EA3 m\xE3n $(2x+1)(y-${c})=${k}$.`,
        answer: String(sols.length),
        thinking: [
          "$2x+1$ lu\xF4n l\xE0 s\u1ED1 **l\u1EBB** \u2014 \u0111\xE2y l\xE0 ch\xECa kho\xE1 thu h\u1EB9p s\u1ED1 tr\u01B0\u1EDDng h\u1EE3p.",
          `V\u1EADy $2x+1$ ph\u1EA3i l\xE0 **\u01B0\u1EDBc l\u1EBB** c\u1EE7a $${k}$.`
        ],
        solution: [
          `V\xEC $x\\in\\N$ n\xEAn $2x+1$ l\xE0 s\u1ED1 l\u1EBB v\xE0 $2x+1\\ge1$.`,
          `Do \u0111\xF3 $2x+1$ l\xE0 \u01B0\u1EDBc l\u1EBB c\u1EE7a $${k}$: \u01AF l\u1EBB$(${k})=\\{${odd.join(";")}\\}$.`,
          ...sols.map((s) => `V\u1EDBi $2x+1=${2 * s.x + 1}$: $x=${s.x}$ v\xE0 $y-${c}=${k / (2 * s.x + 1)}$ n\xEAn $y=${s.y}$.`),
          `V\u1EADy c\xF3 $${sols.length}$ c\u1EB7p $(x;y)$: $${sols.map((s) => `(${s.x};${s.y})`).join("$, $")}$.`
        ],
        pitfall: "Kh\xF4ng l\u1ECDc theo t\xEDnh l\u1EBB c\u1EE7a $2x+1$ s\u1EBD x\xE9t th\u1EEBa r\u1EA5t nhi\u1EC1u tr\u01B0\u1EDDng h\u1EE3p v\xE0 d\u1EC5 s\xF3t."
      };
    }
  },
  {
    id: "g6.n-chia-het",
    topicId: "g6-t3",
    grade: 6,
    level: "VDC",
    kind: "SHORT",
    strand: "SO_DAI_SO",
    tag: "T\xECm n \u0111\u1EC3 bi\u1EC3u th\u1EE9c chia h\u1EBFt",
    build: (r) => {
      const c = r.int(1, 6);
      const k = r.int(5, 20);
      const divs = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) divs.push(i);
      const ns = divs.map((d) => d - c).filter((n) => n >= 0);
      return {
        stem: `T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $n$ \u0111\u1EC3 $(n+${c + k})$ chia h\u1EBFt cho $(n+${c})$. (Nh\u1EADp c\xE1c gi\xE1 tr\u1ECB c\xE1ch nhau b\u1EDFi d\u1EA5u ph\u1EA9y; n\u1EBFu kh\xF4ng c\xF3 th\xEC nh\u1EADp 0 gi\xE1 tr\u1ECB.)`,
        answer: ns.length ? ns.sort((a, b) => a - b).join(",") : "khong co",
        accept: ns.length ? [ns.slice().reverse().join(",")] : ["kh\xF4ng c\xF3", "0"],
        thinking: [
          "T\xE1ch t\u1EED theo m\u1EABu: vi\u1EBFt $n+" + (c + k) + " = (n+" + c + ") + " + k + "$.",
          `Khi \u0111\xF3 \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt quy v\u1EC1: $(n+${c})$ l\xE0 **\u01B0\u1EDBc** c\u1EE7a $${k}$.`
        ],
        solution: [
          `$n+${c + k}=(n+${c})+${k}$.`,
          `V\xEC $(n+${c})$ chia h\u1EBFt cho ch\xEDnh n\xF3 n\xEAn $(n+${c + k});\\vdots;(n+${c})\\Leftrightarrow ${k};\\vdots;(n+${c})$.`,
          `Do \u0111\xF3 $(n+${c})\\in$ \u01AF$(${k})=\\{${divs.join(";")}\\}$.`,
          ns.length ? `V\u1EDBi $n\\in\\N$ n\xEAn $n+${c}\\ge${c}$, ta \u0111\u01B0\u1EE3c $n\\in\\{${ns.sort((a, b) => a - b).join(";")}\\}$.` : `Kh\xF4ng c\xF3 gi\xE1 tr\u1ECB $n\\in\\N$ n\xE0o tho\u1EA3 m\xE3n.`
        ],
        remark: "K\u1EF9 thu\u1EADt \u201Ct\xE1ch t\u1EED theo m\u1EABu\u201D d\xF9ng l\u1EA1i r\u1EA5t nhi\u1EC1u \u1EDF l\u1EDBp 8, l\u1EDBp 9 khi r\xFAt g\u1ECDn ph\xE2n th\u1EE9c."
      };
    }
  },
  {
    id: "g6.chung-minh-chia-het-tohop",
    topicId: "g6-t2",
    grade: 6,
    level: "VDC",
    kind: "ESSAY",
    strand: "SO_DAI_SO",
    tag: "T\u1EF1 lu\u1EADn \u2014 ch\u1EE9ng minh chia h\u1EBFt b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh",
    build: (r) => {
      const m = r.pick([17, 13, 19, 23]);
      const p = r.int(2, 6);
      let K = 1;
      while ((K * p + 1) % m !== 0 && K < m) K++;
      const ok = (K * p + 1) % m === 0;
      if (!ok) {
        return {
          stem: "Cho $a-5b$ chia h\u1EBFt cho $17$ ($a,b\\in\\N$). Ch\u1EE9ng t\u1ECF r\u1EB1ng $10a+b$ c\u0169ng chia h\u1EBFt cho $17$.",
          answer: "",
          rubric: [
            { criterion: "Nh\u1EADn ra c\u1EA7n t\u1EA1o t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh c\u1EE7a $a-5b$", points: 1 },
            { criterion: "Vi\u1EBFt \u0111\xFAng $10a+b=10(a-5b)+51b$", points: 1.5 },
            { criterion: "Ch\u1EC9 ra $51b$ chia h\u1EBFt cho 17", points: 1 },
            { criterion: "K\u1EBFt lu\u1EADn \u0111\u1EA7y \u0111\u1EE7", points: 0.5 }
          ],
          thinking: [
            "Mu\u1ED1n ch\u1EE9ng minh $10a+b$ chia h\u1EBFt cho 17, ta t\xECm c\xE1ch vi\u1EBFt n\xF3 th\xE0nh **t\u1ED5ng c\u1EE7a b\u1ED9i c\u1EE7a $(a-5b)$ v\xE0 m\u1ED9t b\u1ED9i c\u1EE7a 17**.",
            "Nh\xE2n $(a-5b)$ v\u1EDBi 10 \u0111\u1EC3 h\u1EC7 s\u1ED1 c\u1EE7a $a$ kh\u1EDBp: $10(a-5b)=10a-50b$. Ph\u1EA7n c\xF2n thi\u1EBFu l\xE0 $b-(-50b)=51b$."
          ],
          solution: [
            "Ta c\xF3 $10a+b=10a-50b+51b=10(a-5b)+51b$.",
            "Theo gi\u1EA3 thi\u1EBFt $(a-5b);\\vdots;17$ n\xEAn $10(a-5b);\\vdots;17$.",
            "M\u1EB7t kh\xE1c $51=17\\cdot3$ n\xEAn $51b;\\vdots;17$.",
            "T\u1ED5ng c\u1EE7a hai s\u1ED1 c\xF9ng chia h\u1EBFt cho 17 th\xEC chia h\u1EBFt cho 17.",
            "V\u1EADy $(10a+b);\\vdots;17$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
          ]
        };
      }
      const rest = K * p + 1;
      return {
        stem: `Cho $a-${p}b$ chia h\u1EBFt cho $${m}$ (v\u1EDBi $a$, $b$ l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn). Ch\u1EE9ng t\u1ECF r\u1EB1ng $${K}a+b$ c\u0169ng chia h\u1EBFt cho $${m}$.`,
        answer: "",
        rubric: [
          { criterion: "Nh\u1EADn ra c\u1EA7n t\u1EA1o t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh c\u1EE7a $a-" + p + "b$", points: 1 },
          { criterion: `Vi\u1EBFt \u0111\xFAng $${K}a+b=${K}(a-${p}b)+${rest}b$`, points: 1.5 },
          { criterion: `Ch\u1EC9 ra $${rest}b$ chia h\u1EBFt cho $${m}$`, points: 1 },
          { criterion: "K\u1EBFt lu\u1EADn \u0111\u1EA7y \u0111\u1EE7", points: 0.5 }
        ],
        thinking: [
          `Mu\u1ED1n ch\u1EE9ng minh $${K}a+b$ chia h\u1EBFt cho $${m}$, h\xE3y vi\u1EBFt n\xF3 th\xE0nh **b\u1ED9i c\u1EE7a $(a-${p}b)$ c\u1ED9ng m\u1ED9t b\u1ED9i c\u1EE7a $${m}$**.`,
          `Nh\xE2n $(a-${p}b)$ v\u1EDBi $${K}$ \u0111\u1EC3 h\u1EC7 s\u1ED1 c\u1EE7a $a$ kh\u1EDBp, r\u1ED3i b\xF9 ph\u1EA7n thi\u1EBFu \u1EDF h\u1EA1ng t\u1EED ch\u1EE9a $b$.`
        ],
        solution: [
          `$${K}a+b=${K}a-${K * p}b+${rest}b=${K}(a-${p}b)+${rest}b$.`,
          `Theo gi\u1EA3 thi\u1EBFt $(a-${p}b);\\vdots;${m}$ n\xEAn $${K}(a-${p}b);\\vdots;${m}$.`,
          `M\u1EB7t kh\xE1c $${rest}=${m}\\cdot${rest / m}$ n\xEAn $${rest}b;\\vdots;${m}$.`,
          `T\u1ED5ng c\u1EE7a hai s\u1ED1 c\xF9ng chia h\u1EBFt cho $${m}$ th\xEC chia h\u1EBFt cho $${m}$.`,
          `V\u1EADy $(${K}a+b);\\vdots;${m}$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)`
        ]
      };
    }
  },
  {
    id: "g6.hinh-thoi-trong-hcn",
    topicId: "g6-t6",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "H\xECnh thoi n\u1ED1i trung \u0111i\u1EC3m h\xECnh ch\u1EEF nh\u1EADt",
    build: (r) => {
      const a = r.int(10, 40) * 2, b = r.int(8, 30) * 2;
      const S = a * b / 2;
      return {
        stem: `M\u1EA3nh v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt $MNPQ$ c\xF3 $MN=${a}\\,m$, $MQ=${b}\\,m$. G\u1ECDi $A$, $B$, $C$, $D$ l\u1EA7n l\u01B0\u1EE3t l\xE0 trung \u0111i\u1EC3m c\u1EE7a $MQ$, $MN$, $NP$, $PQ$. Ph\u1EA7n b\xEAn trong h\xECnh thoi $ABCD$ d\xF9ng \u0111\u1EC3 tr\u1ED3ng rau. T\xEDnh di\u1EC7n t\xEDch ph\u1EA7n tr\u1ED3ng rau (\u0111\u01A1n v\u1ECB: m\xB2).`,
        answer: String(S),
        thinking: [
          "Hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EE7a h\xECnh thoi $ABCD$ ch\xEDnh l\xE0 hai \u0111o\u1EA1n n\u1ED1i trung \u0111i\u1EC3m hai c\u1EB7p c\u1EA1nh \u0111\u1ED1i c\u1EE7a h\xECnh ch\u1EEF nh\u1EADt.",
          `Do \u0111\xF3 $AC=MN=${a}\\,m$ v\xE0 $BD=MQ=${b}\\,m$.`
        ],
        solution: [
          `\u0110\u01B0\u1EDDng ch\xE9o $AC$ n\u1ED1i trung \u0111i\u1EC3m hai c\u1EA1nh $MQ$ v\xE0 $NP$ n\xEAn $AC=MN=${a}\\ (m)$.`,
          `\u0110\u01B0\u1EDDng ch\xE9o $BD$ n\u1ED1i trung \u0111i\u1EC3m hai c\u1EA1nh $MN$ v\xE0 $PQ$ n\xEAn $BD=MQ=${b}\\ (m)$.`,
          `$S_{ABCD}=\\f{1}{2}\\cdot AC\\cdot BD=\\f{1}{2}\\cdot${a}\\cdot${b}=${S}\\ (m^{2})$.`,
          `Nh\u1EADn x\xE9t: di\u1EC7n t\xEDch h\xECnh thoi lu\xF4n b\u1EB1ng **m\u1ED9t n\u1EEDa** di\u1EC7n t\xEDch h\xECnh ch\u1EEF nh\u1EADt ban \u0111\u1EA7u ($${a * b}:2=${S}$).`
        ],
        remark: "K\u1EBFt qu\u1EA3 \u201Cm\u1ED9t n\u1EEDa\u201D \u0111\xFAng v\u1EDBi m\u1ECDi h\xECnh ch\u1EEF nh\u1EADt \u2014 nh\u1EDB \u0111\u1EC3 ki\u1EC3m tra nhanh k\u1EBFt qu\u1EA3."
      };
    }
  },
  {
    id: "g6.chi-phi-thuc-te",
    topicId: "g6-t6",
    grade: 6,
    level: "VD",
    kind: "SHORT",
    strand: "HINH_HOC",
    tag: "B\xE0i to\xE1n chi ph\xED theo di\u1EC7n t\xEDch",
    build: (r) => {
      const a = r.int(8, 25), b = r.int(6, 20);
      const w = r.int(1, 3);
      const price = r.pick([6e4, 85e3, 12e4, 17e4]);
      const Sv = a * b;
      const Sl = w * b;
      const Sr = Sv - Sl;
      const cost = Sr * price;
      return {
        stem: `M\u1EA3nh v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $${a}\\,m$, chi\u1EC1u r\u1ED9ng $${b}\\,m$. Ng\u01B0\u1EDDi ta d\xE0nh m\u1ED9t l\u1ED1i \u0111i h\xECnh ch\u1EEF nh\u1EADt r\u1ED9ng $${w}\\,m$ ch\u1EA1y su\u1ED1t chi\u1EC1u r\u1ED9ng m\u1EA3nh v\u01B0\u1EDDn. Ph\u1EA7n c\xF2n l\u1EA1i tr\u1EA3i th\u1EA3m c\u1ECF v\u1EDBi gi\xE1 $${price.toLocaleString("vi-VN")}$ \u0111\u1ED3ng/m\xB2. T\xEDnh s\u1ED1 ti\u1EC1n ph\u1EA3i tr\u1EA3 \u0111\u1EC3 tr\u1EA3i th\u1EA3m c\u1ECF (\u0111\u01A1n v\u1ECB: \u0111\u1ED3ng).`,
        answer: String(cost),
        thinking: [
          "B\xE0i to\xE1n ba b\u01B0\u1EDBc: di\u1EC7n t\xEDch c\u1EA3 v\u01B0\u1EDDn \u2192 di\u1EC7n t\xEDch l\u1ED1i \u0111i \u2192 di\u1EC7n t\xEDch c\xF2n l\u1EA1i \u2192 nh\xE2n \u0111\u01A1n gi\xE1.",
          "L\u1ED1i \u0111i ch\u1EA1y su\u1ED1t chi\u1EC1u r\u1ED9ng n\xEAn di\u1EC7n t\xEDch l\u1ED1i \u0111i = b\u1EC1 r\u1ED9ng l\u1ED1i \u0111i \xD7 chi\u1EC1u r\u1ED9ng v\u01B0\u1EDDn."
        ],
        solution: [
          `Di\u1EC7n t\xEDch m\u1EA3nh v\u01B0\u1EDDn: $${a}\\cdot${b}=${Sv}\\ (m^{2})$.`,
          `Di\u1EC7n t\xEDch l\u1ED1i \u0111i: $${w}\\cdot${b}=${Sl}\\ (m^{2})$.`,
          `Di\u1EC7n t\xEDch tr\u1EA3i th\u1EA3m c\u1ECF: $${Sv}-${Sl}=${Sr}\\ (m^{2})$.`,
          `S\u1ED1 ti\u1EC1n ph\u1EA3i tr\u1EA3: $${Sr}\\cdot${price.toLocaleString("vi-VN")}=${cost.toLocaleString("vi-VN")}$ (\u0111\u1ED3ng).`
        ],
        pitfall: "\u0110\u1ECDc k\u1EF9 l\u1ED1i \u0111i ch\u1EA1y theo chi\u1EC1u n\xE0o \u2014 nh\u1EA7m chi\u1EC1u l\xE0 sai di\u1EC7n t\xEDch l\u1ED1i \u0111i."
      };
    }
  }
];

// src/bank/index.ts
var ALL_TEMPLATES = [
  ...BANK_G6,
  ...BANK_G6_PLUS,
  ...BANK_G6_GITA,
  ...BANK_G6_DECUONG,
  ...BANK_G6_NB,
  ...BANK_G7,
  ...BANK_G7_PLUS,
  ...BANK_G7_DECUONG,
  ...BANK_G7_HINH,
  ...BANK_G7_NB,
  ...BANK_G8,
  ...BANK_G8_PLUS,
  ...BANK_G8_DECUONG,
  ...BANK_G8_HINH,
  ...BANK_G8_NB,
  ...BANK_G9,
  ...BANK_G9_PLUS,
  ...BANK_G9_HINH,
  ...BANK_G9_DECUONG,
  ...BANK_G9_NB
];
var DEFAULT_POINTS = { MC: 1, TF: 2, SHORT: 1.5, ESSAY: 4 };
function buildQuestion(tpl, seed, index) {
  const r = makeRng(seed * 7919 + index * 104729 + 13);
  const body = tpl.build(r);
  return {
    id: `${tpl.id}#${seed}#${index}`,
    templateId: tpl.id,
    topicId: tpl.topicId,
    grade: tpl.grade,
    level: tpl.level,
    kind: tpl.kind,
    strand: tpl.strand,
    tag: tpl.tag,
    points: body.points ?? DEFAULT_POINTS[tpl.kind],
    stem: body.stem,
    options: body.options,
    answer: body.answer,
    accept: body.accept,
    solution: body.solution,
    thinking: body.thinking,
    pitfall: body.pitfall,
    rubric: body.rubric
  };
}

// src/lib/mathText.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SYMBOLS = {
  pm: "\xB1",
  mp: "\u2213",
  ne: "\u2260",
  le: "\u2264",
  ge: "\u2265",
  approx: "\u2248",
  sim: "\u223C",
  cong: "\u2245",
  to: "\u2192",
  Rightarrow: "\u21D2",
  Leftrightarrow: "\u21D4",
  mapsto: "\u21A6",
  in: "\u2208",
  notin: "\u2209",
  subset: "\u2282",
  subseteq: "\u2286",
  supset: "\u2283",
  cap: "\u2229",
  cup: "\u222A",
  emptyset: "\u2205",
  infty: "\u221E",
  forall: "\u2200",
  exists: "\u2203",
  times: "\xD7",
  div: ":",
  cdot: "\xB7",
  deg: "\xB0",
  percent: "%",
  angle: "\u2220",
  tri: "\u25B3",
  para: "\u2225",
  perp: "\u22A5",
  dots: "\u2026",
  vdots: "\u22EE",
  pi: "\u03C0",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  Delta: "\u0394",
  omega: "\u03C9",
  theta: "\u03B8",
  lambda: "\u03BB",
  mu: "\u03BC",
  sigma: "\u03C3",
  Sigma: "\u03A3",
  N: "\u2115",
  Z: "\u2124",
  Q: "\u211A",
  R: "\u211D",
  Nstar: "\u2115*",
  sqrtsign: "\u221A",
  prime: "\u2032",
  circ: "\u2218",
  ldots: "...",
  quad: "\u2003"
};
function plainMath(text) {
  return String(text ?? "").replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2").replace(/\\s\{([^{}]*)\}/g, "\u221A($1)").replace(/\\cb\{([^{}]*)\}/g, "\u221B($1)").replace(/\\sys\{(.*?)\}/g, (_, g) => `{${g.split("\\\\").join("; ")}}`).replace(/\\(ov|vec|text|abs|underbrace)\{([^{}]*)\}/g, "$2").replace(/\\(left|right|displaystyle)/g, "").replace(/\\([A-Za-z]+)/g, (_, c) => SYMBOLS[c] ?? c).replace(/[\^_]\{([^{}]*)\}/g, "$1").replace(/\$/g, "");
}

// src/lib/grading.ts
var TF_SCALE = [0, 0.1, 0.25, 0.5, 1];
function normalizeShort(raw) {
  let s = plainMath(String(raw ?? "")).toLowerCase().trim();
  s = s.replace(/\s+/g, "");
  s = s.replace(/[；;]/g, ",");
  s = s.replace(/(\d),(\d)(?![\d,]*[,])/g, (m, a, b) => m.length <= 4 ? `${a}.${b}` : m);
  s = s.replace(/^\+/, "");
  s = s.replace(/x=|y=|s=|v=/g, "");
  s = s.replace(/(cm|dm|mm|km|m|độ|°)(2|3|²|³)?$/g, "");
  const f = s.match(/^(-?\d+)\/(\d+)$/);
  if (f) {
    const a = Number(f[1]), b = Number(f[2]);
    const g = (x, y) => y === 0 ? Math.abs(x) : g(y, x % y);
    const d = g(a, b) || 1;
    const n = a / d, m = b / d;
    return m === 1 ? String(n) : `${n}/${m}`;
  }
  if (/^-?\d+\.\d+$/.test(s)) s = String(Number(s));
  return s;
}
function matchShort(given, answer, accept) {
  const g = normalizeShort(given);
  if (!g) return false;
  const pool = [answer, ...accept ?? []].map(normalizeShort);
  if (pool.includes(g)) return true;
  const asSet = (x) => x.split(",").filter(Boolean).sort().join(",");
  return pool.some((p) => p.includes(",") && asSet(p) === asSet(g));
}
function scoreOne(q, given) {
  if (given === null || given === void 0 || given === "") return { correct: false, partial: 0 };
  switch (q.kind) {
    case "MC": {
      const ok = typeof given === "number" && given === q.answer;
      return { correct: ok, partial: ok ? 1 : 0 };
    }
    case "TF": {
      const key = q.answer;
      const arr = Array.isArray(given) ? given : [];
      let hit = 0;
      key.forEach((k, i) => {
        if (arr[i] === k) hit++;
      });
      const partial = TF_SCALE[Math.min(hit, 4)] ?? 0;
      return { correct: hit === key.length, partial };
    }
    case "SHORT": {
      const ok = matchShort(String(given), String(q.answer), q.accept);
      return { correct: ok, partial: ok ? 1 : 0 };
    }
    case "ESSAY": {
      const marks = String(given).split(",").map((x) => x === "1");
      const rows = q.rubric ?? [];
      const totalPts = rows.reduce((s, r) => s + r.points, 0) || 1;
      const got = rows.reduce((s, r, i) => s + (marks[i] ? r.points : 0), 0);
      const partial = Math.max(0, Math.min(1, got / totalPts));
      return { correct: partial >= 0.999, partial };
    }
    default:
      return { correct: false, partial: 0 };
  }
}

// _check.ts
var filter = process.argv[2] ? process.argv[2].split(",") : null;
var tpls = filter ? ALL_TEMPLATES.filter((t) => filter.some((f) => t.id.includes(f))) : ALL_TEMPLATES;
console.log("templates checked:", tpls.length, "/ total", ALL_TEMPLATES.length);
var bad = 0;
var BADWORDS = /undefined|NaN|Infinity|\[object Object\]/;
for (const t of tpls) {
  for (let s = 0; s < 250; s++) {
    const q = buildQuestion(t, 1e3 + s * 31, s);
    const blob = JSON.stringify(q);
    if (BADWORDS.test(blob)) {
      console.log("BAD VALUE", t.id, "seed", s, blob.match(BADWORDS)[0]);
      bad++;
      break;
    }
    for (const [k, v] of Object.entries(q)) {
      const arr = Array.isArray(v) ? v : [v];
      for (const x of arr) if (typeof x === "string" && (x.match(/\$/g) || []).length % 2 !== 0) {
        console.log("ODD $", t.id, "seed", s, k, JSON.stringify(x));
        bad++;
      }
    }
    if (bad) break;
    if (q.kind === "MC") {
      const o = q.options || [];
      if (o.length !== 4) {
        console.log("MC opts != 4", t.id);
        bad++;
        break;
      }
      if (new Set(o.map((x) => x.trim())).size !== 4) {
        console.log("MC dup opts", t.id, "seed", s, JSON.stringify(o));
        bad++;
        break;
      }
    }
    if (q.kind === "TF") {
      const o = q.options || [];
      const ans = q.answer;
      if (o.length !== 4 || !Array.isArray(ans) || ans.length !== 4) {
        console.log("TF shape", t.id, "seed", s, o.length, JSON.stringify(ans));
        bad++;
        break;
      }
      if (new Set(o.map((x) => x.trim())).size !== 4) {
        console.log("TF dup \xFD", t.id, "seed", s, JSON.stringify(o));
        bad++;
        break;
      }
      if (ans.every(Boolean) || ans.every((v) => !v)) {
        console.log("TF to\xE0n \u0111\xFAng/to\xE0n sai", t.id, "seed", s, JSON.stringify(ans));
        bad++;
        break;
      }
      if ((q.solution || []).length !== 4) {
        console.log("TF thi\u1EBFu l\u1EDDi gi\u1EA3i \xFD", t.id, "seed", s);
        bad++;
        break;
      }
    }
    if (q.kind !== "ESSAY") {
      const r = scoreOne(q, q.answer);
      if (r.score < r.max - 1e-9) {
        console.log("SELF-GRADE FAIL", t.id, "seed", s, r.score, "/", r.max, JSON.stringify(q.answer));
        bad++;
        break;
      }
    } else if (!q.rubric || q.rubric.length === 0) {
      console.log("NO RUBRIC", t.id);
      bad++;
      break;
    }
    if (!q.solution?.length) {
      console.log("NO SOLUTION", t.id);
      bad++;
      break;
    }
    if (!q.thinking?.length) {
      console.log("NO THINKING", t.id);
      bad++;
      break;
    }
  }
}
console.log(bad === 0 ? "ALL OK" : `FAILURES: ${bad}`);
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
