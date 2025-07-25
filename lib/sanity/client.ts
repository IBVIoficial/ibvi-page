import {createClient} from 'next-sanity';

const projectId = '82vh3fyz';
const dataset = 'production';
const apiVersion = '2023-05-03';

export const client = createClient({
   projectId,
   dataset,
   apiVersion,
   useCdn: false,
   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
   ignoreBrowserTokenWarning: true,
});
