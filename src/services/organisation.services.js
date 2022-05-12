import fireabase from "../utils/firebase";
const newDb = fireabase.ref("/orgsanisations");
class OrganisationDatabaseService {
  getAll() {
    return newDb;
  }
  create(org) {
    return newDb.push(org);
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
export default new OrganisationDatabaseService();
