import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { TransactionType, type Transaction } from "../types/transaction";
import styles from "./TransactionList.module.css";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        Esta pessoa ainda não possui transações.
      </p>
    );
  }

  return (
    <div className={styles.transactionList}>
      {transactions.map((transaction) => {
        const isRevenue = transaction.type === TransactionType.Revenue;
        console.log(transaction.type);
        console.log(TransactionType.Revenue);
        console.log(isRevenue);

        return (
          <article key={transaction.id} className={styles.transactionCard}>
            <div>
              <h3>{transaction.description}</h3>
              <span>{isRevenue ? "Receita" : "Despesa"}</span>
            </div>

            <strong className={isRevenue ? styles.revenue : styles.expense}>
              {formatCurrency(transaction.value)}
            </strong>
          </article>
        );
      })}
    </div>
  );
}