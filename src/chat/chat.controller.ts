import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chat')
@ApiBearerAuth() // 👈 This tells Swagger this route requires Bearer token
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
}
