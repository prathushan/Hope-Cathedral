// File: /src/routes/leadership/+page.server.ts

import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';

export const load = async () => {
  const query = groq`*[_type == "page" && slug.current == "leadership"][0]`;
  const leader = await serverClient.fetch(query);

  // ✅ Log the response
  console.log('Fetched leadership page data:', leader);

  if (!leader) {
    return {
      status: 404,
      error: new Error('leadership page not found')
    };
  }

  return {
    leader
  };
};

