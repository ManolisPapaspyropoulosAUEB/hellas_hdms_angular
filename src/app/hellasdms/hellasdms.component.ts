import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-hellasdms',
  templateUrl: './hellasdms.component.html',
  styleUrls: ['./hellasdms.component.css']
})
export class HellasDMSComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  role;

  ngOnInit() {
    this.role = localStorage.getItem("role");
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToRegistration(){
    this.router.navigate(['registration']);
  }

  logOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['/']);
  }

  isAdmin(){
    return localStorage.getItem('role') == 'admin';
  }

  isCC(){
    return localStorage.getItem('role') == 'cc';
  }

  isACC(){
    return localStorage.getItem('role') == 'acc';
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToNewPassword(){
    this.router.navigate(['/changePassword']);
  }
}
