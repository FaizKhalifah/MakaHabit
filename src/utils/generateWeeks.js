function generateWeeks(startDate, endDate, logs) {
  const weeks = [];
  let currentDate = new Date(startDate);

  if (isNaN(currentDate)) throw new Error("Invalid startDate");
  if (isNaN(new Date(endDate))) throw new Error("Invalid endDate");

  // Normalize ke hari Minggu
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  while (currentDate <= endDate) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const log = logs.find(l => {
        const logDate = new Date(l.date);
        return !isNaN(logDate) && logDate.toDateString() === currentDate.toDateString();
      });

      week.push({
        date: new Date(currentDate),
        status: log ? log.status : "empty" // default biar tidak null
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}


export default generateWeeks;