export const TimeDelayCalculation = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const intervalCount = Math.floor(seconds / secondsInUnit);
      if (intervalCount >= 10) {
        return `${intervalCount} ${unit}${intervalCount > 1 ? "s" : ""} ago`;
      }
    }
  
    return "Just now";
  }