import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  findAll() {
    return this.employeeModel.find().exec();
  }
}
