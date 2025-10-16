import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authSevice: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authSevice.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authSevice.findAll()
  }

  // @Get(":id")
  // findOne() {
  //   return this.authSevice.findOne()
  // }
}
