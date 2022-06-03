export default class Path {
    points;
    constructor() {
        this.points = [];
    }
    draw(ctx, camera) {
        const vertSize = 8;
        this.points.forEach((point) => {
            ctx.fillStyle = 'blue';
            const cameraPosition = camera.getTransform().getPosition();
            const cameraDimensions = camera.getFrameDimensions();
            ctx.fillRect(point.getX() - vertSize / 2 - cameraPosition.getX() + cameraDimensions.getX() / 2, point.getY() - vertSize / 2 - cameraPosition.getY() + cameraDimensions.getY() / 2, vertSize, vertSize);
        });
    }
    addPoint(point) {
        this.points.push(point);
    }
}
//# sourceMappingURL=Path.js.map