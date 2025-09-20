function generateWeeks(startDate, endDate, logs) {
  const weeks = [];
  let currentDate = new Date(startDate);

  // Normalize ke hari Minggu dulu
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  while (currentDate <= endDate) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const log = logs.find(
        l => new Date(l.date).toDateString() === currentDate.toDateString()
      );

      week.push({
        date: new Date(currentDate),
        status: log ? log.status : null
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

export default generateWeeks;