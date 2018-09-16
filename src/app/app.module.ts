import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PickMpComponent } from './pick-mp/pick-mp.component';
import { PickTopicComponent } from './pick-topic/pick-topic.component';
import { SignOffComponent } from './sign-off/sign-off.component';
import { ConfirmSendComponent } from './confirm-send/confirm-send.component';
import { CardSentComponent } from './card-sent/card-sent.component';
import { WriteCardComponent } from './write-card/write-card.component';
import { ConfirmMpComponent } from './confirm-mp/confirm-mp.component';

@NgModule({
  declarations: [
    AppComponent,
    PickMpComponent,
    PickTopicComponent,
    SignOffComponent,
    ConfirmSendComponent,
    CardSentComponent,
    WriteCardComponent,
    ConfirmMpComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
