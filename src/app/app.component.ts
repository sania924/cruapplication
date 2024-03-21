import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from '../helpers/config';
import { empVM } from './modal/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'crudapplication';
  employeeForm: FormGroup = new FormGroup({});
  employees: empVM[] = []; //  create varible which hold data for each employee
  buttonText: string = 'Save';
  operation: DBOperation = DBOperation.create; // fix type error
  constructor(
    private formbuilder: FormBuilder,
    private empService: EmployeeService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.setEmpForm();
    this.allEmployee();
  }
  setEmpForm() {
    this.buttonText = 'Save';
    this.operation = DBOperation.create;
    this.employeeForm = this.formbuilder.group({
      id: ['0'],
      department: ['', Validators.required],
      empName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', Validators.required, ,],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      empStatus: ['false', Validators.required],
    });
  }
  formSubmit() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      return;
    }
    switch (this.operation) {
      case DBOperation.create:
        this.empService
          .addEmployee(this.employeeForm.value)
          .subscribe((res) => {
            this.toastr.success(
              'Employee Added Successfully',
              'Employee Registration'
            );

            this.allEmployee();
            this.resetbtn();
          });
        break;
      case DBOperation.update:
        this.empService
          .updateEmployee(this.employeeForm.value)
          .subscribe((res) => {
            this.toastr.success(
              'Employee update Successfully',
              'Employee Registration'
            );

            this.allEmployee();
            this.resetbtn();
          });
        break;
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
  // deletebtn() {
  //   this.employeeForm.reset();
  // }
  resetbtn() {
    this.employeeForm.reset();
    this.buttonText = 'Save';
  }
  allEmployee() {
    this.empService.getAllEmployee().subscribe((response: any) => {
      this.employees = response;
      console.log(this.employees);
    });
  }

  Edit(empID: number) {
    this.buttonText = 'update';
    this.operation = DBOperation.update;

    let empData = this.employees.find((e: empVM) => e.id === empID);

    this.employeeForm.patchValue(empData);

    // alert(empID);
  }
  Delete(empID: number) {
    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.empService.DeleteEmployee(empID).subscribe((response: any) => {
          console.log(response);
          this.allEmployee();
          this.toastr.success('Employee Deleted', 'Employee Registration');
        });
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
    // alert(empID); // for check it works or not
    // this.empService.DeleteEmployee(empID).subscribe((response: any) => {
    //   console.log(response);
    //   this.allEmployee();
    //   this.toastr.success('Employee Deleted', 'Employee Registration');
    // });
  }
}
