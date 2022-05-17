import Graphics from './Graphics.js';
export default class GameItem {
    ctx;
    imgSourcePath;
    imgSource;
    xPos;
    yPos;
    rotation;
    frameWidth;
    frameHeight;
    colliderWidth;
    colliderHeight;
    animationState;
    constructor(ctx, imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth = frameWidth, colliderHeight = frameHeight, animationState = 0) {
        this.ctx = ctx;
        this.imgSourcePath = imgSourcePath;
        this.setImgSource(imgSourcePath);
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.animationState = animationState;
    }
    moveAbsolute(dXAbs, dYAbs, dR = 0) {
        this.xPos += dXAbs;
        this.yPos += dYAbs;
        if (dR != 0) {
            this.rotate(dR);
        }
    }
    rotate(dR) {
        this.rotation += dR;
    }
    moveRelative(dXRel, dYRel) {
        let dist = Math.sqrt(dXRel ** 2 + dYRel ** 2);
        let moveSlopeRel = Math.atan(dXRel / dYRel);
        let moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();
        let dXAbs = dist * Math.sin(moveSlopeAbs);
        let dYAbs = dist * Math.cos(moveSlopeAbs);
        this.moveAbsolute(dXAbs, dYAbs);
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.xPos, this.yPos);
        this.ctx.rotate(this.getRotationInRadians());
        this.ctx.drawImage(this.imgSource, this.frameWidth * this.animationState, this.frameHeight, this.frameWidth, this.frameHeight, -this.frameWidth / 2, -this.frameHeight / 2, this.frameWidth, this.frameHeight);
        this.ctx.restore();
    }
    getImgSourcePath() {
        return this.imgSourcePath;
    }
    getImgSource() {
        return this.imgSource;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getRotation() {
        return this.rotation;
    }
    getRotationInRadians() {
        return this.rotation / 180 * Math.PI;
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
        this.xPos = xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }
    setFrameWidth(frameWidth) {
        this.frameWidth = frameWidth;
    }
    setFrameHeight(frameHeight) {
        this.frameHeight = frameHeight;
    }
    setColiderWidth(colliderWidth) {
        this.colliderWidth = colliderWidth;
    }
    setColiderHeight(colliderHeight) {
        this.colliderHeight = colliderHeight;
    }
    setAnimationState(animationState) {
        this.animationState = animationState;
    }
}
//# sourceMappingURL=GameItem.js.map