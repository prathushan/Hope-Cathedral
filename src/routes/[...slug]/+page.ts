// import type { PageLoad } from './$types';
// import { client } from '$lib/utils/sanity.client';
// import groq from 'groq';

// export const load: PageLoad = async ({ params }) => {
// 	let slug: string;

// 	if (!params.slug) {
// 		slug = 'home'; // Adjust based on your Sanity slug for homepage
// 	} else if (Array.isArray(params.slug)) {
// 		slug = params.slug.join('/');
// 	} else {
// 		slug = params.slug;
// 	}

// 	const query = groq`*[_type == "page" && slug.current == $slug][0]`;
// 	const page = await client.fetch(query, { slug });

// 	if (!page) {
// 		throw new Error(`No page found for slug: ${slug}`);
// 	}

// 	return { page };
// };
