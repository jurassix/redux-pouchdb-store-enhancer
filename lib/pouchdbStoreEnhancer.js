'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = pouchdbStoreEnhancer;

var _pouchdb = require('pouchdb');

var _pouchdb2 = _interopRequireDefault(_pouchdb);

var _redux = require('redux');

var _actionEnhancerMiddleware = require('action-enhancer-middleware');

var _actionEnhancerMiddleware2 = _interopRequireDefault(_actionEnhancerMiddleware);

var _pouchdbReducerEnhancer = require('./enhancers/pouchdbReducerEnhancer');

var _pouchdbReducerEnhancer2 = _interopRequireDefault(_pouchdbReducerEnhancer);

var _ignorePouchActionsFilter = require('./filters/ignorePouchActionsFilter');

var _ignorePouchActionsFilter2 = _interopRequireDefault(_ignorePouchActionsFilter);

var _pouchdbActionEnhancer = require('./enhancers/pouchdbActionEnhancer');

var _pouchdbActionEnhancer2 = _interopRequireDefault(_pouchdbActionEnhancer);

var _computeNextState = require('./computeNextState');

var _computeNextState2 = _interopRequireDefault(_computeNextState);

var _syncActions = require('./syncActions');

var _syncActions2 = _interopRequireDefault(_syncActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production' && window) {
  window.PouchDB = _pouchdb2.default;
}

function pouchdbStoreEnhancer() {
  var remoteActionsDBUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://127.0.0.1:5984/actions';
  var localActionsDBName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'actions';

  return function (createStore) {
    return function (reducer, preloadedState) {
      var actionsDB = new _pouchdb2.default(localActionsDBName);
      var remoteActionDB = new _pouchdb2.default(remoteActionsDBUrl);

      var enhancedReducer = (0, _pouchdbReducerEnhancer2.default)(reducer);
      var pouchActionEnhancer = (0, _redux.applyMiddleware)((0, _actionEnhancerMiddleware2.default)({
        filter: _ignorePouchActionsFilter2.default,
        enhancer: (0, _pouchdbActionEnhancer2.default)(actionsDB)
      }));

      var store = pouchActionEnhancer(createStore)(enhancedReducer, preloadedState);
      var onChange = (0, _computeNextState2.default)(actionsDB, reducer, preloadedState, store.dispatch);
      var cancelActionSync = (0, _syncActions2.default)(actionsDB, remoteActionDB, onChange);

      // bootstrap our local pouchdb actions into to compute initial state
      onChange();

      return (0, _extends3.default)({}, store, {
        cancelActionSync: cancelActionSync
      });
    };
  };
}