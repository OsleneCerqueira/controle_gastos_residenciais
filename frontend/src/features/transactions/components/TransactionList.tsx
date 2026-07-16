import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { TransactionType, type Transaction } from "../types/transaction";
import styles from "./TransactionList.module.css";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function parseUtcDate(value: string): Date {
  return new Date(value.endsWith("Z") ? value : `${value}Z`);
}

export function TransactionList({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
}: TransactionListProps) {
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

        return (
          <article key={transaction.id} className={styles.transactionCard}>
            <div>
              <h3>{transaction.description}</h3>
              <span>{isRevenue ? "Receita" : "Despesa"}</span>
              <time dateTime={transaction.createdAt}>
                {dateFormatter.format(parseUtcDate(transaction.createdAt))}
              </time>
            </div>

            <strong className={isRevenue ? styles.revenue : styles.expense}>
              {formatCurrency(transaction.value)}
            </strong>
          </article>
        );
      })}

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Páginas das transações">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>Página {currentPage} de {totalPages}</span>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </nav>
      )}
    </div>
  );
}
