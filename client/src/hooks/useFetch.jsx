import { useEffect, useState } from "react";
const GIPHY_KEY = "BUsWB2vgidG35rhkqCF5gkxPlW5xvcJC";

const useFetch = (keyword) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const random = Math.floor((Math.random() * 100) % 25);

      const response =
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=BUsWB2vgidG35rhkqCF5gkxPlW5xvcJC&q=${keyword}&limit=25&rating=r&lang=en
      `);
      const { data } = await response.json();

      setGifUrl(data[random]?.images?.downsized_medium.url);
    } catch (error) {
      console.log(error);
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
