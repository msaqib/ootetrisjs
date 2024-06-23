import GameController from './gamecontroller'

const canvas = document.getElementById('game');
canvas.width = 300;
canvas.height = 600;
const context = canvas.getContext('2d');

const controller = new GameController(context)
controller.startLoop()