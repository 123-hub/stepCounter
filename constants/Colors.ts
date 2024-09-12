/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000';
const tintColorDark = '#fff';
export const primaryColor ="#553fc4";
// Suggestions for Usage:
// Primary Color: Use it for main elements like headers, buttons, or key interactive components.
// Accent Color: It can work well as an accent color against a lighter or neutral background.
// Contrast: Pair it with lighter colors like white, light gray, or a pastel shade to create a strong contrast.
// Complementary Colors:
// White or Light Gray (#f5f5f5): For a clean and minimalistic look.
// Gold or Yellow (#f2c94c): For a striking contrast that can make elements pop.
// Soft Pastels: Like lavender or peach for a softer, more approachable aesthetic.
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
