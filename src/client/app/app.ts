import * as io from 'socket.io-client'
import { Point } from './point'
import { DrawingBoard } from './drawing-board'
import { Chat } from './chat'

export class App {
  canvas = this.getCanvas()
  graphics = this.canvas.getContext('2d') as CanvasRenderingContext2D
  drawingBoard = new DrawingBoard()
  socket = io('localhost:3000')
  chat = new Chat(this.socket)

  getCanvas() {
    const canvas = document.querySelector('.game-canvas')
    if (canvas instanceof HTMLCanvasElement) return canvas
    throw new Error('Could not get canvas element')
  }

  init() {
    this.chat.init()

    this.canvas.addEventListener('pointerdown', event => {
      this.drawingBoard.beginDrawing(new Point(event.offsetX, event.offsetY))
    })

    window.addEventListener('pointerup', () => {
      this.drawingBoard.finishDrawing()
    })

    this.canvas.addEventListener('pointermove', event => {
      if (this.drawingBoard.isPenDown) {
        this.drawingBoard.updateCurrentLine(new Point(event.offsetX, event.offsetY))
        this.drawingBoard.render(this.graphics)
      }
    })

    this.canvas.addEventListener('keydown', event => {
      if (event.ctrlKey && event.keyCode === 90) {
        this.drawingBoard.undo()
        this.drawingBoard.render(this.graphics)
      }
    })
  }
}
