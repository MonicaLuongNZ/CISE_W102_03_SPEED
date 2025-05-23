# CISE_W102_03_SPEED

## Fullstack Application

This is a fullstack web application built with Next.js on the frontend and NestJS (running on Node.js) on the backend. It uses MongoDB as the database and is deployed via Vercel.

---

## Technology Stack

### Frontend

- **Framework**: Next.js `15.3.1`
- **Language**: TypeScript `^5`
- **React**: `^19.0.0`
- **Styling**: Tailwind CSS `^4`
- **Linting**: ESLint `^9` with `eslint-config-next` `15.3.1`
- **Type Definitions**:
  - `@types/react` `^19`
  - `@types/react-dom` `^19`
  - `@types/node` `^20`
- **Deployment**: Vercel

### Backend

- **Framework**: NestJS `^11.0.1`
- **Language**: TypeScript `^5.7.3`
- **Database**: MongoDB (via Mongoose `^8.14.0`)
- **Configuration**:
  - `@nestjs/config` `^4.0.2`
  - `dotenv` `^16.5.0`
- **Platform**: Express (`@nestjs/platform-express`)
- **Reactive Programming**: RxJS `^7.8.1`
- **Validation & Metadata**: `reflect-metadata` `^0.2.2`
- **Development Server**: `nodemon` `^3.1.10`
- **Deployment**: Vercel (frontend) + Railway, Render, or Vercel functions (backend)

### Testing & Tooling

- **Testing**:
  - Jest `^29.7.0`
  - Supertest `^7.0.0`
  - `ts-jest`
  - `@nestjs/testing`
- **Build Tools**:
  - `ts-node`, `ts-loader`
  - `@swc/core`, `@swc/cli`
- **Linting & Formatting**:
  - ESLint `^9.18.0`
  - Prettier `^3.4.2`
- **NestJS CLI**: `@nestjs/cli` `^11.0.0`
- **Type Definitions**:
  - `@types/express`, `@types/jest`, `@types/supertest`, `@types/node`

---

## Getting Started

### Prerequisites

- Node.js (>=18.x)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MonicaLuongNZ/CISE_W102_03_SPEED.git
   cd your-repo

2. Install dependencies:

> Frontend  
>> cd frontend  
>> npm install

> Backend  
>> cd backend  
>> npm install

3. Run the application:

> Start backend (in one terminal)  
>> cd backend  
>> npm run start:dev

> Start frontend (in another terminal)  
>> cd frontend  
>> npm run dev

### Scripts
>Frontend
>>npm run dev – Start Next.js development server

>>npm run build – Build frontend for production

>>npm start – Start production server

>>npm run lint – Run ESLint

>Backend
>>npm run start:dev – Start NestJS with live reload

>>npm run build – Build backend

>>npm run test – Run unit tests

>>npm run lint – Run ESLint

>>npm run format – Format code with Prettier
