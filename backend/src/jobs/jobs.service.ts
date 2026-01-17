import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { User, UserVerificationStatus } from '../users/entities/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsGateway } from './jobs.gateway';
import { Point } from 'geojson';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jobsGateway: JobsGateway,
  ) {}

  async create(createJobDto: CreateJobDto, employer: User) {
    // 1. Create Job Entity
    const job = this.jobsRepository.create({
      ...createJobDto,
      employer,
      status: JobStatus.PENDING,
      // location should be passed as GeoJSON Point { type: 'Point', coordinates: [lon, lat] }
      // Assuming createJobDto has 'location' field of type Point
    });
    
    const savedJob = await this.jobsRepository.save(job);

    // 2. Find nearby verified workers (Matchmaking)
    // NOTE: PostGIS query disabled for SQLite testing. Returning all verified users as fallback.
    /*
    const [lon, lat] = savedJob.location.coordinates;
    const radiusInMeters = 5000; // 5km

    const nearbyWorkers = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.verification_status = :status', { status: UserVerificationStatus.VERIFIED })
      .andWhere(
        `ST_DWithin(
          user.last_known_location::geography, 
          ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography, 
          :range
        )`
      )
      .setParameters({
        lat,
        lon,
        range: radiusInMeters,
      })
      .getMany();
    */
    
    // Fallback for SQLite testing: Notify ALL verified users
    const nearbyWorkers = await this.usersRepository.find({
        where: { verification_status: UserVerificationStatus.VERIFIED }
    });

    // 3. Notify via WebSockets
    const workerIds = nearbyWorkers.map((u) => u.id);
    if (workerIds.length > 0) {
      this.jobsGateway.notifyWorkersInArea(workerIds, savedJob);
    }

    return savedJob;
  }

  async acceptJob(jobId: string, worker: User) {
    if (worker.verification_status !== UserVerificationStatus.VERIFIED) {
        throw new BadRequestException('Only verified workers can accept jobs.');
    }

    const job = await this.jobsRepository.findOne({ where: { id: jobId }, relations: ['employer'] });
    if (!job) throw new NotFoundException('Job not found');

    if (job.status !== JobStatus.PENDING) {
      throw new BadRequestException('Job is no longer available.');
    }

    // Lock job & Update status
    job.status = JobStatus.IN_PROGRESS;
    job.worker = worker;
    await this.jobsRepository.save(job);

    // Generate Deep Links for Navigation
    const [lon, lat] = job.location.coordinates;
    const deepLinks = {
      waze: `waze://?ll=${lat},${lon}&navigate=yes`,
      googleMaps: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    };

    return {
      message: 'Job accepted successfully',
      job,
      navigation: deepLinks,
    };
  }

  findAll() {
    return this.jobsRepository.find();
  }

  findOne(id: string) {
    return this.jobsRepository.findOneBy({ id });
  }
}
