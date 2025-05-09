export default function AdminHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}