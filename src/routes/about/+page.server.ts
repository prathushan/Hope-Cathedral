// ONLY HERE we import the server-side client
import { serverClient } from '$lib/utils/sanity.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const aboutPage = await serverClient.fetch(
		`*[_type == "page" && slug.current == "about"][0]`
	);

	const banner = aboutPage?.content?.[0]?.block?.[0] ?? null;

	const ourStoryBlock = aboutPage?.content?.find(
		(block) => block.label?.trim().toLowerCase() === "our story"
	);

	const ourStoryCard = ourStoryBlock?.block?.[0]?.cards?.[0] ?? null;

	const nextStepBlockRaw = aboutPage?.content?.find(
		(block) => block.label?.trim().toLowerCase() === "take your next step."
	);

	const textBlock = nextStepBlockRaw?.block?.find((b) => b._type === 'textBlock') ?? null;
	const buttonBlock = nextStepBlockRaw?.block?.find((b) => b._type === 'buttonBlock') ?? null;
	const image = nextStepBlockRaw?.block?.find((b) => b.image)?.image ?? null;
    const ourBeliefsBlock = aboutPage?.content?.find(
    (block) => block.label?.trim().toLowerCase() === "our beliefs"
    );

    const coreValuesBlock = aboutPage?.content?.find(
    (block) => block.label?.trim().toLowerCase() === "our core values"
    );




	return {
  banner,
  ourStoryCard,
  ourBeliefsBlock, 
  coreValuesBlock, 
  
  nextStepBlock: {
    label: nextStepBlockRaw?.label ?? '',
    textBlock,
    buttonBlock,
    image
  }
};

};
