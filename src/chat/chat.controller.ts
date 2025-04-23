import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { AudioUploadDto } from './dto/audio-upload.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Express } from 'express';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Send message to ChatGPT-4o' })
  @ApiBody({ type: ChatDto })
  @ApiResponse({ status: 201, description: 'ChatGPT response' })
  async askGPT(@Body() chatDto: ChatDto) {
    return this.chatService.askGPT(chatDto.message);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload-audio')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: memoryStorage(),
    }),
  )
  @ApiOperation({ summary: 'Upload audio and get mental health support' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AudioUploadDto })
  @ApiResponse({
    status: 201,
    description: 'Audio transcribed and processed successfully',
  })
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    return await this.chatService.transcribeAndAskFromBuffer(
      file.buffer,
      file.originalname,
    );
  }
}
