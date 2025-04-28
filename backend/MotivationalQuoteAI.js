import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-0d8159e4c2cf45bc906ddccf49697503'
});

// Take workoutName as an input!
async function getMotivationalQuote(workoutName) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a motivational coach. Based on the workout "${workoutName}", give a short and powerful motivational quote to inspire someone doing that workout.`
      }
    ],
    model: "deepseek-chat",
  });

  return completion.choices[0].message.content;
}

export { getMotivationalQuote };
