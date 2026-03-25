import type { BuildGame } from "../types/build";

export type GameFieldDefinition = {
  key: string;
  label: string;
  placeholder: string;
  storage: "equipments" | "skills";
  options: string[];
};

export type BuildArchetype = {
  name: string;
  role: string;
  summary: string;
  items: string[];
  skills: string[];
};

export type GameTheme = {
  slug: string;
  name: BuildGame;
  title: string;
  subtitle: string;
  description: string;
  accentLabel: string;
  classes: {
    page: string;
    hero: string;
    portal: string;
  };
  ctaCharacterHint: string;
  ctaEquipmentHint: string;
  ctaSkillsHint: string;
  buildCategories: string[];
  characterOptions: string[];
  archetypes: BuildArchetype[];
  fields: GameFieldDefinition[];
  placeholders: {
    title: string;
    strategy: string;
  };
};

const BLOODBORNE_TRICK_WEAPONS = [
  "Cutelo Serrilhado",
  "Lamina Serrilhada",
  "Machado do Cacador",
  "Bengala Chicote",
  "Martelo Cravado",
  "Lanca-Rifle",
  "Reiterpallasch",
  "Roda de Logarius",
  "Tonitrus",
  "Rifle Spear",
  "Chikage",
  "Espada Sagrada de Ludwig",
  "Lamina Funeraria",
  "Rakuyo",
  "Serra Rodopiante",
  "Garra de Fera",
  "Parasita de Kos",
  "Bracadeira de Amygdala",
  "Arco de Simon",
  "Saif do Cacador de Feras",
  "Cutelo da Igreja",
  "Picareta da Igreja",
];

const BLOODBORNE_FIREARMS = [
  "Pistola do Cacador",
  "Blunderbuss do Cacador",
  "Evelyn",
  "Pistola Repetidora",
  "Canhao",
  "Canhao da Igreja",
  "Lanca-chamas",
  "Rosmarinus",
  "Piercing Rifle",
  "Gatling Gun",
];

const BLOODBORNE_ATTIRE = [
  "Set do Cacador",
  "Set do Cacador de Yharnam",
  "Set Pena de Corvo",
  "Set do Coro",
  "Set de Cainhurst",
  "Set do Executor",
  "Set da Boneca",
  "Set da Senhora Maria",
  "Set de Gehrman",
  "Set de Brador",
  "Set do Carrasco",
  "Set de Ashen Hunter",
  "Set do Velho Cacador",
  "Set do Estudante",
  "Set da Igreja Branca",
  "Set do Conestavel",
];

const BLOODBORNE_RUNES = [
  "Metamorfose Anti-Horaria",
  "Metamorfose Horaria",
  "Heir",
  "Moon",
  "Clawmark",
  "Lake",
  "Great Lake",
  "Formless Oedon",
  "Oedon Writhe",
  "Blood Rapture",
  "Communion",
  "Guidance",
  "Hunter",
  "Beast",
  "Milkweed",
];

const BLOODBORNE_GEMS = [
  "Gema de Sangue Temperada",
  "Gema de Sangue Afiada",
  "Gema de Sangue Pesada",
  "Gema de Sangue Nutridora",
  "Gema de Sangue de Fogo",
  "Gema de Sangue de Raio",
  "Gema de Sangue Arcana",
  "Gema de Sangue Pulsante",
  "Gema de Sangue de Tolo",
  "Gema de Sangue de Bruto",
  "Gema de Sangue Maldita",
  "Gema de Sangue Envenenada",
  "Gema de Sangue de Besta",
  "Gema de Sangue de Adepto",
  "Gema de Sangue de Poorman",
  "Gema de Sangue Gota",
];

const BLOODBORNE_TOOLS = [
  "Augurio de Ebrietas",
  "Chamado Alem",
  "Luva do Executor",
  "Pequeno Tonitrus",
  "Casca Fantasma Vazia",
  "Rugido da Fera",
  "Brew Amaldicoado",
  "Sino de Coro Pequeno",
  "Caixa de Musica Pequena",
];

