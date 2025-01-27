# Cloudinary SaaS Application

## Overview

In this project, we are building a powerful **AI-powered SaaS application** using **Next.js** and **Cloudinary**. This application will allow users to upload and transform videos and images using AI-powered media management features, such as resizing images, compressing videos, and selecting key frames. We'll also integrate **user authentication** and design a smooth **UX/UI** to ensure a seamless experience.

The goal of this project is to demonstrate how to build simple but valuable SaaS applications that integrate AI, Cloudinary for media management, and modern technologies like React and Node.js.

## Features

- **AI-powered media transformations**: Resize, compress, and optimize images and videos.
- **Cloudinary integration**: Efficient media management, leveraging Cloudinary's capabilities for compression and transformation.
- **User authentication**: Secure sign-ups and logins using **Clerk**.
- **Simple yet scalable UI**: Using **TailwindCSS** for responsive and user-friendly design.
- **TypeScript & ESLint**: Ensuring a clean and maintainable codebase.

## Key Technologies

- **Next.js**: Framework for building server-side rendered React applications.
- **Cloudinary**: Cloud media management for image and video uploading, transformation, and optimization.
- **AI Integration**: Using AI to transform and enhance media, like selecting significant video frames and context-aware image resizing.
- **Clerk**: Authentication and user management.
- **Prisma**: ORM for database management.
- **TailwindCSS & DaisyUI**: For responsive, customizable UI components.

## Screenshots

### Video Transformation

![image](https://github.com/user-attachments/assets/531957c0-fc7a-4cc1-a40e-5dbb7bbe1f73)

### Image Transformation

![image](https://github.com/user-attachments/assets/f12c0acd-25f1-43d1-9a59-aea89bb79a5f)


![image](https://github.com/user-attachments/assets/e2bb65d9-dccb-45af-a4a3-784b79f4ccaf)

### Sign-In

![image](https://github.com/user-attachments/assets/69c26460-17bf-4d02-b1e9-50ea730762a7)

### Upload Video

![image](https://github.com/user-attachments/assets/b57fc63b-b1bf-4e3c-b019-b6ad6f4dca87)

## Project Setup

### Prerequisites

Ensure that you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **npm** (or **yarn**)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/cloudinary-saas.git
   cd cloudinary-saas
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add the following environment variables:

   ```env
   NEXT_PUBLIC_CLOUDINARY_URL=<your-cloudinary-url>
   CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   DATABASE_URL=<your-prisma-database-url>
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to see the application in action.

### Available Scripts

- **dev**: Starts the development server in watch mode.

  ```bash
  npm run dev
  ```

- **build**: Builds the project for production.

  ```bash
  npm run build
  ```

- **start**: Starts the production server after building.

  ```bash
  npm run start
  ```

- **lint**: Lints the project files for code quality.

  ```bash
  npm run lint
  ```

## Project Structure

```
.
├── components/         # React components for UI elements
├── lib/                # Utility functions
├── pages/              # Next.js pages for routing
├── prisma/             # Prisma ORM and database management
├── public/             # Public assets (images, etc.)
├── styles/             # Global styles (TailwindCSS)
└── .env.local          # Local environment variables
```

## AI Features

The AI-powered features in this application are integrated using **Cloudinary's AI capabilities**. Some of the key transformations include:

- **Automatic image resizing**: Based on user preferences and format.
- **Video compression**: To reduce file size while retaining quality.
- **Key frame extraction**: To highlight the most important parts of videos.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes.

- **Bug fixes**: If you encounter a bug, please report it by opening an issue.
- **Feature requests**: If you have an idea for a new feature, feel free to submit it for consideration.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
