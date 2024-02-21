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
export function stringWithMinLength(message: string = 'This field is required') {
    return z.string().min(1, { message });
}
