import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksDetaiilsComponent } from '../tasks-detaiils/tasks-detaiils.component';
import { TasksComponent } from '../tasks.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TasksComponent,

      },
      {
        path: 'edit/:id',
        component: TasksDetaiilsComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
