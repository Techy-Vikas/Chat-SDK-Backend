import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Send message to ChatGPT-4o' })
  @ApiBody({ type: ChatDto })
  @ApiResponse({ status: 201, description: 'ChatGPT response' })
  async askGPT(@Body() chatDto: ChatDto) {
    return this.chatService.askGPT(chatDto.message);
  }
}
