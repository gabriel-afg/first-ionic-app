import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Anime } from '../home/anime.model';

@Component({
  selector: 'app-edit-anime-modal',
  templateUrl: './edit-anime-modal.page.html',
  styleUrls: [],
})
export class EditAnimeModalComponent {
  @Input() anime!: Anime;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    return this.modalCtrl.dismiss(this.anime, 'confirm');
  }

  delete() {
    return this.modalCtrl.dismiss(this.anime, 'delete');
  }
}