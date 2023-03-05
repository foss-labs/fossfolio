import { Test, TestingModule } from '@nestjs/testing';
import { NocoService } from './noco.service';

describe('NocoService', () => {
    let service: NocoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NocoService],
        }).compile();

        service = module.get<NocoService>(NocoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
