import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from 'src/app/services/app/app.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-tasks-detaiils',
  templateUrl: './tasks-detaiils.component.html',
  styleUrls: ['./tasks-detaiils.component.scss']
})
export class TasksDetaiilsComponent implements OnInit {
  isVisible = false;
  arrayObj: any;
  images = [];
  avatarUrl?: string;
 
  constructor(
              private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private msg: NzMessageService,
              private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
    if (param.id) {
           this.appService.getFormById('tasks', param.id).subscribe(result => {
          this.arrayObj = result;
          console.log(this.arrayObj);
          
      });
     }
    });
  }
  goBack(){
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