const BLOODBORNE_COMBAT_STYLES = [
  "Parry com pistola",
  "Ataque visceral",
  "Quickstep agressivo",
  "Dano de rally",
  "Combo transformado",
  "Stagger pesado",
  "Dano de sangue",
  "Dano arcano",
  "Pressao bestial",
  "Controle de grupo",
];

const ELDEN_RING_MAIN_WEAPONS = [
  "Moonveil",
  "Lamina Blasfema",
  "Esmaga-Gigantes",
  "Rios de Sangue",
  "Uchigatana",
  "Nagakiba",
  "Dark Moon Greatsword",
  "Greatsword",
  "Claymore",
  "Espada Grande das Ruinas",
  "Espada Reliquia Sagrada",
  "Espada da Ordem Dourada",
  "Godslayer's Greatsword",
  "Maliketh's Black Blade",
  "Magma Wyrm's Scalesword",
  "Starscourge Greatsword",
  "Sword of Night and Flame",
  "Eleonora's Poleblade",
  "Bloody Helice",
  "Reduvia",
  "Morgott's Cursed Sword",
  "Hand of Malenia",
  "Vyke's War Spear",
  "Mohgwyn's Sacred Spear",
  "Dragon King's Cragblade",
  "Bolt of Gransax",
  "Guardian's Swordspear",
  "Marais Executioner's Sword",
  "Wing of Astel",
  "Death's Poker",
  "Bloodhound's Fang",
  "Great Stars",
  "Misericorde",
  "Cross-Naginata",
  "Naginata",
  "Zweihander",
  "Starscourge Greatsword",
  "Sacred Spear of Mohg",
  "Marika's Hammer",
  "Ordovis's Greatsword",
  "Magma Blade",
  "Twinblade",
  "Godskin Peeler",
  "Dragon Halberd",
  "Antspur Rapier",
];

const ELDEN_RING_SECONDARY = [
  "Escudo Grande Dourado",
  "Escudo da Tartaruga Verde",
  "Escudo da Medusa",
  "Escudo de Latrao de Arvore",
  "Escudo Cariano",
  "Uchigatana",
  "Nagakiba",
  "Reduvia",
  "Selo da Erdtree",
  "Selo do Gigante",
  "Selo da Comunhao Draconica",
  "Gravel Stone Seal",
  "Godslayer's Seal",
  "Cetro Regio Cariano",
  "Cajado de Lusat",
  "Cajado de Azur",
  "Meteorite Staff",
  "Prince of Death's Staff",
  "Fingerprint Stone Shield",
  "Jellyfish Shield",
  "Brass Shield",
  "Buckler",
  "Dragon Communion Seal",
  "Frenzied Flame Seal",
  "Clawmark Seal",
];

const ELDEN_RING_ARMOR = [
  "Set de Azur",
  "Set de Lusat",
  "Set do Cavaleiro Cariano",
  "Set Bode-Touro",
  "Set do Sentinela da Arvore",
  "Set de Radahn",
  "Set da Bruxa de Neve",
  "Set de Ranni",
  "Set do Cavaleiro Banido",
  "Set da Mascara Branca",
  "Set do Deus da Pele",
  "Set do Cavaleiro da Crucible",
  "Set do Cavaleiro do Croisol de Machado",
  "Set do Cavaleiro Limpo",
  "Set de Blaidd",
  "Set de Malenia",
  "Set de Lionel",
  "Set do Feiticeiro de Batalha",
  "Set do Confessor",
  "Set do Samurai",
  "Set do Cavaleiro Solitario",
  "Set da Rainha da Lua Cheia",
  "Set do Nobre Sangrento",
  "Set da Escama de Draco",
  "Set do Cavaleiro Real",
  "Set de Hoslow",
  "Set de Rogier",
  "Set de Alberich",
];

