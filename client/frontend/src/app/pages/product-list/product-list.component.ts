import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  boughtProducts: Product[] = [];
  openProducts: Product[] = [];

  view: 'bought' | 'open' | 'all' = 'all';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().then((products) => {
      this.products = products;
      this.boughtProducts = products.filter(function(product) {
        return product.purchased === true;
      })
      this.openProducts = products.filter(function(product) {
        return product.purchased === false;
      })
    });
  }

  onShowDoneClicked() {
    this.view = 'bought';
  }

  onShowOpenClicked() {
    this.view = 'open';
  }

  onShowAllClicked() {
    this.view = 'all';
  }
}
