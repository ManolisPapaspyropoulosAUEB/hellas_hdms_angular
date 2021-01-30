import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../services/DataProvider.service';
import * as moment from 'moment';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes = [];
  selectedNote;
  index: number;
  newNote: boolean = false;
  edit: boolean = false;
  copyNote;

  constructor(private dataProvider: DataProvider, public snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    let username = localStorage.getItem('id');
    this.dataProvider.getNotes({ userId: username }).subscribe(response => {
      this.notes = response.data;
      console.log(this.notes);
      if (this.notes.length > 0) {
        this.selectedNote = this.notes[0];
        this.index = 0;
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Θέλετε όντως να διαγράψετε την σημείωση?',
        buttonText: {
          ok: 'NAI',
          cancel: 'OXI'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && this.newNote == false) {
        this.delete();
      }
      else if (confirmed && this.newNote == true) {
        this.notes.pop();
        this.snackBar.open("Η διαγραφή της σημείωσης έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
        this.newNote = false;
        if (this.notes.length > 0) {
          this.selectedNote = this.notes[0];
          this.index = 0;
        }
        else {
          this.selectedNote = null;
          this.index = -1;
        }
      }
    });
  }

  formatDate(date) {
    if (moment(date).isValid()) {
      return moment(date).format("YYYY-MM-DD");
    }
    else {
      return "";
    }
  }

  save() {
    if (this.newNote == false) {
      delete this.notes[this.index].submitDate;
      console.log(this.notes[this.index].todoDate);
      this.dataProvider.updateNote(this.notes[this.index]).subscribe(response => {
        if (response.status == "ok") {
          this.snackBar.open("Η ενημέρωση της σημείωσης έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
        }
      });
    }
    else {
      this.notes[this.index].userId = localStorage.getItem('id');
      this.dataProvider.insertNote(this.notes[this.index]).subscribe(response => {
        if (response.status == "ok") {
          console.log(this.notes);
          this.dataProvider.getNotes({ userId: localStorage.getItem('id') }).subscribe(response => {
            this.notes = response.data;            
          });
          this.snackBar.open("Η εισαγωγή της σημείωσης έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
        }
      });
      this.newNote = false;
    }
    this.newNote = false;
    this.edit = false;
  }

  selectNote(index) {
    if (this.edit == false) {
      this.index = index;
      this.selectedNote = this.notes[this.index];
      this.newNote = false;
    }
    else {
      this.cancel();
      this.edit = false;
      this.index = index;
      this.selectedNote = this.notes[this.index];
      this.newNote = false;
    }
  }

  makeNewNote() {
    this.notes.push({ title: '', content: '', status: '', todoDate: '', submitDate: moment(new Date()).format("YYYY-MM-DD") });
    this.selectedNote = this.notes[this.notes.length - 1];
    this.index = this.notes.length - 1;
    this.newNote = true;
    this.edit = true;
  }

  setDate(event) {
    this.notes[this.index].todoDate = moment(event.target.value).format("YYYY-MM-DD HH:mm:ss");
  }

  isAdmin() {
    if (localStorage.getItem('role') == 'admin') {
      return true;
    }
    return false;
  }

  delete() {
    this.dataProvider.deleteNote({ "id": this.notes[this.index].id }).subscribe(response => {
      if (response.status == "ok") {

        let username = localStorage.getItem('id');
        this.dataProvider.getNotes({ userId: username }).subscribe(response => {
          this.snackBar.open("Η διαγραφή της σημείωσης έγινε με επιτυχία.", "x", <MatSnackBarConfig>{ duration: 5000 });
          this.notes = response.data;
          if (this.notes.length > 0) {
            this.selectedNote = this.notes[0];
            this.index = 0;
          }
          else {
            this.selectedNote = null;
          }
        });
      }
    })
  }

  isAuthenticated() {
    return localStorage.getItem("id") != null;
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }

  changeToEdit() {
    this.edit = true;
    this.copyNote = Object.assign({}, this.notes[this.index]);
  }

  cancel() {
    if (this.newNote == false) {
      this.edit = false;
      this.notes[this.index] = this.copyNote;
      this.selectedNote = this.notes[this.index];
    }
    else {
      this.edit = false;
      this.notes.pop();
      this.index = 0;
      this.selectedNote = this.notes[0];
      this.newNote = false;
    }
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  goToChangePassword() {
    this.router.navigate(['/changePassword'])
  }

  isACC() {
    return localStorage.getItem('role') == "acc";
  }

  isCC() {
    return localStorage.getItem('role') == "cc";
  }
}
