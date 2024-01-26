import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScrapRequestDto {
  @ApiProperty({
    description: `Scenarios:

  1. If we have a link to a product in the format https://www.nike.com/t/air-presto-mens-shoes-JlLlWz:
  Then the system should retrieve the first available product based on its slug "air-presto-mens-shoes-JlLlWz".
  The system should return information about this product.

  2. If we have a link to a product in the format https://www.nike.com/t/air-presto-mens-shoes-JlLlWz/DV2210-300:
  Then the system should retrieve the product based on its slug "air-presto-mens-shoes-JlLlWz" and specification "DV2210-300".
  The system should return information about this specific product.`})
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  processId: string;
}
