const TOTAL_MEMBERS = 20;
const STORAGE_KEY = "shg_calculator_data_v4";

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
      <td><input type="number" placeholder="0" id="c10_${i}" oninput="autoSave()" /></td>
      <td><input type="number" placeholder="0" id="c11_${i}" oninput="calculateAll(); autoSave();" /></td>
      <td><input type="text" class="ro" readonly id="c12_${i}" /></td>
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
    
    // பயனர் உள்ளீடு செய்த வட்டி
    let c11_input = document.getElementById(`c11_${i}`);
    let c11 = c11_input && c11_input.value !== "" ? parseFloat(c11_input.value) : 0;

    // 1. சேமிப்பு மொத்தம் (4 = 2 + 3)
    const c4 = (c2 || c3) ? (c2 + c3) : 0;

    // 2. கடன் பாக்கி (9 = பழைய கடன் 5 + புதிய கடன் 7 - செலுத்தியது 6)
    // குறிப்பு: நோட்டு புத்தக கணக்குப்படி Col 6-ல் ஏற்கனவே Col 8 கழிவு போக உள்ள பாக்கி
    const c9 = Math.max(0, (c5 + c7) - c6);

    // வட்டி காலியாக இருந்தால் மட்டுமே தானாக வரும்
    if (c11_input && c11_input.value === "" && c9 > 0) {
      c11_input.placeholder = Math.round(c9 * 0.01);
    }

    // 3. இம்மாத நபர் வரவு (12 = 3 + 8 + 11)
    const c12 = c3 + c8 + c11;

    // முடிவுகளை பெட்டிகளில் நிரப்புதல் (Zero என்றால் 0 என விழும், காலியாகாது)
    setField(`c4_${i}`, c4);
    setField(`c9_${i}`, c9);
    setField(`c12_${i}`, c12);

    t2 += c2; t3 += c3; t4 += c4;
    t5 += c5; t6 += c6; t7 += c7;
    t8 += c8; t9 += c9; t10 += c10;
    t11 += c11; t12 += c12;
  }

  // மெயின் டேபிள் மொத்தங்கள் (Footer)
  setText("tot_2", t2); setText("tot_3", t3); setText("tot_4", t4);
  setText("tot_5", t5); setText("tot_6", t6); setText("tot_7", t7);
  setText("tot_8", t8); setText("tot_9", t9); setText("tot_10", t10);
  setText("tot_11", t11); setText("tot_12", t12);

  // சுருக்கக் கட்ட கணக்குகள் (Reconciliation Boxes)
  const bankInt = numVal("rec_bank_int");
  const otherInc = numVal("rec_other");
  const expense = numVal("rec_expense");
  const passbook = numVal("rec_passbook");

  // நோட்டின்படி 'தவணைகள் வரவு' என்பது இதுவரை கட்டிய தவணை (Col 6)
  const repaidTot = t6; 
  const loanGiven = t5 + t7;

  setField("rec_savings", t4);
  setField("rec_loan", t5);
  setField("rec_repaid", repaidTot);
  setField("rec_interest", t11);
  setField("rec_left_total", t4 + t5 + repaidTot + t11 + bankInt + otherInc);

  setField("rec_loan_given", loanGiven);
  setField("rec_right_total", loanGiven + expense + passbook);
  
  // வங்கியில் செலுத்தியது = இம்மாத சேமிப்பு + இம்மாத அசல் + இம்மாத வட்டி (3+8+11)
  const actualBankDeposit = t3 + t8 + t11;
  setField("rec_bank_deposit", actualBankDeposit);
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
}

function loadSavedData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    calculateAll();
    return;
  }

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
    console.error("Load error:", e);
    calculateAll();
  }
}

function numVal(id) {
  const el = document.getElementById(id);
  return el && el.value !== "" ? parseFloat(el.value) || 0 : 0;
}

function setField(id, val) {
  const el = document.getElementById(id);
  if (el) {
    el.value = (val !== null && val !== undefined) ? Number(val).toLocaleString("en-IN") : "0";
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = (val !== null && val !== undefined) ? Number(val).toLocaleString("en-IN") : "0";
  }
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
  }
}

function manualSave() {
  autoSave();
  alert("டேட்டா வெற்றிகரமாக சேமிக்கப்பட்டது!");
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
