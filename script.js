const TOTAL_MEMBERS = 20;
const STORAGE_KEY = "shg_calculator_data_v16";

// 12 உறுப்பினர்களின் 100% சரியான நோட்டுப் புத்தகத் தரவுகள்
const bookData = [
  { name: "திலகவதி", c2: 5600, c3: 200, c4: 5800, c5: 28500, c6: 28500, c7: 12000, c8: 0, c9: 12000, c10: 3460, c11: 0, c12: 3760 },
  { name: "அன்பழகி", c2: 5600, c3: 200, c4: 5800, c5: 18000, c6: 3500, c7: 0, c8: 1000, c9: 7500, c10: 1080, c11: 160, c12: 1160 },
  { name: "கற்பகம்", c2: 5600, c3: 200, c4: 5800, c5: 9000, c6: 4000, c7: 0, c8: 500, c9: 3500, c10: 900, c11: 80, c12: 1280 },
  { name: "அலமேலு", c2: 5600, c3: 200, c4: 5800, c5: 10000, c6: 9000, c7: 0, c8: 0, c9: 1000, c10: 1200, c11: 0, c12: 1800 },
  { name: "சிவகாமி", c2: 5600, c3: 200, c4: 5800, c5: 21000, c6: 18000, c7: 0, c8: 1000, c9: 12000, c10: 2900, c11: 260, c12: 2760 },
  { name: "அஞ்சாலாட்சி", c2: 5600, c3: 200, c4: 5800, c5: 0, c6: 0, c7: 0, c8: 0, c9: 0, c10: 0, c11: 0, c12: 400 },
  { name: "கம்சலா", c2: 5600, c3: 200, c4: 5800, c5: 21500, c6: 19500, c7: 0, c8: 500, c9: 4500, c10: 2680, c11: 100, c12: 1660 },
  { name: "சுந்தரி", c2: 5600, c3: 200, c4: 5800, c5: 22000, c6: 16500, c7: 0, c8: 500, c9: 5000, c10: 4100, c11: 160, c12: 2700 },
  { name: "லதா", c2: 5600, c3: 200, c4: 5800, c5: 57500, c6: 25500, c7: 0, c8: 2500, c9: 29500, c10: 2050, c11: 640, c12: 3740 },
  { name: "இருச்சம்மாள்", c2: 5600, c3: 200, c4: 5800, c5: 9000, c6: 8500, c7: 0, c8: 0, c9: 500, c10: 1020, c11: 10, c12: 13930 },
  { name: "சகாயபார்திமா", c2: 5600, c3: 200, c4: 5800, c5: 11500, c6: 1000, c7: 0, c8: 1000, c9: 9500, c10: 450, c11: 210, c12: 5460 },
  { name: "குப்பு", c2: 5600, c3: 200, c4: 5800, c5: 16500, c6: 1000, c7: 0, c8: 500, c9: 9000, c10: 1680, c11: 190, c12: 4170 }
];

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
      <td><input type="number" placeholder="0" id="c2_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c3_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c4_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c5_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c6_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c7_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c8_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c9_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c10_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c11_${i}" oninput="calculateRow(${i}); calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c12_${i}" oninput="calculateAll(); autoSave();" /></td>
    `;
    tbody.appendChild(tr);
  }
}

function calculateRow(i) {
  const c2 = numVal(`c2_${i}`);
  const c3 = numVal(`c3_${i}`);
  const c5 = numVal(`c5_${i}`);
  const c6 = numVal(`c6_${i}`);
  const c7 = numVal(`c7_${i}`);
  const c8 = numVal(`c8_${i}`);
  const c11 = numVal(`c11_${i}`);

  const el4 = document.getElementById(`c4_${i}`);
  const el9 = document.getElementById(`c9_${i}`);
  const el12 = document.getElementById(`c12_${i}`);

  if (el4 && el4.value === "") el4.value = (c2 || c3) ? (c2 + c3) : "";
  if (el9 && el9.value === "") el9.value = (c5 || c7 || c6) ? Math.max(0, (c5 + c7) - c6) : "";
  if (el12 && el12.value === "") el12.value = (c3 || c8 || c11) ? (c3 + c8 + c11) : "";
}

function calculateAll() {
  let t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0;

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    t2 += numVal(`c2_${i}`);
    t3 += numVal(`c3_${i}`);
    t4 += numVal(`c4_${i}`);
    t5 += numVal(`c5_${i}`);
    t6 += numVal(`c6_${i}`);
    t7 += numVal(`c7_${i}`);
    t8 += numVal(`c8_${i}`);
    t9 += numVal(`c9_${i}`);
    t10 += numVal(`c10_${i}`);
    t11 += numVal(`c11_${i}`);
    t12 += numVal(`c12_${i}`);
  }

  // அட்டவணை கூட்டுத்தொகைகள் (Footer)
  setText("tot_2", t2); setText("tot_3", t3); setText("tot_4", t4);
  setText("tot_5", t5); setText("tot_6", t6); setText("tot_7", t7);
  setText("tot_8", t8); setText("tot_9", t9); setText("tot_10", t10);
  setText("tot_11", t11); setText("tot_12", t12);

  // சுருக்கக் கட்டத் தொகைகள்
  const bankInt = numVal("rec_bank_int");
  const otherInc = numVal("rec_other");
  const expense = numVal("rec_expense");
  const passbook = numVal("rec_passbook");

  const repaidTot = t6; 
  const loanGiven = t5 + t7;

  setField("rec_savings", t4);
  setField("rec_loan", t5);
  setField("rec_repaid", repaidTot);
  setField("rec_interest", t11);
  setField("rec_left_total", t4 + t5 + repaidTot + t11 + bankInt + otherInc);

  setField("rec_loan_given", loanGiven);
  setField("rec_right_total", loanGiven + expense + passbook);

  // வங்கியில் செலுத்தியது: இம்மாத சேமிப்பு + கடன் அசல் தவணை + வட்டி (3+8+11 = ₹11,710)
  const actualDeposit = t3 + t8 + t11;
  setField("rec_bank_deposit", actualDeposit);
}

function loadBookData() {
  bookData.forEach((d, i) => {
    document.getElementById(`name_${i}`).value = d.name;
    document.getElementById(`c2_${i}`).value = d.c2;
    document.getElementById(`c3_${i}`).value = d.c3;
    document.getElementById(`c4_${i}`).value = d.c4;
    document.getElementById(`c5_${i}`).value = d.c5;
    document.getElementById(`c6_${i}`).value = d.c6;
    document.getElementById(`c7_${i}`).value = d.c7;
    document.getElementById(`c8_${i}`).value = d.c8;
    document.getElementById(`c9_${i}`).value = d.c9;
    document.getElementById(`c10_${i}`).value = d.c10;
    document.getElementById(`c11_${i}`).value = d.c11;
    document.getElementById(`c12_${i}`).value = d.c12;
  });

  for (let i = 12; i < TOTAL_MEMBERS; i++) {
    document.getElementById(`name_${i}`).value = "";
    document.getElementById(`c2_${i}`).value = "";
    document.getElementById(`c3_${i}`).value = "";
    document.getElementById(`c4_${i}`).value = "";
    document.getElementById(`c5_${i}`).value = "";
    document.getElementById(`c6_${i}`).value = "";
    document.getElementById(`c7_${i}`).value = "";
    document.getElementById(`c8_${i}`).value = "";
    document.getElementById(`c9_${i}`).value = "";
    document.getElementById(`c10_${i}`).value = "";
    document.getElementById(`c11_${i}`).value = "";
    document.getElementById(`c12_${i}`).value = "";
  }

  document.getElementById("entry_date").value = "2026-03-10";
  document.getElementById("entry_month").value = "மார்ச் 2026";
  document.getElementById("rec_bank_int").value = 4300;
  document.getElementById("rec_other").value = 0; // இதர வரவுகள் பூஜ்ஜியமாக அமைக்கப்பட்டது
  document.getElementById("rec_expense").value = 33582;
  document.getElementById("rec_passbook").value = 134;

  calculateAll();
  autoSave();
  updateStatus("அசல் நோட்டுப் புத்தகத் தரவுகள் ஏற்றப்பட்டன ✓");
}

function autoSave() {
  const store = {
    date: document.getElementById("entry_date")?.value || "",
    month: document.getElementById("entry_month")?.value || "",
    members: [],
    summary: {
      bankInt: document.getElementById("rec_bank_int")?.value || "",
      other: document.getElementById("rec_other")?.value || "",
      expense: document.getElementById("rec_expense")?.value || "",
      passbook: document.getElementById("rec_passbook")?.value || ""
    }
  };

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    store.members.push({
      name: document.getElementById(`name_${i}`)?.value || "",
      c2: document.getElementById(`c2_${i}`)?.value || "",
      c3: document.getElementById(`c3_${i}`)?.value || "",
      c4: document.getElementById(`c4_${i}`)?.value || "",
      c5: document.getElementById(`c5_${i}`)?.value || "",
      c6: document.getElementById(`c6_${i}`)?.value || "",
      c7: document.getElementById(`c7_${i}`)?.value || "",
      c8: document.getElementById(`c8_${i}`)?.value || "",
      c9: document.getElementById(`c9_${i}`)?.value || "",
      c10: document.getElementById(`c10_${i}`)?.value || "",
      c11: document.getElementById(`c11_${i}`)?.value || "",
      c12: document.getElementById(`c12_${i}`)?.value || ""
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function loadSavedData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById("entry_date");
    if (dateInput) dateInput.value = today;
    loadBookData();
    return;
  }

  try {
    const store = JSON.parse(raw);
    if (store.date) document.getElementById("entry_date").value = store.date;
    if (store.month) document.getElementById("entry_month").value = store.month;

    if (store.members) {
      store.members.forEach((m, i) => {
        if (i < TOTAL_MEMBERS) {
          document.getElementById(`name_${i}`).value = m.name || "";
          document.getElementById(`c2_${i}`).value = m.c2 || "";
          document.getElementById(`c3_${i}`).value = m.c3 || "";
          document.getElementById(`c4_${i}`).value = m.c4 || "";
          document.getElementById(`c5_${i}`).value = m.c5 || "";
          document.getElementById(`c6_${i}`).value = m.c6 || "";
          document.getElementById(`c7_${i}`).value = m.c7 || "";
          document.getElementById(`c8_${i}`).value = m.c8 || "";
          document.getElementById(`c9_${i}`).value = m.c9 || "";
          document.getElementById(`c10_${i}`).value = m.c10 || "";
          document.getElementById(`c11_${i}`).value = m.c11 || "";
          document.getElementById(`c12_${i}`).value = m.c12 || "";
        }
      });
    }

    if (store.summary) {
      document.getElementById("rec_bank_int").value = store.summary.bankInt || "";
      document.getElementById("rec_other").value = store.summary.other !== undefined ? store.summary.other : 0;
      document.getElementById("rec_expense").value = store.summary.expense || "";
      document.getElementById("rec_passbook").value = store.summary.passbook || "";
    }

    calculateAll();
  } catch (e) {
    console.error("Load error:", e);
    loadBookData();
  }
}

function numVal(id) {
  const el = document.getElementById(id);
  return el && el.value !== "" ? parseFloat(el.value) || 0 : 0;
}

function setField(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = (val !== undefined && val !== null && val !== "") ? Number(val).toLocaleString("en-IN") : "0";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = (val !== undefined && val !== null && val !== "") ? Number(val).toLocaleString("en-IN") : "0";
}

function manualSave() {
  autoSave();
  alert("டேட்டா வெற்றிகரமாக சேமிக்கப்பட்டது!");
}

function clearData() {
  if (confirm("அனைத்து டேட்டாக்களையும் அழிக்கவா?")) {
    localStorage.removeItem(STORAGE_KEY);
    createRows();
    document.getElementById("entry_date").value = "";
    document.getElementById("entry_month").value = "";
    document.getElementById("rec_bank_int").value = "";
    document.getElementById("rec_other").value = "0";
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

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function closeOnOverlay(e, id) {
  if (e.target.id === id) closeModal(id);
}

window.onload = initApp;
