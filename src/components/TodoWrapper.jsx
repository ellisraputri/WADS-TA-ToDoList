import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from './Todo.jsx';
import { TodoForm } from './TodoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm.jsx';

uuidv4();

export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([])
    const [showCompleted, setShowCompleted] = useState(false);
    const navigate = useNavigate();

    const addToDo = toDo => {
        setToDos([...toDos, {
            id: uuidv4(),
            task: toDo,
            completed: false,
            isEditing: false
        }]);

        console.log(toDos);
    }

    const toggleComplete = id => {
        setToDos(toDos.map(todo => todo.id === id ? {...
        todo, completed: !todo.completed} : todo ))
    }

    const deleteToDo = id => {
        setToDos(toDos.filter(todo => todo.id !== id))
    }

    const editToDo = id => {
        setToDos(toDos.map((todo) => todo.id === id ? {...
            todo, isEditing: !todo.isEditing} : todo));
    }

    const editTask = (newTask, id) => {
        setToDos(toDos.map(todo => todo.id === id ? { ...
            todo, task: newTask, isEditing: false } : todo));
    };
    

    const toggleCompletedFilter = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredTasks = showCompleted
        ? toDos.filter((todo) => todo.completed)
        : toDos;

    const handleToggle = (todoId) => {
        setToDos((prevToDos) =>
            prevToDos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const showProfile = () => {
        navigate('/profile')
    }

    return (
        <>
        <h1 className='text-3xl mt-10 text-center font-bold text-blue-950 m-3 underline'>To Do List</h1>
        <div className="TodoWrapper m-8 flex flex-col items-center gap-4 p-4">
            <button className='border-l-blue-900 border-b-blue-900 p-2 rounded-2xl text-blue-900 shadow-md bg-white font-bold hover:cursor-pointer hover:bg-blue-50 mb-2 ' onClick={toggleCompletedFilter}>
                {showCompleted ? 'Show All' : 'Show Completed'}
            </button>

            <TodoForm addToDo={addToDo} />
            {filteredTasks.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm
                        editToDo={editTask}
                        task={todo}
                    />
                ) : (
                    <Todo
                        task={todo}
                        toggleComplete={toggleComplete}
                        deleteToDo={deleteToDo}
                        editToDo={editToDo}
                        onToggle={handleToggle}
                    />
                )
            ))}
        </div>
        </>
    )
}