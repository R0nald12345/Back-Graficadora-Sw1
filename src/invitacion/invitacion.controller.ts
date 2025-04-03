import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitacionService } from './invitacion.service';
import { CreateInvitacionDto } from './dto/create-invitacion.dto';
import { UpdateInvitacionDto } from './dto/update-invitacion.dto';

@Controller('invitacion')
export class InvitacionController {
  constructor(private readonly invitacionService: InvitacionService) {}

  @Post()
  create(@Body() createInvitacionDto: CreateInvitacionDto) {
    return this.invitacionService.create(createInvitacionDto);
  }

  @Get()
  findAll() {
    return this.invitacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitacionDto: UpdateInvitacionDto) {
    return this.invitacionService.update(+id, updateInvitacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitacionService.remove(+id);
  }
}
