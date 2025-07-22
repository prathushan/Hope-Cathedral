// src/routes/messages/[slug]/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';

export const load = async ({ params }) => {
  const message = await serverClient.fetch(groq`
    *[_type == "message" && slug.current == $slug][0]{
      title,
      slug,
      description,
      author,
      date,
      videoType,
      videoEmbed,
      videoUrl,
      videoFile{ asset->{ url } },
      bannerImage{ asset->{ url } },
      category->{ _id, title },
      "related": *[_type == "message" && category._ref == ^.category._ref && slug.current != ^.slug.current][0...6]{
        title,
        slug,
        bannerImage{ asset->{ url } }
      }
    }
  `, { slug: params.slug });

  return {
    message
  };
};

