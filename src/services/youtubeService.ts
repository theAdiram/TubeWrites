import { toast } from "sonner";
import { PaperContent } from "@/types/paperTypes";
import { generateResearchPaperWithGemini } from "./geminiService";

const YOUTUBE_API_KEY = "AIzaSyCLX9d7QY5Cf1d8y-4lUFeKPVxnlrtqhfA";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

// Function to extract YouTube video ID from URL
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to fetch video details from YouTube API
export const fetchVideoDetails = async (videoId: string) => {
  try {
    // Fetch both snippet and contentDetails in one request
    const response = await fetch(
      `${YOUTUBE_API_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API error:", errorData);
      throw new Error("Failed to fetch video details: " + errorData?.error?.message || "Unknown error");
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found");
    }
    
    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;
    const statistics = video.statistics;
    
    return {
      title: snippet.title,
      author: snippet.channelTitle,
      duration: contentDetails.duration,
      publishDate: snippet.publishedAt,
      description: snippet.description,
      viewCount: statistics.viewCount,
      likeCount: statistics.likeCount,
      commentCount: statistics.commentCount
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    toast.error("Failed to fetch video details");
    throw error;
  }
};

// Function to fetch video comments
const fetchVideoComments = async (videoId: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&order=relevance&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data.items.map((item: any) => item.snippet.topLevelComment.snippet.textDisplay);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// Function to build comprehensive video context
export const fetchTranscript = async (videoId: string): Promise<string> => {
  try {
    const videoDetails = await fetchVideoDetails(videoId);
    const comments = await fetchVideoComments(videoId);
    
    // Build a comprehensive context from all available data
    let context = `Title: ${videoDetails.title}\n\n`;
    context += `Description:\n${videoDetails.description}\n\n`;
    context += `Channel: ${videoDetails.author}\n`;
    context += `Published: ${videoDetails.publishDate}\n`;
    context += `Duration: ${videoDetails.duration}\n`;
    context += `Views: ${videoDetails.viewCount}\n`;
    context += `Likes: ${videoDetails.likeCount}\n\n`;
    
    if (comments.length > 0) {
      context += "Top Comments:\n";
      comments.slice(0, 10).forEach((comment, index) => {
        context += `${index + 1}. ${comment}\n`;
      });
    }
    
    return context;
  } catch (error) {
    console.error("Error building video context:", error);
    toast.error("Failed to build video context");
    throw error;
  }
};

// Function to process YouTube video and generate research paper
export const processYoutubeVideo = async (url: string): Promise<PaperContent> => {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    toast.info("Fetching video information...");
    const videoDetails = await fetchVideoDetails(videoId);
    
    toast.info("Building video context...");
    const transcript = await fetchTranscript(videoId);

    toast.info("Generating research paper...");
    const paper = await generateResearchPaperWithGemini(transcript, {
      title: videoDetails.title,
      author: videoDetails.author,
      publishDate: videoDetails.publishDate
    });

    toast.success("Research paper generated successfully!");
    return paper;
  } catch (error) {
    console.error("Error processing YouTube video:", error);
    toast.error(error instanceof Error ? error.message : "Failed to process YouTube video");
    throw error;
  }
};
