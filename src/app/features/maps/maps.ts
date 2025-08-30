import { Component, inject, OnInit, signal } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { Weather } from '../../services/weather';
import { CommonModule } from '@angular/common';
import { Country } from '../../services/country';
import { MapsInformationModal } from './components/maps-information-modal/maps-information-modal';

@Component({
  selector: 'app-maps',
  imports: [CommonModule, GoogleMap, MapMarker, MatDialogModule],
  templateUrl: './maps.html',
  styleUrl: './maps.scss'
})

export class Maps implements OnInit {

  //MAPAS
  cities = [{ name: 'Mexico', displayName: 'Ciudad de México, México', lat: 19.4326, lng: -99.1332 },
  { name: 'France', displayName: 'París, Francia', lat: 48.8566, lng: 2.3522 }, { name: 'United States', displayName: 'Washington DC, EE. UU.', lat: 38.9072, lng: -77.0369 },
  { name: 'Iran', displayName: 'Teherán, Irán', lat: 35.6892, lng: 51.3890 }, { name: 'Russia', displayName: 'Moscú, Rusia', lat: 55.7558, lng: 37.6173 },
  { name: 'United Kingdom', displayName: 'Londres, Reino Unido', lat: 51.5074, lng: -0.1278 }, { name: 'China', displayName: 'Pekín, China', lat: 39.9042, lng: 116.4074 },
  { name: 'Ghana', displayName: 'Accra, Ghana', lat: 5.6037, lng: -0.1870 }, { name: 'Ethiopia', displayName: 'Addis Abeba, Etiopía', lat: 9.0301, lng: 38.7498 },
  ];

  yourFacts = {
    Mexico: [
      'Ciudad más poblada del país.',
      'Ubicada en un valle a 2,250 msnm.',
      'Fundada en 1325 por los mexica.'
    ],
  }
  private weatherService = inject(Weather)
  public dataWeather: any;

  center = signal<google.maps.LatLngLiteral>({ lat: 24, lng: 12 });
  zoom = signal(2);

  constructor(private dialog: MatDialog, private countryService: Country) { }

  ngOnInit(): void {
  }

  openCityModal(city: any) {
    console.log(city, 'clickMapa')
    this.countryService.getCountryInfo(city.name).subscribe({
      next: (data) => {
        const country = data[0];
        this.dialog.open(MapsInformationModal, {
          data: {
            displayName: city.displayName, countryInfo: country,
            coords: { lat: city.lat, lng: city.lng },
          },
          width: '90%',
          height: '470px',
        });
      }, error: (err) => {
        console.error('Error al obtener información del país', err);
      },
    });
  }


}
