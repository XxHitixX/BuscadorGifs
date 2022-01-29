import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string =  'c0SZZp7IrFOm9Y65B0hKQ1Abdtrb0YTF';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs'; //se hace para centralizar la info esto siempre va a ser lo mismo
  private _historial:string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resultado: Gif[] = [];

  get historial(){

    return [...this._historial];
  }

  buscarGifs(query: string = ''){
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,9);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('q', query)
        .set('limit', '10');
        

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, {params})
        .subscribe( resp => {
           this.resultado = resp.data;
           localStorage.setItem('resultado', JSON.stringify(this.resultado)!);
        });
  }

  constructor(private http: HttpClient){
    //parse() hace que una cadena de texto vuelva a su estado original, arreglo u objeto
    //stringify() hace lo contrario convierte un objeto o arreglo en cadena de texto o JSON que pueda ser tratado como string
    //Esta es una manera en una linea de hhacer lo mismo sin el If 
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    if (localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    
    this.resultado = JSON.parse(localStorage.getItem('resultado')!);

  }

}
