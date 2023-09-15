import React from "react";

interface Props {
  trailerKey: string;
}

const MovieTrailer = ({ trailerKey }: Props) => {
  return (
    <div className="w-full h-full">
      {trailerKey && (
        <iframe
          title="Movie Trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          className="w-full h-full border rounded-[20px]"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MovieTrailer;
