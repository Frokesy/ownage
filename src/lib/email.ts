export type EmailFormKind = "contact" | "realtor";

export const sendEmailForm = async (form: HTMLFormElement, kind: EmailFormKind) => {
  const fields = Object.fromEntries(
    Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value)]),
  );
  const response = await fetch(`/api/forms/${kind}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const result = (await response.json().catch(() => ({}))) as { message?: string };
  if (!response.ok) throw new Error(result.message || "We couldn’t send your message. Please try again.");
};
