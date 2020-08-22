import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { LancamentoFilter, Pessoa, Lancamento } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { LancamentosService } from './lancamentos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  filtro = new LancamentoFilter();
  lancamentos: any[] = [];
  pessoas: any[] = [];
  displaySpinner: boolean = false;
  displayFormLancamento: boolean = false;
  lancamentoForm = new Lancamento();

  constructor(
    private pessoasService: PessoasService,
    private lancamentosService: LancamentosService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  novoLancamento(){
    this.displayFormLancamento = true;
    this.lancamentoForm = new Lancamento();
  }

  aoMudarPagina(event: LazyLoadEvent){
    this.filtro.pagina = event.first/event.rows;
    this.pesquisar();
  }

  pesquisar(){
    this.displaySpinner = true;
    this.lancamentosService.pesquisar(this.filtro)
    .then(response =>{
      this.filtro.total = response.total;
      this.lancamentos = response.lancamentos;
      this.displaySpinner = false;
    })
    .catch(erro =>{
      this.toastService.showError("Erro ao pesquisar lançamentos!");
      this.displaySpinner = false;
    });
  }

  buscarPorId(id: number){
    this.displaySpinner = true;
    this.lancamentosService.buscarPorId(id)
    .then(response =>{
      if(response != null){
        response.dataVencimento = moment(response.dataVencimento, 'YYYY-MM-DD').toDate();
        if(response.dataPagamento != null){
          response.dataPagamento = moment(response.dataPagamento, 'YYYY-MM-DD').toDate();
        }
        this.lancamentoForm = response;
      }
      this.displaySpinner = false;
    })
    .catch(erro =>{
      console.log(erro);
      this.displaySpinner = false;
    });
  }

  getLancamento(id: number){
    this.buscarPorId(id);
    this.displayFormLancamento = !this.displayFormLancamento;
  }

  confirmarExclusao(id: number){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir lançamento?',
    accept: ()=>{
      this.excluir(id);
    }});
  }

  excluir(id: number){
    this.displaySpinner = true;
    this.lancamentosService.excluir(id)
    .then(retorno =>{
      this.toastService.showSuccess("Lançamento excluido com sucesso!");
      this.pesquisar();
    })
    .catch(erro =>{
      this.toastService.showError("Erro ao excluir lançamento!");
      this.displaySpinner = false;
    });
  }

  carregarPessoas(){
    this.pessoasService.listar()
    .then(response =>{
      if(response.length > 0){
        for(let i=0; i<response.length;i++){
          let pessoa = {
            'label': response[i].nome,
            'value': response[i].id,
          }
          this.pessoas.push(pessoa);
        }
      }
    })
    .catch(erro =>{
      console.log(erro);
    });
  }
}