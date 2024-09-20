import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScaleDocument = HydratedDocument<Scale>;

@Schema({ timestamps: true })
export class Scale {
  @Prop()
  points: number;

  @Prop()
  description: string;
}

export const ScaleSchema = SchemaFactory.createForClass(Scale);
