import type { Person } from "../../people/types/person";

import styles from "./PersonSelect.module.css";

interface PersonSelectProps {
  people: Person[];
  value: string;
  isLoading: boolean;
  errorMessage?: string;
  onChange: (personId: string) => void;
}

export function PersonSelect({people, value, isLoading, errorMessage = "", onChange,}: PersonSelectProps) {
  const isDisabled = isLoading || people.length === 0;

  return (
    <div className={styles.field}>
      <select
        id="personId"
        name="personId"
        value={value}
        disabled={isDisabled}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? "personId-error" : undefined}
      >
        <option value="">
          {isLoading ? "Carregando pessoas..." : "Selecione uma pessoa"}
        </option>

        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>

      {errorMessage && (
        <span id="personId-error" className={styles.errorMessage}>
          {errorMessage}
        </span>
      )}

      {!isLoading && people.length === 0 && (
        <p className={styles.helperText}>
          Cadastre uma pessoa antes de adicionar uma transação.
        </p>
      )}
    </div>
  );
}
