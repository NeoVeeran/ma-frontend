import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],

    password: ['', Validators.required],
  });

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        alert('Invalid Username or Password');
      },
    });
  }
}
