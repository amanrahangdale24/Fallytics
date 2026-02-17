import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircle2, XCircle, ListTodo, AlertCircle, Sparkles, TrendingUp, BarChart, Lightbulb, AlertTriangle, Target, Rocket } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { useEffect } from 'react';
import LoaderPage from '../components/Loader';


const Dashboard = ()=> {
  const { analytics, fetchAnalytics, isLoading } = useTaskStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (isLoading) {
    return (
     <LoaderPage/>
    );
  }


  if (!analytics || analytics.cards?.totalTasks === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full text-center"
        >
          <div className="bg-indigo-500/10 p-4 rounded-full w-fit mx-auto mb-6">
            <ListTodo className="w-12 h-12 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Analytics Yet</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Your dashboard is empty because you haven't added any tasks yet. 
            Start planning your day to unlock powerful insights!
          </p>
          <Link 
            to="/tasks" 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Your First Task
          </Link>
        </motion.div>
      </div>
    );
  }

  // Check if we have only planned tasks but no completed/missed activity
  const hasActivity = (analytics.cards?.completed || 0) > 0 || (analytics.cards?.missed || 0) > 0;
  
  if (!hasActivity) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full text-center"
        >
          <div className="bg-emerald-500/10 p-4 rounded-full w-fit mx-auto mb-6">
            <Target className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Execute?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            You have planned <strong>{analytics.cards?.totalTasks} tasks</strong>, but haven't marked any as Done or Missed yet.
            <br/><br/>
            Head over to your tasks list and update their status to see your analytics!
          </p>
          <Link 
            to="/tasks" 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Update Task Status
          </Link>
        </motion.div>
      </div>
    );
  }

  const { cards, charts, ai } = analytics;

  const totalTasks = cards?.totalTasks || 0;
  const completedTasks = cards?.completed || 0;
  const missedTasks = cards?.missed || 0;
  const topMissedReason = cards?.topMissedReason || 'N/A';

  // Transform data for Consistency Trend Chart
  const consistencyTrend = charts?.taskPerformance?.days?.map((day, index) => ({
    date: day,
    completed: charts.taskPerformance.completed[index] || 0,
    missed: charts.taskPerformance.missed[index] || 0,
  })) || [];

  // Transform data for Missed Reason Distribution Chart
  const missedReasonDistribution = charts?.missedReasons?.labels?.map((label, index) => ({
    name: label,
    value: charts.missedReasons.values[index] || 0,
  })) || [];

  const summaryCards = [
    {
      title: 'Total Tasks',
      value: totalTasks || 0,
      icon: ListTodo,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/50',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks || 0,
      icon: CheckCircle2,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
    },
    {
      title: 'Missed Tasks',
      value: missedTasks || 0,
      icon: XCircle,
      color: 'from-red-600 to-orange-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/50',
    },
    {
      title: 'Top Missed Reason',
      value: topMissedReason || 'N/A',
      icon: AlertCircle,
      color: 'from-orange-600 to-yellow-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/50',
      isText: true,
    },
  ];

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16'];

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Last 7 days performance overview</p>
          </div>
          <TrendingUp className="w-10 h-10 text-indigo-500" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${card.bgColor} ${card.borderColor} border backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-linear-to-br ${card.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
                <p className={`${card.isText ? 'text-2xl' : 'text-3xl'} font-bold text-white truncate`}>
                  {card.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-500" />
              Consistency Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consistencyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed" />
                <Line type="monotone" dataKey="missed" stroke="#ef4444" strokeWidth={3} name="Missed" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Why You Failed
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={missedReasonDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(missedReasonDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {ai && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/80 backdrop-blur-md border border-indigo-500/30 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-900/50 to-purple-900/50 p-6 border-b border-indigo-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/50">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Capabilities & Insights</h2>
                  <p className="text-indigo-300 text-sm">Personalized analysis of your productivity patterns</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-8">
              {/* Insights */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <BarChart className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Key Insights</h3>
                </div>
                <ul className="space-y-3">
                  {ai.insights?.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-sm leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Smart Suggestions</h3>
                </div>
                <ul className="space-y-3">
                  {ai.suggestions?.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 bg-emerald-900/10 p-3 rounded-lg border border-emerald-500/20">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-sm leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Areas for Attention</h3>
                </div>
                <ul className="space-y-3">
                  {ai.warnings?.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 bg-amber-900/10 p-3 rounded-lg border border-amber-500/20">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-sm leading-relaxed">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Motivation */}
              <div className="mt-2">
                <div className="bg-linear-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-5 flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-full shrink-0">
                    <Rocket className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Keep Going!
                    </h4>
                    <p className="text-gray-200 italic leading-relaxed">"{ai.motivation}"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
