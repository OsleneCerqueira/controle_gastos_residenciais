import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { getPerson, deletePerson } from "../api/peopleApi";

import type { Person } from "../types/person";

import styles from "./PersonDetailsPage.module.css";

import { getTransactionsByPersonId } from "../../transactions/api/transactionApi";
import { TransactionList } from "../../transactions/components/TransactionList";
import type { Transaction } from "../../transactions/types/transaction";

export function PersonDetailsPage() {
  const navigate = useNavigate();
  const { personId } = useParams();

  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function handleDeletePerson() {
    if (!person) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir ${person.name} e todas as suas transações?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");

      await deletePerson(person.id);

      navigate("/people");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível excluir a pessoa";

      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  }


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

          <section className={styles.deleteArea}>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDeletePerson}
              disabled={isDeleting}
            >
              

              {isDeleting ? "EXCLUINDO..." : "EXCLUIR PESSOA"}
            </button>

            <p className={styles.deleteWarning}>
              Esta ação removerá {person.name} e também excluirá as transações
              associadas.
            </p>
          </section>
        </>
      )}
    </main>
  );
}