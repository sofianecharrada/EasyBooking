import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css' // Assurez-vous que le fichier .css existe même s'il est vide
})
export class RegisterComponent {
  // Objet lié au formulaire HTML
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    this.api.register(this.user).subscribe({
      next: (res: any) => {
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']); // Redirection vers la connexion
      },
      error: (err) => {
        alert('Erreur lors de l’inscription : ' + (err.error.message || 'Serveur injoignable'));
      }
    });
  }
}