import axios from "axios";

export interface GeoLocation {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  population: number;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  feature_code?: string;
}

export interface GeoSearchResponse {
  results?: GeoLocation[];
  error?: boolean;
  reason?: string;
}

export interface GeoSearchParams {
  searchTerm: string;
}

export async function fetchGeoLocations({
  searchTerm,
}: GeoSearchParams): Promise<GeoLocation[] | undefined> {
  if (!searchTerm) return [];

  const response = await axios.get<GeoSearchResponse>(
    `https://geocoding-api.open-meteo.com/v1/search`,
    {
      params: {
        name: searchTerm,
      },
    }
  );

  if (response.data.error) {
    throw new Error(response.data.reason || "Unknown API error");
  }

  const data = response.data.results || [];

  return data;
}
