import { supabase } from "./supabase";

// Get
export const fetchWallpapers = async () => {
  console.log("fetchWallpapers");
  try {
    console.log("Fething...");
    const { data, error } = await supabase.from("wallpapers").select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Get singed url
export const singedUrl = async (filePath: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from("wallpapers")
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error("Error creating signed URL:", error.message);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Unexpected error while creating signed URL:", error);
    return null;
  }
};
