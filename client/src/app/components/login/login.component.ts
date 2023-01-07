import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLogged = true;
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    /* This is checking if the user is already logged in. If the user is logged in, the user is
    redirected to the user page. */
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/user']);
    }
  }
  /**
   * The function is called when the user clicks the submit button. It gets the username and password
   * from the form, calls the login service, and subscribes to the observable returned by the service.
   * If the login is successful, the token is saved in local storage and the user is redirected to the
   * user page. If the login is unsuccessful, the user is shown an error message
   */
  onSubmit(): void {
    const { username, password } = this.form;
    this.loginService.login(username, password).subscribe({
      next: (data) => {
        localStorage.setItem('authToken', data.token);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        this.isLogged = false;
        setTimeout(() => {
          this.isLogged = true;
        }, 5000);
      },
    });
  }
}
