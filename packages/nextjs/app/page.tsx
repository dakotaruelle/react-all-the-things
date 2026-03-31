import PokemonButton from "@/app/components/pokemon-button";

export default function Home() {
  console.log('On the server')

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Gotta catch em all!
        </h1>
        <PokemonButton />
      </main>
    </div>
  );
}