const ELDEN_RING_TALISMANS = [
  "Favor da Erdtree",
  "Favor da Erdtree +2",
  "Talisma de Massa de Pedra",
  "Exultacao do Senhor do Sangue",
  "Insignia de Espada Alada Podre",
  "Insignia de Espada Alada",
  "Grande Jarro Arsenal",
  "Talisma do Machado",
  "Talisma da Tartaruga Verde",
  "Amuleto Escorpiao de Fogo",
  "Amuleto Escorpiao Magico",
  "Amuleto Escorpiao Sagrado",
  "Amuleto Escorpiao de Raio",
  "Tela do Rebanho",
  "Icone de Godfrey",
  "Shard of Alexander",
  "Ritual Sword Talisman",
  "Dragoncrest Greatshield Talisman",
  "Pearldrake Talisman +2",
  "Carian Filigreed Crest",
  "Radagon Icon",
  "Moon of Nokstella",
  "Old Lord's Talisman",
  "Millicent's Prosthesis",
  "Axe Talisman",
  "Claw Talisman",
  "Ritual Shield Talisman",
  "Bull-Goat's Talisman",
  "Magic Scorpion Charm",
  "Faithful's Canvas Talisman",
  "Flock's Canvas Talisman",
];

const ELDEN_RING_ASHES = [
  "Seppuku",
  "Garra do Leao",
  "Passo do Sabueso",
  "Carian Retaliation",
  "Golpe Flamejante",
  "Espada da Tempestade",
  "Caca ao Gigante",
  "Quickstep",
  "Hoarfrost Stomp",
  "Chama da Redmane",
  "Tornado de Chama Negra",
  "Square Off",
  "Bloody Slash",
  "Unsheathe",
  "Royal Knight's Resolve",
  "Flaming Strike",
  "Glintblade Phalanx",
  "Loretta's Slash",
  "Determination",
  "Golden Vow",
  "Sacred Blade",
  "Black Flame Tornado",
  "Bloody Tax",
  "Phantom Slash",
  "Piercing Fang",
  "Prelate's Charge",
];

const ELDEN_RING_SPELLS = [
  "Cometa Azur",
  "Grande Arco de Loretta",
  "Cortador Cariano",
  "Lamina de Lua de Adula",
  "Pedra Brilhante Rapida",
  "Pedra Brilhante Estelar",
  "Chuva de Estrelas da Ruina",
  "Funding Rain of Stars",
  "Terra Magica",
  "Voto Dourado",
  "Chama, Conceda-me Forca",
  "Chama Negra",
  "Lanca Relampago Antiga",
  "Disco de Luz",
  "Lamina Flamejante de Sangue",
  "Bestial Sling",
  "Lanca Relampago",
  "Frenzied Burst",
  "Black Flame Ritual",
  "Ekzykes's Decay",
  "Ranni's Dark Moon",
  "Stars of Ruin",
  "Founding Rain of Stars",
  "Rock Sling",
  "Shard Spiral",
  "Ancient Death Rancor",
  "Swarm of Flies",
  "Lightning Spear",
  "Giantsflame Take Thee",
  "Black Blade",
  "Blessing of the Erdtree",
];

