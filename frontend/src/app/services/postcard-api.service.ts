import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Mp } from '../models/mp';
import { Postcard } from '../models/postcard';

const LOOKUP_MP_URL = environment.lookupMpUrl;
const SUBMIT_POSTCARD_URL = environment.submitPostcardUrl;

@Injectable({
  providedIn: 'root'
})
export class PostcardApiService {

  constructor(private http: HttpClient) { }

  lookupMps(query: string): Observable<any> {
    return this.http
      .get(LOOKUP_MP_URL + query).pipe(
        map((response: any) => {
          return {
            mps: <Mp[]>response.mps.map(item => {
              return new Mp(
                item.member_id,
                'mp@example.org',
                item.member_name,
                item.full_title,
                item.party_id,
                item.party_name,
                item.constituency_name,
                item.consituency_id,
                item.constituency_onscode
              );
            }),
            postcodeLookup: <boolean>response.postcodeLookup
          }
        })
      );
  }

  submitPostcard(postcard: Postcard): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const body = {
      subject: postcard.topic.description,
      image: postcard.topic.image,
      mpEmail: postcard.mp.memberEmail,
      message: postcard.message,
      name: postcard.name,
      email: postcard.email,
      address: postcard.address
    }

    return this.http
      .post(SUBMIT_POSTCARD_URL, body, options).pipe(
        map((response: any) => {
          return { submitted: true };
        }),
        catchError(err => of({ submitted: false }))
      );
  }
}
