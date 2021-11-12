import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app/app.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  permission!: boolean
  constructor(private router: Router,
              private appService: AppService) { }
              
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):
     | Observable<boolean | UrlTree>
     | Promise<boolean | UrlTree> 
     |  boolean | UrlTree {
       if(sessionStorage.getItem('role') === route.data.role){
        this.permission = true;
       } else {
        this.permission = false;
       }
      return this.permission || (this.router.navigate(['']));
    }
}
