import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginData = {
    username : '',
    password : '',
  }
  ngOnInit(): void {

  }


  constructor(private snack : MatSnackBar,private login : LoginService) {}

  formSubmit(){
    console.log("Login Btn Clicked");

    if(this.loginData.username.trim() == '' || this.loginData.username==null){

      this.snack.open("Username is required !!" , '',{
        duration : 3000,
      });
      return ;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password==null){

      this.snack.open("Password is required !!" , '',{
        duration : 3000,
      });
      return ;
    }


    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data : any) => {
        console.log("Successfully get token");
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user : any) => {
            this.login.setUser(user);
            console.log(user);

            //redirect .. if ADMIN : admin-dashboard
            //redirect .. else : normal-user-dashboard
            if(this.login.getUserRole() == "ADMIN"){
              //admin dashboard
              window.location.href = '/admin';

              this.login.loginStatusSubject.next(true); // here we have to fix bugs

            }else if(this.login.getUserRole() == "NORMAL_USER"){
              //normal-user dashboard
              window.location.href = '/user-dashboard/0';

              this.login.loginStatusSubject.next(true); // here we have to fix bugs

            }else{
              this.login.logOut();
            }

          }
        )
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.snack.open("Invalid Details ! Please try again.",'',{
          duration : 3000,
        });
      }
    )
  }
}
