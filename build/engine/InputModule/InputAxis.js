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
    pressedKeyValue(keyCode) {
        return Number(this.keyListener.isKeyDown(keyCode));
    }
    typedKeyValue(keyCode) {
        return Number(this.keyListener.isKeyTyped(keyCode));
    }
    positivePressedInput() {
        let positiveDownInput = 0;
        if (this.positiveKeyAlt !== 0) {
            positiveDownInput = Math.max(this.pressedKeyValue(this.positiveKey), this.pressedKeyValue(this.positiveKeyAlt));
        }
        else {
            positiveDownInput = this.pressedKeyValue(this.positiveKey);
        }
        return positiveDownInput;
    }
    positiveTypedInput() {
        let positiveTypedInput = 0;
        if (this.positiveKeyAlt !== 0) {
            positiveTypedInput = Math.max(this.typedKeyValue(this.positiveKey), this.typedKeyValue(this.positiveKeyAlt));
        }
        else {
            positiveTypedInput = this.typedKeyValue(this.positiveKey);
        }
        return positiveTypedInput;
    }
    negativePressedInput() {
        let negativeDownInput = 0;
        if (this.negativeKeyAlt !== 0) {
            negativeDownInput = Math.max(this.pressedKeyValue(this.negativeKey), this.pressedKeyValue(this.negativeKeyAlt));
        }
        else if (this.negativeKey !== 0) {
            negativeDownInput = this.pressedKeyValue(this.negativeKey);
        }
        else {
            negativeDownInput = 0;
        }
        return negativeDownInput;
    }
    negativeTypedInput() {
        let negativeTypedInput = 0;
        if (this.negativeKeyAlt !== 0) {
            negativeTypedInput = Math.max(this.typedKeyValue(this.negativeKey), this.typedKeyValue(this.negativeKeyAlt));
        }
        else if (this.negativeKey !== 0) {
            negativeTypedInput = this.typedKeyValue(this.negativeKey);
        }
        else {
            negativeTypedInput = 0;
        }
        return negativeTypedInput;
    }
    readPressed() {
        this.value = this.positivePressedInput() - this.negativePressedInput();
        return this.value;
    }
    readTyped() {
        this.value = this.positiveTypedInput() - this.negativeTypedInput();
        return this.value;
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
}
//# sourceMappingURL=InputAxis.js.map