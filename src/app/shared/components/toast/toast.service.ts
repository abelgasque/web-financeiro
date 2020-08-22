import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(msg: string) {
    this.messageService.add({severity:'success', summary: msg, detail:''});
  }

  showInfo(msg: string) {
      this.messageService.add({severity:'info', summary: msg, detail:''});
  }

  showWarn(msg: string) {
      this.messageService.add({severity:'warn', summary: msg, detail:''});
  }

  showError(msg: string) {
      this.messageService.add({severity:'error', summary: msg, detail:''});
  }

  showCustom(msg: string) {
      this.messageService.add({key: 'custom', severity:'info', summary: msg, detail:''});
  }

  showTopLeft(msg: string) {
      this.messageService.add({key: 'tl', severity:'info', summary: msg, detail:''});
  }

  showTopCenter(msg: string) {
      this.messageService.add({key: 'tc', severity:'warn', summary: msg, detail:''});
  }

  showConfirm() {
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary: 'Atenção!', detail:'Tem certeza que as alterações sejam feitas?'});
  }

  showMultiple() {
      this.messageService.addAll([
          {severity:'info', summary:'Message 1', detail:'PrimeNG rocks'},
          {severity:'info', summary:'Message 2', detail:'PrimeUI rocks'},
          {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
      ]);
  }

  onConfirm() {
      this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }

  clear() {
      this.messageService.clear();
  }
}
