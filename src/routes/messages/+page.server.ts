// src/routes/messages/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';

export const load = async () => {
  const pageQuery = groq`
    *[_type == "page" && slug.current == "messages"][0]{
      content
    }
  `;

  const messagesQuery = groq`
    *[_type == "message"]{
      title,
      slug,
      date,
      bannerImage {
        asset->{ url }
      },
      category->{ _id, title }
    } | order(date desc)
  `;

  const [pageData, messages] = await Promise.all([
    serverClient.fetch(pageQuery),
    serverClient.fetch(messagesQuery)
  ]);

  const heroBlock = pageData?.content?.find(
    b => b._type === 'builderBlock' && b.block[0]?._type === 'heroSection'
  )?.block[0];

  const grouped = messages.reduce((acc, msg) => {
    const category = msg.category?.title || 'Uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(msg);
    return acc;
  }, {});

  return {
    heroBlock,
    messagesByCategory: grouped
  };
};
