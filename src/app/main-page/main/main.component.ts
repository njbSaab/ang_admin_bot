import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  email = '';
  password = '';
  passwordVisible = false;
  errorMessage = '';

  private validEmail = 'admin-bot-1x'; // Установленный email
  private validPassword = 'tJfB59iWxAXL'; // Установленный пароль

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.email === this.validEmail && this.password === this.validPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
