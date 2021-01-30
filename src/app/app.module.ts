import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from "../core/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { CustomersComponent, DeleteCustomerConfirmationDialog } from './customers/customers.component';
import { HellasDMSComponent } from './hellasdms/hellasdms.component';
import { ConnectionComponent } from './connection/connection.component';
import { TechappComponent } from './techapp/techapp.component';
import { WebdealerComponent } from './webdealer/webdealer.component';
import { UltrasyncComponent } from './ultrasync/ultrasync.component';
import { ContactComponent } from './contact/contact.component';
import { NotesComponent } from './notes/notes.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RemoteDataService } from './services/RemoteDataService.service';
import { DataProvider } from './services/DataProvider.service';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './services/AuthService.service';
import { AuthGuardService } from './services/AuthGuardService.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InstallersComponent, ActivationConfirmationDialog, DeactivationConfirmationDialog } from './installers/installers.component';
import { MatIconModule, MatSelectModule, MatDialogModule, MatMenuModule, MatPaginatorModule } from '@angular/material';
import { TruncateModule } from 'ng2-truncate';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { InstallersRequestComponent } from './installers-request/installers-request.component';
import { InstallersRequestApplicationViewComponent, SubmitConfirmationDialog } from './installers-request-application-view/installers-request-application-view.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { InstallerViewComponent } from './installer-view/installer-view.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {CoredataComponent, DeleteCoreDataInfoDialog} from './coredata/coredata.component';

const appRoutes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuardService]  },
  { path: 'hellasdms', component: HellasDMSComponent,canActivate: [AuthGuardService] },
  { path: 'connection', component: ConnectionComponent, canActivate: [AuthGuardService]  },
  { path: 'techapp', component: TechappComponent },
  { path: 'webdealer', component: WebdealerComponent },
  { path: 'ultrasync', component: UltrasyncComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
  { path: 'notes', component: NotesComponent , canActivate: [AuthGuardService] },
  { path: 'installers', component: InstallersComponent , canActivate: [AuthGuardService] },
  { path: 'coredata', component: CoredataComponent , canActivate: [AuthGuardService] },


  {path:'login', component:LogInComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'changePassword', component: NewPasswordComponent, canActivate: [AuthGuardService]  },
  { path: 'installersRequests', component: InstallersRequestComponent, canActivate: [AuthGuardService], },
  { path: 'installersRequests/installersRequestsData', component: InstallersRequestApplicationViewComponent, canActivate: [AuthGuardService] , pathMatch:"full"},
  { path: 'installers/installerView', component: InstallerViewComponent, canActivate: [AuthGuardService], pathMatch:"full" },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService]  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ConnectionComponent,
    TechappComponent,
    WebdealerComponent,
    UltrasyncComponent,
    ContactComponent,
    NotesComponent,
    LogInComponent,
    RegistrationComponent,
    InstallersComponent,
    ConfirmationDialogComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    HellasDMSComponent,
    NewPasswordComponent,
    InstallersRequestComponent,
    InstallersRequestApplicationViewComponent,
    ActivationConfirmationDialog,
    DeactivationConfirmationDialog,
    SubmitConfirmationDialog,
    DeleteCustomerConfirmationDialog,
    DeleteCoreDataInfoDialog,
    InstallerViewComponent,
    NotificationsComponent,
    CoredataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: false }
    ),
    CustomMaterialModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    TruncateModule,
    MatDialogModule,
    MatMenuModule,
    TooltipModule,
    MatPaginatorModule
  ],
  providers: [RemoteDataService, DataProvider, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmationDialogComponent, ActivationConfirmationDialog, DeactivationConfirmationDialog,SubmitConfirmationDialog, DeleteCoreDataInfoDialog,DeleteCustomerConfirmationDialog]
})
export class AppModule { }
