import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  console.log(envs);
  //Server.start();
}
