import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../services/DataProvider.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  error: string = "";
  edit: boolean = false;
  emailError = "";

  name: string = "";  //last_name
  companyName: string = "";  //companyName
  lastName: string = "";  //last_name
  installerAfm: string = "";
  doy: string = "";




  installerProffesionalDescription: string = "";
  installerInsuredAreaAddress: string = "";
  installerInsuredAreaCity: string = "";
  installerInsuredAreaPostCode: string = "";
  installerLandlinePhone: string = "";
  fax: string = "";
  installerMobilePhone: string = "";
  email: string = "";
  installerWebsite: string = "";
  installerCollectionPolicy: string = "";
  emailInvoice: string = "";
  installerBillingAddressOnly: string = "";

  copyName: string = "";
  copyAfm: string = "";
  copyProffesionalDescription: string = "";
  copyIstallerInsuredAreaAddress: string = "";
  copyInstallerInsuredAreaCity: string = "";
  copyInstallerInsuredAreaPostCode: string = "";
  copyInstallerLandlinePhone: string = "";
  copyFax: string = "";
  copyInstallerMobilePhone: string = "";
  copyEmail: string = "";
  copyInstallerWebsite: string = "";
  copyInstallerCollectionPolicy: string = "";
  copyEmailInvoice: string = "";
  copyInstallerBillingAddressOnly: string = "";

  constructor(private router: Router, private dataProvider: DataProvider, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataProvider.getProfile({ "userId": Number(localStorage.getItem("id")) }).subscribe(response => {
      console.log(response);

      this.name = response.data[0].name;
      this.lastName = response.data[0].lastName;
      this.installerAfm = response.data[0].installerAfm;
      this.installerProffesionalDescription = response.data[0].installerProffesionalDescription;
      this.installerInsuredAreaAddress = response.data[0].installerInsuredAreaAddress;
      this.installerInsuredAreaCity = response.data[0].installerInsuredAreaCity;
      this.installerInsuredAreaPostCode = response.data[0].installerInsuredAreaPostCode;
      this.installerLandlinePhone = response.data[0].installerLandlinePhone;
      this.installerMobilePhone = response.data[0].installerMobilePhone;
      this.fax = response.data[0].fax;
      this.doy = response.data[0].doy;

      this.email = response.data[0].email;
      this.installerWebsite = response.data[0].installerWebsite;
      this.installerCollectionPolicy = response.data[0].installerCollectionPolicy;
      this.emailInvoice = response.data[0].emailInvoice;
      this.installerBillingAddressOnly = response.data[0].billingAddressOnly;
      this.companyName = response.data[0].companyName;

      this.copyName = this.name;
      this.copyAfm = this.installerAfm;
      this.copyProffesionalDescription = this.installerProffesionalDescription;
      this.copyIstallerInsuredAreaAddress = this.installerInsuredAreaAddress;
      this.copyInstallerInsuredAreaCity = this.installerInsuredAreaCity;
      this.copyInstallerInsuredAreaPostCode = this.installerInsuredAreaPostCode;
      this.copyInstallerLandlinePhone = this.installerLandlinePhone;
      this.copyFax = this.fax;
      this.copyInstallerMobilePhone = this.installerMobilePhone;
      this.copyEmail = this.email;
      this.copyInstallerWebsite = this.installerWebsite;
      this.copyInstallerCollectionPolicy = this.installerCollectionPolicy;
      this.copyEmailInvoice = this.emailInvoice;
      this.copyInstallerBillingAddressOnly = this.installerBillingAddressOnly;

    });
  }

  isAuthenticated() {
    return localStorage.getItem("id") != null;
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  saveProfile() {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passedTest = regex.test(String(this.email).toLowerCase());

    if (this.email == "") {
      passedTest = true;
    }

    if (passedTest == true) {
      this.error = "";
      this.dataProvider.updateProfile({
        userId: Number(localStorage.getItem('id')),
        name: this.name,
        installerAfm: this.installerAfm,
        installerProffesionalDescription: this.installerProffesionalDescription,
        installerInsuredAreaAddress: this.installerInsuredAreaAddress,
        installerInsuredAreaCity: this.installerInsuredAreaCity,
        installerInsuredAreaPostCode: this.installerInsuredAreaPostCode,
        installerLandlinePhone: this.installerLandlinePhone,
        installerMobilePhone: this.installerMobilePhone,

        lastName: this.lastName,
        doy: this.doy,
        companyName: this.companyName,





        fax: this.fax,
        email: this.email,
        installerWebsite: this.installerWebsite,
        installerCollectionPolicy: this.installerCollectionPolicy,
        emailInvoice: this.emailInvoice,
        billingAddressOnly: this.installerBillingAddressOnly,
        active: 1
      }).subscribe(response => {
        console.log(response);

        if (response.status == "ok") {
          this.snackBar.open("Η ενημέρωση έγινε με επιτυχία", "x", <MatSnackBarConfig>{ duration: 5000 });
          this.edit = false;
        }
        else {
          this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την ενημέρωση. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
        }
      });
    } else {
      this.error = "Παρακαλώ εισάγετε μία έγκυρη διεύθυνση email."
    }
  }

  changeToEdit() {
    this.edit = true;
  }

  isAdmin() {
    return localStorage.getItem('role') == 'admin';
  }

  getEmailStyles() {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passedTest = regex.test(String(this.email).toLowerCase());

    if (this.email == "") {
      passedTest = true;
    }

    if (passedTest == false) {
      this.error = "Παρακαλώ εισάγετε μία έγκυρη διεύθυνση email";
      return { 'border-bottom': '3px solid red' };
    }
    else {
      this.error = "";
    }
  }

  cancel() {
    this.edit = false;

    this.name = this.copyName;
    this.installerAfm = this.copyAfm;
    this.installerProffesionalDescription = this.copyProffesionalDescription;
    this.installerInsuredAreaAddress = this.copyIstallerInsuredAreaAddress;
    this.installerInsuredAreaCity = this.copyInstallerInsuredAreaCity;
    this.installerInsuredAreaPostCode = this.copyInstallerInsuredAreaPostCode;
    this.installerLandlinePhone = this.copyInstallerLandlinePhone;
    this.installerMobilePhone = this.copyInstallerMobilePhone;
    this.fax = this.copyFax;
    this.email = this.copyEmail;
    this.installerWebsite = this.copyInstallerWebsite;
    this.installerCollectionPolicy = this.copyInstallerCollectionPolicy;
    this.emailInvoice = this.copyEmailInvoice;
    this.installerBillingAddressOnly = this.copyInstallerBillingAddressOnly;
  }

  isACC(){
    return localStorage.getItem("role") == "acc";
  }

  isCC(){
    return localStorage.getItem("role") == "cc";
  }

  goToChangePassword(){
    this.router.navigate(['./changePassword']);
  }
}
