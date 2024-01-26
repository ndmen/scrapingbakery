import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ScrapRequestDto } from './dto/scrap-request.dto';

@Injectable()
export class ScraperService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async getCachedData(processId: string): Promise<string | null> {
        console.log('getCachedData ' + await this.cacheManager.get(processId));
        return await this.cacheManager.get(processId);
    }

    async initiateScraping(productId: string): Promise<string> {
        const processId = uuidv4();
        const value = {
            processId,
            productId,
            status: 'Processing',
            result: null,
            updatedAt: new Date(Date.now()).toISOString(),
        };
        await this.cacheManager.set(processId, JSON.stringify(value), 86400000); // 24h TTL
        this.scrapeProductInfo(productId, processId);
        return processId;
    }

    async scrapeProductInfo(productId: string, processId: string): Promise<void> {
        try {
            // Simulate a 10-second timeout
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Form the URL with the Nike.com URL structure
            const url = `https://www.nike.com/t/${productId}`;

            // Fetch HTML content
            const { data } = await firstValueFrom(
                this.httpService.get<any>(url).pipe(
                    catchError((error: AxiosError) => {
                        throw 'An error occurred while fetching data!';
                    }),
                ),
            );
            const $ = cheerio.load(data);

            // Parse JSON data from the HTML script tag
            const scriptContent = $('#__NEXT_DATA__').html();
            const jsonData = JSON.parse(scriptContent);
            const products = jsonData.props.pageProps.initialState.Threads.products;

            let productKey;

            // Check the format of the product ID
            if (productId.includes('/')) {
                // Split the product ID into the general ID and specification
                const [generalId, specification] = productId.split('/');
                productId = specification;

                // Find the product by specification
                productKey = Object.keys(products).find((key) => key === productId);
            } else {
                // Find the first product by the general ID
                productKey = Object.keys(products)[0];
            }

            let productInfo;

            if (productKey) {
                const product = products[productKey];
                // Fill in the product information
                productInfo = {
                    name: product.title,
                    brand: product.brand,
                    price: product.currentPrice,
                    isAvailable: product.state === 'IN_STOCK',
                    isInSale: product.discounted,
                    saleDescription: product.descriptionPreview,
                    description: product.description,
                };
            } else {
                throw new Error('Product not found');
            }

            // Save data in cache
            const value = {
                processId,
                productId,
                status: 'Completed',
                result: productInfo,
                updatedAt: new Date(Date.now()).toISOString(),
            }
            await this.cacheManager.set(processId, JSON.stringify(value), 86400000); // 24h TTL
            console.log(this.cacheManager.get(processId));

        } catch (error) {
            throw new Error('Failed to scrape product information');
        }
    }
}