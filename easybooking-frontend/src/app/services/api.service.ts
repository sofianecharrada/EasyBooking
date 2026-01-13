import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // --- Authentification ---
  register(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // --- Salles ---
  // MODIFIÉ : Ajout de startTime et endTime
  getRooms(date: string, startTime: string, endTime: string, minCapacity?: number) {
    let params = new HttpParams()
      .set('date', date)
      .set('startTime', startTime)
      .set('endTime', endTime);

    if (minCapacity && minCapacity > 0) {
      params = params.set('minCapacity', minCapacity.toString());
    }

    return this.http.get(`${this.baseUrl}/rooms`, { params });
  }

  // --- Réservations ---
  createBooking(bookingData: any) {
    return this.http.post(`${this.baseUrl}/bookings`, bookingData, { 
      headers: this.getHeaders() 
    });
  }

  getUserBookings() {
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