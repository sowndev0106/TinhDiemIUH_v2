const columnName = {
    index: 0,
    idClass: 1,
    name: 2,
    sumCredit: 3,
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
    return Number(grade.trim().replace(',', '.'));
}
const filterColumTheoryOrPracticals = (arrays) => {
    return arrays.filter(e => e != "").map(e => convertGradeToNumber(e));
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
}