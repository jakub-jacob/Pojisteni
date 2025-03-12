// Třída pro správu informací o pojištěnci
class Pojistenec {
    // Konstruktor pro vytvoření pojištěnce s jménem, věkem a telefonním číslem
    constructor(jmeno, vek, telefon) {
        this.jmeno = jmeno;
        this.vek = vek;
        this.telefon = telefon;
    }

    // Metoda pro vrácení stručné textové reprezentace pojištěnce
    toString() {
        return `${this.jmeno}, ${this.vek} let, tel: ${this.telefon}`;
    }
}
