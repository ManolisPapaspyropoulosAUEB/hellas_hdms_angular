import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from '../services/DataProvider.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { copyObj } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-installer-view',
  templateUrl: './installer-view.component.html',
  styleUrls: ['./installer-view.component.css']
})
export class InstallerViewComponent implements OnInit {

  data;
  edit:boolean = false;
  copyObject;

  constructor(private route: ActivatedRoute, private dataProvider:DataProvider, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);      
      console.log(this.data);
    });
  }

  isAdmin() {
    return localStorage.getItem('role') == "admin";
  }

  isCC() {
    return localStorage.getItem("role") == "cc";
  }

  isACC() {
    return localStorage.getItem("role") == "acc";
  }

  changeToEdit(){
    this.edit = true;
    this.copyObject = Object.assign({}, this.data);
  }

  cancel(){
    this.edit = false;
    this.data = this.copyObject;
  }

  submit() {
    this.dataProvider.updateProfile({
      userId: this.data.id,
      name: this.data.name,
      installerAfm: this.data.installerAfm,
      installerProffesionalDescription: this.data.installerProffesionalDescription,
      installerInsuredAreaAddress: this.data.installerInsuredAreaAddress,
      installerInsuredAreaCity: this.data.installerInsuredAreaCity,
      installerInsuredAreaPostCode: this.data.installerInsuredAreaPostCode,
      installerLandlinePhone: this.data.installerLandlinePhone,
      installerMobilePhone: this.data.installerMobilePhone,
      fax: this.data.fax,
      email: this.data.email,
      installerWebsite: this.data.installerWebsite,
      installerCollectionPolicy: this.data.installerCollectionPolicy,
      emailInvoice: this.data.emailInvoice,
      billingAddressOnly: this.data.billingAddressOnly,
      active: this.data.active
    }).subscribe(response => {
      console.log(response);
      if (response.status == "ok") {
        this.snackBar.open("Η ενημέρωση έγινε επιτυχώς!", "x", <MatSnackBarConfig>{ duration: 5000 });
        this.edit = false;
      }
      else if (response.status == "error") {
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την ενημέρωση. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      }
    }, error => {
      this.snackBar.open("Προέκυψε κάποιο πρόβλημα κατά την ενημέρωση. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
    });
  }

  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    
    this.router.navigate(['/']);
  }

  goBack(){
    this.router.navigate(['/installers']);
  }
}
