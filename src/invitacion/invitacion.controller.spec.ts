import { Test, TestingModule } from '@nestjs/testing';
import { InvitacionController } from './invitacion.controller';
import { InvitacionService } from './invitacion.service';

describe('InvitacionController', () => {
  let controller: InvitacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitacionController],
      providers: [InvitacionService],
    }).compile();

    controller = module.get<InvitacionController>(InvitacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
