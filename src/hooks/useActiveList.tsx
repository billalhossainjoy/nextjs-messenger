"use client"

import {create} from "zustand";
import {union, without} from "lodash";

interface ActiveListStore {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (id: string[]) => void;
};

const useActiveList = create<ActiveListStore>((set) => ({
    members: [],
    add: (id) => set(state => ({members: union(state.members, [id])})),
    remove: (id) => set(state => ({members: without(state.members, id)})),
    set: (ids) => set({members: ids}),
}))

export default useActiveList;
