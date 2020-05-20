import auth from '@react-native-firebase/auth';

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
    return auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Perform a Firebase sign up (registration)
   *
   * @param email User email
   * @param password User password
   * @returns {Promise<firebase.auth.UserCredential>}
   */
  static signUp(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Perform a Firebase sign out (logout)
   *
   * @returns {Promise<void>}
   */
  static signOut() {
    return auth().signOut();
  }
}
