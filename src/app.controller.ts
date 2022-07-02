import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/github-ranking/:n/:l')
  async getGithubRanking(
    @Param('n') n: number,
    @Param('l') l: string,
  ): Promise<any> {
    return await this.appService.readGithubRanking(n, l);
  }
}
