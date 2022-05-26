import Trigonometry from '../MathModule/Trigonometry.js';
import Graphics from '../GraphicsModule/Graphics.js';
export default class Mesh {
    _sourceImagePath;
    _sourceImage;
    _dimensions;
    _animationState;
    constructor(sourceImagePath, dimensions, animationState = 0) {
        this.loadNewImage(sourceImagePath);
        this.dimensions = dimensions;
        this.animationState = animationState;
    }
    loadNewImage(sourceImagePath = null) {
        if (sourceImagePath == null) {
            this.sourceImagePath = sourceImagePath;
            return this.sourceImage = Graphics.loadNewImage(this.sourceImagePath);
        }
        return this.sourceImage = Graphics.loadNewImage(sourceImagePath);
    }
    draw(ctx, transform) {
        ctx.save();
        ctx.translate(transform.position.x, transform.position.y);
        ctx.rotate(Trigonometry.radians(transform.rotation));
        ctx.drawImage(this.sourceImage, this.dimensions.x * this.animationState, 0, this.dimensions.x, this.dimensions.y, -this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
        ctx.restore();
    }
    get sourceImagePath() {
        return this._sourceImagePath;
    }
    set sourceImagePath(sourceImagePath) {
        this._sourceImagePath = sourceImagePath;
    }
    get sourceImage() {
        return this._sourceImage;
    }
    set sourceImage(sourceImage) {
        this._sourceImage = sourceImage;
    }
    get dimensions() {
        return this._dimensions;
    }
    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }
    get animationState() {
        return this._animationState;
    }
    set animationState(animationState) {
        this._animationState = animationState;
    }
}
//# sourceMappingURL=Mesh.js.map