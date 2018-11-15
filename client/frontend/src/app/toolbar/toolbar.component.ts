import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  async onDownloadClicked() {
    try {
      await this.productService.getCsv();
    } catch (error) {
      console.log(error);
    }
  }

}
