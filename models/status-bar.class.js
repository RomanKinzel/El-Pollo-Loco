class StatusBar extends DrawableObject {
    width = 200; // Breite der Statusleiste
    height = 60; // Höhe der Statusleiste                          
    percentage = 100; // Prozentsatz der Statusleiste (anfänglich auf 100% gesetzt)


    setPercentage(percentage){ // Methode zur Festlegung des Prozentsatzes der Statusleiste und Aktualisierung des angezeigten Bildes
        this.percentage = percentage; // => 0 ... 5 // Prozentsatz der Statusleiste aktualisieren
        let path = this.IMAGES_BAR[this.resolveImageIndex()]; // Bildpfad basierend auf dem Prozentsatz der Statusleiste erhalten
        this.img = this.imageCache[path]; // Das entsprechende Bild aus dem Cache setzen
    }

       resolveImageIndex(){
        if (this.percentage == 100) {
         return 5;   
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2; 
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
       }

}