class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            // console.warn('Error loading image', e);
            // console.log('Counld not load image', this.img);
        }
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
}