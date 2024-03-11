class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]; 

    constructor(x, y, od ){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png') // Laden des Bildes für das geworfene Objekt
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x; // Setzen der x-Position des Objekts
        this.y = y; // Setzen der y-Position des Objekts
        this.otherDirection = od;
        this.height = 90;
        this.width = 70;
        this.offset = {
            top: 0,
            left: 20,
            right: 20,
            bottom: 5,
        };
        this.trow(); // Funktion zum Ausführen des Wurfes aufrufen
    }


    trow() { // Methode zum Werfen des Objekts
        this.speedY = 30; // Setzen der vertikalen Geschwindigkeit für den Wurf
        this.applyGravity(); // Anwenden der Schwerkraft auf das Objekt während des Wurfs
        setInterval(() => { // Funktion zum Bewegen des Objekts in regelmäßigen Intervallen aufrufen
            if (this.otherDirection == false) {
                this.x +=10;
            }
        }, 25)
        setInterval(() => { // Funktion zum Bewegen des Objekts in regelmäßigen Intervallen aufrufen
            if (this.otherDirection == true) {
                this.x -=10;
            } 
             // Bewegen des Objekts nach rechts
        }, 25)

        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);        
        }, 150)
    
    }

      
}