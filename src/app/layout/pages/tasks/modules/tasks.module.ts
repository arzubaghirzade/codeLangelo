import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksNewComponent } from '../tasks-new/tasks-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { JoditAngularModule } from 'jodit-angular';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksDetaiilsComponent } from '../tasks-detaiils/tasks-detaiils.component';
import { TasksComponent } from '../tasks.component';



@NgModule({
  declarations: [
    TasksComponent,
    TasksNewComponent,
    TasksDetaiilsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    JoditAngularModule,
    TasksRoutingModule,
    FormsModule
  ]
})
export class TasksModule { }
