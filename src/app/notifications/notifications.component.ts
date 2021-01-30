import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DataProvider } from '../services/DataProvider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  message: string = "";
  title: string = "";

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dataProvider: DataProvider, private router: Router) { }

  ngOnInit() {
  }

  isAdmin() {
    return localStorage.getItem("role") == "admin";
  }

  isCC() {
    return localStorage.getItem("role") == "cc";
  }

  isACC() {
    return localStorage.getItem("role") == "acc";
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  goToChangePassword() {
    this.router.navigate(['/changePassword'])
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  sendMessage() {
    let body = {
      "to": "/topics/all",
      "collapse_key": "type_a",
      "notification": {
        "body": this.message,
        "content_available": true,
        "priority": "high",
        "title": this.title,
      },
      "data": {
        "body": this.message,
        "content_available": true,
        "priority": "high",
        "title": this.title,
      }
    }

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post("https://fcm.googleapis.com/fcm/send", body, {
      headers: options.set('Authorization', 'key=AIzaSyD9agVzryunatkzQoBZjWxOnT8PXYk-Ifk'),
    })
      .subscribe((response: any) => {
        if (response.message_id) {
          this.dataProvider.insertNotification({ title: this.title, content: this.message }).subscribe(response => {
            console.log(response);
            if (response.status == "ok") {
              this.snackBar.open("Η ειδοποίηση εστάλη με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
              this.message = "";
              this.title = "";
            }
          })
        }
        else {
          this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα", "x", <MatSnackBarConfig>{ duration: 5000 });
        }
      }, error => {
        console.log(error);
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα", "x", <MatSnackBarConfig>{ duration: 5000 });
      });
  }
}
