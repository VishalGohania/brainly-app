import { useEffect } from "react";
import { ShareIcon } from "../../icons/ShareIcon"


interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export const Card = ({title, link, type}: CardProps) => {
  console.log(title);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  console.log("Link value:", link); 
  return <div>
    <div className="p-4 bg-white rounded-md border border-gray-200 max-w-72 min-w-72 min-h-48">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <ShareIcon size={"md"}/>
          </div>
          {title}
        </div>
        
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            <a href={link} target="_blank">
              <ShareIcon size={"md"}/>
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon size={"md"}/>
          </div>
        </div>
        
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={`https://www.youtube.com/embed/${
              link?.split('v=')[1]?.split('&')[0] || ''
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  </div>
}