import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser = signal<User | null>(null);
  public isLoggedIn = signal<boolean>(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadUser();
  }

  private loadUser() {
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          this.currentUser.set({ email: userObj.email });
          this.isLoggedIn.set(true);
        } catch (e) {
          console.error('Error parsing stored user data', e);
        }
      }
    }
  }

  public signup(email: string, password: string): { success: boolean, message: string } {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (this.isBrowser) {
      const usersStr = localStorage.getItem('users') || '[]';
      try {
        const users = JSON.parse(usersStr);
        const exists = users.find((u: any) => u.email === email);
        if (exists) {
          return { success: false, message: 'User already exists' };
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        this.setSession({ email });
        return { success: true, message: 'Sign up successful' };
      } catch (e) {
        return { success: false, message: 'An error occurred during sign up' };
      }
    }
    return { success: false, message: 'Environment issue' };
  }

  public login(email: string, password: string): { success: boolean, message: string } {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (this.isBrowser) {
      const usersStr = localStorage.getItem('users') || '[]';
      try {
        const users = JSON.parse(usersStr);
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          this.setSession({ email });
          return { success: true, message: 'Log in successful' };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      } catch (e) {
        return { success: false, message: 'An error occurred during log in' };
      }
    }
    return { success: false, message: 'Environment issue' };
  }

  private setSession(user: User) {
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  public logout() {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }
}
