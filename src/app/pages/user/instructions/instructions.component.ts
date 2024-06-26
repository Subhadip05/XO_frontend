import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'node:console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {


  qid : any;
  quiz : any;

  constructor(private _route : ActivatedRoute,private _quiz: QuizService,private _router: Router){}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid);


    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
        alert("Error in loading quiz");
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: "Do you want to start the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start-quiz/'+this.qid]);
      } else if (result.isDenied) {
        Swal.fire("Quiz cancel", "", "info");
      }
    });
  }
  

}
