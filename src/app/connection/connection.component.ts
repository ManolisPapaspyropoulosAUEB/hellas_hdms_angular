import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataProvider} from "../services/DataProvider.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {


  connectionInfo=[];
  connectionInfoNetwork=[];
  connectionInfoPots=[];
  constructor(private dataProvider: DataProvider, private router: Router, public snackBar: MatSnackBar, private dialog: MatDialog) {




  }


  ngOnInit() {
    this.dataProvider.getContactsInformationsByType({}).subscribe(response=>{
      if(response.status=='ok'){
        this.connectionInfoNetwork=response.templatesListNetwork;
        this.connectionInfoPots=response.templatesListPots;



      }
    });


  }

  logOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  isAuthenticated(){
    return localStorage.getItem("id") != null;
  }

  goToNewPassword(){
    this.router.navigate(['/changePassword']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  isAdmin(){
    return localStorage.getItem('role') == 'admin';
  }

  isACC(){
    return localStorage.getItem('role') == 'acc';
  }

  isCC(){
    return localStorage.getItem('role') == 'cc';
  }
}
