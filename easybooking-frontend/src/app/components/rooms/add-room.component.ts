import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-room.component.html'
})
export class AddRoomComponent {
  roomData = {
    name: '',
    capacity: 1,
    description: '',
    amenities: '' // Texte que l'on convertira en tableau
  };

  constructor(private api: ApiService) {}

  onSubmit() {
    // On transforme la chaîne "Wi-Fi, TV" en tableau ["Wi-Fi", "TV"]
    const dataToSend = {
      ...this.roomData,
      amenities: this.roomData.amenities ? this.roomData.amenities.split(',').map(a => a.trim()) : []
    };

    this.api.addRoom(dataToSend).subscribe({
      next: (res) => {
        alert('Salle ajoutée avec succès !');
        // Reset du formulaire
        this.roomData = { name: '', capacity: 1, description: '', amenities: '' };
      },
      error: (err) => alert("Erreur lors de l'ajout")
    });
  }
}