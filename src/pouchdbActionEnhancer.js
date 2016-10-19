import put from './put';

export default function pouchdbActionEnhancer(actionsDB) {
  return (dispatch, getState, action) => {
    put(actionsDB, action);
    return action;
  }
}
