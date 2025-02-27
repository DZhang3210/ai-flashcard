export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <div className="flex-1">{children}</div>
    </section>
  );
}
