import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Hierarchy } from 'src/common/enums/hierarchy.enum';
import { Competency } from 'src/competencies/entities/competency.entity';
import { Employee } from 'src/employees/entities/employee.entity';

export type EvaluationDocument = HydratedDocument<Evaluation>;

@Schema({ timestamps: true })
export class Evaluation {
  @Prop({ enum: Hierarchy, default: Hierarchy.SELFASSESSMENT })
  hierarchy: Hierarchy;

  @Prop({
    ref: Employee.name,
    type: MongooseSchema.Types.ObjectId,
  })
  evaluated_by: Employee;

  @Prop({
    ref: Employee.name,
    type: MongooseSchema.Types.ObjectId,
  })
  employee: Employee;

  @Prop({
    ref: Competency.name,
    type: [MongooseSchema.Types.ObjectId],
  })
  competencies: Competency[];

  @Prop({
    type: [
      {
        competency: { type: MongooseSchema.Types.ObjectId, ref: Competency },
        value: Number,
      },
    ],
  })
  feedbacks: { competency: Competency; value: number }[];

  @Prop({ default: false })
  is_completed: boolean;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);
