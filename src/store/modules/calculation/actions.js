const userActions = {
  toggleBrace({ dispatch, commit, state }, { index, value }) {
    if (
      state.calculation[index].brace === "" ||
      state.calculation[index].brace !== value
    ) {
      commit("setCalculationValue", { prop: "brace", index, value });
    } else {
      commit("setCalculationValue", { prop: "brace", index, value: "" });
    }

    dispatch("resolveBraces");
  },
  onNumberChange({ commit, dispatch }, { event, prop, index }) {
    let value = event.target.value;
    if (Number.isInteger(+value) && value !== "") {
      commit("setCalculationValue", { prop, index, value: +value });
      dispatch("toggleError", { prop, index, action: "remove" });
      dispatch("recalc");
    } else {
      dispatch("toggleError", { prop, index, action: "add" });
      commit("setCalculationValue", { prop, index, value });
    }
  },
  onSignChange({ commit, dispatch }, { event, prop, index }) {
    let { value } = event.target;
    commit("setCalculationValue", { prop, index, value });
    switch (value) {
      case "-":
      case "+":
        dispatch("toggleError", { prop, index, action: "remove" });
        commit("setCalculationValue", {
          prop: "operationPriority",
          index,
          value: 0
        });
        dispatch("recalc");
        break;
      case "*":
      case "/":
        dispatch("toggleError", { prop, index, action: "remove" });
        commit("setCalculationValue", {
          prop: "operationPriority",
          index,
          value: 1
        });
        dispatch("recalc");
        break;
      default:
        dispatch("toggleError", { prop, index, action: "add" });
    }
  },
  refresh({ commit }) {
    commit("refresh");
  },
  addCalculationPart({ commit }) {
    commit("addCalculation", [
      {
        type: "fraction",
        numerator: "",
        denominator: "",
        brace: ""
      },
      {
        type: "sign",
        sign: "",
        operationPriority: 0,
        bracePriority: 0
      }
    ]);
    commit("reindexCalculation");
  }
};

const innerActions = {
  resolveBraces({ commit, getters, dispatch }) {
    const bracePriorities = getters.bracePriorities;
    if (bracePriorities.error) {
      commit("setError", {
        prop: "brace",
        indexes: bracePriorities.payload
      });
    } else {
      commit("setError", {
        prop: "brace",
        indexes: []
      });
      commit("clearBracePriotiries", getters.signs);
      bracePriorities.payload.forEach(bracePriority => {
        commit("setCalculationValue", {
          prop: "bracePriority",
          index: bracePriority.index,
          value: bracePriority.priority
        });
      });
      dispatch("recalc");
    }
  },
  recalc({ getters, dispatch }) {
    if (!getters.countOfErrors) {
      dispatch("sum");
    }
  },
  sum({ state, commit, getters }) {
    let calculation = [...state.calculation];
    let operations = getters.orderOperations;
    operations.forEach(operation => {
      let payload = getters.resolveOperation({ calculation, operation });
      calculation.splice(payload.operationIndex - 1, 3, payload.result);
    });
    commit("setResult", calculation[0]);
  },
  toggleError({ commit, getters }, { prop, index, action }) {
    let isErrorExisting = getters.isErrorExisting({ prop, index });

    if (isErrorExisting && action === "remove") {
      commit("removeError", { prop, index });
    }
    if (!isErrorExisting && action === "add") {
      commit("addError", { prop, index });
    }
  }
};

export default {
  ...userActions,
  ...innerActions
};
