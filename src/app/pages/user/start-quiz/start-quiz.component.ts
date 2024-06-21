import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css'
})
export class StartQuizComponent implements OnInit{


  qid : any;
  questions: any;
  name : String | undefined ;

  marksGot = 0;
  correctAns = 0;
  attempted = 0;
  

  isSubmit = false;

  timer : any

  constructor(private locationSt: LocationStrategy,private _route: ActivatedRoute,private _ques: QuestionService){}

  ngOnInit(): void {
    //prevent button off when quiz test has been started
    //this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._ques
    .getQuestionsOfQuizForTest(this.qid)
    .subscribe((data : any)=>{
        // console.log(data);
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        // this.questions.forEach(
        //   (q : any)=>{
        //      q['givenAnswer'] = '';
        //   }
        // );
        
        //console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions of quiz",'error');
      }
    );
  }


  // now it is off in onOnit method , also it showing error history not stored 
  // I have to work on this i future 
  public preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }


  //submit quiz button method
  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon: 'info',
    }).then((e)=>{
      if(e.isConfirmed){

        this.evalQuiz();

      }
    });
  }


  //timer decreasing method
  startTimer(){

    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);

  }


  // showing time method in minute : second format
  getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm*60;
    return `${mm} min : ${ss} sec`;

  }



  // automatically submit button method
  evalQuiz(){
    // call to server to check questions
    this._ques.evalQuiz(this.questions).subscribe(
      (data : any)=>{
        console.log(data);
        this.attempted = data.attempted;
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAns = data.correctAns;

        this.isSubmit = true;
      },
      (error)=>{
        console.log(error);
      }
    );

    // this.isSubmit = true;

    // this.questions.forEach((q: any)=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAns++;
    //     let marksSingle = (this.questions[0].quiz.maxMarks) / this.questions.length;
    //     this.marksGot+=marksSingle;
    //   }

    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }


    // });

    // console.log("Correct Answers : "+this.correctAns);
    // console.log("Marks Got : "+this.marksGot);
    // console.log("Attempted "+this.attempted);
  }

  printPage(){
    window.print();
  }
}
