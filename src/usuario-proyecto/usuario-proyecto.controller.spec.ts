import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioProyectoController } from './usuario-proyecto.controller';
import { UsuarioProyectoService } from './usuario-proyecto.service';

describe('UsuarioProyectoController', () => {
  let controller: UsuarioProyectoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioProyectoController],
      providers: [UsuarioProyectoService],
    }).compile();

    controller = module.get<UsuarioProyectoController>(UsuarioProyectoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
