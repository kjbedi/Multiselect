/**
 * Function to sanitize input.
 * @param {*} input Array of objects.
 */
export const sanitizeInput = (input) => {
    const deepClonedInput = [...input];
    if(Array.isArray(deepClonedInput) && checkValidInput(deepClonedInput)) {
        return deepClonedInput;
    }
    console.error('Invalid input. It should be array of objects.');
    return;
}

const checkValidInput = (input = []) => {
    let isValid = false;
    input.forEach((obj) => {
        if(typeof obj.text === 'string' && typeof obj.isSelected === 'boolean') {
            isValid = true;
        }
    });
    return isValid;
}