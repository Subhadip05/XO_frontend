import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  
  constructor(private http : HttpClient) { }


  //for get logged-in User details
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData : any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  

  //login user : set token in localstorage
  public loginUser(token : any){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("token",token);
    }
    return true; 
  }

  //isLogin : user is logged in or not
  public isLoggedIn(){
    let tokenStr;
    if (typeof localStorage !== 'undefined') {
      tokenStr = localStorage.getItem("token"); 
    }
    if(tokenStr==undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //logout : remove token from local storage
  public logOut(){
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
    }
    return true;
  }


  //get token 
  public getToken(){
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("token");
    }
    return true;
  }

  //set user details
  public setUser(user : any){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("user",JSON.stringify(user));
    }
  }

  //get user details as Json format in local storage
  public getUser(){
    let userStr ;
    if (typeof localStorage !== 'undefined') {
      userStr= localStorage.getItem("user");
    }
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }


  //get User role
  public getUserRole(){
    let user = this.getUser()
    return user.authorities[0].authority;
  }
}
