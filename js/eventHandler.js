"use strict";

const addEventToGrade = () => {
  const gradesInput = document.querySelectorAll("input.input-grade");
  gradesInput.forEach((gradeInput) => {
    gradeInput.addEventListener("keyup", handlerUpdateGrade);
  });
  calculatorOverviewLastTerm();
};
const handlerUpdateGrade = (event) => {
  let validate = false;
  const isCreditInput =
    event.target.getAttribute("columnname") == "creditPractical";
  const row = event.target.getAttribute("row");
  const termId = event.target.getAttribute("termId");
  const column = event.target.getAttribute("column");
  const id = event.target.getAttribute("id");
  const columnNameValue = event.target.getAttribute("columnname");
  const value = event.target.value;

  if (isCreditInput) {
    // column credit
    const columntotalCredit = columnName.totalCredit;
    const inputtotalCredit = document.getElementById(
      `input-${termId}-${row}-${columntotalCredit}`
    );
    console.log({
      inputtotalCredit,
      text: `input-${termId}-${row}-${columntotalCredit}`,
    });
    validate = checkCreditValidation(
      event,
      convertGradeToNumber(inputtotalCredit?.value) || 10
    );
  } else validate = checkGradeValidation(event);

  if (!validate || value == "") {
    return;
  }
  // add new value into grade
  const term = grades.find((term) => term.termId == termId);

  if (!term) return alert("Không thể tín điểm");

  const subject = term.subjects.find((subject) => subject.rowIndex == row);
  subject[columnNameValue] = value;

  const finalGrade10 = endTermCalculator(
    subject.totalCredit,
    subject.creditPractical,
    subject.midTerm,
    subject.endTerm,
    [
      subject.theory1,
      subject.theory2,
      subject.theory3,
      subject.theory4,
      subject.theory5,
      subject.theory6,
      subject.theory7,
      subject.theory8,
      subject.theory9,
    ],
    [
      subject.practical1,
      subject.practical2,
      subject.practical3,
      subject.practical4,
      subject.practical5,
    ]
  );
  console.log({ finalGrade10 });

  if (finalGrade10 == undefined || isNaN(finalGrade10)) return;

  const overviewSubject = convertGrade10(finalGrade10);

  subject.finalGrade10 = finalGrade10;
  subject.finalGrade4 = overviewSubject.finalGrade4;
  subject.finalGradeChar = overviewSubject.finalGradeChar;
  subject.level = overviewSubject.level;

  updateOverviewSubjectInView(termId, row, subject);

  calculatorOverviewTerm(term);

  updateOverviewTermInView(termId);

  // update all term after this term
  updateOverviewFromTerm(termId);
  updateOverviewInViewFromTerm(termId);
};

const calculatorOverviewLastTerm = () => {
  const lastTerm = grades[grades.length - 1];
  console.log(lastTerm);
  calculatorOverviewTerm(lastTerm);
  updateOverviewTermInView(lastTerm.termId);
  updateOverviewFromTerm(lastTerm.termId);
  updateOverviewInViewFromTerm(lastTerm.termId);
};

const updateOverviewSubjectInView = (termId, rowId, subject) => {
  const inputFinalGrade10 = document.getElementById(
    `input-${termId}-${rowId}-${columnName.finalGrade10}`
  );
  const inputFinalGrade4 = document.getElementById(
    `input-${termId}-${rowId}-${columnName.finalGrade4}`
  );
  const inputFinalGradeChar = document.getElementById(
    `input-${termId}-${rowId}-${columnName.finalGradeChar}`
  );
  const inputLevel = document.getElementById(
    `input-${termId}-${rowId}-${columnName.level}`
  );
  const inputdescription = document.getElementById(
    `input-${termId}-${rowId}-${columnName.description}`
  );

  inputFinalGrade10.value = convertGradeToNumberView(subject.finalGrade10);
  inputFinalGrade4.value = convertGradeToNumberView(subject.finalGrade4);
  inputFinalGradeChar.value = subject.finalGradeChar;
  inputLevel.value = subject.level;

  if (subject.finalGrade4 == 0) {
    inputdescription.value = "Rớt môn";
  } else {
    inputdescription.value = "";
  }
};

const updateOverviewTermInView = (termId) => {
  const spanAvg4 = document.getElementById(`span-${termId}-avg4`);
  const spanAvg10 = document.getElementById(`span-${termId}-avg10`);
  const spanLevelTerm = document.getElementById(`span-${termId}-levelTerm`);
  const spanAvgAccumulator4 = document.getElementById(
    `span-${termId}-avgAccumulator4`
  );
  const spanAvgAccumulator10 = document.getElementById(
    `span-${termId}-avgAccumulator10`
  );
  const spanLevelAccumulator = document.getElementById(
    `span-${termId}-levelAccumulator`
  );

  const term = grades.find((term) => term.termId == termId);

  spanAvg4.innerText = " " + convertGradeToNumberView(term.overview.avg4);
  spanAvg10.innerText =
    " " + convertGradeToNumberView(term.overview.avg10, 1) + "0";
  spanLevelTerm.innerText = " " + term.overview.levelTerm;

  spanAvgAccumulator4.innerText =
    " " + convertGradeToNumberView(term.overview.avgAccumulator4);
  spanAvgAccumulator10.innerText =
    " " + convertGradeToNumberView(term.overview.avgAccumulator10, 1) + "0";
  spanLevelAccumulator.innerText = " " + term.overview.levelAccumulator;
};
const updateOverviewFromTerm = (termId) => {
  console.log("updateOverviewFromTerm" + termId);
  const indexTerm = grades.findIndex((term) => term.termId == termId);
  const lengthTerm = grades.length;
  if (indexTerm == -1) return;
  for (let i = indexTerm; i < lengthTerm; i++) {
    const prevertTerm = grades[i - 1];
    const term = grades[i];

    const avg4 =
      term.subjects.reduce((avg4, subject) => {
        if (subject.disable) {
          return avg4;
        }
        return avg4 + subject.finalGrade4 * subject.totalCredit;
      }, 0) / term.totalCredit;

    const avg10 =
      term.subjects.reduce((avg10, subject) => {
        if (subject.disable) {
          return avg10;
        }
        return avg10 + subject.finalGrade10 * subject.totalCredit;
      }, 0) / term.totalCredit;

    if (!prevertTerm) continue;
    const totalCredit = term.totalCredit + prevertTerm.totalCreditAccumulator;

    const avgAccumulator4 =
      (avg4 * term.totalCredit +
        prevertTerm.overview.avgAccumulator4 *
          prevertTerm.totalCreditAccumulator) /
      totalCredit;
    const avgAccumulator10 =
      (avg10 * term.totalCredit +
        prevertTerm.overview.avgAccumulator10 *
          prevertTerm.totalCreditAccumulator) /
      totalCredit;

    const levelAccumulator = findOverTermLevelByGrade4(
      term.overview.avgAccumulator4
    );

    term.overview.avgAccumulator4 = avgAccumulator4;
    term.overview.avgAccumulator10 = avgAccumulator10;
    term.overview.levelAccumulator = levelAccumulator;
  }
};
const updateOverviewInViewFromTerm = (termId) => {
  const indexTerm = grades.findIndex((term) => term.termId == termId);
  const lengthTerm = grades.length;
  if (indexTerm == -1) return;
  for (let i = indexTerm; i < lengthTerm; i++) {
    const term = grades[i];
    updateOverviewTermInView(term.termId);
  }
};
