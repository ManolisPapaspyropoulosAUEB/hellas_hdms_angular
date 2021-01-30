import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../services/AuthService.service";
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  name: string = "";
  lastName: string = "";


//lastName
  installerAfm: string = "";


  doy: string = "";
  companyName: string = "";




  installerProffesionalDescription: string= "";
  installerBillingAddressOnly: string = "";
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

  error:string = "";
  nameError:string = "";
  lastnameError:string = "";
  afmError: string = "";
  emailError: string = "";

  nameJustStarted:boolean = true;
  lastNameJustStarted:boolean = true;
  afmJustStarted:boolean = true;
  emailJustStarted:boolean = true;

  constructor(private authService:AuthService,public snackBar: MatSnackBar, private router:Router) {}

  // clear() {
  //   this.name = "";
  //   this.installerAfm = ""
  //   this.installerProffesionalDescription = ""
  //   this.installerBillingAddressOnly = ""
  //   this.installerInsuredAreaAddress = ""
  //   this.installerInsuredAreaCity = ""
  //   this.installerInsuredAreaPostCode = ""
  //   this.installerLandlinePhone = ""
  //   this.fax = ""
  //   this.installerMobilePhone = "";
  //   this.email = ""
  //   this.installerWebsite = ""
  //   this.installerCollectionPolicy = ""
  //   this.emailInvoice = ""
  // }

  register(){
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passesTest = regExp.test(String(this.email).toLowerCase());
    let okay = true;

    if(passesTest == false)
    {
      this.error = "Παρακαλώ εισάγετε μια σωστή διεύθυνση email";
      okay = false;
    }

    if(this.email.trim().length == 0)
    {
      this.emailError = "Υποχρεωτικό πεδίο";
      okay = false;
    }
    else{
      this.emailError = "";
    }

    if(this.installerAfm.trim().length == 0)
    {
      this.afmError = "Υποχρεωτικό πεδίο";
      okay = false;
      console.log("IN YPOXREOTIKO PEDIO");
    }
    else{
      this.afmError = "";
    }

    if(this.name.trim().length == 0)
    {
      this.nameError = "Υποχρεωτικό πεδίο";
      okay = false;
    }

    if(this.lastnameError.trim().length == 0)
    {
      this.lastnameError = "Υποχρεωτικό πεδίο";
      okay = false;
    }

    //lastnameError
    else{
      this.nameError = "";
    }

    if(okay == true)
    {
      this.error = "";
    }

    let data = <any>{};
    data.name = this.name;
    data.installerAfm = this.installerAfm;
    data.installerProffesionalDescription = this.installerProffesionalDescription;
    data.installerInsuredAreaAddress = this.installerInsuredAreaAddress;
    data.installerInsuredAreaCity = this.installerInsuredAreaCity;
    data.installerInsuredAreaPostCode = this.installerInsuredAreaPostCode;
    data.installerLandlinePhone = this.installerLandlinePhone;
    data.fax = this.fax;
    data.doy = this.doy;
    data.companyName = this.companyName;
    data.lastName = this.lastName;
    data.installerMobilePhone = this.installerMobilePhone;
    data.email = this.email;
    data.installerWebsite = this.installerWebsite;
    data.installerCollectionPolicy = this.installerCollectionPolicy;
    data.emailInvoice = this.emailInvoice;
    data.installerBillingAddressOnly = this.installerBillingAddressOnly;


    console.log(data);

    if(okay == true) {
      this.authService.registration({data: data}).subscribe(response => {
        console.log(response);
        if (response.status = "ok") {
          this.snackBar.open("Σας ευχαριστούμε θερμά για το αίτημα εγγραφής. Θα σας ενημερώσουμε σύντομα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      //    window.location.href = 'https://hellasdms.com/el/';
        }
      },
      error => {
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την εγγραφή σας. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      });
    }
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  getEmailStyle(){
    if(this.email.length > 0)
    {
      let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let passesTest = regExp.test(String(this.email).toLowerCase());

      if(passesTest == false){
        this.emailError = "Μη εγκυρή διεύθυνση";
        return {'border':'2px solid rgba(255, 0, 0, 0.8)'};
      }
      else{
        this.emailError = "";
      }
    }
    else if(this.emailJustStarted == false && this.email.length == 0){
      this.emailError = "Υποχρεωτικό πεδίο";
    }

    if(this.emailError.length > 0 && this.emailJustStarted == false)
    {
      return {'border':'2px solid rgba(255, 0, 0, 0.8)'};
    }
  }

  getNameStyle(){
    if(this.name.length == 0 && this.nameJustStarted == false){
      this.nameError =  "Υποχρεωτικό πεδίο";
      return {"border":'2px solid rgba(255, 0, 0, 0.8)'};
    }
    else if(this.name.length > 0)
    {
      this.nameError = "";
    }
  }


  getlastNameStyle(){
    if(this.name.length == 0 && this.lastNameJustStarted == false){
      this.nameError =  "Υποχρεωτικό πεδίο";
      return {"border":'2px solid rgba(255, 0, 0, 0.8)'};
    }
    else if(this.name.length > 0)
    {
      this.nameError = "";
    }
  }

  getAfmStyle(){
    if(this.installerAfm.length == 0 && this.afmJustStarted == false){
      this.afmError = "Υποχρεωτικό πεδίο";
      return {"border":'2px solid rgba(255, 0, 0, 0.8)'};
    }
    else if(this.installerAfm.length > 0)
    {
      this.afmError = "";
    }
  }
}
