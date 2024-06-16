import { IsNotEmpty, IsDate, IsArray, IsEnum, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsNotEmpty()
  companyName: string;

  @IsString()
  scheduledShipmentDate: Date;

  @IsArray()
  items: string[];

  @IsEnum(['Created', 'Prepared', 'Shipped'])
  status: string;
}
