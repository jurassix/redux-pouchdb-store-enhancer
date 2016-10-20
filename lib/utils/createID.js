'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createID;

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createID() {
  return new Date().toJSON() + '-' + _nodeUuid2.default.v4();
}