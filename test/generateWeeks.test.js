import generateWeeks from "../src/utils/generateWeeks.js";

describe("generateWeeks", () => {

  test("menghasilkan array minggu dengan struktur benar", () => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-15");
    const logs = [
      { date: "2025-01-02", status: "done" },
      { date: "2025-01-05", status: "missed" }
    ];

    const result = generateWeeks(startDate, endDate, logs);

    // Harus berupa array of weeks
    expect(Array.isArray(result)).toBe(true);
    // Setiap week harus punya 7 hari
    result.forEach(week => {
      expect(week).toHaveLength(7);
      week.forEach(day => {
        expect(day).toHaveProperty("date");
        expect(day).toHaveProperty("status");
      });
    });
  });

  test("mengisi status dengan 'empty' jika tidak ada log", () => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-07");
    const logs = [];

    const result = generateWeeks(startDate, endDate, logs);
    const allEmpty = result.flat().every(day => day.status === "empty");

    expect(allEmpty).toBe(true);
  });

  test("mengambil status yang sesuai dari logs", () => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-07");
    const logs = [{ date: "2025-01-03", status: "done" }];

    const result = generateWeeks(startDate, endDate, logs);
    const dayFound = result.flat().find(d => d.date.toDateString() === new Date("2025-01-03").toDateString());

    expect(dayFound.status).toBe("done");
  });

  test("melempar error jika startDate tidak valid", () => {
    expect(() => generateWeeks("invalid-date", new Date())).toThrow("Invalid startDate");
  });

  test("melempar error jika endDate tidak valid", () => {
    expect(() => generateWeeks(new Date(), "not-a-date")).toThrow("Invalid endDate");
  });

  test("menghasilkan jumlah minggu yang benar", () => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-02-01");
    const logs = [];

    const result = generateWeeks(startDate, endDate, logs);

    // Januari 2025 mencakup sekitar 5 minggu
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result.length).toBeLessThanOrEqual(6);
  });

});