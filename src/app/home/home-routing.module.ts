import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'cotizacion',
    component: CotizacionComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
