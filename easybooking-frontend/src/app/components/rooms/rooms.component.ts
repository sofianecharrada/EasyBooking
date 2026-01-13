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

  // Variables à ajouter/modifier
startTime: string = '09:00';
endTime: string = '10:00';

loadRooms(): void {
  // On envoie startTime et endTime au lieu d'un seul timeslot
  this.api.getRooms(this.selectedDate, this.startTime, this.endTime, this.minCapacity).subscribe({
    next: (data: any) => {
      setTimeout(() => {
        this.rooms = data;
        this.cdr.detectChanges();
      }, 0);
    }
  });
}

bookRoom(roomId: string): void {
  const bookingData = {
    roomId,
    date: this.selectedDate,
    startTime: this.startTime,
    endTime: this.endTime
  };
  // ... appel api.createBooking
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
}
