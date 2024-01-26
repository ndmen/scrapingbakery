import { Controller, Post, Body, Res, HttpStatus, Inject } from '@nestjs/common';
import { ScraperService } from '../scraper/scraper.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScrapRequestDto } from './dto/scrap-request.dto';

@ApiTags('scraper')
@Controller('scraper')
export class ScraperController {
    constructor(
        private readonly scraperService: ScraperService,
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Scraping information from website nike.com',
    })
    @ApiBody({
        type: ScrapRequestDto,
    })
    @ApiResponse({
        status: HttpStatus.OK,
    })
    async scrapeProduct(@Body() body: ScrapRequestDto, @Res() res) {
        try {
            const { productId, processId } = body;

            // Check if processId is provided and status is Completed
            if (processId) {
                const cachedData: string = await this.scraperService.getCachedData(processId);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    if (parsedData.status === 'Completed') {
                        return res.status(200).json({ status: 'Completed', processId, result: parsedData.result });
                    }
                }
            }

            const newProcessId = await this.scraperService.initiateScraping(productId);
            res.status(200).json({ status: 'Processing', processId: newProcessId });
        } catch (error) {
            console.error('Error during scraping:', error);
            res.status(500).json({ status: 'Error', error: error.message });
        }
    }
}