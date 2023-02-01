import { useState } from 'react'
import Navbar from '../ui/NavBar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'

import { messages } from '../../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/addNewFab';
import DeleteEventFab from '../ui/DeleteEventFav';

const localizer = momentLocalizer(moment)
moment.locale('es')

export interface CalendarScreenProps {
  
}
 
const CalendarScreen: React.SFC<CalendarScreenProps> = ():JSX.Element => {
  const dispath = useDispatch()
  const {calendar: {events}} = useSelector( (state: any) => state);
  const {activeEvent} = useSelector( (state: any) => state.calendar);
  const [lastView, setLastView] = useState<any>(localStorage.getItem('lastView') || 'month');
  console.log(activeEvent);
  const onDoubleClick = () => {
    dispath(uiOpenModal())
  }
  const onSelectEvent = (e:any) => {
    dispath(eventSetActive(e))
  }
  const onViewChange = (view: any) => {
    setLastView(view)
    localStorage.setItem('lastView',  view)
  }
  const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }
  const onSelectedSlot = (e: any) => {
    dispath(eventSetActive(null))
  }

  return ( 
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectedSlot}
        selectable={true}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
      />

      {
        (activeEvent) && <DeleteEventFab/>
      }
      
      < AddNewFab/>
      <CalendarModal />
    </div>
   );
}
 
export default CalendarScreen;