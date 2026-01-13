import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Détecte si on est sur le navigateur
  ) {}

  // Fonction privée pour centraliser la récupération du Token
  private getHeaders(): HttpHeaders {
    let token = '';
    
    // On ne touche au localStorage QUE si on est dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

 getRooms(date: string, timeslot: string, minCapacity?: number) {
  let url = `${this.baseUrl}/rooms?date=${date}&timeslot=${timeslot}`;
  if (minCapacity) {
    url += `&minCapacity=${minCapacity}`;
  }
  return this.http.get(url);
}
  createBooking(bookingData: any) {
    // Utilisation de la fonction sécurisée pour les headers
    return this.http.post(`${this.baseUrl}/bookings`, bookingData, { 
      headers: this.getHeaders() 
    });
  }

  getUserBookings() {
    // Utilisation de la fonction sécurisée pour les headers
    return this.http.get(`${this.baseUrl}/bookings/my-bookings`, { 
      headers: this.getHeaders() 
    });
  }

  cancelBooking(bookingId: string) {
  return this.http.delete(`${this.baseUrl}/bookings/${bookingId}`, { 
    headers: this.getHeaders() 
  });
}
}