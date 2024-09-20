import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ScalesService } from './scales.service';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Scales')
@Controller('scales')
export class ScalesController {
  constructor(private readonly scalesService: ScalesService) {}

  @Get()
  @Public()
  findAll() {
    return this.scalesService.findAll();
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateScaleDto: UpdateScaleDto) {
    return this.scalesService.update(id, updateScaleDto);
  }
}
