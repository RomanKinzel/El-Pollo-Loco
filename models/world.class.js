class World {
    character = new Character();
    level = level1; 
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarLife = new BarLife();
    statusBarCoin = new BarCoin();
    statusBarBottle = new BarBottle();
    throwableObjects = []; // Eine Liste von werfbaren Objekten


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Canvas-Kontext erhalten
        this.canvas = canvas; // Canvas-Element speichern
        this.keyboard = keyboard; // Tastatureingaben speichern
        this.draw(); // Spiel zeichnen
        this.setWorld(); // Welt initialisieren
        this.run(); // Spiel ausführen
    }

    setWorld(){  // Methode zur Initialisierung der Welt
        this.character.world = this; // Weltreferenz für den Charakter setzen
    }

    run() { // Methode zur Ausführung des Spiels
        setInterval(() => { // Intervall für Kollisionsprüfung und Wurfbare-Objekte-Prüfung festlegen
            this.checkCollisions(); // Kollisionen überprüfen
            this.checkThrowObjects(); // Wurfbare Objekte überprüfen
        }, 200);
    }

    checkThrowObjects(){ // Methode zur Überprüfung, ob wurfbare Objekte geworfen werden sollen
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100) // Neue Flasche erzeugen
            this.throwableObjects.push(bottle); // Flasche zur Liste der wurfbaren Objekte hinzufügen
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {  // Überprüfen, ob der Charakter mit einem Feind kollidiert
            if( this.character.isColliding(enemy) ) {
             this.character.hit(); // Charakter wird getroffen
             this.statusBarLife.setPercentage(this.character.energy); // Lebensanzeige aktualisieren
             console.log('Collision with Character, energy ', this.character.energy); 
            }
         });
    }


    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // leert das canvas

        this.ctx.translate(this.camera_x, 0); // translate verschiebt das Bild nach links
        this.addObjectsToMap(this.level.backgroundObject);
        this.ctx.translate(-this.camera_x, 0); // Back ------- Space for fixed objects ------

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x, 0); // Forwards
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); // translate verschiebt den Ausschnitt wieder nach rechts
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw()
        });
    }

    addObjectsToMap(objects){ // Methode zum Hinzufügen von Objekten zur Karte
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){ // Methode zum Hinzufügen eines Objekts zur Karte
        if (mo.otherDirection) {  // Bild spiegeln, falls erforderlich
           this.flipImage(mo);
        }
        // Objekt zeichnen und Rahmen zeichnen
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx)
        // Bild zurückspiegeln, falls erforderlich
        if (mo.otherDirection) {
           this.flipImageBack(mo);
        }
    }

    flipImage(mo){
         // Bild spiegeln
         this.ctx.save();
         this.ctx.translate(mo.width, 0);
         this.ctx.scale(-1,1);
         mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    } 
}