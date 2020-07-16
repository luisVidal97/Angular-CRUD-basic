import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  private url = 'https://hero-app-udemy.firebaseio.com';

  constructor(private http: HttpClient) {}

  createHero(hero: HeroModel) {
    return this.http.post(`${this.url}/heros.json`, hero).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroModel) {
    const heroTem = {
      ...hero,
    };
    delete heroTem.id;
    return this.http.put(`${this.url}/heros/${hero.id}.json`, heroTem);
  }

  deleteHeroById(id: string) {
    return this.http.delete(`${this.url}/heros/${id}.json`);
  }

  getHeroById(id: string) {
    return this.http.get(`${this.url}/heros/${id}.json`);
  }

  getHeros() {
    return this.http
      .get(`${this.url}/heros.json`)
      .pipe(map((resp) => this.createArray(resp), delay(0)));
  }

  private createArray(herosObj: object) {
    const heros: HeroModel[] = [];

    if (herosObj === null) {
      return [];
    }

    Object.keys(herosObj).forEach((key) => {
      const hero: HeroModel = herosObj[key];
      hero.id = key;
      heros.push(hero);
    });

    return heros;
  }
}
