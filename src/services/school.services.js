import { realtimeDb } from "../utils/firebase";
const newDb = realtimeDb.ref("/school_colleges");
class SchoolDatabaseService {
  getAll() {
    return newDb;
  }
  create(sc) {
    return newDb.push(sc);
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
export default new SchoolDatabaseService();
