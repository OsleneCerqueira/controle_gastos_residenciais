import { useState } from "react";

import type { ChangeEvent, FormEvent } from "react";

import type { CreatePersonRequest } from "../types/person";

import styles from "./PersonForm.module.css";

interface PersonFormProps {
    isSubmitting: boolean;
    serverError: string;
    onSubmit: (person: CreatePersonRequest) => Promise<void>;
}

interface PersonFormValues {
    name: string;
    age: string;
}

interface PersonFormErrors {
    name?: string;
    age?: string;
}

const initialValues: PersonFormValues = {
    name: "",
    age: "",
};

function capitalizeName(name: string): string {
    return name.trim().split(/\s+/).map((part) =>
        part.charAt(0).toLocaleUpperCase("pt-BR") +
        part.slice(1).toLocaleLowerCase("pt-BR")
    ).join(" ");
}

export function PersonForm({
    isSubmitting,
    serverError,
    onSubmit,
}: PersonFormProps) {
    const [values, setValues] = useState<PersonFormValues>(initialValues);

    const [errors, setErrors] = useState<PersonFormErrors>({});

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;

        setValues((currentValues) => ({ ...currentValues, [name]: value }));

        setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    }

    function validateForm(): PersonFormErrors {
        const validationErrors: PersonFormErrors = {};

        if (!values.name.trim()) {
            validationErrors.name = "Informe o nome da pessoa.";
        }

        if (!values.age.trim()) {
            validationErrors.age = "Informe a idade.";
        } else {
            const age = Number(values.age);

            if (!Number.isInteger(age) || age < 0) {
                validationErrors.age = "Informe uma idade válida.";
            }
        }

        return validationErrors;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            return;
        }

        await onSubmit({
            name: capitalizeName(values.name),
            age: Number(values.age),
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
                <label htmlFor="name">  Nome  </label>

                <input id="name" name="name" type="text" value={values.name}
                    placeholder="Ex.: Maria Silva"
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                />

                {errors.name && (
                    <span className={styles.errorMessage}>
                        {errors.name}
                    </span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="age"> Idade</label>

                <input id="age" name="age" type="number" min="0" step="1" value={values.age}
                    placeholder="Ex.: 25"
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.age)} />

                {errors.age && (
                    <span className={styles.errorMessage}>
                        {errors.age}
                    </span>
                )}
            </div>

            {serverError && (
                <p className={styles.serverError} role="alert">
                    {serverError}
                </p>
            )}

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar pessoa"}
            </button>
        </form>
    );
}
