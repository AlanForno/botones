import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, of, timer } from 'rxjs';

@Component({
  selector: 'boton-press',
  standalone: false,
  templateUrl: './boton-press.component.html',
  styleUrl: './boton-press.component.scss',
})
export class BotonPressComponent implements OnInit {
  @Input({required: true}) public textoInicial!: string;
  @Input() public textoProgresoCompletado: string = 'Completado';
  @Input() public color: string = 'gray';
  @Input() public ancho: string = '600px';
  @Output() progresoCompletadoEmitter = new EventEmitter<void>();
  
  private intervaloCreciente: any = null;
  private intervaloDecreciente: any = null;
  
  public textoDelBoton?: string;
  public mousePresionado: boolean = false;
  public progreso: number = 0.0;
  public progresoCompletado: boolean = false;
  public cargando: boolean = false;
  
  ngOnInit(): void {
    this.textoDelBoton = this.textoInicial;
  }
  
  onMouseDown(): void {
    this.mousePresionado = true;
    clearInterval(this.intervaloCreciente);
    clearInterval(this.intervaloDecreciente);

    this.intervaloCreciente = setInterval(() => {
      if (this.progreso < 100 && this.mousePresionado) {
        this.progreso += 1;
      } else if (this.progreso === 100) {
        this.progresoCompletado = true;
        this.cargando = true;
        this.progresoCompletadoEmitter.emit();
        clearInterval(this.intervaloCreciente);
      }
    }, 20);
  }

  onMouseUp(): void {
    if (this.progreso !== 100) {
      this.mousePresionado = false;

      clearInterval(this.intervaloCreciente);

      this.intervaloDecreciente = setInterval(() => {
        if (this.progreso > 0) {
          this.progreso -= 1;
        } else if (this.progreso === 0)
          clearInterval(this.intervaloDecreciente);
      }, 10);
    }
  }

  finalizarCarga(): void {
    timer(2000)
      .pipe(
        concatMap(() => {
          this.textoDelBoton = this.textoProgresoCompletado;
          this.cargando = false;
          return timer(2000);
        }),
        concatMap(() => {
          this.resetearBoton();
          return of([]);
        })
      ).subscribe();
  }

  private resetearBoton(): void {
    this.progresoCompletado = false;
    this.mousePresionado = false;
    this.progreso = 0;
    this.textoDelBoton = this.textoInicial;
  }

}
