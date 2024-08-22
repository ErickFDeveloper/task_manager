import { Button, Modal } from 'antd';
import { DatePicker } from "antd";
import { Select } from "antd";
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import toastr from 'toastr';


/**
 * [Sass] 
*/ 
import '../../../css/tasks/manage-task.scss';


/**
 * [Components]
*/
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';


export default function ManageTask({ task, open, handleOk, handleCancel }) {

    const dateFormat = 'YYYY-MM-DD';

    const { data, setData, post, patch, errors, reset } = useForm({
        title:  '',
        description: '',
        expiration_date: '',
        status: ''
    });

    useEffect(() => {
        if ( task.id ) { 
            /** Editar tarea */ 
            setData(() => ({
                title: task.title,
                description: task.description,
                expiration_date: task.expiration_date,
                status: task.status
            }));

        } else { 
            /** Crear tarea */ 
            setData(() => ({
                title: '',
                description: '',
                expiration_date: '',
                status: 'pending'
            }));
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( task.id ) {
            updateTask();
        } else {
            createTask();
        }
    };

    const onSuccess = () => {
        /** Mostrar mensaje */ 
        toastr.success('Se guardo correctamente', 'Tarea')

        reset()
        handleOk()
    }

    const onError = () => {
        /** Mostrar mensaje */ 
        toastr.error('Ha ocurrido un error inesperado', 'Tarea')
    }
    
    const createTask = () => {
        post(route('tasks.store'), {
            onSuccess, onError
        });
    }

    const updateTask = () => {
        patch(route('tasks.update', task.id), {
            onSuccess, onError
        });
    }

    return (
        <Modal 
            title="Agregar tarea" 
            open={open} 
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Guardar cambios
                </Button>,
            ]}
        >
            <form id="manageTask">
                <div className="small-input--group">
                    <InputLabel htmlFor="title" value="Titulo" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        onChange={ (e) => setData('title', e.target.value) }
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="small-input--group">
                    <InputLabel htmlFor="description" value="Descripcion" />

                    <TextArea
                        id="description"
                        name="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="small-input--group">
                    <InputLabel htmlFor="expiration_date" value="Fecha de finalizacion" />

                    <DatePicker 
                        id="expiration_date"
                        format={dateFormat}
                        value={data.expiration_date ? dayjs(data.expiration_date) : null}
                        onChange={(value) => setData('expiration_date', dayjs(value).format(dateFormat))} 
                    />

                    <InputError message={errors.expiration_date} className="mt-2" />
                </div>

                <div className="small-input--group">
                    <InputLabel htmlFor="status" value="Estado" />

                    <Select
                        id="status"
                        onChange={(value) => setData('status', value)}
                        defaultValue="pending"
                        value={data.status}
                        style={{
                            width: '100%',
                        }}
                        options={[
                            {
                                value: 'pending',
                                label: 'Pendiente',
                            },
                            {
                                value: 'in_progress',
                                label: 'En progreso',
                            },
                            {
                                value: 'completed',
                                label: 'Completada',
                            },
                        ]}
                    />

                    <InputError message={errors.status} className="mt-2" />
                </div>
            </form>
        </Modal>
    );
}