import { Component } from '@angular/core';
import { Maps } from '../maps/maps';

@Component({
  selector: 'app-home',
  imports: [Maps],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  title = "Explorador Mundial de Ciudades"
}
