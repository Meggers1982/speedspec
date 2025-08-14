import { z } from "zod";

export const mvpFormSchema = z.object({
  // Step 1: Your Idea
  problem: z.string().min(10, "Problem description must be at least 10 characters"),
  solution: z.string().min(10, "Solution description must be at least 10 characters"),
  targetUser: z.string().min(5, "Target user description must be at least 5 characters"),
  
  // Step 2: Core Features
  mainFeature: z.string().min(5, "Main feature description is required"),
  supportingFeatures: z.array(z.string().min(1, "Feature description is required")).min(1, "At least one supporting feature is required"),
  
  // Step 3: User Flow
  userSteps: z.array(z.string().min(1, "Step description is required")).min(3, "At least 3 user steps are required"),
  userStepDetails: z.array(z.string().optional()).optional(),
  painPoints: z.string().optional(),
  successMetrics: z.string().optional(),
  alternativeFlows: z.array(z.string()).optional(),
  
  // Step 4: Technical Specs
  platform: z.array(z.string()).min(1, "At least one platform must be selected"),
  techNeeds: z.string().min(10, "Technical requirements description is required"),
  timeframe: z.string().min(1, "Timeframe selection is required"),
  
  // Additional fields
  title: z.string().min(1, "Project title is required"),
});

export type MVPFormData = z.infer<typeof mvpFormSchema>;

export const defaultFormValues: Partial<MVPFormData> = {
  problem: "",
  solution: "",
  targetUser: "",
  mainFeature: "",
  supportingFeatures: ["", ""],
  userSteps: ["", "", ""],
  userStepDetails: ["", "", ""],
  painPoints: "",
  successMetrics: "",
  alternativeFlows: [],
  platform: [],
  techNeeds: "",
  timeframe: "",
  title: "My MVP Plan",
};

// Template data for common MVP types
export const mvpTemplates = [
  {
    id: "ecommerce",
    name: "E-commerce App",
    description: "Browse → Add to cart → Checkout",
    icon: "shopping-cart",
    data: {
      problem: "Online shopping is fragmented across multiple platforms, making it hard for customers to find the best deals and for sellers to reach their target audience.",
      solution: "A unified marketplace that connects buyers and sellers with smart recommendation algorithms and seamless payment processing.",
      targetUser: "Young professionals aged 25-35 who shop online frequently",
      mainFeature: "Product catalog with search and filtering",
      supportingFeatures: ["Shopping cart and checkout", "User reviews and ratings"],
      userSteps: ["Browse and search products", "Add items to cart and review", "Complete purchase and payment"],
      platform: ["Web app", "Mobile app (iOS/Android)"],
      techNeeds: "Payment processing, inventory management, user authentication, recommendation engine",
      timeframe: "3 months"
    }
  },
  {
    id: "social",
    name: "Social Platform",
    description: "Sign up → Create profile → Connect",
    icon: "users",
    data: {
      problem: "People struggle to find and connect with others who share their specific interests and hobbies in their local area.",
      solution: "A location-based social network that helps people discover and join communities around shared interests.",
      targetUser: "Adults looking to make new friends and join hobby groups",
      mainFeature: "Interest-based community discovery",
      supportingFeatures: ["User profiles and matching", "Event organization and RSVP"],
      userSteps: ["Create profile and select interests", "Discover nearby communities and events", "Join groups and attend events"],
      platform: ["Mobile app (iOS/Android)"],
      techNeeds: "Location services, user matching algorithms, event management, messaging system",
      timeframe: "2 months"
    }
  },
  {
    id: "productivity",
    name: "Productivity Tool",
    description: "Import data → Organize → Take action",
    icon: "clipboard-list",
    data: {
      problem: "Teams waste time switching between multiple tools to manage projects, track tasks, and communicate progress.",
      solution: "An all-in-one workspace that integrates project management, task tracking, and team communication in a single platform.",
      targetUser: "Small to medium teams (5-20 people) in creative and tech industries",
      mainFeature: "Unified project and task management",
      supportingFeatures: ["Team collaboration and messaging", "Progress tracking and reporting"],
      userSteps: ["Set up project and invite team", "Create and assign tasks", "Track progress and communicate updates"],
      platform: ["Web app", "Desktop app"],
      techNeeds: "Real-time collaboration, file storage, integration APIs, notification system",
      timeframe: "3 months"
    }
  }
];
