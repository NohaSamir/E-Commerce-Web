import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent {

  @Input() product: Product | null = null;

}
