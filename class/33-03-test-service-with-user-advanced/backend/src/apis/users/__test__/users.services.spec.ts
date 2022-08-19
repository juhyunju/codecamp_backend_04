import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

class MockUsersRepository {
  mydb = [{ email: 'a@a.com', password: '0000', name: '짱구', age: 67 }];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }
  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      //   imports: [TypeORM...],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
    usersRepository = usersModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });
  // describe("findOne",() => {
  // UsersService.findOne()

  // })

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '훈이',
        age: 123,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      expect(usersRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 잘됐는지 검증!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '훈이',
        age: 123,
      };
      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'a@a.com',
        password: '1234',
        name: '훈이',
        age: 123,
      });
      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      expect(usersRepositorySpySave).toBeCalledTimes(1);
    });
  });
});
