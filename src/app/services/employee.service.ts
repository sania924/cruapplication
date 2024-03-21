import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empVM } from '../modal/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private API_URL = 'http://localhost:4200/api/';
  constructor(private _http: HttpClient) {}

  // for get all employees data
  getAllEmployee() {
    return this._http.get(this.API_URL + 'employee');
  }
  // for save data and when sava data pass obj with datatype of interface
  addEmployee(empObj: empVM) {
    return this._http.post(this.API_URL + 'employee', empObj); //1st method
    // return this._http.post(`${this.API_URL}employee`,empObj);   //2nd method
  }

  // for updata employee data
  updateEmployee(empObj: empVM) {
    // return this._http.put(this.API_URL + 'employee',empObj);
    return this._http.put(`${this.API_URL}employee/${empObj.id}`, empObj);
  }
  // for get singlee employee
  getEmployee(empID: number) {
    // return this._http.get(this.API_URL + 'employee/' + empID);
    return this._http.get(`${this.API_URL}employee/${empID}`);
  }
  // for deleting
  DeleteEmployee(empID: number) {
    // return this._http.delete(this.API_URL + 'employee/' + empID); // method 1
    return this._http.delete(`${this.API_URL}employee/${empID}`); // method 2
  }
}
