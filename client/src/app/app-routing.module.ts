import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
//Components
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
