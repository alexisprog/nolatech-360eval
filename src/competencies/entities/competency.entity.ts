import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompetencyDocument = HydratedDocument<Competency>;

@Schema({ timestamps: true })
export class Competency {
  @Prop()
  competence: string;

  @Prop()
  definition: string;

  @Prop({ default: false })
  is_disabled?: boolean;
}

export const CompetencySchema = SchemaFactory.createForClass(Competency);
