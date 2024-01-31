import React from 'react';
import { Image, Card } from '@nextui-org/react';
import { Shield, Recycle, Users } from 'lucide-react';
import GradientText from '../../components/GradientText';

function Home() {
  return (
    <>
      <section id="1">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-20 px-10 sm:py-10 sm:my-10">
          <div className="max-w-[550px]">
            <span className="text-blue-600 text-lg font-semibold">About</span>
            <h1 className="text-slate-800 text-6xl font-extrabold my-7">
              Unleash the Power of Your Data with{' '}
              <GradientText>GraphIT</GradientText>
            </h1>

            <p className="text-slate-500 mb-10">
              Welcome to GraphIT, where data meets creativity. Transform your
              raw data into stunning visualizations effortlessly. Whether you're
              a data enthusiast or a business professional, our platform
              empowers you to create shareable visualizations that tell your
              unique story.
            </p>
          </div>
          <div className="relative hidden sm:flex">
            <Image
              className="h-[400px]"
              alt="Phone screen with App"
              src="/landingpage-1.png"
            />
          </div>
        </div>
      </section>

      <section id="2" className="bg-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col items-center py-20 px-10 sm:py-10 sm:my-10">
          <h2 className="text-slate-800 text-center text-5xl font-extrabold mb-3">
            How it works?
          </h2>
          <span className="text-blue-600 text-lg font-semibold mb-10">
            vision
          </span>
          <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-0 sm:space-x-5">
            <Card className="w-full max-w-[370px] flex flex-col items-center p-6 text-center">
              <div className="p-5 bg-violet-300/60 aspect-square w-18 rounded-2xl mb-5">
                <Recycle className="h-8 w-8 text-violet-900/70" />
              </div>
              <h3 className="text-slate-700 text-lg font-semibold mb-4">
                Transform Raw Data into Insights
              </h3>
              <p className="text-slate-500">
                Effortlessly turn complex data into actionable insights.
                Visualize patterns and opportunities with ease, empowering
                data-driven decisions.
              </p>
            </Card>
            <Card className="w-full max-w-[370px] flex flex-col items-center p-6 text-center">
              <div className="p-5 bg-cyan-300/60 aspect-square w-18 rounded-2xl mb-5">
                <Users className="h-8 w-8 text-cyan-900/70" />
              </div>
              <h3 className="text-slate-700 text-lg font-semibold mb-4">
                Amplify Collaboration, Minimize Complexity
              </h3>
              <p className="text-slate-500">
                Share visualizations effortlessly, breaking down communication
                barriers. Present data in a compelling way for team
                understanding and collaborative decision-making.
              </p>
            </Card>
            <Card className="w-full max-w-[370px] flex flex-col items-center p-6 text-center">
              <div className="p-5 bg-amber-300/60 aspect-square w-18 rounded-2xl mb-5">
                <Shield className="h-8 w-8 text-amber-900/70" />
              </div>
              <h3 className="text-slate-700 text-lg font-semibold mb-4">
                Fortified Security for Your Data
              </h3>
              <p className="text-slate-500">
                Rest easy with our platform's strong security measures. Access
                your visualizations securely from any device, ensuring
                confidentiality and peace of mind.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="3">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-20 px-10 sm:py-10 sm:my-10">
          <div className="relative hidden sm:flex">
            <Image
              className="h-[400px]"
              alt="Phone screen with App"
              src="/landingpage-1.png"
            />
          </div>
          <div className="max-w-[550px]">
            <span className="text-blue-600 text-lg font-semibold">Product</span>
            <h1 className="text-slate-800 text-6xl font-extrabold my-7">
              Revolutionize Your <GradientText>Data </GradientText>
              Storytelling
            </h1>

            <p className="text-slate-500 mb-10">
              At GraphIT, we believe that data is more than just numbers—it's a
              narrative waiting to be told. Our platform is designed to help you
              unlock the storytelling potential hidden within your data. Whether
              you're a seasoned analyst or a newcomer to data visualization, our
              tools and features cater to your needs.
            </p>
          </div>
        </div>
      </section>

      <section
        section="4"
        className="relative max-w-7xl mx-auto z-10 overflow-hidden bg-blue-700 py-16 px-8 mt-40"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="text-center lg:text-left ">
                <div className="mb-10 lg:mb-0 ">
                  <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight text-white ">
                    Start Visualizing Now
                  </h1>
                  <p className="w-full text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-white">
                    Ready to turn your data into compelling visual stories? Sign
                    up for a free account today and embark on a journey of data
                    exploration. Don't miss out on the opportunity to make your
                    data come alive. Click below to get started.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="text-center lg:text-right">
                <a
                  className="font-semibold rounded-lg mx-auto inline-flex items-center justify-center bg-white py-4 px-9 hover:bg-opacity-90"
                  href="/login"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
        <span className="absolute top-0 right-0 -z-10">
          <svg
            width="388"
            height="250"
            viewBox="0 0 388 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.05"
              d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z"
              fill="url(#paint0_linear_971_6910)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_971_6910"
                x1="60.5"
                y1="111"
                x2="287"
                y2="111"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.520507" stopColor="white"></stop>
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute top-0 right-0 -z-10">
          <svg
            width="324"
            height="250"
            viewBox="0 0 324 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.05"
              d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z"
              fill="url(#paint0_linear_971_6911)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_971_6911"
                x1="60.5"
                y1="111"
                x2="287"
                y2="111"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.520507" stopColor="white"></stop>
                <stop offset="1" stopColor="white" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute top-4 left-4 -z-10">
          <svg
            width="43"
            height="56"
            viewBox="0 0 43 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle
                cx="40.9984"
                cy="1.49626"
                r="1.49626"
                transform="rotate(90 40.9984 1.49626)"
                fill="white"
              ></circle>
              <circle
                cx="27.8304"
                cy="1.49626"
                r="1.49626"
                transform="rotate(90 27.8304 1.49626)"
                fill="white"
              ></circle>
              <circle
                cx="14.6644"
                cy="1.49626"
                r="1.49626"
                transform="rotate(90 14.6644 1.49626)"
                fill="white"
              ></circle>
              <circle
                cx="1.49642"
                cy="1.49626"
                r="1.49626"
                transform="rotate(90 1.49642 1.49626)"
                fill="white"
              ></circle>
              <circle
                cx="40.9984"
                cy="14.6642"
                r="1.49626"
                transform="rotate(90 40.9984 14.6642)"
                fill="white"
              ></circle>
              <circle
                cx="27.8304"
                cy="14.6642"
                r="1.49626"
                transform="rotate(90 27.8304 14.6642)"
                fill="white"
              ></circle>
              <circle
                cx="14.6644"
                cy="14.6642"
                r="1.49626"
                transform="rotate(90 14.6644 14.6642)"
                fill="white"
              ></circle>
              <circle
                cx="1.49642"
                cy="14.6642"
                r="1.49626"
                transform="rotate(90 1.49642 14.6642)"
                fill="white"
              ></circle>
              <circle
                cx="40.9984"
                cy="27.8302"
                r="1.49626"
                transform="rotate(90 40.9984 27.8302)"
                fill="white"
              ></circle>
              <circle
                cx="27.8304"
                cy="27.8302"
                r="1.49626"
                transform="rotate(90 27.8304 27.8302)"
                fill="white"
              ></circle>
              <circle
                cx="14.6644"
                cy="27.8302"
                r="1.49626"
                transform="rotate(90 14.6644 27.8302)"
                fill="white"
              ></circle>
              <circle
                cx="1.49642"
                cy="27.8302"
                r="1.49626"
                transform="rotate(90 1.49642 27.8302)"
                fill="white"
              ></circle>
              <circle
                cx="40.9984"
                cy="40.9982"
                r="1.49626"
                transform="rotate(90 40.9984 40.9982)"
                fill="white"
              ></circle>
              <circle
                cx="27.8304"
                cy="40.9963"
                r="1.49626"
                transform="rotate(90 27.8304 40.9963)"
                fill="white"
              ></circle>
              <circle
                cx="14.6644"
                cy="40.9982"
                r="1.49626"
                transform="rotate(90 14.6644 40.9982)"
                fill="white"
              ></circle>
              <circle
                cx="1.49642"
                cy="40.9963"
                r="1.49626"
                transform="rotate(90 1.49642 40.9963)"
                fill="white"
              ></circle>
              <circle
                cx="40.9984"
                cy="54.1642"
                r="1.49626"
                transform="rotate(90 40.9984 54.1642)"
                fill="white"
              ></circle>
              <circle
                cx="27.8304"
                cy="54.1642"
                r="1.49626"
                transform="rotate(90 27.8304 54.1642)"
                fill="white"
              ></circle>
              <circle
                cx="14.6644"
                cy="54.1642"
                r="1.49626"
                transform="rotate(90 14.6644 54.1642)"
                fill="white"
              ></circle>
              <circle
                cx="1.49642"
                cy="54.1642"
                r="1.49626"
                transform="rotate(90 1.49642 54.1642)"
                fill="white"
              ></circle>
            </g>
          </svg>
        </span>
      </section>

      <div className="w-full bg-gray-200 mt-10">
        <div className="max-w-6xl mx-auto">
          <footer className="p-4 md:px-6 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a
                href="#"
                target="_blank"
                className="flex items-center mb-4 sm:mb-0"
              >
                <img src="/default.png" className="h-44" alt="CookIN Logo" />
              </a>
              <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                <li>
                  <a
                    href="#"
                    className="mr-4 text-sm text-slate-600 hover:underline md:mr-6"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="mr-4 text-sm text-slate-600 hover:underline md:mr-6"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="mr-4 text-sm text-slate-600 hover:underline md:mr-6"
                  >
                    Licensing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-slate-300 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-slate-600 sm:text-center">
              © 2024{' '}
              <a href="#" target="_blank" className="hover:underline">
                GraphIT
              </a>
              . All Rights Reserved.
            </span>
          </footer>
        </div>
      </div>
      {/* <div className="p-10 bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent text-4xl font-extrabold">
        This is Landing Page
      </div> */}
    </>
  );
}

export default Home;
