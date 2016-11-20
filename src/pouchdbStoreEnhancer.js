import PouchDB from 'pouchdb';
import { applyMiddleware, compose } from 'redux';
import actionEnhancerMiddleware from 'redux-action-enhancer-middleware';
import pouchdbReducerEnhancer from './enhancers/pouchdbReducerEnhancer';
import ignorePouchActionsFilter from './filters/ignorePouchActionsFilter';
import pouchdbActionEnhancer from './enhancers/pouchdbActionEnhancer';
import computeNextState from './computeNextState';
import syncActions from './syncActions';

if (process.env.NODE_ENV !== 'production' && window) {
  window.PouchDB = PouchDB;
}

export default function pouchdbStoreEnhancer(
  remoteActionsDBUrl = 'http://127.0.0.1:5984/actions',
  localActionsDBName = 'actions',
  filterFunction = ignorePouchActionsFilter
) {
  return (createStore) => (reducer, preloadedState) => {
    const actionsDB = new PouchDB(localActionsDBName);
    const remoteActionDB = new PouchDB(remoteActionsDBUrl);

    const enhancedReducer = pouchdbReducerEnhancer(reducer);
    const pouchActionEnhancer =
      applyMiddleware(
        actionEnhancerMiddleware({
          filter: filterFunction,
          enhancer: pouchdbActionEnhancer(actionsDB),
        })
      );

    const store = pouchActionEnhancer(createStore)(enhancedReducer, preloadedState);
    const onChange = computeNextState(actionsDB, reducer, preloadedState, store.dispatch);
    const cancelActionSync = syncActions(actionsDB, remoteActionDB, onChange);

    // bootstrap our local pouchdb actions into to compute initial state
    onChange();

    return {
      ...store,
      cancelActionSync,
    };
  }
}
