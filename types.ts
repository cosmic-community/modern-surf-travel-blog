// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Post interface matching your Cosmic content model
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    location?: string;
    wave_rating?: {
      key: string;
      value: string;
    };
  };
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    instagram?: string;
    years_surfing?: number;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Wave rating type for type safety
export type WaveRating = '1' | '2' | '3' | '4' | '5';

// Component prop types
export interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export interface AuthorCardProps {
  author: Author;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export interface HeroProps {
  featuredPost: Post;
}