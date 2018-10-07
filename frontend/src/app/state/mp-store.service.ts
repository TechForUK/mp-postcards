import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

import { Mp } from '../models/mp';

@Injectable({
  providedIn: 'root'
})
export class MpStoreService {

  private readonly mpDataUrl: string = 'assets/mp-data.json';

  private _mps: BehaviorSubject<Mp[]> = new BehaviorSubject([]);

  public readonly mps: Observable<Mp[]> = this._mps.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.getMpData()
      .subscribe(
        resp => {
          let mpData: Mp[] = [ ... resp.body ];
          this._mps.next(mpData);
        },
        err => console.log("Error retrieving Todos")
      );
  }

  private getMpData(): Observable<HttpResponse<Mp[]>> {
    return this.http.get<Mp[]>(
      this.mpDataUrl, { observe: 'response', responseType: 'json' })
        .pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'No MPs here! Oh dear!');
  };

}
