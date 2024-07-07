import GameController from './gamecontroller'

const canvas = document.getElementById('game');
canvas.width = 300;
canvas.height = 600;
const context = canvas.getContext('2d');

const start = document.getElementById('start')

start.onclick = () => {
    const controller = new GameController(context)
    controller.newGame()
    controller.startLoop()
    
    const pause = document.createElement('button')
    pause.innerText = 'Pause'
    const panel = document.getElementById('buttons')
    panel.appendChild(pause)

    const end = document.createElement('button')
    end.innerText = 'Quit'
    panel.appendChild(end)

    let state = 'running'
    pause.onclick = () => {
        if (state === 'running') {
            pause.innerText = 'Resume'
            controller.pauseLoop()
            state = 'paused'
        }
        else if (state === 'paused') {
            pause.innerText= 'Pause'
            controller.resumeLoop()
            state = 'running'
        }
    }

    end.onclick = () => {
        controller.end()
        pause.remove()
        end.remove()
    }
}