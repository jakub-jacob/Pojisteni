// Hlavní třída pro správu pojištěnců v aplikaci
class Aplikace {
    constructor() {
        // Načteme existující pojištěnce z localStorage nebo začneme s prázdným seznamem
        this.pojistenci = this.nacistPojistence();
        this.tabulkaPojistencu = document.querySelector("#tabulkaPojistencu tbody");

        // Inicializujeme formulář pro přidání nového pojištěnce
        this.inicializujFormular();
        // Zobrazíme všechny pojištěnce
        this.zobrazPojistence();
    }

    // Inicializuje formulář pro přidání nového pojištěnce
    inicializujFormular() {
        // Přidáme posluchač pro odeslání formuláře
        document.querySelector("form").addEventListener('submit', (udalost) => {
            udalost.preventDefault(); // Zabráníme defaultnímu chování (obnovení stránky)
            this.pridatPojistence(); // Zavoláme metodu pro přidání pojištěnce
        });
    }

    // Přidá nového pojištěnce do seznamu
    pridatPojistence() {
        // Získáme hodnoty z formuláře
        const jmeno = document.querySelector("#jmeno").value;
        const vek = document.querySelector("#vek").value;
        const telefon = document.querySelector("#telefon").value;

        // Vytvoříme nového pojištěnce a přidáme ho do seznamu
        const pojistenec = new Pojistenec(jmeno, vek, telefon);
        this.pojistenci.push(pojistenec);

        // Uložíme seznam pojištěnců do localStorage
        this.ulozitPojistence();
        // Znovu zobrazíme seznam pojištěnců
        this.zobrazPojistence();
    }

    // Zobrazí seznam všech pojištěnců v tabulce
    zobrazPojistence() {
        this.tabulkaPojistencu.innerHTML = ''; // Vyčistíme tabulku

        // Pro každý pojištěnec vytvoříme nový řádek v tabulce
        this.pojistenci.forEach((pojistenec, index) => {
            const radek = document.createElement('tr');

            // Vytvoření buňky pro jméno
            const bunkaJmeno = document.createElement('td');
            bunkaJmeno.textContent = pojistenec.jmeno;
            radek.appendChild(bunkaJmeno);

            // Vytvoření buňky pro věk
            const bunkaVek = document.createElement('td');
            bunkaVek.textContent = pojistenec.vek;
            radek.appendChild(bunkaVek);

            // Vytvoření buňky pro telefonní číslo
            const bunkaTelefon = document.createElement('td');
            bunkaTelefon.textContent = pojistenec.telefon;
            radek.appendChild(bunkaTelefon);

            // Vytvoření buňky pro tlačítko smazat
            const bunkaSmazat = document.createElement('td');
            const tlacitkoSmazat = document.createElement('button');
            tlacitkoSmazat.textContent = "Smazat";
            tlacitkoSmazat.style.margin = "0 auto"
            // Po kliknutí na tlačítko smažeme pojištěnce
            tlacitkoSmazat.addEventListener('click', () => this.smazPojistence(index));
            bunkaSmazat.appendChild(tlacitkoSmazat);
            radek.appendChild(bunkaSmazat);

            // Přidáme řádek do tabulky
            this.tabulkaPojistencu.appendChild(radek);
        });
    }

    // Smaže pojištěnce na základě indexu v seznamu
    smazPojistence(index) {
        // Odstraníme pojištěnce ze seznamu
        this.pojistenci.splice(index, 1);

        // Uložíme aktualizovaný seznam do localStorage
        this.ulozitPojistence();
        // Znovu zobrazíme pojištěnce
        this.zobrazPojistence();
    }

    // Uloží seznam pojištěnců do localStorage
    ulozitPojistence() {
        localStorage.setItem('pojistenci', JSON.stringify(this.pojistenci));
    }

    // Načte pojištěnce z localStorage
    nacistPojistence() {
        const pojistenci = JSON.parse(localStorage.getItem('pojistenci'));
        // Pokud jsou pojištěnci v localStorage, vrátíme je jako objekty Pojistenec
        return pojistenci ? pojistenci.map(p => new Pojistenec(p.jmeno, p.vek, p.telefon)) : [];
    }
}

// Po načtení stránky spustíme aplikaci
document.addEventListener('DOMContentLoaded', () => {
    new Aplikace();
});
