export const getDateRange = (days) => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);
  
  return { startDate, endDate };
};

export const calculateTaskStats = (tasks) => {
  const doneTasks = tasks.filter(t => t.status === "done");
  const missedTasks = tasks.filter(t => t.status === "missed");
  
  const plannedMinutes = tasks.reduce((sum, task) => sum + (task.duration || 0), 0);
  const completedMinutes = doneTasks.reduce((sum, task) => sum + (task.duration || 0), 0);
  
  const consistencyPercentage = plannedMinutes === 0 
    ? 0 
    : Math.round((completedMinutes / plannedMinutes) * 100);

  return {
    totalTasks: tasks.length,
    doneTasks,
    missedTasks,
    plannedMinutes,
    completedMinutes,
    consistencyPercentage
  };
};

export const analyzeMissedReasons = (missedTasks) => {
  const reasonMap = {};
  
  missedTasks.forEach(task => {
    const reason = task.reason || "Unknown";
    reasonMap[reason] = (reasonMap[reason] || 0) + 1;
  });

  const topMissedReason = Object.keys(reasonMap).length > 0
    ? Object.keys(reasonMap).reduce((a, b) => reasonMap[a] > reasonMap[b] ? a : b)
    : "None";

  const labels = Object.keys(reasonMap);
  const counts = Object.values(reasonMap);
  const totalMissed = missedTasks.length;
  
  const percentages = counts.map(count => 
    totalMissed === 0 ? 0 : Math.round((count / totalMissed) * 100)
  );

  return {
    topMissedReason,
    labels,
    percentages
  };
};

export const calculateDayWisePerformance = (tasks) => {
  const last7Days = [];
  const performance = {};

  // Helper to format date key locally YYYY-MM-DD
  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Initialize for last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = formatDateKey(d);
    
    performance[dateKey] = { 
      label: d.getDate().toString(), 
      done: 0, 
      missed: 0 
    };
    last7Days.push(dateKey);
  }

  tasks.forEach(task => {
    const taskDate = new Date(task.plannedDate);
    const dateKey = formatDateKey(taskDate);
    
    if (performance[dateKey]) {
       if (task.status === "done") performance[dateKey].done++;
       if (task.status === "missed") performance[dateKey].missed++;
    }
  });

  return {
    days: last7Days.map(dateKey => performance[dateKey].label),
    completed: last7Days.map(dateKey => performance[dateKey].done),
    missed: last7Days.map(dateKey => performance[dateKey].missed)
  };
};

export const detectPatterns = (doneTasks, missedTasks) => {
  return {
    lateNightMisses: missedTasks.some(task => parseInt(task.plannedTime) >= 21),
    morningSuccess: doneTasks.some(task => parseInt(task.plannedTime) <= 11),
    studyTasksOftenMissed: missedTasks.filter(task => task.category === "Study").length >= 2
  };
};