// --- 1. Variables principales ---

let beris = 0;
let berisPerSecond = 0;
let berisPerClick = 1; // La puissance de notre clic

// Amélioration 1 : Coby
let cobyCount = 0;
let cobyCost = 15;
const cobyProduction = 1;

// Amélioration 2 : Zoro
let zoroCount = 0;
let zoroCost = 100;
const zoroProduction = 8;

// Amélioration 3 : Nami
let namiCount = 0;
let namiCost = 500;
const namiProduction = 40;

// Amélioration de Clic
let clickUpgradeLevel = 1; // On commence au niveau 1
let clickUpgradeCost = 50; // Coût de base


// --- 2. Récupérer les éléments de la page ---
// C'est crucial que les 'id' ici correspondent PARFAITEMENT au HTML

const beriCountDisplay = document.getElementById('beri-count');
const berisPerSecondDisplay = document.getElementById('beris-per-second');
const beriClicker = document.getElementById('beri-clicker');
const berisPerClickDisplay = document.getElementById('beris-per-click'); // Ajout de l'étape 4

// Magasin : Coby
const cobyButton = document.getElementById('buy-coby');
const cobyCountDisplay = document.getElementById('coby-count');
const cobyCostDisplay = document.getElementById('coby-cost');

// Magasin : Zoro
const zoroButton = document.getElementById('buy-zoro');
const zoroCountDisplay = document.getElementById('zoro-count');
const zoroCostDisplay = document.getElementById('zoro-cost');

// Magasin : Nami
const namiButton = document.getElementById('buy-nami');
const namiCountDisplay = document.getElementById('nami-count');
const namiCostDisplay = document.getElementById('nami-cost');

// Magasin : Amélioration de Clic
const clickUpgradeButton = document.getElementById('buy-click-upgrade');
const clickUpgradeLevelDisplay = document.getElementById('click-upgrade-level');
const clickUpgradeCostDisplay = document.getElementById('click-upgrade-cost');


// --- 3. Logique du Clic ---
if (beriClicker) {
    beriClicker.addEventListener('click', handleClick);
}
function handleClick() {
    beris += berisPerClick; // On ajoute la puissance du clic
    updateUI();
}

// --- 4. Logique d'achat ---
if (cobyButton) cobyButton.addEventListener('click', buyCoby);
if (zoroButton) zoroButton.addEventListener('click', buyZoro);
if (namiButton) namiButton.addEventListener('click', buyNami);
if (clickUpgradeButton) clickUpgradeButton.addEventListener('click', buyClickUpgrade);

// --- Fonctions d'achat d'équipage ---
function buyCoby() {
    if (beris >= cobyCost) {
        beris -= cobyCost;
        cobyCount++;
        cobyCost = Math.round(cobyCost * 1.15);
    } else {
        alert("Pas assez de Beris pour Coby !");
    }
    updateUI();
}

function buyZoro() {
    if (beris >= zoroCost) {
        beris -= zoroCost;
        zoroCount++;
        zoroCost = Math.round(zoroCost * 1.15);
    } else {
        alert("Pas assez de Beris pour Zoro !");
    }
    updateUI();
}

function buyNami() {
    if (beris >= namiCost) {
        beris -= namiCost;
        namiCount++;
        namiCost = Math.round(namiCost * 1.20);
    } else {
        alert("Pas assez de Beris pour Nami !");
    }
    updateUI();
}

// Fonction d'achat d'amélioration de Clic
function buyClickUpgrade() {
    if (beris >= clickUpgradeCost) {
        beris -= clickUpgradeCost;
        clickUpgradeLevel++;
        berisPerClick++; // On augmente la puissance du clic
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.8); 
    } else {
        alert("Pas assez de Beris pour t'entraîner !");
    }
    updateUI();
}


// --- 5. Boucle de Jeu ---
setInterval(gameLoop, 1000);
function gameLoop() {
    beris += berisPerSecond;
    updateUI();
}

// --- 6. Mise à jour de l'UI ---
function updateUI() {
    // Recalculer le beris par seconde
    berisPerSecond = (cobyCount * cobyProduction) + (zoroCount * zoroProduction) + (namiCount * namiProduction);

    // Affichage du score
    // On utilise les 'if (element)' pour éviter que le script ne plante si un 'id' est manquant
    if (beriCountDisplay) beriCountDisplay.innerText = Math.round(beris);
    if (berisPerSecondDisplay) berisPerSecondDisplay.innerText = berisPerSecond;
    if (berisPerClickDisplay) berisPerClickDisplay.innerText = berisPerClick;

    // Affichage Magasin Équipage
    if (cobyCountDisplay) cobyCountDisplay.innerText = cobyCount;
    if (cobyCostDisplay) cobyCostDisplay.innerText = cobyCost;
    if (zoroCountDisplay) zoroCountDisplay.innerText = zoroCount;
    if (zoroCostDisplay) zoroCostDisplay.innerText = zoroCost;
    if (namiCountDisplay) namiCountDisplay.innerText = namiCount;
    if (namiCostDisplay) namiCostDisplay.innerText = namiCost;

    // Affichage Magasin Clic
    if (clickUpgradeLevelDisplay) clickUpgradeLevelDisplay.innerText = clickUpgradeLevel;
    if (clickUpgradeCostDisplay) clickUpgradeCostDisplay.innerText = clickUpgradeCost;

    // Titre
    document.title = Math.round(beris) + " Beris - Beri Clicker";
}

// --- 7. Initialisation ---
updateUI(); // Appelle la fonction une fois pour tout initialiser