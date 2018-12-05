import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PickMpComponent }      from './pick-mp/pick-mp.component';
import { PickTopicComponent }      from './pick-topic/pick-topic.component';
import { WriteCardComponent }      from './write-card/write-card.component';
import { PreviewCardComponent }      from './preview-card/preview-card.component';
import { CardSentComponent }      from './card-sent/card-sent.component';

// Unlikely that these will stay as routes but it's quick and hacky!
const routes: Routes = [
  { path: '', redirectTo: '/pick-topic', pathMatch: 'full' },
  { path: 'pick-mp', component: PickMpComponent },
  { path: 'pick-topic', component: PickTopicComponent },
  { path: 'write-card', component: WriteCardComponent },
  { path: 'preview-card', component: PreviewCardComponent },
  { path: 'card-sent', component: CardSentComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
