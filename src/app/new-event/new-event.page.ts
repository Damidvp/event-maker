import { Event, EventService } from './../services/event.service';
import { Component, OnInit, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NavController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
  providers: [DatePipe],
})
export class NewEventPage implements OnInit {
  selectedImage: string | undefined = undefined;
  eventName: string = '';
  eventLocation: string = '';
  eventDateTime: string = '';
  eventDescription: string = '';
  errorMessage: string = '';
  alertButton: string[] = ['OK'];

  private eventService: EventService = inject(EventService);
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private datePipe: DatePipe
  ) {
    this.requestNotificationPermission();
  }

  ngOnInit() {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.selectedImage = image.dataUrl;
  }

  //Permission d'utiliser les notifications
  async requestNotificationPermission() {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display === 'granted') {
      console.log('Permission des notifications accordée');
    } else {
      console.log('Permission des notifications refusée');
    }
  }

  async sendNotification(event: Event) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Nouvel événement créé !',
          body: `L'événement "${event.nameEvent}" a été ajouté.`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
  }

  async popAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur dans le formulaire',
      message: this.errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async createEvent() {
    if (!this.eventName || !this.eventLocation || !this.eventDateTime) {
      this.errorMessage = 'Merci de remplir tous les champs requis';
      this.popAlert();
      return;
    }

    const newEvent = {
      id: (this.eventService.getAll().length + 1).toString(),
      nameEvent: this.eventName,
      cityEvent: this.eventLocation,
      //Formattage de la date
      dateEvent: this.formatDate(this.eventDateTime),
      descriptionEvent: this.eventDescription,
      urlPhoto: this.selectedImage,
    };

    this.eventService.addEvent(newEvent);
    this.navCtrl.navigateRoot('/home');

    await this.sendNotification(newEvent);
  }
}
