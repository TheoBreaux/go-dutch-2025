import { SCREEN_WIDTH } from "../constants/constants";

//more balanced cross-platform approach → Use 390px
const baseWidth = 390;
export const scaleFont = (fontSize) => (SCREEN_WIDTH / baseWidth) ** (2 / 3) * fontSize