import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ModuleMocker, MockMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker((token) => {
        const results = [
          {
            name: 'testCat1',
            breed: 'testCatBreed',
            age: 0,
          },
          {
            name: 'testCat2',
            breed: 'testCatBreed',
            age: 0,
          },
        ];
        if (token === CatsService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockMetadata<
            any,
            any
          >;
          const Mock = moduleMocker.generateFromMetadata(
            mockMetadata,
          ) as ObjectConstructor;
          return new Mock();
        }
      })
      .compile();

    catsController = moduleRef.get(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const results = [
        {
          name: 'testCat1',
          breed: 'testCatBreed',
          age: 0,
        },
        {
          name: 'testCat2',
          breed: 'testCatBreed',
          age: 0,
        },
      ];

      expect(await catsController.findAll()).toEqual(results);
    });
  });
});
