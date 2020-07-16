import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heros.service';
import { HeroModel } from '../../models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  heros: HeroModel[] = [];
  loading = false;
  constructor(private herosService: HerosService) {}

  ngOnInit(): void {
    this.loading = true;
    this.herosService.getHeros().subscribe((resp) => {
      console.log(resp);
      this.heros = resp;
      this.loading = false;
    });
  }

  deleteHero(hero: HeroModel, i: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar ${hero.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heros.splice(i, 1);
        this.herosService.deleteHeroById(hero.id).subscribe();
      }
    });
  }
}
