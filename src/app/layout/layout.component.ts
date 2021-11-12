import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isAdmin!: boolean;
  constructor() {}

  ngOnInit() {
    if(sessionStorage.getItem('role') == "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin =  false;
    }
  }
}
