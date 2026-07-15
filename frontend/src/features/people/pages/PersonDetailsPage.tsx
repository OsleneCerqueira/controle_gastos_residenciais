import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getPerson } from "../api/peopleApi";

import type { Person } from "../types/person";

import styles from "./PersonDetailsPage.module.css";

export function PersonDetailsPage() {
  const { personId } = useParams();

  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPerson(): Promise<void> {
      const parsedPersonId = Number(personId);

    //   if (!Number.isInteger(parsedPersonId) || parsedPersonId <= 0) {
    //     setErrorMessage("O identificador da pessoa é inválido.");
    //     setIsLoading(false);

    //     return;
    //   }

      try {
        const personData = await getPerson(parsedPersonId);

        setPerson(personData);
      } catch (error) {
        const message = error instanceof Error ? error.message: "Não foi possível buscar a pessoa.";

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

      {isLoading && (<p className={styles.statusMessage}>Carregando dados da pessoa...</p> )}

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
              Consulte o resumo financeiro e as transações desta pessoa.
            </p>
          </header>

          <section className={styles.content} aria-labelledby="transactions-title">
            <h2 id="transactions-title" className={styles.sectionTitle}>
              Transações
            </h2>

            <p className={styles.temporaryMessage}>
              transações
            </p>
          </section>
        </>
      )}
    </main>
  );
}