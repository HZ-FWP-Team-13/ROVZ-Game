import Graphics from './Graphics.js';
export default class Mesh {
    imgSourcePath;
    imgSource;
    frameWidth;
    frameHeight;
    animationState;
    constructor(imgSourcePath, frameWidth, frameHeight, animationState) {
        this.imgSourcePath = imgSourcePath;
        this.setImgSource(imgSourcePath);
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animationState = animationState;
    }
    draw(ctx, transform) {
        ctx.save();
        ctx.translate(transform.position.x, transform.position.y);
        ctx.rotate(transform.getRotationInRadians());
        ctx.drawImage(this.imgSource, this.frameWidth * this.animationState, 0, this.frameWidth, this.frameHeight, -this.frameWidth / 2, -this.frameHeight / 2, this.frameWidth, this.frameHeight);
        ctx.restore();
    }
    getImgSourcePath() {
        return this.imgSourcePath;
    }
    getImgSource() {
        return this.imgSource;
    }
    getFrameWidth() {
        return this.frameWidth;
    }
    getFrameHeight() {
        return this.frameHeight;
    }
    getAnimationState() {
        return this.animationState;
    }
    setImgSource(imgSourcePath) {
        this.imgSource = Graphics.loadNewImage(imgSourcePath);
    }
    setFrameWidth(frameWidth) {
        this.frameWidth = frameWidth;
    }
    setFrameHeight(frameHeight) {
        this.frameHeight = frameHeight;
    }
    setAnimationState(animationState) {
        this.animationState = animationState;
    }
}
//# sourceMappingURL=Mesh.js.map