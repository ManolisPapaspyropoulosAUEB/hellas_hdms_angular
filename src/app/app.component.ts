import { Component } from '@angular/core';
import { AuthService } from './services/AuthService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HDMS';

  constructor(private authService:AuthService){
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  isAdmin(){
    if(localStorage.getItem('role')=='admin'){
      return true;
    }
    return false;
  }

  isCC(){
    if(localStorage.getItem('role')=='cc'){
      return true;
    }
    return false;
  }

  isACC(){
    if(localStorage.getItem('role')=='acc'){
      return true;
    }
    return false;
  }

  isInstaller(){
    if(localStorage.getItem('role') == 'installer')
    {
      return true;
    }

    return false;
  }
}
