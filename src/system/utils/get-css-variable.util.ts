const styles = getComputedStyle(document.documentElement);

export const getCSSVariable = (variable: string) => styles.getPropertyValue(variable);
