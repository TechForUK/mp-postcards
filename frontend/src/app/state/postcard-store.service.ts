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
    body: undefined,
    name: undefined,
    address: undefined,
    email: undefined
  }

  private _postcard: BehaviorSubject<Postcard> = new BehaviorSubject(this.cardState);

  public readonly postcard: Observable<Postcard> = this._postcard.asObservable();

  constructor() { }

  addMp(mp: Mp, postcode: string) {
    this.cardState.mp = mp;
    this.cardState.address = postcode;

    this._postcard.next(this.cardState);
  }

  addPostcard(body: string, name: string, address: string, email: string) {
    this.cardState.body = body;
    this.cardState.name = name;
    this.cardState.address = address;
    this.cardState.email = email;

    this._postcard.next(this.cardState);
  }
}
