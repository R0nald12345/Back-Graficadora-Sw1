import { Module } from '@nestjs/common';
import { InvitacionService } from './invitacion.service';
import { InvitacionController } from './invitacion.controller';

@Module({
  controllers: [InvitacionController],
  providers: [InvitacionService],
})
export class InvitacionModule {}
