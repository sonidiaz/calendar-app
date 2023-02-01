import moment from 'moment';
import { types } from '../types/types';

interface User {
  id: number,
  name: string
}
interface Event {
  id: any,
  title: string,
  start: any,
  end: any,
  user: User
}
interface State {
  events: any,
  activeEvent: Event | null
}


const initialState = {
 events: [
  {
    id: new Date().getTime(),
    title: 'Cunpleaños Oli',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    user: {
      _id: 1212,
      name: 'nacho'
    }
  }
 ],
 activeEvent: null
}

export const calendarReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          (e: any) => (e.id === action.payload.id) ? action.payload : e
        )
      }
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (e: any) => (e.id !== state.activeEvent?.id) 
        ),
        activeEvent: null
      }
    default:
      return state
  }
}