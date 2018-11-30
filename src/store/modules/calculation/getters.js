const mathGetters = {
  resolveOperation: (state, getters) => ({ calculation, operation }) => {
    let operationIndex = calculation.findIndex(
      calculationPart => calculationPart.index === operation.index
    );
    let payload = {
      fractionA: { ...calculation[operationIndex - 1] },
      fractionB: { ...calculation[operationIndex + 1] }
    };
    let operationResult = {};
    switch (operation.sign) {
      case "*":
        operationResult = getters.multiply(payload);
        break;
      case "/":
        operationResult = getters.divide(payload);
        break;
      case "+":
        operationResult = getters.add(payload);
        break;
      case "-":
        payload.fractionB.numerator = -payload.fractionB.numerator;
        operationResult = getters.add(payload);
        break;
    }
    let result = getters.short(operationResult);
    return {
      result,
      operationIndex
    };
  },
  countOfErrors: state =>
    Object.keys(state.errors).reduce((accamulator, key) => {
      accamulator += state.errors[key].length;
      return accamulator;
    }, 0),
  equalNumerator: () => (fractionA, fractionB) =>
    fractionA.numerator * fractionB.denominator,
  reverse: () => fraction => ({
    numerator: fraction.denominator,
    denominator: fraction.numerator
  }),
  multiply: () => ({ fractionA, fractionB }) => {
    return {
      numerator: fractionA.numerator * fractionB.numerator,
      denominator: fractionA.denominator * fractionB.denominator
    };
  },
  divide: (state, getters) => ({ fractionA, fractionB }) => {
    let reversedFractionB = getters.reverse(fractionB);
    return getters.multiply({ fractionA, fractionB: reversedFractionB });
  },
  add: (state, getters) => ({ fractionA, fractionB }) => {
    return fractionA.denominator !== fractionB.denominator
      ? {
          numerator:
            getters.equalNumerator(fractionA, fractionB) +
            getters.equalNumerator(fractionB, fractionA),
          denominator: fractionA.denominator * fractionB.denominator
        }
      : {
          numerator: fractionA.numerator + fractionB.numerator,
          denominator: fractionA.denominator
        };
  },
  short: () => fraction => {
    let absNumerator = Math.abs(fraction.numerator);
    let absDenominator = Math.abs(fraction.denominator);
    let divisionValue =
      absNumerator < absDenominator ? absNumerator : absDenominator;
    if (divisionValue > 10000) return fraction; // If the value ââare greater than 10000 search for the result too long
    if (divisionValue === 0) return { numerator: 0, denominator: 1 };
    while (divisionValue !== 1) {
      if (
        fraction.numerator % divisionValue ||
        fraction.denominator % divisionValue
      ) {
        divisionValue -= 1;
      } else {
        return {
          numerator: fraction.numerator / divisionValue,
          denominator: fraction.denominator / divisionValue
        };
      }
    }
    return fraction;
  },
  bracePriorities: (state, getters) => {
    let fractionsWithBrace = getters.braces;
    let braceAreas = [];
    let pairsCount = Math.round(fractionsWithBrace.length / 2);

    for (let i = 0; i < pairsCount; i++) {
      let pairIndex = fractionsWithBrace.findIndex((fraction, index) => {
        return (
          fractionsWithBrace[index + 1] &&
          fraction.brace === "left" &&
          fractionsWithBrace[index + 1].brace === "right"
        );
      });
      if (pairIndex !== -1) {
        let pair = fractionsWithBrace.splice(pairIndex, 2);
        braceAreas.push({
          start: pair[0].index,
          end: pair[1].index
        });
      }
    }
    if (fractionsWithBrace.length === 0) {
      let priorityAccamulator = {};
      braceAreas.forEach(braceArea => {
        let signs = getters.signsInArea(braceArea);
        signs.forEach(sign => {
          priorityAccamulator[sign.index] = priorityAccamulator[sign.index]
            ? priorityAccamulator[sign.index] + 2
            : 2;
        });
      });
      let bracePriorities = Object.keys(priorityAccamulator).map(key => ({
        index: key,
        priority: priorityAccamulator[key]
      }));
      return {
        payload: bracePriorities
      };
    } else {
      return {
        error: true,
        payload: fractionsWithBrace.map(fraction => fraction.index)
      };
    }
  }
};

const getters = {
  signs: state => state.calculation.filter(item => item.type === "sign"),
  braces: state => state.calculation.filter(item => item.brace),
  signsInArea: state => area =>
    state.calculation
      .slice(area.start, area.end)
      .filter(item => item.type === "sign"),
  isErrorExisting: state => ({ index, prop }) =>
    state.errors[prop].findIndex(error => error === index) !== -1,
  orderOperations: (state, getters) =>
    [...getters.signs].sort(
      (a, b) =>
        b.operationPriority +
        b.bracePriority -
        (a.operationPriority + a.bracePriority)
    )
};

export default {
  ...mathGetters,
  ...getters
};
