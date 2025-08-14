# Overview

This is a full-stack MVP (Minimum Viable Product) planning application built with TypeScript, React, and Express. The application provides a guided, step-by-step interface for entrepreneurs and product builders to create comprehensive MVP plans through a structured form wizard. Users can define their product idea, core features, user flows, and technical specifications, then export their completed plans in various formats.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built as a Single Page Application (SPA) using React with TypeScript and modern development practices:

- **React with TypeScript**: Type-safe component development with functional components and hooks
- **Vite**: Fast development server and build tool optimized for modern web development
- **Wouter**: Lightweight client-side routing library for navigation
- **React Hook Form**: Form state management with validation, chosen for performance and developer experience
- **Zod**: Runtime type validation and schema definition, integrated with React Hook Form
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: Pre-built accessible UI components based on Radix UI primitives
- **TanStack Query**: Server state management for API calls and caching

## Backend Architecture
The server is built using Express.js with TypeScript in an ESM (ES Modules) configuration:

- **Express.js**: Web framework handling API routes and middleware
- **In-Memory Storage**: Currently uses a Map-based storage implementation for MVP plans and users
- **Modular Route System**: Separated route handlers in dedicated files for maintainability
- **Type-Safe API**: Shared TypeScript types between client and server via a `shared` directory
- **Development Integration**: Vite middleware integration for seamless development experience

## Data Storage Solutions
The application uses a flexible storage abstraction pattern:

- **Storage Interface**: `IStorage` interface defines standard CRUD operations
- **Memory Implementation**: `MemStorage` class provides in-memory data persistence for development
- **Database Ready**: Drizzle ORM configuration prepared for PostgreSQL migration
- **Schema Definition**: Centralized schema definitions using Drizzle ORM and Zod validation

## Form Management and Validation
Multi-step form wizard with comprehensive validation:

- **Step-by-Step Wizard**: Five distinct steps guiding users through MVP planning
- **Real-time Validation**: Field-level validation with immediate feedback
- **Auto-save Functionality**: Automatic draft saving to localStorage with configurable intervals
- **Progress Tracking**: Visual progress indicators and step completion status
- **Template System**: Pre-built templates for common MVP types

## User Experience Features
Enhanced UX with modern interaction patterns:

- **Responsive Design**: Mobile-first design working across all device sizes
- **Accessibility**: WCAG-compliant components using Radix UI primitives
- **Loading States**: Proper loading and error states throughout the application
- **Toast Notifications**: User feedback system for actions and errors
- **Help System**: Contextual help and guidance for form completion

# External Dependencies

## UI and Styling
- **@radix-ui/***: Accessible, unstyled UI primitives for building the component library
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Icon library providing consistent iconography

## Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer between React Hook Form and validation libraries
- **zod**: TypeScript-first schema validation library

## Data Fetching and State Management
- **@tanstack/react-query**: Server state management with caching, synchronization, and background updates

## Database and ORM
- **drizzle-orm**: Type-safe ORM for PostgreSQL with excellent TypeScript integration
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connectivity

## Development Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Routing and Navigation
- **wouter**: Minimalist routing library for React applications

## Utilities
- **clsx**: Utility for constructing className strings conditionally
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: URL-safe unique string ID generator

The architecture prioritizes developer experience, type safety, and user experience while maintaining flexibility for future scaling and feature additions. The storage layer abstraction allows for easy migration from in-memory storage to persistent database solutions without requiring application-wide changes.