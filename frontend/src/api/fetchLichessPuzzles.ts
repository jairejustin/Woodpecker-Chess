import type { LichessPuzzle } from "../types";

export async function fetchSamplePuzzles(
  minRating: 1500 | 2000 | 2500 | 3000,
  maxRating: 1999 | 2499 | 2999 | 10000,
): Promise<LichessPuzzle[]> {
  const url = `/puzzles_sample_${minRating}_${maxRating}.json`;
  console.log('Fetching puzzles from:', url);
  
  try {
    const res = await fetch(url);
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(`${url}: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Parsed:', data?.length || 0);
    
    return (data as any[])
      .map((p): LichessPuzzle => ({
        PuzzleId: String(p.PuzzleId),
        FEN: String(p.FEN),
        Moves: String(p.Moves),
        Rating: Number(p.Rating),
        Themes: String(p.Themes),
        OpeningTags: p.OpeningTags ? String(p.OpeningTags) : undefined,
      }))
      .filter((p) => p.PuzzleId && p.FEN && p.Moves);
  } catch (error) {
    console.error('Error in fetchSamplePuzzles:', error);
    throw error;
  }
}