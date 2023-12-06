import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import {precios, tallas, tipoPrenda} from '../archives/arrays';



import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;






@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  shoppingCar:any[]=[];
  arrayCargarUnicamente:any[]=[];
  producto:any={};
  Total:number=0;
 
   tallas=tallas;
   precios=precios;
   tipoPrenda=tipoPrenda;
   
  miformulario2 = new FormGroup({
    tipoPrenda: new FormControl('', [Validators.required]),
    tallaPrenda: new FormControl('', [Validators.required]),
    cantidadPrenda: new FormControl('', [Validators.required, Validators.min(1)])
 });

 datosCliente = new FormGroup({
  name: new FormControl('', [Validators.required]),
  apellido: new FormControl('', [Validators.required]),
  identificacion: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999999999999)]),
 })

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

  /** */
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


  /***************************************** */
  /***************************************** */
  /***************************************** */
  /***************************************** */
  generarPDF() {
    // Definir la estructura de la tabla

   
    const columnas = ['id','Cantidad', 'Precio Unitario', 'Prenda', 'Talla', 'Total'];
    const filas:any []= [];
  
    // Llenar las filas con los datos del array
    this.shoppingCar.forEach((item, index) => {
      filas.push([(index+1).toString(), item.cantidad.toString(), "$"+item.precio.toString(), item.prenda, item.talla,"$"+ item.total.toString()]);
    });

    console.log(filas);

    const fechaActual = new Date();
    const fechaFormateada:any = this.formatearFecha(fechaActual);

    console.log(fechaFormateada);
  
    // Configurar la definición del documento PDF
    const docDefinition:any = {
      watermark: { text: 'CANCELADO', absolutePosition: { x: 0, y: 0 },  margin: [0, 0, 0, 0], color: 'red', opacity: 0.3, fontSize: 40},

      content: [
        
        { text: 'Factura de venta', style: 'header' },
        {
         text:["Nombre: ", this.datosCliente.value.name ," Apellido: ", this.datosCliente.value.apellido ," Identificación: ", this.datosCliente.value.identificacion]
        },
        {
          text:'\n'
        },
        {text: fechaFormateada},
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'], // Ancho de las columnas
            body: [columnas, ...filas], // Agregar filas
          },
        },
        {text: 'Total: $ ' + this.Total, style:'total'},

       
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        total:{
          fontSize:18,
          bold:true,
          color: 'red'
        }
      },
    };
  
    // Generar el PDF
    //pdfMake.createPdf(docDefinition).download('tabla_informacion.pdf');
    const pdf = pdfMake.createPdf(docDefinition);
    
    pdf.open();
      //pdf.download(); 

      

      
  }





  /*********************************** */
  /*********************************** */
  /*********************************** */

  /**funcion para obtener la fecha */

   formatearFecha(fecha: Date): string {
    const opcionesFecha: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
  
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const fechaFormateada = fecha.toLocaleDateString('es-CO', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-CO', opcionesHora);
  
    return `${fechaFormateada} ${horaFormateada}`;
  }


  /************************ */
 

}
