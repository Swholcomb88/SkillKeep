/* SkillKeep UI + content. Engine (SK) provides sequence math. */
const COLORS={Attack:"#9c2b23",Strength:"#0a7a41",Defence:"#5a7fae",Ranged:"#6c8f2e",Magic:"#3b64c4",
Prayer:"#e8e3c9",Runecraft:"#c9b23c",Crafting:"#8a6d3b",Mining:"#6d6d75",Smithing:"#4b4b52",
Fishing:"#4f83a8",Cooking:"#6e2c8e",Firemaking:"#c9641e",Woodcutting:"#3e6b31"};
const SIGIL={Attack:"⚔",Strength:"⛏",Defence:"🛡",Ranged:"🏹",Magic:"✦",Prayer:"✝",Runecraft:"◈",
Crafting:"✂",Mining:"⛏",Smithing:"⚒",Fishing:"🐟",Cooking:"🍖",Firemaking:"🔥",Woodcutting:"🌲"};

/* Training method per skill per bracket (shown on the Step Stone). */
const METHODS={
Attack:[[9,"Chickens & cows, Lumbridge east. Accurate style."],[19,"Al Kharid warriors (aggro loop) or Barbarian Village barbarians. Accurate."],[29,"Al Kharid warriors / Stronghold of Security minotaurs (iron arrow pickup bonus). Accurate."],[39,"Hill giants, Edgeville dungeon — keep every big bone. Accurate."],[59,"Hill giants or moss giants (Varrock sewers). Accurate."],[98,"Ogress warriors, Corsair Cove dungeon — rune drops fund Prayer. Accurate."]],
Strength:[[9,"Chickens & cows. Aggressive style."],[19,"Al Kharid warriors / barbarians. Aggressive."],[29,"Flesh crawlers (Stronghold lvl 2) — semi-AFK. Aggressive."],[39,"Hill giants. Aggressive."],[59,"Moss giants or hill giants. Aggressive."],[98,"Ogress warriors. Aggressive."]],
Defence:[[9,"Chickens & cows. Defensive style."],[19,"Al Kharid warriors. Defensive."],[29,"Flesh crawlers. Defensive."],[39,"Hill giants. Defensive."],[59,"Moss giants / hill giants. Defensive."],[98,"Ogress warriors. Defensive."]],
Ranged:[[9,"Chickens with shortbow + bronze arrows. Rapid."],[19,"Cows / barbarians. Rapid, pick up arrows."],[39,"Stronghold minotaurs — they DROP iron arrows; nearly free training. Rapid."],[59,"Hill giants from a safespot (bone pile). Rapid."],[98,"Ogress warriors safespotted, maple shortbow + adamant arrows. Rapid."]],
Magic:[[12,"Strike spells on chickens/cows (Wind→Water→Earth)."],[24,"Fire Strike on monks of Zamorak or seagulls; buy death runes sparingly."],[32,"Fire Strike/Bolt on flesh crawlers; or curse-splash (−65 magic bonus gear) for AFK."],[42,"Telegrab Wines of Zamorak (33+) between levels — pays for runes. Fire Bolt hill giants."],[54,"Superheat iron→steel bars (43+): Magic AND Smithing XP together, small gp loss/neutral."],[98,"High Level Alchemy (55+) on smithed steel platebodies; Fire Blast (59+) ogress warriors when you want combat."]],
Prayer:[[9,"Bury every bones drop while doing combat steps. Restless Ghost jumps you to 9."],[29,"Bury big bones banked from hill giant grinds."],[98,"Bulk big bones at the GE (15 xp each). This is the wallet-killer — fund with ogress rune drops, high alch, wine telegrabs. Bury near a bank in sets of 28."]],
Runecraft:[[8,"Air runes, Falador air altar. Bring full inventories of essence (buy at GE)."],[19,"Earth runes (Varrock east) or keep airs."],[98,"Body runes (altar between Edgeville & Barbarian Village) — best sane F2P RC. 35+: chaos runes via lvl-38 Wilderness altar is faster but risk-on. Bring 25 ess + nothing else."]],
Crafting:[[9,"Leather gloves→boots (cowhides→Al Kharid tanner). Needle + thread."],[19,"Leather cowls, hard leather bodies."],[39,"Cut sapphires→emeralds (buy uncut at GE); sapphire jewelry at Edgeville/Falador furnace."],[59,"Cut rubies; ruby amulets (gold bar + ruby + amulet mould)."],[98,"Cut diamonds / diamond amulets — roughly break-even gp at GE prices."]],
Mining:[[14,"Copper+tin, Lumbridge swamp east or Varrock south-east."],[29,"Iron, Al Kharid or Varrock SE. Drop or bank — dropping is faster XP."],[98,"Power-mine iron (3-rock triangle, Al Kharid) to 99. Optional: coal 30+ / adamant 70+ / runite 85 (Lava Maze, risky) for gp instead of speed."]],
Smithing:[[29,"Smelt bronze bars, smith daggers at Varrock west anvils. The Knight's Sword quest does 1→29 for you."],[47,"Iron 2h swords / platebodies (buy iron ore, 50% smelt rate — or buy iron bars)."],[98,"Steel platebodies (48+) at Varrock west, then HIGH ALCH them yourself at Magic 55+ — the classic F2P Smithing+Magic+gp engine."]],
Fishing:[[19,"Shrimp→sardines/herring, Lumbridge swamp or Draynor. Small net / bait rod."],[39,"Fly fishing trout+salmon at Barbarian Village, DROP the fish (bank some for Cooking steps)."],[98,"Fly fishing Barbarian Village to 99 (best F2P XP). Lobsters 40+ / swordfish 50+ at Musa Point or Corsair Cove only when you want gp/food instead."]],
Cooking:[[14,"Cook your fished shrimp/sardines on Lumbridge range."],[34,"Cook your banked trout/salmon (range in Edgeville or Al Kharid)."],[98,"JUGS OF WINE (35+): grapes + jug of water, 200 xp each, made 14-at-a-time in one click. Best F2P cooking XP bar none; spoilage stops at 68."]],
Firemaking:[[14,"Burn regular logs (line up near a bank, GE is perfect)."],[29,"Oak logs at the GE."],[44,"Willow logs at the GE — cheap and fast."],[98,"Willows to 99 (cheapest) or maples 45+ / yews 60+ if you're flush. Light in straight lanes at the GE."]],
Woodcutting:[[14,"Regular trees behind Lumbridge castle."],[29,"Oaks, Draynor or Varrock west."],[59,"Willows, Draynor bank — drop or bank for Firemaking steps."],[98,"Yews (60+) Edgeville/Varrock palace for gp, or stick with willows for pure speed. Bank yews — they fund Prayer."]]
};
function methodFor(skill,lvl){const m=METHODS[skill];for(const [max,txt] of m){if(lvl<=max)return txt;}return m[m.length-1][1];}

