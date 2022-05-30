export default class Component {
    _type;
    constructor(type) {
        this.type = type;
    }
    get id() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
}
//# sourceMappingURL=Component.js.map