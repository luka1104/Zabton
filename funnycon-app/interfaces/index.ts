export interface Theme {
  id?: number
  ownerAddress: string
  contents?: string
  imagePath?: string
  type: number
  Answer?: Answer[]
}

export interface Answer {
  id: number
  ownerAddress: string
  contents: string
  themeId: number
}
