export function rawHandleToolMessage(apiMessages: any[], mapHitToPropertyData: any): ChatMessage[] {
   return apiMessages.map((message) => {
      if (message.type === 'tool') {
         try {
            const toolContent =
               typeof message.content === 'string' && (message.content.startsWith('{') || message.content.startsWith('['))
                  ? JSON.parse(message.content)
                  : message.content;

            if (
               (message.name === 'search_properties' || message.name === 'deep_search_properties' || message.name === 'get_property_by_reference') &&
               toolContent?.hits
            ) {
               return {
                  ...message,
                  properties: toolContent.hits.map(mapHitToPropertyData),
                  content: toolContent,
               };
            }

            return {
               ...message,
               content: toolContent,
            };
         } catch (e) {
            console.error('Failed to parse tool message content:', e, message);
            return {
               ...message,
               content: 'Error parsing tool data',
            };
         }
      }

      return message;
   });
}
