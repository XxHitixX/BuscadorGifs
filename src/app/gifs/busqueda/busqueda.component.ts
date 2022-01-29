import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{
  // es una alternativa al ngModel
  @ViewChild('txtValue') txtValue!:ElementRef<HTMLInputElement> //Puedo sacar referencias a etiquetas o directivas con esta anotacion es una alternativa a 
  buscar(){
    if( this.txtValue.nativeElement.value.trim().length === 0){
      return;
    }
    this.gifService.buscarGifs(this.txtValue.nativeElement.value);
    this.txtValue.nativeElement.value = '';
  }

  constructor(private gifService: GifsService){}
}
