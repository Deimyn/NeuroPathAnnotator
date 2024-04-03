import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './components/components/section/section.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageBoxComponent } from './components/components/image-box/image-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    ImageBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
