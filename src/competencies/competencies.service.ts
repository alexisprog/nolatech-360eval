import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCompetencyDto } from './dto/create-competency.dto';
import { UpdateCompetencyDto } from './dto/update-competency.dto';
import { Model } from 'mongoose';
import { Competency } from './entities/competency.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompetenciesService implements OnModuleInit {
  constructor(
    @InjectModel(Competency.name) private competencyModel: Model<Competency>,
  ) {}

  async onModuleInit() {
    try {
      const res = await this.competencyModel.find();
      if (res.length === 0) {
        await this.competencyModel.insertMany([
          {
            competence: 'Responsabilidad',
            definition: 'Cumple con las tareas asignadas',
          },
          {
            competence: 'Proactividad',
            definition:
              'Tendencia a actuar con anticipacion sobre las actividades',
          },
          {
            competence: 'Trabajo en equipo',
            definition: 'Relaciona en colaboracion eficiente entre compañeros',
          },
          {
            competence: 'Aprendizaje',
            definition: 'Disposicion en adquirir nuevos conocimientos',
          },
          {
            competence: 'Adaptacion al cambio',
            definition: 'Capacidad para hacer ajustes sobre la marcha',
          },
        ]);
        console.log('Create default Competencies');
      }
    } catch (error) {
      throw error;
    }
  }

  async create(createCompetencyDto: CreateCompetencyDto): Promise<Competency> {
    const created = new this.competencyModel(createCompetencyDto);
    return created.save();
  }

  async findAll(): Promise<Competency[]> {
    return await this.competencyModel.find({ is_disabled: false }).exec();
  }

  async update(id: string, updateCompetencyDto: UpdateCompetencyDto) {
    return await this.competencyModel.findByIdAndUpdate(
      id,
      updateCompetencyDto,
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.competencyModel.findByIdAndUpdate(
      id,
      { is_disabled: true },
      { new: true },
    );
  }
}
