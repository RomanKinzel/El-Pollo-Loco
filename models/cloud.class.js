class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2500; // Zufällige x-Position zwischen 0 und 500 festlegen
        this.animate();
    }

    animate() { // Wolken bewegen sich alle 1000ms (60FPS)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}