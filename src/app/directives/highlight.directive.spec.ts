import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('p');
    elementRef = new ElementRef(mockElement);

    const rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);

    TestBed.configureTestingModule({
      providers: [
        HighlightDirective,
        { provide: ElementRef, useValue: elementRef },
        { provide: Renderer2, useValue: rendererMock },
      ]
    });

    directive = TestBed.inject(HighlightDirective);
    renderer = TestBed.inject(Renderer2);
  });

  it('should highlight the element with default color on text selection', () => {
    spyOn(window, 'getSelection').and.returnValue({
      toString: () => 'sample text',
    } as Selection);

    directive.onMouseUp();

    expect(renderer.setStyle).toHaveBeenCalledWith(
      mockElement,
      'background-color',
      directive.DEFAULT_BG_COLOR
    );
    expect(renderer.setStyle).toHaveBeenCalledWith(
      mockElement,
      'color',
      directive.DEFAULT_TEXT_COLOR
    );
  });

  it('should remove highlight when there is no text selection', () => {
    spyOn(window, 'getSelection').and.returnValue({
      toString: () => '',
    } as Selection);

    directive.onMouseUp();

    expect(renderer.removeStyle).toHaveBeenCalledWith(mockElement, 'background-color');
    expect(renderer.removeStyle).toHaveBeenCalledWith(mockElement, 'color');
  });
});
