import { ApiProperty } from '@nestjs/swagger';

export class AudioUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Audio file to upload (MP3, WAV, etc.)',
  })
  audio: Express.Multer.File;
}
