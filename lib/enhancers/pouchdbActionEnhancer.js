'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pouchdbActionEnhancer;

var _put = require('../utils/put');

var _put2 = _interopRequireDefault(_put);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pouchdbActionEnhancer(actionsDB) {
  return function (dispatch, getState, action) {
    (0, _put2.default)(actionsDB, action);
    return action;
  };
}