import { ClientLoginForm } from "../../components/auth/ClientLoginForm";

export default async function ClientLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string }>;
}) {
  const successMessage = searchParams ? decodeURIComponent(((await searchParams).success ?? "")) : "";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <ClientLoginForm successMessage={successMessage} />
    </div>
  );
}
