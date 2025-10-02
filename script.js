// Définition de la liste de 5 employés
const employes = [{ nom: "Alami", prenom: "Fatima", sex: "F", nbEnfants: 2, salaireBrut: 3000 },
{ nom: "Berrada", prenom: "Youssef", sex: "M", nbEnfants: 0, salaireBrut: 2800 },
{ nom: "Bennani", prenom: "Salma", sex: "F", nbEnfants: 1, salaireBrut: 3200 },
{ nom: "El Amrani", prenom: "Omar", sex: "M", nbEnfants: 3, salaireBrut: 2500 },
{ nom: "Chakir", prenom: "Imane", sex: "F", nbEnfants: 5, salaireBrut: 2700 }];


// Flag qui indique si on est en vue simplifiée (nom + salaire net)
let simplified = false;

// ===== Fonction de calcul du salaire net (identique à ta logique) =====
function calculSalaireNet(emp) {
    const salaire = emp.salaireBrut;
    let tauxImpo = 18;
    if (emp.sex === "F") tauxImpo -= 2;
    if (emp.nbEnfants === 3) tauxImpo -= 1;
    if (emp.nbEnfants >= 4) tauxImpo -= 2;

    const impot = (tauxImpo / 100) * salaire;
    const assurance = 0.07 * salaire;
    const pension = 0.05 * salaire;

    let salaireNet = salaire - (impot + assurance + pension);
    salaireNet += 100 + 150; // bonus + allocation
    return salaireNet;
}

// ===== Rendu du tableau selon l'état 'simplified' =====
const thead = document.querySelector("#employeesTable thead");
const tbody = document.querySelector("#employeesTable tbody");
const restoreBtn = document.getElementById("restoreBtn");

function renderTable() {
    // En-tête
    if (simplified) {
        thead.innerHTML = "<tr><th>Nom</th><th>Salaire Net</th></tr>";
    } else {
        thead.innerHTML = "<tr><th>Nom</th><th>Prénom</th><th>Sexe</th><th>Nb enfants</th><th>Salaire Brut</th><th>Salaire Net</th><th>Actions</th></tr>";
    }

    // Corps
    tbody.innerHTML = "";
    employes.forEach((emp, index) => {
        const tr = document.createElement("tr");
        tr.dataset.index = index; // on stocke l'index pour retrouver l'employé à chaque action

        if (simplified) {
            // Vue simplifiée : nom + salaire net (affiché directement)
            const tdNom = document.createElement("td");
            tdNom.textContent = emp.nom;
            tr.appendChild(tdNom);

            const tdNet = document.createElement("td");
            tdNet.textContent = `${calculSalaireNet(emp).toFixed(2)} DH`;
            tr.appendChild(tdNet);

        } else {
            // Vue complète : colonnes détaillées + actions
            const tdNom = document.createElement("td"); tdNom.textContent = emp.nom; tr.appendChild(tdNom);
            const tdPrenom = document.createElement("td"); tdPrenom.textContent = emp.prenom; tr.appendChild(tdPrenom);
            const tdSex = document.createElement("td"); tdSex.textContent = emp.sex; tr.appendChild(tdSex);
            const tdNb = document.createElement("td"); tdNb.textContent = emp.nbEnfants; tr.appendChild(tdNb);
            const tdBrut = document.createElement("td"); tdBrut.textContent = `${emp.salaireBrut} DH`; tr.appendChild(tdBrut);

            // Cellule Net (vide au départ, remplie par le bouton "Salaire Net")
            const tdNet = document.createElement("td");
            tdNet.className = "net-cell";
            tr.appendChild(tdNet);

            // Actions : 4 boutons (on n'attache pas d'event direct, on utilisera la délégation)
            const tdActions = document.createElement("td");

            const btnShowNet = document.createElement("button");
            btnShowNet.textContent = "Afficher Net";
            btnShowNet.dataset.action = "showNet";
            tdActions.appendChild(btnShowNet);

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Supprimer";
            btnDelete.dataset.action = "delete";
            tdActions.appendChild(btnDelete);

            const btnClone = document.createElement("button");
            btnClone.textContent = "Cloner";
            btnClone.dataset.action = "clone";
            tdActions.appendChild(btnClone);

            const btnSimplify = document.createElement("button");
            btnSimplify.textContent = "Simplifier";
            btnSimplify.dataset.action = "toggle";
            tdActions.appendChild(btnSimplify);

            tr.appendChild(tdActions);
        }

        tbody.appendChild(tr);
    });

    // Afficher ou cacher le bouton Restorer
    restoreBtn.style.display = simplified ? "inline-block" : "none";
}

// ===== Délégation d'événements sur le tbody =====
tbody.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return; // si on a cliqué ailleurs
    const action = btn.dataset.action;
    const tr = event.target.closest("tr");
    if (!tr) return;
    const idx = parseInt(tr.dataset.index, 10);
    if (Number.isNaN(idx)) return;

    switch (action) {
        case "showNet":
            // affiche le salaire net dans la cellule .net-cell de la ligne
            const netCell = tr.querySelector(".net-cell");
            if (netCell) {
                const net = calculSalaireNet(employes[idx]);
                netCell.textContent = `${net.toFixed(2)} DH`;
                console.log(`Net de ${employes[idx].prenom} ${employes[idx].nom} = ${net.toFixed(2)} DH`);
            }
            break;

        case "delete":
            // retirer l'employé de l'array puis re-render
            employes.splice(idx, 1);
            renderTable();
            break;

        case "clone":
            // insérer une copie juste après l'original, puis re-render
            const copy = { ...employes[idx] };
            employes.splice(idx + 1, 0, copy);
            renderTable();
            break;

        case "toggle":
            // passer en vue simplifiée (nom + salaire net)
            simplified = true;
            renderTable();
            break;

        default:
            break;
    }
});

// ===== Bouton de restauration (visible en vue simplifiée) =====
restoreBtn.addEventListener("click", () => {
    simplified = false;
    renderTable();
});

// Rendu initial
renderTable();

/*TP2 */

function showHxContent(nm) {

    //Afficher les divs correspondant
    let divtoshow = document.getElementById("title" + nm);
    if (divtoshow) {
        divtoshow.style.display = "block";
    }

}

function HideAllDivs(){
    let divs = document.querySelectorAll("div[id^=title]");
    divs.forEach(div => div.style.display = "none"); 
}
function AlertTitle(){
    let num=document.getElementById("title").value;
    let title=document.getElementById("title"+num);
    if(title){
        alert(title.textContent);
    }else {
        alert("Aucun titre pour le numéro " + num);
    }
}

function deleteTitle(){
    let num=document.getElementById("title").value;
    let div=document.getElementById("title"+num);
    if(div){
        div.textContent="";
    }
    else{
        alert("Aucun titre pour le numéro " + num);
    }

}
function defineTitle(){
    let num=document.getElementById("title").value;
    let div=document.getElementById("title"+num);

if (div) {
        // Vérifier s'il existe déjà un nœud texte direct
        let hasTextNode = false;
        div.childNodes.forEach(child => {
            if (child.nodeType === 3) { // 3 = nœud texte
                hasTextNode = true;
                div.removeChild(child); // supprimer l'ancien texte
            }
        });

        // Ajouter le nouveau texte seulement s'il n'existe pas déjà
        let newText = document.createTextNode("Nouveau titre");
        div.insertBefore(newText, div.firstChild);

        div.style.display = "block"; // afficher le div
    } else {
        alert("Aucun titre pour le numéro " + num);
    }
}


 













