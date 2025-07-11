// /src/routes/+layout.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import { menuQuery } from '$lib/utils/queries';
import { footerQuery } from '$lib/utils/queries';

export async function load() {
  const [footerSetting, menu] = await Promise.all([
    serverClient.fetch(footerQuery),
    serverClient.fetch(menuQuery),
  ]);



  return { footerSetting, menu };
}
