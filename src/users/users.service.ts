import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/common/enums/role.enum';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    try {
      const res = await this.userModel.find();
      if (res.length === 0) {
        const hashedPassword = await bcryptjs.hash('administrator', 10);
        const newUser: CreateUserDto = {
          email: 'admin@nolatech.ai',
          password: hashedPassword,
          role: Role.ADMIN,
        };
        await this.create(newUser);
        console.log('Create user admin');
        console.log('email:', 'admin@nolatech.ai');
        console.log('password:', 'administrator');
      }
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    return (await this.userModel.findOne({ email })).populate('employee');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(createUserDto);
    return created.save();
  }
}
