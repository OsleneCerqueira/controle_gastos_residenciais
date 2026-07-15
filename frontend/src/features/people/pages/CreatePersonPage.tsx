import { Link, useNavigate } from "react-router";

import styles from "./CreatePersonPage.module.css";
import { PersonForm } from "../components/PersonForm";
import type { CreatePersonRequest } from "../types/person";
import { useState } from "react";
import { createPerson } from "../api/peopleApi";

export function CreatePersonPage() {

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverError, setServerError] = useState("");

  async function handleCreatePerson(person: CreatePersonRequest): Promise<void> {
    setIsSubmitting(true);

    setServerError("");

    try {
      await createPerson(person);

      navigate("/people");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível cadastrar a pessoa.";

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
        <p className={styles.eyebrow}> Novo cadastro </p>

        <h1 className={styles.title}> Adicionar pessoa</h1>

        <p className={styles.description}>
          Cadastre um novo membro para gerenciar as finanças da casa.
        </p>
      </header>

      <section className={styles.formSection} aria-labelledby="person-form-title" >

        <h2 id="person-form-title" className={styles.sectionTitle} >
          Dados da pessoa
        </h2>

        <PersonForm
          isSubmitting={isSubmitting}
          serverError={serverError}
          onSubmit={handleCreatePerson}
        />
      </section>
    </main>
  );
}