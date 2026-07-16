import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

import { getPerson, deletePerson } from "../api/peopleApi";

import type { Person } from "../types/person";

import styles from "./PersonDetailsPage.module.css";

import { getTransactionsByPersonId } from "../../transactions/api/transactionApi";
import { TransactionList } from "../../transactions/components/TransactionList";
import type { TransactionPage } from "../../transactions/types/transaction";

const initialTransactionPage: TransactionPage = {
  items: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
};

export function PersonDetailsPage() {
  const navigate = useNavigate();
  const { personId } = useParams();

  const [person, setPerson] = useState<Person | null>(null);
  const [isPersonLoading, setIsPersonLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [personError, setPersonError] = useState("");
  const [transactionsError, setTransactionsError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [transactionPage, setTransactionPage] = useState(initialTransactionPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadPerson(): Promise<void> {
      const parsedPersonId = Number(personId);

      if (!Number.isInteger(parsedPersonId) || parsedPersonId <= 0) {
        setPersonError("Identificador da pessoa inválido.");
        setIsPersonLoading(false);
        return;
      }

      try {
        const personData = await getPerson(parsedPersonId);

        setPerson(personData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível buscar a pessoa.";

        setPersonError(message);
      } finally {
        setIsPersonLoading(false);
      }
    }

    loadPerson();
  }, [personId]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const parsedPersonId = Number(personId);

      if (!Number.isInteger(parsedPersonId) || parsedPersonId <= 0) {
        setIsTransactionsLoading(false);
        return;
      }

      try {
        setIsTransactionsLoading(true);
        setTransactionsError("");

        const transactionsData = await getTransactionsByPersonId(
          parsedPersonId,
          currentPage,
        );

        setTransactionPage(transactionsData);
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : "Não foi possível buscar as transações.";

        setTransactionsError(message);
      } finally {
        setIsTransactionsLoading(false);
      }
    }

    loadTransactions();
  }, [personId, currentPage]);

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
      setDeleteError("");

      await deletePerson(person.id);

      navigate("/people");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível excluir a pessoa";

      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  }


  return (
    <main className={styles.page}>
      <Link to="/people" className={styles.backLink}>Voltar</Link>

      {isPersonLoading && (<p className={styles.statusMessage}>Carregando dados da pessoa...</p>)}

      {personError && (
        <p className={styles.errorMessage} role="alert">
          {personError}
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

            {isTransactionsLoading && (
              <p className={styles.statusMessage}>Carregando transações...</p>
            )}

            {transactionsError && (
              <p className={styles.errorMessage} role="alert">
                {transactionsError}
              </p>
            )}

            {!isTransactionsLoading && !transactionsError && (
              <TransactionList
                transactions={transactionPage.items}
                currentPage={transactionPage.currentPage}
                totalPages={transactionPage.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </section>

          <section className={styles.deleteArea}>
            {deleteError && (
              <p className={styles.errorMessage} role="alert">
                {deleteError}
              </p>
            )}

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
