import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createHashHistory as createHistory } from "history";
import rootReducer from "./rootReducer";

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; //orig
  // from https://codesandbox.io/s/21-redux-devtools-extension-todomvc--devtool-trace-ok-zzpp-bqees?file=/store/configureStore.js:199-328
  // 🚨 https://github.com/zalmoxisus/redux-devtools-extension/commit/64717bb9b3534ff616d9db56c2be680627c7b09d ((⚪️ zzp._15._y20.0407-2340
  // const devToolsExtension =
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__({
  //     serialize: true,
  //     trace: true
  //   });
  if (typeof devToolsExtension === "function") {
    enhancers.push(
      devToolsExtension({
        serialize: true,
        trace: true,
        traceLimit: 50
      })
    );
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);
