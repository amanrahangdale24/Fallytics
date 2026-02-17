import { motion } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircle2, XCircle, ListTodo, AlertCircle, Sparkles, TrendingUp, BarChart } from 'lucide-react';

const Dashboard = ()=> {
  const analytics = {
    totalTasks: 42,
    completedTasks: 28,
    missedTasks: 14,
    topMissedReason: 'Procrastination',
    consistencyTrend: [
        { date: 'Mon', completed: 4, missed: 2 },
        { date: 'Tue', completed: 5, missed: 1 },
        { date: 'Wed', completed: 3, missed: 3 },
        { date: 'Thu', completed: 6, missed: 0 },
        { date: 'Fri', completed: 4, missed: 2 },
        { date: 'Sat', completed: 2, missed: 4 },
        { date: 'Sun', completed: 4, missed: 2 },
    ],
    missedReasonDistribution: [
        { name: 'Procrastination', value: 8 },
        { name: 'Time Management', value: 4 },
        { name: 'Distractions', value: 2 },
    ],
    aiResponse: "Based on your recent activity, you seem to be struggling with consistency on weekends. Focusing on a lighter schedule during Saturday and Sunday might help maintain momentum without burnout. Consider time-blocking your most productive hours."
  };

  const { totalTasks, completedTasks, missedTasks, topMissedReason, consistencyTrend, missedReasonDistribution, aiResponse } = analytics;

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

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-linear-to-br from-indigo-900/30 to-blue-900/30 backdrop-blur-sm border-2 border-indigo-500/50 rounded-xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
              </div>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
