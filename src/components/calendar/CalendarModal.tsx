import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventSetActive, eventUpdated } from '../../actions/events';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const now: moment.Moment = moment().minutes(0).seconds(0).add('hours')
const nowPlusOne: moment.Moment = now.clone().add(1, 'hours');

const emptyEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOne.toDate()
}

export interface CalendarModalProps {
  
}
 
const CalendarModal: React.SFC<CalendarModalProps> = () => {
  const dispatch = useDispatch()
  const {openModal} = useSelector((state: any) => state.ui)
  const {activeEvent} = useSelector((state:any) => state.calendar)
  const [titleValid, setTitleValid] = useState(true)
  const [formValue, setformValue] = useState(emptyEvent)

  const {notes, title, start, end} = formValue;

  useEffect(() => {
    if(activeEvent){
      setformValue(activeEvent)
    }else{
      setformValue(emptyEvent)
    }

  }, [activeEvent, setformValue])

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(eventSetActive(null))
    setformValue(emptyEvent)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end)

    if(momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'La fecha fin debe ser mayor que la fecha inicio')
      return;
    }

    if(title.trim().length < 2){
      return setTitleValid(false)
    }

    if(activeEvent) {
      dispatch(eventUpdated(formValue))
    }else{
          dispatch(eventAddNew({
            ...formValue,
            id: new Date().getTime(),
            user: {
              _id: '222',
              name: 'nacho'
            }
          }))
    }
    
    setTitleValid(true)
    closeModal();
  }

  const handleStartDateChange = ( e: any ) => {
    setformValue({
      ...formValue,
      start: e
    })
  }
  const handleEndDateChange = ( e: any ) => {
    setformValue({
      ...formValue,
      end: e
    })
  }
  const handleChangeTitle = ({target}: any) =>  {
    setformValue({
      ...formValue,
      [target.name]: target.value
    })
  }
  return ( 
    <div>
      <Modal
          isOpen={openModal}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          className="modal"
          closeTimeoutMS={200}
          overlayClassName="modal-fondo"
        >
        <h1> 
          {
            activeEvent ? (
              'Editar evento'
            ) : (
              'Crear evento'
            )
          }
           </h1>
        <hr />
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                  className="form-control"
                  onChange={handleStartDateChange}
                  value={start}
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                  className="form-control"
                  onChange={handleEndDateChange}
                  value={end}
                  minDate={start}
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleValid ? ' is-valid' : ' is-invalid'}` }
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    className="form-control"
                    placeholder="Notas"
                    rows={5}
                    name="notes"
                    value={notes}
                    onChange={handleChangeTitle}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
        </Modal>
    </div>
   );
}
 
export default CalendarModal;