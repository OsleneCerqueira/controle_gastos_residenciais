import { useState } from "react";

import { checkApiConnection } from "../../../shared/api/checkApiConnection";

type ConnectionStatus = | "idle" | "loading" | "success" | "error";

export function PeoplePage() {

    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("idle");

    const [message, setMessage] = useState("");

    async function handleCheckConnection(): Promise<void> {
        setConnectionStatus("loading");

        setMessage("Verificando a conexão com a API...");

        try {
            await checkApiConnection();

            setConnectionStatus("success");

            setMessage("Conexão com a API realizada com sucesso.");
        } catch (error) {
            setConnectionStatus("error");
            const errorMessage = error instanceof Error ? error.message : "Não foi possível acessar a API.";

            setMessage(errorMessage);
        }
    }
    return (
        <main>
            <header>

                <h1>Balanço por pessoa</h1>

                <p> Acompanhe as receitas, despesas e o saldo de cada pessoa.</p>
            </header>

            <section aria-labelledby="people-list-title">
                <h2 id="people-list-title"> Pessoas </h2>

                <p> Lista de pessoas</p>
            </section>
            <section aria-labelledby="api-connection-title">
                <h2 id="api-connection-title"> Comunicação com a API</h2>

                <button type="button" onClick={handleCheckConnection}>
                    {connectionStatus === "loading" ? "Verificando..." : "Testar conexão"}
                </button>

                {message && (
                    <p role={ connectionStatus === "error"? "alert" : "status" }>
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}