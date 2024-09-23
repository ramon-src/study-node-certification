import readline from "node:readline";
import { openai } from "./openai.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
  });
  return results.choices[0].message;
};

const formatMessage = (userInput) => ({
  role: "user",
  content: userInput,
});

const chat = async () => {
  const history = [
    {
      role: "system",
      content:
        "You are an AI assistant, answer any questions to the best of your ability",
    },
  ];
  const start = async () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }
      const message = formatMessage(userInput);
      const response = await newMessage(history, message);

      history.push(message, response);

      console.log(`n\n AI: ${response.content}`);
      start();
    });
  };
  start();
};

console.log("Chatbot initialize, please hit exit to leave the chat.");
chat();

/**
 * role - system | user | assistant
 */
// openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [{ role: "user", content: "Hello!" }],
//   max_tokens: 100,
//   temperature: 0.5,
// });

// const results = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       role: "system",
//       content:
//         "You are an AI assistant, answer any questions to the best of your ability",
//     },
//     { role: "user", content: "Hello!" },
//   ],
//   max_tokens: 100,
//   temperature: 0.5,
// });

// console.log(results);
