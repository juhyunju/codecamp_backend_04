import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Cache } from 'cache-manager';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String, { nullable: true })
  // getHello(): string {
  //   return this.boardsService.qqq();
  // }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0,
    });

    // 2. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '지금은 테스트중 캐시 ';
    // return this.boardsService.create({ createBoardInput });
  }
}
