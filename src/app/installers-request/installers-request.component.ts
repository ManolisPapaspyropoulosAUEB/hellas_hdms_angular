import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RemoteDataService } from '../services/RemoteDataService.service';
import { DataProvider } from '../services/DataProvider.service';
import { MatSnackBar, MatSnackBarConfig, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-installers-request',
  templateUrl: './installers-request.component.html',
  styleUrls: ['./installers-request.component.css']
})
export class InstallersRequestComponent implements OnInit {

  open: boolean = true;
  inProgress: boolean = true;
  submitted: boolean = false;

  installerSearch: true;
  customerSearch: false;

  searchTerm: string = "";
  searchItem: string = "installerSearch";

  edit: boolean = false;
  selectedIndex: number;
  index = -1;
  testDurations = [];

  customerAuxiliaryPass: string;
  customerConnectionDate: string;
  customerInsuredAreaCity: string;
  customerInsuredAreaAddress: string;
  customerInsuredAreaPostCode: string;
  customerInsuredAreaFloor: string;
  customerInsuredAreaType: string;
  customerInsuredAreaTypeOther: string;
  phoneNotices = [];
  zones = [];
  alarmUsers = [];
  customerDirectTransmissionPhones: string;
  customerOtherRemarks: string;
  customerPass: string;
  customerDuressCode: string;
  customerSubscriberName: string;
  customerAreaPhone: string;
  customerAfm: string;
  customerInsuredAreaDescription: string;
  customerAlarmUnitType: string;
  customerFormat: string;
  customerFrequency24HourTest: string;
  customerWeeklyTimeMonitoring: string;
  customerOperationControllHours: string;
  customerPoliceStation: string;
  customerMonthlyAlarmList: string;

  copyCustomerAuxiliaryPass: string;
  copyCustomerConnectionDate: string;
  copyCustomerInsuredAreaCity: string;
  copyCustomerInsuredAreaAddress: string;
  copyCustomerInsuredAreaPostCode: string;
  copyCustomerInsuredAreaFloor: string;
  copyCustomerInsuredAreaType: string;
  copyCustomerInsuredAreaTypeOther: string;
  copyPhoneNotices = [];
  copyZones = [];
  copyAlarmUsers = [];
  copyCustomerDirectTransmissionPhones: string;
  copyCustomerOtherRemarks: string;
  copyCustomerPass: string;
  copyCustomerDuressCode: string;
  copyCustomerSubscriberName: string;
  copyCustomerAreaPhone: string;
  copyCustomerAfm: string;
  copyCustomerInsuredAreaDescription: string;
  copyCustomerAlarmUnitType: string;
  copyCustomerFormat: string;
  copyCustomerFrequency24HourTest: string;
  copyCustomerWeeklyTimeMonitoring: string;
  copyCustomerOperationControllHours: string;
  copyCustomerPoliceStation: string;
  copyCustomerMonthlyAlarmList: string;

  applications = [];
  allRecords = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];

  filter = <any>{};

  currentPage: number = 0;

  constructor(private router: Router, private dataProvider: DataProvider, private snackBar: MatSnackBar, private activatedRoute:ActivatedRoute) {
    this.testDurations = Array(25).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    if (localStorage.getItem('role') == "acc") {
      this.open = false;
      this.inProgress = false;
      this.submitted = true;
    }
    this.search();
  }

  search() {
    this.filter = { "open": this.open, "inProgress": this.inProgress, "submitted": this.submitted, "installer": this.searchItem == 'installerSearch' ? true : false, "customer": this.searchItem == 'customerSearch' ? true : false, "search": this.searchTerm }
    let role = localStorage.getItem('role');

    if (role == "acc") {
      this.filter.open = false;
      this.filter.inProgress = false;
      this.filter.submitted = true;

      if (this.submitted == false) {
        this.filter.submitted = false;
      }

      if (this.open == true) {
        this.filter.open = true;
      }

      if (this.inProgress == true) {
        this.filter.inProgress = true;
      }
    }

    this.dataProvider.getInstallersDataCc(this.filter).subscribe(response => {
      console.log("response", response);

      this.length = response.total;
      console.log(this.length);

      this.allRecords = response.data;
      this.iterator();
    },
      error => {
        this.snackBar.open("Προέκυψε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.", "x", <MatSnackBarConfig>{ duration: 5000 });
      })
  }

  isAuthenticated() {
    return localStorage.getItem("id") != null;
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

  changeToEdit() {
    this.edit = true
  }

  cancel() {
    this.edit = false;
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    this.router.navigate(['/']);
  }

  loadRecord(index) {
    console.log("IN LOAD RECORD");
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify(this.applications[index])
      },
    };

    this.router.navigate(["./installersRequestsData"], { relativeTo: this.activatedRoute,queryParams: { "data": JSON.stringify(this.applications[index]) }, skipLocationChange: true });
  }

  onPaginateChange(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.iterator();
  }

  iterator() {
    let end = (this.currentPage + 1) * this.pageSize;
    let start = this.currentPage * this.pageSize;
    console.log("START", start);
    console.log("END", end);
    this.applications = this.allRecords.slice(start, end);
    console.log("APPLICATIONS", this.applications);
  }

  getStatusStyle(status) {
    if (status == "OPEN") {
      return { 'color': 'green' };
    }
    else if (status == "IN PROGRESS") {
      return { 'color': 'orange' };
    }
    else if (status == "SUBMITTED") {
      return { 'color': 'blue' };
    }
  }

  getSubmittedCCDateStyle(application){
    if(application.customers.submittedCcDate == null){
      return {'text-align':'center', 'padding-right':'100px'};
    }
    else{
      return {'padding-left':'30px'};
    }
  }

  getCreationCcDateStyle(application){
    if(application.customers.creationCcDate == null){
      return {'text-align':'center', 'padding-right':'100px'};
    }
    else{
      return {'padding-left':'30px'};
    }
  }
}