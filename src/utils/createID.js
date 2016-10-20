import uuid from 'node-uuid';

export default function createID() {
  return `${new Date().toJSON()}-${uuid.v4()}`;
}
