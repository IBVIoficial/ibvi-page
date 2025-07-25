import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function handleRemoteAction(router: AppRouterInstance, message: ChatMessage) {
   switch (message.name) {
      case 'get_property_by_reference':
         const ref = message.content?.hits?.[0]?.ref;
         const pathname = ref ? `/${ref}` : null;
         if (pathname) {
            // router.push(pathname);
         }
         break;
   }
}
