import { create } from 'zustand';

import { gender } from '@/constants';
import type { Breed } from '@/types';

type Gender = typeof gender[number]['value'];

interface ProfileStore {
  profile: Profile;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  setBirthday: (birthday: string) => void;
  setGender: (gender: Gender) => void;
  setBreed: (breed: Breed) => void;
}

interface Profile {
  avatar: string;
  name: string;
  birthday: string;
  gender: Gender;
  breed: Breed | null;
}

const initProfile: Profile = {
  avatar: "",
  name: "",
  birthday: "",
  gender: "FEMALE",
  breed: null,
};

export const useProfileStore = create<ProfileStore>(
  (set) => ({
    profile: initProfile,

    setName: (name) => set((state) => ({ profile: { ...state.profile, name } })),
    setAvatar: (avatar) => set((state) => ({ profile: { ...state.profile, avatar } })),
    setBirthday: (birthday) => set((state) => ({ profile: { ...state.profile, birthday } })),
    setGender: (gender) => set((state) => ({ profile: { ...state.profile, gender } })),
    setBreed: (breed) => set((state) => ({ profile: { ...state.profile, breed } })),
  })
);