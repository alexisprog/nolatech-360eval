import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig, { CONFIG_DATABASE } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScalesModule } from './scales/scales.module';
import { CompetenciesModule } from './competencies/competencies.module';
import { EvaluationsModule } from './evaluations/evaluations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get(CONFIG_DATABASE).uri,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    CompetenciesModule,
    EvaluationsModule,
    ScalesModule,
  ],
})
export class AppModule {}
