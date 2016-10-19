# redux-pouchdb-store-enhancer
Redux PouchDB Enhancer to store actions locally, sync with remote CouchDB, and
time travel by applying remote actions locally and then compute distributed nextState.

### Overview

This library is a simple experiment with leveraging Redux and PouchDB to build an
_Enventually Consistent_ distributed realtime system.

### Architecture

Every action that a single client emits as part of the regular Redux architecture
will be intercepted and pushed into a local PouchDB database. All local PouchDB actions
are sync'd to a remote CouchDB database. Since multiple users could introduce
new actions into our system we need to update our local AppState to be
_Consistent_ across all clients. This is done by listening to the __'push'__ sync
events from the remote CouchDB. When we receive new actions we replay all actions
in our local PouchDB, which now includes the remote actions, and compute a
deterministic next state. All actions are added to the DB in
[accountant](https://pouchdb.com/guides/conflicts.html#accountants-dont-use-erasers)
style, where every record is additive, and conflicts are _almost_ guaranteed to
be nonexistent.

As we begin to distribute this model to multiple clients we build a realtime system
that captures actions, ensures ordering of actions during replay, and ensures
eventual consistency amongst all clients.

Offline support is a first-class citizen. Every action is pushed into your local,
PouchDB, and when the user is online PouchDB will sync with the remote CouchDB.

Actions ordering is guaranteed to be deterministic by using a PouchDB **_id** that
is a composite of __TIMESTAMP-UUIDv4__. In this way if we have conflicts with actions
occurring simultaneously, we can use the UUIDv4 (which is not time dependent) to
consistently order these actions as we replay history on remote clients devices.

__Cautions:__ this architecture is experimental. More work is needed to control
the size of the _Actions_ database and the cost of replaying all actions every sync.
A future enhancement would be to compress all actions into a single action that simply
replaces the local app state. This would essentially allow us to compress historical actions
into a single action and free up computation and wire chatter.
Also, important to note that additional tuning on the chatter between PouchDB and
CouchDB would be needed. The current sync implementation options are simply
```live: true, retry: true```

### Install

```js
npm i -S redux-pouchdb-store-enhancer
```

### Example

```js
import pouchdbStoreEnhancer from 'redux-pouchdb-store-enhancer';

const middleware = [];
const store = createStore(
  reducer,
  compose(applyMiddleware(...middleware),
  pouchdbStoreEnhancer()
);
```

__pouchdbStoreEnhancer__ accepts options that allow the user to configure
the local PouchDB database name and remote CouchDB database url.

The local PouchDB database will be used to store all local actions, on and offline.
The remote CouchDB database will be used to sync actions from all connected clients.

### API

```js
pouchdbStoreEnhancer(remoteActionsDBUrl, localActionsDBName)
```

#### remoteActionsDBUrl

This is the full URL to your CouchDB database including the DB name to sync actions.

__Defaults:__

```remoteActionsDBUrl = 'http://127.0.0.1:5984/actions'```

#### localActionsDBName

This is the name of your local PouchDB database, this will be used to store actions.

__Defaults:__

```localActionsDBName = 'actions'```
