interface ProgressEntry {
  type: string;
  timestamp: number;
}

export function saveProgress(type: string): void {
  const now = Date.now();
  
  const storedProgress = localStorage.getItem('progress');
  const progress: ProgressEntry[] = storedProgress ? JSON.parse(storedProgress) : [];
  
  // Always add a new entry
  progress.push({ type, timestamp: now });
  
  localStorage.setItem('progress', JSON.stringify(progress));
}

export function loadTodayProgress(): Record<string, number> {
  const storedProgress = localStorage.getItem('progress');
  if (!storedProgress) return {};

  const progress: ProgressEntry[] = JSON.parse(storedProgress);
  const todayStart = new Date().setHours(0, 0, 0, 0);
  
  const todayProgress = progress.filter(entry => entry.timestamp >= todayStart);
  
  return todayProgress.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

