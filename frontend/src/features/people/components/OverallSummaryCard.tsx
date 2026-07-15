import { formatCurrency } from "../../../shared/utils/formatCurrency";

import type { OverallSummary } from "../types/person";

import styles from "./OverallSummaryCard.module.css";

interface OverallSummaryCardProps {
  summary: OverallSummary;
}

function getBalanceClassName(netBalance: number): string {
  if (netBalance > 0) {
    return styles.positiveBalance;
  }

  if (netBalance < 0) {
    return styles.negativeBalance;
  }

  return styles.neutralBalance;
}

export function OverallSummaryCard({ summary}: OverallSummaryCardProps) {
  return (
    <section className={styles.card}>
        
      <span className={styles.label}> Saldo líquido total</span>

      <strong className={getBalanceClassName(summary.netBalance)}>
        {formatCurrency(summary.netBalance)}
      </strong>

      <dl className={styles.financialSummary}>
        <div>
          <dt>Total de receitas</dt>

          <dd>
            {formatCurrency(summary.totalRevenue)}
          </dd>
        </div>

        <div>
          <dt>Total de despesas</dt>

          <dd>
            {formatCurrency(summary.totalExpenses)}
          </dd>
        </div>
      </dl>
    </section>
  );
}