import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  FeedbackEvaluationDto,
  UpdateEvaluationDto,
} from './dto/update-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from './entities/evaluation.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async findAllPendingsByEvaluate(evaluated_by: string): Promise<Evaluation[]> {
    return await this.evaluationModel
      .find({ evaluated_by, is_completed: false })
      .populate(['employee', 'competencies'])
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

  async feedback(
    user_id: string,
    feedbackEvaluationDto: FeedbackEvaluationDto,
  ): Promise<Evaluation> {
    const { feedbacks, evaluation_id } = feedbackEvaluationDto;

    const [user, evaluation] = await Promise.all([
      this.userModel.findById(user_id).populate('employee'),
      this.evaluationModel.findById(evaluation_id).populate('evaluated_by'),
    ]);

    if (evaluation.is_completed) {
      throw new BadRequestException('Evaluation is completed');
    }
    const validated = !user?.employee?._id
      ? false
      : String(user.employee._id) !== String(evaluation.evaluated_by._id)
        ? false
        : true;

    if (!validated) {
      throw new BadRequestException('You are not the evaluator');
    }

    return await this.evaluationModel.findByIdAndUpdate(
      evaluation._id,
      { feedbacks, is_completed: true },
      { new: true },
    );
  }

  async remove(id: string): Promise<string> {
    await this.evaluationModel.findByIdAndDelete(id);
    return `This action removes a #${id} evaluation`;
  }
}
