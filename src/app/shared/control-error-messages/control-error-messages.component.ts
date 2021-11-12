import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-error-messages',
  templateUrl: './control-error-messages.component.html',
  styleUrls: ['./control-error-messages.component.scss']
})
export class ControlErrorMessagesComponent implements OnInit {

  // @ts-ignore
  @Input() ctrl: any;
  @Input("showError") showError = false;

  ERROR_MESSAGE = {
    required: () => 'Xana mütləq doldurulmalıdır',
  /*  minlength: (par) => `Min ${par.requiredLength} chars is required`,
    minAge: (par) => `Minimal yaş tələbi ${par}-dir.`*/
  };

  constructor() { }

  ngOnInit() { }

  shouldShowErrors(): boolean {
    // @ts-ignore
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    if(this.ctrl?.errors){
      return Object.keys(this.ctrl?.errors).map(
        err => {
          // @ts-ignore
          return this.ERROR_MESSAGE[err](this.ctrl.getError(err));
        }
      );
    }else{
      return [];
    }
   
  }

}
