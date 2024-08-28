import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Anime } from '../home/anime.model';
import { EditAnimeModalComponent } from '../edit-anime-modal/edit-anime-modal.page';
import { AnimeService } from '../home/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.page.html',
  styleUrls: ['./anime-details.page.scss'],
})
export class AnimeDetailsPage implements OnInit {
  anime!: Anime;
  newComment: string = '';
  comments: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animeService: AnimeService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.anime = navigation.extras.state['anime'];
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.anime = this.animeService.getAnimes().find(a => a.id === +id)!;
        this.comments = JSON.parse(localStorage.getItem(`comments_${this.anime.id}`) || '[]');
      }
    }
  }

  async editAnime() {
    const modal = await this.modalCtrl.create({
      component: EditAnimeModalComponent,
      componentProps: { anime: this.anime }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (result.role === 'delete') {
          this.deleteAnime(result.data);
        } else {
          this.anime = result.data;
        }
      }
    });

    return await modal.present();
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja excluir este anime?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteAnime(this.anime);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAnime(anime: Anime) {
    this.animeService.deleteAnimeById(anime.id);
    this.router.navigate(['/home']);
  }

  addComment() {
    if (this.newComment.trim().length > 0) {
      this.comments.push(this.newComment);
      this.newComment = '';
      // Salvar os comentarios no local storage
      localStorage.setItem(`comments_${this.anime.id}`, JSON.stringify(this.comments));
    }
  }

  // Example method to fetch anime by ID
  // fetchAnimeById(id: string): Anime {
  //   // Implement your logic to fetch the anime by ID
  // }
}