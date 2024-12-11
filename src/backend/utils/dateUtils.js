exports.calculateEndDate = (durationDays) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + durationDays);
  return endDate;
}; 