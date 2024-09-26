import { Directive, ElementRef, HostListener, inject, Renderer2, input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  public readonly DEFAULT_BG_COLOR: string = "#FFFF00";
  public readonly DEFAULT_TEXT_COLOR: string = "#FFF";
  highlightColor = input<string>(this.DEFAULT_BG_COLOR);

  @HostListener('mouseup') onMouseUp() {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && selectedText.length > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor());
      this.renderer.setStyle(this.el.nativeElement, 'color', this.DEFAULT_TEXT_COLOR);
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }

}
