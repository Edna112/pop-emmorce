# Images and Videos Setup Guide

## How to Add Images and Videos from PuppySpot

Since I cannot directly access external websites, here's how to add the images and videos from the PuppySpot Yorkie Poo page:

### Step 1: Extract Image URLs
1. Visit: https://www.puppyspot.com/puppies-for-sale-by-breeders?breed_slug=yorkiepoo
2. For each puppy listing:
   - Right-click on each image
   - Select "Copy image address" or "Copy image URL"
   - Note the puppy's name/ID if visible

### Step 2: Extract Video URLs
1. For each puppy with a video:
   - Right-click on the video
   - Select "Copy video address" or inspect the page source
   - Copy the video URL

### Step 3: Update the Data File
1. Open `src/data/puppies.ts`
2. For each puppy, update the `images` array with the actual URLs:
   ```typescript
   images: [
     "https://actual-puppyspot-image-url-1.jpg",
     "https://actual-puppyspot-image-url-2.jpg",
     "https://actual-puppyspot-image-url-3.jpg",
   ],
   ```
3. Update the `video` field with the actual video URL:
   ```typescript
   video: "https://actual-puppyspot-video-url.mp4",
   ```

### Step 4: Update Next.js Config (if needed)
If the images are from a different domain, add it to `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.puppyspot.com', // or whatever domain
    },
  ],
},
```

### Current Structure
- All puppies are already set up as Yorkie Poos
- The data structure supports multiple images per puppy
- Video support is already implemented
- The browse page now supports `?breed_slug=yorkiepoo` URL parameter

### Format Matching PuppySpot
The page structure already matches PuppySpot's format:
- ✅ Breed filtering via URL parameter (`breed_slug`)
- ✅ Multiple images per puppy
- ✅ Video support
- ✅ Puppy detail pages with gallery
- ✅ Breeder information
- ✅ Same layout structure

Just replace the placeholder image/video URLs with the actual ones from PuppySpot!
