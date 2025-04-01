import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'boton-deslizable',
  standalone: false,
  templateUrl: './boton-deslizable.component.html',
  styleUrl: './boton-deslizable.component.scss'
})
export class BotonDeslizableComponent {

  @Input() public anchoTotal: string = '600px';
  @Input() public textoFrontal: string = 'Deslizar';
  @Input() public colorFrontal: string = '#787878';
  @Input() public textoBotonIzquierdo: string = 'Izquierdo';
  @Input() public colorBotonIzquierdo: string = '#2c7a2c';
  @Input() public textoBotonDerecho: string = 'Derecho';
  @Input() public colorBotonDerecho: string = '#931e1e';
  @Output() clickEmitter = new EventEmitter<any>();

  private limiteDesplazamiento: number = 0;
  public desplazamientoHorizontal: number = 0;

  @ViewChild('botones') botones!: ElementRef;

  onPan(event: any): void {
    const boton = this.botones.nativeElement.querySelector('button');
    this.limiteDesplazamiento = parseFloat(getComputedStyle(boton).width);

    if (Math.abs(event.deltaX) < this.limiteDesplazamiento)
      this.desplazamientoHorizontal = event.deltaX;
  }  
  
  onMouseUp(): void {
    if (Math.abs(this.desplazamientoHorizontal) >= (this.limiteDesplazamiento * 0.5))
      if (this.desplazamientoHorizontal < 0)
        this.desplazamientoHorizontal = this.limiteDesplazamiento * -1;
      else
        this.desplazamientoHorizontal = this.limiteDesplazamiento;
    else
      this.desplazamientoHorizontal = 0;
  }

  reset(): void {
    this.desplazamientoHorizontal = 0;
  }

  onClick(textoBoton: string): void {
    this.clickEmitter.emit(textoBoton);
  }

}
