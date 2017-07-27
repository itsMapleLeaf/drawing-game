import 'normalize.css/normalize.css'
import './styles.css'

import * as io from 'socket.io-client'
import { Point } from './point'
import { DrawingBoard } from './drawing-board'
import * as chat from './chat'

function getCanvas() {
  const canvas = document.querySelector('.game-canvas')
  if (canvas instanceof HTMLCanvasElement) return canvas
  throw new Error('Could not get canvas element')
}

function init() {
  const canvas = getCanvas()
  const graphics = canvas.getContext('2d') as CanvasRenderingContext2D
  const drawingBoard = new DrawingBoard()

  canvas.addEventListener('pointerdown', event => {
    drawingBoard.beginDrawing(new Point(event.offsetX, event.offsetY))
  })

  window.addEventListener('pointerup', () => {
    drawingBoard.finishDrawing()
  })

  canvas.addEventListener('pointermove', event => {
    if (drawingBoard.isPenDown) {
      drawingBoard.updateCurrentLine(new Point(event.offsetX, event.offsetY))
      drawingBoard.render(graphics)
    }
  })

  canvas.addEventListener('keydown', event => {
    if (event.ctrlKey && event.keyCode === 90) {
      drawingBoard.undo()
      drawingBoard.render(graphics)
    }
  })

  const socket = io('localhost:3000')
  chat.init(socket)
}

init()
