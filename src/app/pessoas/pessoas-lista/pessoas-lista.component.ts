import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrls: ['./pessoas-lista.component.css']
})
export class PessoasListaComponent implements OnInit {

  pessoas: Pessoa[];
  pessoaSelecionada: Pessoa;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: PessoasService, 
    private router: Router) { }

  ngOnInit(): void {
    this.service.getPessoas().subscribe( response => {
      this.pessoas = response;
    });
  }

  novoCadastro(){
    this.router.navigate(['/pessoas/form'])
  }

  
  deletar(){
    console.log(this.pessoaSelecionada);

    this.service
      .deletar(this.pessoaSelecionada)
      .subscribe(
        response => {
          this.mensagemSucesso = "Pessoa deletada com sucesso!";
          this.ngOnInit();
      },
        responseError => this.mensagemErro = "Erro ao deletar pessoas!"
      );
  }

  preparaDelecao(pessoa: Pessoa){
    this.pessoaSelecionada = pessoa;
  }

}
