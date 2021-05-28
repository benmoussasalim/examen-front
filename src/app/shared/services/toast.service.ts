import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  public success(message: string, detail: string) {
    this.messageService.add({severity: 'success', summary: message, detail: detail});
  }

  public warning(message: string, detail: string) {
    this.messageService.add({severity: 'warn', summary: message, detail: detail});
  }

  public error(message: string, detail: string) {
    this.messageService.add({severity: 'error', summary: message, detail: detail});
  }
}
