export const getFirstLetters = (str: string | undefined) => str?.match(/\b(\w)/g);

export const getStringAfterCharacter = (str: string | null | Storage, char: string) => str?.substring(str.indexOf(char) + 1);

export const isStringContainsOnlyWhitespace = (str: string | undefined): boolean => str?.trim().length === 0;

// will scroll the browser to the top of the page
const goToTop = () => window.scrollTo(0, 0);

// will return true if user is on an Apple device
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// will return true if in focus, false if not in focus
const elementIsInFocus = (el: unknown) => el === document.activeElement;
