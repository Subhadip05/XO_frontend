import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category : CategoryService){}

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      //css
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data","error");
    });
  }

  categories = [
    {
      cid : 23,
      title : "Java Programming",
      description : "Category about Java Programming",
    },
  ]

}
