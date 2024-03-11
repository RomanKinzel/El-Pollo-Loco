class Level {
    enemies; // Eine Liste von Feinden im Level
    clouds; // Eine Liste von Wolken im Level
    backgroundObject; // Ein Hintergrundobjekt im Level
    level_end_x = 2900; // Die x-Position, die das Ende des Levels definiert
    coin;
    bottle;

    // Konstruktor für die Levelklasse
    constructor(enemies, clouds, backgroundObject, coin, bottle){
        this.enemies = enemies; // Setzen der Feinde des Levels
        this.clouds = clouds; // Setzen der Wolken des Levels
        this.backgroundObject = backgroundObject; // Setzen des Hintergrundobjekts des Levels
        this.coin = coin;
        this.bottle = bottle;
    }
}