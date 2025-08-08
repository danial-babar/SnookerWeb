export function getDifferenceInHours(matchStartTime:any, matchEndTime:any) {
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = matchEndTime - matchStartTime;
  
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