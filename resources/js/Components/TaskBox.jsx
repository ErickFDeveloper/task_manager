import { Popover } from 'antd';
import { useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/es';


/**
 * [Sass]
*/
import '../../css/tasks/task-box.scss';


/**
 * [Components]
*/
import MoreOptions from './Modals/MoreOptions';


export default function TaskBox({ task, manageTask, taskDetails }) {
    
    /** Configurar dayjs para fecha relativa y español */ 
    dayjs.locale('es');
    dayjs.extend(relativeTime);

    const [open, setOpen] = useState(false);

    const hide = () => setOpen(false);

    const handleOpenChange = (newOpen) => setOpen(newOpen);

    const setStatusName = ( status ) => {
        const statusNames = {
            'pending': 'Pendiente',
            'in_progress': 'En progreso',
            'completed': 'Completada'
        }

        return statusNames[ status ]
    }


    return (
        <div className="task-box">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="task-box__expand" onClick={ () => taskDetails(task) }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <Popover content={ <MoreOptions hide={hide} taskId={task.id} manageTask={ () => manageTask(task) } /> } open={open} onOpenChange={handleOpenChange} title="Mas opciones" trigger="click" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="task-box__more">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </Popover>
            

            <p className={`task-box__status ${ task.status }`}>{ setStatusName(task.status) }</p>

            <p className="task-box__title">{ task.title }</p>

            <p className="task-box__description">{ task.description }</p>
            
            <div className="task-box__footer">
                <p className="task-box__footer--created-by">La tarea finaliza { dayjs(task.expiration_date).fromNow() }</p>
            </div>
        </div>
    );
}