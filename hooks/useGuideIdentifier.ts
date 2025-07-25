'use client';

// import {useAuth} from '@/auth/AuthProvider';
import gptApi from '@/services/gpt-api.service';
import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';

export function useUserId(): {userId: string | undefined; setUserId: any} {
   // const {user} = useAuth();
   const user: any = null;

   const [userId, setUserId] = useState<string | undefined>(
      user?.id || (typeof localStorage !== 'undefined' && localStorage.getItem('mbras_user_id')) || undefined,
   );

   const renewUserIdentifier = useCallback(() => {
      const newId = uuidv4();
      localStorage.setItem('mbras_user_id', newId);
      setUserId(newId);
      return newId;
   }, []);

   const setup = useCallback(async () => {
      const localUser = {} as any;
      let existingId = localStorage.getItem('mbras_user_id');

      if (localUser && existingId && existingId !== localUser?.id) {
         try {
            await gptApi.post('/chat/change-id', {
               user_identifier: existingId,
            });
         } catch (error: any) {
            if (error.response && error.response.status === 409) {
               const newId = renewUserIdentifier();
               existingId = newId;
               await gptApi.post('/chat/change-id', {
                  user_identifier: newId,
               });
            }
         }
      }

      if (existingId) {
         setUserId(existingId);
         return;
      }

      renewUserIdentifier();
   }, [renewUserIdentifier]);

   const hasSetupRun = useRef(false);

   useEffect(() => {
      if (!hasSetupRun.current) {
         console.log('Running setup for user identifier');
         setup();
         hasSetupRun.current = true;
      }
   }, [setup, user]);

   return useMemo(() => ({userId, setUserId}), [userId, setUserId]);
}
