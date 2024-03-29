import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, user: _user }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    // ============================================ 시작 =============================
    await queryRunner.startTransaction('SERIALIZABLE');
    // ===============================================================================
    try {
      // 1. pointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointTransactionsRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction); // 쿼리 러너에 임시로 저장
      // throw new Error('강제에러ㅜ발생');

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 3. 유저의 돈 업데이트
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // ========================================================== commit 성공 확정 ! ! ! ============================================================
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // ======================================================  rollback 되돌리기 !!!!!!!!!!!!!! =====================
      await queryRunner.rollbackTransaction();
    } finally {
      // ======================================================  연결 해제!!!!!!!!!!!!!! =====================
      await queryRunner.release();
      //======================================================================================================
    }
  }
}
