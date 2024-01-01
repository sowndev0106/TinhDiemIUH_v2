'use strict';

const assignAttributeToGrade = () => {

}

const getGradesAndAssignIdAndInput = () => {
    const grades = []
    const table = document.querySelector('table');
    const trs = table.querySelectorAll('tbody tr');

    let startRowIndex = 0;
    let term = '';
    let subjects = [];
    let termId = 0;

    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        const tdFirst = tr.querySelector('td:first-child');

        // check colspan exist
        if (tdFirst?.hasAttribute('colspan')) {
            // check lable HK
            if (tdFirst.textContent.trim().startsWith("HK")) {
                term = tdFirst.textContent;
                continue
            }

            //  is overview final
            const overview = getOverviewsAndAsignKey(tr, termId);
            let totalCredit = subjects.reduce((total, subject) => subject.disable ? total : total + subject.totalCredit, 0);
            let totalCreditAccumulator = grades[grades.length - 1] ? grades[grades.length - 1].totalCreditAccumulator + totalCredit : totalCredit;

            grades.push({
                startRowIndex,
                endRowIndex: i - 1,
                term,
                subjects,
                overview,
                termId,
                totalCredit,
                totalCreditAccumulator
            })

            // calculate overview term again to get grade full
            calculatorOverviewTerm(grades[grades.length - 1])

            term = '';
            subjects = [];
            i = i + 4; // index of tr overview
            startRowIndex = i + 1;
            termId++;
            continue
        }
        // grade
        const subject = assignKeyAndInputInRow(tr, i, termId)
        subjects.push(subject);

    }
    return grades
}

const assignKeyAndInputToSignleRow = (td, termId, row, column, name, isEdit) => {
    td.setAttribute('row', row);
    td.setAttribute('column', column);
    td.setAttribute('columnName', name);
    td.setAttribute('termId', termId);
    td.setAttribute('id', `td-${termId}-${row}-${column}`);

    const text = td.innerText;
    td.innerHTML = `
          <input 
            row="${row}"
            column="${column}"
            columnName="${name}"
            termId="${termId}"
            id="input-${termId}-${row}-${column}"
           value="${text}" ${isEdit ? 'readonly="readonly" ' : 'class="input-grade"'} 
          style='border:none; width:100%; height=100%;padding-left:5px; border-radius: 10px !important;  border: none;'> 
          `;
}

const assignKeyAndInputInRow = (tr, rowIndex, termId) => {
    let tds = tr.querySelectorAll('td');
    const disable = listNameSubjectExceptions.includes(tds[2].innerText);

    const subject = {
        rowIndex,
        index: convertGradeToNumber(tds[0].innerText),
        idSubject: convertGradeToNumber(tds[1].innerText),
        name: tds[2].innerText,
        totalCredit: convertGradeToNumber(tds[3].innerText),
        creditPractical: convertGradeToNumber(tds[4].innerText) || 0,
        midTerm: convertGradeToNumber(tds[5].innerText),
        diligence: tds[6].innerText,
        theory1: convertGradeToNumber(tds[7].innerText),
        theory2: convertGradeToNumber(tds[8].innerText),
        theory3: convertGradeToNumber(tds[9].innerText),
        theory4: convertGradeToNumber(tds[10].innerText),
        theory5: convertGradeToNumber(tds[11].innerText),
        theory6: convertGradeToNumber(tds[12].innerText),
        theory7: convertGradeToNumber(tds[13].innerText),
        theory8: convertGradeToNumber(tds[14].innerText),
        theory9: convertGradeToNumber(tds[15].innerText),
        practical1: convertGradeToNumber(tds[16].innerText),
        practical2: convertGradeToNumber(tds[17].innerText),
        practical3: convertGradeToNumber(tds[18].innerText),
        practical4: convertGradeToNumber(tds[19].innerText),
        practical5: convertGradeToNumber(tds[20].innerText),
        endTerm: convertGradeToNumber(tds[21].innerText),
        finalGrade10: convertGradeToNumber(tds[22].innerText),
        finalGrade4: convertGradeToNumber(tds[23].innerText),
        finalGradeChar: tds[24].innerText,
        level: tds[25].innerText,
        description: tds[26].innerText,
        disable
    }


    // ASSIFN KEY
    assignKeyAndInputToSignleRow(tds[0], termId, rowIndex, 0, 'index', true);
    assignKeyAndInputToSignleRow(tds[1], termId, rowIndex, 1, 'idSubject', true);
    assignKeyAndInputToSignleRow(tds[2], termId, rowIndex, 2, 'name', true);
    assignKeyAndInputToSignleRow(tds[3], termId, rowIndex, 3, 'totalCredit', true);
    assignKeyAndInputToSignleRow(tds[4], termId, rowIndex, 4, 'creditPractical', false);
    assignKeyAndInputToSignleRow(tds[5], termId, rowIndex, 5, 'midTerm', false);
    assignKeyAndInputToSignleRow(tds[6], termId, rowIndex, 6, 'diligence', true);
    assignKeyAndInputToSignleRow(tds[7], termId, rowIndex, 7, 'theory1', false);
    assignKeyAndInputToSignleRow(tds[8], termId, rowIndex, 8, 'theory2', false);
    assignKeyAndInputToSignleRow(tds[9], termId, rowIndex, 9, 'theory3', false);
    assignKeyAndInputToSignleRow(tds[10], termId, rowIndex, 10, 'theory4', false);
    assignKeyAndInputToSignleRow(tds[11], termId, rowIndex, 11, 'theory5', false);
    assignKeyAndInputToSignleRow(tds[12], termId, rowIndex, 12, 'theory6', false);
    assignKeyAndInputToSignleRow(tds[13], termId, rowIndex, 13, 'theory7', false);
    assignKeyAndInputToSignleRow(tds[14], termId, rowIndex, 14, 'theory8', false);
    assignKeyAndInputToSignleRow(tds[15], termId, rowIndex, 15, 'theory9', false);
    assignKeyAndInputToSignleRow(tds[16], termId, rowIndex, 16, 'practical1', false);
    assignKeyAndInputToSignleRow(tds[17], termId, rowIndex, 17, 'practical2', false);
    assignKeyAndInputToSignleRow(tds[18], termId, rowIndex, 18, 'practical3', false);
    assignKeyAndInputToSignleRow(tds[19], termId, rowIndex, 19, 'practical4', false);
    assignKeyAndInputToSignleRow(tds[20], termId, rowIndex, 20, 'practical5', false);
    assignKeyAndInputToSignleRow(tds[21], termId, rowIndex, 21, 'endTerm', false);
    assignKeyAndInputToSignleRow(tds[22], termId, rowIndex, 22, 'finalGrade10', true);
    assignKeyAndInputToSignleRow(tds[23], termId, rowIndex, 23, 'finalGrade4', true);
    assignKeyAndInputToSignleRow(tds[24], termId, rowIndex, 24, 'finalGradeChar', true);
    assignKeyAndInputToSignleRow(tds[25], termId, rowIndex, 25, 'level', true);
    assignKeyAndInputToSignleRow(tds[26], termId, rowIndex, 26, 'description', true);


    return subject

}

