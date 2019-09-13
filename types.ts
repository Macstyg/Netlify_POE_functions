export enum PoeEventNames {
  COMPLETED = 'language.completed',
  PROOFREAD = 'language.proofread',
  TEST = 'test'
}

export enum LanguageNames {
  GERMAN = 'German',
  JAPANESE = 'Japanese',
  ENGLISH = 'English'
}

interface PoeEvent {
  name: PoeEventNames
}

interface PoeProject {
  id: string
  name: string
  public: number
  open: number
  created: string
}

interface PoeLanguge {
  name: LanguageNames
  code: 'de' | 'en' | 'ja'
}

interface PoeStats {
  strings: {
    translated: number
    fuzzy: number
    proofread: number
  }
}

export interface PoePayload {
  event: PoeEvent
  project: PoeProject
  language: PoeLanguge
  stats: PoeStats
}