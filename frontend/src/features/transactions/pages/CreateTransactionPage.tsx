import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getPeople } from "../../people/api/peopleApi";

import type { Person } from "../../people/types/person";

import { PersonSelect } from "../components/PersonSelect";

import styles from "./CreateTransactionPage.module.css";

export function CreateTransactionPage() {
    const [people, setPeople] = useState<Person[]>([]);
    const [selectedPersonId, setSelectedPersonId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadPeople(): Promise<void> {
            try {
                const peopleData = await getPeople();

                setPeople(peopleData);
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Não foi possível buscar as pessoas.";

                setErrorMessage(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadPeople();
    }, []);

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

                {errorMessage && (
                    <p className={styles.errorMessage} role="alert">
                        {errorMessage}
                    </p>
                )}

                {!errorMessage && (
                    <PersonSelect people={people} value={selectedPersonId}
                        isLoading={isLoading}
                        onChange={setSelectedPersonId} />
                )}

                {!isLoading && !errorMessage && people.length > 0 && (
                    <p className={styles.temporaryMessage}>
                     formulario
                    </p>
                )}
            </section>
        </main>
    );
}