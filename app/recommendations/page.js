import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NewSongs from "../components/NewSongs";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const artistId = [];
  const trackId = [];
  const resA = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3&offset=1",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (resA.status === 401) {
    // If unauthorized, redirect to sign-in page (access token might be expired)
    redirect("/api/auth/signin");
  }

  const artists = await resA.json();

  const resT = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=3&offset=1",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const tracks = await resT.json();

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">
        Your Spotify Summary - Past Month
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl xs:w-auto w-full">
        {/* Top 3 Tracks */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-gray-900">
          <h2 className="text-2xl font-semibold mb-4">Top 3 Tracks</h2>
          <ol className="list-decimal list-inside space-y-3">
            {tracks.items.map((track) => {
              trackId.push(track.id);
              return (
                <li key={track.id} className="text-lg font-medium">
                  <a
                    href={track.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline
                  hover:text-blue-600 cursor-pointer"
                  >
                    {track.name} - {track.artists[0].name}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Top 3 Artists */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-gray-900">
          <h2 className="text-2xl font-semibold mb-4">Top 3 Artists</h2>
          <ol className="list-decimal list-inside space-y-3">
            {artists.items.map((artist) => {
              artistId.push(artist.id);
              return (
                <li key={artist.id} className="text-lg font-medium">
                  <a
                    href={artist.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline
                  hover:text-blue-600 cursor-pointer"
                  >
                    {artist.name}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <NewSongs session={session} artists={artistId} tracks={trackId} />
    </div>
  );
}
