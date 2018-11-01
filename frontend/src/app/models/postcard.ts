import { Mp } from './mp';

export interface Postcard {
  mp: Mp;
  body: string;
  name: string;
  address: string;
  email: string;
}