/* Setups tab content */
const SETUPS={
Melee:{
 timeline:[["Att 1","Iron scimitar (skip bronze — it's 100 gp)"],["Att 5","Steel scimitar"],["Att 10","Black scimitar"],["Att 20","Mithril scimitar"],["Att 30","Adamant scimitar"],["Att 40","Rune scimitar — endgame F2P melee, ~15k"],["Def 1","Iron full helm/platebody/legs/kiteshield"],["Def 5","Steel set"],["Def 10","Black set"],["Def 20","Mithril set"],["Def 30","Adamant set"],["Def 40","Rune legs, kite, full helm"],["Def 40 + Dragon Slayer","Rune platebody — the F2P milestone"],["Any","Amulet of strength ASAP (~1.4k); swap to power ammy only if you value defence"],["Any","Cape: team cape or Castle Wars bracelet slot-fillers; boots/gloves: leather → fancy/fighting boots (Stronghold, free)"]],
 style:"Scimitar always. Accurate = Attack XP, Aggressive = Strength, Defensive = Defence. Controlled doesn't exist on scims in F2P worth using — match style to the skill the rotation asks for.",
 inv:[["1–9","10 shrimp, iron scim upgrade money (~500 gp). Train at chickens — collect feathers, they sell."],["10–19","Full inv of trout, 1k gp. Al Kharid warriors respawn fast indoors."],["20–29","Trout/salmon ×20, gp for mith gear. Stronghold: grab all 10k gp reward chests on the way down."],["30–39","Salmon ×22, adamant upgrades. Hill giants: brass key (~500 gp at GE) skips the long walk."],["40–59","Lobsters ×24, rune scim + set. Bank big bones every trip — that's Prayer later."],["60–99","Lobsters/swordfish, empty slots for ogress rune/seed drops. Corsair Cove bank is 30 s away."]]
},
Ranged:{
 timeline:[["Rng 1","Shortbow + bronze arrows, leather body/chaps/coif"],["Rng 5","Oak shortbow + iron/steel arrows"],["Rng 20","Willow shortbow, studded body + chaps, mithril arrows"],["Rng 30","Maple shortbow — FINAL F2P bow. Adamant arrows — final F2P ammo (maple can't fire rune)"],["Rng 40","Green d'hide vambraces + chaps"],["Rng 40 + Dragon Slayer","Green d'hide body"],["Any","Amulet of power; coif until 40"]],
 style:"Rapid for everything (fastest XP). Longrange only if you need the extra square for a safespot. Always pick your arrows back up — or train where they drop them for you.",
 inv:[["1–9","300 bronze arrows, 10 shrimp. Chickens die to anything."],["10–19","400 iron arrows, trout ×10. Cows/barbarians."],["20–39","Minotaurs drop iron arrows faster than you shoot them — bring ~100 to seed, leave with more. 15 trout."],["40–59","500 mith/addy arrows, lobsters ×15. Hill giant bone-pile safespot."],["60–99","700 adamant arrows, lobsters, empty slots for big bones + rune drops at ogress safespot."]]
},
Magic:{
 timeline:[["Mag 1","Staff of air, wizard hat + robes (blue/black), amulet of magic"],["Mag 13","Staff of fire for Fire Strike (fire runes now free)"],["Mag 17–35","Bolt tier: Wind 17 · Water 23 · Earth 29 · Fire 35"],["Mag 25/31/37","Teleports: Varrock 25 · Lumbridge 31 · Falador 37 — your travel network"],["Mag 33","Telekinetic Grab — Wine of Zamorak farm (Chaos Temple, ~1.4k/grab)"],["Mag 41–59","Blast tier: Wind 41 · Water 47 · Earth 53 · Fire 59 (F2P ceiling)"],["Mag 43","Superheat Item — pair with Smithing steps"],["Mag 55","High Level Alchemy — turn smithed steel platebodies into gp forever"],["Any","Best F2P mage 'armour' is just robes — your defence is distance and safespots"]],
 style:"Autocast via staff. Train on the cheapest spell that still hits your target reliably; splashing wastes runes unless deliberately AFK-splashing with −65 bonus.",
 inv:[["1–12","Air staff + 300 mind runes + elemental runes for current strike spell."],["13–32","Fire staff + minds; 10 trout buffer. Monks of Zamorak drop nothing — pure XP."],["33–42","Law runes ×50 + air staff for telegrab trips: 27 free slots for wine stacking."],["43–54","Nature runes + iron/steel bars for superheat (bank stand at Edgeville, never move)."],["55–99","Nats + fire staff + your steel platebody stock for alch; or blast runes + lobsters for ogress trips."]]
},
Skilling:{
 timeline:[["WC/Mine 1→41","Axe & pickaxe ladder: iron → steel 6 → mithril 21 → adamant 31 → RUNE 41. Buy each the second you level — tool tier is pure speed"],["Fish 20","Fly fishing rod + 1k feathers"],["Fish 40","Lobster pot"],["Cook 35","Switch permanently to jugs of wine"],["Craft any","Needle/thread/mould kit lives in bank"],["RC any","No pouches in F2P — 25 essence + tiara per trip is the whole loadout"],["FM any","Tinderbox. That's it. That's the loadout"]],
 style:"Skilling steps are your combat rest days. Pair drop-partners: fish trout → bank → those trout are your next 10 combat steps' food. Mine iron → those bars are Smithing steps. Cut willows → Firemaking steps. The rotation feeds itself.",
 inv:[["1–9","Tool + 27 free slots, power-drop everything."],["10–29","Tool + bank runs for anything worth >50 gp (iron ore, oaks are alch/sale stock)."],["30–59","Willows/iron/trout: drop for speed. Lobsters/coal: bank for gp. Decide per step which you need — XP or funding."],["60–99","Yews, adamant ore, swordfish all bank — endgame skilling is your Prayer fund. Wine-making: 13 grapes + 13 jugs of water per inv, bank stand at GE."]]
}
};

