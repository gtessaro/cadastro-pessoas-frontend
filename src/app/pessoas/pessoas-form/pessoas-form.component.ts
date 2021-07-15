import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.css']
})
export class PessoasFormComponent implements OnInit {

  pessoa: Pessoa;
  success: boolean = false;
  errors: string[];
  id: number;


  constructor(
    private service: PessoasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
    this.pessoa = new Pessoa();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params && params.id){
        this.id=params.id;
        this.service.getById(this.id)
            .subscribe(
              resposnse => {
                this.pessoa = resposnse; 
                console.log(this.pessoa);
                this.errors = [];
              },
              errorResponse => {
                  this.pessoa = new Pessoa();
                  this.errors = errorResponse.error;
                  this.success = false;
              }
            )
      }
    });
    
    
  }

  onSubmit(){
    this.pessoa.cpf = this.pessoa.cpf.replace('.','').replace('-','').replace('.','');
    
    if(this.id){
      this.service
      .atualizar(this.pessoa)
      .subscribe( response => {
          this.success = true;
          this.errors = [];
          this.pessoa = response;
        }, errorResponse => {
          this.errors = errorResponse.error;
          this.success = false;
        }
      );
    }else{
      
      console.log(this.pessoa);
      this.service
        .salvar(this.pessoa)
        .subscribe( response => {
            console.log(response);
            this.success = true;
            this.errors = [];
            this.pessoa = response;
          }, errorResponse => {
            console.log(errorResponse);
            this.errors = errorResponse.error;
            this.success = false;
          }
        );
    }
  }

  voltar(){
    this.router.navigate(['/pessoas/lista']);
  }

}
