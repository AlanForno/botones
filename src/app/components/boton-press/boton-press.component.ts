import { Component, Input } from '@angular/core';

@Component({
  selector: 'boton-press',
  standalone: false,
  templateUrl: './boton-press.component.html',
  styleUrl: './boton-press.component.scss',
})
export class BotonPressComponent {

  private intervaloCreciente: any = null;
  private intervaloDecreciente: any = null;

  @Input() public textoDelBoton: string = '';
  @Input() public color: string = 'gray';

  public mousePresionado: boolean = false;
  public progreso: number = 0.0;
  public progresoCompletado: boolean = false;
  public cargando: boolean = false;

  onMouseDown(): void {
    this.mousePresionado = true;
    clearInterval(this.intervaloCreciente);
    clearInterval(this.intervaloDecreciente);

    this.intervaloCreciente = setInterval(() => {
      if (this.progreso < 100 && this.mousePresionado) {
        this.progreso += 1;
      } else if (this.progreso === 100) {
        this.progresoCompletado = true;
        clearInterval(this.intervaloCreciente);
      }
    }, 20);
  }

  onMouseUp(): void {
    if (this.progreso !== 100) {
      this.mousePresionado = false;

      clearInterval(this.intervaloCreciente);

      this.intervaloDecreciente = setInterval(() => {
        if (Math.floor(this.progreso) > 0) {
          this.progreso -= 1;
        } else if (this.progreso === 0)
          clearInterval(this.intervaloDecreciente);
      }, 10);
    }
  }

}
