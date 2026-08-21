const MEMBER_COUNT=20;
const rows=document.getElementById("memberRows");

function createMembers(){
 rows.innerHTML="";
 for(let i=1;i<=MEMBER_COUNT;i++){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td>${i}</td>
  <td><input class="name" data-col="name" placeholder="உறுப்பினர் ${i}"></td>
  <td><input type="number" data-col="2" value="0"></td>
  <td><input type="number" data-col="3" value="0"></td>
  <td><input type="number" data-col="4" value="0" readonly></td>
  <td><input type="number" data-col="5" value="0"></td>
  <td><input type="number" data-col="6" value="0"></td>
  <td><input type="number" data-col="7" value="0"></td>
  <td><input type="number" data-col="8" value="0"></td>
  <td><input type="number" data-col="9" value="0" readonly></td>
  <td><input type="number" data-col="10" value="0"></td>
  <td><input type="number" data-col="11" value="0"></td>
  <td><input type="number" data-col="12" value="0" readonly></td>`;
  rows.appendChild(tr);
 }
 document.querySelectorAll("input").forEach(i=>i.addEventListener("input",calculate));
 calculate();
}

function num(x){return Number(x?.value)||0}

function calculate(){
 const allRows=document.querySelectorAll("#memberRows tr"), totals=Array(13).fill(0);
 allRows.forEach(row=>{
  const q=c=>row.querySelector(`[data-col="${c}"]`);
  const c2=q(2),c3=q(3),c4=q(4),c5=q(5),c6=q(6),c7=q(7),c8=q(8),c9=q(9),c10=q(10),c11=q(11),c12=q(12);
  c4.value=num(c2)+num(c3);
  c9.value=num(c5)+num(c7)-num(c6)-num(c8);
  c12.value=num(c4)+num(c6)+num(c8)+num(c10)+num(c11);
  for(let i=2;i<=12;i++) totals[i]+=num(q(i));
 });
 for(let i=2;i<=12;i++){const e=document.getElementById("total"+i);if(e)e.textContent=totals[i].toFixed(0)}
 document.getElementById("summary").innerHTML=
 `<b>மொத்த சேமிப்பு:</b> ₹${totals[4].toFixed(0)}<br>
 <b>மொத்த கடன்:</b> ₹${totals[5].toFixed(0)}<br>
 <b>மொத்த தவணை:</b> ₹${totals[6].toFixed(0)}<br>
 <b>மொத்த கடன் பாக்கி:</b> ₹${totals[9].toFixed(0)}<br>
 <b>மொத்த வரவு:</b> ₹${totals[12].toFixed(0)}`;
}

function saveData(){
 const data=[];
 document.querySelectorAll("#memberRows tr").forEach(row=>{
  const member={};
  row.querySelectorAll("input").forEach(input=>member[input.dataset.col]=input.value);
  data.push(member);
 });
 localStorage.setItem("shgData",JSON.stringify(data));
 alert("✅ Data Saved");
}

function loadData(){
 const saved=localStorage.getItem("shgData");
 if(!saved){alert("Data இல்லை");return}
 const data=JSON.parse(saved), allRows=document.querySelectorAll("#memberRows tr");
 data.forEach((member,index)=>{
  if(!allRows[index])return;
  allRows[index].querySelectorAll("input").forEach(input=>{
   const col=input.dataset.col;
   if(member[col]!==undefined)input.value=member[col];
  });
 });
 calculate(); alert("✅ Data Loaded");
}

function clearData(){
 if(!confirm("அனைத்து data-வும் அழிக்கவா?"))return;
 localStorage.removeItem("shgData");createMembers();
}
createMembers();
