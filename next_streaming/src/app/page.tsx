import Chat from "@/components/Chat";
import Layout from "@/components/Layout";
import { Metadata } from "next";

export default function Home() {
  return (
    <Layout>
      <Chat className="bg-white h-full" />
    </Layout>
  );
}
//page.tsx

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "🤖 AI-Bot-Next",
    description: "🤖 AI-Bot-Next",
  };
}
