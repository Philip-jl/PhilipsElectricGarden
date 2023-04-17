const SpotifyList = {
    convertPlaylistToText: async function(playlistUrl) {
      const spotifyApi = new SpotifyWebApi();
      const accessToken = 'YOUR_ACCESS_TOKEN_HERE'; // replace with actual access token
      spotifyApi.setAccessToken(accessToken);
  
      // get playlist ID from URL
      const playlistId = playlistUrl.split('/').pop();
  
      try {
        // get playlist tracks
        const { body: { tracks } } = await spotifyApi.getPlaylistTracks(playlistId);
        
        // map tracks to formatted string with song name and artist name(s)
        const formattedTracks = tracks.items.map(({ track }) => {
          const songName = track.name;
          const artistNames = track.artists.map(artist => artist.name).join(', ');
          return `${songName} by ${artistNames}`;
        });
        
        // return formatted tracks as newline-separated string
        return formattedTracks.join('\n');
      } catch (err) {
        console.error(err);
        return '';
      }
    }
  };

    