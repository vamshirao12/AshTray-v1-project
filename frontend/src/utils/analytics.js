// TODAY
export const getTodayEntries = (entries) => {
  const today = new Date().toDateString();

  return entries.filter(
    (entry) =>
      new Date(entry.date).toDateString() === today
  );
};

export const getTodayLogs = (entries) => {
  return getTodayEntries(entries).length;
};

export const getTodayCigarettes = (entries) => {
  return getTodayEntries(entries).reduce(
    (sum, entry) => sum + Number(entry.quantity),
    0
  );
};

export const getTodayMoney = (entries) => {
  return getTodayEntries(entries).reduce(
    (sum, entry) =>
      sum +
      Number(entry.price) *
      Number(entry.quantity),
    0
  );
};

// MONTH

export const getCurrentMonthEntries = (entries) => {
  const now = new Date();

  return entries.filter((entry) => {
    const date = new Date(entry.date);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });
};

export const getMonthlyCigarettes = (entries) => {
  return getCurrentMonthEntries(entries).reduce(
    (sum, entry) => sum + Number(entry.quantity),
    0
  );
};

// LIFETIME

export const getLifetimeMoney = (entries) => {
  return entries.reduce(
    (sum, entry) =>
      sum +
      Number(entry.price) *
      Number(entry.quantity),
    0
  );
};

export const getLifetimeCigarettes = (entries) => {
  return entries.reduce(
    (sum, entry) => sum + Number(entry.quantity),
    0
  );
};

// TRACKED DAYS

export const getTrackedDays = (entries) => {
  if (entries.length === 0) return 0;

  const sorted = [...entries].sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  const first = new Date(sorted[0].date);
  const today = new Date();

  return (
    Math.floor(
      (today - first) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
};

export const getAverageMoney = (entries) => {
  const days = getTrackedDays(entries);

  if (!days) return 0;

  return (
    getLifetimeMoney(entries) / days
  ).toFixed(2);
};

export const getAverageCigarettes = (entries) => {
  const days = getTrackedDays(entries);

  if (!days) return 0;

  return (
    getLifetimeCigarettes(entries) / days
  ).toFixed(1);
};

// WEEKLY CHART

export const getWeeklyData = (entries) => {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const current = new Date();
    current.setDate(current.getDate() - i);

    const day = current.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
      }
    );

    const cigarettes = entries
      .filter(
        (entry) =>
          new Date(entry.date).toDateString() ===
          current.toDateString()
      )
      .reduce(
        (sum, entry) =>
          sum + Number(entry.quantity),
        0
      );

    days.push({
      day,
      cigarettes,
    });
  }

  return days;
};