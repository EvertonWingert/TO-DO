import { generateId } from "./idGenerator.js";

export function todoFactory(text) {
    return {
        id: generateId(),
        text,
    }
}
