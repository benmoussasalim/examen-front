import { Component, OnInit } from '@angular/core';
import {Question} from "../../../shared/model/question";
import {Theme} from "../../../shared/model/theme";
import {ThemeService} from "../../../shared/services/theme.service";
import {QuestionService} from "../../../shared/services/question.service";
import {ToastService} from "../../../shared/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  question: Question = new Question();
  themes: Theme[];
  theme: Theme = new Theme();
  id: any;
  title: any;

  constructor(private themeService: ThemeService,
              private questionService: QuestionService,
              private toastService: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllTheme();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getById();
      this.title = 'Editer question';
    }else
    this.title = 'Nouveau question';
   }
  getById() {
    this.questionService.questionById(this.id).subscribe(data => {
      this.question = data;
    }, ex => {
      console.log(ex);
    });
  }
  getAllTheme() {
    this.themeService.getAll().subscribe(data => {
        console.log(data);
        this.themes = data;
      },
      ex => console.log(ex));
  }

  addQuestion() {
    this.questionService.addquestion(this.question).subscribe(res => {
      if (res.success) {
        this.toastService.success(res.message, res.detail);
        this.router.navigate(['/app/features/question']);
      } else {
        this.toastService.warning(res.message, res.detail);
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }

  annuler() {
    if(this.id) {
      this.getById();
    }
  }

  valider() {
    if (this.id) {
      this.update();
    } else {
      this.addQuestion();
    }
  }

  update() {
    this.questionService.updatequestion(this.question).subscribe(res => {
      if (res.success) {
        this.toastService.success(res.message, res.detail);
        this.router.navigate(['/app/features/question']);
      } else {
        this.toastService.warning(res.message, res.detail);
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }

  compareFn(c1: Question, c2: Question): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
