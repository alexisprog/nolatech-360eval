import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  FeedbackEvaluationDto,
  UpdateEvaluationDto,
} from './dto/update-evaluation.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@ApiTags('Evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @Auth(Role.MANAGER)
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationsService.create(createEvaluationDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Get('pendings/:evaluated_by')
  @Auth(Role.EMPLOYEE)
  findAllPendingsByEvaluate(@Param('evaluated_by') evaluated_by: string) {
    return this.evaluationsService.findAllPendingsByEvaluate(evaluated_by);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationsService.update(id, updateEvaluationDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.evaluationsService.remove(id);
  }

  @Post('feedback')
  @Auth(Role.EMPLOYEE)
  feedback(
    @Body() feedbackEvaluationDto: FeedbackEvaluationDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.evaluationsService.feedback(user._id, feedbackEvaluationDto);
  }
}
