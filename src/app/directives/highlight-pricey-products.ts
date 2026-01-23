import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightPriceyProducts]',
})
export class HighlightPriceyProducts {

  // input is signal to accept input values
  isPricey = input<boolean>(false);
  // inject ElementRef to access the host element
  el = inject(ElementRef);

  styleEffect = effect(() => {
    if (this.isPricey()) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.el.nativeElement.style.backgroundColor = 'transparent';
    }
  })
}
