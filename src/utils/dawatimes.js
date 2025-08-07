export const formatFrequency = (times = {}) => {
  const parts = [];

  const mapTime = {
    सुबह: 'सुबह',
    दोपहर: 'दोपहर',
    रात: 'रात',
  };

  for (const time in mapTime) {
    const entry = times[time];
    if (entry?.beforeMeal || entry?.afterMeal) {
      const vals = [];
      if (entry.beforeMeal) vals.push('खाने से पहले');
      if (entry.afterMeal) vals.push('खाने के बाद');

      parts.push(`${mapTime[time]}: ${vals.join(', ')}`);
    }
  }

  return parts.length > 0 ? parts.join(' | ') : 'Not specified';
};
