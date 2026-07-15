import { useEffect, useState } from "react";

import { formatCurrency } from "../../../shared/utils/formatCurrency";

import { getOverallSummary, getPeopleSummary } from "../api/peopleApi";
import { PersonSummaryCard } from "../components/PersonSummaryCard";

import type { OverallSummary, PersonSummary } from "../types/person";

import styles from "./PeoplePage.module.css";

export function PeoplePage() {
    const [peopleSummary, setPeopleSummary] = useState<PersonSummary[]>([]);
    const [overallSummary, setOverallSummary] = useState<OverallSummary | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadPeopleSummary(): Promise<void> {
            try {
                const [peopleSummaryData, overallSummaryData] = await Promise.all([
                    getPeopleSummary(),
                    getOverallSummary(),
                ]);

                setPeopleSummary(peopleSummaryData);
                setOverallSummary(overallSummaryData);

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
                            <li key={person.personId}>
                                <PersonSummaryCard person={person} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            {overallSummary && (
                <section className={styles.overallSummary}>
                    <h2>Resumo geral</h2>

                    <div className={styles.overallValues}>
                        <div>
                            <span>Receitas</span>

                            <strong>
                                {formatCurrency(overallSummary.totalRevenue)}
                            </strong>
                        </div>

                        <div>
                            <span>Despesas</span>

                            <strong>
                                {formatCurrency(overallSummary.totalExpenses)}
                            </strong>
                        </div>

                        <div>
                            <span>Saldo líquido</span>

                            <strong>
                                {formatCurrency(overallSummary.netBalance)}
                            </strong>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}