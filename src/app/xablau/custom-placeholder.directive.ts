import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomPlaceholder]'
})
export class CustomPlaceholderDirective implements OnInit {

  constructor(
    private campo: ElementRef
  ) { }

  ngOnInit(): void {
    const campo = this.campo.nativeElement;

    if(!campo.name) {
      throw new Error('Atributo "name" é obrigatório');
    }

    campo.setAttribute('placeholder', `digite o ${campo.name}`)
  }
}
