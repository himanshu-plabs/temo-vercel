"use client";

import { atom, createStore } from "jotai";

// Create a Jotai store instance
export const myStore = createStore();

export const commandMenuOpenAtom = atom(false);

export const allTemosAtom = atom([]);
export const allCollectionsAtom = atom([]);
