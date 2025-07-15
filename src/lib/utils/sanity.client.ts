// src/lib/utils/sanity.client.ts
import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: '2023-03-20',
  useCdn:false // enables CDN cache — fast, good for public reads
});
