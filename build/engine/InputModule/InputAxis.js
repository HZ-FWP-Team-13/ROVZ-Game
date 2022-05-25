import KeyListener from './KeyListener.js';
export default class InputAxis {
    keyListener;
    value = 0;
    positiveDescription;
    positiveKey;
    negativeDescription;
    negativeKey;
    positiveKeyAlt;
    negativeKeyAlt;
    constructor(positiveDescription, positiveKey, negativeDescription = '', negativeKey = 0, positiveKeyAlt = 0, negativeKeyAlt = 0) {
        this.keyListener = new KeyListener();
        this.positiveDescription = positiveDescription;
        this.positiveKey = positiveKey;
        this.negativeDescription = negativeDescription;
        this.negativeKey = negativeKey;
        this.positiveKeyAlt = positiveKeyAlt;
        this.negativeKeyAlt = negativeKeyAlt;
    }
    getValue() {
        return this.value;
    }
    getPositiveDescription() {
        return this.positiveDescription;
    }
    getNegativeDescription() {
        return this.negativeDescription;
    }
    getPressedKeyValue(keyCode) {
        return Number(this.keyListener.isKeyDown(keyCode));
    }
    getTypedKeyValue(keyCode) {
        return Number(this.keyListener.isKeyTyped(keyCode));
    }
    getPositivePressedInput() {
        let positiveDownInput = 0;
        if (this.positiveKeyAlt != 0) {
            positiveDownInput = Math.max(this.getPressedKeyValue(this.positiveKey), this.getPressedKeyValue(this.positiveKeyAlt));
        }
        else {
            positiveDownInput = this.getPressedKeyValue(this.positiveKey);
        }
        return positiveDownInput;
    }
    getPositiveTypedInput() {
        let positiveTypedInput = 0;
        if (this.positiveKeyAlt != 0) {
            positiveTypedInput = Math.max(this.getTypedKeyValue(this.positiveKey), this.getTypedKeyValue(this.positiveKeyAlt));
        }
        else {
            positiveTypedInput = this.getTypedKeyValue(this.positiveKey);
        }
        return positiveTypedInput;
    }
    getNegativePressedInput() {
        let negativeDownInput = 0;
        if (this.negativeKeyAlt != 0) {
            negativeDownInput = Math.max(this.getPressedKeyValue(this.negativeKey), this.getPressedKeyValue(this.negativeKeyAlt));
        }
        else if (this.negativeKey != 0) {
            negativeDownInput = this.getPressedKeyValue(this.negativeKey);
        }
        else {
            negativeDownInput = 0;
        }
        return negativeDownInput;
    }
    getNegativeTypedInput() {
        let negativeTypedInput = 0;
        if (this.negativeKeyAlt != 0) {
            negativeTypedInput = Math.max(this.getTypedKeyValue(this.negativeKey), this.getTypedKeyValue(this.negativeKeyAlt));
        }
        else if (this.negativeKey != 0) {
            negativeTypedInput = this.getTypedKeyValue(this.negativeKey);
        }
        else {
            negativeTypedInput = 0;
        }
        return negativeTypedInput;
    }
    readPressed() {
        return this.value = this.getPositivePressedInput() - this.getNegativePressedInput();
    }
    readTyped() {
        return this.value = this.getPositiveTypedInput() - this.getNegativeTypedInput();
    }
}
//# sourceMappingURL=InputAxis.js.map