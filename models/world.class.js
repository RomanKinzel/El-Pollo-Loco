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
    statusBarEndboss = new BarEndboss();
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
            this.checkThrowObjects(); // Wurfbare Objekte überprüfen
            this.checkCollisionsEndboss();
            this.checkCollisionsEnemies();
        }, 100);
        setInterval(() => { // Intervall für Kollisionsprüfung und Wurfbare-Objekte-Prüfung festlegen
            this.checkCollisions(); // Kollisionen überprüfen
        }, 300);
    }

    checkThrowObjects(){ // Methode zur Überprüfung, ob wurfbare Objekte geworfen werden sollen
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection) // Neue Flasche erzeugen
            this.throwableObjects.push(bottle); // Flasche zur Liste der wurfbaren Objekte hinzufügen
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {  // Überprüfen, ob der Charakter mit einem Feind kollidiert
            if( this.character.isColliding(enemy) && !enemy.isDead()) {
             this.character.hit(); // Charakter wird getroffen
             this.statusBarLife.setPercentage(this.character.energy); // Lebensanzeige aktualisieren
             console.log('Collision with Character, energy ', this.character.energy); 
            }
            this.level.coin.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    coin.collect(); // Die collect()-Methode sollte auf dem Münzobjekt aufgerufen werden
                    this.statusBarCoin.increaseEnergy(10); // Anpassung der Energieanzeige
                    const coinIndex = this.level.coin.indexOf(coin);
                    this.level.coin.splice(coinIndex, 1); // Entfernen Sie die Münze aus dem Array, nachdem sie gesammelt wurde
                }
            })
            this.level.bottle.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    bottle.collect(); // Die collect()-Methode sollte auf dem Münzobjekt aufgerufen werden
                    this.statusBarBottle.increaseEnergy(10); // Anpassung der Energieanzeige
                    const bottleIndex = this.level.bottle.indexOf(bottle);
                    this.level.bottle.splice(bottleIndex, 1); // Entfernen Sie die Münze aus dem Array, nachdem sie gesammelt wurde
                    console.log('Statusbar Bottle', this.statusBarBottle.energy)
                }
            })
         });
    }

    checkCollisionsEndboss() {
        // Überprüfen, ob eine werfbare Flasche mit dem Endboss kollidiert
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.enemies[this.level.enemies.length-1])) {
                this.level.enemies[this.level.enemies.length-1].hit(); // Endboss wird getroffen
                this.statusBarEndboss.setPercentage(this.level.enemies[this.level.enemies.length-1].energy); // Lebensanzeige des Endboss aktualisieren
                console.log('Collision with Endboss, energy ', this.level.enemies[this.level.enemies.length-1].energy); 
            }
        });
    }
    
    checkCollisionsEnemies() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.character.isCollidingJump(enemy) && this.character.speedY < 0) {
                enemy.hit(); // Feind wird getroffen
                this.character.jump();
                this.statusBarEndboss.setPercentage(this.level.enemies[this.level.enemies.length-1].energy); // Lebensanzeige des Endboss aktualisieren

                console.log('Collision with Character, enemy energy ', enemy.energy);
                if (enemy.isDead()) {
                    // Den Feind erst nach 1,5 Sekunden entfernen
                    setTimeout(() => {
                        const index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                            this.level.enemies.splice(index, 1);
                        }
                    }, 1500);
                }
            }
        }
    }

    // checkCollisionsEnemies() {
    //     this.level.enemies.forEach((enemy) => {
    //         this.throwableObjects.forEach((bottle) => {
    //             if (bottle.isColliding(enemy)) {
    //                 bottle.hit(); // Die Flasche wird getroffen (im Grunde genommen ein temporäres Objekt)
    //                 enemy.hit(); // Der Feind wird getroffen
    //                 // Überprüfen, ob der Feind tot ist
    //                 if (enemy.isDead()) {
    //                     // Entfernen Sie den Feind aus der Liste der Feinde
    //                     const index = this.level.enemies.indexOf(enemy);
    //                     if (index > -1) {
    //                         this.level.enemies.splice(index, 1);
    //                     }
    //                 }
    //                 console.log('Collision with Endboss, enemy energy ', enemy.energy);
    //             }
    //         });
    //     });
    // }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // leert das canvas

        this.ctx.translate(this.camera_x, 0); // translate verschiebt das Bild nach links
        this.addObjectsToMap(this.level.backgroundObject);
        this.ctx.translate(-this.camera_x, 0); // Back ------- Space for fixed objects ------


        this.ctx.translate(this.camera_x, 0); // Forwards
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.ctx.translate(-this.camera_x, 0); // translate verschiebt den Ausschnitt wieder nach rechts
        
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);

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
        // mo.drawFrame(this.ctx);
        mo.drawCollisonFrame(this.ctx);
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