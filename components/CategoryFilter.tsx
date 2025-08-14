'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categorySlug && categorySlug !== 'all') {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    
    // Navigate to home page with category filter
    const queryString = params.toString()
    const url = queryString ? `/?${queryString}` : '/'
    router.push(url)
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !selectedCategory || selectedCategory === 'all'
            ? 'bg-ocean-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Posts
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-ocean-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.metadata?.name || category.title}
        </button>
      ))}
    </div>
  )
}