// src/pogo.ts
var e = class {
	constructor(e, t = [], n, r) {
		this._getTypesHtmlString = () => this.types.map((e) => `<div class="type ${e}">${e}</div>`).join(""), this.name = e, this.er = n, this.dps = r, this.types = t, this.hidden = !1, this.html = d(`
            <div class="pokemon-card">
                <div class=type-wrapper>
                    ${this._getTypesHtmlString()}
                </div>
                <div class="name">
                    ${e}
                </div>
                <div class="stat-wrapper">
                    <span class="stat-card">er: <span class="stat">${n}</span></span>
                    <span class="stat-card">dps: <span class="stat">${r}</span></span>
                </div>
            </div>
        `);
	}
}, t = document.getElementById("pokemon"), n = document.getElementById("er-button"), r = document.getElementById("dps-button"), i = document.getElementById("types-button"), a = document.getElementById("types-dropdown-form"), o = [
	"normal",
	"fire",
	"water",
	"grass",
	"electric",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dragon",
	"steel",
	"dark",
	"fairy"
], s = !0, c = !0, l = [
	new e("Pikachu", ["electric"], 34, 68),
	new e("Charizard", ["fire", "flying"], 22, 999),
	new e("Mew", ["psychic"], 22, 1111),
	new e("Blastoise", ["water"], 55, 99)
];
function u() {
	f(), a && (a.innerHTML = o.map((e) => `<label><input type="checkbox" value="${e}" />${e}</label>`).join(""), a.addEventListener("change", (e) => {
		let t = e.target?.form, n = [];
		if (t) for (let e of Array.from(t.elements)) {
			let t = e;
			t.checked && t.value && n.push(t.value);
		}
		n.length === 0 ? l.forEach((e) => e.hidden = !1) : l.forEach((e) => {
			e.hidden = !e.types.some((e) => n.includes(e));
		}), f();
	})), i?.addEventListener("click", () => {
		a?.classList.toggle("open");
	}), n?.addEventListener("click", () => {
		c ? l.sort((e, t) => t.er - e.er) : l.sort((e, t) => e.er - t.er), c = !c, f();
	}), r?.addEventListener("click", () => {
		s ? l.sort((e, t) => t.dps - e.dps) : l.sort((e, t) => e.dps - t.dps), s = !s, f();
	});
}
function d(e) {
	let t = document.createElement("div");
	return t.innerHTML = e.trim(), t.firstElementChild || document.createElement("div");
}
function f() {
	document.querySelectorAll(".pokemon-card").forEach((e) => e.remove()), l.filter((e) => !e.hidden).forEach((e) => t?.appendChild(e.html));
}
u();
