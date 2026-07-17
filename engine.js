/* SkillKeep engine — sequence generation, XP math. UI-free so it can be tested in Node. */
const SK = (() => {
  // Standard OSRS xp table
  const XP = [0,0];
  let pts = 0;
  for (let lvl = 1; lvl <= 99; lvl++) {
    pts += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
    XP[lvl + 1] = Math.floor(pts / 4);
  }
  const levelForXp = xp => { let l = 1; while (l < 99 && XP[l + 1] <= xp) l++; return l; };

  // 14 rotated skills (Hitpoints is passive/exempt)
  const SKILLS = ["Attack","Strength","Defence","Ranged","Magic","Prayer","Runecraft",
    "Crafting","Mining","Smithing","Fishing","Cooking","Firemaking","Woodcutting"];
  // tie-break priority: combat + money-makers first, grinds spread out
  const PRIORITY = ["Attack","Strength","Defence","Magic","Ranged","Fishing","Cooking",
    "Woodcutting","Firemaking","Mining","Smithing","Crafting","Runecraft","Prayer"];

  // F2P quests with XP rewards & recommended trigger (slot when trigger skill hits level via rotation)
  const QUESTS = [
    {id:"runemysteries", name:"Rune Mysteries", xp:{}, trigger:{skill:"Attack",level:1}, note:"No XP reward, but REQUIRED before any lamp or genie XP can be applied to Runecraft — and required for Rune essence mine access. Do this literally first, before your first Attack level. ~10 min with no requirements."},
    {id:"cooks",   name:"Cook's Assistant",   xp:{Cooking:300},   trigger:{skill:"Cooking",level:2},  note:"Do immediately; free Cooking boost."},
    {id:"sheep",   name:"Sheep Shearer",      xp:{Crafting:150},  trigger:{skill:"Crafting",level:2}, note:"20 wool, 5 min."},
    {id:"goblin",  name:"Goblin Diplomacy",   xp:{Crafting:200},  trigger:{skill:"Crafting",level:3}, note:"Orange+blue dye, goblin mail."},
    {id:"misthalin",name:"Misthalin Mystery", xp:{Crafting:600},  trigger:{skill:"Crafting",level:4}, note:"Short mystery quest."},
    {id:"ghost",   name:"The Restless Ghost", xp:{Prayer:1125},   trigger:{skill:"Prayer",level:2},   note:"Jumps Prayer to 9 free."},
    {id:"imp",     name:"Imp Catcher",        xp:{Magic:875},     trigger:{skill:"Magic",level:3},    note:"Buy beads at GE; Magic → 8."},
    {id:"witch",   name:"Witch's Potion",     xp:{Magic:325},     trigger:{skill:"Magic",level:9},    note:"Quick; burnt meat + eye of newt."},
    {id:"doric",   name:"Doric's Quest",      xp:{Mining:1300},   trigger:{skill:"Mining",level:2},   note:"Clay+copper+iron ore; Mining → 10."},
    {id:"vampyre", name:"Vampyre Slayer",     xp:{Attack:4825},   trigger:{skill:"Attack",level:5},   note:"Bring food + stake; Attack → ~20."},
    {id:"knight",  name:"The Knight's Sword", xp:{Smithing:12725},trigger:{skill:"Smithing",level:2}, note:"Needs Mining 10 (Doric's covers it). Smithing 1 → 29 in one turn-free jump."},
    {id:"dragon",  name:"Dragon Slayer I",    xp:{Strength:18650,Defence:18650}, trigger:{skill:"Defence",level:32}, note:"32 Quest Points required. Str & Def +~10 levels each, unlocks rune platebody + green d'hide body."},
    {id:"xmarks",  name:"X Marks the Spot",   xp:{},              trigger:{skill:"Attack",level:2},   lamp:{xp:300,rec:"Runecraft"}, note:"Antique lamp: 300 XP any skill. Goes to Runecraft IF Rune Mysteries is done — otherwise the game won't let you pick RC, so it goes to Prayer instead."}
  ];

  // Gear/spell/style unlock timeline. key: skill, level, optional quest gate.
  const UNLOCKS = [
    {skill:"Attack",lv:1, txt:"Iron scimitar — buy at GE from step 1"},
    {skill:"Attack",lv:5, txt:"Steel scimitar"},
    {skill:"Attack",lv:10,txt:"Black scimitar"},
    {skill:"Attack",lv:20,txt:"Mithril scimitar"},
    {skill:"Attack",lv:30,txt:"Adamant scimitar"},
    {skill:"Attack",lv:40,txt:"RUNE SCIMITAR — final F2P melee weapon"},
    {skill:"Strength",lv:1,txt:"Amulet of strength when affordable (~1.4k) — wear for all melee"},
    {skill:"Defence",lv:1, txt:"Iron full set (full helm, platebody, legs, kite)"},
    {skill:"Defence",lv:5, txt:"Steel set"},
    {skill:"Defence",lv:10,txt:"Black set"},
    {skill:"Defence",lv:20,txt:"Mithril set"},
    {skill:"Defence",lv:30,txt:"Adamant set"},
    {skill:"Defence",lv:40,txt:"Rune legs/kite/full helm; platebody after Dragon Slayer",quest:"dragon",questTxt:"Rune platebody + green d'hide body unlocked (Dragon Slayer)"},
    {skill:"Ranged",lv:1, txt:"Shortbow + bronze/iron arrows, leather armour"},
    {skill:"Ranged",lv:5, txt:"Oak shortbow + steel arrows"},
    {skill:"Ranged",lv:20,txt:"Willow shortbow, studded body/chaps, coif, mithril arrows"},
    {skill:"Ranged",lv:30,txt:"MAPLE SHORTBOW (final F2P bow) + adamant arrows (final F2P ammo)"},
    {skill:"Ranged",lv:40,txt:"Green d'hide vambraces + chaps; body needs Dragon Slayer"},
    {skill:"Magic",lv:1, txt:"Staff of air, wizard hat/robes, amulet of magic. Wind Strike"},
    {skill:"Magic",lv:5, txt:"Water Strike"},
    {skill:"Magic",lv:9, txt:"Earth Strike"},
    {skill:"Magic",lv:13,txt:"Fire Strike — carry to 25+ (staff of fire)"},
    {skill:"Magic",lv:17,txt:"Wind Bolt"},
    {skill:"Magic",lv:25,txt:"Varrock Teleport"},
    {skill:"Magic",lv:33,txt:"Telekinetic Grab — Wine of Zamorak money-maker unlocked"},
    {skill:"Magic",lv:35,txt:"Fire Bolt"},
    {skill:"Magic",lv:43,txt:"Superheat Item — train Magic+Smithing together"},
    {skill:"Magic",lv:55,txt:"HIGH LEVEL ALCHEMY — core gp engine from here"},
    {skill:"Magic",lv:59,txt:"Fire Blast — final F2P combat spell"},
    {skill:"Woodcutting",lv:1,txt:"Iron axe"},{skill:"Woodcutting",lv:6,txt:"Steel axe"},
    {skill:"Woodcutting",lv:21,txt:"Mithril axe"},{skill:"Woodcutting",lv:31,txt:"Adamant axe"},
    {skill:"Woodcutting",lv:41,txt:"RUNE AXE — final F2P axe"},
    {skill:"Mining",lv:1,txt:"Iron pickaxe"},{skill:"Mining",lv:6,txt:"Steel pickaxe"},
    {skill:"Mining",lv:21,txt:"Mithril pickaxe"},{skill:"Mining",lv:31,txt:"Adamant pickaxe"},
    {skill:"Mining",lv:41,txt:"RUNE PICKAXE — final F2P pick"},
    {skill:"Fishing",lv:20,txt:"Fly fishing rod + feathers (trout)"},
    {skill:"Fishing",lv:40,txt:"Lobster pot (Musa Point/Corsair) — gp option"},
    {skill:"Cooking",lv:35,txt:"Jugs of wine unlock — best F2P cooking XP to 99"},
    {skill:"Runecraft",lv:20,txt:"Body runes (SW of Edgeville) — main F2P method"},
    {skill:"Runecraft",lv:35,txt:"Chaos runes (lvl 38 Wilderness altar) — faster, risky"},
    {skill:"Prayer",lv:1,txt:"Bury every bone from combat; buy big bones in bulk later (budget heavy)"}
  ];

  // Generate the remaining plan from a live state
  // state = {levels:{skill:lvl}, last:skillName|null, quests:{id:true}, }
  function freshState(){
    const levels={}; SKILLS.forEach(s=>levels[s]=1);
    return {levels, last:null, quests:{}, lamps:[]};
  }
  function questReady(q,state){
    if(state.quests[q.id]) return false;
    if(q.id==="dragon" && state.levels.Defence < 32) return false; // needs QP + survivability
    return state.levels[q.trigger.skill] >= q.trigger.level;
  }
  function applyQuest(q, state, steps){
    state.quests[q.id]=true;
    const gains=[];
    for(const [sk,xp] of Object.entries(q.xp)){
      const cur=state.levels[sk];
      const newLvl=levelForXp(Math.max(XP[cur], 0)+xp+XP[cur]*0); // xp on top of current floor
      const after=levelForXp(XP[cur]+xp);
      if(after>cur){ gains.push(`${sk} ${cur}→${after}`); state.levels[sk]=after; }
      else gains.push(`${sk} +${xp}xp (banked)`);
    }
    let lampTxt="";
    if(q.lamp){
      let target=q.lamp.rec;
      if(target==="Runecraft" && !state.quests["runemysteries"]) target="Prayer";
      lampTxt=` Lamp → ${target} (+${q.lamp.xp}xp).`;
      const sk=target, cur=state.levels[sk], after=levelForXp(XP[cur]+q.lamp.xp);
      if(after>cur) state.levels[sk]=after;
    }
    steps.push({type:"quest", quest:q.name, id:q.id, detail:(gains.join(", ")||"No direct XP")+"."+lampTxt+" "+q.note});
    state.last=null; // quest breaks the chain
  }
  function pickNext(state){
    let best=null;
    for(const s of SKILLS){
      if(state.levels[s]>=99) continue;
      if(s===state.last) continue;
      if(best===null) { best=s; continue; }
      const a=state.levels[s], b=state.levels[best];
      if(a<b || (a===b && PRIORITY.indexOf(s)<PRIORITY.indexOf(best))) best=s;
    }
    return best;
  }
  function generate(state, maxSteps=Infinity){
    const st=JSON.parse(JSON.stringify(state));
    const steps=[];
    let guard=0;
    while(steps.length<maxSteps && guard++<6000){
      // slot any ready quests first
      let q;
      while((q=QUESTS.find(x=>questReady(x,st)))) applyQuest(q,st,steps);
      const s=pickNext(st);
      if(!s) break;
      const from=st.levels[s];
      st.levels[s]=from+1; st.last=s;
      const unlocks=UNLOCKS.filter(u=>u.skill===s&&u.lv===from+1).map(u=>u.quest&&!st.quests[u.quest]?u.txt:(u.questTxt&&st.quests[u.quest]?u.questTxt:u.txt));
      steps.push({type:"level", skill:s, from, to:from+1, unlocks});
    }
    return {steps, final:st};
  }
  return {XP, levelForXp, SKILLS, PRIORITY, QUESTS, UNLOCKS, freshState, generate};
})();
if (typeof module!=="undefined") module.exports = SK;
