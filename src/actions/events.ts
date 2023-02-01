import { types } from "../types/types"

export const eventAddNew = (event: any) => {
  return {
    type: types.eventAddNew,
    payload: event
  }
}
export const eventSetActive = (event: any) => {
  return {
    type: types.eventSetActive,
    payload: event
  }
}

export const eventUpdated = (event: any) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventDeleted = () => ({
  type: types.eventDeleted
})