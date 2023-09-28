// Constants for character code ranges
const LOWERCASE_LETTERS_RANGE = { start: 97, end: 122 }; // ASCII range for lowercase letters (a-z)
const UPPERCASE_LETTERS_RANGE = { start: 65, end: 90 };  // ASCII range for uppercase letters (A-Z)
const DIGITS_RANGE = { start: 48, end: 57 };             // ASCII range for digits (0-9)
const WHITESPACE_CODE = 32;                              // ASCII code for whitespace (space character)

// Function to check if a string contains English letters, numbers, and whitespace
export function isEnglish(text: string) {
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    // Check if the character code is within the defined ranges
    if (
      (charCode < LOWERCASE_LETTERS_RANGE.start || charCode > LOWERCASE_LETTERS_RANGE.end) &&
      (charCode < UPPERCASE_LETTERS_RANGE.start || charCode > UPPERCASE_LETTERS_RANGE.end) &&
      (charCode < DIGITS_RANGE.start || charCode > DIGITS_RANGE.end) &&
      charCode !== WHITESPACE_CODE
    ) {
      return false;
    }
  }

  return true;
}
