
const addColumnCreditPractical = () => {
    addColumnCreditPracticalInHeader();
    addColumnCreditPracticalInBody();
}

const addColumnCreditPracticalInHeader = () => {
    const table = document.querySelector('table');
    //  get element header tr th have lang = kqht-stc
    const thCreadit = table.querySelector('thead tr th[lang="kqht-stc"]');
    const firstThInLastTr = table.querySelector('thead tr:last-child th:first-child');
    thCreadit.textContent = 'Số tín chỉ';
    // sey thCreadit colspan = 2
    thCreadit.setAttribute('rowspan', 2);
    thCreadit.setAttribute('colspan', 2);

    // duplicate thCreadit to thPractical
    const thPractical = firstThInLastTr.cloneNode(true);
    thPractical.textContent = 'Thực hành';

    const thSum = firstThInLastTr.cloneNode(true);
    thSum.textContent = 'Tổng';

    // add to thPractical to table
    firstThInLastTr.insertAdjacentElement('beforebegin', thSum);
    firstThInLastTr.insertAdjacentElement('beforebegin', thPractical);
}

const addColumnCreditPracticalInBody = () => {
    const table = document.querySelector('table');
    const trs = table.querySelectorAll('tbody tr');
    trs.forEach(tr => {
        const tdFirst = tr.querySelector('td:first-child');
        // check colspan exist
        if (!tdFirst || tdFirst?.hasAttribute('colspan')) {
            const td = tr.querySelector('td[colspan="28"]');
            td.setAttribute('colspan', 29);

            const td2 = tr.querySelectorAll('td[colspan="2"]');
            td2[1]?.setAttribute('colspan', 3);

            return
        }
        const allTd = tr.querySelectorAll('td');
        const tdtotalCredit = allTd[columnName.totalCredit]
        const tdCreditPractical = tdtotalCredit.cloneNode(true);

        const credit = tdtotalCredit.textContent;

        // must be -1 because missing column tdCreditPractical (add not yet)
        const midTerm = allTd[columnName.midTerm - 1].textContent;
        const theorys = [...allTd].slice(columnName.theory1 - 1, columnName.theory9 - 1).map(td => td.textContent);
        const practicals = [...allTd].slice(columnName.practical1 - 1, columnName.practical5 - 1).map(td => td.textContent);
        const endTerm = allTd[columnName.endTerm - 1].textContent;
        const finalGrade10 = allTd[columnName.finalGrade10 - 1].textContent;

        const creditPractical = findPraticalCredit(credit, midTerm, theorys, practicals, endTerm, finalGrade10);
        tdCreditPractical.innerHTML = `<div style="display: inline-table">${creditPractical}</div>`;
        tdtotalCredit.insertAdjacentElement('afterend', tdCreditPractical);
    })
}

const findPraticalCredit = (totalCredit, midTerm, theorys, practicals, endTerm, finalGrade10) => {
    try {
        // avg array number theorys
        endTerm = convertGradeToNumber(endTerm);
        finalGrade10 = convertGradeToNumber(finalGrade10);
        totalCredit = convertGradeToNumber(totalCredit);
        midTerm = convertGradeToNumber(midTerm);
        theorys = filterColumTheoryOrPracticals(theorys);
        practicals = filterColumTheoryOrPracticals(practicals);


        if (!theorys || theorys.length == 0 || !practicals || practicals.length == 0 || !midTerm || !endTerm || !finalGrade10 || !totalCredit) {
            throw new Error()
        }

        const avgTheorys = theorys.reduce((a, b) => a + b, 0) / theorys.length;
        const avgPracticals = practicals.reduce((a, b) => a + b, 0) / practicals.length;

        if (isNaN(avgTheorys) || isNaN(avgPracticals)) {
            throw new Error()
        }
        const gradeTheory = avgTheorys * 0.2 + midTerm * 0.3 + endTerm * 0.5;
        const gradePractical = avgPracticals

        // find grade practical
        for (let creditPractical = 1; creditPractical <= totalCredit; creditPractical++) {
            const creditTheory = totalCredit - creditPractical;
            const grade = (gradeTheory * creditTheory + creditPractical * gradePractical) / totalCredit;
            if (grade.toFixed(1) == finalGrade10) {
                return creditPractical
            }
        }
        return 1

    } catch (error) {
        return ""
    }
}




