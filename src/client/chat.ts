export function init(socket: SocketIOClient.Socket) {
  const chatInput = document.querySelector('.chat-input') as HTMLInputElement

  chatInput.onkeydown = event => {
    if (event.keyCode === 13 && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault()
      socket.emit('chat-message', { message: chatInput.value })
      chatInput.value = ''
    }
  }

  socket.on('chat-message', (params: { message: string; sender: string }) => {
    const container = document.querySelector('.chat-message-container')
    if (container) {
      container.innerHTML += `<div class='chat-message'><strong>${params.sender}</strong>: ${params.message}</div>`
    }
  })
}
