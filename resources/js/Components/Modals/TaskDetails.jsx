/**
 * [Sass]
*/
import '../../../css/tasks/task-details.scss';


export default function TaskDetails({ task }) {
    return (
        <div>
            <p className="task-details__description">{ task.description }</p>
        </div>
    );
}