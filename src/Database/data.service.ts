import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { empVM } from '../app/modal/employee';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    let employee: empVM[] = [
      {
        id: 1,
        department: 'Accounts',
        empName: 'Ali',
        mobile: '12345678',
        gender: 'Male',
        joinDate: '2015-04-04',
        email: 'sania924@gmail.com',
        salary: 2500,
        password: '12345',
        empStatus: true,
      },

      {
        id: 2,
        department: 'Manager',
        empName: 'ahmad',
        mobile: '6778575',
        gender: 'Male',
        joinDate: '2015-04-04',
        email: 'company924@gmail.com',
        salary: 2500,
        password: '67890',
        empStatus: false,
      },

      {
        id: 3,
        department: 'Account',
        empName: 'sania',
        mobile: '234567',
        gender: 'female',
        joinDate: '2015-04-04',
        email: 'saniayasin924@gmail.com',
        salary: 50000,
        password: '1222345',
        empStatus: true,
      },
    ];
    return { employee };
  }
}
