import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScraperService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateMockData() {
    // Check if we already have data
    const existing = await this.prisma.navigation.findFirst();
    if (existing) {
      return this.prisma.navigation.findMany();
    }

    // Create mock data for demo
    const mockNav = [
      { title: 'Fiction', slug: 'fiction' },
      { title: 'Non-Fiction', slug: 'non-fiction' },
      { title: 'Children\'s Books', slug: 'childrens' },
      { title: 'Academic', slug: 'academic' }
    ];

    for (const nav of mockNav) {
      await this.prisma.navigation.create({
        data: { ...nav, lastScrapedAt: new Date() }
      });
    }

    return this.prisma.navigation.findMany();
  }

  async getMockProducts(category: string) {
    // Check if we have products
    let products = await this.prisma.product.findMany({ take: 10 });
    
    if (products.length === 0) {
      // Create mock products
      const mockProducts = Array.from({ length: 10 }, (_, i) => ({
        sourceId: `book-${i + 1}`,
        title: `Sample Book ${i + 1}`,
        author: `Author ${i + 1}`,
        price: Math.random() * 20 + 5,
        currency: 'GBP',
        imageUrl: `https://via.placeholder.com/200x300?text=Book+${i + 1}`,
        sourceUrl: `https://example.com/book-${i + 1}`,
        lastScrapedAt: new Date()
      }));

      await this.prisma.product.createMany({ data: mockProducts });
      products = await this.prisma.product.findMany({ take: 10 });
    }

    return products;
  }
}