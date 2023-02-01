export interface CalendarEventProps {
  event: any
}
 
const CalendarEvent: React.SFC<CalendarEventProps> = ({event}) => {
  const {title, user} = event
  return ( 
    <div>
      <strong>{title}</strong>
      <span>- {user.name}</span>
    </div>
   );
}
 
export default CalendarEvent;