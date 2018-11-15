import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductListItemComponent} from './pages/product-list/components/product-list-item/product-list-item.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductDetailComponent} from './pages/product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, ProductListComponent, ProductListItemComponent, ProductDetailComponent, StatsComponent, NewProductComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
