import Orientation from "./Orientation";
import Position from "./Position";
import Scale from "./Scale";
export default class Transform {
    position;
    orientation;
    scale;
    constructor() {
        this.position = new Position();
        this.orientation = new Orientation();
        this.scale = new Scale();
    }
}
//# sourceMappingURL=Transform.js.map