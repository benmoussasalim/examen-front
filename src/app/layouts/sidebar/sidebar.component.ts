import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../shared/services/user.service";
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  user: any;
  showMenu = '';
  showSubMenu = '';

  // @ts-ignore
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.user = JSON.parse(localStorage.getItem('currentUser')!)
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
