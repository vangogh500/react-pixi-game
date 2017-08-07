package pixi

import scala.scalajs.js
import scala.scalajs.js.annotation.JSImport

@JSImport("pixi.js", "Application")
@js.native
class App() extends js.Object {
  val ticker = new Ticker()
}
