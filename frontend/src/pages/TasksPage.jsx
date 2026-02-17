import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle, XCircle, Clock, Calendar, Tag, X } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import AddTaskModal from '../components/AddTaskModal';
import MissedReasonModal from '../components/MissedReasonModal';
import SuccessConfetti from '../components/SuccessConfetti';
import LoaderPage from '../components/Loader';

const Tasks = ()=> {
  const { tasks, isLoading, fetchTasks, updateTaskStatus } = useTaskStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMissedModal, setShowMissedModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState(null);

   useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCompleteTask = async (taskId) => {
    const result = await updateTaskStatus(taskId, 'done');
    if (result.success) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleMissedTask = (task) => {
    setSelectedTask(task);
    setShowMissedModal(true);
  };
  
  const handleMissedReasonSubmit = async (reason) => {
    if(selectedTask) {
      const result = await updateTaskStatus(selectedTask._id, 'missed', reason);
      if (result.success) {
        setShowMissedModal(false);
        setSelectedTask(null);
      }
    }
  };

  const handleTaskAdded = () => {
    setShowAddModal(false);
  };

  const groupedTasks = {
    planned: tasks.filter(t => t.status === 'planned'),
    done: tasks.filter(t => t.status === 'done'),
    missed: tasks.filter(t => t.status === 'missed'),
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      {showConfetti && <SuccessConfetti />}

      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Task Planner</h1>
            <p className="text-gray-400">Manage your daily tasks efficiently</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </motion.button>
        </motion.div>

        {isLoading ? <LoaderPage/> : (
          <div className="space-y-8">
            <TaskSection
              title="Planned Tasks"
              tasks={groupedTasks.planned}
              icon={Clock}
              iconColor="text-blue-500"
              onComplete={handleCompleteTask}
              onMissed={handleMissedTask}
              completingTaskId={completingTaskId}
            />

            <TaskSection
              title="Completed Tasks"
              tasks={groupedTasks.done}
              icon={CheckCircle}
              iconColor="text-green-500"
              isCompleted
            />

            <TaskSection
              title="Missed Tasks"
              tasks={groupedTasks.missed}
              icon={XCircle}
              iconColor="text-red-500"
              isMissed
            />
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onTaskAdded={handleTaskAdded}
      />

      <MissedReasonModal
        isOpen={showMissedModal}
        onClose={() => {
          setShowMissedModal(false);
          setSelectedTask(null);
        }}
        onSubmit={handleMissedReasonSubmit}
        taskName={selectedTask?.taskName}
      />
    </div>
  );
}

const TaskSection =({ title, tasks, icon: Icon, iconColor, onComplete, onMissed, isCompleted, isMissed, completingTaskId }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <span className="text-gray-500 text-lg">({tasks.length})</span>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500">No tasks in this section</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${getStatusColor(task.status)} border backdrop-blur-sm rounded-xl p-5 hover:scale-105 transition-transform`}
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{task.taskName}</h3>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Tag className="w-4 h-4" />
                  <span>{task.category}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(task.plannedDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{task.duration} mins</span>
                </div>

                {task.reason && (
                  <div className="mt-3 p-2 bg-red-900/30 border border-red-700/50 rounded text-sm text-red-300">
                    <span className="font-semibold">Reason: </span>
                    {task.reason}
                  </div>
                )}

                {!isCompleted && !isMissed && (
                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={completingTaskId === task._id ? {} : { scale: 1.05 }}
                      whileTap={completingTaskId === task._id ? {} : { scale: 0.95 }}
                      onClick={() => !completingTaskId && onComplete(task._id)}
                      disabled={completingTaskId === task._id}
                      className={`flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${completingTaskId === task._id ? "opacity-75 cursor-wait" : ""}`}
                    >
                      {completingTaskId === task._id ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      {completingTaskId === task._id ? "Completing..." : "Complete"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onMissed(task)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Missed
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'done':
      return 'border-green-500/50 bg-green-500/10';
    case 'missed':
      return 'border-red-500/50 bg-red-500/10';
    default:
      return 'border-gray-700 bg-gray-800/50';
  }
}

export default Tasks;
