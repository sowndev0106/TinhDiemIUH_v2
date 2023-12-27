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
    console.log({ overviewSubject })
    updateOverviewSubjectInView(termId, row, subject)
}
const updateOverviewSubjectInView = (termId, rowId, subject) => {
    console.log({ termId, rowId, subject })
    const inputFinalGrade10 = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGrade10}`)
    const inputFinalGrade4 = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGrade4}`)
    const inputFinalGradeChar = document.getElementById(`input-${termId}-${rowId}-${columnName.finalGradeChar}`)
    const inputLevel = document.getElementById(`input-${termId}-${rowId}-${columnName.level}`)

    console.log({ inputFinalGrade10, inputFinalGrade4, inputFinalGradeChar, inputLevel })

    inputFinalGrade10.value = convertGradeToNumberView(subject.finalGrade10)
    inputFinalGrade4.value = convertGradeToNumberView(subject.finalGrade4)
    inputFinalGradeChar.value = subject.finalGradeChar
    inputLevel.value = subject.level

}

const updateOverviewTermInView = (termId) => {

}
