import { Test, TestingModule } from '@nestjs/testing';
import { NocoController } from './noco.controller';

describe('NocoController', () => {
    let controller: NocoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NocoController],
        }).compile();

        controller = module.get<NocoController>(NocoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
