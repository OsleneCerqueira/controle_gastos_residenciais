import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getPerson } from "../api/peopleApi";

import type { Person } from "../types/person";

import styles from "./PersonDetailsPage.module.css";

import { getTransactionsByPersonId } from "../../transactions/api/transactionApi";
import { TransactionList } from "../../transactions/components/TransactionList";
import type { Transaction } from "../../transactions/types/transaction";

export function PersonDetailsPage() {
  const { personId } = useParams();

  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadPerson(): Promise<void> {
      const parsedPersonId = Number(personId);

      try {
        const [personData, transactionsData] = await Promise.all([
          getPerson(parsedPersonId),
          getTransactionsByPersonId(parsedPersonId),
        ]);

        setPerson(personData);
        setTransactions(transactionsData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível buscar a pessoa.";

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPerson();
  }, [personId]);

  return (
    <main className={styles.page}>
      <Link to="/people" className={styles.backLink}>Voltar</Link>

      {isLoading && (<p className={styles.statusMessage}>Carregando dados da pessoa...</p>)}

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}

      {person && (
        <>
          <header className={styles.header}>
            <p className={styles.eyebrow}> Detalhes da pessoa</p>

            <h1 className={styles.title}>
              {person.name}
            </h1>

            <p className={styles.description}>
              Consulte o histórico de transações desta pessoa.
            </p>
          </header>

          <section className={styles.transactionsSection}>
            <h2>Transações</h2>
            <TransactionList transactions={transactions} />
          </section>
        </>
      )}
    </main>
  );
}