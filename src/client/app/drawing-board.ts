import { Point } from './point'

export class Line {
  points = [] as Point[]
  color = 'black'
  width = 6

  addPoint(point: Point) {
    this.points.push(point)
  }

  get isEmpty() {
    return this.points.length === 0
  }

  render(graphics: CanvasRenderingContext2D) {
    if (this.isEmpty) return

    graphics.save()
    graphics.strokeStyle = this.color
    graphics.lineWidth = this.width
    graphics.lineJoin = 'round'
    graphics.lineCap = 'round'
    graphics.beginPath()
    graphics.moveTo(this.points[0].x, this.points[0].y)
    for (const point of this.points.slice(1)) {
      graphics.lineTo(point.x, point.y)
    }
    graphics.stroke()
    graphics.restore()
  }
}

export class DrawingBoard {
  lines = [] as Line[]
  isPenDown = false

  beginDrawing(startPoint: Point) {
    const line = new Line()
    line.addPoint(startPoint)
    this.lines.push(line)
    this.isPenDown = true
  }

  updateCurrentLine(point: Point) {
    this.lines[this.lines.length - 1].addPoint(point)
  }

  finishDrawing() {
    this.isPenDown = false
    this.lines = this.lines.filter(line => !line.isEmpty)
  }

  render(graphics: CanvasRenderingContext2D) {
    graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height)
    for (const line of this.lines) {
      line.render(graphics)
    }
  }

  undo() {
    this.lines.pop()
  }
}
