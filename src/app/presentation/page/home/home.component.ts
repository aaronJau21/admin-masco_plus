import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'flex-1 p-5',
  },
})
export default class HomeComponent {}
