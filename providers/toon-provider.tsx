import { PickedImage } from "@/types";
import React, { createContext, PropsWithChildren } from "react";

export interface ToonContextType {
  images: PickedImage[];
  setImages: (images: PickedImage[]) => void;
}

export const ToonContext = createContext<ToonContextType>({
  images: [],
  setImages() {},
});

export const useToonImage = () => {
  return React.useContext(ToonContext);
};

export const ToonProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = React.useState<PickedImage[]>([]);

  return (
    <ToonContext.Provider value={{ images, setImages }}>
      {children}
    </ToonContext.Provider>
  );
};
