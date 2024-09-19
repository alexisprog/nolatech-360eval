import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { Employee } from 'src/employees/entities/employee.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Role.EMPLOYEE })
  role: Role;

  @Prop({
    ref: Employee.name,
    type: MongooseSchema.Types.ObjectId,
  })
  employee?: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
