class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;

    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        // Funktion, die die Schwerkraft auf das Objekt anwendet
        // Diese Funktion wird in regelmäßigen Intervallen ausgeführt
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

    isAboveGround(){
        return this.y < 180
    }
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
     */

    loadImages(arr){ 
        arr.forEach((path) => { // vorschleife durch die pfade 
            let img = new Image(); // Variable für neues Bild
            img.src = path; // Bild wird geladen
            this.imageCache[path] = img;
        })
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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


