'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createID = require('./createID');

var _createID2 = _interopRequireDefault(_createID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(actionsDB, action) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return actionsDB.put((0, _extends3.default)({}, action, {
              _id: (0, _createID2.default)()
            }));

          case 3:
            console.log('Local Action put successful');
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            if (_context.t0.name === 'conflict') {
              console.error('Conflict! Local Action put failed');
            }
            console.error('Local Action put failed');

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  function put(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return put;
}();