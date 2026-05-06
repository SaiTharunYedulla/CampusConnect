function calculateBadges(stats) {
  const badges = [];
  if (stats.approvedCount >= 10) badges.push("Consistent Contributor");
  if (stats.avgScore >= 90) badges.push("Top Performer");
  if (stats.monthlyWins >= 1) badges.push("Monthly Champion");
  if (stats.deptRank === 1) badges.push("Department Topper");
  return badges;
}

module.exports = { calculateBadges };
