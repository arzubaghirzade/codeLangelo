import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoNgZorroAntdModule} from 'src/app/ng-zorro-antd.module';
import {ControlErrorMessagesComponent} from "../control-error-messages/control-error-messages.component";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ControlErrorMessagesComponent
    ],
    imports: [
        CommonModule,
        DemoNgZorroAntdModule,
        FormsModule
    ],
    exports: [
        ControlErrorMessagesComponent
    ]
})
export class SharedModule {
}
