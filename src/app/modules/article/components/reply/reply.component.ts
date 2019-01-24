import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.styl']
})
export class ReplyComponent implements OnInit {
  @Input()
  id: string;

  replyForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    text: ['']
  });

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _resHandlerSer: ResponseHandlerService
  ) {}

  onSubmit(e: Event) {
    const data = Object.assign({ article: this.id }, this.replyForm.value);
    this._http
      .post<IResponse<any>>('/article/message', data)
      .pipe(catchError(err => of(err)))
      .subscribe(d => {
        this._resHandlerSer.handleReaction(d);
      });
  }

  getErrorMessage(input: string) {
    switch (input) {
      case 'name':
        if (this.replyForm.get('email').hasError('required')) {
          return 'You must enter a value';
        }
        break;
      case 'email':
        if (this.replyForm.get('email').hasError('required')) {
          return 'You must enter a value';
        } else if (this.replyForm.get('email').hasError('email')) {
          return 'Not a valid email';
        }
    }
  }

  ngOnInit() {}
}
