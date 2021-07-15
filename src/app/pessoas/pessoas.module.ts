import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';
import { FormsModule } from '@angular/forms';
import { PessoasListaComponent } from './pessoas-lista/pessoas-lista.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PessoasFormComponent, PessoasListaComponent],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    FormsModule,
    NgbModule
  ],
  exports: [PessoasFormComponent,
            PessoasListaComponent
  ]
})
export class PessoasModule { }
