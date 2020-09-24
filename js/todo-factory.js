import {geraId} from "./gerador-ids.js";
export function todoFactory(text) {
    return {
        id: geraId(),
        text,
    }
}
