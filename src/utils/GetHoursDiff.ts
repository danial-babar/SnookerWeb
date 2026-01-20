export function getDifferenceInHours(
  matchStartTime: string | number | Date | undefined | null,
  matchEndTime: string | number | Date | undefined | null
): string {
  // Handle undefined/null values
  if (!matchStartTime || !matchEndTime) {
    return "00:00";
  }

  const start = typeof matchStartTime === 'string' 
    ? new Date(matchStartTime).getTime() 
    : typeof matchStartTime === 'number' 
    ? matchStartTime 
    : matchStartTime.getTime();
  
  const end = typeof matchEndTime === 'string' 
    ? new Date(matchEndTime).getTime() 
    : typeof matchEndTime === 'number' 
    ? matchEndTime 
    : matchEndTime.getTime();
  
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end - start;
  
  // Convert to total seconds
  const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
  
  // Convert to total minutes
  const totalMinutes = Math.floor(totalSeconds / 60);
  
  // Extract hours and remaining minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  // Format the result as hh:mm
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}