import { Actor } from './actor';

export interface Department extends Actor {
  subDepartments: Department[];
}
