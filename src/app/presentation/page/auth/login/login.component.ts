import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../use-case/services/auth.service';
import { ILoginRequest } from '../../../../domain/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    user_name: ['', Validators.required],
    password: ['', Validators.required],
  });

  public loginSubmit() {
    const data: ILoginRequest = this.loginForm.value;

    return this.authService.login(data).subscribe({
      next: ({ token, user }) => this.authService.saveLocal(token, user),
      error: console.log,
      complete: () => this.router.navigateByUrl('/dashboard/home'),
    });
  }
}
