import { LoaderProp } from "@/type";

export default function Loader({ color }: LoaderProp) {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className={`${color ? `bg-${color}`: 'bg-black'} h-2 w-2  rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
      <div className={`${color ? `bg-${color}`: 'bg-black'} h-2 w-2  rounded-full animate-bounce`}></div>
      <div className={`${color ? `bg-${color}`: 'bg-black'} h-2 w-2  rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
    </div>
  );
}
