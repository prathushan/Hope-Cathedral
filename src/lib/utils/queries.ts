
// /src/lib/utils/queries.ts
import groq from 'groq';

export const menuQuery = groq`*[_type == "menu"][0]`;
export const footerQuery = groq`*[_type == "footerSetting"] | order(_updatedAt desc)[0]{
  footerTitle,
  footerLogo,
  footerText,
  footerMenus[]{
    menuTitle,
    links[]{
      label,
      "slug": slug.current
    }
  },
  addressSection{
    addressTitle,
    address,
    email,
    phone
  },
  socialLinks[]{
    platform,
    url,
    iconName
  },
  copyrightText
}`;

export const liveServiceQuery = groq`*[_type == "liveService"][0] {
  title,
  startTime,
  streamUrl,
  note
}`;