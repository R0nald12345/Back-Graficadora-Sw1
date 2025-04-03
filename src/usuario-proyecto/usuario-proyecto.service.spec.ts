import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioProyectoService } from './usuario-proyecto.service';

describe('UsuarioProyectoService', () => {
  let service: UsuarioProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioProyectoService],
    }).compile();

    service = module.get<UsuarioProyectoService>(UsuarioProyectoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
