import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('github-ranking with 2 and JavaScript', () => {
    it('should return "{csv object...}"', async () => {
      expect(await appController.readCsv(2, 'JavaScript')).toMatchObject([
        {
          rank: '1',
          item: 'top-100-stars',
          repo_name: 'freeCodeCamp',
          stars: '296554',
          forks: '20629',
          language: 'JavaScript',
          repo_url: 'https://github.com/freeCodeCamp/freeCodeCamp',
          username: 'freeCodeCamp',
          issues: '6572',
          last_commit: '2018-12-18T12:16:12Z',
          description:
            'The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.',
        },
        {
          rank: '3',
          item: 'top-100-stars',
          repo_name: 'vue',
          stars: '122454',
          forks: '17507',
          language: 'JavaScript',
          repo_url: 'https://github.com/vuejs/vue',
          username: 'vuejs',
          issues: '233',
          last_commit: '2018-12-18T07:38:59Z',
          description:
            '🖖 A progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
        },
      ]);
    });
  });

  describe("github-ranking with 0 and '' ", () => {
    it('should return "{csv object empty}"', async () => {
      expect(await appController.readCsv(0, '')).toMatchObject([]);
    });
  });
});
