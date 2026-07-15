import { formatCurrency } from "../../../shared/utils/formatCurrency";

import type { PersonSummary } from "../types/person";

import styles from "./PersonSummaryCard.module.css";

interface PersonSummaryCardProps {
  person: PersonSummary;
}

function getBalanceClassName(balance: number): string {
  if (balance > 0) {
    return styles.positiveValue;
  }

  if (balance < 0) {
    return styles.negativeValue;
  }

  return styles.neutralValue;
}

export function PersonSummaryCard({
  person,
}: PersonSummaryCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.personName}>
          {person.personName}
        </h3>

        <div className={styles.balanceSummary}>
          <span className={styles.balanceLabel}>
            Saldo
          </span>

          <strong
            className={getBalanceClassName(person.balance)}
          >
            {formatCurrency(person.balance)}
          </strong>
        </div>
      </header>

      <dl className={styles.financialSummary}>
        <div>
          <dt>Receitas</dt>

          <dd className={styles.positiveValue}>
            {formatCurrency(person.totalRevenue)}
          </dd>
        </div>

        <div>
          <dt>Despesas</dt>

          <dd className={styles.negativeValue}>
            {formatCurrency(person.totalExpenses)}
          </dd>
        </div>
      </dl>
    </article>
  );
}