import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FUN_FACTS } from '../../../../core/data/facts.mock';
import { Weather } from '../../../../services/weather';
import { WeatherData } from '../../../../core/models/weather.interface';

@Component({
  selector: 'app-maps-information-modal',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './maps-information-modal.html',
  styleUrl: './maps-information-modal.scss',
  providers: [DatePipe]
})
export class MapsInformationModal {
  facts: string[] = [];
  weatherData!: WeatherData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MapsInformationModal>,
    private weatherSrv: Weather
  ) {
  }

  ngOnInit() {
    this.facts = this.getFactsForCity(this.data.displayName.split(',')[0]);
    this.getServiceWeather();
  }

  getServiceWeather() {
    const lat = this.data.coords.lat;
    const lon = this.data.coords.lng;

    this.weatherSrv.getWeather(lat, lon).subscribe({
      next: (res) => {
        this.weatherData = res;
      },
      error: (err) => console.error('Error al obtener clima', err)
    });
  }

  getLanguages(languages: any): string {
    return languages ? Object.values(languages).join(', ') : '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getMaps() {
    const mapa = this.data?.countryInfo?.maps?.googleMaps;
    window.open(mapa, '_blank');
  }

  getFactsForCity(cityName: string | undefined): string[] {
    if (!cityName) return ['Nombre de ciudad no disponible.'];

    const entry = FUN_FACTS.find(
      (f) => f.city.toLowerCase() === cityName.toLowerCase()
    );

    return entry?.facts ?? ['No hay datos curiosos disponibles.'];
  }

}
