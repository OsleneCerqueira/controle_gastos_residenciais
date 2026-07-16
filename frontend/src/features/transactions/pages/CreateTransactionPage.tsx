import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { getPeople } from "../../people/api/peopleApi";

import type { Person } from "../../people/types/person";

import { createTransaction } from "../api/transactionApi";
import { TransactionForm } from "../components/TransactionForm";

import type { CreateTransactionRequest } from "../types/transaction";

import styles from "./CreateTransactionPage.module.css";

export function CreateTransactionPage() {
    const navigate = useNavigate();

    const [people, setPeople] = useState<Person[]>([]);
    const [isPeopleLoading, setIsPeopleLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [peopleError, setPeopleError] = useState("");
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        async function loadPeople(): Promise<void> {
            try {
                const peopleData = await getPeople();

                setPeople(peopleData);
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Não foi possível buscar as pessoas.";

                setPeopleError(message);
            } finally {
                setIsPeopleLoading(false);
            }
        }

        loadPeople();
    }, []);

    async function handleCreateTransaction(
        transaction: CreateTransactionRequest,
    ): Promise<void> {
        setIsSubmitting(true);
        setServerError("");

        try {
            await createTransaction(transaction);

            navigate("/people");
        } catch (error) {
            const message =
                error instanceof Error? error.message: "Não foi possível cadastrar a transação.";

            setServerError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className={styles.page}>
            <Link to="/people" className={styles.backLink}>
                Voltar
            </Link>

            <header className={styles.header}>
                <p className={styles.eyebrow}>Nova movimentação</p>

                <h1 className={styles.title}>Adicionar transação</h1>

                <p className={styles.description}>
                    Registre uma receita ou despesa 
                </p>
            </header>

            <section className={styles.formSection} aria-labelledby="transaction-form-title">
                <h2 id="transaction-form-title" className={styles.sectionTitle}>
                    Dados da transação
                </h2>

                {peopleError ? (
                    <p className={styles.errorMessage} role="alert">
                        {peopleError}
                    </p>
                ) : (
                    <TransactionForm
                        people={people}
                        isPeopleLoading={isPeopleLoading}
                        isSubmitting={isSubmitting}
                        serverError={serverError}
                        onSubmit={handleCreateTransaction}
                    />
                )}
            </section>
        </main>
    );
}
