import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-linear-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-500/30 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Master Your Time?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Missed today. Stronger tomorrow. Join them.
            </p>
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105">
              <Zap className="w-5 h-5 fill-indigo-900" />
              Get Your Task Insights Now
            </Link>
          </div>
        </div>
      </section>
    );
};

export default CTASection;