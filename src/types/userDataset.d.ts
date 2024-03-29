export type UserDataset = {
  name: null | string
  gender: null | string
  height: null | number
  weight: null | number
  doctor: null | string
  createdAt: null | string
  health: [] | UserHealthData[]
}

export type UserHealthData = {
  mood: string
  temperature: number
  symptom: [] | string[]
  createdAt: string
}

export type TodaysHealthData = {
  mood: null | string
  temperature: null | number
  symptom: [] | string[]
  createdAt: null | string
}
