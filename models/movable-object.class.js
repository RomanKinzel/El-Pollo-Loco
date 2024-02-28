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
    energy = 100;

    lastHit = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // // Bessere Formel zur Kollisionsberechnung (Genauer)
    // isColliding (mo) {
    //     return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
    //             (this.y + this.offsetY + this.height) >= mo.y &&
    //             (this.y + this.offsetY) <= (mo.y + mo.height) && 
    //             mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    //     }

        isColliding (mo) {
            return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
        }

        hit() {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }

        isHurt() {
            let timepassed = new Date().getTime() - this.lastHit; // differcence in ms
            timepassed = timepassed / 1000; // difference in s
            return timepassed < 1;
        }

        isDead() {
            return this.energy == 0;
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


