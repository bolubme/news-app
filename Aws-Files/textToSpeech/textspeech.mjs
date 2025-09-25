import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "" });

export async function convertTextToSpeech(text) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  const audioBuffer = Buffer.from(await mp3.arrayBuffer());

  return audioBuffer;
}
