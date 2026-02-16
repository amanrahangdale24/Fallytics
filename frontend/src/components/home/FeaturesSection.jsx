import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  BarChart3, 
  Brain, 
  CalendarDays, 
  Repeat, 
  Lightbulb
} from 'lucide-react';

const FeaturesSection = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      };
    
      const staggerContainer = {
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      };

      const features = [
        {
          icon: CheckCircle2,
          title: 'Task Tracking',
          description: 'Effortlessly manage your daily to-dos and keep track of your progress.',
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20'
        },
        {
          icon: BarChart3,
          title: 'Missed Task Analysis',
          description: 'Understand why tasks are missed and identify patterns in your behavior.',
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20'
        },
        {
          icon: Brain,
          title: 'AI Insights',
          description: 'Get personalized feedback and actionable advice from our intelligent system.',
          color: 'text-indigo-400',
          bg: 'bg-indigo-400/10',
          border: 'border-indigo-400/20'
        },
        {
          icon: CalendarDays,
          title: 'Weekly Reports',
          description: 'Visualize your productivity trends with comprehensive weekly summaries.',
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          border: 'border-blue-400/20'
        },
        {
          icon: Repeat,
          title: 'Habit Patterns',
          description: 'Discover your consistency streaks and build lasting positive habits.',
          color: 'text-amber-400',
          bg: 'bg-indigo-400/10',
          border: 'border-amber-400/20'
        },
        {
          icon: Lightbulb,
          title: 'Smart Suggestions',
          description: 'Receive tailored recommendations to optimize your daily workflow.',
          color: 'text-purple-400',
          bg: 'bg-purple-400/10',
          border: 'border-purple-400/20'
        }
      ];

    return (
        <section className="py-20 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Faillytics?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              More than just a todo list. We provide the tools to understand your work habits.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className={`${feature.bg} ${feature.border} border p-8 rounded-2xl transition-all hover:shadow-lg hover:shadow-indigo-500/5 group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
};

export default FeaturesSection;