import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.product = new Product();
    })
  }
  async onSaveClicked() {
    try {
      await this.productService.createProduct(this.product);
      this.router.navigate(['/product-list']);
    } catch (error) {
      console.log(error);
    }
  }
}
