import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {tallas, precios} from '../archives/arrays';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  filtrarTalla:any[]=[];
  shoppingCar:any[]=[];
  Total:number=0;
  //producto:any={};

  miformulario2 = new FormGroup({
    gender: new FormControl('male'),
    tallaPrenda: new FormControl('', [Validators.required])

 });

 cargarSelect(miformulario2:FormGroup){

  if(miformulario2.value.gender=="male"){
    console.log(miformulario2.value.gender)
    let productoMale = this.precios.filter((elemento)=>{
      return (elemento.talla==miformulario2.value.tallaPrenda && elemento.prenda!="falda" );
    }).map((ver: any)=>({...ver, cantidad:1, total:1*ver.precio}));
    this.shoppingCar=[...productoMale];
   this.sumarTotal();
   
  }else if(miformulario2.value.gender=="female"){
    console.log(miformulario2.value.gender)
    let productoFemale = this.precios.filter((elemento)=>{
      return (elemento.talla==miformulario2.value.tallaPrenda && elemento.prenda!="pantalon" );
    }).map((ver: any)=>({...ver, cantidad:1, total:1*ver.precio}));
    this.shoppingCar=[...productoFemale];
    this.sumarTotal();
  }


 /*  let otroproducto =this.precios.filter(elemento=>elemento.talla==miformulario2.value.tallaPrenda).map((ver: any)=>({...ver, cantidad:1, total:1*ver.precio}));
   this.shoppingCar=[...otroproducto];
   this.sumarTotal(); */
 }

  tallas:any[]=[
    {"talla":"6"},
    {"talla":"8"},
    {"talla":"10"},
    {"talla":"12"},
    {"talla":"14"},
    {"talla":"16"},
    {"talla":"m"},
    {"talla":"l"},
  ];

 precios:any[]=[
    {"prenda":"camibuso", "talla":"6", "precio":26000},
    {"prenda":"camibuso", "talla":"8", "precio":26000},
    {"prenda":"camibuso", "talla":"10", "precio":28000},
    {"prenda":"camibuso", "talla":"12", "precio":30000},
    {"prenda":"camibuso", "talla":"14", "precio":32000},
    {"prenda":"camibuso", "talla":"16", "precio":35000},
    {"prenda":"camibuso", "talla":"m", "precio":38000},
    {"prenda":"camibuso", "talla":"l", "precio":40000},
    {"prenda":"chaqueta", "talla":"6", "precio":50000},
    {"prenda":"chaqueta", "talla":"8", "precio":55000},
    {"prenda":"chaqueta", "talla":"10", "precio":60000},
    {"prenda":"chaqueta", "talla":"12", "precio":65000},
    {"prenda":"chaqueta", "talla":"14", "precio":70000},
    {"prenda":"chaqueta", "talla":"16", "precio":75000},
    {"prenda":"chaqueta", "talla":"m", "precio":80000},
    {"prenda":"chaqueta", "talla":"l", "precio":85000},
    {"prenda":"falda", "talla":"6", "precio":50000},
    {"prenda":"falda", "talla":"8", "precio":50000},
    {"prenda":"falda", "talla":"10", "precio":50000},
    {"prenda":"falda", "talla":"12", "precio":50000},
    {"prenda":"falda", "talla":"14", "precio":60000},
    {"prenda":"falda", "talla":"16", "precio":60000},
    {"prenda":"falda", "talla":"m", "precio":60000},
    {"prenda":"falda", "talla":"l", "precio":60000},
    {"prenda":"pantalon", "talla":"6", "precio":50000},
    {"prenda":"pantalon", "talla":"8", "precio":50000},
    {"prenda":"pantalon", "talla":"10", "precio":50000},
    {"prenda":"pantalon", "talla":"12", "precio":50000},
    {"prenda":"pantalon", "talla":"14", "precio":60000},
    {"prenda":"pantalon", "talla":"16", "precio":60000},
    {"prenda":"pantalon", "talla":"m", "precio":60000},
    {"prenda":"pantalon", "talla":"l", "precio":60000},
    {"prenda":"sudadera", "talla":"6", "precio":50000},
    {"prenda":"sudadera", "talla":"8", "precio":50000},
    {"prenda":"sudadera", "talla":"10", "precio":50000},
    {"prenda":"sudadera", "talla":"12", "precio":50000},
    {"prenda":"sudadera", "talla":"14", "precio":60000},
    {"prenda":"sudadera", "talla":"16", "precio":60000},
    {"prenda":"sudadera", "talla":"m", "precio":60000},
    {"prenda":"sudadera", "talla":"l", "precio":60000},
    {"prenda":"pantaloneta", "talla":"6", "precio":50000},
    {"prenda":"pantaloneta", "talla":"8", "precio":50000},
    {"prenda":"pantaloneta", "talla":"10", "precio":50000},
    {"prenda":"pantaloneta", "talla":"12", "precio":50000},
    {"prenda":"pantaloneta", "talla":"14", "precio":60000},
    {"prenda":"pantaloneta", "talla":"16", "precio":60000},
    {"prenda":"pantaloneta", "talla":"m", "precio":60000},
    {"prenda":"pantaloneta", "talla":"l", "precio":60000},
  ]; 

sumarTotal(){
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
