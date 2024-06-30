import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv';
import { LLMChain } from "langchain/chains";
dotenv.config();

export interface GenerateFunctionWithLanguage {
  language: string;
  task: string;
}
export const generateFunctionWithLanguage = async (params: GenerateFunctionWithLanguage) => {
  const codePrompt = new PromptTemplate({
    template: "You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis. Your task to enhance the description of a product based on the information provided",
    inputVariables: ["language", "task"],
  });
  console.log("process.env.OPENAI_KEY: ",process.env.OPENAI_KEY);
  
  const openAi = new OpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const llm = new LLMChain({
    llm: openAi,
    prompt: codePrompt,
    outputKey: "code",
  });

  return llm.call({
    language: params.language,
    task: params.task,
  });
};