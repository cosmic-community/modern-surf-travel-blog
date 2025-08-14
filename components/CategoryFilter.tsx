'use client'

import { useState } from 'react'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // TODO: Implement filtering logic here
    // This could trigger a search params update or filter the posts
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-ocean-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Posts
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-ocean-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.metadata?.name}
        </button>
      ))}
    </div>
  )
}