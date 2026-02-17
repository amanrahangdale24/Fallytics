import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import LoaderPage from './Loader';

const AddTaskModal =({ isOpen, onClose, onTaskAdded }) => {
  const { addTask } = useTaskStore();
  const [formData, setFormData] = useState({
    taskName: '',
    category: '',
    plannedDate: '',
    duration: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.taskName || !formData.category || !formData.plannedDate || !formData.duration) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const [datePart, timePart] = formData.plannedDate.split('T');

      const payload = {
        taskName: formData.taskName,
        category: formData.category,
        plannedDate: datePart,
        plannedTime: timePart,
        duration: Number(formData.duration),
      };

      const result = await addTask(payload);

      if (result.success) {
        setFormData({ taskName: '', category: '', plannedDate: '', duration: '' });
        if (onTaskAdded) onTaskAdded();
        else onClose();
      } else {
        setError(result.message || 'Failed to create task');
      }
    } catch (err) {
      console.log("Error in adding task:",err)
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-6 h-6 text-indigo-500" />
                  Add New Task
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., Complete project report"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., Work, Study, Personal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Planned Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="plannedDate"
                    value={formData.plannedDate}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., 60"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? <LoaderPage/> : 'Create Task'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AddTaskModal;
