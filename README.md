# Emberpad - Social Goal Tracking Platform

A modern, beautiful goal tracking platform with social accountability features. Track your goals, share progress with friends, and achieve more together!

## 🌟 Features

### Core Features
- 🎯 **Goal Management**: Create, track, and update your personal goals
- 👥 **Social Accountability**: Follow friends and see their progress
- 🌐 **Explore Public Goals**: Discover and get inspired by community goals
- 📊 **Progress Tracking**: Visual progress bars and analytics
- 🔔 **Reminders**: Send and receive encouragement from your network
- 💬 **Comments**: Comment on goals to provide support and motivation
- 🔗 **Share**: Share goals on social media (Twitter, Facebook, LinkedIn, Email)
- 🔐 **Privacy Controls**: Set goals as public, private, or friends-only
- 📱 **Responsive Design**: Works beautifully on all devices
- ✨ **Beautiful UI**: Modern design with smooth animations

### New Features (Latest)
- ✅ **Explore Page**: Browse all public goals from the community
- ✅ **Comment System**: Add comments and encouragement to any goal
- ✅ **Share Functionality**: Share goals via social media or copy link
- ✅ **Update Progress**: Quick progress updates for your own goals
- ✅ **Advanced Filtering**: Filter by trending, recent, category, and search
- ✅ **Navigation**: Easy navigation between Dashboard, Explore, and Profile

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Zod

## 📦 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment Variables**
Create a `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/emberpad"
JWT_SECRET="your-secret-key-here"
```

3. **Set Up Database**
```bash
npm run db:generate
npm run db:push
```

4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Platform Navigation

### Main Pages

1. **Home (`/`)**: Landing page with features and call-to-action
2. **Dashboard (`/dashboard`)**: Your personal goals dashboard
   - View your goals
   - Filter by category
   - Switch between "My Goals" and "Social Feed"
   - Create new goals
   - Search for users to follow

3. **Explore (`/explore`)**: Discover public goals
   - Browse all public goals from the community
   - Filter by trending, recent, or all
   - Filter by category
   - Search goals by title, description, or user
   - View community stats

4. **Profile (`/profile`)**: Your profile page
   - View your goals
   - See following/followers
   - Edit profile settings

### Goal Card Actions

Each goal card has three main actions:

1. **Update Progress** (Own goals only)
   - Click the progress bar or "Update" button
   - Set your current progress percentage
   - Instantly updates the visual progress bar

2. **Comment**
   - Add encouragement or advice
   - Quick suggestion buttons for common messages
   - Comments are sent as check-ins

3. **Share**
   - Copy link to clipboard
   - Share on Twitter, Facebook, LinkedIn
   - Send via email

## 🔧 Recent Fixes & Improvements

### Latest Updates ✅

#### Goal Creation Fixed
- ✅ Date format conversion (YYYY-MM-DD → ISO 8601)
- ✅ Error handling with user feedback
- ✅ User ID filtering for "my goals" view
- ✅ Payload formatting for optional fields

#### Explore Page Added
- ✅ View all public goals from community
- ✅ Advanced filtering (trending, recent, category)
- ✅ Search functionality
- ✅ Community statistics

#### Goal Card Enhancements
- ✅ Comment functionality with modal
- ✅ Share functionality with social media integration
- ✅ Progress update with interactive modal
- ✅ Conditional "Update" button for own goals only

#### Navigation Improvements
- ✅ Added "Explore" link to header
- ✅ Mobile-friendly navigation menu
- ✅ Responsive design across all pages

#### Authentication Flow
- ✅ Fixed race condition preventing login
- ✅ Added auth loading states
- ✅ Proper redirect handling

#### API Integration
- ✅ Fixed all endpoint query parameters
- ✅ Standardized response format handling
- ✅ Added public goals endpoint

## 🎨 UI Components

### Modals
- **CreateGoalModal**: Create new goals with full customization
- **ProgressUpdateModal**: Update goal progress
- **CommentModal**: Add comments to goals
- **ShareModal**: Share goals on social media
- **UserSearchModal**: Find and follow users

### UI Elements
- Animated cards with hover effects
- Progress bars with gradient colors
- Category-based color coding
- Responsive grid layouts
- Loading states and skeletons

## 📊 Platform Status

### ✅ Fully Functional
All core features are working:
- ✅ User registration and login
- ✅ Goal creation and display
- ✅ Progress updates
- ✅ Social feed
- ✅ Public goals exploration
- ✅ Follow/unfollow users
- ✅ Send reminders
- ✅ Comments on goals
- ✅ Share goals
- ✅ Profile management
- ✅ Responsive UI
- ✅ Search and filters

## 📚 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup and troubleshooting
- [prd.txt](./prd.txt) - Complete product requirements document

## 🔐 Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens

Optional:
- `NEXT_PUBLIC_SUPABASE_URL`: For future Supabase features
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: For future Supabase features

## 🗃️ Database Commands

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database (dev)
npm run db:migrate   # Run migrations (prod)
npm run db:studio    # Open Prisma Studio
```

## 🐛 Known Issues & Limitations

None currently! All major features are working.

## 🚦 Getting Started Guide

1. **Sign Up**: Create an account at `/auth/signup`
2. **Log In**: Sign in at `/auth/login`
3. **Create Goals**: Click "Create Goal" on dashboard
4. **Explore**: Visit `/explore` to see community goals
5. **Follow Users**: Search and follow other users
6. **Track Progress**: Update your goal progress regularly
7. **Engage**: Comment and share goals for motivation

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

Private project - All rights reserved

## 🎯 Future Enhancements

Potential features for future versions:
- Direct messaging between users
- Goal templates
- Achievement badges
- Email notifications
- Calendar integration
- Mobile app (React Native)
- Goal analytics and insights
- Team/group goals
- Public leaderboards

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
