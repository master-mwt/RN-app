import firebase from 'firebase';

/**
 * Class that handles sign in, sign up, sign out
 */
export default class FirebaseAuth {
  /**
   * Perform a Firebase sign in (login)
   *
   * @param email User email
   * @param password User password
   * @returns {Promise<firebase.auth.UserCredential>}
   */
  static signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Perform a Firebase sign up (registration)
   *
   * @param email User email
   * @param password User password
   * @returns {Promise<firebase.auth.UserCredential>}
   */
  static signUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Perform a Firebase sign out (logout)
   *
   * @returns {Promise<void>}
   */
  static signOut() {
    return firebase.auth().signOut();
  }
}
