import {
  Autocomplete,
  Loader,
  Text,
  type AutocompleteProps,
} from "@mantine/core";
import { Highlight } from "@mantine/core";

export type GeoSearchAutoCompleteProps = {
  data: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  isLoading: boolean;
  error: Error | null;
  value: string;
};
export default function GeoSearchAutoComplete({
  data,
  onChange,
  isLoading,
  error,
  value,
}: GeoSearchAutoCompleteProps) {
  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Highlight
      highlight={value}
      highlightStyles={{
        fontWeight: "bold",
        backgroundImage:
          "linear-gradient(45deg, var(--mantine-color-indigo-9), var(--mantine-color-indigo-9))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {/* @ts-expect-error :option only has value which is the unique id and we need the label. option is type ComboboxItemString, not ComboboxItem which extends ComboboxItemString and would contain the label too. :( */}
      {option.label}
    </Highlight>
  );
  return (
    <>
      <Autocomplete
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
        }}
        data={data}
        renderOption={renderAutocompleteOption}
        rightSection={isLoading ? <Loader size="xs" /> : null}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return;
          }
          onChange(e.currentTarget.value);
        }}
        error={error?.message}
        placeholder="Start searching location..."
        label="Find your dream location with over 500,000 inhabitants!"
        onClear={() => onChange("")}
        clearable
      />
      {!isLoading && !error && data.length === 0 && value !== "" && (
        <Text size="sm" mt="xs" c="dimmed">
          No results found
        </Text>
      )}
    </>
  );
}
