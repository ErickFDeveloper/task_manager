import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Modal } from 'antd';


/** 
 * [Sass]  
*/ 
import '../../css/tasks/task-list.scss';


/** 
 * [Components]  
*/
import TaskBox from '@/Components/TaskBox';
import ManageTask from '@/Components/Modals/ManageTask';
import TaskDetails from '@/Components/Modals/TaskDetails';


export default function Tasks({ auth, tasks }) {
    
    const [ task, setTask ] = useState({});
    const [ open, setOpen ] = useState(false);


    const handleOk = () => setOpen(false);
    const handleCancel = () => setOpen(false);

    const manageTask = ( task = {} ) => {
        setTask(task);
        setOpen(true);
    }

    /** Abrir detalles de cada tarea */ 
    const taskDetails = ( task ) => {
        Modal.info({
            title: task.title,
            icon: null,
            closable: true,
            content: <TaskDetails task={task} />,
            maskClosable: true,
            footer: null,
        });
    };

    return (
        <AuthenticatedLayout
            user={ auth.user }
        >
            <Head title="Lista de tareas" />

            <div className="title-container max-w-7xl lg:px-8">
                <p className="title-container__text">Lista de tareas</p>

                <button className="title-container__button" onClick={ manageTask }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <span>Agregar tarea</span>
                </button>
            </div>

            { 
                tasks.length === 0 && (
                    <div className="empty-container text-center">
                        <p>No hay tareas agregadas aún</p>
                    </div>
                )
            }

            <div className="task-container max-w-7xl lg:px-8">
                {
                    tasks.map( (task, index) => (
                        <TaskBox key={ index } task={ task } manageTask={ manageTask } taskDetails={ taskDetails } />
                    ))
                }
            </div>


            { /* [Modal para crear y editar una tarea] */ }
            <ManageTask open={ open } task={ task } handleOk={ handleOk } handleCancel={ handleCancel } />

        </AuthenticatedLayout>
    );
}
