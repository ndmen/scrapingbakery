import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 10000,
                maxRedirects: 5,
            }),
        }),
        CacheModule.register(),
    ],
    controllers: [ScraperController],
    providers: [ScraperService],
})
export class ScraperModule { }
