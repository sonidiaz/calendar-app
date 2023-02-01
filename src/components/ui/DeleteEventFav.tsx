import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';




export interface DeleteEventFabProps {
  
}
 
const DeleteEventFab: React.SFC<DeleteEventFabProps> = () => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(eventDeleted())
  }
  return ( 
      <button 
        onClick={handleDelete}
        className="btn btn-danger fab-danger">
        <i className="fas fas-trash"></i>
        <span>Borrar evento</span>
      </button>
    )
}
 
export default DeleteEventFab;