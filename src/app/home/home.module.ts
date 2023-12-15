import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { NavegarComponent } from '../cotizacion/navegar/navegar.component';
import { FacturaComponent } from '../factura/factura.component';
import { CfacturaComponent } from '../share/cfactura/cfactura.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CotizacionComponent, NavegarComponent, FacturaComponent, CfacturaComponent ]
})
export class HomePageModule {}
