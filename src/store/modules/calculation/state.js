const templates = {
  fraction: {
    type: "fraction",
    numerator: "",
    denominator: "",
    brace: "",
    errors: {
      brace: false,
      numurator: true,
      denominator: true
    }
  },
  sign: {
    type: "sign",
    sign: "",
    operationPriority: 0,
    bracePriority: 0,
    errors: {
      sign: true
    }
  }
};

export default {
  calculation: [
    { ...templates.fraction, index: 0 },
    { ...templates.sign, index: 1 },
    { ...templates.fraction, index: 2 }
  ],
  result: {
    numerator: 0,
    denominator: 0
  },
  errors: {
    numerator: [0, 2],
    denominator: [0, 2],
    sign: [1],
    brace: []
  },
  templates
};
