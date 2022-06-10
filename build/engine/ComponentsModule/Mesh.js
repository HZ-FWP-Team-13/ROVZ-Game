import Component from '../CoreModule/Component.js';
import Mathematics from '../MathModule/Mathematics.js';
import Graphics from '../GraphicsModule/Graphics.js';
export default class Mesh extends Component {
    sourceImagePath;
    sourceImage;
    dimensions;
    animationState;
    framecount;
    currentFrame;
    constructor(sourceImagePath, dimensions, framecount = 0) {
        super('mesh');
        this.sourceImagePath = sourceImagePath;
        this.setSourceImage(Graphics.loadNewImage(this.sourceImagePath));
        this.dimensions = dimensions;
        this.animationState = 0;
        this.framecount = framecount;
        this.currentFrame = 0;
    }
    draw(ctx, transform, camera) {
        this.currentFrame += 0.1;
        if (this.currentFrame > this.framecount - 1) {
            this.currentFrame = 0;
        }
        ctx.save();
        ctx.translate(transform.getPosition().getX(), transform.getPosition().getY());
        if (camera !== undefined) {
            ctx.translate(-camera.getTransform().getPosition().getX() + camera.getFrameDimensions().getX() / 2, -camera.getTransform().getPosition().getY() + camera.getFrameDimensions().getY() / 2);
        }
        ctx.rotate(Mathematics.radians(transform.getRotation() + (camera !== undefined ? camera.getTransform().getRotation() : 0)));
        let f = this.currentFrame;
        if (f % 1 !== 0) {
            f = parseInt(Math.round(f).toFixed(0), 10);
        }
        ctx.drawImage(this.sourceImage, this.dimensions.getX() * f, this.dimensions.getY() * this.animationState, this.dimensions.getX(), this.dimensions.getY(), -this.dimensions.getX() / 2, -this.dimensions.getY() / 2, this.dimensions.getX(), this.dimensions.getY());
        ctx.restore();
    }
    getSourceImagePath() {
        return this.sourceImagePath;
    }
    setSourceImagePath(value) {
        this.sourceImagePath = value;
        this.sourceImage = Graphics.loadNewImage(value);
    }
    getSourceImage() {
        return this.sourceImage;
    }
    setSourceImage(value) {
        this.sourceImage = value;
    }
    getDimensions() {
        return this.dimensions;
    }
    setDimensions(value) {
        this.dimensions = value;
    }
    getAnimationState() {
        return this.animationState;
    }
    setAnimationState(value) {
        this.animationState = value;
    }
}
//# sourceMappingURL=Mesh.js.map