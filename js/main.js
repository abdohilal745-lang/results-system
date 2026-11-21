class Student {
  #grade1; #grade2; #grade3; #attendance;

  constructor(name, g1, g2, g3, attendance) {
    this.name = name;
    this.grade1 = g1;
    this.grade2 = g2;
    this.grade3 = g3;
    this.attendance = attendance;
  }

  static #validate(value, label) {
    if (value === "" || value === null || value === undefined || Number.isNaN(Number(value))) {
      throw new Error(`${label}: الحقل فارغ أو غير صالح`);
    }
    const n = Number(value);
    if (n < 0 || n > 100) {
      throw new Error(`${label}: يجب أن تكون القيمة بين 0 و 100`);
    }
    return n;
  }

  set name(v) {
    if (!v || !v.trim()) throw new Error("اسم الطالب: الحقل فارغ");
    this._name = v.trim();
  }
  get name() { return this._name; }

  set grade1(v) { this.#grade1 = Student.#validate(v, "درجة المادة الأولى"); }
  get grade1() { return this.#grade1; }
  set grade2(v) { this.#grade2 = Student.#validate(v, "درجة المادة الثانية"); }
  get grade2() { return this.#grade2; }
  set grade3(v) { this.#grade3 = Student.#validate(v, "درجة المادة الثالثة"); }
  get grade3() { return this.#grade3; }
  set attendance(v) { this.#attendance = Student.#validate(v, "نسبة الحضور"); }
  get attendance() { return this.#attendance; }

  get average() {
    return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
  }
}

const studentsList = [];

const nameInput = document.getElementById("studentName");
const g1Input = document.getElementById("grade1");
const g2Input = document.getElementById("grade2");
const g3Input = document.getElementById("grade3");
const attInput = document.getElementById("attendance");
const addBtn = document.getElementById("addBtn");
const mercyBtn = document.getElementById("mercyBtn");
const errorBox = document.getElementById("errorBox");
const listBox = document.getElementById("listBox");
const reportBox = document.getElementById("reportBox");

addBtn.onclick = function () {
  try {
    errorBox.textContent = "";
    const s = new Student(nameInput.value, g1Input.value, g2Input.value, g3Input.value, attInput.value);
    studentsList.push(s);
    listBox.innerHTML = `<ul>${studentsList
      .map(st => `<li>${st.name} — المتوسط: ${st.average.toFixed(1)}</li>`)
      .join("")}</ul>`;
    [nameInput, g1Input, g2Input, g3Input, attInput].forEach(i => (i.value = ""));
  } catch (error) {
    errorBox.textContent = error.message;
  }
};

mercyBtn.onclick = function () {
  const failing = studentsList.filter(s => s.average >= 40 && s.average <= 49);
  const adjusted = failing.map(s => ({ name: s.name, newAvg: s.average + 5 }));
  const total = adjusted.reduce((sum, s) => sum + s.newAvg, 0);
  const overall = adjusted.length > 0 ? total / adjusted.length : 0;

  reportBox.innerHTML = adjusted.length === 0
    ? "لا يوجد طلاب متعثرون."
    : `
      <p>عدد الطلاب المتعثرين: ${adjusted.length}</p>
      <ul>${adjusted.map(s => `<li>${s.name} — ${s.newAvg.toFixed(1)}</li>`).join("")}</ul>
      <p>المتوسط العام بعد الرأفة: ${overall.toFixed(1)
