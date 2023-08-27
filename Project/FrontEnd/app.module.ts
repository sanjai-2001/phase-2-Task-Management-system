import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardsComponent } from './cards/cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TaskAssignmentFormComponent } from './task-assignment-form/task-assignment-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserDataTableComponent } from './user-data-table/user-data-table.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserDeleteDialogComponent } from './user-delete-dialog/user-delete-dialog.component';
import { TodoComponent } from 'src/app/todo/todo.component';
import { OnProgressComponent } from './on-progress/on-progress.component';
import { CompletedComponent } from './completed/completed.component';
// import { YourDataService } from './services/your-data.service'; 
import { TaskCountService } from './task-count.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AdminService } from './services/admin.service';
import { EmployeeService } from './services/employee.service';
import { AssignempService } from './services/assignemp.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // NavbarComponent, // Commented out to avoid circular dependency issues
    SidebarComponent,
    DashboardComponent,
    CardsComponent,
    DataTableComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    TaskAssignmentFormComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    UserCardsComponent,
    UserDataTableComponent,
    UserEditDialogComponent,
    UserDeleteDialogComponent,
    TodoComponent,
    OnProgressComponent,
    CompletedComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [
    // YourDataService,
    TaskCountService,
    LoginService,
    AdminService,
    EmployeeService,
    NavbarComponent,
    AssignempService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}