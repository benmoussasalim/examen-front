import { Component, OnInit } from '@angular/core';
import {Question} from "../../shared/model/question";
import {QuestionService} from "../../shared/services/question.service";
import {ToastService} from "../../shared/services/toast.service";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";
import {ThemeService} from "../../shared/services/theme.service";
import {Theme} from "../../shared/model/theme";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [ConfirmationService]
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  themes: Theme[];
  question: Question = new Question();
  theme: Theme = new Theme();
  title:any;

  constructor(private questionService:QuestionService,
              private toastService:ToastService,
              private themeService:ThemeService,
              private confirmationService: ConfirmationService,
              private router: Router
               ) { }

  ngOnInit(): void {
    this.getAllTheme();
    this.getAll();
  }
  getAll() {
    this.questionService.getAll().subscribe(data => {
        console.log(data);
        this.questions = data;
      },
      ex => console.log(ex));
  }
  getAllTheme(){
    this.themeService.getAll().subscribe(data => {
        console.log(data);
        this.themes = data;
      },
      ex => console.log(ex));
  }
  getByTheme(id :number){
    this.questionService.getByTheme(id).subscribe(data => {
        console.log(data);
        this.questions = data;
      },
      ex => console.log(ex));
  }

  confirm(event: Event,id : number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTheme(id);
        this.router.navigate(['/app/features/question'])
      },
      reject: () => {
        this.router.navigate(['/app/features/question'])
      }
    });
  }
  deleteTheme(id: any) {
    this.questionService.deletequestion(id).subscribe(res => {
        if (res.success) {
          this.getAll();
          this.toastService.success(res.message, res.detail);
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );
  }

  clickAdd() {
    this.router.navigate(['/app/features/question/new']);
  }
  clickEdit(id: any) {
    this.router.navigate(['/app/features/question/edit/', id]);
  }


  listByTheme(id:number) {
    if(id) {
      this.getByTheme(id);
    } else {
      this.getAll();
    }

  }

}

