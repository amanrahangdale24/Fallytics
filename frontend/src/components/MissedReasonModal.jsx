import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

const commonReasons = [
  'Procrastination',
  'Social Media',
  'Lack of Motivation',
  'Poor Time Management',
  'Unexpected Events',
  'Too Tired',
  'Distracted',
  'Other',
];

function MissedReasonModal({ isOpen, onClose, onSubmit, taskName }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSubmit = () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    if (reason.trim()) {
      onSubmit(reason);
      setSelectedReason('');
      setCustomReason('');
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
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Why Did You Miss This?
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-300 mb-4">
                  Task: <span className="font-semibold text-white">{taskName}</span>
                </p>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select a reason:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonReasons.map((reason) => (
                      <motion.button
                        key={reason}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedReason(reason)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedReason === reason
                            ? 'border-red-500 bg-red-500/20 text-white'
                            : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {reason}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {selectedReason === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom reason:
                    </label>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      rows="3"
                      placeholder="Enter your reason..."
                    />
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!selectedReason || (selectedReason === 'Other' && !customReason.trim())}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MissedReasonModal;
