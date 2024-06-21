import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  constructor(private userService:UserService,private snackBar : MatSnackBar) {}

  public user = {
    username:'',
    password:'',
    firstname:'',
    lastname: '',
    email: '',
    phone:''
  }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      // alert('User is required !!');
      this.snackBar.open("UserName is to be filled","Ok",{
        duration : 3000,
        verticalPosition : 'bottom',
        horizontalPosition : 'left'
      });
      return;
    }


    //addUser function from userservice
    this.userService.addUser(this.user).subscribe(
      (data: any)=>{
        //success
        console.log(data);
        Swal.fire("Successfully Registered","User id is " + data.userid,'success');
        // alert("success");
      },
      (error)=>{
        console.log(error);
        alert("Something went wrong");
      }
    )
  }



}
