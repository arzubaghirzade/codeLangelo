import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app/app.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
interface ItemData {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  confirmModal?: NzModalRef;
  isVisible = false;
  tasksArray: any;
  arrayObj = {
    id: null,
    companyId: null,
    tasks: [],
    name: '',
    surname: '',
    email: '',
    password: '',
  };
  constructor(
    private appService: AppService,
    private router: Router,
    private modal: NzModalService
  ) {}
  ngOnInit() {
    this.addRow();
    this.addRow();
      this.appService.getForm('tasks', {companyId: 7, userId: 7}).subscribe((result) => {
        this.tasksArray = result.tasks;
        console.log(result)
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
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        title: `Edward King ${this.i}`,
        description: `Edward King ${this.i}`,
        deadline: '32',
        status: `London, Park Lane no. ${this.i}`,
      },
    ];
    this.i++;
  }
  showConfirm(id): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Silmək istədiyinizə əminsiniz?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.appService.deleteFormById('tasks', id).subscribe((result) => {
            this.tasksArray = result;
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')),
    });
  }
  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d) => d.id !== id);
  }
}
