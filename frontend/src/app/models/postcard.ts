import { Mp } from './mp';
import { Topic } from './topic';

export interface Postcard {
  mp: Mp;
  topic: Topic;
  message: string;
  name: string;
  address: string;
  email: string;
}
