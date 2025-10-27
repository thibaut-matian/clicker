// --- 1. Variables principales ---

let beris = 0;
let berisPerSecond = 0;
let berisPerClick = 1; 

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
let clickUpgradeLevel = 1; 
let clickUpgradeCost = 50; 


// --- 2. Récupérer les éléments de la page ---
const beriCountDisplay = document.getElementById('beri-count');
const berisPerSecondDisplay = document.getElementById('beris-per-second');
const beriClicker = document.getElementById('beri-clicker');
const berisPerClickDisplay = document.getElementById('beris-per-click'); 
const cobyButton = document.getElementById('buy-coby');
const cobyCountDisplay = document.getElementById('coby-count');
const cobyCostDisplay = document.getElementById('coby-cost');
const zoroButton = document.getElementById('buy-zoro');
const zoroCountDisplay = document.getElementById('zoro-count');
const zoroCostDisplay = document.getElementById('zoro-cost');
const namiButton = document.getElementById('buy-nami');
const namiCountDisplay = document.getElementById('nami-count');
const namiCostDisplay = document.getElementById('nami-cost');
const clickUpgradeButton = document.getElementById('buy-click-upgrade');
const clickUpgradeLevelDisplay = document.getElementById('click-upgrade-level');
const clickUpgradeCostDisplay = document.getElementById('click-upgrade-cost');


// --- 3. Logique du Clic (MISE À JOUR) ---
if (beriClicker) {
    // On passe maintenant l'objet 'event' à la fonction
    beriClicker.addEventListener('click', handleClick); 
}

// La fonction accepte 'event' comme argument
function handleClick(event) { 
    // 1. Logique de score (inchangée)
    beris += berisPerClick; 
    updateUI();
    
    // 2. NOUVEAU : Créer l'effet visuel
    createFloatingText(event);
}

// NOUVEAU : Fonction pour créer le texte flottant
function createFloatingText(event) {
    // 1. Créer un nouvel élément <span>
    const floatingText = document.createElement('span');
    
    // 2. Définir son contenu (ex: "+1", "+2", etc.)
    floatingText.innerText = `+${berisPerClick}`;
    
    // 3. Lui donner la classe CSS qu'on vient de créer
    floatingText.className = 'floating-text';
    
    // 4. Le positionner là où l'utilisateur a cliqué
    // event.pageX = position X sur la page (en tenant compte du scroll)
    // event.pageY = position Y sur la page (en tenant compte du scroll)
    // On décale un peu pour centrer sur la souris
    floatingText.style.left = (event.pageX - 15) + 'px';
    floatingText.style.top = (event.pageY - 20) + 'px';
    
    // 5. L'ajouter directement au 'body' de la page
    document.body.appendChild(floatingText);
    
    // 6. Le supprimer après l'animation (1000ms = 1s, comme en CSS)
    //    pour ne pas saturer la page d'éléments.
    setTimeout(() => {
        if (floatingText) {
            floatingText.remove();
        }
    }, 1000);
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
        berisPerClick++; 
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
    // Recalculer le beris par seconde (ta super version)
    berisPerSecond = (cobyCount * cobyProduction) + (zoroCount * zoroProduction) + (namiCount * namiProduction);

    // Affichage du score
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

    // NOUVEAU : Affichage Magasin Clic
    if (clickUpgradeLevelDisplay) clickUpgradeLevelDisplay.innerText = clickUpgradeLevel;
    if (clickUpgradeCostDisplay) clickUpgradeCostDisplay.innerText = clickUpgradeCost;

    // Titre
    document.title = Math.round(beris) + " Beris - Beri Clicker";
}

// --- 7. Initialisation ---
updateUI(); // Appelle la fonction une fois pour tout initialiser
