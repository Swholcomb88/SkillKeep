# SkillKeep
SkillKeep — F2P OSRS max guide with a one-level rotation cap. Interactive PWA: path, quests, gear timelines.

# ⛨ SkillKeep

A self-imposed challenge tracker for maxing a **Free-to-Play OSRS** account under one rule:

> Level a skill by exactly **1**, then switch to a different skill before you can return to it.

Hitpoints levels passively from combat XP and is exempt — it never spends a turn. Quest XP and lamps are logged as free jumps that don't break the rotation chain.

This is a **fun, experimental, capped-max guide** — not a productivity tool. (If you're looking for hyper-focus daily scheduling, that's [QuestKeep](https://github.com/swholcomb88/QuestKeep), a separate project.)

## What it does

SkillKeep generates the full planned sequence up front — **1,280 level-ups + 12 quest events** — covering all 14 rotatable F2P skills from 1 to 99. For every step it shows:

- **Which skill to train next**, enforcing the no-repeat rule
- **The recommended training method** for that exact level bracket
- **Gear, weapon, and spell upgrades** the instant they unlock
- **Quest XP auto-slotted** at the right trigger level (e.g. The Knight's Sword jumps Smithing 1→29 in one free turn; Dragon Slayer I unlocks the rune platebody + green d'hide body once Defence hits 32)

## Tabs

| Tab | What's there |
|---|---|
| 🗺️ **Path** | The live "Step Stone" — current step, method, gear-change banner, undo, lamp logger |
| ⚔️ **Setups** | Melee / Ranged / Magic / Skilling — gear timelines, style & spell doctrine, inventory loadouts by level bracket |
| 📜 **Quests** | All F2P XP-reward quests, checkable, with lamp allocation doctrine (Runecraft first, Prayer second) |
| 💎 **Skills** | Full 14-skill ledger against 99 |

## Tech

Vanilla JS PWA — no build step, no dependencies. Installs to your home screen, works offline via a service worker, progress saves to `localStorage` (falls back gracefully if storage is unavailable, e.g. in an embedded preview).

## Deploy

1. Upload all files to the repo root
2. Settings → Pages → Deploy from branch → `main` / `root` → Save
3. Open `https://swholcomb88.github.io/SkillKeep/` → Add to Home Screen

## Disclaimer

99 Prayer in F2P costs roughly 200M gp in big bones. The economy built into the Skilling/Magic setups (ogress rune drops, high alching smithed platebodies, telegrabbing Wines of Zamorak) exists specifically to fund that. It's the true final boss of this run, not any monster.
