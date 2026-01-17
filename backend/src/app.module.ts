import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { User } from './users/entities/user.entity';
import { Document } from './users/entities/document.entity';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Document, Job],
      synchronize: true, // Auto-create tables (Dev only)
    }),
    UsersModule, 
    AuthModule, 
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
