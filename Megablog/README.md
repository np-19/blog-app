# Megablog

A modern, full-featured blogging platform built with React, Vite, and Appwrite. Megablog provides a seamless experience for creating, editing, and managing blog posts with a beautiful, responsive user interface.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with email and password
- Secure login and logout functionality
- Session management with persistent authentication
- Protected routes for authenticated users

### 📝 Post Management
- **Create Posts**: Rich text editor powered by TinyMCE for creating beautifully formatted blog posts
- **Edit Posts**: Update existing posts with full editing capabilities
- **Delete Posts**: Remove posts from the platform
- **Featured Images**: Upload and attach images to blog posts
- **Post Status**: Control post visibility with active/inactive status
- **Slug Generation**: URL-friendly post identifiers

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Gradient backgrounds and smooth animations
- Mobile-friendly interface
- Post cards with featured images
- Loading states and error handling

### 🔧 Technical Features
- **State Management**: Redux Toolkit for global state management
- **Routing**: React Router for seamless navigation
- **Form Handling**: React Hook Form for efficient form validation
- **Backend**: Appwrite as Backend-as-a-Service (BaaS)
- **Storage**: Cloud storage for images and media files
- **Database**: NoSQL database for post and user data

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Routing**: React Router 7
- **Forms**: React Hook Form
- **Rich Text Editor**: TinyMCE
- **Backend**: Appwrite
- **Linting**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager
- An Appwrite account and project (see setup below)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Megablog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Appwrite

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io) or set up a self-hosted instance
2. Create a new project in Appwrite
3. Set up the following in your Appwrite project:

#### Database Setup
- Create a new database
- Create a table/collection with the following attributes:
  - `title` (String, required)
  - `content` (String, required)
  - `featuredImage` (String, required)
  - `status` (String, required)
  - `userId` (String, required)
  - `slug` (String, required)

#### Storage Setup
- Create a new storage bucket for featured images
- Configure appropriate permissions for file uploads

#### Authentication Setup
- Enable Email/Password authentication in the Auth settings

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add your Appwrite credentials:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

Replace the placeholder values with your actual Appwrite credentials.

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🗂️ Project Structure

```
Megablog/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable React components
│   │   ├── Auth/        # Authentication components
│   │   ├── Container/   # Layout container
│   │   ├── Footer/      # Footer component
│   │   ├── Header/      # Header and navigation
│   │   └── PostForm/    # Post creation/edit form
│   ├── configs/         # Configuration files
│   ├── features/        # Redux slices
│   │   └── auth/        # Authentication state management
│   ├── pages/           # Page components
│   ├── services/        # API service layers
│   │   ├── auth.js      # Authentication service
│   │   ├── database.js  # Database operations
│   │   └── bucket.js    # File storage service
│   └── store/           # Redux store configuration
├── .env                 # Environment variables (create this)
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Key Components

### Authentication
- `Login.jsx` - User login form
- `Signup.jsx` - User registration form
- `AuthLayout.jsx` - Protected route wrapper

### Posts
- `PostForm.jsx` - Create/edit post form with rich text editor
- `PostCard.jsx` - Display post preview card
- `AllPosts.jsx` - List all posts
- `Post.jsx` - Individual post view

### Common Components
- `Header.jsx` - Navigation header with auth status
- `Footer.jsx` - Site footer
- `Button.jsx` - Reusable button component
- `Input.jsx` - Reusable input component
- `Select.jsx` - Reusable select dropdown
- `RTE.jsx` - Rich Text Editor wrapper

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Appwrite Connection Error**: Verify your environment variables are correct
2. **Authentication Issues**: Check that Email/Password auth is enabled in Appwrite
3. **Image Upload Fails**: Ensure storage bucket permissions are configured correctly
4. **Build Errors**: Clear node_modules and reinstall dependencies

## 📧 Support

For issues and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using React and Appwrite
