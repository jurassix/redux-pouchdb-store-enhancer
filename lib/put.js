'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createID = require('./createID');

var _createID2 = _interopRequireDefault(_createID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(actionsDB, action) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return actionsDB.put(_extends({}, action, {
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