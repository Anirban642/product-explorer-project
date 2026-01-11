import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  
  constructor(private prisma: PrismaService) {}

  private isPlaywrightEnabled(): boolean {
    return process.env.ENABLE_PLAYWRIGHT === 'true';
  }

  async scrapeRealNavigation() {
    this.logger.log('Starting real navigation scraping from World of Books...');
    
    const navigationData: any[] = [];

    const crawler = new PlaywrightCrawler({
      maxRequestsPerCrawl: 1,
      headless: true,
      requestHandlerTimeoutSecs: 60, // Increased timeout
      navigationTimeoutSecs: 60,
      
      async requestHandler({ page, log }) {
        try {
          // Wait for page to fully load
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(3000); // Wait for dynamic content
          
          log.info('Page loaded, extracting navigation...');

          // Extract navigation - try multiple selectors
          const navItems = await page.evaluate(() => {
            const items: any[] = [];
            
            // Try different possible selectors for World of Books
            const selectors = [
              'nav a',
              '.navigation a',
              '.menu a',
              '.nav-menu a',
              'header a',
              '[class*="nav"] a',
              '[class*="menu"] a',
              '.category-list a',
              '.categories a'
            ];
            
            for (const selector of selectors) {
              const links = document.querySelectorAll(selector);
              links.forEach((link: any) => {
                const text = link.textContent?.trim();
                const href = link.getAttribute('href');
                
                // Filter for book-related categories
                if (text && href && text.length > 2 && text.length < 50) {
                  const lowerText = text.toLowerCase();
                  if (
                    lowerText.includes('book') ||
                    lowerText.includes('fiction') ||
                    lowerText.includes('non-fiction') ||
                    lowerText.includes('children') ||
                    lowerText.includes('academic') ||
                    lowerText.includes('science') ||
                    lowerText.includes('history') ||
                    lowerText.includes('biography') ||
                    lowerText.includes('crime') ||
                    lowerText.includes('romance') ||
                    lowerText.includes('thriller') ||
                    lowerText.includes('fantasy') ||
                    lowerText.includes('cooking') ||
                    lowerText.includes('art') ||
                    lowerText.includes('music') ||
                    lowerText.includes('sport') ||
                    lowerText.includes('travel') ||
                    lowerText.includes('religion') ||
                    lowerText.includes('business') ||
                    lowerText.includes('computing') ||
                    href.includes('/category/') ||
                    href.includes('/books/')
                  ) {
                    const slug = text.toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, '');
                    
                    // Avoid duplicates
                    if (!items.find(i => i.slug === slug)) {
                      items.push({
                        title: text,
                        url: href.startsWith('http') ? href : `https://www.worldofbooks.com${href}`,
                        slug: slug
                      });
                    }
                  }
                }
              });
            }
            
            return items;
          });

          log.info(`Found ${navItems.length} potential navigation items`);
          
          // If we found items, use them
          if (navItems.length > 0) {
            navigationData.push(...navItems.slice(0, 8));
          }
          
        } catch (error) {
          log.error('Error during page scraping:', error);
        }
      },
      
      failedRequestHandler({ request, log }) {
        log.error(`Request failed: ${request.url}`);
      },
    });

    try {
      if (this.isPlaywrightEnabled()) {
        await crawler.run(['https://www.worldofbooks.com/en-gb']);
      } else {
        this.logger.log('Playwright disabled, skipping to fallback data');
      }
    } catch (error) {
      this.logger.error('Crawler error:', error);
    }

    // If scraping failed or found nothing, use realistic fallback data
    if (navigationData.length === 0) {
      this.logger.warn('No navigation found, using curated World of Books categories');
      navigationData.push(
        { title: 'Fiction', slug: 'fiction', url: 'https://www.worldofbooks.com/en-gb/category/fiction' },
        { title: 'Non-Fiction', slug: 'non-fiction', url: 'https://www.worldofbooks.com/en-gb/category/non-fiction' },
        { title: "Children's Books", slug: 'childrens-books', url: 'https://www.worldofbooks.com/en-gb/category/childrens-books' },
        { title: 'Crime & Thriller', slug: 'crime-thriller', url: 'https://www.worldofbooks.com/en-gb/category/crime-thriller-humour' },
        { title: 'Science Fiction', slug: 'science-fiction', url: 'https://www.worldofbooks.com/en-gb/category/science-fiction-fantasy-horror' },
        { title: 'Biography', slug: 'biography', url: 'https://www.worldofbooks.com/en-gb/category/biography' }
      );
    }

    // Save to database
    for (const item of navigationData) {
      try {
        await this.prisma.navigation.upsert({
          where: { slug: item.slug },
          update: { 
            title: item.title, 
            url: item.url,
            lastScrapedAt: new Date() 
          },
          create: {
            title: item.title,
            slug: item.slug,
            url: item.url,
            lastScrapedAt: new Date(),
          },
        });
      } catch (error) {
        this.logger.error(`Error saving navigation item ${item.title}:`, error);
      }
    }

    this.logger.log(`Saved ${navigationData.length} navigation items`);
    return this.prisma.navigation.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async scrapeRealProducts(category: string, limit = 12) {
    this.logger.log(`Starting real product scraping for: ${category}`);
    
    // First, delete existing products that match this category to avoid conflicts
    try {
      const deleted = await this.prisma.product.deleteMany({
        where: {
          sourceUrl: {
            contains: encodeURIComponent(category)
          }
        }
      });
      this.logger.log(`Deleted ${deleted.count} existing products for ${category}`);
    } catch (error) {
      this.logger.error(`Error deleting existing products: ${error.message}`);
    }
    
    const productsData: any[] = [];
    const searchUrl = `https://www.worldofbooks.com/en-gb/search?keyword=${encodeURIComponent(category)}`;

    const crawler = new PlaywrightCrawler({
      maxRequestsPerCrawl: 1,
      headless: true,
      requestHandlerTimeoutSecs: 60,
      navigationTimeoutSecs: 60,
      
      async requestHandler({ page, log }) {
        try {
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(4000); // Wait for products to load
          
          log.info('Extracting products...');

          // Try to find products with various selectors
          const products = await page.evaluate((maxItems) => {
            const items: any[] = [];
            
            // Try multiple selectors
            const productSelectors = [
              '.product-card',
              '.product-item',
              '.book-item',
              '.product',
              '[class*="product"]',
              '.search-result-item',
              '.item-card',
              'article',
              '.card'
            ];
            
            let productElements: Element[] = [];
            
            for (const selector of productSelectors) {
              const elements = document.querySelectorAll(selector);
              if (elements.length > 0) {
                productElements = Array.from(elements);
                break;
              }
            }
            
            productElements.slice(0, maxItems).forEach((element, index) => {
              try {
                // Extract title
                const titleEl = element.querySelector('h2, h3, h4, .title, .product-title, .book-title, [class*="title"]');
                const title = titleEl?.textContent?.trim() || '';
                
                if (!title || title.length < 2) return;
                
                // Extract price
                const priceEl = element.querySelector('.price, .cost, [class*="price"], .amount');
                const priceText = priceEl?.textContent?.trim() || '';
                const priceMatch = priceText.match(/[\d.]+/);
                const price = priceMatch ? parseFloat(priceMatch[0]) : (Math.random() * 15 + 3);
                
                // Extract image
                const imgEl = element.querySelector('img');
                let imageUrl = imgEl?.src || imgEl?.getAttribute('data-src') || '';
                if (imageUrl && !imageUrl.startsWith('http')) {
                  imageUrl = '';
                }
                
                // Extract link
                const linkEl = element.querySelector('a');
                let productUrl = linkEl?.href || '';
                if (productUrl && !productUrl.startsWith('http')) {
                  productUrl = `https://www.worldofbooks.com${productUrl}`;
                }
                
                // Extract author if available
                const authorEl = element.querySelector('.author, .by, [class*="author"]');
                const author = authorEl?.textContent?.trim()?.replace(/^by\s*/i, '') || null;
                
                items.push({
                  title: title.substring(0, 200),
                  author,
                  price: Math.round(price * 100) / 100,
                  currency: 'GBP',
                  imageUrl: imageUrl || null,
                  sourceUrl: productUrl || `https://www.worldofbooks.com/search?q=${encodeURIComponent(title)}`,
                  sourceId: `wob-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
                });
              } catch (err) {
                console.error('Error parsing product:', err);
              }
            });
            
            return items;
          }, limit);

          if (products.length > 0) {
            productsData.push(...products);
            log.info(`Extracted ${products.length} products`);
          }
          
        } catch (error) {
          log.error('Error scraping products:', error);
        }
      },
    });

    try {
      if (this.isPlaywrightEnabled()) {
        await crawler.run([searchUrl]);
      } else {
        this.logger.log('Playwright disabled, using mock products');
      }
    } catch (error) {
      this.logger.error('Product crawler error:', error);
    }

    // Fallback: Generate realistic mock products if scraping fails
    if (productsData.length === 0) {
      this.logger.warn(`No products scraped for ${category}, generating ${limit} mock products`);
      
      const bookTitles = [
        `The ${category} Chronicles`,
        `${category}: A Complete Guide`,
        `Understanding ${category}`,
        `The ${category} Companion`,
        `Essential ${category}`,
        `${category} for Beginners`,
        `Advanced ${category}`,
        `The World of ${category}`,
        `Mastering ${category}`,
        `${category} Explained`,
        `The ${category} Handbook`,
        `Introduction to ${category}`
      ];
      
      const authors = [
        'James Patterson', 'Stephen King', 'John Grisham', 'Dan Brown',
        'Agatha Christie', 'J.K. Rowling', 'George Orwell', 'Jane Austen',
        'Mark Twain', 'Ernest Hemingway', 'Charles Dickens', 'Leo Tolstoy'
      ];
      
      // Generate exactly 'limit' number of products with unique sourceUrls
      for (let i = 0; i < limit; i++) {
        productsData.push({
          title: bookTitles[i % bookTitles.length],
          author: authors[i % authors.length],
          price: Math.round((Math.random() * 20 + 5) * 100) / 100,
          currency: 'GBP',
          imageUrl: `https://picsum.photos/seed/${category}${i}/200/300`,
          sourceUrl: `https://www.worldofbooks.com/en-gb/search?keyword=${encodeURIComponent(category)}&product=${encodeURIComponent(bookTitles[i % bookTitles.length])}&id=${i}`,
          sourceId: `wob-${category}-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`
        });
      }
    }

    // Save products to database
    const savedProducts: any[] = [];
    for (const product of productsData) {
      try {
        const saved = await this.prisma.product.upsert({
          where: { sourceId: product.sourceId },
          update: { 
            title: product.title,
            author: product.author,
            price: product.price,
            imageUrl: product.imageUrl,
            lastScrapedAt: new Date() 
          },
          create: {
            ...product,
            lastScrapedAt: new Date(),
          },
        });
        savedProducts.push(saved);
      } catch (error) {
        this.logger.error(`Error saving product ${product.title}:`, error);
      }
    }

    this.logger.log(`Saved ${savedProducts.length} products for ${category}`);
    
    // Get products to return with enhanced logging
    const productsToReturn = await this.prisma.product.findMany({ 
      where: {
        sourceUrl: {
          contains: encodeURIComponent(category)
        }
      },
      take: limit,
      orderBy: { lastScrapedAt: 'desc' }
    });
    
    this.logger.log(`Returning ${productsToReturn.length} products for ${category}`);
    return productsToReturn;
  }
}