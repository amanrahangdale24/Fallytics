import { motion } from 'framer-motion';

const SuccessConfetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360,
    color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '100vh',
            rotate: piece.rotation,
            opacity: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl text-xl font-bold"
      >
        Task Completed!
      </motion.div>
    </div>
  );
}

export default SuccessConfetti;
