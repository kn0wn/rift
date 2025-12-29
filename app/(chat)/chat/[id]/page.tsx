export function generateMetadata() {
  return { title: "Chat" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return null;
}
