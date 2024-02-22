const heightCm = [];
for (let cm = 150; cm <= 250; cm++) {
  heightCm.push({ label: `${cm} cm`, value: `${cm} cm` });
}

const heightInches = [];
for (let feet = 4; feet <= 8; feet++) {
  for (let inches = 0; inches < 12; inches++) {
    if (feet === 8 && inches > 2) {
      break; // Stop adding options after 8 feet 2 inches
    }

    heightInches.push({
      label: `${feet}' ${inches}"`,
      value: `${feet}' ${inches}"`,
    });
  }
}

export const groupedHeights = [
  {
    label: 'INCH',
    options: heightInches,
  },
  {
    label: 'CM',
    options: heightCm,
  },
];

export const heights = heightCm.concat(heightInches);
