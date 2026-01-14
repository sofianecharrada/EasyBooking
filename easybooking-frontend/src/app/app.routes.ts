import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { RegisterComponent } from './components/register/register.component';
import { AddRoomComponent } from './components/rooms/add-room.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirige vers register par défaut
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'my-bookings', component: MyBookingsComponent }
];