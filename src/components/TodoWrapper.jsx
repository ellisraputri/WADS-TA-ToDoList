import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from './Todo.jsx';
import { TodoForm } from './TodoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm.jsx';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { collection, addDoc, query, getDocs, where, doc, updateDoc, deleteDoc } from "firebase/firestore";


uuidv4();

export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([])
    const [showCompleted, setShowCompleted] = useState(false);
    const navigate = useNavigate();

    const addToDo = async(toDo) => {
        try {
            const newTodo = {
                task: toDo,
                completed: false,
                userId: user.uid,
            }
    
            const docRef = await addDoc(collection(db, "todos"), newTodo);
            setToDos([...toDos, {
                id: docRef.id,
                ...newTodo,
                isEditing: false
            }]);
            console.log(toDos);
        } catch (error) {
            console.error("Error adding To-Do:", error);
        }
        
    }

    const toggleComplete = async(id,completed) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, { completed: !completed });

            setToDos(toDos.map(todo => todo.id === id ? {...
                todo, completed: !todo.completed} : todo ))
        } catch (error) {
            console.error("Error toggle:", error);
        }
    }

    const deleteToDo = async(id) => {
        try {
            const todoRef = doc(db, "todos", id);
            await deleteDoc(todoRef);

            setToDos(toDos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error delete:", error);
        }
        
    }

    const editToDo = id => {
        setToDos(toDos.map((todo) => todo.id === id ? {...
            todo, isEditing: !todo.isEditing} : todo));
    }

    const editTask = async(newTask, id) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, {task:newTask});

            setToDos(toDos.map(todo => todo.id === id ? { ...
                todo, task: newTask, isEditing: false } : todo));
        } catch (error) {
            console.error("Error edit:", error);
        }
        
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

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const fetchToDos = async () => {
        try {
            const q = query(collection(db, "todos"), where("userId", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            const todosList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setToDos(todosList);

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        fetchToDos();
    }, [user, loading]);

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