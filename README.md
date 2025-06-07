# Medical Prescription System

A comprehensive medical prescription management system built with React frontend and Spring Boot backend. This system allows healthcare professionals to search for medicines, create prescriptions, and generate shareable prescription receipts with unique hash-based links.

## 🏥 Features

- **Medicine Search**: Advanced search functionality to find medicines by name, category, or active ingredients
- **Prescription Management**: Create and manage medical prescriptions with multiple medicines
- **Receipt Generation**: Generate unique prescription receipts with shareable hash-based links
- **User Authentication**: Secure JWT-based authentication system with refresh token support
- **Professional Interface**: Clean, modern UI designed for healthcare professionals
- **Prescription Notes**: Add specific usage instructions for each medicine

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern JavaScript framework
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling

### Backend
- **Spring Boot 3.x** - Java framework
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Secure authentication
- **JPA/Hibernate** - Database ORM
- **MySQL/PostgreSQL** - Database (configurable)
- **Maven** - Dependency management

## 📁 Project Structure

```
medical-prescription-system/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── Redux/          # Redux store and slices
│   │   ├── Service/        # API service layer
│   │   └── css/           # Stylesheets
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/reciept/backend/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic layer
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── dto/           # Data transfer objects
│   │   └── security/      # Security configuration
│   └── pom.xml            # Maven dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Java 17** or higher
- **Maven 3.6+**
- **MySQL** or **PostgreSQL** database

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-prescription-system/backend
   ```

2. **Configure Database**

   Update `application.properties` or `application.yml`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/prescription_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   
   # JWT Configuration
   jwt.secret=your-secret-key
   jwt.expiration=86400000
   ```

3. **Install Dependencies & Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`

4. **Database Schema**

   The application will automatically create the following tables:
    - `users` - User authentication data
    - `medicines` - Medicine catalog
    - `prescriptions` - Prescription records
    - `prescription_medicines` - Many-to-many relationship
    - `refresh_tokens` - JWT refresh tokens

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API Base URL**

   Update the API base URL in `src/Service/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080';
   ```

4. **Start Development Server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The frontend will start on `http://localhost:3000`

## 🔧 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /authenticate` - User login
- `POST /refresh-access` - Refresh access token

### Medicine Management
- `GET /medicine?keyword={search_term}` - Search medicines

### Prescription Management
- `POST /save/medicine` - Create new prescription
- `GET /get-prescription?hashId={hash}` - Get prescription by hash ID

## 💡 How It Works

### 1. User Authentication
- Users register/login using email and password
- JWT tokens are issued for secure API access
- Refresh tokens ensure seamless user experience

### 2. Medicine Search
- Healthcare professionals search for medicines using keywords
- Real-time search with debounced API calls
- Results show medicine name, category, and dosage form

### 3. Prescription Creation
- Select multiple medicines from search results
- Add specific usage instructions for each medicine
- Create prescription with unique hash ID

### 4. Receipt Generation
- Each prescription gets a unique 8-character hash ID
- Shareable links: `/receipt/{hashId}`
- Professional receipt format with all prescription details

### 5. Data Flow
```
User Search → Medicine Selection → Add Notes → Create Prescription → Generate Receipt → Share Link
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Refresh Tokens**: Automatic token renewal
- **CORS Configuration**: Cross-origin request handling
- **Input Validation**: Server-side request validation

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile devices
- **Professional Interface**: Clean, medical-focused design
- **Real-time Search**: Instant medicine search results
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages
- **Intuitive Navigation**: Easy-to-use interface for healthcare professionals

## 📊 Database Schema

### Key Entities
- **User**: Healthcare professional accounts
- **Medicine**: Medicine catalog with categories and dosage forms
- **Prescription**: Prescription records with hash IDs
- **RefreshToken**: JWT refresh token management

### Relationships
- User → Prescriptions (One-to-Many)
- Prescription → Medicines (Many-to-Many)
- User → RefreshTokens (One-to-Many)

## 🚀 Deployment

### Backend Deployment
1. Build the application: `mvn clean package`
2. Deploy the JAR file to your server
3. Configure production database settings
4. Set up reverse proxy (Nginx) if needed

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy the `build` folder to web server
3. Configure API endpoints for production
4. Set up HTTPS for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This system is designed for educational and demonstration purposes. For production use in medical environments, ensure compliance with healthcare regulations like HIPAA, GDPR, and local medical data protection laws.