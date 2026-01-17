import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'El teléfono debe tener al menos 10 dígitos' })
  phone?: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;

  /**
   * Ruta del archivo de documento de identidad.
   * La validación de la presencia del archivo se maneja en el controlador
   * o vía ParseFilePipe, ya que llega como multipart/form-data.
   */
  @IsOptional()
  documentPath?: string;
}
