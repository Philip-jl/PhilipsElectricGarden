const YouTubeList = {
    // function to search for YouTube videos corresponding to a song and artist
    searchVideos: async function(song, artist, apiKey) {
      // format the search query with the song and artist names
      const query = encodeURIComponent(`${song} ${artist}`);
      // make the API call to search for videos with the query
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=${query}&type=video&key=${apiKey}`);
      const json = await response.json();
      // extract the video ID from the API response
      const videoId = json.items[0].id.videoId;
      return videoId;
    },
  
    // function to convert a list of 'song by artist' to a string of YouTube video IDs
    convertToVideoIds: async function(spotifyList, apiKey) {
      // split the list into individual 'song by artist' strings
      const tracks = spotifyList.split('\n');
      // create an empty list to store the video IDs
      const videoIds = [];
      // loop through each track in the list
      for (const track of tracks) {
        // extract the song and artist names from the track string
        const [song, artist] = track.split(' by ');
        // search for the YouTube video corresponding to the song and artist
        const videoId = await this.searchVideos(song, artist, apiKey);
        // add the video ID to the list
        videoIds.push(videoId);
      }
      // create a string of video IDs separated by commas
      const videoIdString = videoIds.join(',');
      // create the URL for the 'watch videos' page with the video IDs
      const url = `https://www.youtube.com/watch_videos?video_ids=${videoIdString}`;
      return url;
    }
  };
  