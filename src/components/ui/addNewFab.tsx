import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
export interface AddNewFabProps {
  
}
 
const AddNewFab: React.SFC<AddNewFabProps> = () => {
  const dispatch = useDispatch()
  const handleAddEvent = () => {
    dispatch(uiOpenModal())
  }
  return ( 
    <button 
      className="btn btn-primary fab"
      onClick={handleAddEvent}>
      <i className="fas fa-plus"></i>
    </button>
   );
}
 
export default AddNewFab;