import {getSession} from '@/lib/supabase/actions';
import axios from 'axios';

const gptApi = axios.create({
   baseURL: process.env.NEXT_PUBLIC_GUIDE_API_URL,
});

gptApi.interceptors.request.use(async (config) => {
   const session = await getSession();

   if (session?.user) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
   }
   return config;
});

export default gptApi;
