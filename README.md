# RTG Aligned Execution System

A comprehensive project management system built with React and Vite, featuring multi-project support, stream-based organization, and executive-level reporting.

## 🚀 Features

### Multi-Project Management
- **Project Isolation** - Complete separation of data between projects
- **Project Switching** - Seamless switching between different project workspaces
- **Scalable Architecture** - Support for unlimited projects per user

### Stream-Based Organization
- **L0 Whiteboard** - Free-form problem mapping and ideation
- **L1 Program Board** - Functional deliverables organized by streams
- **L2 Monitoring** - Concurrent execution tracking with target dates
- **Schedule View** - Timeline visualization of streams and tracks
- **Executive View** - Comprehensive metrics and performance analytics

### Advanced Features
- **Editable Checklist Items** - Inline editing with save/cancel functionality
- **Collapsible Streams** - Compact view for better navigation
- **Archive Management** - Preserve metrics while removing from active workflow
- **Completion Tracking** - Orange indicators for completed streams with open deliverables
- **Metrics Dashboard** - Total slip days, recommits, and completion rates

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Storage**: LocalStorage (ready for Supabase integration)
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rtg-ae-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Deployment

### GitHub → Vercel → Supabase Pipeline

#### 1. GitHub Setup
- Push this repository to GitHub
- Ensure all source files are committed

#### 2. Vercel Deployment
- Connect GitHub repository to Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- Deploy automatically on push

#### 3. Supabase Integration (Future)
Add environment variables in Vercel:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Architecture

### Data Structure
- **Projects** - Top-level isolation containers
- **Streams** - Organizational units within projects
- **Deliverables** - Functional work items with tracking
- **Tracks** - Execution monitoring with dates and status

### Storage Strategy
- **LocalStorage** - Current implementation for client-side persistence
- **Project Namespacing** - Data isolated by project ID
- **Migration Ready** - Prepared for Supabase database integration

## 🧪 Testing

### Multi-Project Testing
1. Create new project via dropdown
2. Verify data isolation between projects
3. Test project switching functionality
4. Confirm metrics are project-specific

### Feature Testing
- [ ] Stream creation and management
- [ ] Deliverable tracking and completion
- [ ] Archive functionality with validation
- [ ] Executive view metrics accuracy
- [ ] Responsive design on mobile/desktop

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── RTGNavigation.jsx
│   ├── ProgramBoardLevel.jsx
│   └── ...
├── data/               # Data models and storage
│   ├── projectManager.js
│   ├── rtgAEDataModel.js
│   └── initialData.js
└── App.jsx            # Main application component
```

## 📋 Essential Files Checklist

### ✅ MUST Include in GitHub:
- `src/` - All source code
- `public/` - Static assets
- `package.json` - Dependencies and scripts
- `package-lock.json` - Dependency versions
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `vite.config.js` - Build configuration
- `.gitignore` - Git ignore rules
- `README.md` - Documentation

### ❌ Automatically Ignored:
- `node_modules/` - Dependencies (installed during build)
- `dist/` - Build outputs (generated during deployment)
- `.env.local` - Local environment variables
- `screenshots/` - Temporary files
- `*.log` - Log files

## 🎯 Roadmap

### Phase 1: Core Functionality ✅
- Multi-project support
- Stream management
- Deliverable tracking
- Executive reporting

### Phase 2: Database Integration
- Supabase backend integration
- User authentication
- Real-time collaboration
- Data persistence

### Phase 3: Advanced Features
- Team collaboration
- Advanced analytics
- Export capabilities
- Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏢 About

Built by FastLynk Software for enterprise project management and execution tracking.

---

**Ready for GitHub → Vercel → Supabase deployment pipeline!**

