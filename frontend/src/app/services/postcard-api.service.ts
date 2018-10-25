import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Mp } from '../models/mp';

const MPS_API_URL = environment.mpsApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostcardApiService {

  constructor(private http: HttpClient) { }

  lookupMps(query: string): Observable<any> {
    return this.http
      .get(MPS_API_URL + query).pipe(
        map((response: any) => {
          return {
            mps: <Mp[]>response.mps.map(item => {
              return new Mp(
                item.member_id,
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
}
