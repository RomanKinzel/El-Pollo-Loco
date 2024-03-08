class ChickenSmall extends MovableObject {
    y = 360;
    height = 60;
    width = 40;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    energy = 5;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x =Math.random() * 1000 + Math.random() * 500; // Zahl wischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        setInterval(() => {
            if(this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);        
          } else {
           this.playAnimation(this.IMAGES_WALKING);
          }
        }, 200)
      }
      
}