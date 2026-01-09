import { Controller, Get, Param, Post } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private scraper: ScraperService,
    private prisma: PrismaService
  ) {}

  @Get('navigation')
  async getNavigation() {
    return this.scraper.getOrCreateMockData();
  }

  @Get('products/:category')
  async getProducts(@Param('category') category: string) {
    return this.scraper.getMockProducts(category);
  }

  @Get('product/:id')
  async getProductDetail(@Param('id') id: string) {
    let product = await this.prisma.product.findUnique({
      where: { id },
      include: { detail: true, reviews: true }
    });

    // Create mock detail if not exists
    if (product && !product.detail) {
      await this.prisma.productDetail.create({
        data: {
          productId: id,
          description: `Detailed description for ${product.title}`,
          ratingsAvg: Math.random() * 2 + 3, // 3-5 stars
          reviewsCount: Math.floor(Math.random() * 100) + 10
        }
      });
      
      product = await this.prisma.product.findUnique({
        where: { id },
        include: { detail: true, reviews: true }
      });
    }

    return product;
  }

  @Post('scrape/:type')
  async triggerScrape(@Param('type') type: string) {
    if (type === 'navigation') {
      return this.scraper.getOrCreateMockData();
    }
    return this.scraper.getMockProducts(type);
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}