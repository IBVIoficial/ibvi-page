export const specialPageKeywords: {[slug: string]: string[]} = {
   'angra-ilha-japao': ['ilha japão', 'angra dos reis', 'japão'],
   'apartamento-jardim-europa': ['jardim europa', 'jd europa', 'apartamento europa'],
   'casa-baroneza': ['baroneza', 'casa baroneza', 'quinta da baroneza'],
   'casa-boa-vista': ['boa vista', 'casa boa vista', 'fazenda boa vista'],
   'casa-boa-vista-madeira': ['boa vista madeira', 'casa madeira'],
   'casa-inglesa': ['casa inglesa', 'estilo inglês'],
   'casa-jardim-america-3000': ['jardim américa 3000', 'jd américa'],
   'cidade-jardim-cobertura-ju': ['cidade jardim cobertura', 'cobertura ju'],
   'cobertura-by-kogan': ['kogan', 'by kogan', 'arthur casas'],
   'cobertura-jd-europa-1200': ['cobertura jardim europa', 'cobertura jd europa 1200'],
   'cobertura-pierino': ['cobertura pierino'],
   'cobertura-pq-do-povo-1400': ['parque do povo', 'pq do povo', 'cobertura parque povo'],
   'cobertura-vila-nova-ac': ['vila nova conceição', 'vila nova ac', 'cobertura vnc'],
   'edificio-amauri': ['amauri', 'edifício amauri', 'rua amauri'],
   'edificio-arthur-ramos': ['arthur ramos', 'edifício arthur ramos'],
   'garden-jdeuropa': ['garden jardim europa', 'garden jd europa'],
   'ilha-angra-praia-algodao': ['ilha angra', 'praia do algodão', 'algodão'],
   'jd-europa-novo': ['jardim europa novo', 'jd europa novo'],
   'kogan-jardim-america': ['kogan jardim américa', 'kogan jd américa'],
   'kogan-jd-europa-380': ['kogan jardim europa 380', 'kogan jd europa'],
   'laje-faria-lima': ['laje faria lima', 'faria lima'],
   'laje-faria-lima-m': ['laje faria lima m'],
   'laje-parque-da-cidade': ['laje parque da cidade', 'parque da cidade'],
   'laje-shopping-cj': ['laje shopping cidade jardim', 'shopping cj'],
   'parque-cidade-jardim-530': ['parque cidade jardim 530', 'condomínio parque cidade jardim'],
   'parque-cj-cobertura': ['cobertura parque cidade jardim', 'cobertura cidade jardim'],
   pierino: ['pierino'],
   'plaza-iguatemi': ['plaza iguatemi', 'iguatemi'],
   'terreno-jardim-europa': ['terreno jardim europa', 'terreno jd europa'],
   'terreno-jardins': ['terreno jardins'],
   'vista-cyrela': ['vista cyrela', 'cyrela'],
};

export const createKeywordsRegex = (keywords: string[]): RegExp => {
   const escapedKeywords = keywords.map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

   const pattern = `\\b(${escapedKeywords.join('|')})\\b`;
   return new RegExp(pattern, 'gi');
};
