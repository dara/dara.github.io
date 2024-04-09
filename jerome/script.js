let table;
let data = [];
let highestValue = [];


let angleMinSlider, angleMaxSlider, valueMinSlider, valueMaxSlider;

function preload() {
    table = loadTable('data/cepages_2.csv', 'csv', 'header', function() {
        for (let r = 0; r < table.getRowCount(); r++) {
            let rowData = table.getString(r, 0).split(';');
            data.push(rowData);
        }
    });
}
let exportButton;
let angleMinLabel, angleMaxLabel, valueMinLabel, valueMaxLabel, desiredMaxLabel;



function setup() {
    createCanvas(windowWidth, windowHeight, SVG);

    textAlign(CENTER, CENTER);
    textSize(32);
    text("Cliquez pour afficher le premier visuel", width/2, height/2-15);
    
    angleMinSlider = createSlider(0, 90, 5);
    angleMinSlider.position(10, 20);

    angleMaxSlider = createSlider(0, 90, 50);
    angleMaxSlider.position(10, 60);

    valueMinSlider = createSlider(0, 1, 0.1, 0.01);
    valueMinSlider.position(10, 100);

    valueMaxSlider = createSlider(0, 1, 0.5, 0.01);
    valueMaxSlider.position(10, 140);

    desiredMaxHeightSlider = createSlider(0, 200, 100);
    desiredMaxHeightSlider.position(10, 180);

    exportButton = createButton('Export SVG');
    exportButton.position(10, 220);
    exportButton.mousePressed(exportSVG);
}

function draw() {    
    if (valueMaxLabel) {
        valueMaxLabel.remove();
    }
    valueMaxLabel = createP("NombreDeVagueMax" + " " + valueMaxSlider.value());
    valueMaxLabel.position(10, 110);

    if (angleMinLabel) {
        angleMinLabel.remove();
    }
    angleMinLabel = createP("EtirementMin" + " " + angleMinSlider.value());
    angleMinLabel.position(10, -10);

    if (angleMaxLabel) {
        angleMaxLabel.remove();
    }
    angleMaxLabel = createP("EtirementMax" + " " + angleMaxSlider.value());
    angleMaxLabel.position(10, 30);

    if (valueMinLabel) {
        valueMinLabel.remove();
    }
    valueMinLabel = createP("NombreDeVagueMin" + " " + valueMinSlider.value());
    valueMinLabel.position(10, 70);


    if (desiredMaxLabel) {
        desiredMaxLabel.remove();
    }
    desiredMaxLabel = createP("Largeur" + " " + valueMinSlider.value());
    desiredMaxLabel.position(10, 150);
    
   
}

function mouseReleased() { 
    if (!exportButton.mouseIsPressed) {
        generated();
    }
}


function generated() {
    background(255);
    let largeurA4 = windowHeight/1.41;

    rectMode(CORNER);

    let retour = 0;
    let espacemment_W = 0;
    let courbe = 0;

    let angleMin = angleMinSlider.value();
    let angleMax = angleMaxSlider.value();
    let valueMin = valueMinSlider.value();
    let valueMax = valueMaxSlider.value();
    let desiredMaxHeight = desiredMaxHeightSlider.value();

    let colors = ["#5000FF", "#FF0050", "#FFF800", "#00FF82", "#28FACD", "#8B00EB", "#FF0000", "#FFD200", "#25D05A", "#00D7D7", "#DA0000", "#FFAF00", "#28A34B", "#0096D2", "#73009C", "#B40037", "#FF7800", "#00784B", "#0064C3", "#500075", "#870018", "#C85000", "#00555A", "#004F87"];


    for (let i = 0; i < data.length; i++) {
        highestValue[i] = Number(data[i][1]); // Convertir en nombre
    
        for (let j = 1; j < data[i].length; j++) {
            let num = Number(data[i][j]); // Convertir en nombre
            if (num > highestValue[i]) {
                highestValue[i] = num;
            }
        }
    }

    for (let i = 0; i < data.length; i++) {
        espacemment_W = random(0,largeurA4);
        retour = 0;
        let startColor = color(random(colors));
        let angle = random(angleMin, angleMax);
        let value = random(valueMin, valueMax);
       
        for (let j = 1; j < data[i].length; j++) {
         
            let espace = windowHeight / (data[i].length - 1);
            let curveOffset = sin(j * value + i * value) * angle;
            courbe += curveOffset;
            fill(startColor);
            stroke(startColor);
    
            // Normaliser la valeur
            let normalizedValue = Number(data[i][j]) / highestValue[i];
            // Multiplier par la taille souhaitée pour la valeur la plus élevée
            let rectHeight = normalizedValue * desiredMaxHeight;
    
            rect((windowWidth-largeurA4)/2 + espacemment_W + curveOffset - desiredMaxHeight/4, retour, rectHeight, espace);
            retour += espace;
        }
    }


    rectMode(CENTER);
    noFill();
    stroke(0);
    rect(windowWidth/2,windowHeight/2,largeurA4,windowHeight); 
    
}


function exportSVG() {
    save("visualization.svg");
}
