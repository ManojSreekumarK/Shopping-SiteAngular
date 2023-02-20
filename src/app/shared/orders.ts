export interface Orders {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  card: string;
  order: Array<any>;
  total: number;
}
