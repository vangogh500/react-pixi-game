enablePlugins(ScalaJSPlugin)
enablePlugins(ScalaJSBundlerPlugin)
scalaJSModuleKind := ModuleKind.CommonJSModule

libraryDependencies += "com.github.japgolly.scalajs-react" %%% "core" % "1.1.0"

npmDependencies in Compile ++= Seq(
    "react" -> "15.6.1",
    "react-dom" -> "15.6.1")

name := "react-pixi-game"
organization := "vangogh500"
version := "0.0.1-SNAPSHOT"
scalaVersion := "2.12.2"

scalaJSUseMainModuleInitializer := false
