'use strict';

const addEventToGrade = () => {
    const gradesInput = document.querySelectorAll('input.input-grade');
    gradesInput.forEach(gradeInput => {
        gradeInput.addEventListener('keyup', handlerUpdateGrade)

    })
}
const handlerUpdateGrade = (event) => {
    let validate = false
    const isCreditInput = event.target.getAttribute('columnname') == 'creditPractical';
    const row = event.target.getAttribute('row');
    const termId = event.target.getAttribute('termId');
    const column = event.target.getAttribute('column');
    const id = event.target.getAttribute('id');
    const columnName = event.target.getAttribute('columnname');
    const value = event.target.value;

    if (isCreditInput) {
        // column credit
        const columntotalCredit = columnName.totalCredit;
        const inputtotalCredit = document.getElementById(`input-${termId}-${row}-${columntotalCredit}`);

        validate = checkCreditValidation(event, convertGradeToNumber(inputtotalCredit?.value) || 10)
    } else
        validate = checkGradeValidation(event)

    if (!validate || value == "") {
        return
    }
    // add new value into grade
    const term = grades.find(term => term.termId == termId);

    if (!term) return alert("Không thể tín điểm")

    const subject = term.subjects.find(subject => subject.rowIndex == row);
    subject[columnName] = value

    const finalGrade10 = endTermCalculator(
        subject.totalCredit,
        subject.creditPractical,
        subject.midTerm,
        subject.endTerm,
        [subject.theory1, subject.theory2, subject.theory3, subject.theory4, subject.theory5, subject.theory6, subject.theory7, subject.theory8, subject.theory9],
        [subject.practical1, subject.practical2, subject.practical3, subject.practical4, subject.practical5]
    )
    if (finalGrade10 == undefined && isNaN(finalGrade10)) return alert("Không thể tín điểm")

    const overviewSubject = convertGrade10(finalGrade10)

    subject.finalGrade10 = finalGrade10
    subject.finalGrade4 = overviewSubject.finalGrade4
    subject.finalGradeChar = overviewSubject.finalGradeChar
    subject.level = overviewSubject.level

    updateOverviewSubjectInView(termId, row, subject)

    calculatorOverviewTerm(termId)

    updateOverviewTermInView(termId)
}
const calculatorOverviewTerm = (termId) => {
    const term = grades.find(term => term.termId == termId);
    let isMissing = false
    const overviewTerm = term.subjects.reduce((overviewTerm, subject) => {
        if (subject.disable) {
            return overviewTerm
        }
        if (subject.finalGrade10 == "" || subject.finalGrade10 == undefined || isNaN(subject.finalGrade10)) {
            isMissing = true
            return overviewTerm
        }
        overviewTerm.totalCredit += subject.totalCredit
        overviewTerm.totalGrade10 += subject.finalGrade10 * subject.totalCredit
        overviewTerm.totalGrade4 += subject.finalGrade4 * subject.totalCredit
        return overviewTerm
    }, {
        totalCredit: 0,
        totalGrade10: 0,
        totalGrade4: 0,
    })
    if (isMissing) {
        // stop calculator
        return
    }

    overviewTerm.finalGrade10 = (overviewTerm.totalGrade10 / overviewTerm.totalCredit).toFixed(1)
    overviewTerm.finalGrade4 = (overviewTerm.totalGrade4 / overviewTerm.totalCredit).toFixed(2)
    overviewTerm.level = findOverTermLevelByGrade4(overviewTerm.finalGrade4)

    term.overview.avg4 = overviewTerm.finalGrade4
    term.overview.avg10 = overviewTerm.finalGrade10
    term.overview.levelTerm = overviewTerm.level

    updateOverviewTermInView(termId)
}
const updateOverviewSubjectInView = (termId, rowId, subject) => {
    const inputFinalGrade10 = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGrade10}`)
    const inputFinalGrade4 = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGrade4}`)
    const inputFinalGradeChar = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGradeChar}`)
    const inputLevel = document.getElementById(`input-${termId}-${rowId}-${columnName.level}`)

    inputFinalGrade10.value = convertGradeToNumberView(subject.finalGrade10)
    inputFinalGrade4.value = convertGradeToNumberView(subject.finalGrade4)
    inputFinalGradeChar.value = subject.finalGradeChar
    inputLevel.value = subject.level
}

const updateOverviewTermInView = (termId) => {
    const spanAvg4 = document.getElementById(`span-${termId}-avg4`)
    const spanAvg10 = document.getElementById(`span-${termId}-avg10`)
    const spanLevelTerm = document.getElementById(`span-${termId}-levelTerm`)

    const term = grades.find(term => term.termId == termId);

    spanAvg4.innerText = convertGradeToNumberView(term.overview.avg4)
    spanAvg10.innerText = convertGradeToNumberView(term.overview.avg10)
    spanLevelTerm.innerText = term.overview.levelTerm
}
const updateOverviewFromTerm = (termId) => {
    const indexTerm = grades.findIndex(term => term.termId == termId);
    const lengthTerm = grades.length;
    if (indexTerm == -1 || indexTerm == lengthTerm - 1) return

    for (let i = indexTerm; i < lengthTerm; i++) {
        const term = grades[indexTerm];
        const nextTerm = grades[indexTerm + 1];


    }

}
