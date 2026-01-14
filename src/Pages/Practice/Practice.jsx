import Card from "./Card";
import SplitText from "../../components/SplitText.tsx"; 

const Practice = () => {
  return (
    <div className=" bg-[#121212] py-10 px-20">
      <div>
        <SplitText
            text="PRACTICE"
            className="text-6xl text-[40px] font-[550] mb-8 text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars" 
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
        />
        <p className="text-[#DB9EE5] text-center font-semibold text-lg sm:text-left md:text-xl">
          Improve your coding skills with the following websites
        </p>
        <Card />
      </div>
    </div>
  );
};
export default Practice;
