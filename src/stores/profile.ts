import { atom } from "nanostores";

interface ProfileStore extends ResponseUser {}

export const $profile = atom<ProfileStore>();
