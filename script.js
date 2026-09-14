const TOTAL_MEMBERS = 20;
const STORAGE_KEY = "shg_calculator_data_v3";

function initApp() {
  createRows();
  loadSavedData();
}

function createRows() {
  const tbody = document.getElementById("memberList");
  tbody.innerHTML = "";

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><input type="text" class="text-left" placeholder="பெயர் ${i + 1}" id="name_${i}" oninput="autoSave()" /></td>
      <td><input type="number" placeholder="0" id="c2_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c3_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" class="ro" readonly id="c4_${i}" /></td>
      <td><input type="number" placeholder="0" id="c5_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c6_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c7_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c8_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" class="ro" readonly id="c9_${i}" /></td>
      <td><input type="number" placeholder="0" id="c10_${i}" oninput="autoSave()" /></td>
      <td><input type="number" placeholder="0" id="c11_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" class="ro" readonly id="c12_${i}" /></td>
    `;
    tbody.appendChild(tr);
  }
}

function calculateAll() {
  let t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0;

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    const c2 = numVal(`c2_${i}`);
    const c3 = numVal(`c3_${i}`);
    const c5 = numVal(`c5_${i}`);
    const c6 = numVal(`c6_${i}`);
    const c7 = numVal(`c7_${i}`);
    const c8 = numVal(`c8_${i}`);
    const c10 = numVal(`c10_${i}`);
    let c11 = numVal(`c11_${i}`);

    const c4 = c2 + c3;
    const c9 = Math.max(0, (c5 + c7) - (c6 + c8));

    const input11 = document.getElementById(`c11_${i}`);
    if (input11 && input11.value === "" && c9 > 0) {
      c11 = Math.round(c9 * 0.01);
      input11.placeholder = c11;
    }

    const c12 = c3 + c8 + c11;

    setField(`c4_${i}`, c4);
    setField(`c9_${i}`, c9);
    setField(`c12_${i}`, c12);

    t2 += c2; t3 += c3; t4 += c4;
    t5 += c5; t6 += c6; t7 += c7;
    t8 += c8; t9 += c9; t10 += c10;
    t11 += c11; t12 += c12;
  }

  setText("tot_2", t2); setText("tot_3", t3); setText("tot_4", t4);
  setText("tot_5", t5); setText("tot_6", t6); setText("tot_7", t7);
  setText("tot_8", t8); setText("tot_9", t9); setText("tot_10", t10);
  setText("tot_11", t11); setText("tot_12", t12);

  const repaidTot = t6 + t8;
  const bankInt = numVal("rec_bank_int");
  const otherInc = numVal("rec_other");
  const loanGiven = t5 + t7;
  const expense = numVal("rec_expense");
  const passbook = numVal("rec_passbook");

  setField("rec_savings", t4);
  setField("rec_loan", t5);
  setField("rec_repaid", repaidTot);
  setField("rec_interest", t11);
  setField("rec_left_total", t4 + t5 + repaidTot + t11 + bankInt + otherInc);

  setField("rec_loan_given", loanGiven);
  setField("rec_right_total", loanGiven + expense + passbook);
  setField("rec_bank_deposit", t3 + t8 + t11);
}

function autoSave() {
  const store = {
    members: [],
    summary: {
      bankInt: document.getElementById("rec_bank_int").value,
      other: document.getElementById("rec_other").value,
      expense: document.getElementById("rec_expense").value,
      passbook: document.getElementById("rec_passbook").value
    }
  };

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    store.members.push({
      name: document.getElementById(`name_${i}`).value,
      c2: document.getElementById(`c2_${i}`).value,
      c3: document.getElementById(`c3_${i}`).value,
      c5: document.getElementById(`c5_${i}`).value,
      c6: document.getElementById(`c6_${i}`).value,
      c7: document.getElementById(`c7_${i}`).value,
      c8: document.getElementById(`c8_${i}`).value,
      c10: document.getElementById(`c10_${i}`).value,
      c11: document.getElementById(`c11_${i}`).value
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  updateStatus("டேட்டா சேமிக்கப்பட்டது ✓");
}

function loadSavedData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const store = JSON.parse(raw);
    if (store.members) {
      store.members.forEach((m, i) => {
        if (i < TOTAL_MEMBERS) {
          document.getElementById(`name_${i}`).value = m.name || "";
          document.getElementById(`c2_${i}`).value = m.c2 || "";
          document.getElementById(`c3_${i}`).value = m.c3 || "";
          document.getElementById(`c5_${i}`).value = m.c5 || "";
          document.getElementById(`c6_${i}`).value = m.c6 || "";
          document.getElementById(`c7_${i}`).value = m.c7 || "";
          document.getElementById(`c8_${i}`).value = m.c8 || "";
          document.getElementById(`c10_${i}`).value = m.c10 || "";
          document.getElementById(`c11_${i}`).value = m.c11 || "";
        }
      });
    }

    if (store.summary) {
      document.getElementById("rec_bank_int").value = store.summary.bankInt || "";
      document.getElementById("rec_other").value = store.summary.other || "";
      document.getElementById("rec_expense").value = store.summary.expense || "";
      document.getElementById("rec_passbook").value = store.summary.passbook || "";
    }

    calculateAll();
  } catch (e) {
    console.error("Load Error", e);
  }
}

// 1. Roll-Over Feature: நடப்பு கணக்கை அடுத்த மாத ஆரம்ப இருப்பாக மாற்றுதல்
function prepareNextMonth() {
  if (!confirm("நடப்பு மாதத்தின் முடிவை அடுத்த மாதத்தின் தொடக்கக் கணக்காக மாற்றவா? (சேமிப்பு & கடன் பாக்கி மாற்றப்படும்)")) {
    return;
  }

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    const currentTotalSavings = numVal(`c4_${i}`);
    const currentLoanGiven = numVal(`c5_${i}`) + numVal(`c7_${i}`);
    const currentTotalRepaid = numVal(`c6_${i}`) + numVal(`c8_${i}`);

    // அடுத்த மாத ஆரம்ப சேமிப்பு = முந்தைய மொத்த சேமிப்பு (Col 4)
    document.getElementById(`c2_${i}`).value = currentTotalSavings || "";
    document.getElementById(`c3_${i}`).value = ""; // இம்மாத சேமிப்பு காலி

    // அடுத்த மாத ஆரம்ப கடன் = இதுவரை கடன் (Col 5 + Col 7)
    document.getElementById(`c5_${i}`).value = currentLoanGiven || "";
    // அடுத்த மாத ஆரம்ப செலுத்திய தவணை = Col 6 + Col 8
    document.getElementById(`c6_${i}`).value = currentTotalRepaid || "";

    document.getElementById(`c7_${i}`).value = ""; // புதிய கடன் காலி
    document.getElementById(`c8_${i}`).value = ""; // தவணை காலி
    document.getElementById(`c10_${i}`).value = ""; 
    document.getElementById(`c11_${i}`).value = ""; 
  }

  document.getElementById("rec_bank_int").value = "";
  document.getElementById("rec_other").value = "";
  document.getElementById("rec_expense").value = "";
  document.getElementById("rec_passbook").value = "";

  calculateAll();
  autoSave();
  alert("அடுத்த மாதக் கணக்கீட்டிற்கு வெற்றிகரமாக மாற்றப்பட்டது!");
}

// 2. CSV / Excel Export Feature
function exportToCSV() {
  let csv = "\uFEFF"; // UTF-8 BOM தமிழ் எழுத்துக்களுக்காக
  csv += "வ.எண்,உறுப்பினர் பெயர்,முந்தைய சேமிப்பு(2),இம்மாத சேமிப்பு(3),மொத்த சேமிப்பு(4),இதுவரை கடன்(5),செலுத்திய தவணை(6),புதிய கடன்(7),இம்மாத தவணை(8),கடன் பாக்கி(9),வட்டி பாக்கி(10),இம்மாத வட்டி(11),இம்மாத வரவு(12)\n";

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    const row = [
      i + 1,
      `"${document.getElementById(`name_${i}`).value}"`,
      numVal(`c2_${i}`),
      numVal(`c3_${i}`),
      numVal(`c4_${i}`),
      numVal(`c5_${i}`),
      numVal(`c6_${i}`),
      numVal(`c7_${i}`),
      numVal(`c8_${i}`),
      numVal(`c9_${i}`),
      numVal(`c10_${i}`),
      numVal(`c11_${i}`),
      numVal(`c12_${i}`)
    ];
    csv += row.join(",") + "\n";
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `SHG_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function manualSave() {
  autoSave();
  alert("அனைத்து டேட்டாக்களும் வெற்றிகரமாகச் சேமிக்கப்பட்டன!");
}

function clearData() {
  if (confirm("அனைத்து டேட்டாக்களையும் அழிக்கவா?")) {
    localStorage.removeItem(STORAGE_KEY);
    createRows();
    document.getElementById("rec_bank_int").value = "";
    document.getElementById("rec_other").value = "";
    document.getElementById("rec_expense").value = "";
    document.getElementById("rec_passbook").value = "";
    calculateAll();
    updateStatus("டேட்டா அழிக்கப்பட்டது");
  }
}

function updateStatus(msg) {
  const el = document.getElementById("statusMsg");
  if (el) {
    el.innerText = msg;
    setTimeout(() => { el.innerText = "டேட்டா தயாராக உள்ளது"; }, 2500);
  }
}

function numVal(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) || 0 : 0;
}

function setField(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val ? val.toLocaleString("en-IN") : "";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val ? val.toLocaleString("en-IN") : "0";
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function closeOnOverlay(e, id) {
  if (e.target.id === id) {
    closeModal(id);
  }
}

window.onload = initApp;
