import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadPlayfairDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import { loadFont as loadAleo } from "@remotion/google-fonts/Aleo";

// Load all fonts
const montserrat = loadMontserrat();
const roboto = loadRoboto();
const oswald = loadOswald();
const poppins = loadPoppins();
const playfair = loadPlayfairDisplay();
const lato = loadLato();
const aleo = loadAleo();

// Available font options
export const AVAILABLE_FONTS = {
  Montserrat: montserrat.fontFamily,
  Roboto: roboto.fontFamily,
  Oswald: oswald.fontFamily,
  Poppins: poppins.fontFamily,
  "Playfair Display": playfair.fontFamily,
  Lato: lato.fontFamily,
  Aleo: aleo.fontFamily,
} as const;

export type FontFamily = keyof typeof AVAILABLE_FONTS;
