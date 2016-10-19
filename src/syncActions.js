
export default function syncActions(actionsDB, remoteActionDB, onChange) {
  return actionsDB.sync(remoteActionDB, {
    live: true,
    retry: true,
  }).on('change', function (change) {
    console.log('Action sync change', change);

    // 'pull' means we are recieving actions from a remote server
    // remote actions need to be included when calculating our next state.
    if (change.direction === 'pull') {
      onChange(change);
    }
    
  }).on('paused', function (info) {
    console.info('Action sync paused', info);
  }).on('active', function (info) {
    console.info('Action sync active', info);
  }).on('denied', function (err) {
    console.info('Action sync denied', err);
  }).on('complete', function (info) {
    console.info('Action sync canceled', info);
  }).on('error', function (err) {
    console.error('Action sync failed', err);
  });
}
