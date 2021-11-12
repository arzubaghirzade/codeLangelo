import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { JoditAngularModule } from 'jodit-angular';
import { LayoutComponent } from '../layout.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DemoNgZorroAntdModule,
    JoditAngularModule,
  ]
})
export class LayoutModule { }