export const GAME_THEMES: Record<Lowercase<string>, GameTheme> = {
  bloodborne: {
    slug: "bloodborne",
    name: "Bloodborne",
    title: "Hunter Archive",
    subtitle: "Um registro gotico de cacadas, trick weapons e rituais de sangue.",
    description:
      "Uma pagina densa, vitoriana e decadente para builds focadas em agressividade, parry e mobilidade brutal por Yharnam.",
    accentLabel: "The Old Blood",
    classes: {
      page: "theme-bloodborne",
      hero: "hero-bloodborne",
      portal: "portal-bloodborne",
    },
    ctaCharacterHint: "Hunter, Lady Maria, Gehrman",
    ctaEquipmentHint: "Cutelo Serrilhado, Evelyn, Lamina Funeraria, Set do Cacador",
    ctaSkillsHint: "Ataque visceral, parry com arma de fogo, rally, quickstep",
    buildCategories: ["Pericia", "Forca", "Tintura de Sangue", "Arcano", "Qualidade", "Besta"],
    characterOptions: [
      "Cacador de Pericia",
      "Cacador de Forca",
      "Pistoleiro de Sangue",
      "Erudito Arcano",
      "Duelista de Chicote",
      "Executor",
      "Cacador de Besta",
      "Cavaleiro de Cainhurst",
      "Veterano de Yharnam",
      "Velho Cacador",
    ],
    archetypes: [
      {
        name: "Duelista de pericia",
        role: "Mobilidade e visceral",
        summary: "Build agil para punir janelas curtas, abusar de parry e manter pressao constante.",
        items: ["Rakuyo", "Bengala Chicote", "Evelyn", "Set Pena de Corvo"],
        skills: ["Parry com pistola", "Ataque visceral", "Quickstep lateral"],
      },
      {
        name: "Cacador de forca",
        role: "Impacto bruto",
        summary: "Focada em stagger e dano pesado com armas transformadas violentas.",
        items: ["Espada Sagrada de Ludwig", "Serra Rodopiante", "Machado do Cacador", "Set do Executor"],
        skills: ["Ataque carregado", "Combo transformado", "Punicao de stagger"],
      },
      {
        name: "Pistoleiro de sangue",
        role: "Tiro e explosao",
        summary: "Mistura trick weapon e armas de fogo para dano explosivo em pouca distancia.",
        items: ["Chikage", "Evelyn", "Pistola Repetidora", "Set de Cainhurst"],
        skills: ["Dano de sangue", "Parry rapido", "Espacamento agressivo"],
      },
      {
        name: "Erudito arcano",
        role: "Ferramentas e elemental",
        summary: "Controla lutas com hunter tools e dano elemental em combates longos.",
        items: ["Espada da Luz Lunar Sagrada", "Tonitrus", "Augurio de Ebrietas", "Set do Coro"],
        skills: ["Ferramentas arcanas", "Dano elemental", "Controle de grupo"],
      },
      {
        name: "Cacador de qualidade",
        role: "Equilibrio tecnico",
        summary: "Mistura forca e pericia para builds versateis com varias armas iconicas.",
        items: ["Cutelo Serrilhado", "Lamina Funeraria", "Pistola do Cacador", "Set do Cacador Yharnam"],
        skills: ["Pressao agressiva", "Rally constante", "Troca de postura"],
      },
      {
        name: "Fera desenfreada",
        role: "Agressao total",
        summary: "Abusa de Beast Claw e pressao corpo a corpo para explodir alvos.",
        items: ["Garra de Fera", "Canhao", "Set de Brador", "Runa Besta"],
        skills: ["Combo rapido", "Dano de proximidade", "Pressao sem recuo"],
      },
    ],
    fields: [
      {
        key: "trick_weapon",
        label: "Arma transformavel",
        placeholder: "Escolha a arma principal",
        storage: "equipments",
        options: BLOODBORNE_TRICK_WEAPONS,
      },
      {
        key: "firearm",
        label: "Arma de fogo",
        placeholder: "Escolha a arma de apoio",
        storage: "equipments",
        options: BLOODBORNE_FIREARMS,
      },
      {
        key: "armor",
        label: "Vestimenta",
        placeholder: "Escolha o set principal",
        storage: "equipments",
        options: BLOODBORNE_ATTIRE,
      },
      {
        key: "runes",
        label: "Runa Caryll principal",
        placeholder: "Escolha a runa principal",
        storage: "equipments",
        options: BLOODBORNE_RUNES,
      },
      {
        key: "blood_gem_1",
        label: "Gema de sangue 1",
        placeholder: "Escolha a primeira gema",
        storage: "equipments",
        options: BLOODBORNE_GEMS,
      },
      {
        key: "blood_gem_2",
        label: "Gema de sangue 2",
        placeholder: "Escolha a segunda gema",
        storage: "equipments",
        options: BLOODBORNE_GEMS,
      },
      {
        key: "blood_gem_3",
        label: "Gema de sangue 3",
        placeholder: "Escolha a terceira gema",
        storage: "equipments",
        options: BLOODBORNE_GEMS,
      },
      {
        key: "hunter_tools",
        label: "Ferramenta de cacador",
        placeholder: "Escolha a ferramenta principal",
        storage: "skills",
        options: BLOODBORNE_TOOLS,
      },
      {
        key: "combat_style",
        label: "Estilo de combate",
        placeholder: "Escolha a ideia central da build",
        storage: "skills",
        options: BLOODBORNE_COMBAT_STYLES,
      },
    ],
    placeholders: {
      title: "Rakuyo visceral de Yharnam",
      strategy: "Explique como a build entra no combate, pune inimigos e sustenta pressao com rally.",
    },
  },
  "elden-ring": {
    slug: "elden-ring",
    name: "Elden Ring",
    title: "Lands Between Codex",
    subtitle: "Um grimorio medieval de armas lendarias, fe e magia nas Terras Intermedias.",
    description:
      "Uma pagina mais majestosa e medieval, inspirada em castelos, ouro antigo e caminhos de build para cada escola de poder do jogo.",
    accentLabel: "Grace and Ruin",
    classes: {
      page: "theme-elden-ring",
      hero: "hero-elden-ring",
      portal: "portal-elden-ring",
    },
    ctaCharacterHint: "Maculado, cavaleiro da Erdtree, mago cariano",
    ctaEquipmentHint: "Moonveil, Lamina Blasfema, Esmaga-Gigantes, Espada Reliquia Sagrada",
    ctaSkillsHint: "Feiticarias, encantamentos, Cinzas da Guerra, quebra de postura",
    buildCategories: ["Magia", "Forca", "Fe", "Destreza", "Sangramento", "Qualidade", "Colossal"],
    characterOptions: [
      "Mago Cariano",
      "Cavaleiro de Forca",
      "Cruzado da Fe",
      "Samurai de Sangramento",
      "Paladino da Erdtree",
      "Duelista de Destreza",
      "Guerreiro Colossal",
      "Cavaleiro de Gelo",
      "Profeta de Chama Negra",
      "Maculado da Ordem Dourada",
      "Dragoeiro",
    ],
    archetypes: [
      {
        name: "Erudito da magia",
        role: "Feiticaria e alcance",
        summary: "Controle de distancia com burst magico e pressao segura em chefes.",
        items: ["Moonveil", "Cetro Regio Cariano", "Set de Azur", "Talisma de Massa de Pedra"],
        skills: ["Cometa Azur", "Grande Arco de Loretta", "Cortador Cariano"],
      },
      {
        name: "Colosso de forca",
        role: "Quebra de postura",
        summary: "Domina trocas com armas colossais, guard counter e dano pesado.",
        items: ["Esmaga-Gigantes", "Espada Grande das Ruinas", "Set Bode-Touro", "Favor da Erdtree"],
        skills: ["Garra do Leao", "Ataque pulando", "Guard counter"],
      },
      {
        name: "Cruzado da fe",
        role: "Fogo sagrado e sustain",
        summary: "Combina espada pesada com milagres ofensivos e cura situacional.",
        items: ["Lamina Blasfema", "Selo da Erdtree", "Set do Sentinela da Arvore", "Amuleto Escorpiao de Fogo"],
        skills: ["Voto Dourado", "Chama, Conceda-me Forca", "Chama Negra"],
      },
      {
        name: "Executor de sangramento",
        role: "Status e pressao",
        summary: "Escala sangramento rapido com armas velozes e cinzas agressivas.",
        items: ["Rios de Sangue", "Uchigatana", "Mascara Branca", "Exultacao do Senhor do Sangue"],
        skills: ["Empilhador de Cadaveres", "Seppuku", "Lamina Flamejante de Sangue"],
      },
      {
        name: "Cavaleiro de gelo",
        role: "Controle e postura",
        summary: "Mistura dano de frio, postura e boa cobertura em media distancia.",
        items: ["Dark Moon Greatsword", "Lamina de Lua de Adula", "Set da Bruxa de Neve", "Talisma do Machado"],
        skills: ["Neblina Gelida", "Lamina de Lua de Adula", "Escudo Cariano"],
      },
      {
        name: "Paladino dourado",
        role: "Defesa e suporte",
        summary: "Build medieval de cavaleiro sagrado com muita presenca de campo.",
        items: ["Espada da Ordem Dourada", "Escudo de Latrao de Arvore", "Set do Sentinela da Arvore", "Favor da Erdtree +2"],
        skills: ["Voto Dourado", "Cura do Senhor", "Barreira Divina"],
      },
    ],
    fields: [
      {
        key: "main_weapon",
        label: "Arma principal",
        placeholder: "Escolha a arma principal",
        storage: "equipments",
        options: ELDEN_RING_MAIN_WEAPONS,
      },
      {
        key: "secondary_weapon",
        label: "Arma secundaria ou escudo",
        placeholder: "Escolha o item de apoio",
        storage: "equipments",
        options: ELDEN_RING_SECONDARY,
      },
      {
        key: "armor",
        label: "Armadura ou set",
        placeholder: "Escolha o set principal",
        storage: "equipments",
        options: ELDEN_RING_ARMOR,
      },
      {
        key: "talisman_1",
        label: "Talisma 1",
        placeholder: "Escolha o primeiro talisma",
        storage: "equipments",
        options: ELDEN_RING_TALISMANS,
      },
      {
        key: "talisman_2",
        label: "Talisma 2",
        placeholder: "Escolha o segundo talisma",
        storage: "equipments",
        options: ELDEN_RING_TALISMANS,
      },
      {
        key: "talisman_3",
        label: "Talisma 3",
        placeholder: "Escolha o terceiro talisma",
        storage: "equipments",
        options: ELDEN_RING_TALISMANS,
      },
      {
        key: "talisman_4",
        label: "Talisma 4",
        placeholder: "Escolha o quarto talisma",
        storage: "equipments",
        options: ELDEN_RING_TALISMANS,
      },
      {
        key: "ashes",
        label: "Cinza da Guerra",
        placeholder: "Escolha a cinza central",
        storage: "skills",
        options: ELDEN_RING_ASHES,
      },
      {
        key: "spells",
        label: "Feiticaria ou encantamento",
        placeholder: "Escolha a magia principal",
        storage: "skills",
        options: ELDEN_RING_SPELLS,
      },
    ],
    placeholders: {
      title: "Moonveil de Liurnia",
      strategy: "Explique os atributos principais, o loop de combate e quando alternar entre arma, cinza e magia.",
    },
  },
};

export const SUPPORTED_GAMES: BuildGame[] = ["Bloodborne", "Elden Ring"];

export type BuildStoredField = {
  label: string;
  value: string;
};

export function getThemeBySlug(slug: string) {
  return GAME_THEMES[slug as keyof typeof GAME_THEMES] ?? null;
}

export function getThemeByGame(game: BuildGame | string) {
  if (game === "Bloodborne") {
    return GAME_THEMES.bloodborne;
  }

  if (game === "Elden Ring") {
    return GAME_THEMES["elden-ring"];
  }

  return null;
}

export function encodeStoredField(label: string, value: string) {
  return `${label}::${value}`;
}

export function decodeStoredField(entry: string): BuildStoredField {
  const [label, ...rest] = entry.split("::");

  if (!rest.length) {
    return { label: "Item", value: entry };
  }

  return { label, value: rest.join("::") };
}
