package pixi
import scala.scalajs.js
import scala.scalajs.js.annotation.JSImport

@JSImport("react", "component")
@js.native
class Component[D,P,S] extends js.Object {
  def componentWillMount(): Unit = {}
  def render(): js.Any = {}
}
