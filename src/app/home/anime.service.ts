import { Injectable } from '@angular/core';
import { Anime } from './anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private animes: Anime[] = [
    {
      id: 1,
      title: 'Jujutsu Kaisen',
      rating: 10,
      description: 'Jujutsu Kaisen é um anime japonês que conta a história de Yuji Itadori, um estudante colegial que acidentalmente liberta uma maldição de um artefato amaldiçoado e se vê imerso num mundo de trevas e perigo.',
      imageUrl: '../../assets/jujutsu.jpg'
    },
    {
      id: 2,
      title: 'Attack on Titan',
      rating: 9,
      description: 'Attack on Titan segue a história de Eren Yeager e seus amigos enquanto lutam contra os Titãs que ameaçam a humanidade.',
      imageUrl: '../../assets/aot.jpg'
    }
  ];

  getAnimes(): Anime[] {
    return this.animes;
  }

  deleteAnime(anime: Anime) {
    this.animes = this.animes.filter(a => a.id !== anime.id);
    console.log('Deleted anime:', anime);
  }

  deleteAnimeById(id: number) {
    this.animes = this.animes.filter(a => a.id !== id);
    console.log('Deleted anime with ID:', id);
  }

  getNextId(): number {
    return this.animes.length > 0 ? Math.max(...this.animes.map(a => a.id)) + 1 : 1;
  }

  addAnime(anime: Anime) {
    this.animes.push(anime);
    console.log('Added anime:', anime);
  }
}