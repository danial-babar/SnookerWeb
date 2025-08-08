export function getContrastTextColor(backgroundColor:string) {
    // Remove the '#' if it's a hex code and parse to integer
    const color = backgroundColor.startsWith('#') ? backgroundColor.slice(1) : backgroundColor;
    
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
  
    // Calculate brightness (using a common formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Return dark text for light backgrounds, light text for dark backgrounds
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }