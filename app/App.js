import { CarsController } from "./Controllers/CarsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  carsController = new CarsController()
}

window["app"] = new App();
