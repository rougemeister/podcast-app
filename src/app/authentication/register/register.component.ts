
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import  * as AuthActions from '../../store/auth/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterCredentials } from '../../core/model/model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signupForm: FormGroup;
  error: string | null = null;
  private authService = inject(AuthService);


  constructor(
    private fb: FormBuilder,
    private store: Store

  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

 onSubmit(): void {
  if (this.signupForm.invalid) return;

  const credentials: RegisterCredentials = {
    ...this.signupForm.value,
    role: 'admin'
  };
  console.log('Registering user with credentials:', credentials);
  console.log(this.authService.hasValidToken());

  
  this.store.dispatch(AuthActions.register({ credentials }));
}
  

}
