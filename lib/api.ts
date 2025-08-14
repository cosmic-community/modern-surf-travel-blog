import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Category, Author, CosmicResponse } from '@/types'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Get all posts with related data
export async function getAllPosts(): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return objects as Post[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return object as Post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])

    return objects as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])

    return objects as Author[]
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category.slug': categorySlug 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return objects as Post[]
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}