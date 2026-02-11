# 🏍️ Sport Bike Portfolio - Full Stack Web Application

A comprehensive full-stack web application showcasing 100+ sport motorcycles from major brands worldwide. Built with React.js, Node.js, Express.js, and PostgreSQL.

![Sport Bike Portfolio](https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=1200&h=400&fit=crop)

## 🎯 Features

### Frontend
- ✨ Modern, responsive design with dark theme
- 🏠 Dynamic home page with featured bikes and brand showcase
- 🏍️ Comprehensive bike catalog with advanced filtering
- 🔍 Search, filter, and sort functionality
- 📄 Detailed bike pages with image galleries and specifications
- ❤️ Wishlist functionality (localStorage)
- 📱 Fully responsive Bootstrap 5 design
- 🎨 Smooth animations and transitions
- 🔐 JWT authentication system
- 👤 User registration and login
- 🛡️ Protected admin routes

### Backend
- 🚀 RESTful API with Express.js
- 🗄️ PostgreSQL database
- 🔒 JWT authentication middleware
- 📊 Advanced query filtering and pagination
- 🎯 CRUD operations for bikes and brands
- 🖼️ Image management system
- ✅ Input validation
- 🛡️ Role-based access control (Admin/User)

### Database
- 100+ sport bikes across 11 brands
- Complete specifications (CC, HP, torque, top speed, etc.)
- Multiple colors per bike
- Multiple images per bike
- Brand information with logos
- User authentication system

## 🏗️ Project Structure

```
sport-bike-portfolio/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bikeController.js
│   │   └── brandController.js
│   ├── database/
│   │   ├── db.js
│   │   ├── schema.sql
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Bike.js
│   │   ├── Brand.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bikeRoutes.js
│   │   └── brandRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BikeCard.js
│   │   │   ├── FilterPanel.js
│   │   │   ├── Footer.js
│   │   │   ├── Navigation.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── WishlistContext.js
│   │   ├── pages/
│   │   │   ├── Admin.js
│   │   │   ├── AllBikes.js
│   │   │   ├── BikeDetails.js
│   │   │   ├── Brands.js
│   │   │   ├── Categories.js
│   │   │   ├── Contact.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Wishlist.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database**
   ```bash
   psql -U postgres
   CREATE DATABASE sportbike_db;
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=sportbike_db
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. **Run database schema**
   ```bash
   psql -U postgres -d sportbike_db -f database/schema.sql
   ```

6. **Seed the database**
   ```bash
   npm run seed
   ```

7. **Start the server**
   ```bash
   npm start
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   The default configuration should work if backend runs on port 5000.

4. **Start the development server**
   ```bash
   npm start
   ```
   
   App will open on `http://localhost:3000`

## 🔑 Default Admin Credentials

After seeding the database, you can login with:
- **Email:** admin@sportbikes.com
- **Password:** admin123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Bikes
- `GET /api/bikes` - Get all bikes (with filters)
- `GET /api/bikes/featured` - Get featured bikes
- `GET /api/bikes/:id` - Get bike by ID
- `GET /api/bikes/:id/related` - Get related bikes
- `POST /api/bikes` - Create bike (Admin only)
- `PUT /api/bikes/:id` - Update bike (Admin only)
- `DELETE /api/bikes/:id` - Delete bike (Admin only)

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `GET /api/brands/:id/bikes` - Get bikes by brand
- `POST /api/brands` - Create brand (Admin only)
- `PUT /api/brands/:id` - Update brand (Admin only)
- `DELETE /api/brands/:id` - Delete brand (Admin only)

## 🎨 Tech Stack

### Frontend
- **React.js** 18.2 - UI library
- **React Router** 6.20 - Routing
- **Bootstrap** 5.3 - CSS framework
- **React Bootstrap** 2.9 - Bootstrap components for React
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18 - Web framework
- **PostgreSQL** - Database
- **node-postgres (pg)** - PostgreSQL client
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware

## 📊 Database Schema

### Brands Table
- id (Primary Key)
- name (Unique)
- logo_url
- created_at

### Bikes Table
- id (Primary Key)
- brand_id (Foreign Key)
- name
- model_year
- engine_cc
- horsepower
- torque
- top_speed
- mileage
- price
- category
- description
- created_at
- updated_at

### Bike Colors Table
- id (Primary Key)
- bike_id (Foreign Key)
- color_name
- color_hex

### Bike Images Table
- id (Primary Key)
- bike_id (Foreign Key)
- image_url
- is_primary
- display_order

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- role
- created_at

## 🏍️ Included Brands

1. **Yamaha** - 15 bikes
2. **Kawasaki** - 15 bikes
3. **Suzuki** - 12 bikes
4. **Honda** - 12 bikes
5. **Ducati** - 15 bikes
6. **BMW** - 10 bikes
7. **KTM** - 10 bikes
8. **Aprilia** - 8 bikes
9. **Triumph** - 10 bikes
10. **MV Agusta** - 7 bikes
11. **Harley Davidson** - 5 bikes

**Total: 100+ Sport Bikes**

## 📦 Features in Detail

### Filtering & Search
- Search by bike name or description
- Filter by brand
- Filter by category (SuperSport, HyperSport, Street Sport, Track)
- Filter by price range
- Filter by engine CC range
- Sort by price, CC, top speed, name, or date

### Pagination
- 12 bikes per page (configurable)
- Easy page navigation
- Smooth scrolling to top on page change

### Wishlist
- Add/remove bikes to wishlist
- Persistent storage (localStorage)
- Wishlist count badge
- View all wishlist items

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- Admin role-based access

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel
```bash
cd frontend
vercel
```

#### Netlify
```bash
cd frontend
npm run build
# Deploy the build folder to Netlify
```

### Backend Deployment (Render/Railway)

#### Render
1. Create new Web Service
2. Connect your repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

#### Railway
```bash
cd backend
railway login
railway init
railway up
```

### Database Deployment

#### Neon
1. Create account at neon.tech
2. Create new project
3. Copy connection string
4. Update backend .env file

#### Supabase
1. Create account at supabase.com
2. Create new project
3. Use provided PostgreSQL credentials
4. Run schema.sql and seed.js

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- SQL injection prevention
- CORS configuration
- Environment variables for sensitive data

## 🎯 Future Enhancements

- [ ] Advanced admin dashboard with analytics
- [ ] Bike comparison feature
- [ ] User reviews and ratings
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Social media integration
- [ ] Advanced search with filters
- [ ] Bike availability status
- [ ] Price history tracking
- [ ] Newsletter subscription

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for motorcycle enthusiasts

## 📞 Support

For support, email info@sportbikes.com or join our community forum.

---

**Happy Riding! 🏍️💨**
