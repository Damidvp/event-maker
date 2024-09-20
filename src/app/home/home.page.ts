import { Share } from '@capacitor/share';
import { Event, EventService } from './../services/event.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private service: EventService = inject(EventService);
  events: Event[] = [];
  constructor() {}
  ngOnInit() {
    //this.events = this.service.getAll();
    this.loadEvents();
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  loadEvents() {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }

  async shareEvent(event: Event) {
    try {
      await Share.share({
        title: 'Partage : ' + event.nameEvent,
        text: 'Venez participer à cet événement le ' + event.dateEvent,
        dialogTitle: "Partage d'événement",
      });
    } catch (error) {
      console.error('Erreur du partage : ' + error);
    }
  }
}
