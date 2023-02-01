import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './router/AppRauter';
import './styles.css'

export interface CalendarAppProps {
  
}
 
const CalendarApp: React.SFC<CalendarAppProps> = () => {
  return ( 
    <Provider store={store}>
      <AppRouter/>
    </Provider>
   );
}
 
export default CalendarApp;