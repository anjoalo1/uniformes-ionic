import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {precios, tallas, tipoPrenda} from '../archives/arrays';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss'],
})
export class CotizacionComponent  implements OnInit {
  
  constructor() { }
  
  ngOnInit() {}
  
  shoppingCar:any[]=[];
  arrayCargarUnicamente:any[]=[];
  producto:any={};
  Total:number=0;
  tallas = tallas;
  precios=precios;
  tipoPrenda=tipoPrenda;
  
  miformulario2 = new FormGroup({
    tipoPrenda: new FormControl('', [Validators.required]),
    tallaPrenda: new FormControl('', [Validators.required]),
    cantidadPrenda: new FormControl('', [Validators.required, Validators.min(1)])
 });


  addPerson(miformulario:any):void{
    const pasarVariable = miformulario.value;
    this.producto={};
    this.producto = {...this.precios.find((p:any) => p.prenda === miformulario.value.tipoPrenda && p.talla === miformulario.value.tallaPrenda)};

    let precioTotal =this.producto.precio*miformulario.value.cantidadPrenda;
    this.producto.total = precioTotal;
    this.producto.cantidad = miformulario.value.cantidadPrenda;
    this.shoppingCar.push(this.producto);
    this.sumarTotal();
  
  }


  sumarTotal(){
    const sumaPrecios: number = this.shoppingCar.reduce((acumulador, producto) => {
      return acumulador + producto.total;
    }, 0);
    this.Total = sumaPrecios;
  }

   obtenerPrecio1(pasarVariable:any){
  }

  seleccionarOpcion(args:any) {
    let valores = args.originalTarget.value;
    this.arrayCargarUnicamente=this.precios.filter(x=>x.prenda==valores);
  }
  
  borrarElemento(i:number): void{
    this.shoppingCar.splice(i,1);
    this.sumarTotal();
  }

  borrarDatos():void {
    this.shoppingCar =[];
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

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.shoppingCar =[];
        this.sumarTotal();
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}