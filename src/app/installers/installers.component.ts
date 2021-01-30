import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataProvider } from "../services/DataProvider.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-installers',
  templateUrl: './installers.component.html',
  styleUrls: ['./installers.component.css']
})
export class InstallersComponent implements OnInit {
  searchField: string = "";

  installers: Array<any> = [];

  active: boolean = true;
  inactive: boolean = false;
  firstTime: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  allRecords = [];
  currentPage: number = 0;

  constructor(private dataProvider: DataProvider, public snackBar: MatSnackBar, private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.search();
  }

  isAdmin() {
    return localStorage.getItem("role") == "admin";
  }

  isACC() {
    return localStorage.getItem("role") == "acc";
  }

  isCC() {
    return localStorage.getItem("role") == "cc";
  }

  activeInstaller(installer, active) {
    let role = localStorage.getItem("role")

    if (role == "admin") {

      if (active == true) {
        const dialogRef = this.dialog.open(ActivationConfirmationDialog, {
          width: '600px',
          height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            let data = <any>{};
            data.userId = installer.id;
            data.active = active;
            installer.active = active;
            this.dataProvider.setActive({ data: data }).subscribe(response => {
              console.log(response);
              if (response.status = "ok") {
                this.dataProvider.getInstallers({ userId: localStorage.getItem('id') }).subscribe(response => {
                  this.installers = response.data;
                })
                if (active == true) {
                  this.snackBar.open("Η ενεργοποίηση του εγκαταστάτη έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
                }
                else {
                  this.snackBar.open("Η απενεργοποίηση του εγκαταστάτη έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
                }
              }
            });
          }
        });
      }
      else {
        const dialogRef = this.dialog.open(DeactivationConfirmationDialog, {
          width: '600px',
          height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            let data = <any>{};
            data.userId = installer.id;
            data.active = active;
            installer.active = active;
            this.dataProvider.setActive({ data: data }).subscribe(response => {
              console.log(response);
              if (response.status = "ok") {

                this.dataProvider.getInstallers({ userId: localStorage.getItem('id') }).subscribe(response => {
                  this.installers = response.data;
                })

                if (active == true) {
                  this.snackBar.open("Η ενεργοποίηση του εγκαταστάτη έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
                }
                else {
                  this.snackBar.open("Η απενεργοποίηση του εγκαταστάτη έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
                }
              }
            });
          }
        });
      }
    }
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  getFilterResults() {
    let temp = [];
    for (let installer of this.installers) {
      if (this.active == true && installer.active == 1 && installer.firstTime == false) {
        temp.push(installer);
      }

      if (this.inactive == true && installer.active == 0 && installer.firstTime == false) {
        temp.push(installer);
      }

      if (this.firstTime == true && installer.firstTime == true) {
        temp.push(installer);
      }
    }
    return temp;
  }

  search() {
    this.dataProvider.getInstallers({ "searchField": this.searchField }).subscribe(response => {
      this.length = response.total;
      this.allRecords = response.data;
      this.iterator();
    },
      error => {
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      })
  }

  onPaginateChange(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.iterator();
  }

  iterator() {
    let end = (this.currentPage + 1) * this.pageSize;
    let start = this.currentPage * this.pageSize;
    this.installers = this.allRecords.slice(start, end);
  }

  loadInstaller(installer) {
    this.router.navigate(["./installerView"], { relativeTo: this.activatedRoute, queryParams: { "data": JSON.stringify(installer) }, skipLocationChange: true });
  }
}

@Component({
  selector: 'activation-confirmation-dialog',
  templateUrl: 'activation-confirmation-dialog.html',
})
export class ActivationConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<ActivationConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ok() {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'deactivation-confirmation-dialog',
  templateUrl: 'deactivation-confirmation-dialog.html',
})
export class DeactivationConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<DeactivationConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ok() {
    this.dialogRef.close(true);
  }
}
