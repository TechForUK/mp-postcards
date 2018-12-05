import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PickMpComponent } from './pick-mp/pick-mp.component';
import { PickTopicComponent } from './pick-topic/pick-topic.component';
import { PreviewCardComponent } from './preview-card/preview-card.component';
import { CardSentComponent } from './card-sent/card-sent.component';
import { WriteCardComponent } from './write-card/write-card.component';
import { PostcardLengthValidatorDirective } from './shared/postcard-length-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PickMpComponent,
    PickTopicComponent,
    PreviewCardComponent,
    CardSentComponent,
    WriteCardComponent,
    PostcardLengthValidatorDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
