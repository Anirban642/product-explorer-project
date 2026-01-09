# Product Explorer

::: tip 🟢 System Status
**Frontend Port:** `3001`  
**Backend Port:** `3000`  
**Database:** SQLite  
**Status:** Active
:::

---

## 📌 Overview

A full-stack product exploration platform that lets users navigate from categories → products → detailed product pages, powered by a NestJS backend and Next.js frontend.

### Live Demo

- **Frontend:** [Coming soon - will update after deployment]
- **Backend API:** [Coming soon - will update after deployment]

---

## 🏗️ Architecture

```
product-explorer/
├── apps/
│   ├── web/        # Next.js Frontend (Port 3001)
│   └── api/        # NestJS Backend (Port 3000)
├── README.md
└── package.json
```

---

## 🛠️ Technology Stack

### Frontend

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **SWR** for data fetching
- Responsive design with loading states

### Backend

- **NestJS** with TypeScript
- **Prisma ORM** with SQLite database
- **RESTful API** endpoints
- **CORS** enabled for frontend integration

### Database Schema

- **Navigation** - Category headings
- **Category** - Product categories
- **Product** - Product information
- **ProductDetail** - Detailed product info
- **Review** - Customer reviews
- **ScrapeJob** - Background job tracking
- **ViewHistory** - User browsing history

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd product-explorer
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up environment variables

**Backend** (`apps/api/.env`):

```env
DATABASE_URL="file:./dev.db"
```

**Frontend** (`apps/web/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### 4. Initialize database

```bash
cd apps/api
npx prisma db push
npx prisma generate
```

#### 5. Start development servers

**Backend:**

```bash
cd apps/api
npm run start:dev
```

**Frontend** (new terminal):

```bash
cd apps/web
npm run dev
```

#### 6. Access the application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **API Health:** http://localhost:3000/health

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/navigation` | Get all navigation categories |
| `GET` | `/products/:category` | Get products by category |
| `GET` | `/product/:id` | Get detailed product info |
| `POST` | `/scrape/:type` | Trigger data scraping |
| `GET` | `/health` | Health check |

---

## 🎯 Features

- ✅ **Category Navigation** - Browse book categories
- ✅ **Product Grid** - View products with pagination support
- ✅ **Product Details** - Detailed product pages with reviews
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Loading States** - Skeleton screens during data fetching
- ✅ **Error Handling** - Graceful error messages
- ✅ **SEO Friendly** - Proper meta tags and semantic HTML
- ✅ **Accessibility** - WCAG AA baseline compliance

---

## 🚀 Deployment

### Backend (Railway)

```bash
cd apps/api
railway login
railway init
railway up
```

### Frontend (Vercel)

```bash
cd apps/web
vercel --prod
```

Update `NEXT_PUBLIC_API_URL` in Vercel dashboard to point to Railway backend URL.

---

## 🧪 Testing

### Run backend tests

```bash
cd apps/api
npm run test
```

### Run frontend tests

```bash
cd apps/web
npm run test
```

---

## 📚 Design Decisions

1. **SQLite Database** - Chosen for simplicity and fast setup. Can easily switch to PostgreSQL for production.
2. **Mock Data** - Using generated mock data for demo purposes. Real scraping can be implemented with the existing Crawlee infrastructure.
3. **Monorepo Structure** - Using Turbo for efficient development workflow.
4. **TypeScript** - Full type safety across frontend and backend.
5. **Prisma ORM** - Type-safe database operations with great DX.

---

## 🔮 Future Enhancements

- Real-time scraping from World of Books
- Search functionality with filters
- User authentication and favorites
- Shopping cart functionality
- Product recommendations
- Advanced caching strategies
- Docker containerization

---

## 📄 License

This project is built as a technical assessment.

---

**Built with ❤️ using Next.js and NestJS**