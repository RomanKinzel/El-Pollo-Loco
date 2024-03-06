class Endboss extends MovableObject {

    height = 300;
    width = 200;
    y = 150;
    offset = {
      top: 50,
      left: 5,
      right: 5,
      bottom: 0
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ]

  hadFirstContact = false; // Variable zur Verfolgung, ob der Spieler den Endboss zum ersten Mal erreicht hat

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]); // Bild des Endbosses im Alarmzustand laden
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_HURT);
    this.x = 2500; // Startposition des Endbosses
    this.animate(); // Animation des Endbosses starten
  }

  animate() {
    let i = 0; // Variable zur Verfolgung des aktuellen Bildindex
    setInterval(() => {
      if ( i < 8) {
        this.playAnimation(this.IMAGES_ALERT); // Wenn der Endboss im Alarmzustand ist, Alarmbildanimation abspielen
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALK);  // Ansonsten Gehbildanimation abspielen
      }
      i++;
      if (world.character.x > 2000 && !this.hadFirstContact) { // Überprüfen, ob der Spieler den Endboss zum ersten Mal erreicht hat
        i = 0; // Bildindex zurücksetzen, um die Alarmanimation erneut abzuspielen
        this.hadFirstContact = true; // Flag setzen, um anzuzeigen, dass der erste Kontakt stattgefunden hat
      }
      // console.log(world.character.x)
    }, 200);
  }
}
 