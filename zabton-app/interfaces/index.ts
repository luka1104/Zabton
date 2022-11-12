export interface Theme {
  id?: number
  userId: number
  contents?: string
  imagePath?: string
  type: number
  deadline: string
  Answer?: Answer[]
  Validation?: Validation[]
}

export interface Answer {
  id?: number
  userId: number
  contents: string
  themeId: number
  place?: number
  Validation?: Validation[]
}

export interface User {
  id?: number
  address: string
  nickname: string
  birthday: string
  level: number
  exp: number
  themeLeft: number
  themeLimit: number
  answerLeft: number
  answerLimit: number
  validateLeft: number
  validateLimit: number
  Theme?: Theme[]
  Answer?: Answer[]
  Validation?: Validation[]
  Notification?: Notification[]
}

export interface Validation {
  id?: number
  userId: number
  answerId: number
  themeId: number
}

export interface Notification {
  id: number
  userId: number
  contents: string
  timestamp: number
}
