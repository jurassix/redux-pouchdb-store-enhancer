'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ignorePouchActionsFilter;
function ignorePouchActionsFilter(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? '' : _ref$type;

  return type.indexOf('@@POUCHDB') === -1;
}