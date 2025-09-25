import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });


export async function convertTextToSpeech(text){
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text
  })
  
  const audioBuffer = Buffer.from(await mp3.arrayBuffer())
  
  return audioBuffer;
}