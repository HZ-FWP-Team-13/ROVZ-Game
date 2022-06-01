import Component from '../CoreModule/Component.js';
import Mathematics from '../MathModule/Mathematics.js';
import Graphics from '../GraphicsModule/Graphics.js';
export default class Mesh extends Component {
    sourceImagePath;
    sourceImage;
    dimensions;
    animationState;
    constructor(sourceImagePath, dimensions, animationState = 0) {
        super('mesh');
        this.sourceImagePath = sourceImagePath;
        this.setSourceImage(Graphics.loadNewImage(this.sourceImagePath));
        this.dimensions = dimensions;
        this.animationState = animationState;
    }
    draw(ctx, transform, camera) {
        ctx.save();
        ctx.translate(transform.getPosition().getX() - (camera !== undefined ? camera.getTransform().getPosition().getX() - camera.getFrameDimensions().getX() / 2 : 0), transform.getPosition().getY() - (camera !== undefined ? camera.getTransform().getPosition().getY() - camera.getFrameDimensions().getY() / 2 : 0));
        ctx.rotate(Mathematics.radians(transform.getRotation() + (camera !== undefined ? camera.getTransform().getRotation() : 0)));
        ctx.drawImage(this.sourceImage, this.dimensions.getX() * this.animationState, 0, this.dimensions.getX(), this.dimensions.getY(), -this.dimensions.getX() / 2, -this.dimensions.getY() / 2, this.dimensions.getX(), this.dimensions.getY());
        ctx.restore();
    }
    drawMenu(ctx, positions) {
        ctx.drawImage(this.sourceImage, positions.getPosition().getX(), positions.getPosition().getY(), this.dimensions.getX(), this.dimensions.getY());
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