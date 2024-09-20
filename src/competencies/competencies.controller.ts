import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetenciesService } from './competencies.service';
import { CreateCompetencyDto } from './dto/create-competency.dto';
import { UpdateCompetencyDto } from './dto/update-competency.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Competencies')
@Controller('competencies')
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createCompetencyDto: CreateCompetencyDto) {
    return this.competenciesService.create(createCompetencyDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.competenciesService.findAll();
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCompetencyDto: UpdateCompetencyDto,
  ) {
    return this.competenciesService.update(id, updateCompetencyDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.competenciesService.remove(id);
  }
}
