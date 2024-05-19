import React from "react";

function convertToLinguisticVariable(averageScore, membershipType) {
  const membershipFunctions = {
    desirability: {
      Low: [0, 0, 40, 55],
      Medium: [50, 60, 70, 80],
      High: [75, 80, 100, 100],
    },
    feasibility: {
      Low: [0, 0, 40, 55],
      Medium: [50, 60, 70, 80],
      High: [75, 80, 100, 100],
    },
    viability: {
      Low: [0, 0, 40, 55],
      Medium: [50, 60, 70, 80],
      High: [75, 80, 100, 100],
    },
    output: {
      "Very Low": [0, 0, 30, 35],
      Low: [30, 40, 50, 60],
      Medium: [50, 60, 70, 80],
      High: [75, 80, 95, 100],
      "Very High": [100, 100, 100],
    },
  };

  const membershipFunction = membershipFunctions[membershipType];

  let linguisticVariable = null;
  let maxMembershipValue = 0;

  for (const [varName, mf] of Object.entries(membershipFunction)) {
    const membershipValue = interpMembership(mf, averageScore);
    if (membershipValue >= maxMembershipValue) {
      maxMembershipValue = membershipValue;
      linguisticVariable = varName;
    }
  }

  return linguisticVariable;
}

// Function to calculate membership value
function interpMembership(mf, value) {
  const [a, b, c, d] = mf;
  if (value <= a || value >= d) return 0;
  if (value > a && value < b) return (value - a) / (b - a);
  if (value >= b && value <= c) return 1;
  if (value > c && value <= d) return (d - value) / (d - c);

  return 0;
}

export default convertToLinguisticVariable;
