import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  id;
  password:string;
  error: string = "";

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['hellasdms']);
    }
  }

  logIn(){
    this.authService.logIn({ "userId": Number(this.id), "pwd": this.password }).subscribe(response => {
      
      console.log(response);

      if(response.status == "ok")
      {
        localStorage.setItem("id", this.id);
        localStorage.setItem("role", response.role);
        
        this.router.navigate(['hellasdms']);
      }
      else if(response.status == "invalidCredentials")
      {
        this.error = "Λάθος στοιχεία εισόδου";
      }
    }, error =>{
      this.error = "Προέκυψε τεχνικό πρόβλημα. Παρακαλώ επικοινωνήστε με τον Admim (Hellas DMS)!"
    })
  }

  goToRegistration(){
    this.router.navigate(['registration']);
  }

  clear(){
    this.id = "";
    this.password = ""
  }

  goToForgotPassword(){
    this.router.navigate(['forgotPassword']);
  }
}
