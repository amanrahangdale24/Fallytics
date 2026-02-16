import { motion } from 'framer-motion';

const HowItWorksSection = () => {
    const steps = [
        {
          step: '01',
          title: 'Add Your Tasks',
          description: 'Quickly input your daily goals and set priorities.'
        },
        {
          step: '02',
          title: 'Complete or Miss',
          description: 'Log your progress. Honesty is key to improvement.'
        },
        {
          step: '03',
          title: 'AI Analyzes',
          description: 'Our system identifies why you might be falling behind.'
        },
        {
          step: '04',
          title: 'Improve Daily',
          description: 'Apply insights to build a more consistent routine.'
        }
      ];

    return (
        <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple steps to transform your daily routine.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative text-center hover:border-indigo-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-6 text-xl font-bold text-indigo-400">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default HowItWorksSection;