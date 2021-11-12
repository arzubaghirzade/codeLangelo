import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from 'src/app/services/app/app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent implements OnInit {
  isVisible = false;
  arrayObj: any;
  images = [];
  avatarUrl?: string;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param.id) {
        this.appService.getFormById('users', {userId: param.id }).subscribe((result) => {
          this.arrayObj = result;
          console.log(this.arrayObj);
        });
      }
    });
  }
  goBack() {
    this.location.back();
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
