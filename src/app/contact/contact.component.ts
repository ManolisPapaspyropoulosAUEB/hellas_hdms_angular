import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../services/DataProvider.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message: string = "";

  constructor(private dataProvider: DataProvider, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    let id = localStorage.getItem("id");
    if (this.message.length > 0) {
      this.dataProvider.sendMessage({ "userId": Number(id), message: this.message }).subscribe(response => {
        if (response.status == "ok") {
          this.snackBar.open("Το μήνυμα σας απεστάλλη επιτυχώς!", "x", <MatSnackBarConfig>{ duration: 5000 });
          this.message = "";
        }
        else if (response.status == "error") {
          this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την αποστολή του μυνήματος! Παρακαλώ προσπαθήστε ξανά.", "x", <MatSnackBarConfig>{ duration: 5000 });
        }
      });
    }else{
      this.snackBar.open("Παρακαλώ εισάγετε το μήνυμα σας για αποστολή!", "x", <MatSnackBarConfig>{ duration: 5000 });
    }
  }

  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    this.router.navigate(['/'])
  }

  isAdmin() {
    return localStorage.getItem('role') == 'admin';
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToChangePassword() {
    this.router.navigate(['/changePassword'])
  }

  isACC(){
    return localStorage.getItem('role') == 'acc';
  }

  isCC(){
    return localStorage.getItem('role') == 'cc';
  }
}
