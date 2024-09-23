import { Module } from '@nestjs/common';
import { ScalesService } from './scales.service';
import { ScalesController } from './scales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Scale, ScaleSchema } from './entities/scale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scale.name, schema: ScaleSchema }]),
  ],
  controllers: [ScalesController],
  providers: [ScalesService],
  exports: [ScalesService],
})
export class ScalesModule {}
