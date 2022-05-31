import Component from '../CoreModule/Component.js';
import Mathematics from '../MathModule/Mathematics.js';
import Graphics from '../GraphicsModule/Graphics.js';
export default class Mesh extends Component {
    _sourceImagePath;
    _sourceImage;
    _dimensions;
    _animationState;
    constructor(sourceImagePath, dimensions, animationState = 0) {
        super("mesh");
        this.sourceImagePath = sourceImagePath;
        this.dimensions = dimensions;
        this.animationState = animationState;
    }
    draw(ctx, transform) {
        ctx.save();
        ctx.translate(transform.position.x, transform.position.y);
        ctx.rotate(Mathematics.radians(transform.rotation));
        ctx.drawImage(this.sourceImage, this.dimensions.x * this.animationState, 0, this.dimensions.x, this.dimensions.y, -this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
        ctx.restore();
    }
    get sourceImagePath() {
        return this._sourceImagePath;
    }
    set sourceImagePath(value) {
        this._sourceImagePath = value;
        this.sourceImage = Graphics.loadNewImage(value);
    }
    get sourceImage() {
        return this._sourceImage;
    }
    set sourceImage(value) {
        this._sourceImage = value;
    }
    get dimensions() {
        return this._dimensions;
    }
    set dimensions(value) {
        this._dimensions = value;
    }
    get animationState() {
        return this._animationState;
    }
    set animationState(value) {
        this._animationState = value;
    }
}
//# sourceMappingURL=Mesh.js.map