import {Component, AfterViewInit, EventEmitter, Output, OnInit} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/services/user.service";

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  user: any;

  constructor(private modalService: NgbModal,
              private userService: UserService,) {
  }


  ngAfterViewInit() {
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    this.userService.getFiles(this.user.id).subscribe(data => {

      if(data?.picture) {
        const base64Data = data.picture;
        this.user.image = 'data:image/jpeg;base64,' + base64Data;
      }


    }, ex => {
      console.log(ex);
    });
  }
}
