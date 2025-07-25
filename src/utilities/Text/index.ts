class Text {
  public static getInitialLetters = (name: string): string => {
    // Handle empty name
    if (!name) return "??";

    // Fast return single names
    const words = name.split(/\s/);
    if (words.length === 1) return words[0][0];

    // Return more names, only first and last name initials
    const firstInitial = words[0][0];
    const lastInitial = words[words.length - 1][0];

    return firstInitial + lastInitial;
  };
}

export default Text;
