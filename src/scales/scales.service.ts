import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Scale } from './entities/scale.entity';
import { Model } from 'mongoose';
import { UpdateScaleDto } from './dto/update-scale.dto';

@Injectable()
export class ScalesService implements OnModuleInit {
  constructor(@InjectModel(Scale.name) private scaleModel: Model<Scale>) {}

  async onModuleInit() {
    try {
      const res = await this.scaleModel.find();
      if (res.length === 0) {
        await this.scaleModel.insertMany([
          { points: 1, description: 'Nunca' },
          { points: 2, description: 'Casi Nunca' },
          { points: 3, description: 'En Ocasiones' },
          { points: 4, description: 'Casi Siempre' },
          { points: 5, description: 'Siempre' },
        ]);
        console.log('Create default scale');
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Scale[]> {
    return await this.scaleModel.find().exec();
  }

  async update(id: string, updateScaleDto: UpdateScaleDto): Promise<Scale> {
    return await this.scaleModel.findByIdAndUpdate(id, updateScaleDto, {
      new: true,
    });
  }
}
