import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Document } from './entities/document.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(createUserDto: any) { // Type 'any' to handle extra fields or mapped DTO
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    // Construct location if provided
    let location: any = null;
    if (createUserDto.latitude && createUserDto.longitude) {
        location = {
            type: 'Point',
            coordinates: [parseFloat(createUserDto.longitude), parseFloat(createUserDto.latitude)]
        };
    }

    const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
        last_known_location: location,
    });
    
    const savedUser = await this.usersRepository.save(user);

    // Save document if provided
    if (createUserDto.documentPath) {
        // savedUser is User not User[]
        const doc = this.documentsRepository.create({
            document_path: createUserDto.documentPath,
            document_type: 'ID_CARD', 
            document_hash: 'pending', 
            user: savedUser as unknown as User 
        });
        await this.documentsRepository.save(doc);
    }

    return savedUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'verification_status'] });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
