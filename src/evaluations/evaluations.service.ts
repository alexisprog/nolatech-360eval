import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    const created = new this.evaluationModel(createEvaluationDto);
    return created.save();
  }

  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationModel
      .find()
      .populate(['evaluated_by', 'employee', 'competencies'])
      .exec();
  }

  async findOne(id: string): Promise<Evaluation> {
    return await this.evaluationModel
      .findById(id)
      .populate(['evaluated_by', 'employee', 'competencies'])
      .exec();
  }

  async update(
    id: string,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    return await this.evaluationModel.findByIdAndUpdate(
      id,
      updateEvaluationDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<string> {
    await this.evaluationModel.findByIdAndDelete(id);
    return `This action removes a #${id} evaluation`;
  }
}
