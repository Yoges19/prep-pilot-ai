'use client';
import DashboardCard from '@/components/DashboardCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';

type Task = {
  user_id: string;
  id: number;
  title: string;
  completed: boolean;
};

export default function Tracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
   const fetchTasks = async () => {
          setLoading(true);
          const { data: userData } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from('tasks')        
            .select('*')
            .eq('user_id', userData.user?.id); // Fetch tasks only for the logged-in user
          if (error) {
            console.log('Error fetching tasks:', error);
            setLoading(false);
            return;
          } else {
            setTasks(data);
          }
          setLoading(false);
    };

   useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(){
    const { data: userData } = await supabase.auth.getUser(); // it returns the current logged in user
    if (newTask.trim() === '') return;
      const {data, error} = await supabase
        .from('tasks')
        .insert([
          { 
            user_id: userData.user?.id,
            title: newTask,
            completed: false,
          },
        ])
        .select();

        if(error){
          console.log(error);
          return;
        }

        if(data){
          setTasks([...tasks, ...data]);
          setNewTask('');
        }
  }

  async function toggleTaskCompletion(id: number) {
    //update the task in the database
    const taskToUpdate = tasks.find(task => task.id === id);
    if(!taskToUpdate) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !taskToUpdate.completed })
      .eq('id', id);

    if (error) {
      console.log('Error updating task:', error);
      return;
    }

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  async function deleteTask(id: number) {
    const {error, data} = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

      if(error){
        console.log('Error deleting task:', error);
        return;
      }

      if(!error){
        setTasks(tasks.filter(task => task.id !== id));
      }
    }


    if(loading){
      return <div className="flex-1 p-4">Loading...</div>;
    }
  return (
        <ProtectedRoute>
        <div className="flex-1 p-4">
        
          <DashboardCard title="Tracker" description="
            Welcome to the Tracker page! Here, you can monitor your interview preparation progress, track your performance in mock interviews, and receive insights on areas for improvement. Stay organized and motivated as you prepare for your next big opportunity with our comprehensive tracking tools."
          />
          <input 
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            className="bg-white text-black p-2 m-4 w-2xs rounded-2xl" />

          <button onClick={addTask} className="ml-4 bg-blue-500 mb-4 text-white px-2 py-1 rounded-2xl">Add Task</button>

          <ul className="bg-white text-black p-4 rounded-2xl">
            {tasks.map(task =>(
            <li key={task.id} 
                className={`p-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              <div className="flex justify-between items-center"> 
                  <span>{task.title}</span> 
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} className="ml-4 rounded-2xl" /> 
                  
                </div>
                <button onClick={() => deleteTask(task.id)} className="ml-4 bg-red-500 text-white px-2 py-1 rounded-2xl">Delete</button>
            </li>
            ))}
          </ul>
        </div>
        </ProtectedRoute>
  );
}