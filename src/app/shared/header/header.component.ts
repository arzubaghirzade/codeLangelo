import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    listOfPosition: NzPlacementType = 'topRight';
    title: any;
    constructor(public router: Router) {
    }

    ngOnInit() {
    }
    logOut(){
            localStorage.clear();
            this.router.navigate(['']);
    }
}
