import { Injectable } from '@nestjs/common';
import { CreateInvitacionDto } from './dto/create-invitacion.dto';
import { UpdateInvitacionDto } from './dto/update-invitacion.dto';

@Injectable()
export class InvitacionService {
  create(createInvitacionDto: CreateInvitacionDto) {
    return 'This action adds a new invitacion';
  }

  findAll() {
    return `This action returns all invitacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitacion`;
  }

  update(id: number, updateInvitacionDto: UpdateInvitacionDto) {
    return `This action updates a #${id} invitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitacion`;
  }
}
