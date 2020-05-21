import "./css/style.css";
import "normalize.css";

import { startScrollEventListeners } from "./src/animations";
import { generateBackground } from "./src/canvas";

startScrollEventListeners();
generateBackground();
