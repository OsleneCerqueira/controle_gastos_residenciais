import type { Person } from "../../people/types/person";

import styles from "./PersonSelect.module.css";

interface PersonSelectProps {
    people: Person[];
    value: string;
    isLoading: boolean;
    onChange: (personId: string) => void;
}

export function PersonSelect({ people, value, isLoading, onChange }: PersonSelectProps) {

    const isDisabled = isLoading || people.length === 0;

    return (
        <div className={styles.field}>
            <label htmlFor="personId">Pessoa</label>

            <select id="personId" name="personId" value={value}
                disabled={isDisabled}
                onChange={(event) => onChange(event.target.value)} >

                <option value="">
                    {isLoading ? "Carregando pessoas..." : "Selecione uma pessoa"}
                </option>

                {people.map((person) => (
                    <option key={person.id} value={person.id}>
                        {person.name}
                    </option>
                ))}
            </select>

            {!isLoading && people.length === 0 && (
                <p className={styles.helperText}> Nenhuma pessoa foi cadastrada.</p>
            )}
        </div>
    );
}