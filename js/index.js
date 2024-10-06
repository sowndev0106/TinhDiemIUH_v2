"use strict";
// add toggle enable or disable caculator grade

// check status tool tinhDiem
let grades = [];
let listTermNameUpdate = [];
(async () => {
  const status = localStorage.getItem("statusToolTinhDiem");
  let  isEnable =
    status == true || status == "true" || status == null || status == undefined;

  addToggleButton(isEnable);

  if (isEnable) {
    addRowsOverview();

    addColumnCreditPractical();

    grades = getGradesAndAssignIdAndInput();

    addEventToGrade();

    updateOverviewFromTerm(0);

    listTermNameUpdate.forEach((termName) => {
      console.log(termName);
      const term = grades.findIndex((term) => term.term == termName);
      // update revert tern
      const prevertTerm = grades[term - 1];
      if (prevertTerm != -1) updateOverviewTermInView(prevertTerm.termId);
    });
    console.log(grades);
  }
})();
