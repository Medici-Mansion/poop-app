import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { gender } from '@/constants';
import type { Breed } from '@/types';

type Gender = typeof gender[number]['value'];

export interface Avatar {
  uri: string;
  filename: string;
};

interface ProfileStore {
  profile: Profile;
  setName: (name: string) => void;
  setAvatar: (avatar: Avatar) => void;
  setBirthday: (birthday: string) => void;
  setGender: (gender: Gender) => void;
  setBreed: (breed: Breed) => void;
}

interface Profile {
  avatar: Avatar | null;
  name: string;
  birthday: string;
  gender: Gender;
  breed: Breed | null;
}

const initProfile: Profile = {
  avatar: null,
  name: "",
  birthday: "",
  gender: "FEMALE",
  breed: null,
};


export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: initProfile,

      setName: (name) => set((state) => ({ profile: { ...state.profile, name } })),
      setAvatar: (avatar) => set((state) => ({ profile: { ...state.profile, avatar } })),
      setBirthday: (birthday) => set((state) => ({ profile: { ...state.profile, birthday } })),
      setGender: (gender) => set((state) => ({ profile: { ...state.profile, gender } })),
      setBreed: (breed) => set((state) => ({ profile: { ...state.profile, breed } })),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);