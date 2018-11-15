import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:4000/api/products';
  downloadUrl = this.baseUrl + "/csv";

  constructor(private httpClient: HttpClient) {}

  async getProduct(productId: string) {
    const result = await this.httpClient.get<any>(`${this.baseUrl}/${productId}`).toPromise();
    return result.data;
  }

  async getProducts() {
    const result = await this.httpClient.get<any>(this.baseUrl).toPromise();
    return result.data;
  }
  async createProduct(product: Product) {
    const result = await this.httpClient.post<any>(this.baseUrl, product).toPromise();
    return result.data;
  }

  async updateProduct(product: Product) {
    const result = await this.httpClient.put<any>(`${this.baseUrl}/${product._id}`, product).toPromise();
    return result.data;
  }

  async deleteProduct(productId: string) {
    const result = await this.httpClient.delete(`${this.baseUrl}/${productId}`).toPromise();
    return result;
  }

  async getCsv() {
    const result = await this.httpClient.get(`${this.baseUrl}/csv`, {responseType: 'text'}).toPromise();
    const blob = new Blob([result], {type: 'text/csv;charset=utf-8'});
    FileSaver.saveAs(blob, 'groceries.csv');
    return result;
  }
}
