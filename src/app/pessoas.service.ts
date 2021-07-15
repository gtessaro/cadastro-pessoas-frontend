import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './pessoas/pessoa';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) { }
  baseUrl='http://localhost:8080/';

  apiUrl: string = environment.apiURLBase+"/api/v1/pessoas";

  getPessoas() : Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getById(id: number) : Observable<Pessoa>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl,pessoa); 
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`,pessoa); 
  }

  deletar(pessoa: Pessoa): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${pessoa.id}`);
  }
}
