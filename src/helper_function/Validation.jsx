export const validateString = (content, minLength = 1, maxLength = Infinity, regex = null) => {
    if (content.trim().length < minLength) {
        return {
            result: false,
            reason: `Must be at least ${minLength} characters (excluding whitespace)`
        }
    }
    if (content.trim().length > maxLength) {
        return {
            result: false,
            reason: `Must be at most ${maxLength} characters (excluding whitespace)`
        }
    }
    if (format && !format.test(content)) {
        return {
            result: false,
            reason: `Input does not match the required format`
        }
    }
    return {
        result: true,
        reason: ''
    }
}

export const validateDouble = (content, minValue = 0.1, maxValue) => {
    if(content < minValue) {
        return {
            result: false,
            reason: `Minimum value: ${minValue}`
        }
    }
    if(content > maxValue) {
        return {
            result: false,
            reason: `Maximum value: ${maxValue}`
        }
    }
    return {
        result: true,
        reason: ''
    }
}

export const validateInteger = (content, minValue = 1, maxValue) => {

}