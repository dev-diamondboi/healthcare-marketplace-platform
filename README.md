# HealthConnect - Healthcare Marketplace Platform

A comprehensive healthcare marketplace platform built with Next.js 13+, React, TypeScript, and MongoDB. This platform connects patients with healthcare providers, enabling appointment booking, doctor discovery, and healthcare management.

## 🚀 Features

### Core Functionality
- **Doctor Discovery**: Advanced search and filtering system with 8+ filter criteria
- **Appointment Booking**: Multi-step booking process with patient information collection
- **Doctor Profiles**: Comprehensive profiles with credentials, reviews, and availability
- **Patient Dashboard**: Centralized hub for managing appointments and health information
- **Real-time Search**: Instant search with specialty, location, and availability filters

### Advanced Features
- **Smart Filtering**: Price range, rating, languages, insurance acceptance, gender preferences
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Professional UI**: Healthcare-focused design with trust-building elements
- **Accessibility**: WCAG compliant with screen reader support and keyboard navigation

## 🛠 Tech Stack

### Frontend
- **Next.js 13+** - App Router with Server Components
- **React 18** - Latest React features with TypeScript
- **Tailwind CSS v4** - Utility-first styling with design tokens
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful, customizable icons

### Backend & Database
- **MongoDB** - Document database for flexible healthcare data
- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - Full type safety across the stack

### Key Libraries
- **date-fns** - Date manipulation and formatting
- **react-day-picker** - Calendar component for appointment booking
- **@radix-ui** - Accessible UI primitives
- **class-variance-authority** - Type-safe component variants

## 📁 Project Structure

