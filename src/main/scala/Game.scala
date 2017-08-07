import pixi._
import scala.scalajs.js.annotation._

@JSExportTopLevel("Game")
@JSExportAll
class Game(val onTick: Double => Unit) {
  val app = new App()
  override def componentDidMount(): Unit = {
    app.ticker.add(onTick)
    app.ticker.start()
  }
}
