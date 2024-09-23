import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true })
  dni: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
