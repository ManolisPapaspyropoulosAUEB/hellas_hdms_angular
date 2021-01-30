import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DataProvider } from '../services/DataProvider.service';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  error: string = "";

  constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthService, private dataProvider: DataProvider) {
  }

  ngOnInit() {
  }

  setNewPassword() {
    this.authService.logIn({ "userId": localStorage.getItem("id"), "pwd": this.oldPassword }).subscribe(response => {
      console.log(response);

      if (response.status == "ok") {
        if (this.newPassword != this.confirmPassword) {
          this.error = "Οι νέοι κωδικοί δεν είναι οι ίδιοι";
        }
        else {
          this.error = "";
          this.dataProvider.updateInstallerPwd({ "userId": localStorage.getItem("id"), "pwd": this.newPassword }).subscribe(response => {
            if (response.status == "ok") {
              this.snackBar.open("Ο κωδικός σας άλλαξε επιτυχώς", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
            else{
              this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την ενημέρωση!", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
          });
        }
      } else if (response.status == "invalidCredentials") {
        this.error = "Ο κωδικός που βάλατε δεν είναι σωστός";
      }
    })
  }

  isAuthenticated() {
    return localStorage.getItem("id") != null;
  }

  isAdmin() {
    return localStorage.getItem("id") == "admin";
  }

  isACC() {
    return localStorage.getItem("id") == "acc";
  }

  isCC() {
    return localStorage.getItem("id") == "cc";
  }

  goToProfile() {
    this.router.navigate(['./profile']);
  }

  logOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['./login']);
  }
}
