
export default function computeNextState(actionsDB, reducer, preloadedState, dispatch) {
  return async function (change) {
    try {
      const result = await actionsDB.allDocs({
        include_docs: true,
      });

      // replay entire app history to calculate next state
      const nextState = result.rows.reduce((acc, row) => {
        const action = row.doc;
        return reducer(acc, action);
      }, preloadedState);

      dispatch({
        type: '@@POUCHDB_REMOTE_APP_STATE',
        state: nextState,
      });

    } catch(err) {
      console.error('Applying synced actions failed', err);
    }
  }
}
