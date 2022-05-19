import Transform from './experimenting/Transform.js';
import Graphics from './Graphics.js';
export default class GameItem {
    imgSourcePath;
    imgSource;
    transform;
    frameWidth;
    frameHeight;
    colliderWidth;
    colliderHeight;
    animationState;
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth = frameWidth, colliderHeight = frameHeight, animationState = 0) {
        this.transform = new Transform(xPos, yPos, rotation);
        this.imgSourcePath = imgSourcePath;
        this.setImgSource(imgSourcePath);
        this.transform.position.x = xPos;
        this.transform.position.y = yPos;
        this.transform.orientation.angle = rotation;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.animationState = animationState;
    }
    draw(ctx) {
        let tt = this.transform;
        ctx.save();
        ctx.translate(tt.position.x, tt.position.y);
        ctx.rotate(this.transform.getRotationInRadians());
        ctx.drawImage(this.imgSource, this.frameWidth * this.animationState, 0, this.frameWidth, this.frameHeight, -this.frameWidth / 2, -this.frameHeight / 2, this.frameWidth, this.frameHeight);
        ctx.restore();
    }
    getImgSourcePath() {
        return this.imgSourcePath;
    }
    getImgSource() {
        return this.imgSource;
    }
    getXPos() {
        return this.transform.position.x;
    }
    getYPos() {
        return this.transform.position.y;
    }
    getRotation() {
        return this.transform.orientation.angle;
    }
    getFrameWidth() {
        return this.frameWidth;
    }
    getFrameHeight() {
        return this.frameHeight;
    }
    getColliderWidth() {
        return this.colliderWidth;
    }
    getColliderHeight() {
        return this.colliderHeight;
    }
    getAnimationState() {
        return this.animationState;
    }
    setImgSource(imgSourcePath) {
        this.imgSource = Graphics.loadNewImage(imgSourcePath);
    }
    setXPos(xPos) {
        this.transform.position.x = xPos;
    }
    setYPos(yPos) {
        this.transform.position.y = yPos;
    }
    setRotation(rotation) {
        this.transform.orientation.angle = rotation;
    }
    getTransform() {
        return this.transform;
    }
    setFrameWidth(frameWidth) {
        this.frameWidth = frameWidth;
    }
    setFrameHeight(frameHeight) {
        this.frameHeight = frameHeight;
    }
    setColliderWidth(colliderWidth) {
        this.colliderWidth = colliderWidth;
    }
    setColliderHeight(colliderHeight) {
        this.colliderHeight = colliderHeight;
    }
    setAnimationState(animationState) {
        this.animationState = animationState;
    }
}
//# sourceMappingURL=GameItem.js.map