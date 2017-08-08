/* @flow */

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
/**
 * Class representing a game loop
 */
export default class GameLoop {
  listeners: Array<(dt: number) => void>
  fpsCap: number
  playing: boolean
  constructor(fpsCap: number = 30, listeners: Array<(dt: number) => void> = []) {
    console.log("test")
    this.listeners = listeners
    this.playing = false
    this.fpsCap = fpsCap
  }
  add(listener: (dt: number) => void) {
    this.listeners.push(listener)
  }
  remove(listener: (dt: number) => void) {
    this.listeners.splice(this.listeners.indexOf(listener),1)
  }
  start(): void {
    this.playing = true
    var now, dt, last = timestamp()
    const frame = () => {
      now = timestamp()
      dt = (now - last) / 1000
      if(dt >= 1/this.fpsCap) {
        this.listeners.forEach((listener) => listener(dt))
        last = now
      }
      if(this.playing) {
        requestAnimationFrame(frame)
      }
    }
    requestAnimationFrame(frame)
  }
  stop(): void {
    this.playing = false
  }
}
