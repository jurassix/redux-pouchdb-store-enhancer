'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = computeNextState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeNextState(actionsDB, reducer, preloadedState, dispatch) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(change) {
      var result, nextState;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return actionsDB.allDocs({
                include_docs: true
              });

            case 3:
              result = _context.sent;


              // replay entire app history to calculate next state
              nextState = result.rows.reduce(function (acc, row) {
                var action = row.doc;
                return reducer(acc, action);
              }, preloadedState);


              dispatch({
                type: '@@POUCHDB_REMOTE_APP_STATE',
                state: nextState
              });

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              console.error('Applying synced actions failed', _context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}