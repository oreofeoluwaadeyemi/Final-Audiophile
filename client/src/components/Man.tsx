import React from 'react'

const mandesktop="https://res.cloudinary.com/dsszhrke0/image/upload/v1780918160/Man_desktop_vi16mf.png"

const manmobile="https://res.cloudinary.com/dsszhrke0/image/upload/v1780918160/Man_mobile_qqjv8r.png"

const Man: React.FC = () => {
  return (
    <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] my-24 md:my-32 lg:my-40"> 
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-31.25">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-111.25">
          <h2 className="font-bold text-[28px] md:text-[40px] leading-tight tracking-[1.5px] md:tracking-[1.43px] uppercase text-black">Bringing you the <span>best</span> audio gear</h2>
          <p>
Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>

        <div className="order-1 lg:order-2">
          <img src={mandesktop} alt="" className="w-full hidden lg:block" />
          <img src={manmobile} alt="" className="lg:hidden" />
        </div>
      </div>
    </section>
  )
}

export default Man