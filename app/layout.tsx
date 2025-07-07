import {ReactNode} from 'react';

// Metadata defined in app/[locale]/layout.tsx will be used.
// If you have truly global, non-locale-specific metadata, it can be here.
// export const metadata = {
//   title: 'Global App Title',
// };

export default function RootLayout({children}: {children: ReactNode}) {
   return children;
}
