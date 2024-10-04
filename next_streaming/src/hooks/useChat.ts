import { useState } from "react";

export default function useChat() {
  const [upcomingMessage, setUpcomingMessage] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async (message: string): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_AI_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: message,
      }),
      mode: "cors",
    });
  };

  const sendMessage = async (message: string) => {
    setDone(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(true);
    const response = await sendRequest(message);
    const reader = response.body?.getReader();

    let aiText = "";
    setIsLoading(false);
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setDone(true);
        }
        try {
          const s = new TextDecoder().decode(value);
          const json = JSON.parse(s);
          aiText += json.response;
          setUpcomingMessage(aiText);
        } catch (e) {
          console.log(e);
          setDone(true);
          break;
        }
      }
    }
  };

  return { upcomingMessage, setUpcomingMessage, sendMessage, done, isLoading };
}
