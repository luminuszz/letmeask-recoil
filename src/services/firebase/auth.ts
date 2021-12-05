import {
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { Auth } from 'firebase/auth';

export class AuthManager {
  private static instance: AuthManager;
  private googleProvider = new GoogleAuthProvider();

  public static init(auth: Auth) {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager(auth);

      return AuthManager.instance;
    }

    return AuthManager.instance;
  }

  constructor(private readonly auth: Auth) {}

  signInWithPopupWithGoogle = () =>
    signInWithPopup(this.auth, this.googleProvider);

  onAuthStateEffectListener = (onChange: NextOrObserver<User>) =>
    onAuthStateChanged(this.auth, onChange);
}
