import React from 'react'
import HeroSection from '../components/HeroSection'
import Man from '../components/Man'
import CategoryCard from "../components/CategoryCard";
import {Link} from "react-router-dom";

const desktopCategoryHeadphones = "https://res.cloudinary.com/dsszhrke0/image/upload/v1780583497/hompageheadphones_z6n1wg.png"

const desktopCategorySpeaker = "https://res.cloudinary.com/dsszhrke0/image/upload/v1780583506/homepagespeakers_cxo1ns.png"

const desktopCategoryEarphones = "https://res.cloudinary.com/dsszhrke0/image/upload/v1780583514/homepageearphones_tkklrh.png"

const ZX9Speaker = "https://res.cloudinary.com/dsszhrke0/image/upload/v1780585353/ZX9_speaker_homepage_xmsliv.png"

const YX1Earphones = "https://res.cloudinary.com/dsszhrke0/image/upload/v1780585353/YX1_earphones_homepage_qlh7lq.png"

const HomePage : React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] relative">
      <HeroSection />

      <section className="px-6 md:px-10 lg:px-12 xl:px-41.25 md-12 md:mt-20 lg:mt-30">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4 lg:gap-8 md:pt-0 md:mt-14">
          <CategoryCard to={'/headphones'} label={'HEADPHONES'} image={desktopCategoryHeadphones} className='mt-8 md:mt-12'/>
        <CategoryCard to={'/speakers'} label={'SPEAKERS'} image={desktopCategorySpeaker} className='mt-8 md:mt-12'/>
        <CategoryCard to={'/earphones'} label={'EARPHONES'} image={desktopCategoryEarphones} className='mt-8 md:mt-12'/>
        </div>
      </section>

      {/*=====ZX9 SPEAKER FEATURE =====*/}

      <section className="px-6 md:px-10 lg:px-12 xl:px-41.25 mt-24 md:mt-32 lg:mt-40">
        <div className="bg-[#D87D4A] flex flex-col lg:flex-row items-end px-6 md:px-12 lg:px-29.25 pt-14 md:pt-16 lg:pt-0 gap-8 lg:justify-between rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full opacity-10 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-100 h-100 rounded-full border-2 border-white"/>
            <div className="absolute -top-20 -left-20 w-100 h-100 rounded-full border-2 border-white"/>
          </div>

          <div>
            <img src={ZX9Speaker} alt="" />
          </div>

          <div className="relative z-10 flex flex-col items-center lg:itms-start text-center lg:text-left gap-6 max-w-87.25 pb-14 md:pb-16 lg:pb-24">
            <h2 className="font-bold text-[36px] md:text-[56px] leading-tight tracking-[2px] uppercase text-white">
              ZX9 SPEAKER
              </h2>
            <p className="text-[15px] leading-relaxed text-white/75">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
            <Link to="/speaker">
            <button className="mt-2 bg-black text-white font-bold text-[13px] tracking-[1px] uppercase py-4 px-8 hover:bg-[#4C4C4C] transition-colors duration-200 cursor-pointer ">
              See Product
            </button>
            </Link>
          </div>
        </div>
      </section>



      {/*=====YX1 EARPHONE FEATURE =====*/}
      <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] mt-6 md:mt-8 lg:mt-12"> 
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-3">
          <div className="rounded-xl overflow-hidden">
            <img src={YX1Earphones} alt="YX1 Earphones" className='h=50 w-full md:h-80'/>
          </div>

          <div className="bg-[#F1F1F1] rounded-xl flex items-center h-50 md:h-auto">
            <div className="ml-6 md:ml-10 lg:ml-24 flex flex-col gap-8 text-start">
              <h2 className="font-bold text-[28px] tracking-[2px] uppercase text-black">
                YX1 EARPHONES
                </h2>
              <Link to="/product">
                <button className="border border-black text-black font-bold text-[13px] tracking-[1px] uppercase py-4 px-8 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                  See Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*=====MAN=====*/}

      <Man />

    </div>
  )
}

export default HomePage