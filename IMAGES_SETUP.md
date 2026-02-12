# Images Setup Guide

## Hero & Breed Images

- **Hero section (homepage):** Add your image as `public/images/hero.jpg` (or `hero.png` — if you use PNG, change the path in `src/app/page.tsx` from `/images/hero.jpg` to `/images/hero.png`). Use a wide image (e.g. 1920×1080) for best results.
- **Yorkie breed (Our Breed section):** Add your image as `public/images/breeds/yorkie.jpg` (or `yorkie.png` — if you use PNG, update the `image` field in `src/data/breeds.ts` to `/images/breeds/yorkie.png`).

---

## Adding 50+ Local Pictures (Recommended)

Your project is set up so you can add **local images** by dropping files into a folder. No URLs or external sites needed.

### 1. Where to put images

- **Puppy photos:** `public/images/puppies/`
- **Breed photos:** `public/images/breeds/`

### 2. Naming convention for puppy images

Name files by **puppy id** and **photo number**:

| Filename   | Used for        |
|-----------|------------------|
| `1-1.jpg` | Puppy 1 (Maggie), photo 1 |
| `1-2.jpg` | Puppy 1, photo 2 |
| `2-1.jpg` | Puppy 2 (Bella), photo 1 |
| `2-2.jpg` | Puppy 2, photo 2 |
| …         | …                |
| `8-6.jpg` | Puppy 8 (Sophie), photo 6 |

- **Puppy 1** = Maggie  
- **Puppy 2** = Bella  
- **Puppy 3** = Charlie  
- **Puppy 4** = Luna  
- **Puppy 5** = Rocky  
- **Puppy 6** = Daisy  
- **Puppy 7** = Milo  
- **Puppy 8** = Sophie  

You can use `.jpg`, `.jpeg`, or `.png`. The app expects 6 photos per puppy by default (48 total for 8 puppies). To use more (e.g. 50+), see step 4.

### 3. Add your files

1. Open the folder: `public/images/puppies/`
2. Add your image files with the names above (e.g. `1-1.jpg`, `1-2.jpg`, … `8-6.jpg`).
3. Run the app; the site will use these images automatically.

### 4. Using more than 6 photos per puppy (e.g. 50+ total)

To show more than 6 images per puppy:

1. Add your extra files with the same pattern (e.g. `1-7.jpg`, `1-8.jpg`, `2-7.jpg`, …).
2. Open `src/data/puppies.ts`.
3. Change the number in `puppyImagePaths("1", 6)` to how many photos that puppy has.  
   Example: for 7 photos for Maggie, use `puppyImagePaths("1", 7)`.

Example for ~50 images (e.g. 6 for most, 7 for two):

- In `puppies.ts`: use `puppyImagePaths("1", 7)`, `puppyImagePaths("2", 7)`, and `puppyImagePaths("3", 6)` … etc. so the total is 50.
- In `public/images/puppies/`: add `1-1.jpg` … `1-7.jpg`, `2-1.jpg` … `2-7.jpg`, `3-1.jpg` … `3-6.jpg`, etc.

### 5. Breed images (optional)

For breed pages, put one image per breed in `public/images/breeds/`, e.g.:

- `yorkie.jpg` for the Yorkie breed.

Then in `src/data/breeds.ts`, set:

```ts
image: "/images/breeds/yorkie.jpg",
```

---

## Replacing or mixing with URL images

You can still use **URLs** for some images:

- In `src/data/puppies.ts`, replace `puppyImagePaths("1", 6)` with an array of full URLs:

  ```ts
  images: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
  ],
  ```

- If the domain is not already in the config, add it in `next.config.ts` under `images.remotePatterns`.

---

## Quick reference

| Goal              | Action |
|-------------------|--------|
| Add ~50 local pics | Put files in `public/images/puppies/` named `1-1.jpg` … `8-6.jpg` (and optionally more, e.g. `1-7.jpg` …). Adjust the number in `puppyImagePaths("id", count)` in `src/data/puppies.ts` if you use more than 6 per puppy. |
| Replace a picture | Overwrite the file (e.g. `3-2.jpg`) or change the URL/path in `puppies.ts`. |
| Add more puppies | Add a new entry in `puppies.ts` and use `puppyImagePaths("9", 6)` (and add `9-1.jpg` … `9-6.jpg` in `public/images/puppies/`). |
