export const getDateRange = (days) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));
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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const performance = {};
  
  days.forEach(day => {
    performance[day] = { done: 0, missed: 0 };
  });

  tasks.forEach(task => {
    const dayName = days[new Date(task.plannedDate).getDay()];
    if (task.status === "done") performance[dayName].done++;
    if (task.status === "missed") performance[dayName].missed++;
  });

  return {
    days,
    completed: days.map(day => performance[day].done),
    missed: days.map(day => performance[day].missed)
  };
};

export const detectPatterns = (doneTasks, missedTasks) => {
  return {
    lateNightMisses: missedTasks.some(task => parseInt(task.plannedTime) >= 21),
    morningSuccess: doneTasks.some(task => parseInt(task.plannedTime) <= 11),
    studyTasksOftenMissed: missedTasks.filter(task => task.category === "Study").length >= 2
  };
};