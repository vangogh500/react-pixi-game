/* @flow */

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
/**
 * Game loop.
 */
export default class GameLoop {
  listeners: Array<(dt: number) => void>
  fpsCap: number
  playing: boolean
  constructor(fpsCap: number = 30, listeners: Array<(dt: number) => void> = []) {
    this.listeners = listeners
    this.playing = false
    this.fpsCap = fpsCap
  }

  /**
   * Subscribe a listener to the loop.
   */
  add(listener: (dt: number) => void) {
    this.listeners.push(listener)
  }

  /**
   * Remove a listener from the loop. *Removed via reference.
   */
  remove(listener: (dt: number) => void) {
    this.listeners.splice(this.listeners.indexOf(listener),1)
  }

  /**
   * Starts the loop.
   */
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

  /**
   * Terminates the loop after 1 cycle.
   */
  stop(): void {
    this.playing = false
  }
}
