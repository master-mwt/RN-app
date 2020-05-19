/**
 * Class that handles the use of FirestoreDB
 */
class FirestoreDB {
  /**
   * Set the FirestoreDB instance
   *
   * @param db FirestoreDB instance
   */
  setDB(db) {
    if (!this._db) {
      this._db = db;
    }
  }

  /**
   * Check if FirestoreDB is ready
   *
   * @returns {boolean}
   */
  isReady() {
    if (this._db) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get data from FirestoreDB
   *
   * @param user A unique identifier for the user
   * @returns {Promise<firebase.firestore.DocumentSnapshot<T>>}
   */
  getData(user) {
    if (!this._db) {
      throw 'FirestoreDB instance not ready';
    }
    return this._db
      .collection('data')
      .doc(user)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      });
  }

  /**
   * Put data in FirestoreDB
   *
   * @param user A unique identifier for the user
   * @param data Data to store
   * @returns {Promise<void>}
   */
  putData(user, data) {
    if (!this._db) {
      throw 'FirestoreDB instance not ready';
    }
    return this._db
      .collection('data')
      .doc(user)
      .set(data);
  }
}

const instance = new FirestoreDB();
export default instance;
