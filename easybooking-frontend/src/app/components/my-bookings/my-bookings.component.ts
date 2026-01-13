import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  myBookings: any[] = [];

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef // Détecte si on est sur le navigateur
  ) {}

  ngOnInit(): void {
    // On n'exécute la requête que si on est dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData(): void {
    this.api.getUserBookings().subscribe({
      next: (data: any) => {
        this.myBookings = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur de récupération :', err);
        // Si c'est une 401, c'est que le token est expiré ou absent
        if (err.status === 401) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
        }
      }
    });
  }

  cancelReservation(bookingId: string): void {
  if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
    this.api.cancelBooking(bookingId).subscribe({
      next: () => {
        alert("Réservation annulée.");
        // On retire la réservation de la liste affichée sans recharger la page
        this.myBookings = this.myBookings.filter(b => b._id !== bookingId);
      },
      error: (err) => alert("Erreur lors de l'annulation")
    });
  }
}
}