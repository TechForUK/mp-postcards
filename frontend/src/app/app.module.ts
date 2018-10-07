import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
