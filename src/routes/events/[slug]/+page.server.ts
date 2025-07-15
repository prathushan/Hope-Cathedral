// File: /src/routes/events/[slug]/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const query = groq`
    *[_type == "event" && slug.current == $slug][0]{
      title,
      startDate,
      endDate,
      location,
      description,
      featuredImage {
        asset->{
          url
        }
      }
    }
  `;

  const event = await serverClient.fetch(query, { slug });

  if (!event) {
    return {
      status: 404,
      error: new Error('Event not found')
    };
  }

  return { event };
};
