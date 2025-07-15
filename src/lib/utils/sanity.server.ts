// /src/lib/utils/sanity.server.ts
import { createClient } from '@sanity/client';
import { SANITY_PROJECT_ID, SANITY_DATASET } from '$env/static/private';

export const serverClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2023-03-20',
  useCdn:false,
});
