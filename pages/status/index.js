import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <DatabaseInfo />
    </>
  );
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let maxConnections = "Carregando...";
  let openConnections = "Carregando...";
  let databaseVersion = "Carregando...";

  if (!isLoading && data) {
    databaseVersion = data.dependencies.database.version;
    maxConnections = data.dependencies.database.max_connections;
    openConnections = data.dependencies.database.opened_connections;
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
      <h2>Database</h2>
      <div>Versão do Postgres: {databaseVersion}</div>
      <div>Máximo de Conexões: {maxConnections}</div>
      <div>Conexões Abertas: {openConnections}</div>
    </>
  );
}
