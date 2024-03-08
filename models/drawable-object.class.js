class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
  


    loadImage(path) {     // Methode zum Laden eines Bildes aus dem angegebenen Pfad
        this.img = new Image(); // Neues Bildobjekt erstellen
        this.img.src = path; // Bildpfad setzen, um das Bild zu laden
    }

    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Bild auf dem Canvas zeichnen
        } catch(e) {
            // console.warn('Error loading image', e);
            // console.log('Counld not load image', this.img);
        }
    }

    // Methode zum Zeichnen des Rahmens des Objekts auf dem Canvas (falls erforderlich)
    // drawFrame(ctx){ 
    //     if ( this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) { // Wenn das Objekt ein Charakter oder ein Chicken ist
    //         ctx.beginPath(); // Neuen Pfad beginnen
    //         ctx.lineWidth = '5'; // Linienbreite festlegen
    //         ctx.strokeStyle = 'blue'; // Rahmenfarbe festlegen
    //         ctx.rect(this.x, this.y, this.width, this.height); // Rechteck um das Objekt zeichnen
    //         ctx.stroke(); // Rahmen zeichnen
    //     }
    // }

    drawCollisonFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof ChickenSmall || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
     */
    loadImages(arr){ // Methode zum Laden einer Liste von Bildern aus den angegebenen Pfaden
        arr.forEach((path) => { // vorschleife durch die pfade 
            let img = new Image(); // Variable für neues Bild
            img.src = path; // Bildpfad setzen, um das Bild zu laden
            this.imageCache[path] = img; // Bildobjekt im Cache speichern
        })
    }
}