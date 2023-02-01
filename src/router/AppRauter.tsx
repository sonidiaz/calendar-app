import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export interface AppRouterProps {
  
}
 
const AppRouter: React.SFC<AppRouterProps> = () => {
  return ( 
    <Router>
          <div>
            <Switch>
              <Route exact path="/login" component={LoginScreen}></Route>
              <Route exact path="/" component={CalendarScreen}></Route>
            </Switch>
          </div>
        </Router>
   );
} 
 
export default AppRouter;