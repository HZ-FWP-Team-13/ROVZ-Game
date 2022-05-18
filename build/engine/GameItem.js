import Graphics from './Graphics.js';
import Polygon from './Polygon.js';
import XY from './XY.js';
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
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(this.getRotatedRectangleCoordinates().tl.x, this.getRotatedRectangleCoordinates().tl.y);
        ctx.lineTo(this.getRotatedRectangleCoordinates().tr.x, this.getRotatedRectangleCoordinates().tr.y);
        ctx.lineTo(this.getRotatedRectangleCoordinates().br.x, this.getRotatedRectangleCoordinates().br.y);
        ctx.lineTo(this.getRotatedRectangleCoordinates().bl.x, this.getRotatedRectangleCoordinates().bl.y);
        ctx.lineTo(this.getRotatedRectangleCoordinates().tl.x, this.getRotatedRectangleCoordinates().tl.y);
        ctx.closePath();
        ctx.fill;
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
    workOutNewPoints(vx, vy) {
        let rotatedAngle = this.getRotationInRadians();
        let cx = this.xPos;
        let cy = this.yPos;
        let dx = vx - cx;
        let dy = vy - cy;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let originalAngle = Math.atan2(dy, dx);
        let rotatedX = cx + distance * Math.cos(originalAngle + rotatedAngle);
        let rotatedY = cy + distance * Math.sin(originalAngle + rotatedAngle);
        return {
            x: rotatedX,
            y: rotatedY
        };
    }
    getRotatedRectangleCoordinates() {
        let cx = this.xPos;
        let cy = this.yPos;
        let cw = this.colliderWidth;
        let ch = this.colliderHeight;
        let topLeft = this.workOutNewPoints(cx - cw / 2, cy - ch / 2);
        let topRight = this.workOutNewPoints(cx + cw / 2, cy - ch / 2);
        let bottomLeft = this.workOutNewPoints(cx - cw / 2, cy + ch / 2);
        let bottomRight = this.workOutNewPoints(cx + cw / 2, cy + ch / 2);
        return {
            tl: topLeft,
            tr: topRight,
            bl: bottomLeft,
            br: bottomRight
        };
    }
    collidesWith(other) {
        let tRR = this.getRotatedRectangleCoordinates();
        let oRR = other.getRotatedRectangleCoordinates();
        let thisVertices = [
            new XY(tRR.tr.x, tRR.tr.y),
            new XY(tRR.br.x, tRR.br.y),
            new XY(tRR.bl.x, tRR.bl.y),
            new XY(tRR.tl.x, tRR.tl.y)
        ];
        let thisEdges = [
            new XY(tRR.br.x - tRR.tr.x, tRR.br.y - tRR.tr.y),
            new XY(tRR.bl.x - tRR.br.x, tRR.bl.y - tRR.br.y),
            new XY(tRR.tl.x - tRR.bl.x, tRR.tl.y - tRR.bl.y),
            new XY(tRR.tr.x - tRR.tl.x, tRR.tr.y - tRR.tl.y),
        ];
        let otherVertices = [
            new XY(oRR.tr.x, oRR.tr.y),
            new XY(oRR.br.x, oRR.br.y),
            new XY(oRR.bl.x, oRR.bl.y),
            new XY(oRR.tl.x, oRR.tl.y)
        ];
        let otherEdges = [
            new XY(oRR.br.x - oRR.tr.x, oRR.br.y - oRR.tr.y),
            new XY(oRR.bl.x - oRR.br.x, oRR.bl.y - oRR.br.y),
            new XY(oRR.tl.x - oRR.bl.x, oRR.tl.y - oRR.bl.y),
            new XY(oRR.tr.x - oRR.tl.x, oRR.tr.y - oRR.tl.y),
        ];
        let thisRectPolygon = new Polygon(thisVertices, thisEdges);
        let otherRectPolygon = new Polygon(otherVertices, otherEdges);
        if (this.sat(thisRectPolygon, otherRectPolygon)) {
            console.log('TRUE');
            return true;
        }
        else if (this.rotation === 0 && other.getRotation() === 0 &&
            !(this.xPos - this.colliderWidth > other.getXPos() + other.getColliderWidth() ||
                this.xPos + this.colliderWidth < other.getXPos() - other.getColliderWidth() ||
                this.yPos - this.colliderHeight > other.getYPos() + other.getColliderHeight() ||
                this.yPos + this.colliderHeight < other.getYPos() - other.getColliderHeight())) {
            console.log("TRUE");
            return true;
        }
        else {
            return false;
        }
    }
    sat(polygonA, polygonB) {
        var perpendicularLine = null;
        var dot = 0;
        var perpendicularStack = [];
        var amin = null;
        var amax = null;
        var bmin = null;
        var bmax = null;
        for (var i = 0; i < 4; i++) {
            perpendicularLine = new XY(-polygonA.edges[i].y, polygonA.edges[i].x);
            perpendicularStack.push(perpendicularLine);
        }
        for (var i = 0; i < 4; i++) {
            perpendicularLine = new XY(-polygonB.edges[i].y, polygonB.edges[i].x);
            perpendicularStack.push(perpendicularLine);
        }
        for (var i = 0; i < perpendicularStack.length; i++) {
            amin = null;
            amax = null;
            bmin = null;
            bmax = null;
            for (var j = 0; j < polygonA.vertices.length; j++) {
                dot = polygonA.vertices[j].x *
                    perpendicularStack[i].x +
                    polygonA.vertices[j].y *
                        perpendicularStack[i].y;
                if (amax === null || dot > amax) {
                    amax = dot;
                }
                if (amin === null || dot > amin) {
                    amin = dot;
                }
            }
            for (var j = 0; j < polygonB.vertices.length; j++) {
                dot = polygonB.vertices[j].x *
                    perpendicularStack[i].x +
                    polygonB.vertices[j].y *
                        perpendicularStack[i].y;
                if (bmax === null || dot > bmax) {
                    bmax = dot;
                }
                if (bmin === null || dot > bmin) {
                    bmin = dot;
                }
            }
            if ((amin < bmax && amin > bmin) || (bmin < amax && bmin > amin)) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=GameItem.js.map