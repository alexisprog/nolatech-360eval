import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { EmployeesService } from 'src/employees/employees.service';
import { Role } from 'src/common/enums/role.enum';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { _id: user._id, email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      user,
    };
  }

  async register({
    password,
    email,
    dni,
    first_name,
    last_name,
    position,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const employeeExist = await this.employeeService.findOneByDni(dni);

    if (employeeExist) {
      throw new BadRequestException('Dni already exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const employee = await this.employeeService.create({
      dni,
      first_name,
      last_name,
      position,
    });

    await this.usersService.create({
      role: Role.EMPLOYEE,
      email,
      password: hashedPassword,
      employee,
    });

    return {
      email,
    };
  }
}
