import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSlugUrl = create(
    persist(
        (set) => ({
            slugUrl: "",
            setSlugUrl: (value) => set((state) => ({slugUrl: value}))
        }), {
            name: "brandApi",
            createJSONStorage: (() => sessionStorage)
        }
))