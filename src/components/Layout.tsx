export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center m-auto h-screen w-screen">
        {children}
      </main>
  );
}
