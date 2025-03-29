import { PaperContent } from "@/types/paperTypes";

const GEMINI_API_KEY = "AIzaSyBiWvRVP0ZpuVXqwxK8S2OeZeKRyCO-gQY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" + GEMINI_API_KEY;

export const generateResearchPaperWithGemini = async (
  transcript: string,
  videoDetails: {
    title: string;
    author: string;
    publishDate: string;
  }
): Promise<PaperContent> => {
  try {
    const prompt = `Generate a comprehensive research paper based on the following YouTube video:
Title: ${videoDetails.title}
Author: ${videoDetails.author}
Publish Date: ${videoDetails.publishDate}

Video Content:
${transcript}

Please generate a research paper with the following structure, using clear section headers and well-formatted paragraphs:

# Abstract
[Start with a clear, concise summary]

# Introduction
[Provide background and context]

# Methodology
[Explain the approach and methods]

# Results and Discussion
[Present and analyze findings]

# Conclusion
[Summarize key takeaways]

# References
[List academic citations]

Make sure to:
- Use clear section headers with "#" prefix
- Break content into readable paragraphs
- Use bullet points for lists where appropriate
- Include relevant academic citations
- Maintain academic tone while being accessible
- Structure the content logically
- Include key findings and analysis`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error("Failed to generate research paper: " + (errorData?.error?.message || "Unknown error"));
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse the generated text into sections
    const sections = parseGeneratedText(generatedText);

    return {
      title: videoDetails.title,
      author: videoDetails.author,
      abstract: sections.abstract || "No abstract generated",
      sections: sections.mainSections,
      keyPoints: sections.keyPoints,
      references: sections.references || []
    };
  } catch (error) {
    console.error("Error generating research paper:", error);
    throw error;
  }
};

const parseGeneratedText = (text: string) => {
  // Split the text into sections based on markdown headers
  const sections = text.split(/(?=# )/);
  
  const result = {
    abstract: "",
    mainSections: [] as { heading: string; content: string }[],
    keyPoints: [] as string[],
    references: [] as string[]
  };

  sections.forEach(section => {
    const trimmedSection = section.trim();
    const [header, ...contentParts] = trimmedSection.split('\n');
    const content = contentParts.join('\n').trim();

    // Remove the "# " prefix from header
    const cleanHeader = header.replace('# ', '').trim();

    switch (cleanHeader.toLowerCase()) {
      case 'abstract':
        result.abstract = formatContent(content);
        break;
      case 'references':
        result.references = content
          .split('\n')
          .map(ref => ref.trim())
          .filter(ref => ref && !ref.startsWith('#'));
        break;
      default:
        if (cleanHeader && content) {
          result.mainSections.push({
            heading: cleanHeader,
            content: formatContent(content)
          });
        }
    }
  });

  // If no sections were found, try to extract content without headers
  if (result.mainSections.length === 0) {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length > 0) {
      result.abstract = formatContent(paragraphs[0]);
      if (paragraphs.length > 1) {
        result.mainSections = [
          {
            heading: "Content",
            content: formatContent(paragraphs.slice(1).join('\n\n'))
          }
        ];
      }
    }
  }

  // Extract key points from the content
  const content = result.mainSections.map(s => s.content).join(" ");
  const sentences = content.split(/[.!?]+/);
  result.keyPoints = sentences
    .filter(s => s.trim().length > 20 && !s.includes('\n'))
    .slice(0, 5)
    .map(s => s.trim());

  // Ensure we have at least some key points
  if (result.keyPoints.length === 0 && result.abstract) {
    result.keyPoints = [result.abstract.split('.')[0]]; // Use first sentence of abstract
  }

  return result;
};

// Helper function to format content
const formatContent = (content: string): string => {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .trim();
}; 