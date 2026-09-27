export const formatDuration = (pt) => {
  if (!pt) return '0:00';
  // Handles YouTube ISO 8601 duration format like PT12M34S
  const match = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const h = match[1] ? parseInt(match[1]) : 0;
  const m = match[2] ? parseInt(match[2]) : 0;
  const s = match[3] ? parseInt(match[3]) : 0;
  
  const hours = h > 0 ? `${h}:` : '';
  const minutes = h > 0 ? m.toString().padStart(2, '0') + ':' : `${m}:`;
  const seconds = s.toString().padStart(2, '0');
  
  return `${hours}${minutes}${seconds}`;
};
