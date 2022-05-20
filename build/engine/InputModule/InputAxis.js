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
    readInput() {
        let positiveAxisInput = 0;
        if (this.positiveKeyAlt != 0) {
            positiveAxisInput = Math.max(Number(this.keyListener.isKeyDown(this.positiveKey)), Number(this.keyListener.isKeyDown(this.positiveKeyAlt)));
        }
        else {
            positiveAxisInput = Number(this.keyListener.isKeyDown(this.positiveKey));
        }
        let negativeAxisInput = 0;
        if (this.negativeKeyAlt != 0) {
            negativeAxisInput = Math.max(Number(this.keyListener.isKeyDown(this.negativeKey)), Number(this.keyListener.isKeyDown(this.negativeKeyAlt)));
        }
        else if (this.negativeKey != 0) {
            negativeAxisInput = Number(this.keyListener.isKeyDown(this.negativeKey));
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