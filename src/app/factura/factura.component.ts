import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

   
  miformulario2 = new FormGroup({
    tipoPrenda: new FormControl('', [Validators.required]),
    tallaPrenda: new FormControl('', [Validators.required]),
    cantidadPrenda: new FormControl('', [Validators.required, Validators.min(1)])
 });


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
  ];


  tipoPrenda:any[]=[
    {"prenda":"camibuso"},
    {"prenda":"chaqueta"},
    {"prenda":"pantalon"},
    {"prenda":"falda"},   
  ];







  shoppingCar:any[]=[];

  producto:any={};
  Total:number=0;


 



  //validacion:boolean=this.miFormulario.invalid;


  addPerson(miformulario:any):void{
    console.log(miformulario.value.tipoPrenda);
    console.log(miformulario.value.tallaPrenda);
    console.log(miformulario.value);
    const pasarVariable = miformulario.value;
    console.log(pasarVariable);
  

    

    this.producto={};
    this.producto = {...this.precios.find((p:any) => p.prenda === miformulario.value.tipoPrenda && p.talla === miformulario.value.tallaPrenda)};

    console.log(this.producto);
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

    console.log(sumaPrecios);
    this.Total = sumaPrecios;
  }


   obtenerPrecio1(pasarVariable:any){

    console.log(pasarVariable.value);
    
   /*  let producto = this.precios.find((p:any) => p.prenda === formulario.value.tipoPrenda && p.talla === formulario.value.tallaPrenda)
    let precioTotal =this.producto.precio*formulario.value.cantidadPrenda;
    return producto; */
  }




  seleccionarOpcion(args:any) {
    console.log(args.originalTarget.value);
    let valores = args.originalTarget.value;
    this.arrayCargarUnicamente=this.precios.filter(x=>x.prenda==valores);
    
  }
  
  
  arrayCargarUnicamente:any[]=[];

  borrarElemento(i:number): void{
    this.shoppingCar.splice(i,1);
    this.sumarTotal();
  }

  borrarDatos():void {
    this.shoppingCar =[];
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

}
