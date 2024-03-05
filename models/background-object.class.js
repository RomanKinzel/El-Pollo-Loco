class BackgroundObject extends MovableObject {


    width = 720;
    height = 480;

    // Konstruktor der Klasse, der den Bildpfad und die x-Position als Parameter erhält
    constructor(imagePath, x){
        super().loadImage(imagePath);  // Das Bild laden, indem die loadImage-Methode der übergeordneten Klasse aufgerufen wird
        this.y = 480 - this.height; // Die y-Position berechnen, um das Objekt am unteren Rand des Canvas zu platzieren (480 - Höhe des Objekts)
        this.x = x; // Die x-Position des Objekts festlegen
    }

}