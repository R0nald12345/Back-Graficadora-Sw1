import { Test, TestingModule } from '@nestjs/testing';
import { InvitacionService } from './invitacion.service';

describe('InvitacionService', () => {
  let service: InvitacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitacionService],
    }).compile();

    service = module.get<InvitacionService>(InvitacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
