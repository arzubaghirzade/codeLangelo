import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users.component';
import { UsersNewComponent } from '../users-new/users-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { JoditAngularModule } from 'jodit-angular';
import { UsersRoutingModule } from './users-routing.module';
import { UsersDetailsComponent } from '../users-details/users-details.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersNewComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    JoditAngularModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
