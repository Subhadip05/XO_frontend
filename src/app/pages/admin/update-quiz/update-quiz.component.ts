import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{
[x: string]: any;

  qId = 0;
  quiz : any;
  categories : any;

  constructor(private  _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router){}
 
  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );


    //load categories
    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
    },
    (error)=>{
      alert("Error in loading category");
    });
    
  }


  //update form submit
  public updateQuiz(){
    
    //validate


    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success","Quiz Updated !!",'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire("Error","Error in updating quiz",'error');
        console.log(error);
      }
    );
  }

}
