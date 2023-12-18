'use strict';

const addEventToGrade = () => {
    const gradesInput = document.querySelectorAll('input.input-grade');
    gradesInput.forEach(gradeInput => {
        gradeInput.addEventListener('keyup', (e) => {
            let validate = false
            const isCreditInput = e.target.getAttribute('columnname') == 'creditPractical';
            const row = e.target.getAttribute('row');
            const termId = e.target.getAttribute('termId');
            const column = e.target.getAttribute('column');
            const id = e.target.getAttribute('id');
            const columnName = e.target.getAttribute('columnname');

            if (isCreditInput) {

                const columnSumCredit = columnName.sumCredit;
                const inputSumCredit = document.getElementById(`input-${termId}-${row}-${columnSumCredit}`);

                validate = checkCreditValidation(e, convertGradeToNumber(inputSumCredit?.value) || 10)
            } else
                validate = checkGradeValidation(e)

            if (!validate) {
                return
            }

            // add new value into grade
            const term = grades.find(term => term.termId == termId);
            const subject = term.subjects.find(subject => subject.rowIndex == row);
            subject[columnName] = e.target.value;

            console.log(subject)

        })
    })
}

const updateOverview = (termId) => {

}