import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  firstName?: string;
  lastName?: string;
  phone?: string;
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

  public signup(userData: { firstName?: string, lastName?: string, phone?: string, email: string, password: string }): { success: boolean, message: string } {
    if (!userData.email || !userData.password) {
      return { success: false, message: 'ID and password are required' };
    }

    if (this.isBrowser) {
      const usersStr = localStorage.getItem('users') || '[]';
      try {
        const users = JSON.parse(usersStr);
        const exists = users.find((u: any) => u.email === userData.email || (userData.phone && u.phone === userData.phone));
        if (exists) {
          return { success: false, message: 'User already exists with this email or phone' };
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        this.setSession({ 
          firstName: userData.firstName, 
          lastName: userData.lastName, 
          phone: userData.phone, 
          email: userData.email 
        });
        return { success: true, message: 'Sign up successful' };
      } catch (e) {
        return { success: false, message: 'An error occurred during sign up' };
      }
    }
    return { success: false, message: 'Environment issue' };
  }

  public login(id: string, password: string): { success: boolean, message: string } {
    if (!id || !password) {
      return { success: false, message: 'ID and password are required' };
    }

    if (this.isBrowser) {
      const usersStr = localStorage.getItem('users') || '[]';
      try {
        const users = JSON.parse(usersStr);
        // User handles can be email or phone
        const user = users.find((u: any) => (u.email === id || u.phone === id) && u.password === password);
        if (user) {
          this.setSession({ 
            firstName: user.firstName, 
            lastName: user.lastName, 
            phone: user.phone, 
            email: user.email 
          });
          return { success: true, message: 'Log in successful' };
        } else {
          return { success: false, message: 'Invalid ID or password' };
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
