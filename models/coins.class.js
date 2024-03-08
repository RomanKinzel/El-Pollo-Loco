class Coin extends MovableObject {
    y = 120;
    height = 120;
    width = 120;
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
    };

    energy = 0;

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x =Math.random() * 1500 + Math.random() * 500; // Zahl wischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.45;
        this.animate();
        this.collect();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    } 
    
    collect() {
        this.energy += 10;
    }
}