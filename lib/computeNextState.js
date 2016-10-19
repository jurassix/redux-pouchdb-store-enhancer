'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeNextState;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function computeNextState(actionsDB, reducer, preloadedState, dispatch) {
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(change) {
      var result, nextState;
      return regeneratorRuntime.wrap(function _callee$(_context) {
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