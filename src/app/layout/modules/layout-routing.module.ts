import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuard } from 'src/app/guard/role.guard';
import { LayoutComponent } from '../layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/tasks/modules/tasks.module').then(
            (m) => m.TasksModule
          ),
      },
      {
        path: 'tasks',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/tasks/modules/tasks.module').then(
            (m) => m.TasksModule
          ),
      },
      {
        path: 'users',
        canActivate: [AuthGuard,RoleGuard],
        data: {
          role: 'admin',
        },
        loadChildren: () =>
          import('../pages/users/modules/users.module').then(
            (m) => m.UsersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
