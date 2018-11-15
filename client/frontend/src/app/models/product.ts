export class Product {
  _id?: string;
  name: string;
  description: number;
  amount: string;
  unit: number;
  created_at?: number;
  updated_at?: number;
  purchased: boolean;
  gtin?: string;
  price?: string;
  priceSummed?: string;
  category?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
