import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService
                    .tentarLogar(this.username,this.password)
                    .subscribe(response =>{
                      const access_token = JSON.stringify(response);

                      localStorage.setItem('access_token',access_token);

                      console.log(response);
                      this.router.navigate(['/home']);
                    }, error => {
                      this.mensagemErro = 'Usuário e/ou senha incorretos';
                    });


  }

  preparaCadastro(event){
    event.preventDefault();
    this.cadastrando=true;
  }

  cancelaCadastro(){
    this.cadastrando=false;
    this.mensagemSucesso = null;
    this.loginError = false;
    this.mensagemErro = null;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
      .subscribe( reposnse => {
        this.mensagemSucesso = "Cadastro realizado com sucesso.";
        this.loginError = false;
        this.mensagemErro = null;
        this.cadastrando = false;
        this.username = "";
        this.password = "";
      }, responseError => {
        this.loginError = true;
        this.mensagemSucesso = null;
        this.mensagemErro = "Erro ao cadastrar usuário."
      });


  }

}
