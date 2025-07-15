// /src/routes/events/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import groq from 'groq';

export const load = async () => {
  // Fetch the page content (e.g., hero section) for the "events" page
  const pageQuery = groq`
    *[_type == "page" && slug.current == "events"][0]{
      content
    }
  `;

  const eventQuery = groq`
    *[_type == "event"] | order(startDate asc) {
      title,
      slug,
      startDate,
      endDate,
      location,
      featuredImage {
        asset->{
          url
        }
      }
    }
  `;

  const [pageData, allEvents] = await Promise.all([
    serverClient.fetch(pageQuery),
    serverClient.fetch(eventQuery)
  ]);

  const now = new Date();

  const upcomingEvents = allEvents.filter(event => {
    const endDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
    return endDate >= now;
  });

  const pastEvents = allEvents.filter(event => {
    const endDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
    return endDate < now;
  });

  // Extract hero section if it exists
  const heroBlock = pageData?.content?.find(
    b => b._type === 'builderBlock' && b.block[0]?._type === 'heroSection'
  )?.block[0];

  return {
    heroBlock,
    events: [...upcomingEvents, ...pastEvents]
  };
};
