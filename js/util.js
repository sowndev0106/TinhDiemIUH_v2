const columnName = {
    index: 0,
    idClass: 1,
    name: 2,
    totalCredit: 3,
    creditPractical: 4,
    midTerm: 5,
    diligence: 6,
    theory1: 7,
    theory2: 8,
    theory3: 9,
    theory4: 10,
    theory5: 11,
    theory6: 12,
    theory7: 13,
    theory8: 14,
    theory9: 15,
    practical1: 16,
    practical2: 17,
    practical3: 18,
    practical4: 19,
    practical5: 20,
    endTerm: 21,
    finalGrade10: 22,
    finalGrade4: 23,
    finalGradeChar: 24,
    level: 25,
    description: 26
}
var listNameSubjectExceptions = [
    "Giáo dục Quốc phòng và an ninh 1",
    "Giáo dục Quốc phòng và an ninh 2",
    "Giáo dục thể chất 1",
    "Giáo dục thể chất 2",
    "Tiếng Anh 2",
    "Tiếng Anh 1",
];
const convertGradeToNumber = (grade) => {
    if (!grade) return NaN
    return Number(String(grade).trim().replace(',', '.'));
}

const convertGradeToNumberView = (grade) => {
    if (grade == undefined || isNaN(grade)) return ""
    return String(Number(grade).toFixed(2)).trim().replace('.', ',');
}
const filterColumTheoryOrPracticals = (arrays) => {
    return arrays.filter(e => {
        if (e != "" && !isNaN(convertGradeToNumber(e)))
            return true
        return false
    }).map(e => convertGradeToNumber(e));
}

function checkGradeValidation(e) {
    if (!e) {
        return false;
    }
    const target = e.target;

    const value = e.target.value.trim();
    if (value == "") {
        target.style.color = "#667580";
        target.style.backgroundColor = "white";
        return true;
    }

    if (
        !/^[0-9,.]+$/.test(value) ||
        parseFloat(value) < 0 ||
        parseFloat(value) > 10
    ) {
        target.style.backgroundColor = " #d42626";
        target.style.color = "white";
        return false;
    }

    if (convertGradeToNumber(value) <= 5) {
        target.style.color = "red";
    } else {
        target.style.color = "#667580";
    }

    target.style.backgroundColor = "white";

    return true;
}

function checkCreditValidation(e, maxCredit) {
    if (!e) {
        return false;
    }

    const target = e.target;
    const value = e.target.value.trim();

    if (value == "") {
        target.style.color = "#667580";
        target.style.backgroundColor = "white";
        return true;
    }

    if (
        !/^[0-9]+$/.test(value) ||
        convertGradeToNumber(value) < 0 ||
        convertGradeToNumber(value) >= maxCredit
    ) {
        target.style.backgroundColor = " #d42626";
        target.style.color = "white";
        return false;
    }

    return true;
}

const endTermCalculator = (totalCredit, creditPractical, midTerm, endTerm, theorys, practicals) => {
    console.log({ totalCredit, creditPractical, midTerm, endTerm, theorys, practicals })
    endTerm = convertGradeToNumber(endTerm);
    creditPractical = convertGradeToNumber(creditPractical) || 1;
    totalCredit = convertGradeToNumber(totalCredit);
    midTerm = convertGradeToNumber(midTerm);
    theorys = filterColumTheoryOrPracticals(theorys);
    practicals = filterColumTheoryOrPracticals(practicals);
    console.log({ totalCredit, creditPractical, midTerm, endTerm, theorys, practicals })
    if (this.endterm === -1) {
        return undefined;
    }
    if (this.endterm < 3) {
        return 0;
    }
    const gradeTheory = calculatorTheory(theorys, midTerm, endTerm)

    if (!practicals || practicals.length == 0) {
        return gradeTheory.toFixed(1)
    }

    // subject have practicals grade
    const creditTheory = totalCredit - creditPractical;
    const gradeSubject10 = calculatorPractical(practicals, creditPractical, gradeTheory, creditTheory)

    return gradeSubject10.toFixed(1) 

}
const calculatorPractical = (practicals, creditPractical, gradeTheory, creditTheory) => {
    let gradePractical =
        practicals.reduce((a, b) => a + b) / practicals.length;
    const totalCredit = creditTheory + creditPractical
    const gradeSubject10 =
        Math.round(((gradeTheory * creditTheory + gradePractical * creditPractical) / totalCredit));

    return gradeSubject10;
}

const calculatorTheory = (theorys, midTerm, endTerm) => {
    if (theorys.length == 0) {
        if (!midTerm) {
            return endTerm;
        }
        return endTerm * 0.5 + midTerm * 0.4;
    }
    let total = theorys.reduce((a, b) => a + b) / theorys.length;
    return total * 0.2 + midTerm * 0.3 + endTerm * 0.5;

}


function convertGrade10(result) {
    var score;
    if (result >= 9) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 4.0,
            finalGradeChar: "A+",
            level: "Xuất sắc"
        });
    }
    if (result >= 8.5) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 3.8,
            finalGradeChar: "A",
            level: "Giỏi"
        });
    }
    if (result >= 8.0) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 3.5,
            finalGradeChar: "B+",
            level: "Khá"
        });
    }
    if (result >= 7.0) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 3.0,
            finalGradeChar: "B",
            level: "Khá"
        });
    }
    if (result >= 6.0) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 2.5,
            finalGradeChar: "C+",
            level: "Trung bình"
        });
    }
    if (result >= 5.5) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 2.0,
            finalGradeChar: "C",
            level: "Trung Binh"
        });
    }
    if (result >= 5.0) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 1.5,
            finalGradeChar: "D+",
            level: "Trung Bình yếu"
        });
    }
    if (result >= 4.0) {
        return (score = {
            finalGrade10: result,
            finalGrade4: 1.0,
            finalGradeChar: "D",
            level: "Trung bình yếu"
        });
    }
    // Rot mon
    return (score = {
        finalGrade10: result,
        finalGrade4: 0,
        finalGradeChar: "F",
        level: "Kém"
    });
}

function findOverTermLevelByGrade4(grade4) {
    if (grade4 >= 3.6)
        return 'Xuất sắc';
    if (grade4 >= 3.2)
        return 'Giỏi';
    if (grade4 >= 2.5)
        return 'Khá';
    if (grade4 >= 2)
        return 'Trung bình';
    if (grade4 >= 1)
        return 'Trung bình yếu';
    return 'Kém';
}

const calculatorOverviewTerm = (term) => {

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
        term.overview.avg4 = NaN
        term.overview.avg10 = NaN
        term.overview.levelTerm = ""
        return
    }

    overviewTerm.finalGrade10 = overviewTerm.totalGrade10 / overviewTerm.totalCredit
    overviewTerm.finalGrade4 = overviewTerm.totalGrade4 / overviewTerm.totalCredit
    overviewTerm.level = findOverTermLevelByGrade4(overviewTerm.finalGrade4)

    term.overview.avg4 = overviewTerm.finalGrade4
    term.overview.avg10 = overviewTerm.finalGrade10
    term.overview.levelTerm = overviewTerm.level

    if (term.termId == 0) {
        term.overview.avgAccumulator4 = overviewTerm.finalGrade4
        term.overview.avgAccumulator10 = overviewTerm.finalGrade10
        term.overview.levelAccumulator = overviewTerm.level
    }

    return term
}