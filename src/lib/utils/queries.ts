
// /src/lib/utils/queries.ts
import groq from 'groq';

export const menuQuery = groq`*[_type == "menu"][0]`;
export const footerQuery = groq`*[_type == "footerSetting"][0]`;