export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=59e9f23960fe9657a6b9cd28908775c5&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };