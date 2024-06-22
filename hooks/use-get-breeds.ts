import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BreedData, BreedsGroupedByConsonant } from "@/types";
import { getBreeds } from "@/apis";

const useGetBreeds = (searchKey: string, searchInput: string) => {
  const {
    data: breedsData,
    isLoading,
    isFetching,
    error,
  } = useQuery<BreedData, AxiosError, BreedsGroupedByConsonant>({
    queryKey: ["breeds", searchKey, searchInput],
    queryFn: getBreeds,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (breeds) => {
      if (!breeds) return {};

      const filteredBreeds: BreedsGroupedByConsonant = {};

      if (searchInput !== "") {
        Object.keys(breeds).forEach((key) => {
          breeds[key].forEach((breed) => {
            if (breed.name.trim().includes(searchInput.trim())) {
              if (!filteredBreeds[key]) filteredBreeds[key] = [];
              filteredBreeds[key].push(breed);
            }
          });
        });

        return filteredBreeds;
      }
      if (searchKey !== "") {
        if (breeds[searchKey])  filteredBreeds[searchKey] = breeds[searchKey];

        return filteredBreeds;
      }

      return breeds;
    },
  });

  return {
    data: breedsData,
    isLoading,
    isFetching,
    error,
  };
};

export default useGetBreeds;
