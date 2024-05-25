export type ErrorResponseApi<Data> = {
  message: string
  data?: Data
}

export type SuccessResponseApi<Data> = {
  message: string
  data: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
