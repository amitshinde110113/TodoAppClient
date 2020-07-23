import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { IUser } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: IUser;
  passLengthError = false;
  isLoginView = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  confirmPassError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.buildLoginForm();
    this.buildSignupForm();
  }
  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,	Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });


  }
  buildSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,	Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.signupForm.get('confirmPassword').valueChanges.subscribe(val => {
      if (this.signupForm.value.password) {
        (this.signupForm.value.password !== val) ? this.confirmPassError = true : this.confirmPassError = false;
      }
    });
    this.signupForm.get('password').valueChanges.subscribe(val => {
      if (this.signupForm.value.passworrd) {
        (this.signupForm.value.passworrd.length < 6) ? this.passLengthError = true : this.passLengthError = false;
      }
    });
  }
  login() {
    this.user = this.loginForm.value;
    this.userService.login(this.user).subscribe((res: any) => {
      this.authService.login();
      this.loginForm.reset();
      localStorage.setItem('currenUser', JSON.stringify(res.user));
      localStorage.setItem('token', JSON.stringify(res.token));
      this.router.navigate(['/todos']);
      this.toastr.success('Logged In.');
    }, error => {
      this.toastr.error(error.error.message || 'Error while logging in');
    });
  }
  signUp() {
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.confirmPassError = true;
      return;
    }
    this.user = this.signupForm.value;
    this.userService.signUp(this.user).subscribe((res: IUser) => {
      this.signupForm.reset();
      this.isLoginView = true;
      this.toastr.success('User registered successfully.');
    }, error => {
      this.toastr.error(error.error.message || 'Error');
    });
  }
}
