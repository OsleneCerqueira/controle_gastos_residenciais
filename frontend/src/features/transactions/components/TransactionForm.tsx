import { useState } from "react";

import type { SubmitEvent } from "react";

import type { Person } from "../../people/types/person";

import { PersonSelect } from "./PersonSelect";

import type {
    CreateTransactionRequest,
    TransactionType,
} from "../types/transaction";

import styles from "./TransactionForm.module.css";

interface TransactionFormProps {
    people: Person[];
    isPeopleLoading: boolean;
    isSubmitting: boolean;
    serverError: string;
    onSubmit: (transaction: CreateTransactionRequest) => Promise<void>;
}

interface TransactionFormValues {
    description: string;
    value: string;
    type: string;
    personId: string;
}

type TransactionFormErrors = Partial<Record<keyof TransactionFormValues, string>>;

const initialValues: TransactionFormValues = {
    description: "",
    value: "",
    type: "",
    personId: "",
};

function isTransactionType(value: string): value is TransactionType {
    return value === "Revenue" || value === "Expense";
}

export function TransactionForm({people, isPeopleLoading, isSubmitting, serverError, onSubmit,}: TransactionFormProps) {
    const [values, setValues] = useState<TransactionFormValues>(initialValues);
    const [errors, setErrors] = useState<TransactionFormErrors>({});

    function updateField(field: keyof TransactionFormValues, value: string): void {
        setValues((currentValues) => ({ ...currentValues, [field]: value }));

        setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    }

    function validateForm(): TransactionFormErrors {
        const validationErrors: TransactionFormErrors = {};
        const parsedValue = Number(values.value);
        const parsedPersonId = Number(values.personId);

        if (!values.description.trim()) {
            validationErrors.description = "Informe a descrição da transação.";
        }

        if (!values.value.trim()) {
            validationErrors.value = "Informe o valor da transação.";
        } else if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
            validationErrors.value = "O valor deve ser maior que zero.";
        }

        if (!isTransactionType(values.type)) {
            validationErrors.type = "Selecione o tipo da transação.";
        }

        const selectedPerson = people.find((person) => person.id === parsedPersonId);

        if (!selectedPerson) {
            validationErrors.personId = "Selecione uma pessoa responsável.";
        }

        if ( selectedPerson &&  selectedPerson.age < 18 &&  values.type === "Revenue" ) {
            validationErrors.type = "Pessoas menores de 18 anos podem cadastrar apenas despesas.";
        }

        return validationErrors;
    }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            return;
        }

        if (!isTransactionType(values.type)) {
            return;
        }

        await onSubmit({
            description: values.description.trim(),
            value: Number(values.value),
            type: values.type,
            personId: Number(values.personId),
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <PersonSelect
                people={people}
                value={values.personId}
                isLoading={isPeopleLoading}
                errorMessage={errors.personId}
                onChange={(personId) => updateField("personId", personId)}
            />

            <div className={styles.field}>
                <label htmlFor="description">Descrição</label>

                <input
                    id="description"
                    name="description"
                    type="text"
                    value={values.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={ errors.description ? "description-error" : undefined}
                />

                {errors.description && (
                    <span id="description-error" className={styles.errorMessage}>
                        {errors.description}
                    </span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="value">Valor</label>

                <input
                    id="value"
                    name="value"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={values.value}
                    placeholder="Ex.: 2500,00"
                    onChange={(event) => updateField("value", event.target.value)}
                    aria-invalid={Boolean(errors.value)}
                    aria-describedby={errors.value ? "value-error" : undefined}
                />

                {errors.value && (
                    <span id="value-error" className={styles.errorMessage}>
                        {errors.value}
                    </span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="type">Tipo</label>

                <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={(event) => updateField("type", event.target.value)}
                    aria-invalid={Boolean(errors.type)}
                    aria-describedby={errors.type ? "type-error" : undefined}
                >
                    <option value="">Selecione o tipo</option>
                    <option value="Revenue">Receita</option>
                    <option value="Expense">Despesa</option>
                </select>

                {errors.type && (
                    <span id="type-error" className={styles.errorMessage}>
                        {errors.type}
                    </span>
                )}
            </div>

            {serverError && (
                <p className={styles.serverError} role="alert">
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || isPeopleLoading || people.length === 0}
            >
                {isSubmitting ? "Salvando..." : "Salvar transação"}
            </button>
        </form>
    );
}
