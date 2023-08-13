import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'elementRefAndRenderer2';
  @ViewChild("vc", {static: true}) elementView!: ElementRef;

  constructor(public entRef: ElementRef,private renderer:Renderer2) {
  }

  ngOnInit() {
    /*
      note:Use ElementRef API as the last resort when direct access to DOM is needed.
      Use templating and data-binding provided by Angular instead.
      Alternatively you can take a look at Renderer2 which provides an API that can be safely used.
    */


    // It'll work in ngOnInit() only when we declared it as {static:true}
    this.elementView.nativeElement.style.backgroundColor = "blue";//<- Direct way to access a DOM element,
    // i.e by bypassing all angular features
    // *** This may lead to XSS cross site scripting attack because of direct usage of DOM.
    this.entRef.nativeElement.style.backgroundColor = "black";
  }

  ngAfterViewInit() {
    // note: elementRef will only work after the view has been initialized.
    this.elementView.nativeElement.style.backgroundColor = "red";

    this.renderer.setStyle(//<- Proper way access a DOM element using angular
      this.elementView.nativeElement,
      'background-color',
      'green'
    )
  }
}
