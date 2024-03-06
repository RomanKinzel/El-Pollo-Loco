class MovableObject extends DrawableObject {

    speed = 0.15; // Die Geschwindigkeit des beweglichen Objekts
    otherDirection = false; // Variable zur Verfolgung der Bewegungsrichtung
    speedY = 0; // Die vertikale Geschwindigkeit des Objekts
    acceleration = 2.5; // Die Beschleunigung des Objekts
    energy = 100; // Die Energie oder Lebenspunkte des Objekts

    lastHit = 0; // Zeitstempel der letzten Kollision

    applyGravity() {
        // Funktion, die in regelmäßigen Intervallen ausgeführt wird, um die Schwerkraft anzuwenden
        setInterval(() => {
            // Überprüfen, ob das Objekt noch über dem Boden ist (180 ist hier ein Platzhalterwert für die Bodenhöhe)
            if (this.isAboveGround() || this.speedY > 0) {
                // Reduziere die vertikale Position des Objekts basierend auf seiner vertikalen Geschwindigkeit
                this.y -= this.speedY;
                // Verringere die vertikale Geschwindigkeit des Objekts basierend auf der Beschleunigung
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25); // Intervall: Alle 25 Millisekunden
    }

    isAboveGround(){  // Methode zur Überprüfung, ob sich das Objekt über dem Boden befindet
        if (this instanceof ThrowableObject) { // Objekte, die geworfen werden können, sollten immer fallen
            return true;
        } else {
        return this.y < 180; // Eine einfache Überprüfung, ob sich das Objekt über einer bestimmten y-Position befindet
        } 
    }
    


    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

        // isColliding (mo) { // Methode zur Überprüfung der Kollision basierend auf den Positionen und Abmessungen der Objekte
        //     return this.x + this.width > mo.x &&
        //     this.y + this.height > mo.y &&
        //     this.x < mo.x &&
        //     this.y < mo.y + mo.height;
        // }

        hit() {     // Reduzieren der Energie des Objekts und Festlegen des Zeitstempels für den letzten Treffer
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }

        isHurt() { // Methode zur Überprüfung, ob das Objekt kürzlich getroffen wurde und verletzlich ist
            let timepassed = new Date().getTime() - this.lastHit; // Differenz seit dem letzten Treffer in Millisekunden
            timepassed = timepassed / 1000; // Differenz in Sekunden umrechnen
            return timepassed < 1; // Objekt ist verletzlich, wenn der letzte Treffer weniger als 1 Sekunde her ist
        }

        isDead() { // Methode zur Überprüfung, ob das Objekt tot ist (keine Energie mehr hat)
            return this.energy == 0;
        }

    playAnimation(images) { // Methode zur Wiedergabe einer Animation basierend auf einer Liste von Bildern
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0   // Index des aktuellen Bildes berechnen
        let path = images[i]; // Bildpfad aus der Liste der Bilder holen
        this.img = this.imageCache[path]; // Das aktuelle Bild setzen
        this.currentImage++; // Den Index für das nächste Bild erhöhen
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}


