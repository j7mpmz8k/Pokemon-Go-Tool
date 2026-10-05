# Pokémon GO Combat & Ranking Formulas

## 1. Fast Move Metrics

### Gyms & Raids (PvE — Real-Time)
* **Move Duration in Seconds ($T_{\text{fast}}$):**
  $$T_{\text{fast}} = \frac{\text{duration}}{1000}$$
* **Fast Move DPS:**
  $$\text{DPS}_{\text{fast}} = \frac{\text{power}}{T_{\text{fast}}}$$
* **Fast Move EPS (Energy Per Second):**
  $$\text{EPS} = \frac{\text{energy\_delta}}{T_{\text{fast}}}$$

### Trainer Battles (PvP — Turn-Based, 1 turn = 0.5s)
* **Turn Duration in Seconds:**
  $$T_{\text{seconds}} = \text{turn\_duration} \times 0.5$$
* **DPT (Damage Per Turn):**
  $$\text{DPT} = \frac{\text{power}}{\text{turn\_duration}}$$
* **EPT (Energy Per Turn):**
  $$\text{EPT} = \frac{\text{energy\_delta}}{\text{turn\_duration}}$$

---

## 2. Charged Move Metrics
* **Energy Cost ($E_{\text{cost}}$):**
  $$E_{\text{cost}} = |\text{energy\_delta}|$$
* **Move Duration in Seconds ($T_{\text{charged}}$):**
  $$T_{\text{charged}} = \frac{\text{duration}}{1000}$$
* **Damage Per Energy (DPE):**
  $$\text{DPE} = \frac{\text{power}}{E_{\text{cost}}}$$

---

## 3. Combining Fast & Charged Moves

### Fast Attacks Needed to Charge ($N_{\text{attacks}}$)
$$N_{\text{attacks}} = \left\lceil \frac{E_{\text{cost}}}{\text{fast\_move.energy\_delta}} \right\rceil$$
*(Where $\lceil \dots \rceil$ denotes rounding up to the next whole attack)*

### Time Until First Charged Move Activation ($T_{\text{activation}}$)
* **PvE (Seconds):**
  $$T_{\text{activation}} = N_{\text{attacks}} \times T_{\text{fast}}$$
* **PvP (Turns):**
  $$\text{Turns}_{\text{activation}} = N_{\text{attacks}} \times \text{turn\_duration}$$
* **PvP (Seconds):**
  $$T_{\text{activation}} = \text{Turns}_{\text{activation}} \times 0.5$$

### Combined Moveset Cycle DPS (Weave DPS)
* **Damage per Cycle ($D_{\text{cycle}}$):**
  $$D_{\text{cycle}} = (N_{\text{attacks}} \times \text{fast\_move.power}) + \text{charged\_move.power}$$
* **Time per Cycle ($T_{\text{cycle}}$):**
  $$T_{\text{cycle}} = (N_{\text{attacks}} \times T_{\text{fast}}) + T_{\text{charged}}$$
* **Cycle DPS:**
  $$\text{DPS}_{\text{cycle}} = \frac{D_{\text{cycle}}}{T_{\text{cycle}}}$$

---

## 4. Multipliers & Effective Stats
* **STAB (Same Type Attack Bonus):** $1.2\times$ if move type matches Pokémon type, otherwise $1.0\times$.
* **Effective Attack:** $(\text{base\_attack} + \text{IV}_{\text{atk}}) \times \text{CPM}$
* **Effective Defense:** $(\text{base\_defense} + \text{IV}_{\text{def}}) \times \text{CPM}$
* **Effective HP (Stamina):** $\lfloor (\text{base\_stamina} + \text{IV}_{\text{sta}}) \times \text{CPM} \rfloor$
* **In-Game Damage Dealt:**
  $$\text{Damage} = \left\lfloor 0.5 \times \text{Power} \times \frac{\text{Attacker Attack}}{\text{Defender Defense}} \times \text{STAB} \times \text{Type Effectiveness} \right\rfloor + 1$$

---

## 5. TDO (Total Damage Output) & Bulk
* **Tankiness (Bulk):**
  $$\text{Tankiness} = \text{Effective Defense} \times \text{Effective HP}$$
* **Lifespan before Fainting:**
  $$\text{Lifetime} = \frac{\text{Tankiness}}{\text{Incoming Opponent DPS}}$$
* **Total Damage Output (TDO):**
  $$\text{TDO} = \text{DPS}_{\text{cycle}} \times \text{Lifetime}$$
* **Relative TDO (For cross-species comparison):**
  $$\text{Relative TDO} = \text{DPS}_{\text{cycle}} \times \text{base\_defense} \times \text{base\_stamina}$$

---

## 6. ER (Equivalent Rating)

ER is the GamePress industry standard metric for ranking raid attackers. It balances high-DPS "glass cannons" against high-TDO "slow tanks" by weighting DPS to the 3rd power and normalizing with a 4th root:

### The ER Formula
$$\text{ER} = \sqrt[4]{\text{DPS}^3 \times \text{TDO}} = (\text{DPS}^3 \times \text{TDO})^{0.25}$$

* **Why it outperforms $\text{DPS} \times \text{TDO}$:** A flat product rewards slow, bulky Pokémon too heavily (where the raid timer runs out). Weighting $\text{DPS}^3$ reflects the reality that speed is primary in raids, while $\text{TDO}$ ensures you don't waste time fainting and relobbying. The 4th root compresses the result into a clean, linear scale proportional to DPS.

---

## 7. Combat Power (CP) Formula
$$\text{CP} = \left\lfloor \frac{\text{Effective Attack} \times \sqrt{\text{Effective Defense}} \times \sqrt{\text{Effective Stamina}}}{10} \right\rfloor$$
