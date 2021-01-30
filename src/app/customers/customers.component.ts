import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataProvider } from '../services/DataProvider.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatPaginator, MatDialog, MatDialogRef } from "@angular/material";
import { SubmitConfirmationDialog } from '../installers-request-application-view/installers-request-application-view.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CustomersComponent implements OnInit {
  username: number;
  customers: Array<any> = [];

  phoneNotices: Array<{ name: string, phone: string }> = [];
  zones: Array<{ name: string, id: string }> = [];
  alarmUsers: Array<{ name: string, username: string }> = [];

  testDurations: Array<number>;

  index: number = -1;
  newCustomer: boolean = false;

  name: string;
  city: string;
  afm: string;
  areaPhone: string;
  searchTerm: string;

  edit: boolean = false;
  copyCustomer;
  phoneNoticesCopy;
  zonesCopy;
  alarmUsersCopy;
  editIndex: number;

  searchField: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];
  currentPage = 0;
  allRecords = [];

  constructor(private dataProvider: DataProvider, private router: Router, public snackBar: MatSnackBar, private dialog: MatDialog) {
    this.testDurations = Array(25).fill(0).map((x, i) => i);
  }




  ngOnInit() {
    let username = localStorage.getItem('id');
    this.dataProvider.getData({ userId: username }).subscribe(response => {
      this.allRecords = response.customers;
      if (this.allRecords.length > 0) {
        setTimeout(() => {
          this.loadCustomer(0);
          this.editIndex = 0;
        }, 200);
      }
      this.search();
    }, error => {
      this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
    })
  }

  deleteCustomer() {
    const dialogRef = this.dialog.open(DeleteCustomerConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customers[this.index].visible = false;
        this.customers[this.index].lastAction = "D";
        this.customers[this.index].synced = false;

        this.dataProvider.setData({ data: [this.customers[this.index]] }).subscribe(response => {
          if (response.status == "ok") {
            this.snackBar.open("Η διαγραφή έγινε επιτυχώς.", "x", <MatSnackBarConfig>{ duration: 5000 });
            let username = localStorage.getItem('id');
            this.dataProvider.getData({ userId: username }).subscribe(response => {
              this.customers = response.customers;
              this.allRecords = response.customers;
              console.log(this.customers);
              if (this.customers.length > 0) {
                setTimeout(() => {
                  this.loadCustomer(0);
                  this.editIndex = 0;
                }, 200);
              }
              this.search();
            })
          }
          else {
            this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την διαγραφή.", "x", <MatSnackBarConfig>{ duration: 5000 });
          }
        });
      }
    });
  }

  isDraft() {
    if (this.customers[this.index]) {
      return this.customers[this.index].draft == true;
    }
    else {
      return false;
    }
  }

  search() {
    this.dataProvider.getData({ userId: localStorage.getItem("id"), searchField: this.searchField }).subscribe(response => {
      this.length = response.total;
      this.allRecords = response.customers;
      this.currentPage = 0;
      if (this.allRecords.length > 0) {
        this.index = 0;
        setTimeout(() => {
          if (this.customers[this.index].customerConnectionDate) {
            this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format("YYYY-MM-DD");
          }
        }, 0);
        this.iterator();
      }
      else {
        this.customers = [];
        this.index = -1;
      }
    }, error => {
      this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
    })
  }

  onPaginateChange(event) {

    // length: 25
    // pageIndex: 2
    // pageSize: 10
    // previousPageIndex: 1

    // this.currentLength= event.length;
    // this.currentPageIndex=event.pageIndex;
    // this.currentPageSize=event.pageSize;
    // previousPageIndex: 1

    console.log(event);

    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.iterator();
  }

  iterator() {
    let end = (this.currentPage + 1) * this.pageSize;
    let start = this.currentPage * this.pageSize;
    this.customers = this.allRecords.slice(start, end);

    if (this.customers.length > 0) {
      setTimeout(() => {
        if (this.customers[this.index].customerConnectionDate) {
          this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format("YYYY-MM-DD");
        }
      }, 0);
      this.index = 0;
    }
    else {
      this.index = -1;
    }
  }

  loadCustomer(index): void {
    if (this.newCustomer == false) {
      this.index = index;
      this.name = this.customers[index].name;
      this.city = this.customers[index].city;
      this.afm = this.customers[index].afm;
      this.areaPhone = this.customers[index].areaPhone;

      if (moment(this.customers[index].customerConnectionDate).isValid()) {
        this.customers[index].customerConnectionDate = moment(this.customers[index].customerConnectionDate).format("YYYY-MM-DD");
      }

      if (this.index != this.editIndex) {
        this.edit = false;
      }
    } else {
      this.index = index;
      this.edit = false;
      this.cancel();
    }
  }

  addPhoneNotice(): void {

    console.log("gey");

    if (this.edit == true) {
      this.customers[this.index].phoneNotices.push({ name: "", phone: "" });
    }
  }

  removePhoneNotice(index): void {
    this.customers[this.index].phoneNotices.splice(index, 1);
  }

  addZone(): void {
    if (this.edit == true) {
      this.customers[this.index].zones.push({ name: "", idByUser: "" });
    }
  }

  removeZone(index): void {
    this.customers[this.index].zones.splice(index, 1);
  }

  addUser(): void {
    if (this.edit == true) {
      this.customers[this.index].alarmUsers.push({ name: "", username: "" });
    }
  }

  removeUser(index): void {
    this.customers[this.index].alarmUsers.splice(index, 1);
  }

  addNewCustomer(): void {
    this.paginator.lastPage();
    this.newCustomer = true;
    this.customers.push({ subscriberName: "", insuredAreaCity: "", afm: "", telephone: "", phoneNotices: [], zones: [], alarmUsers: [] });
    this.index = this.customers.length - 1;
    this.edit = true;




  }

  saveCustomer(): void {
    if (this.customers[this.index].subscriberName.length == 0) {
      this.snackBar.open("Παρακαλώ προσθέστε επωνυμία ", "x", <MatSnackBarConfig>{ duration: 5000 });
    }
    else if (this.customers[this.index].insuredAreaCity.length == 0) {
      this.snackBar.open("Παρακαλώ προσθέστε πόλη ", "x", <MatSnackBarConfig>{ duration: 5000 });
    }
    else {
      if (this.newCustomer == true) {
        this.customers[this.index].id = Number(localStorage.getItem('id') + "2" + Date.now());
        this.customers[this.index].lastAction = "I";
        this.customers[this.index].userId = localStorage.getItem('id');
        this.customers[this.index].draft = true;
        this.customers[this.index].enabled = true;
        this.customers[this.index].visible = true;

        let date = new Date();
        if (moment(this.customers[this.index].customerConnectionDate).isValid()) {
          this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format('YYYY-MM-DD');
        }
        else {
          this.customers[this.index].customerConnectionDate = '';
        }
        this.customers[this.index].updateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.customers[this.index].creationDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.customers[this.index].datePublished = moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.dataProvider.setData({ data: [this.customers[this.index]] }).subscribe(response => {
          console.log(response);
          if (response.status == "ok") {
            this.edit = false;
            this.snackBar.open("Επιτυχής αποθήκευση.", "x", <MatSnackBarConfig>{ duration: 5000 });
            this.newCustomer = false;
          }
          else if (response.status == "error") {
            this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
          }
        }, error => {
          this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
        });
      }
      else {
        this.customers[this.index].lastAction = "U";
        this.customers[this.index].draft = true;
        this.customers[this.index].enabled = true;
        this.customers[this.index].visible = true;

        let date = new Date();
        if (moment(this.customers[this.index].customerConnectionDate).isValid()) {
          this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format('YYYY-MM-DD');
        }
        else {
          this.customers[this.index].customerConnectionDate = '';
        }
        this.customers[this.index].updateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        this.dataProvider.setData({ data: [this.customers[this.index]] }).subscribe(response => {
          console.log(response);
          if (response.status == "ok") {
            this.edit = false;
            this.snackBar.open("Επιτυχής αποθήκευση.", "x", <MatSnackBarConfig>{ duration: 5000 });
          }
          else if (response.status == "error") {
            this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
          }
        },
          error => {
            this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
          });
      }
    }
  }

  submitCustomer() {
    if (this.customers[this.index].subscriberName.length == 0) {
      this.snackBar.open("Παρακαλώ προσθέστε επωνυμία ", "x", <MatSnackBarConfig>{ duration: 5000 });
    }
    else if (this.customers[this.index].insuredAreaCity.length == 0) {
      this.snackBar.open("Παρακαλώ προσθέστε πόλη ", "x", <MatSnackBarConfig>{ duration: 5000 });
    }
    else {

      const dialogRef = this.dialog.open(SubmitConfirmationDialog, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.newCustomer == true) {
            this.customers[this.index].id = Number(localStorage.getItem('id') + "2" + Date.now());
            this.customers[this.index].lastAction = "I";
            this.customers[this.index].userId = localStorage.getItem('id');
            this.customers[this.index].draft = false;
            this.customers[this.index].enabled = true;
            this.customers[this.index].visible = true;

            let date = new Date();
            if (moment(this.customers[this.index].customerConnectionDate).isValid()) {
              this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format('YYYY-MM-DD');
            }
            else {
              this.customers[this.index].customerConnectionDate = '';
            }
            this.customers[this.index].updateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            this.customers[this.index].creationDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            this.customers[this.index].datePublished = moment(date).format('YYYY-MM-DD HH:mm:ss');
            this.dataProvider.setData({ data: [this.customers[this.index]] }).subscribe(response => {
              console.log(response);
              if (response.status == "ok") {
                this.edit = false;
                this.snackBar.open("Τα στοιχεία σας υποβλήθηκαν επιτυχώς.", "x", <MatSnackBarConfig>{ duration: 5000 });
                this.newCustomer = false;
              }
              else if (response.status == "error") {
                this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
              }
            }, error => {
              this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
            });
          }
          else {
            this.customers[this.index].lastAction = "U";
            this.customers[this.index].draft = false;
            this.customers[this.index].enabled = true;
            this.customers[this.index].visible = true;

            let date = new Date();
            if (moment(this.customers[this.index].customerConnectionDate).isValid()) {
              this.customers[this.index].customerConnectionDate = moment(this.customers[this.index].customerConnectionDate).format('YYYY-MM-DD');
            }
            else {
              this.customers[this.index].customerConnectionDate = '';
            }
            this.customers[this.index].updateDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            this.dataProvider.setData({ data: [this.customers[this.index]] }).subscribe(response => {
              console.log(response);
              if (response.status == "ok") {
                this.edit = false;
                this.snackBar.open("Τα στοιχεία σας υποβλήθηκαν επιτυχώς.", "x", <MatSnackBarConfig>{ duration: 5000 });
              }
              else if (response.status == "error") {
                this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
              }
            },
              error => {
                this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
              });
          }
        }
      });
    }
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  isAdmin() {
    if (localStorage.getItem('role') == 'admin') {
      return true;
    }
    return false;
  }

  changeToEdit() {
    this.edit = true;
    this.editIndex = this.index;
    this.copyCustomer = Object.assign({}, this.customers[this.index]);

    this.phoneNoticesCopy = this.customers[this.index].phoneNotices.slice();
    this.zonesCopy = this.customers[this.index].zones.slice();
    this.alarmUsersCopy = this.customers[this.index].alarmUsers.slice();
  }

  cancel() {
    this.edit = false;
    if (this.newCustomer == false) {
      this.customers[this.index] = this.copyCustomer;
      this.customers[this.index].phoneNotices = this.phoneNoticesCopy;
      this.customers[this.index].zones = this.zonesCopy;
      this.customers[this.index].alarmUsers = this.alarmUsersCopy;
    }
    else {
      if (this.index == this.customers.length - 1) {
        this.index = 0;
      }
      this.customers.pop();
      this.newCustomer = false;
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToNewPassword() {
    this.router.navigate(['/changePassword']);
  }
}

@Component({
  selector: 'delete-customer-confirmation-dialog',
  templateUrl: 'delete-customer-confirmation-dialog.html',
  styleUrls: ['./delete-customer-confirmation-dialog.css']
})
export class DeleteCustomerConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<DeleteCustomerConfirmationDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
