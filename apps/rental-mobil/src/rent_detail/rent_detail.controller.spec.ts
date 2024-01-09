import { Test, TestingModule } from '@nestjs/testing';
import { RentDetailController } from './rent_detail.controller';

describe('RentDetailController', () => {
  let controller: RentDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentDetailController],
    }).compile();

    controller = module.get<RentDetailController>(RentDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
