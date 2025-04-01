import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotonPressComponent } from './components/boton-press/boton-press.component';
import { BotonDeslizableComponent } from './components/boton-deslizable/boton-deslizable.component';

@NgModule({
  declarations: [
    AppComponent,
    BotonPressComponent,
    BotonDeslizableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
