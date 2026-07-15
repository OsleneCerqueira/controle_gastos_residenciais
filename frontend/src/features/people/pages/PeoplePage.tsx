import { useEffect, useState } from "react";

import { getPeople, getPeopleSummary } from "../api/peopleApi";

import type { Person, PersonSummary } from "../types/person";

import styles from "./PeoplePage.module.css";

export function PeoplePage() {
    const [peopleSummary, setPeopleSummary] = useState<PersonSummary[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadPeopleSummary(): Promise<void> {
            try {
                const summaryData = await getPeopleSummary();

                setPeopleSummary(summaryData);
            } catch (error) {
                const message = error instanceof Error ? error.message : "Ocorreu um erro ao buscar as pessoas.";

                setErrorMessage(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadPeopleSummary();
    }, []);

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>
                    Visão financeira
                </p>

                <h1 className={styles.title}> Balanço por pessoa </h1>

                <p className={styles.description}>
                    Acompanhe as receitas, despesas e o saldo de cada pessoa.
                </p>
            </header>

            <section className={styles.peopleSection} aria-labelledby="people-list-title">
                <h2 id="people-list-title" className={styles.sectionTitle}>
                    Pessoas
                </h2>

                {isLoading && (
                    <p className={styles.statusMessage}>Carregando resumo financeiro...</p>
                )}

                {errorMessage && (
                    <p className={styles.errorMessage} role="alert" >
                        {errorMessage}
                    </p>
                )}

                {!isLoading && !errorMessage && peopleSummary.length === 0 && (
                    <p className={styles.statusMessage}>Nenhuma pessoa foi cadastrada.</p>
                )}

                {!isLoading && !errorMessage && peopleSummary.length > 0 && (
                    <ul className={styles.peopleList}>
                        {peopleSummary.map((person) => (
                            <li key={person.personId} className={styles.personItem}>
                                <strong className={styles.personName}>
                                    {person.personName}
                                </strong>

                                <div className={styles.financialData}>
                                    <span>Receitas: {person.totalRevenue}</span>

                                    <span> Despesas: {person.totalExpenses}</span>

                                    <span>Saldo: {person.balance}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}