import { Component, ViewChild } from '@angular/core';
import { BotonPressComponent } from './components/boton-press/boton-press.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'componentes';
  @ViewChild(BotonPressComponent) btnPress!: BotonPressComponent;

  onProgresoCompletado() {
    this.btnPress.finalizarCarga();
  }

  onClick(textoBoton: string) {
    if (textoBoton.toLowerCase() === 'izquierdo')
      console.log('Caso donde se clickeo el boton de la izquierda');
  }

}
