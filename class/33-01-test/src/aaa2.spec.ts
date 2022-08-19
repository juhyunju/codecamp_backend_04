import { AppService } from './../../32-01-msa-rest/services/resource/src/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;
  beforeEach(() => {
    const appService = new AppService();
    const appController = new AppController(appService);
    appController.getHello();
  });
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함 ~!무리바법전', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
  //   describe('fetchBoards', () => {});
  //   describe('createBoard', () => {});
});
