import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{  //para resguardar las paginas implementamos  CanActivate
  
  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private router: Router) { }  //inyectamos servicio de authentication

  // accede a las paginas solo cuando el usuario este logueado
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hardcodedAuthenticationService.isUserLoggedIn())  
      return true;
    
    this.router.navigate(['login']);
    return false;
  }

}
