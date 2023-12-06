import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

import {tallas, precios} from '../archives/arrays';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {

      this.platform.backButton.subscribeWithPriority(10, () => {
        console.log('Handler was called!');
      });
  }


 


  filtrarTalla:any[]=[];
  shoppingCar:any[]=[];
  Total:number=0;
  tallas = tallas;
  precios=precios;
 
  miformulario2 = new FormGroup({
    gender: new FormControl('male'),
    tallaPrenda: new FormControl('', [Validators.required])
 });

 cargarSelect(miformulario2:FormGroup): void{

  if(miformulario2.value.gender=="male"){
    let productoMale = this.precios.filter((elemento)=>{
      return (elemento.talla==miformulario2.value.tallaPrenda && elemento.prenda!="falda" );}).map((ver: any)=>({...ver, cantidad:1, total:1*ver.precio}));
    this.shoppingCar=[...productoMale];
   this.sumarTotal();
   
  }else if(miformulario2.value.gender=="female"){
    let productoFemale = this.precios.filter((elemento)=>{
      return (elemento.talla==miformulario2.value.tallaPrenda && elemento.prenda!="pantalon" );}).map((ver: any)=>({...ver, cantidad:1, total:1*ver.precio}));
    this.shoppingCar=[...productoFemale];
    this.sumarTotal();
  }
 }

  sumarTotal(): void{
    const sumaPrecios: number = this.shoppingCar.reduce((acumulador, elemento) =>{return acumulador + elemento.total}, 0);
    this.Total = sumaPrecios;
    }

  borrarElemento(i:number): void{
    this.shoppingCar.splice(i,1);
    this.sumarTotal();
    }

  aumentar(i:number): void{
    this.shoppingCar[i].cantidad +=1;
    this.shoppingCar[i].total = this.shoppingCar[i].cantidad*this.shoppingCar[i].precio;
    this.sumarTotal();
    }

  disminuir(i:number): void{
    if(this.shoppingCar[i].cantidad<=1)return
    this.shoppingCar[i].cantidad-=1;
    this.shoppingCar[i].total = this.shoppingCar[i].cantidad*this.shoppingCar[i].precio;
    this.sumarTotal();
    }
}