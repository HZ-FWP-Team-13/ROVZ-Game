export default class Path {
    points;
    lastPointIndex;
    constructor(lastPointIndex = null) {
        this.points = [];
    }
    draw(ctx, camera) {
        const vertSize = 8;
        const cameraPosition = camera.getTransform().getPosition();
        const cameraDimensions = camera.getFrameDimensions();
        const normalizedCameraX = -cameraPosition.getX() + cameraDimensions.getX() / 2;
        const normalizedCameraY = -cameraPosition.getY() + cameraDimensions.getY() / 2;
        this.points.forEach((point) => {
            ctx.fillStyle = 'green';
            ctx.fillRect(point.getX() - vertSize / 2 + normalizedCameraX, point.getY() - vertSize / 2 + normalizedCameraY, vertSize, vertSize);
        });
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].getX() + normalizedCameraX, this.points[i].getY() + normalizedCameraY);
        }
        ctx.lineTo(this.points[0].getX() + normalizedCameraX, this.points[0].getY() + normalizedCameraY);
        ctx.stroke();
        ctx.closePath();
    }
    addPoint(point) {
        this.points.push(point);
    }
    getPoints() {
        return this.points;
    }
    getLastPointIndex() {
        return this.lastPointIndex;
    }
    setLastPointIndex(lastPointIndex) {
        this.lastPointIndex = lastPointIndex;
    }
}
//# sourceMappingURL=Path.js.map