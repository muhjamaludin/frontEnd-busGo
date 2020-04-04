import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMidlleware from 'redux-promise-middleware';
// import logger, { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import reducer from './reducer/reducer';

const config = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  timeout: null
};

const persisteReducer = persistReducer(config, reducer);
// const loggerMiddleware = createLogger()

export default function() {
  const store = createStore(
    persisteReducer,
    applyMiddleware(
      promiseMidlleware,
      // logger,
      // loggerMiddleware,
      thunk
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
