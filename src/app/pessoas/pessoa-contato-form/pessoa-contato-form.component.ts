import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Contato } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-contato-form',
  templateUrl: './pessoa-contato-form.component.html',
  styleUrls: ['./pessoa-contato-form.component.css']
})
export class PessoaContatoFormComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  displayFormContato: boolean = false;
  contatoForm = new Contato();
  contatoIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  novoContato(form: NgForm) {
    form.resetForm();
    this.contatoForm = new Contato();
    this.contatoIndex = this.contatos.length;
    this.displayFormContato = true;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contatoForm = this.clonarContato(contato);
    this.contatoIndex = index;
    this.displayFormContato = true;
  }

  confirmarContato(form: NgForm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contatoForm);
    form.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {
    let clonarContato = {
      'id': contato.id,
      'nome': contato.nome,
      'email': contato.email,
      'telefone': contato.telefone
    }
    return clonarContato;
  }
}
