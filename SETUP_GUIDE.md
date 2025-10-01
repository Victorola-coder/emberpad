# Emberpad Setup Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory with the following:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/emberpad"

# JWT Secret (change this to a random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Optional: Supabase (for future features)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# OR run migrations (for production)
npm run db:migrate
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database (dev)
- `npm run db:migrate` - Run database migrations (prod)
- `npm run db:studio` - Open Prisma Studio to view/edit data

## Troubleshooting

### Goals Not Displaying After Creation

If created goals are not showing up:

1. **Check Database Connection**: Make sure your `DATABASE_URL` in `.env` is correct
2. **Run Prisma Generate**: Run `npm run db:generate` to ensure Prisma client is up to date
3. **Push Schema**: Run `npm run db:push` to sync your database schema
4. **Check Browser Console**: Open DevTools and check for any API errors
5. **Check Network Tab**: Look for failed API requests to `/api/goals`

### Common Issues

1. **"PrismaClient is not configured"**
   - Run: `npm run db:generate`

2. **"Can't reach database server"**
   - Make sure PostgreSQL is running
   - Check your DATABASE_URL

3. **"JWT must be provided"**
   - Make sure JWT_SECRET is set in your .env file

4. **"User ID is required" when creating goals**
   - Make sure you're logged in
   - Check that user data is being passed correctly

## Testing the Platform

1. **Sign Up**: Go to `/auth/signup` and create an account
2. **Log In**: Log in with your credentials
3. **Create a Goal**: Click "Create Goal" on the dashboard
4. **Fill the form**:
   - Title: Required
   - Description: Optional
   - Category: Select from dropdown
   - Target Date: Optional (use date picker)
   - Privacy: Public/Private/Friends
5. **Submit**: Click "Create Goal"
6. **Verify**: The goal should appear immediately in your dashboard

## Features Ready to Use

✅ User authentication (register/login)
✅ Goal creation with categories and privacy
✅ Progress tracking
✅ Social feed
✅ User search and follow
✅ Reminders
✅ Profile page
✅ Responsive design

## Next Steps

- Set up your database
- Create your first account
- Start tracking your goals!

If you encounter any issues, check the console logs in both the browser and terminal for error messages.

