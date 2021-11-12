import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app/app.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  confirmModal?: NzModalRef;
  isVisible = false;
  usersArray: any;
  arrayObj = {
    id: null,
    companyId: null,
    tasks: [],
    username: '',
    email: '',
    password: ''
  };
  constructor(
    private appService: AppService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.appService.getForm('users', {companyId: 4}).subscribe((result) => {
      this.usersArray = result.users;
      console.log(result)
    });
  }
  showConfirm(id): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Silmək istədiyinizə əminsiniz?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.appService.deleteFormById('users', id).subscribe((result) => {
            this.usersArray = result;
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')),
    });
  }
  usersDetails(id) {
    localStorage.removeItem('id');
    localStorage.setItem('id', JSON.stringify(id));
    this.router.navigate(['layout/users/edit', id]);
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
