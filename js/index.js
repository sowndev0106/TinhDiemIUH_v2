'use strict';
// add toggle enable or disable caculator grade

// check status tool tinhDiem 
let grades = [];
(async () => {
    const status = localStorage.getItem("statusToolTinhDiem");
    const isEnable = (status == true || status == "true" || status == null || status == undefined)

    addToggleButton(isEnable);

    if (isEnable) {
        addRowsOverview()

        addColumnCreditPractical()

        grades = getGradesAndAssignIdAndInput()

        addEventToGrade()

        console.log(grades)
    }
})()