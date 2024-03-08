class Bottle extends MovableObject {
    y = 350;
    height = 100;
    width = 100;
    offset = {
        top: 15,
        left: 15,
        right: 15,
        bottom: 0
    };

    constructor(){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x =Math.random() * 2000 + Math.random() * 1500; // Zahl wischen 200 und 700
        this.collect();
    }

    collect() {
        this.energy += 10;
    }
}