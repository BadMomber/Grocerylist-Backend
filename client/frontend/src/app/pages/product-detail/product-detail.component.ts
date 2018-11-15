import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  mode: 'new' | 'edit' | 'view' = 'view';

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('productId');
      if (productId == 'new') {
        this.mode = 'new';
        this.product = new Product();
      } else {
        this.productService.getProduct(productId).then((product) => {
          this.product = product;
        });
      }
    });
  }

  async onSaveClicked() {
    try {
      if (this.mode === 'new') {
        await this.productService.createProduct(this.product);
        this.router.navigate(['/product-list']);
      } else if (this.mode === 'edit') {
        await this.productService.updateProduct(this.product);
        this.mode = 'view';
      }
    } catch (error) {
      console.log(error);
    }
  }

  onEditClicked() {
    this.mode = 'edit';
  }

  onBackClicked() {
    this.router.navigate(['/product-list']);
  }

  async onDeleteClicked() {
    try {
      await this.productService.deleteProduct(this.product._id);
      this.router.navigate(['/product-list']);
    } catch (error) {
      console.log(error);
    }
  }
}
