import { Component, OnInit } from '@angular/core';

import { Mp } from '../models/mp';
import { MpStoreService } from '../state/mp-store.service';

@Component({
  selector: 'app-pick-mp',
  templateUrl: './pick-mp.component.html',
  styleUrls: ['./pick-mp.component.scss']
})
export class PickMpComponent implements OnInit {

  selectedMp: Mp;

  results: Mp[];

  mpData: Mp[];

  constructor(private mpStore: MpStoreService) { }

  ngOnInit() {
    this.mpStore.mps
        .subscribe(mpData => this.mpData = mpData);
  }

  search(event) {
    let query = event.query;

    this.results = this.mpData.filter((mp: Mp) => {
      if (mp.constituency.toLowerCase().includes(query.toLowerCase()) ||
          mp.name.toLowerCase().includes(query.toLowerCase()) ||
          mp.email.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    });

    // this.results=[ 'Eastleigh' ];
    // this.results = [ this.mpData[0].constituency ];
  }
}
