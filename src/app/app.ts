import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ProductService } from './services/product/product-service';

@Component({
  selector: 'app-root', // Index.html uses <app-root></app-root>
  imports: [RouterOutlet, RouterLinkWithHref], // Needed to use other components/directives in the template
  // template: `<h1>{{ title }}</h1>`, // It can be url or inline template, we can refrence fields from the class
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ProductService], // Registering the service at component level
})

export class App {


  

}
