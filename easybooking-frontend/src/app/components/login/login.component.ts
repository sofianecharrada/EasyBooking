import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.api.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // Sauvegarde du token JWT
        this.router.navigate(['/rooms']); // Redirection vers les salles
      },
      error: (err) => alert("Erreur : " + err.error.message)
    });
  }
}