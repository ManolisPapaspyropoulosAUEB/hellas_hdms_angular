import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DataProvider } from '../services/DataProvider.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = "";
  error: string = "";

  constructor(private snackBar: MatSnackBar, private router: Router, private dataProvider:DataProvider) {
  }

  ngOnInit() {
  }

  submit() {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passedTest = regex.test(String(this.email).toLowerCase());

    if (passedTest == true) {
      this.dataProvider.checkEmailIfExist({"email":this.email}).subscribe(response => {
        console.log(response)
        if(response.status == "ok")
        {
          this.error = "";
          this.snackBar.open("Παρακαλώ ελέξτε το email σας όπου θα σας αποσταλεί ο κωδικός πρόσβασης.", "x", <MatSnackBarConfig>{ duration: 5000 });
          this.goToLogin();
        }
        else if(response.status == "error"){
          this.error = "O λογαριασμός αυτός δεν υπάρχει.";
        }
        else if(response.status == "inactive"){
          this.error = "O λογαριασμός είναι ανενεργός.";
        }                 
      },
      error => {
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      })
    }
    else {
      this.error = "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email!";
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
