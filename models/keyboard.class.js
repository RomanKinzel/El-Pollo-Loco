class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    // constructor(){
    //     this.btnPressEvent();
    // }

    btnPressEvent(){

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.RIGHT = false;
    });



    }
}
