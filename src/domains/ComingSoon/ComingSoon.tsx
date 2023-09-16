interface Props {
  message?: string;
  title?: string;
}

const ComingSoon = ({ message, title }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <h1>{title || "Coming Soon"}</h1>
      <p>{message || "This Page Isn't Available Yet."}</p>
    </div>
  );
};

export default ComingSoon;
