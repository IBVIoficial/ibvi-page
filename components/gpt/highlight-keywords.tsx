import React, {useState, useEffect, memo} from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {specialPageKeywords, createKeywordsRegex} from '@/lib/special-keywords';
import {AnimatedGradientText} from '../magicui/animated-gradient-text';
import {TextAnimate} from '../magicui/text-animate';
import MbrasAI from '@/components/gpt/ai-icon';
import {PropertyPreviewHoverCard} from '../property/property-preview-hover-card';

interface HighlightKeywordsProps {
   text: string;
   onMinimizeAndNavigate: (href: string) => void;
}

interface SpecialPagePreview {
   title: string;
   imageUrl: string | null;
}

interface SpecialPreviewData {
   [slug: string]: SpecialPagePreview;
}

interface Match {
   type: 'keyword' | 'property';
   slug?: string;
   reference?: string;
   text: string;
   index: number;
}

const HighlightKeywords: React.FC<HighlightKeywordsProps> = memo(({text, onMinimizeAndNavigate}) => {
   const [specialPreviewData, setSpecialPreviewData] = useState<SpecialPreviewData | null>(null);
   const [, setIsLoadingSpecial] = useState<boolean>(true);
   const [, setSpecialError] = useState<string | null>(null);

   useEffect(() => {
      const fetchSpecialPreviewData = async () => {
         setIsLoadingSpecial(true);
         setSpecialError(null);
         try {
            const response = await fetch('/api/previews');
            if (!response.ok) {
               throw new Error(`Failed to fetch special page previews: ${response.statusText}`);
            }
            const data: SpecialPreviewData = await response.json();
            setSpecialPreviewData(data);
         } catch (err: any) {
            setSpecialError(err.message || 'Could not load special page preview data.');
            setSpecialPreviewData({});
         } finally {
            setIsLoadingSpecial(false);
         }
      };
      fetchSpecialPreviewData();
   }, []);

   if (!text) {
      return null;
   }

   const matches: Match[] = [];
   const mbRegex = /\bMB\d{4,5}\b/gi;

   if (specialPreviewData) {
      for (const [slug, keywords] of Object.entries(specialPageKeywords)) {
         const regex = createKeywordsRegex(keywords);
         let match;
         while ((match = regex.exec(text)) !== null) {
            matches.push({
               type: 'keyword',
               slug: slug,
               text: match[0],
               index: match.index,
            });
         }
      }
   }

   let mbMatch;
   while ((mbMatch = mbRegex.exec(text)) !== null) {
      matches.push({
         type: 'property',
         reference: mbMatch[0],
         text: mbMatch[0],
         index: mbMatch.index,
      });
   }

   matches.sort((a, b) => a.index - b.index);

   const uniqueMatches: Match[] = [];
   let lastIndex = -1;
   for (const match of matches) {
      if (match.index >= lastIndex) {
         uniqueMatches.push(match);
         lastIndex = match.index + match.text.length;
      }
   }

   let markdown = '';
   let currentIndex = 0;
   uniqueMatches.forEach((match) => {
      if (match.index > currentIndex) {
         markdown += text.substring(currentIndex, match.index);
      }
      const isKeyword = match.type === 'keyword';
      const href = isKeyword ? `/especial/${match.slug}` : `/${match.reference}`;

      const title = isKeyword ? `keyword:${match.slug}` : `property:${match.reference}`;
      markdown += `[${match.text}](${href} "${title}")`;
      currentIndex = match.index + match.text.length;
   });
   if (currentIndex < text.length) {
      markdown += text.substring(currentIndex);
   }

   function LinkRenderer(props: any) {
      const {href, children, title} = props;

      let matchType: 'keyword' | 'property' | null = null;
      let previewKey: string | undefined;

      if (title?.startsWith('keyword:')) {
         matchType = 'keyword';
         previewKey = title.replace('keyword:', '');
      } else if (title?.startsWith('property:')) {
         matchType = 'property';
         previewKey = title.replace('property:', '');
      }

      const isKeyword = matchType === 'keyword';
      const currentPreview = isKeyword ? specialPreviewData?.[previewKey!] : undefined;

      const linkContent = (
         <motion.span
            initial={{opacity: 0, y: 3}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: 'easeOut'}}
            className={
               isKeyword
                  ? 'text-emerald-600 dark:text-emerald-400 font-medium underline decoration-emerald-500/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer mx-px'
                  : 'text-blue-600 dark:text-blue-400 font-medium underline decoration-blue-500/60 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer mx-px'
            }
            onClick={(event) => {
               event.preventDefault();
               onMinimizeAndNavigate(href);
            }}
         >
            <AnimatedGradientText>{children}</AnimatedGradientText>
         </motion.span>
      );

      if (matchType === 'property' && previewKey) {
         return <PropertyPreviewHoverCard reference={previewKey}>{linkContent}</PropertyPreviewHoverCard>;
      }

      return (
         <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger>{linkContent}</HoverCardTrigger>
            {currentPreview && (
               <HoverCardContent className="w-96 backdrop-blur-md bg-popover/60 z-[999]" side="top" align="center">
                  <div className="flex flex-col space-y-3">
                     {currentPreview.imageUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-radius">
                           <Image
                              src={currentPreview.imageUrl}
                              alt={`Preview for ${currentPreview.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                           />
                        </div>
                     )}
                     <span className="flex flex-row gap-1.5 items-center">
                        <MbrasAI size={16} className="text-accent flex-shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{currentPreview.title || previewKey}</h4>
                     </span>
                  </div>
               </HoverCardContent>
            )}
         </HoverCard>
      );
   }

   return (
      <ReactMarkdown
         components={{
            a: LinkRenderer,
            p: (props: any) => {
               if (typeof props.children === 'string') {
                  return props.children;
                  return (
                     <TextAnimate animation="blurIn" once>
                        {props.children}
                     </TextAnimate>
                  );
               }

               return props.children;
            },
         }}
      >
         {markdown}
      </ReactMarkdown>
   );
});

HighlightKeywords.displayName = 'HighlightKeywords';

export {HighlightKeywords};
