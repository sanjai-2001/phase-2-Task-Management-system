import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { CardsComponent } from 'src/app/cards/cards.component';
import { TaskAssignmentFormComponent } from 'src/app/task-assignment-form/task-assignment-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserDataTableComponent } from './user-data-table/user-data-table.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { TodoComponent } from './todo/todo.component';
import { OnProgressComponent } from './on-progress/on-progress.component';
import { CompletedComponent } from './completed/completed.component';




const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'dashboard',component:DashboardComponent},
  {path: 'cards',component:CardsComponent},
  {path: 'assign-task', component: TaskAssignmentFormComponent},
  {path: 'user-dashboard', component: UserDashboardComponent},
  {path: 'user-cards', component: UserCardsComponent},
  {path: 'user-data-table', component: UserDataTableComponent},
  {path: 'user-navbar', component: UserNavbarComponent},
  {path: 'user-sidebar',component: UserSidebarComponent},
  { path: 'todo', component: TodoComponent },
  {path: 'on-progress',component: OnProgressComponent},
  {path: 'completed',component: CompletedComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
