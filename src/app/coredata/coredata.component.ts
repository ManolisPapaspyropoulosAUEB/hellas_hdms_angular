import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {DataProvider} from "../services/DataProvider.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-coredata',
  templateUrl: './coredata.component.html',
  styleUrls: ['./coredata.component.css']
})
export class CoredataComponent implements OnInit {

  addRecord;
  editForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
               private dataProvider: DataProvider, private router: Router,  public snackBar: MatSnackBar, private dialog: MatDialog) {
  }



    contactInformations = [];

  title = '';
  primary = '';
  portPrimary = '';
  secondary = '';
  portSecondary = '';
  type = '';
  editRowTable = [];

  ngOnInit() {

    this.addRecord = false;


    this.getContactsInformations();


    this.editForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        primary: ['', Validators.required],
        portPrimary: ['', Validators.required],
        secondary: ['', Validators.required],
        portSecondary: ['', [Validators.required]],
        type: ['', [Validators.required]]
      }
    );

  }

  public getContactsInformations() {
    this.dataProvider.getContactsInformations({}).subscribe(response => {

      if (response.status == 'ok') {
        this.contactInformations = response.data;

        for (let i = 0; i < this.contactInformations.length; i++) {
          this.editRowTable[i] = false;
        }


      } else {
        console.log("error occured");
      }


    });
  }

  public getContactsInformationsNoIndex() {
    this.dataProvider.getContactsInformations({}).subscribe(response => {

      if (response.status == 'ok') {
        this.contactInformations = response.data;




      } else {
        console.log("error occured");
      }


    });
  }




  get f() {
    return this.editForm.controls;
  }

  onSubmit() {

    if (this.editForm.invalid) {
      return;
    }


    let resultObject = {
      title: this.f.title.value,
      primary: this.f.primary.value,
      portPrimary: this.f.portPrimary.value,
      secondary: this.f.secondary.value,
      portSecondary: this.f.portSecondary.value,
      type: this.f.type.value

    };


  }


  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
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


  addContactInformation() {

    console.log("hey");
    console.log(this.addRecord);


    this.addRecord = true;


  }

  editRow(index: number) {
    this.editRowTable[index] = true;
  }


  cancel(index: number) {
    this.dataProvider.getContactsInformations({}).subscribe(response => {


      this.contactInformations = response.data;
      this.editRowTable[index] = false;


    });
  }


  addContactInformationWS() {


    let resultObject = {
      title: this.title,
      primary: this.primary,
      portPrimary: this.portPrimary,
      secondary: this.secondary,
      portSecondary: this.portSecondary,
      type: this.type

    };
    console.log(resultObject);


    if (this.title == '') {
      this.snackBar.open("Παρακαλώ προσθέστε Τίτλο ", "x", <MatSnackBarConfig>{duration: 5000});
      return;
    }


    if (this.primary == '') {

      this.snackBar.open("Παρακαλώ συμπληρώστε το πεδίο Primary ", "x", <MatSnackBarConfig>{duration: 5000});
      return;

    }


    if (this.portPrimary == '') {

      this.snackBar.open("Παρακαλώ συμπληρώστε το πεδίο portPrimary ", "x", <MatSnackBarConfig>{duration: 5000});
      return;


    }


    if (this.secondary == '') {

      this.snackBar.open("Παρακαλώ συμπληρώστε το πεδίο secondary ", "x", <MatSnackBarConfig>{duration: 5000});
      return;


    }

    if (this.type == '') {

      this.snackBar.open("Παρακαλώ συμπληρώστε το πεδίο type ", "x", <MatSnackBarConfig>{duration: 5000});
      return;

    }

    this.dataProvider.addContactInformation(resultObject).subscribe(response => {

      if (response.status == 'ok') {
        this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
        this.getContactsInformations();

        this.title = '';
        this.primary = '';
        this.portPrimary = '';
        this.secondary = '';
        this.portSecondary = '';
        this.type = '';


      } else {
        this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
      }


    })


    // this.addRecord=false;


  }

  cancelNewRecord() {
    this.addRecord = false;
  }

  updateContact(cinfo) {

    this.dataProvider.updateContactInformation(cinfo).subscribe(response => {
      if (response.status == 'ok') {
        this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
         this.getContactsInformationsNoIndex();
      } else {
        this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
      }

    })
  }



  deleteContact(ci: any) {

    const dialogRef = this.dialog.open(DeleteCoreDataInfoDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {


        this.dataProvider.deleteContactInformation(ci).subscribe(response => {
          if (response.status == 'ok') {
            this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
            this.getContactsInformations();


          } else {
            this.snackBar.open(response.message, "x", <MatSnackBarConfig>{duration: 5000});
          }

        })




      }
    });








  }
}


@Component({
  selector: 'delete-core-data-dialog',
  templateUrl: 'delete-core-data-dialog.html',
  styleUrls: ['./delete-core-data-dialog.css']
})
export class DeleteCoreDataInfoDialog {

  constructor(public dialogRef: MatDialogRef<DeleteCoreDataInfoDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
