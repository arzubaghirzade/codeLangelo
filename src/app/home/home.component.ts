import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin!: boolean;
  isMobile: boolean = false;
  isMobileClick: boolean = false;

  constructor(private router: Router, private appService: AppService,) {
  }

  ngOnInit() {
    if(sessionStorage.getItem('role') == "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin =  false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
      this.isMobile = window.innerWidth < 1199;
      this.isMobileClick = window.innerWidth < 1199;
  }

}
