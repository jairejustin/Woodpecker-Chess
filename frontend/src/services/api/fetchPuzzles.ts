import type { LichessPuzzle } from "../../types";
import type { RawPuzzle } from "../../types";

function toStringSafe(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const s = String(value).trim();
  return s === "" ? undefined : s;
}

function toNumberSafe(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function isValidPuzzleCandidate(candidate: Partial<LichessPuzzle>): candidate is LichessPuzzle {
  return Boolean(candidate.PuzzleId && candidate.FEN && candidate.Moves);
}

function parseRawPuzzle(raw: RawPuzzle): LichessPuzzle | null {
  const PuzzleId = toStringSafe(raw["PuzzleId"] ?? raw["puzzleId"] ?? raw["id"]);
  const FEN = toStringSafe(raw["FEN"] ?? raw["fen"]);
  const Moves = toStringSafe(raw["Moves"] ?? raw["moves"]);
  const Rating = toNumberSafe(raw["Rating"] ?? raw["rating"]);
  const Themes = toStringSafe(raw["Themes"] ?? raw["themes"]);
  const OpeningTags = toStringSafe(raw["OpeningTags"] ?? raw["openingTags"]);

  const candidate: Partial<LichessPuzzle> = {
    PuzzleId,
    FEN,
    Moves,
    Rating: Rating ?? 0,
    Themes,
    OpeningTags,
  };

  if (!isValidPuzzleCandidate(candidate)) {
    console.warn("Invalid puzzle skipped:", {
      reason: [
        candidate.PuzzleId ? undefined : "missing PuzzleId",
        candidate.FEN ? undefined : "missing FEN",
        candidate.Moves ? undefined : "missing Moves",
      ].filter(Boolean),
      rawPreview: { PuzzleId, FEN, Moves, Rating },
    });
    return null;
  }

  return candidate as LichessPuzzle;
}

export async function fetchPuzzles(): Promise<LichessPuzzle[]> {
  // temp until there is a backend
  const url = "/puzzles_samples.json";

  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error("Network error while fetching puzzles:", err);
    throw new Error(`Failed to fetch ${url}: ${String(err)}`);
  }

  console.log("Response status:", res.status, res.statusText);

  if (!res.ok) {
    throw new Error(`${url}: ${res.status} ${res.statusText}`);
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error(`${url}: invalid JSON - ${String(err)}`);
  }

  if (!Array.isArray(data)) {
    throw new Error(`${url}: expected an array`);
  }

  const parsed: LichessPuzzle[] = data
    .map((item: unknown) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }
      return parseRawPuzzle(item as RawPuzzle);
    })
    .filter((p): p is LichessPuzzle => p !== null);

  console.log(`Successfully parsed ${parsed.length} puzzles from ${url}`);

  return parsed;
}

export async function fetchPuzzlesWithRating(
  uri: string | undefined,
  minRating?: number,
  maxRating?: number
): Promise<LichessPuzzle[]> {
  const puzzles = await fetchPuzzles();

  if (minRating === undefined && maxRating === undefined) {
    return puzzles;
  }

  return puzzles.filter((puzzle) => {
    const rating = puzzle.Rating;
    if (minRating !== undefined && rating < minRating) return false;
    if (maxRating !== undefined && rating > maxRating) return false;
    return true;
  });
}