/* ---------- state ---------- */
const KEY="skillkeep.v1";
let storageOK=true;
function load(){
  try{
    const raw=window.localStorage.getItem(KEY);
    const s=raw?JSON.parse(raw):null;
    if(s&&s.levels)return s;
  }catch(e){storageOK=false;}
  return SK.freshState();
}
function save(){
  if(!storageOK)return;
  try{window.localStorage.setItem(KEY,JSON.stringify(state));}
  catch(e){storageOK=false;}
}
let state=load();
let history=[];

/* ---------- rendering ---------- */
const views={path:v=>renderPath(),setups:v=>renderSetups(),quests:v=>renderQuests(),skills:v=>renderSkills()};
let curView="path",curSetup="Melee";
document.querySelector(".tabs").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  curView=b.dataset.v;
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));
  document.querySelectorAll("main section").forEach(s=>s.classList.add("hidden"));
  document.getElementById("view-"+curView).classList.remove("hidden");
  views[curView]();
});

function renderPath(){
  const gen=SK.generate(state,40);
  const el=document.getElementById("view-path");
  const done=doneCount();
  const total=done+SK.generate(state).steps.filter(s=>s.type==="level").length;
  const s0=gen.steps[0];
  let stone="";
  if(!s0){stone=`<div class="stepstone"><div class="skillname">All 14 skills at 99</div><div class="lvl">The rotation is complete. 🏆</div></div>`;}
  else if(s0.type==="quest"){
    stone=`<div class="stepstone queststone"><div class="stepno">Quest unlocked — free XP, no turn spent</div>
    <div class="sigil" style="background:#d4af37">📜</div>
    <div class="skillname">${s0.quest}</div>
    <div class="method">${s0.detail}</div></div>
    <div class="btnrow"><button class="btn-main" onclick="completeQuestStep('${s0.id}')">Quest complete ✓</button>
    <button class="btn-lamp" onclick="openLamp()">🪔 Lamp</button></div>`;
  } else {
    const unlock=s0.unlocks&&s0.unlocks.length?`<div class="unlock">${s0.unlocks.join(" · ")}</div>`:"";
    stone=`<div class="stepstone"><div class="stepno">Step ${done+1} of ~${total}</div>
    <div class="sigil" style="background:${COLORS[s0.skill]}">${SIGIL[s0.skill]}</div>
    <div class="skillname">${s0.skill}</div>
    <div class="lvl">${s0.from} → ${s0.to}</div>
    <div class="method">${methodFor(s0.skill,s0.to)}</div>${unlock}</div>
    <div class="btnrow"><button class="btn-main" onclick="completeLevel()">Level gained ✓</button>
    <button class="btn-sec" onclick="undo()" ${history.length?"":"disabled"}>Undo</button>
    <button class="btn-lamp" onclick="openLamp()">🪔</button></div>`;
  }
  const pct=Math.round(done/total*100)||0;
  let up=`<div class="card upcoming"><h2>Next on the path</h2>`;
  gen.steps.slice(1,16).forEach((s,i)=>{
    if(s.type==="quest") up+=`<div class="row qrow"><span class="n">—</span><span>📜</span><span class="what">${s.quest}</span></div>`;
    else up+=`<div class="row"><span class="n">#${done+2+i}</span><span class="dot" style="background:${COLORS[s.skill]}"></span><span class="what">${s.skill} → ${s.to}</span></div>`;
  });
  up+=`</div>`;
  el.innerHTML=stone+`<div class="card"><h2>Journey</h2><div class="prog"><i style="width:${pct}%"></i></div>
  <div class="small">${done} level-ups banked · ${total-done} to go · Hitpoints levels passively and never spends a turn</div></div>`+up;
}
function doneCount(){return state.doneSteps||0;}
function completeLevel(){
  history.push(JSON.stringify(state));
  const gen=SK.generate(state,3);
  const s=gen.steps.find(x=>x.type==="level");
  // apply pending quest events silently? No — quests require their own confirm; only proceed if first step is a level
  if(gen.steps[0].type!=="level"){renderPath();return;}
  state.levels[s.skill]=s.to; state.last=s.skill;
  state.doneSteps=(state.doneSteps||0)+1; save(); renderPath();
}
function completeQuestStep(id){
  history.push(JSON.stringify(state));
  const q=SK.QUESTS.find(x=>x.id===id); if(!q)return;
  const steps=[]; // reuse engine apply
  const st=state; st.quests=st.quests||{};
  // mimic engine.applyQuest on live state:
  st.quests[id]=true;
  for(const [sk,xp] of Object.entries(q.xp)){
    const cur=st.levels[sk], after=SK.levelForXp(SK.XP[cur]+xp);
    if(after>cur) st.levels[sk]=after;
  }
  if(q.lamp){const sk=q.lamp.rec,cur=st.levels[sk],after=SK.levelForXp(SK.XP[cur]+q.lamp.xp);if(after>cur)st.levels[sk]=after;}
  st.last=null; save(); renderPath(); if(curView==="quests")renderQuests();
}
function undo(){if(!history.length)return; state=JSON.parse(history.pop()); save(); views[curView]();}

