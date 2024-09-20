import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private mockEvents: Event[] = [
    /*{
      id: '1',
      nameEvent: 'Soirée Cocktail',
      dateEvent: '19/09/2024',
      cityEvent: 'Montpellier',
      urlPhoto: 'photo',
      descriptionEvent: 'Une description à écrire...',
    },
    {
      id: '2',
      nameEvent: 'Journée sport',
      dateEvent: '20/09/2024',
      cityEvent: 'Béziers',
      urlPhoto: 'photo',
      descriptionEvent: 'Une description à écrire...',
    },
    {
      id: '3',
      nameEvent: 'Randonnée',
      dateEvent: '21/09/2024',
      cityEvent: 'Nîmes',
      urlPhoto: 'photo',
      descriptionEvent: 'Une description à écrire...',
    },*/
  ];

  constructor() {}

  getAll() {
    return [...this.mockEvents];
  }

  addEvent(event: Event) {
    console.log(event);
    this.mockEvents = JSON.parse(localStorage.getItem('events') || '[]');
    this.mockEvents.push(event);
    localStorage.setItem('events', JSON.stringify(this.mockEvents));
  }
}

export interface Event {
  id: string;
  nameEvent: string;
  dateEvent: string;
  cityEvent: string;
  urlPhoto: string | undefined;
  descriptionEvent: string;
}
