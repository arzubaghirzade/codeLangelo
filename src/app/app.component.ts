import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'veyseloglu-admin-front';
  
  constructor(public router: Router,
    private dragulaService: DragulaService){ 
    this.dragulaService.createGroup("VAMPIRES", {});
   }
  
}