const getOneRowOverviewAndAsignKey = (tr, termId, columnName1, columnName2, isNumber) => {
    let tds = tr.querySelectorAll('td');

    const element1 = tds[0].querySelector('span:last-child');
    element1.setAttribute('termId', termId);
    element1.setAttribute('id', `span-${termId}-${columnName1}`);

    const element2 = tds[1].querySelector('span:last-child');
    element2.setAttribute('termId', termId);
    element2.setAttribute('id', `span-${termId}-${columnName2}`);

    const value1 = isNumber ? convertGradeToNumber(element1?.textContent) : element1?.textContent;
    const value2 = isNumber ? convertGradeToNumber(element2?.textContent) : element2?.textContent;

    return [value1, value2]
}

const getOverviewsAndAsignKey = (tr, termId) => {
    const [avg10, avg4] = getOneRowOverviewAndAsignKey(tr, termId, 'avg10', 'avg4', true);

    tr = tr.nextElementSibling;
    const [avgAccumulator10, avgAccumulator4] = getOneRowOverviewAndAsignKey(tr, termId, 'avgAccumulator10', 'avgAccumulator4', true);

    tr = tr.nextElementSibling;
    const [totalCreditRegister, totalCreditAccumulator] = getOneRowOverviewAndAsignKey(tr, termId, 'totalCreditRegister', 'totalCreditAccumulator', true);

    tr = tr.nextElementSibling;
    const [totalCreditPass, totalCreditFail] = getOneRowOverviewAndAsignKey(tr, termId, 'totalCreditPass', 'totalCreditFail', true);

    tr = tr.nextElementSibling;
    const [levelAccumulator, levelTerm] = getOneRowOverviewAndAsignKey(tr, termId, 'levelAccumulator', 'levelTerm', false);


    return {
        avg10,
        avg4,
        avgAccumulator10,
        avgAccumulator4,
        totalCreditRegister,
        totalCreditAccumulator,
        totalCreditPass,
        totalCreditFail,
        levelAccumulator,
        levelTerm,
    }
}

// const grade = {
//         startRowIndex: 0,
//         term: String,
//         subjects: [
//             {
//                 index: 0,
//                 idClass: 1,
//                 name: 2,
//                 totalCredit: 3,
//                 creditPractical: 4,
//                 midTerm: 5,
//                 diligence: 6,
//                 theory1: 7,
//                 theory2: 8,
//                 theory3: 9,
//                 theory4: 10,
//                 theory5: 11,
//                 theory6: 12,
//                 theory7: 13,
//                 theory8: 14,
//                 theory9: 15,
//                 practical1: 16,
//                 practical2: 17,
//                 practical3: 18,
//                 practical4: 19,
//                 practical5: 20,
//                 endTerm: 21,
//                 finalGrade10: 22,
//                 finalGrade4: 23,
//                 finalGradeChar: 24,
//                 level: 25,
//                 description: 26,
//                 rowIndex: 1,
//                 disable:false
//             }
//         ]
//         overview:{
//             avg10: number;
//             avg4: number;
//             avgAccumulator10: number;
//             avgAccumulator4: number;
//             totalCreditRegister: number;
//             totalCreditAccumulator: number;
//             totalCreditPass: number;
//             totalCreditFail: number;
//             levelAccumulator: String;
//             levelTerm: String;
//         }
// }
