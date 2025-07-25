'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {createClient} from '@/lib/supabase/server';
import type {User} from '@supabase/supabase-js';

export async function getUser() {
   const supabase = await createClient();
   const {
      data: {user},
   } = await supabase.auth.getUser();
   return user;
}

export async function getSession() {
   const supabase = await createClient();
   const {
      data: {session},
   } = await supabase.auth.getSession();
   return session;
}

export async function login(formData: FormData): Promise<{success: boolean; error?: string; data?: User}> {
   const supabase = await createClient();

   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

   if (!email || !password) {
      console.error('[Server Action] login - Error: Email e senha são obrigatórios.');
      return {success: false, error: 'Email e senha são obrigatórios.'};
   }

   const {data: userData, error} = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      console.error('[Server Action] login - Supabase error:', error.message);
      return {success: false, error: error.message};
   }

   revalidatePath('/', 'layout');
   return {success: true, data: userData.user};
}

export async function signInWithGoogle(next?: string) {
   const supabase = await createClient();

   const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`,
      },
   });

   if (error) {
      console.error('[Server Action] signInWithGoogle - Supabase error:', error.message);
      return redirect('/error');
   }

   redirect(data.url);
}

export async function signInWithApple(next?: string) {
   const supabase = await createClient();

   const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
         redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`,
      },
   });

   if (error) {
      console.error('[Server Action] signInWithApple - Supabase error:', error.message);
      return redirect('/error');
   }

   redirect(data.url);
}

export async function signup(formData: FormData): Promise<{success: boolean; error?: string; data?: User}> {
   const supabase = await createClient();

   const email = formData.get('email') as string;
   const password = formData.get('password') as string;
   const fullName = formData.get('fullName') as string;

   if (!email || !password) {
      console.error('[Server Action] signup - Error: Email e senha são obrigatórios.');
      return {success: false, error: 'Email e senha são obrigatórios.'};
   }
   if (!fullName) {
      console.error('[Server Action] signup - Error: Nome completo é obrigatório.');
      return {success: false, error: 'Nome completo é obrigatório.'};
   }

   const {data: signUpData, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {},
      },
   });

   if (error) {
      return {success: false, error: error.message};
   }

   revalidatePath('/', 'layout');
   return {success: true, data: signUpData.user ?? undefined};
}

export async function signOutUser() {
   const supabase = await createClient();
   await supabase.auth.signOut();
   revalidatePath('/', 'layout');
   redirect('/');
}