/* lamps */
function openLamp(){
  const sel=document.getElementById("lampSkill");
  sel.innerHTML=SK.SKILLS.map(s=>`<option>${s}</option>`).join("");
  lampDlg.showModal();
}
function applyLamp(){
  const sk=document.getElementById("lampSkill").value;
  const xp=parseInt(document.getElementById("lampXp").value,10)||0;
  if(sk==="Runecraft" && !(state.quests&&state.quests["runemysteries"])){
    alert("Rune Mysteries isn't complete yet — this lamp can't go to Runecraft in-game. Pick another skill (Prayer is the usual fallback), or complete Rune Mysteries first.");
    return;
  }
  if(xp>0){history.push(JSON.stringify(state));
    const cur=state.levels[sk],after=SK.levelForXp(SK.XP[cur]+xp);
    if(after>cur)state.levels[sk]=after;
    state.last=null; // lamp breaks the chain, per the rules
    save();}
  lampDlg.close(); renderPath();
}

function renderSetups(){
  const el=document.getElementById("view-setups");
  const tabs=Object.keys(SETUPS).map(k=>`<button class="${k===curSetup?'on':''}" onclick="setSetup('${k}')">${k}</button>`).join("");
  const s=SETUPS[curSetup];
  el.innerHTML=`<div class="subtabs">${tabs}</div>
  <div class="card"><h2>Gear & weapon timeline — upgrade the moment each unlocks</h2>
  <ul class="tl">${s.timeline.map(t=>`<li><span class="lv">${t[0]}</span><span>${t[1]}</span></li>`).join("")}</ul></div>
  <div class="card"><h2>Style / spells</h2><p style="font-size:.85rem;line-height:1.5">${s.style}</p></div>
  <div class="card"><h2>Inventory by bracket</h2>${s.inv.map(b=>`<div class="bracket"><h3>Levels ${b[0]}</h3><p class="inv">${b[1]}</p></div>`).join("")}</div>`;
}
function setSetup(k){curSetup=k;renderSetups();}

