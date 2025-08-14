# Surf Travel Blog

![App Preview](https://imgix.cosmicjs.com/661e6d90-78d6-11f0-a051-23c10f41277a-photo-1544551763-46a013bb70d5-1755152266469.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive surf travel blog built with Next.js and powered by Cosmic CMS. Showcase surf destinations, gear reviews, and surf culture stories with a beautiful, mobile-first design.

## Features

- 🌊 Dynamic content from Cosmic CMS
- 📱 Fully responsive, mobile-first design
- 🏄‍♂️ Category-based content filtering (Destinations, Gear Reviews, Surf Culture)
- ✍️ Author profiles with social links and experience levels
- ⭐ Wave difficulty rating system
- 🎨 Modern, ocean-inspired design
- ⚡ Fast loading with optimized images
- 🔍 SEO optimized with meta tags

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=689d7ef529b6af68271ef3d4&clone_repository=689d806d29b6af68271ef3f2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a surf travel blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Give it a modern style and mobile responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Cosmic CMS
- **Language**: TypeScript
- **Fonts**: Inter
- **Image Optimization**: Imgix via Cosmic

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- A Cosmic account with your bucket set up

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd surf-travel-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update your environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

5. Run the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Filtering by Category
```typescript
const destinationPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId
  })
  .depth(1)
```

### Getting Single Post
```typescript
const post = await cosmic.objects
  .findOne({ 
    type: 'posts',
    slug: 'uluwatu-guide'
  })
  .depth(1)
```

## Cosmic CMS Integration

This website integrates with the following Cosmic object types:

- **Posts** (`posts`) - Blog articles with content, featured images, authors, categories, and wave ratings
- **Authors** (`authors`) - Writer profiles with bios, avatars, Instagram handles, and surfing experience
- **Categories** (`categories`) - Content organization (Destinations, Gear Reviews, Surf Culture)

The integration uses the Cosmic SDK with TypeScript for type safety and includes proper error handling for production use.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Netlify
1. Build the project: `bun run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables
4. Enable continuous deployment

For production deployment, make sure to set your environment variables in your hosting platform's dashboard.
<!-- README_END -->