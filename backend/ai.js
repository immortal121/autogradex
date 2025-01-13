const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://karan-m5v5ikrg-eastus2.cognitiveservices.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-08-01-preview";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "EzTYKzbHo9umo8Y340WaJDKYjRRWI3MMY5EQhyinTE4FcPF04YgUJQQJ99BAACHYHv6XJ3w3AAAAACOGPcdm";
const apiVersion = "2024-08-01-preview"
console.log(apiVersion);
import { AzureOpenAI } from 'openai';

const openai = new AzureOpenAI({ endpoint,apiKey,apiVersion:apiVersion });

const result = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'how are you ?'}],
});

console.log(result.choices[0]?.message?.content);
