import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-09-26",
  token: process.env.SANITY_SECRET_TOKEN,
});

//sanity에서 image최적화된 상태로 받아오기
const builder = imageUrlBuilder(client);
export function urlFor(src: SanityImageSource) {
  return builder.image(src).width(800).url();
}
