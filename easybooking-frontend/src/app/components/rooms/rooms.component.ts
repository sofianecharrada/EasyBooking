import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  selectedDate: string = '';
  selectedTime: string = '09:00';
  minCapacity: number = 0;

  timeslots: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.selectedDate = today;

    if (isPlatformBrowser(this.platformId)) {
      this.loadRooms();
    }
  }
  loadRooms(): void {
    this.api.getRooms(this.selectedDate, this.selectedTime, this.minCapacity).subscribe({
      next: (data: any) => {
        // Le setTimeout(..., 0) repousse l'affectation au prochain cycle de rendu
        // Cela garantit qu'Angular ne détectera pas de changement "pendant" sa vérification
        setTimeout(() => {
          this.rooms = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Erreur API :', err),
    });
  }

  onDateChange(event: any): void {
    // On récupère la valeur du calendrier
    this.selectedDate = event.target.value;
    console.log('Nouvelle date sélectionnée :', this.selectedDate);

    // On recharge les salles pour voir si elles sont libres à cette NOUVELLE date
    this.loadRooms();
  }

  onTimeChange(): void {
    // On recharge les salles pour voir si elles sont libres à cette NOUVELLE heure
    this.loadRooms();
  }

  // C'est cette fonction qui manquait dans ton fichier !
  bookRoom(roomId: string): void {
    if (!this.selectedDate) {
      alert("Veuillez d'abord choisir une date !");
      return;
    }

    const bookingData = {
      roomId: roomId,
      date: this.selectedDate,
      timeslot: this.selectedTime,
    };

    this.api.createBooking(bookingData).subscribe({
      next: () => {
        alert(`Réservation réussie pour ${this.selectedTime} !`);
        this.loadRooms(); // Rafraîchit l'affichage
      },
      error: (err) => alert(err.error?.message || 'Erreur lors de la réservation'),
    });
  }
}
