

export default function pouchdbReducerEnhancer(rootReducer) {
  return (state, action) => {
    if (action.type === '@@POUCHDB_REMOTE_APP_STATE') {
      console.debug(
        'Replacing application state from pouch computeNextState',
        action.state
      );
      return action.state;
    }
    return rootReducer(state, action);
  }
}
