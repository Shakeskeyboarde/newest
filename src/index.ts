#!/usr/bin/env node
import sourceMapSupport from "source-map-support";
import main from "./main";
sourceMapSupport.install();

process.on("uncaughtException", onUncaughtException);
process.on("unhandledRejection", onUncaughtException);

function onUncaughtException(err: any) {
  console.log(`${err}`);
  process.exit(1);
}

main();
