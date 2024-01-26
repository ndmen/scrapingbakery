import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ScraperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
