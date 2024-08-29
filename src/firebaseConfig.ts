import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const firebaseConfig = {
  apiKey: "AIzaSyDmeBH7PzrO7ijJjSDJQ1zvvtaNJ5Tl-pE",
  authDomain: "huedge-8531c.firebaseapp.com",
  projectId: "huedge-8531c",
  storageBucket: "huedge-8531c.appspot.com",
  messagingSenderId: "567791022158",
  appId: "1:567791022158:web:95fd24f8cc42165cf3131f",
  measurementId: "G-3DMBRJ8VHD"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);