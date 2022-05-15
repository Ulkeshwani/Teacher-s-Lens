import { realtimeDb } from "../utils/firebase";
const newDb = realtimeDb.ref("/users");
class UserDatabaseService {
  getAll() {
    return newDb;
  }
  create(user) {
    return newDb.push(user);
  }
  update(key, value) {
    return newDb.child(key).update(value);
  }
  delete(key) {
    return newDb.child(key).remove();
  }
  deleteAll() {
    return newDb.remove();
  }
}
export default new UserDatabaseService();
