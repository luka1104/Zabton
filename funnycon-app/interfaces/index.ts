export interface Theme {
  id?: number
  userId: number
  contents?: string
  imagePath?: string
  type: number
  deadline: string
  Answer?: Answer[]
}

export interface Answer {
  id?: number
  userId: number
  contents: string
  themeId: number
}

export interface User {
  id?: number
  address: string
  nickname: string
  birthday: string
  level?: number
  lifeLeft?: number
  lifeLimit?: number
  Theme?: Theme[]
  Answer?: Answer[]
  Notification?: Notification[]
}

export interface Notification {
  id: number
  userId: number
  contents: string
  timestamp: number
}