function renderQuests(){
  const el=document.getElementById("view-quests");
  state.quests=state.quests||{};
  const rmDone=!!state.quests["runemysteries"];
  const rows=SK.QUESTS.map(q=>{
    const xp=Object.entries(q.xp).map(([k,v])=>`${k} +${v.toLocaleString()}`).join(", ")||(q.lamp?`Antique lamp ${q.lamp.xp} xp → ${q.lamp.rec}`:"No XP");
    return `<div class="qitem"><input type="checkbox" ${state.quests[q.id]?"checked":""} onchange="toggleQuest('${q.id}',this.checked)">
    <div><div class="qn">${q.name}</div><div class="qx">${xp}</div><div class="qd">${q.note}</div></div></div>`;
  }).join("");
  const lampAdvice = rmDone
    ? `Every free-choice lamp goes to <b style="color:var(--gold)">Runecraft first, Prayer second</b> — the two slowest/most expensive roads in F2P.`
    : `<b style="color:#ff8a6a)">Rune Mysteries isn't done yet</b> — lamps can't touch Runecraft until it is. Route lamps to <b style="color:var(--gold)">Prayer</b> instead until that quest is complete, exactly like you just did.`;
  el.innerHTML=`<div class="card"><h2>F2P quest XP — free levels that never spend a turn</h2>${rows}</div>
  <div class="card"><h2>Lamp doctrine</h2><p class="small">${lampAdvice} A genie lamp gives current level × 10 XP, so the later you rub it the more it pays… but Runecraft XP is misery at any level. Log lamps with the 🪔 button on the Path tab.</p>
  <p class="small" style="margin-top:8px">Quests with no XP reward (Corsair Curse, Prince Ali, Demon Slayer, Ernest, Pirate's Treasure, Romeo & Juliet, Shield of Arrav, Below Ice Mountain) still matter: Dragon Slayer needs 32 Quest Points. Do them during skilling downtime.</p></div>`;
}
function toggleQuest(id,on){
  if(on){completeQuestStep(id);}
  else{state.quests[id]=false;save();renderQuests();}
}

