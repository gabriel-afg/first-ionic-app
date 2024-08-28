import { AnimeService } from './anime.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.page';
import { Router } from '@angular/router';

export interface Anime {
  id: number;
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animes: Anime[] = [];
  searchTerm: string = '';
  filteredAnimes: Anime[] = [];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private animeService: AnimeService
  ) {
  }

  ionViewWillEnter() {
    this.initializeAnimes();
  }

  initializeAnimes() {
    this.animes = this.animeService.getAnimes();
    this.filterAnimes();
  }

  deleteAnime(anime: Anime) {
    this.animeService.deleteAnime(anime);
  }

  filterAnimes() {
    this.filteredAnimes = this.animes.filter(anime =>
      anime.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });
    await modal.present();
  
    const { role } = await modal.onWillDismiss();
  
    if (role === 'confirm') {
      this.initializeAnimes();
    }
  }

  openAnimeDetails(anime: Anime) {
    this.router.navigate(['/anime-details', anime.id], {
      state: { anime }
    });
  }
}