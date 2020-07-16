import { Component, OnInit } from '@angular/core';

import { HeroModel } from '../../models/hero.model';
import { NgForm } from '@angular/forms';
import { HerosService } from '../../services/heros.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  hero = new HeroModel();
  constructor(
    private heroServices: HerosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroServices.getHeroById(id).subscribe((resp: HeroModel) => {
        this.hero = resp;
        this.hero.id = id;
      });
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('invalid form!!!!');
      return;
    }

    Swal.fire({
      title: 'Espere, por favor...',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: () => !Swal.isLoading(),
    });
    Swal.showLoading();

    let request: Observable<any>;

    if (this.hero.id) {
      request = this.heroServices.updateHero(this.hero);
    } else {
      request = this.heroServices.createHero(this.hero);
    }

    request.subscribe((resp) => {
      Swal.fire({
        title: this.hero.name,
        text: 'Se actualizó  correctamente',
        icon: 'success',
      });
    });
  }
}
