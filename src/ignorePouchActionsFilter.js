
export default function ignorePouchActionsFilter({ type = '' }) {
  return type.indexOf('@@POUCHDB') === -1;
}
