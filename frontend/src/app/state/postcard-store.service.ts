import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Mp } from '../models/mp';
import { Postcard } from '../models/postcard';

@Injectable({
  providedIn: 'root'
})
export class PostcardStoreService {

  private cardState: Postcard = {
    mp: undefined,
    body: '',
    name: '',
    email: ''
  }

  private _postcard: BehaviorSubject<Postcard> = new BehaviorSubject(this.cardState);

  public readonly postcard: Observable<Postcard> = this._postcard.asObservable();

  constructor() { }

  addMp(mp: Mp) {
    this.cardState.mp = mp;

    this._postcard.next(this.cardState);
  }

  addBody(body: string) {
    this.cardState.body = body;

    this._postcard.next(this.cardState);
  }

  addName(name: string) {
    this.cardState.name = name;

    this._postcard.next(this.cardState);
  }

  addEmail(email:string) {
    this.cardState.email = email;

    this._postcard.next(this.cardState);
  }
}
