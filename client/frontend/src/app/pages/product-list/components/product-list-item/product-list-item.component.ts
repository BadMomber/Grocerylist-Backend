import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent implements OnInit {
  @Input('productListItem')
  product: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  async onDeleteClicked() {
    try {
      await this.productService.deleteProduct(this.product._id);
      this.router.navigate(['/product-list']);
      this.route.paramMap.subscribe((params) => {
        const productId = params.get('productId');
        this.productService.getProduct(productId).then((product) => {
          this.product = product;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onDoneClicked() {
    try {
      this.product.purchased = true;
      await this.productService.updateProduct(this.product);
    } catch (error) {
      console.log(error);
    }
  }
}
