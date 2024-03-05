class BarBottle extends StatusBar {
    IMAGES_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];


    constructor(){
        super().loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 30;
        this.y = 100;
        this.setPercentage(0);  // Initialisieren der Flaschenleiste mit 0% Prozentsatz
    }
}