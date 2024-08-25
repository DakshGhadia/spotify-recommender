"use client";

import { useState } from "react";

export default function NewSongs({ session, artists, tracks }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  async function fetchSpotifyRecommendations() {
    setLoading(true);
    const seedArtists = artists.slice(0, 2).join("%2C");
    const seedTracks = tracks.slice(0, 2).join("%2C");

    const res = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=3&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    setData(await res.json());
    setLoading(false);
    return data;
  }

  return (
    <>
      <button
        disabled={loading}
        onClick={fetchSpotifyRecommendations}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Generate Recommendations
      </button>
      {loading && (
        <div className="flex items-center justify-center mt-4">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}

      {data && !loading && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl items-center font-bold mb-4 text-gray-800">
            Recommendations
          </h2>
          <ol className="space-y-4 list-decimal list-inside">
            {data.tracks.map((track, index) => (
              <li
                key={track.id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {index + 1}.
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    <a
                      href={track.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline
                  hover:text-blue-600 cursor-pointer"
                    >
                      {track.name}
                    </a>
                  </h3>
                  <p className="text-gray-600">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
