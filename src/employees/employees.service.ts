import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.find().exec();
  }

  async findOneByDni(dni: string) {
    return await this.employeeModel.findOne({ dni });
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const created = new this.employeeModel(createEmployeeDto);
    return created.save();
  }
}
