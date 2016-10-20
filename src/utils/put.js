import createID from './createID';

export default async function put(actionsDB, action) {
  try {
    await actionsDB.put({
      ...action,
      _id: createID(),
    });
    console.log('Local Action put successful');
  } catch(err) {
    if (err.name === 'conflict') {
      console.error('Conflict! Local Action put failed');
    }
    console.error('Local Action put failed');
  }
}
