# DemoDrive.tech

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd demodrive.tech
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
# Update the .env.local with your configuration
```

4. Initialize git hooks:
```bash
npm run prepare
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Quality and Linting

This project uses ESLint and Prettier for code quality and formatting. Pre-commit hooks are set up using Husky to ensure code quality.

- ESLint: JavaScript/TypeScript linting
- Prettier: Code formatting
- Husky: Git hooks
- lint-staged: Run linters on git staged files

The pre-commit hook will automatically:
- Run ESLint to check for code quality issues
- Format code using Prettier
- Prevent commits if there are any issues

To manually run linting:
```bash
npm run lint
```

To manually format code:
```bash
npx prettier --write .
```

## Project Structure

The project follows the Next.js 14 App Router structure:
- `/app`: Main application code and pages
- `/components`: Reusable React components
- `/public`: Static assets
- `/styles`: Global styles and CSS modules

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com). For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
