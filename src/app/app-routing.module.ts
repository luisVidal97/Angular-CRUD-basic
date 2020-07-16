import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerosComponent } from './pages/heros/heros.component';
import { HeroComponent } from './pages/hero/hero.component';

const routes: Routes = [
  { path: 'heros', component: HerosComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heros' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
