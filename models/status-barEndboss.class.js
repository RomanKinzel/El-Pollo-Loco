class BarEndboss extends StatusBar {
    IMAGES_BAR = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 500;
        this.y = 8;
        this.setPercentage(100);
    }
}