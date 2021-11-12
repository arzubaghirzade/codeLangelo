import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isAdmin = false;
  nextStep = false;
  submitted = false;
  companyId!: number;
  role!: string;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: [null, [Validators.required]],
      email: ['', [Validators.required]],
      remember: [true],
    });
  }
  nextLoginStep() {
    this.nextStep = true;
    this.appService.loginCompany({ name: this.f.name.value }).subscribe(
      (res) => {
        this.companyId = res?.companyLoginId;
        this.nextStep = true;
      },
      (err) => {
        this.router.navigate(['/register']);
      }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.appService
      .login({
        username: this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value,
        companyId: this.companyId,
      })
      .subscribe((res) => {
        console.log(res);
        sessionStorage.setItem('authtoken', res?.access_token);
        sessionStorage.setItem('role', res?.role);
        this.router.navigate(['/home']);
      });
  }
}
