import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string
  private UserName:any

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.UserName=user.displayName;
      } else {
        this.uid = undefined;
        this.UserName=null;
        console.log("User logged out")
      }
    });
  }
  registerUser(email: string, password: string, name: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(() => {
          // console.log(user)
        }).catch((error) => {
          console.log(error)
        });
        // console.log(user)
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  }


  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(["/dashboard"])

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }
  logoutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.log(error)
    });
  }
  isAuthenticated(): boolean {
    return this.uid ? true : false
  }
  getUid() {
    return this.uid
  }
  getUserName(){
    return this.UserName
  }
} 
