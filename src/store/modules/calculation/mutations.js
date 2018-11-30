export default {
  setError(state, { prop, indexes }) {
    state.errors[prop] = indexes;
  },
  addError(state, { prop, index }) {
    state.errors[prop].push(index);
  },
  removeError(state, { prop, index }) {
    state.errors[prop] = state.errors[prop].filter(error => error !== index);
  },
  setResult(state, result) {
    state.result = result;
  },
  addCalculation(state, newCalculationParts) {
    state.calculation.unshift(...newCalculationParts);

    Object.keys(state.errors).forEach(key => {
      state.errors[key] = state.errors[key].map(
        error => error + newCalculationParts.length
      );
    });

    newCalculationParts.forEach((part, i) => {
      if (part.type === "fraction") {
        state.errors.numerator.unshift(i);
        state.errors.denominator.unshift(i);
      } else {
        state.errors.sign.unshift(i);
      }
    });
  },
  reindexCalculation(state) {
    state.calculation = state.calculation.map((calculation, index) => ({
      ...calculation,
      index
    }));
  },
  setCalculationValue(state, { prop, index, value }) {
    state.calculation[index][prop] = value;
  },
  clearBracePriotiries(state, operations) {
    operations.forEach(operation => {
      state.calculation[operation.index].bracePriority = 0;
    });
  },
  refresh(state) {
    state.calculation = [
      { ...state.templates.fraction, index: 0 },
      { ...state.templates.sign, index: 1 },
      { ...state.templates.fraction, index: 2 }
    ];
    state.result = {
      numerator: 0,
      denominator: 0
    };
    state.errors = {
      numerator: [0, 2],
      denominator: [0, 2],
      sign: [1],
      brace: []
    };
  }
};
