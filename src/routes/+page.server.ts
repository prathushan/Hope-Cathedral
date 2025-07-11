// File: /src/routes/+page.server.ts

import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';

export const load = async () => {
  const query = groq`*[_type == "page" && slug.current == "/"][0]`;
  const page = await serverClient.fetch(query);

  if (!page) {
    return {
      status: 404,
      error: new Error('Home page not found')
    };
  }

  return {
    page
  };
};