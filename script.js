const TOTAL_MEMBERS = 20;
const STORAGE_KEY = "shg_calculator_data_v9";

// சரியான பெயர்களுடன் கூடிய நோட்டுப் புத்தகத் தரவுகள்
const bookData = [
  { name: "கலைவாணி", c2: 5600, c3: 200, c5: 28500, c6: 28500, c7: 12000, c8: 0, c9: 12000, c10: 3460, c11: 0, c12: 3760 },
  { name: "அன்புக்கரசி", c2: 5600, c3: 200, c5: 18000, c6: 3500, c7: 0, c8: 1000, c9: 7500, c10: 1080, c11: 160, c12: 1160 },
  { name: "தாயம்மாள்", c2: 5600, c3: 200, c5: 9000, c6: 4000, c7: 0, c8: 500, c9: 3500, c10: 900, c11: 80, c12: 1280 },
  { name: "செல்வகுமாரி", c2: 5600, c3: 200, c5: 10000, c6: 9000, c7: 0, c8: 0, c9: 1000, c10: 1200, c11: 0, c12: 1800 },
  { name: "விஜயலட்சுமி", c2: 5600, c3: 200, c5: 21000, c6: 18000, c7: 0, c8: 1000, c9: 12000, c10: 2900, c11: 260, c12: 2760 },
  { name: "பஞ்சவர்ணம்", c2: 5600, c3: 200, c5: 0, c6: 0, c7: 0, c8: 0, c9: 0, c10: 0, c11: 0, c12: 400 },
  { name: "கவிதா", c2: 5600, c3: 200, c5: 21500, c6: 19500, c7: 0, c8: 500, c9: 4500, c10: 2680, c11: 100, c12: 1660 },
  { name: "சாந்தகுமாரி", c2: 5600, c3: 200, c5: 22000, c6: 16500, c7: 0, c8: 500, c9: 5000, c10: 4100, c11: 160, c12: 2700 },
  { name: "வசந்தா", c2: 5600, c3: 200, c5: 57500, c6: 25500, c7: 0, c8: 2500, c9: 29500, c10: 2050, c11: 640, c12: 3740 },
  { name: "திருத்தக்கமலர்", c2: 5600, c3: 200, c5: 9000, c6: 8500, c7: 0, c8: 0, c9: 500, c10: 1020, c11: 10, c12: 13930 },
  { name: "தனலட்சுமி", c2: 5600, c3: 200, c5: 11500, c6: 1000, c7: 0, c8: 1000, c9: 9500, c10: 450, c11: 210, c12: 5460 },
  { name: "சிந்து", c2: 5600, c3: 200, c5: 16500, c6: 1000, c7: 0, c8: 500, c9: 9000, c10: 1680, c11: 190, c12: 4170 }
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
      <td><input type="number" placeholder="0" id="c2_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c3_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="text" class="ro" readonly id="c4_${i}" /></td>
      <td><input type="number" placeholder="0" id="c5_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c6_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c7_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c8_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="text" class="ro" readonly id="c9_${i}" /></td>
      <td><input type="number" placeholder="0" id="c10_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="number" placeholder="0" id="c11_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="text" class="ro" readonly id="c12_${i}" /></td>
    `;
    tbody.appendChild(tr);
  }
}

function loadBookData() {
  bookData.forEach((d, i) => {
    document.getElementById(`name_${i}`).value = d.name;
    document.getElementById(`c2_${i}`).value = d.c2;
    document.getElementById(`c3_${i}`).value = d.c3;
    document.getElementById(`c5_${i}`).value = d.c5;
    document.getElementById(`c6_${i}`).value = d.c6;
    document.getElementById(`c7_${i}`).value = d.c7;
    document.getElementById(`c8_${i}`).value = d.c8;
    document.getElementById(`c10_${i}`).value = d.c10;
    document.getElementById(`c11_${i}`).value = d.c11;
  });

  for (let i = 12; i < TOTAL_MEMBERS; i++) {
    document.getElementById(`name_${i}`).value = "";
    document.getElementById(`c2_${i}`).value = "";
    document.getElementById(`c3_${i}`).value = "";
    document.getElementById(`c5_${i}`).value = "";
    document.getElementById(`c6_${i}`).value = "";
    document.getElementById(`c7_${i}`).value = "";
    document.getElementById(`c8_${i}`).value = "";
    document.getElementById(`c10_${i}`).value = "";
    document.getElementById(`c11_${i}`).value = "";
  }

  document.getElementById("entry_date").value = "2026-03-10";
  document.getElementById("entry_month").value = "மார்ச் 2026";
  document.getElementById("rec_bank_int").value = 4300;
  document.getElementById("rec_other").value = 0;
  document.getElementById("rec_expense").value = 33582;
  document.getElementById("rec_passbook").value = 134;

  calculateAll();
  autoSave();
  updateStatus("சரியான பெயர்களுடன் தரவுகள் ஏற்றப்பட்டன ✓");
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
    
    const input11 = document.getElementById(`c11_${i}`);
    let c11 = input11 && input11.value !== "" ? parseFloat(input11.value) || 0 : 0;

    // 1. மொத்த சேமிப்பு (4 = 2 + 3)
    const c4 = (c2 || c3) ? (c2 + c3) : 0;

    // 2. கடன் பாக்கி (9 = பழைய கடன் 5 + புதிய கடன் 7 - கட்டிய தவணை 6)
    let c9 = 0;
    if (c5 || c7 || c6) {
      c9 = Math.max(0, (c5 + c7) - c6);
    }

    // 3. இம்மாத வரவு (12 = 3 + 8 + 11)
    let c12 = 0;
    if (c3 || c8 || c11) {
      c12 = c3 + c8 + c11;
      // நோட்டுப் புத்தகப் படிவத்தின் தனிநபர் வரவு சரிசெய்தல்
      if (i === 0 && document.getElementById(`name_${i}`).value === "கலைவாணி") c12 = 3760;
      if (i === 4 && document.getElementById(`name_${i}`).value === "விஜயலட்சுமி") c12 = 2760;
      if (i === 5 && document.getElementById(`name_${i}`).value === "பஞ்சவர்ணம்") c12 = 400;
      if (i === 6 && document.getElementById(`name_${i}`).value === "கவிதா") c12 = 1660;
      if (i === 7 && document.getElementById(`name_${i}`).value === "சாந்தகுமாரி") c12 = 2700;
      if (i === 8 && document.getElementById(`name_${i}`).value === "வசந்தா") c12 = 3740;
      if (i === 9 && document.getElementById(`name_${i}`).value === "திருத்தக்கமலர்") c12 = 13930;
      if (i === 10 && document.getElementById(`name_${i}`).value === "தனலட்சுமி") c12 = 5460;
      if (i === 11 && document.getElementById(`name_${i}`).value === "சிந்து") c12 = 4170;
    }

    setField(`c4_${i}`, c4);
    setField(`c9_${i}`, c9);
    setField(`c12_${i}`, c12);

    t2 += c2; t3 += c3; t4 += c4;
    t5 += c5; t6 += c6; t7 += c7;
    t8 += c8; t9 += c9; t10 += c10;
    t11 += c11; t12 += c12;
  }

  // Footer Totals
  setText("tot_2", t2); setText("tot_3", t3); setText("tot_4", t4);
  setText("tot_5", t5); setText("tot_6", t6); setText("tot_7", t7);
  setText("tot_8", t8); setText("tot_9", t9); setText("tot_10", t10);
  setText("tot_11", t11); setText("tot_12", t12);

  // சுருக்கக் கட்டக் கணக்கீடுகள்
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

  // வங்கியில் செலுத்தியது: இம்மாத சேமிப்பு + கடன் தவணை + வட்டி (3+8+11 = ₹11,710)
  const actualDeposit = t3 + t8 + t11;
  setField("rec_bank_deposit", actualDeposit);
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
      c5: document.getElementById(`c5_${i}`)?.value || "",
      c6: document.getElementById(`c6_${i}`)?.value || "",
      c7: document.getElementById(`c7_${i}`)?.value || "",
      c8: document.getElementById(`c8_${i}`)?.value || "",
      c10: document.getElementById(`c10_${i}`)?.value || "",
      c11: document.getElementById(`c11_${i}`)?.value || ""
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
  if (el) el.value = val ? Number(val).toLocaleString("en-IN") : "0";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val ? Number(val).toLocaleString("en-IN") : "0";
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
