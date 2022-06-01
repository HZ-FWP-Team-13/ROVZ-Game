export default class GameObject {
    id;
    transform;
    constructor(id, transform) {
        this.id = id;
        this.transform = transform;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getTransform() {
        return this.transform;
    }
    setTransform(value) {
        this.transform = value;
    }
}
//# sourceMappingURL=GameObject.js.map