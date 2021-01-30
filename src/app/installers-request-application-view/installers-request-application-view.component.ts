import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from '../services/DataProvider.service';
import { MatSnackBarConfig, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-installers-request-application-view',
  templateUrl: './installers-request-application-view.component.html',
  styleUrls: ['./installers-request-application-view.component.css']
})
export class InstallersRequestApplicationViewComponent implements OnInit {
  data: any;
  testDurations = [];
  edit:boolean = false;
  index:number = -1;

  copyObject;
  role: string;

  constructor(private route: ActivatedRoute, private dataProvider: DataProvider, private snackBar: MatSnackBar, private router: Router,
    private dialog:MatDialog) { }

  ngOnInit() {

    console.log(this.data);
    this.role = localStorage.getItem('role');

    this.testDurations = Array(25).fill(0).map((x, i) => i);
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);

      console.log("DATA PASSED:", this.data);

      if (moment(this.data.customers.customerConnectionDate).isValid()) {
        this.data.customers.customerConnectionDate = moment(this.data.customers.customerConnectionDate).format("YYYY-MM-DD");
      }
      else {
        this.data.customers.customerConnectionDate = "";
      }

      console.log("CUSTOMER STATUS", this.data.customers.status);
    });
  }

  isAuthenticated() {
    return localStorage.getItem("id") != null;
  }

  isAdmin() {
    return localStorage.getItem("role") == "admin";
  }

  changeToEdit() {
    this.edit = true;
    this.copyObject = Object.assign({}, this.data);
    console.log(this.data);

    // console.log("COPY OBJECT" ,this.copyObject);

    // this.copyObject.customers.alarmUsers = [];
    // this.copyObject.customers.zones = [];
    // this.copyObject.customers.phoneNotices = [];

    // let counter = 0;
    // for (let alarmUser of this.data.customers.alarmUsers) {
    //   this.copyObject.customers.alarmUsers[counter] = Object.assign({}, alarmUser);
    //   counter += 1;
    // }

    // counter = 0;
    // for (let zone of this.data.customers.zones) {
    //   this.copyObject.customers.zones[counter] = Object.assign({}, zone);
    //   counter += 1;
    // }

    // counter = 0;
    // for (let phoneNotice of this.data.customers.phoneNotices) {
    //   this.copyObject.customers.phoneNotices[counter] = Object.assign({}, phoneNotice);
    //   counter += 1;
    // }
    // console.log("COPY OBJECT" ,this.copyObject);
  }

  cancel() {
    this.edit = false;
    this.data = this.copyObject;
  }

  save() {
    this.data.customers.lastAction = "U";
    this.data.customers.userId = this.data.installerId;
    this.data.customers.id = this.data.id;

    let status = this.data.customers.status;
    if (status == 'OPEN') {
      status = "IN PROGRESS";
      this.data.customers.status = status;
    }

    let role = localStorage.getItem('role');

    this.dataProvider.setDataCC({ "data": [this.data.customers] }).subscribe(response => {
      console.log(response);

      if (response.status == "ok") {
        this.snackBar.open("Η ενημέρωση έγινε με επιτυχία", "x", <MatSnackBarConfig>{ duration: 5000 });
        this.edit = false;
      }
      else if (response.status == "error") {
        this.snackBar.open("Προέκυψε κάποιο τεχνικό πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      }
    },
      error => {
        this.snackBar.open("Προέκυψε κάποιο τεχνικό πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      }
    )
  }

  submit() {
    let role = localStorage.getItem("role");

    const dialogRef = this.dialog.open(SubmitConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (role == 'cc') {
          let temp = { "id": this.data.id, "status": "SUBMITTED" }
          this.dataProvider.changeStatus(temp).subscribe(response => {
            if (response.status == "ok") {
              this.snackBar.open("Η υποβολή έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
            else if (response.status == "error") {
              this.snackBar.open("Προέκυψε κάποιο πρόβλημα με την υποβολή. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
          },
            error => {
              console.log(error);
              this.snackBar.open("Προέκυψε κάποιο τεχνικό πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
            })
        }
        else if (role == 'acc') {
          let temp = { "id": this.data.id, "status": "COMPLETED" }
          this.dataProvider.changeStatus(temp).subscribe(response => {
            if (response.status == "ok") {
              this.snackBar.open("Η υποβολή έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
            else if (response.status == "error") {
              this.snackBar.open("Προέκυψε κάποιο πρόβλημα με την υποβολή. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
            }
          },
            error => {
              console.log(error);
              this.snackBar.open("Προέκυψε κάποιο τεχνικό πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
            })
        }
      }
    });
  }

  addUser() {
    if (this.edit == true) {
      this.data.customers.alarmUsers.push({ name: "", username: "" });
    }
  }

  removeUser(index) {
    this.data.customers.alarmUsers.splice(index, 1);
  }

  addZone() {
    if (this.edit == true) {
      this.data.customers.zones.push({ name: "", idByUser: "" });
    }
  }

  removeZone(index) {
    this.data.customers.zones.splice(index, 1);
  }

  addPhoneNotice(): void {
    if (this.edit == true) {
      this.data.customers.phoneNotices.push({ name: "", phone: "" });
    }
  }

  removePhoneNotice(index): void {
    this.data.customers.phoneNotices.splice(index, 1);
  }

  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    this.router.navigate(['/']);
  }

  isCC() {
    return localStorage.getItem("role") == "cc";
  }

  isACC() {
    return localStorage.getItem("role") == "acc";
  }

  goBack(){
    this.router.navigate(['/installersRequests'])
  }

  isSubmitted(){
    return this.data.customers.status == "SUBMITTED";
  }
}

@Component({
  selector: 'submit-confirmation-dialog',
  templateUrl: 'submit-confirmation-dialog.html',
  styleUrls:['./submit-confirmation-dialog.css']
})
export class SubmitConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<SubmitConfirmationDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
