import KeyListener from './KeyListener.js';
export default class InputAxis {
    keyListener;
    value = 0;
    positiveKey;
    negativeKey;
    positiveKeyAlt;
    negativeKeyAlt;
    constructor(positiveKey, negativeKey = 0, positiveKeyAlt = 0, negativeKeyAlt = 0) {
        this.keyListener = new KeyListener();
        this.positiveKey = positiveKey;
        this.negativeKey = negativeKey;
        this.positiveKeyAlt = positiveKeyAlt;
        this.negativeKeyAlt = negativeKeyAlt;
    }
    isKeyDown(keyCode) {
        return Number(this.keyListener.isKeyDown(keyCode));
    }
    readInput() {
        let positiveAxisInput = 0;
        if (this.positiveKeyAlt != 0) {
            positiveAxisInput = Math.max(this.isKeyDown(this.positiveKey), this.isKeyDown(this.positiveKeyAlt));
        }
        else {
            positiveAxisInput = this.isKeyDown(this.positiveKey);
        }
        let negativeAxisInput = 0;
        if (this.negativeKeyAlt != 0) {
            negativeAxisInput = Math.max(this.isKeyDown(this.negativeKey), this.isKeyDown(this.negativeKeyAlt));
        }
        else if (this.negativeKey != 0) {
            negativeAxisInput = this.isKeyDown(this.negativeKey);
        }
        else {
            negativeAxisInput = 0;
        }
        return this.value = positiveAxisInput - negativeAxisInput;
    }
    getValue() {
        return this.value;
    }
}
//# sourceMappingURL=InputAxis.js.map