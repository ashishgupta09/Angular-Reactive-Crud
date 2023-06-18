import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Model } from '../model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  formValue!: FormGroup;
  employeModel: Model = new Model();
  employeList: any;
  showAdd:boolean=false;
  showUpdate:boolean=false;


  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    })
    this.getAllEmpDetails();
  }

  clickAddEmployee(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;
  }

  postEmpDetails() {
    this.employeModel.firstName = this.formValue.value.firstName;
    this.employeModel.lastName = this.formValue.value.lastName;
    this.employeModel.email = this.formValue.value.email;
    this.employeModel.mobile = this.formValue.value.mobile;

    this.employeeService.postEmployee(this.employeModel).subscribe((res) => {
      console.log(res);
      alert("employee added successfully");
      this.formValue.reset();
      this.getAllEmpDetails();
    })
  }

  getAllEmpDetails() {
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employeList = res;
    })
  }
  
  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe((res)=>{
     this.getAllEmpDetails();
    })
  }

  editEmploye(data:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employeModel.id=data.id;
  this.formValue.controls['firstName'].setValue(data.firstName);
  this.formValue.controls['lastName'].setValue(data.lastName);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  }
  
  updateEmployee(){
    this.employeModel.firstName = this.formValue.value.firstName;
    this.employeModel.lastName = this.formValue.value.lastName;
    this.employeModel.email = this.formValue.value.email;
    this.employeModel.mobile = this.formValue.value.mobile;
    this.employeeService.updateEmployee(this.employeModel,this.employeModel.id)
    .subscribe((res)=>{
    alert("data updated Successfully!");
    this.formValue.reset();
    this.getAllEmpDetails();
  
    })
  }
}
