// weatherUtils.js

export const getWindDirection = (deg) => {
  if (deg >= 45 && deg < 135) return "Este";
  if (deg >= 135 && deg < 225) return "Sur";
  if (deg >= 225 && deg < 315) return "Oeste";
  return "Norte";
};
