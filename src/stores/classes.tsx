import { Class } from "@/types/model";
import { create } from "zustand";

export type ClassesState = {
  classes: Class[];
  otherClasses: Class[];
};

export const useClassesStore = create<ClassesState>((set) => ({
  classes: new Array(10).fill(0).map((_, i) => ({
    id: `${i}`,
    name: "5 IB",
    institution: "MNI00001",
    grade: 5,
    section: "IB",
    course: "INFO",
  })),
  otherClasses: new Array(50).fill(0).map((_, i) => ({
    id: `${i}`,
    name: "4 IB",
    institution: "MNI00001",
    grade: 4,
    section: "IB",
    course: "INFO",
  })),
}));
