interface ChatMessage {
  sender: string
  message: string
}

function renderChatMessage(msg: ChatMessage) {
  return `
    <div class='chat-message'>
      <strong>${msg.sender}</strong>: ${msg.message}
    </div>
  `
}

export class Chat {
  chatInput = document.querySelector('.chat-input') as HTMLInputElement
  messages = [] as ChatMessage[]

  constructor(private socket: SocketIOClient.Socket) {}

  init() {
    this.chatInput.onkeydown = event => {
      if (event.keyCode === 13 && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault()
        this.socket.emit('chat-message', { message: this.chatInput.value })
        this.chatInput.value = ''
      }
    }

    this.socket.on('chat-message', (msg: ChatMessage) => {
      this.addMessage(msg)
    })
  }

  addMessage(msg: ChatMessage) {
    this.messages.push(msg)
    this.renderMessages()
  }

  renderMessages() {
    const container = document.querySelector('.chat-message-container')
    if (container) {
      container.innerHTML = this.messages.map(renderChatMessage).join('')
    }
  }
}
