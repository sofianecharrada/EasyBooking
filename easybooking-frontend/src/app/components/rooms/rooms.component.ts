import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  selectedDate: string = '';
  minCapacity: number = 0;

  timeslots: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.selectedDate = today;

    if (isPlatformBrowser(this.platformId)) {
      this.loadRooms();
    }
  }

  // Variables à ajouter/modifier
startTime: string = '09:00';
endTime: string = '10:00';

loadRooms(): void {
  // On envoie startTime et endTime au lieu d'un seul timeslot
  this.api.getRooms(this.selectedDate, this.startTime, this.endTime, this.minCapacity).subscribe({
    next: (data: any) => {
      console.log('loadRooms response:', data);
      // Assigner la réponse pour mettre à jour l'UI
      setTimeout(() => {
        this.rooms = data;
        this.cdr.detectChanges();
      }, 0);
    }
  });
}

bookRoom(room: any) {
  if (!this.isTimeRangeValid()) {
    alert("Plage horaire invalide : l'heure de fin doit être strictement après l'heure de début.");
    return;
  }

  const bookingData = {
    roomId: room._id,
    date: this.selectedDate,
    startTime: this.startTime, // ex: "09:00"
    endTime: this.endTime      // ex: "11:00"
  };

  console.log('[bookRoom] sending', bookingData);
  this.api.createBooking(bookingData).subscribe({
    next: (res: any) => {
      console.log('[bookRoom] response', res);
      alert('Réservation réussie !');
      this.loadRooms(); // Rafraîchir pour voir la salle passer en rouge
    },
    error: (err) => {
      console.error('[bookRoom] error', err);
      alert(err.error?.message || 'Erreur de réservation');
    }
  });
} 

  navigateToAddRoom(): void {
    this.router.navigate(['/add-room']);
  }

  onDateChange(event: any): void {
    // On récupère la valeur du calendrier
    this.selectedDate = event.target.value;
    console.log('Nouvelle date sélectionnée :', this.selectedDate);

    // On recharge les salles pour voir si elles sont libres à cette NOUVELLE date
    this.loadRooms();
  }

  isTimeRangeValid(): boolean {
    return this.endTime > this.startTime;
  }

  getAvailableEndTimes(): string[] {
    return this.timeslots.filter(t => t > this.startTime);
  }

  adjustEndTime(): void {
    const available = this.getAvailableEndTimes();
    if (available.length === 0) {
      // Aucun créneau disponible après startTime : on force endTime égal à startTime pour rendre invalide
      this.endTime = this.startTime;
    } else if (!this.isTimeRangeValid()) {
      this.endTime = available[0];
    }
  }

  onTimeChange(): void {
    // Ajuste l'heure de fin si nécessaire
    this.adjustEndTime();
    // On recharge les salles pour voir si elles sont libres à cette NOUVELLE heure
    this.loadRooms();
  } 
}
