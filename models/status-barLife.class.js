class BarLife extends StatusBar {
    IMAGES_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 30;
        this.y = 0;
        this.setPercentage(100);
    }
}