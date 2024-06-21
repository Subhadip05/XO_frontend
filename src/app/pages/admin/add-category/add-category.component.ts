import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {


  constructor(private _category : CategoryService,private _snack : MatSnackBar){}

  category={
    title : '',
    description : '',
  };


  formSubmit(){

    if(this.category.title.trim() == "" || this.category.title == null){

      this._snack.open("Title Required !!",'',{
        duration : 3000,
      });
      return ;
    }

    //if input is ok,then
    this._category.addCategory(this.category).subscribe(

      (data :any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!",'Categroy is added successfully','success');
      },

      (error)=>{
        Swal.fire("Error !!",'Server error !!','error');
        console.log(error);
      }

    );



  }

}
