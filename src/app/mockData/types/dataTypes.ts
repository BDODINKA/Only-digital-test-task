export type DataType = {
  category: CategoryType[]
}
export type CategoryType = {
  [key: string]: ViewItemType[]
}
export type ViewItemType = {
  date: number
  description: string
}
