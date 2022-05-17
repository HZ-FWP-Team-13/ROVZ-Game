import KeyListener from './KeyListener.js';
export default class Input {
    keyListener;
    horizontalAxis = 0;
    verticalAxis = 0;
    rotationAxis = 0;
    startKey;
    constructor() {
        this.keyListener = new KeyListener();
    }
    readHorizontalInput() {
        return this.horizontalAxis =
            (this.keyListener.isKeyDown(KeyListener.KEY_D) ? 1 : 0) -
                (this.keyListener.isKeyDown(KeyListener.KEY_A) ? 1 : 0);
    }
    readVerticalInput() {
        return this.verticalAxis =
            (this.keyListener.isKeyDown(KeyListener.KEY_W) ? 1 : 0) -
                (this.keyListener.isKeyDown(KeyListener.KEY_S) ? 1 : 0);
    }
    readRotationInput() {
        return this.rotationAxis =
            (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) ? 1 : 0) -
                (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) ? 1 : 0);
    }
    readStartInput() {
        console.log('Key is pressed sir!');
        return this.startKey = this.keyListener.isKeyTyped(KeyListener.KEY_S);
    }
    getHorizontalAxis() {
        return this.horizontalAxis;
    }
    getVerticalAxis() {
        return this.verticalAxis;
    }
    getRotationAxis() {
        return this.rotationAxis;
    }
    getStartKey() {
        return this.startKey;
    }
}
//# sourceMappingURL=Input.js.map