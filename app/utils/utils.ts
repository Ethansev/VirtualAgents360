// TODO: I'll split these into different files eventually
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

// Tailwind Utilities
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Zod Utilities
// maybe move into lib?
// export function stringWithMinLength(message: string = 'This field is required') {
//     return z.string().min(1, { message });
// }
export function stringWithMinLength(message: string = 'Required') {
    return z.string().min(1, { message });
}

// I have to type the values as strings due to the way sanity does types and react-hook-form's defaultValue's need to be a string
// We accept the string as an input and use zod to parse the number accordingly
export function numberValidation(message: string = 'Must be a valid number') {
    return stringWithMinLength().refine((val) => !isNaN(parseInt(val)), {
        message,
    });
}

export function percentageValidation(message: string = 'Must be a valid percentage between 0-100') {
    return stringWithMinLength().refine(
        (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 100,
        {
            message,
        },
    );
}

export function priceValidation(message: string = 'Must be a valid price') {
    return stringWithMinLength().refine((val) => !isNaN(parseFloat(val)), {
        message,
    });
}
