import { IsString, IsNotEmpty, IsObject, IsNumber, Min } from 'class-validator';
import type { Point } from 'geojson';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsObject()
  @IsNotEmpty()
  location: Point;
}
