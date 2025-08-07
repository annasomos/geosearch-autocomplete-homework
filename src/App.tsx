import "@mantine/core/styles.css";

import { Card, Group, MantineProvider, Text, Image } from "@mantine/core";
import GeoSearchAutoComplete from "./components/GeoSearchAutoComplete.tsx";
import { useGeoSearchQuery } from "./hooks/useGeoSearchQuery.tsx";
import { useRef, useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<number>(0);

  const { data, isLoading, error } = useGeoSearchQuery({
    searchTerm: debouncedSearch,
  });

  function createAutoCompleteList() {
    if (!data) return [];
    const filteredData = data.filter((loc) => loc.population >= 500000);
    const options = filteredData.map((loc) => {
      const label = `${loc.name} ${loc.admin1 ? ", " + loc.admin1 : ""}${
        loc.country ? ", " + loc.country : ""
      }`;
      const uniqueKey = loc.id.toString();

      return {
        value: uniqueKey,
        label,
      };
    });

    return options;
  }
  function handleChange(value: string) {
    setInputValue(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearTimeout(timerRef.current);
      setDebouncedSearch(value);
    }, 500);
  }

  return (
    <MantineProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ maxWidth: 600, width: "100%", height: 325 }}
        >
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
            />
          </Card.Section>{" "}
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>GeoLocation Autocomplete Component</Text>
          </Group>
          <GeoSearchAutoComplete
            value={inputValue}
            data={createAutoCompleteList()}
            error={error}
            isLoading={isLoading}
            onChange={handleChange}
          />
        </Card>
      </div>
    </MantineProvider>
  );
}