\`\`\`
healthcare-marketplace/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── doctors/              # Doctor CRUD operations
│   │   └── appointments/         # Appointment management
│   ├── book/[doctorId]/         # Appointment booking flow
│   ├── dashboard/               # Patient dashboard
│   ├── doctors/                 # Doctor listing and profiles
│   │   └── [id]/               # Individual doctor pages
│   ├── globals.css             # Global styles and design tokens
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Landing page
├── components/
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── mongodb.ts              # Database connection
│   ├── models/                 # TypeScript interfaces
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
└── scripts/
    └── seed-database.js        # Database seeding script
\`\`\`

## 🗄 Database Schema

### Collections

#### Doctors
\`\`\`typescript
{
  _id: ObjectId
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: string
  location: string
  price: number
  languages: string[]
  education: string
  about: string
  acceptsInsurance: boolean
  gender: string
  specializations: string[]
  education_details: Array<{
    degree: string
    school: string
    year: string
  }>
  certifications: string[]
  availability_slots: Array<{
    date: string
    time: string
    available: boolean
  }>
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### Patients
\`\`\`typescript
{
  _id: ObjectId
  firstName: string
  lastName: string
  email: string (unique)
  phone: string
  dateOfBirth: string
  insuranceProvider?: string
  insuranceId?: string
  emergencyContact?: string
  emergencyPhone?: string
  medicalHistory?: {
    allergies: string[]
    medications: string[]
    conditions: string[]
  }
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### Appointments
\`\`\`typescript
{
  _id: ObjectId
  doctorId: ObjectId
  patientId: ObjectId
  date: Date
  time: string
  type: 'video' | 'in-person'
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  reason: string
  symptoms?: string
  notes?: string
  price: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## 🔧 MongoDB Setup & Connection

### 1. MongoDB Atlas Setup (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 Sandbox is free)

2. **Configure Database Access**
   - Go to Database Access → Add New Database User
   - Create a user with read/write permissions
   - Note down the username and password

3. **Configure Network Access**
   - Go to Network Access → Add IP Address
   - Add your current IP or use 0.0.0.0/0 for development (not recommended for production)

4. **Get Connection String**
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password

### 2. Local MongoDB Setup (Alternative)

1. **Install MongoDB Community Edition**
   \`\`\`bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows - Download from MongoDB website
   \`\`\`

2. **Start MongoDB Service**
   \`\`\`bash
   # macOS
   brew services start mongodb-community
   
   # Ubuntu
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   \`\`\`

3. **Connection String for Local**
   \`\`\`
   mongodb://localhost:27017
   \`\`\`

### 3. Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# For local MongoDB
# MONGODB_URI=mongodb://localhost:27017

# Next.js
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
\`\`\`

### 4. Database Initialization

1. **Install Dependencies**
   \`\`\`bash
   npm install mongodb
   \`\`\`

2. **Seed the Database**
   \`\`\`bash
   # Run the seeding script
   node scripts/seed-database.js
   \`\`\`

3. **Verify Connection**
   - Start your Next.js application
   - Check the console for "Connected to MongoDB" message
   - Visit `/api/doctors` to test the API

### 5. Database Indexes (Automatic)

The seeding script automatically creates these indexes for optimal performance:

\`\`\`javascript
// Doctors collection
{ specialty: 1 }
{ location: 1 }
{ rating: -1 }
{ price: 1 }
{ languages: 1 }

// Appointments collection
{ doctorId: 1 }
{ patientId: 1 }
{ date: 1 }
{ status: 1 }

// Patients collection
{ email: 1 } // unique index
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd healthcare-marketplace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB connection string
   \`\`\`

4. **Seed the database**
   \`\`\`bash
   node scripts/seed-database.js
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Explore the healthcare marketplace!

## 📱 Key Pages & Features

### Landing Page (`/`)
- Hero section with search functionality
- Featured specialties and top-rated doctors
- "How it works" process explanation
- Trust indicators and testimonials

### Doctor Listing (`/doctors`)
- Advanced search with 8+ filter criteria
- Real-time filtering and sorting
- Responsive card layout with doctor information
- Pagination and load more functionality

### Doctor Profile (`/doctors/[id]`)
- Comprehensive doctor information
- Tabbed interface (About, Availability, Reviews, Credentials)
- Appointment booking integration
- Patient reviews and ratings

### Appointment Booking (`/book/[doctorId]`)
- 3-step booking process
- Date and time selection with availability checking
- Patient information collection
- Payment integration ready
- Appointment confirmation

### Patient Dashboard (`/dashboard`)
- Upcoming and past appointments
- Quick actions (reschedule, cancel)
- Health metrics and reminders
- Doctor communication hub

## 🔌 API Endpoints

### Doctors API
\`\`\`
GET    /api/doctors              # List doctors with filtering
POST   /api/doctors              # Create new doctor
GET    /api/doctors/[id]         # Get doctor by ID
PUT    /api/doctors/[id]         # Update doctor
DELETE /api/doctors/[id]         # Delete doctor
\`\`\`

### Appointments API
\`\`\`
GET    /api/appointments         # List appointments
POST   /api/appointments         # Book new appointment
PUT    /api/appointments/[id]    # Update appointment
DELETE /api/appointments/[id]    # Cancel appointment
\`\`\`

### Query Parameters (Doctors API)
- `specialty` - Filter by medical specialty
- `location` - Filter by doctor location
- `minPrice` / `maxPrice` - Price range filtering
- `minRating` - Minimum rating filter
- `languages` - Comma-separated language list
- `availableToday` - Boolean for immediate availability
- `acceptsInsurance` - Boolean for insurance acceptance
- `gender` - Doctor gender preference
- `search` - Text search across name, specialty, location
- `sortBy` - Sort criteria (rating, price-low, price-high, experience, reviews)
- `page` / `limit` - Pagination parameters

## 🎨 Design System

### Color Palette
- **Primary**: Emerald green (#10b981) - Trust and healthcare
- **Secondary**: Slate grays for professional appearance
- **Accent**: Blue for interactive elements
- **Success**: Green for positive actions
- **Warning**: Amber for cautions
- **Error**: Red for alerts

### Typography
- **Headings**: Inter font family, various weights
- **Body**: Inter with optimized line heights
- **Code**: JetBrains Mono for technical content

### Components
- Consistent spacing using Tailwind's scale
- Rounded corners for modern appearance
- Subtle shadows for depth
- Hover states for interactivity
- Focus states for accessibility

## 🔒 Security Considerations

### Data Protection
- Input validation on all forms
- SQL injection prevention through MongoDB
- XSS protection with React's built-in escaping
- CSRF protection for state-changing operations

### Privacy
- Patient data encryption at rest
- Secure transmission with HTTPS
- HIPAA compliance considerations
- Data retention policies

### Authentication (Ready for Implementation)
- NextAuth.js integration prepared
- Role-based access control structure
- Session management
- OAuth provider support

## 📈 Performance Optimizations

### Frontend
- Next.js App Router for optimal loading
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Responsive images with multiple sizes

### Backend
- MongoDB indexes for fast queries
- Connection pooling for database efficiency
- API route optimization
- Caching strategies for static content

### Database
- Compound indexes for complex queries
- Aggregation pipelines for efficient data processing
- Connection reuse in serverless environment
- Query optimization with explain plans

## 🧪 Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- API route testing with Jest
- Database model validation
- Utility function testing

### Integration Tests
- End-to-end user flows
- API integration testing
- Database operation testing
- Cross-browser compatibility

### Performance Tests
- Load testing for API endpoints
- Database query performance
- Frontend rendering performance
- Mobile device testing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
\`\`\`env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
\`\`\`

### Database Considerations
- Use MongoDB Atlas for production
- Enable authentication and SSL
- Set up proper backup strategies
- Monitor performance and usage

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Conventional commits for clear history
- Component documentation with JSDoc

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
1. **MongoDB Connection Failed**
   - Check your connection string
   - Verify network access in MongoDB Atlas
   - Ensure database user has proper permissions

2. **API Routes Not Working**
   - Verify environment variables are set
   - Check MongoDB connection
   - Review server logs for errors

3. **Styling Issues**
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify component imports

### Getting Help
- Check the GitHub Issues for common problems
- Review the MongoDB documentation
- Consult Next.js documentation for framework-specific issues

---

Built with ❤️ for the Neem Health Full Stack Developer position. This project demonstrates modern web development practices, healthcare domain knowledge, and production-ready code architecture.
\`\`\`

```json file="" isHidden
