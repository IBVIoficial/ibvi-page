import {ChevronDown} from 'lucide-react';
// import {ButtonAuth} from '../elements/Buttons';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '../ui/dropdown-menu';
import Silk from '../react-bits/Silk';
// import {useAuth} from '@/auth/AuthProvider';

export default function ChatAuthSection() {
   // const {user} = useAuth();
   const user = null;

   return (
      <div className="w-full h-16 flex items-center py-3 px-3 justify-between z-[99999]">
         <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-1 cursor-pointer ml-14">
               <h1 className="text-white text-lg font-inter">IbviGPT</h1>
               <ChevronDown className="text-white" strokeWidth={1} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[rgb(48,48,48)] border border-[rgb(81,81,81)] rounded-4xl overflow-hidden w-[19rem] p-0 shadow-xl">
               {!user ? (
                  <div>
                     <Silk />
                     <div className="p-4 flex flex-col gap-2">
                        <p className="text-white font-semibold text-lg">Teste funcionalidades avançadas de graça</p>
                        <p className="text-sm text-muted-foreground">Receba respostas mais precisas, suba arquivos e mais fazendo login.</p>
                        {/* <ButtonAuth
                           className="rounded-4xl mt-4 bg-emerald-500/50 hover:bg-emerald-500/30 text-white"
                           text="Entrar ou registrar gratuitamente"
                           next="/gpt"
                        /> */}
                     </div>
                  </div>
               ) : (
                  <p className="text-white opacity-35 p-4">Em breve...</p>
               )}
            </DropdownMenuContent>
         </DropdownMenu>
         {/* <ButtonAuth className="rounded-4xl bg-emerald-500/50 hover:bg-emerald-500/30 text-white" text="Entrar ou registrar gratuitamente" next="/gpt" /> */}
      </div>
   );
}
