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
    this.events = this.service.getAll();
  }
}
