import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Anime } from '../home/anime.model';
import { AnimeService } from '../home/anime.service';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal.page.html',
})
export class ModalComponent {
  anime: Anime;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private modalCtrl: ModalController, private animeService: AnimeService) {
    this.anime = {
      id: this.animeService.getNextId(),
      title: '',
      rating: 0,
      description: '',
      imageUrl: ''
    };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.animeService.addAnime(this.anime);
    return this.modalCtrl.dismiss(this.anime, 'confirm');
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.anime.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}