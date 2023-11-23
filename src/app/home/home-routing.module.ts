import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { FacturaComponent } from '../factura/factura.component';

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
    path:'factura',
    component: FacturaComponent
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
