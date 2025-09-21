import dashboardService from "../service/dashboardService.js";

async function getDashboard(req, res) {
  try {
    const userId = req.session.user._id;

    const todayStats = await dashboardService.getTodayStats(userId);
    const weekStats = await dashboardService.getWeekStats(userId);
    const habitLogs = await dashboardService.getYearlyHeatmap(userId);
    console.log("user req, ", req.session.user);

    res.render("dashboard", {
      user: req.session.user,
      todayStats,
      weekStats,
      habitLogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export default { getDashboard };
