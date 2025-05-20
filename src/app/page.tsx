import { HomePage } from "@/view/home";
import { server } from "@/z_shared/api";
import { ModelNames } from "@/z_shared/types";

export default async function Home() {
  let models: string[] = [];

  try {
    const response = await server<ModelNames[]>("/tts/modelNames");

    models = response.map((r) => r.name);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="">
      <HomePage models={models} />
    </main>
  );
}
