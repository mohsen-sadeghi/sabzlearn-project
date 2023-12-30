import { getMe } from "./funcs/auth.js";
import { showUserNameInNavbar  , renderTopBarMenus , getAndShowMenus} from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameInNavbar();
  getMe()
  renderTopBarMenus()
  getAndShowMenus()
});