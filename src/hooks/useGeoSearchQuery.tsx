import { useQuery } from "@tanstack/react-query";
import { fetchGeoLocations, type GeoSearchParams } from "../api/geo-search";

export const useGeoSearchQuery = (params: GeoSearchParams) => {
  return useQuery({
    queryKey: ["geo-search", params],
    queryFn: () => fetchGeoLocations(params),
    enabled: !!params.searchTerm,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
