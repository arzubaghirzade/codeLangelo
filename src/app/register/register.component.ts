import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  nextStep = false;
  submitted = false;
  companyId!: number;

  submitForm(): void {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: [null, [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  nextRegisterStep() {
    this.nextStep = true;
    this.appService.registerCompany({name: this.f.name.value, phone: this.f.phone.value, address: this.f.address.value,}).subscribe(
      res => {
        this.companyId = res?.companyRegisterId;
      this.nextStep = true;
  }, err => {
    this.router.navigate(['/register']);
  })
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.appService
      .register({
        username: this.f.username.value,
        email: this.f.email.value,
        role: "admin",
        password: this.f.password.value,
        companyId: this.companyId
      })
      .subscribe((res) => {
        sessionStorage.setItem('authtoken', res?.access_token);
        sessionStorage.setItem('role', res?.role);
        this.router.navigate(['/home']);
      });
  }
}
