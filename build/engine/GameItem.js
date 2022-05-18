import Graphics from './Graphics.js';
export default class GameItem {
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
    constructor(imgSourcePath, xPos, yPos, rotation, frameWidth, frameHeight, colliderWidth = frameWidth, colliderHeight = frameHeight, animationState = 0) {
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
        this.rotate(dR);
    }
    rotate(dR) {
        this.rotation += dR;
    }
    moveRelative(dXRel, dYRel) {
        const dist = Math.sqrt(dXRel ** 2 + dYRel ** 2) * (dXRel >= 0 ? 1 : -1) * (dYRel >= 0 ? 1 : -1);
        const moveSlopeRel = Math.atan(dXRel / dYRel);
        const moveSlopeAbs = moveSlopeRel + this.getRotationInRadians();
        const dXAbs = dist * Math.sin(moveSlopeAbs);
        const dYAbs = dist * Math.cos(moveSlopeAbs);
        console.log(Math.atan(dXRel / dYRel));
        this.moveAbsolute(dXAbs, -dYAbs);
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.xPos, this.yPos);
        ctx.rotate(this.getRotationInRadians());
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
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getRotation() {
        return this.rotation;
    }
    getRotationInRadians() {
        return (this.rotation / 180) * Math.PI;
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