function renderSkills(){
  const el=document.getElementById("view-skills");
  const cells=SK.SKILLS.map(s=>{
    const l=state.levels[s];
    return `<div class="gs ${l>=99?'done':''}" style="border-left:4px solid ${COLORS[s]}">
    <div class="gn">${s}</div><div class="gl"><b>${l}</b>/99</div></div>`;
  }).join("");
  el.innerHTML=`<div class="card"><h2>Skill ledger</h2><div class="grid">${cells}
  <div class="gs"><div class="gn">Hitpoints</div><div class="gl" style="color:var(--mut)">passive</div></div></div>
  <p class="small" style="margin-top:10px">Tap a step done on the Path tab to advance. Total: 1,280 rotation levels + quest jumps. Prayer and Runecraft are the long roads — every gp decision in the other 12 skills exists to feed them.</p></div>`;
}

/* boot */
renderPath();
try{
  const isHttp=location.protocol==="https:"||location.hostname==="localhost";
  if(isHttp && "serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  }
}catch(e){/* preview/sandboxed contexts (file:, blob:, data:) skip SW entirely */}

if(!storageOK){
  const w=document.createElement("div");
  w.style.cssText="position:fixed;top:0;left:0;right:0;background:#5a2a1f;color:#ffd9c9;font-size:.72rem;padding:6px 10px;text-align:center;z-index:99";
  w.textContent="Storage isn't available in this preview — progress won't save until this runs on its deployed GitHub Pages URL.";
  document.body.prepend(w);
}
